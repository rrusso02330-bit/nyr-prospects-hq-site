#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const rootDir = path.resolve(__dirname, "..");
const statePath = path.join(rootDir, "social-drafts", "trade-watch-state.json");
const defaultPollMs = 600000;
const tsnTradeFeedUrl =
  "https://next-gen.sports.bellmedia.ca/v2/trades/hockey/nhl?brand=tsn&lang=en";

function parseArgs(argv) {
  const args = {
    pollMs: defaultPollMs,
    phone: process.env.DRAFT_ALERT_PHONE || process.env.POST_ALERT_PHONE || "",
    noText: false,
    once: false,
    primeExisting: false,
    stopAt: "",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--poll-ms") {
      args.pollMs = Number(argv[index + 1]) || defaultPollMs;
      index += 1;
    } else if (arg === "--phone") {
      args.phone = argv[index + 1] || "";
      index += 1;
    } else if (arg === "--stop-at") {
      args.stopAt = argv[index + 1] || "";
      index += 1;
    } else if (arg === "--no-text") {
      args.noText = true;
    } else if (arg === "--once") {
      args.once = true;
    } else if (arg === "--prime-existing") {
      args.primeExisting = true;
    }
  }

  return args;
}

function ensureStateDir() {
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
}

function loadState() {
  if (!fs.existsSync(statePath)) {
    return {
      startedAt: new Date().toISOString(),
      processedTradeIds: [],
    };
  }

  return JSON.parse(fs.readFileSync(statePath, "utf8"));
}

function saveState(state) {
  fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);
}

function escapeAppleScriptText(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
}

function sendText(phone, message) {
  if (!phone) {
    return { ok: false, reason: "No phone number configured" };
  }

  const script = `
tell application "Messages"
  set targetService to first service
  set targetBuddy to buddy "${escapeAppleScriptText(phone)}" of targetService
  send "${escapeAppleScriptText(message)}" to targetBuddy
end tell
`;
  const result = spawnSync("osascript", [], {
    input: script,
    encoding: "utf8",
  });

  if (result.status !== 0) {
    return {
      ok: false,
      reason: result.stderr || result.stdout || "Messages send failed",
    };
  }

  return { ok: true };
}

function notifyLocal(title, message) {
  const script = `display notification "${escapeAppleScriptText(message)}" with title "${escapeAppleScriptText(title)}"`;
  spawnSync("osascript", ["-e", script], { encoding: "utf8" });
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "NYRProspectsHQTradeWatch/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from ${url}`);
  }

  return response.json();
}

function isRangersSide(side = {}) {
  return side.shortName === "NYR" || /new york rangers/i.test(side.name || "");
}

function isRangersTrade(trade) {
  return isRangersSide(trade.competitorOne) || isRangersSide(trade.competitorTwo);
}

function formatAsset(asset = {}) {
  if (asset.playerName) {
    return asset.positionShort
      ? `${asset.playerName} (${asset.positionShort})`
      : asset.playerName;
  }

  if (asset.draftPickRound && asset.draftPickYear) {
    const conditional = asset.isConditional ? "conditional " : "";
    return `${conditional}${asset.draftPickYear} round ${asset.draftPickRound} pick`;
  }

  if (asset.isFutureConsideration) {
    return "future considerations";
  }

  return asset.title?.trim() || "asset TBD";
}

function formatTeamAssets(teamKey, trade) {
  const team = trade[teamKey] || {};
  const assets = trade.tradeAcquisitions?.[teamKey] || [];
  return `${team.shortName || team.name || teamKey} receives ${assets.map(formatAsset).join(", ") || "TBD"}`;
}

function formatTradeSummary(trade) {
  const tsnInfo = trade.brandsExtraInfo?.TSN || {};
  const parts = [
    `TSN trade alert involving Rangers (${trade.id}).`,
    formatTeamAssets("competitorOne", trade),
    formatTeamAssets("competitorTwo", trade),
  ];

  if (tsnInfo.informations) {
    parts.push(tsnInfo.informations);
  }

  if (tsnInfo.url) {
    parts.push(tsnInfo.url);
  }

  parts.push("Approval needed before website/social changes.");
  return parts.join(" | ");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldStop(args) {
  if (!args.stopAt) {
    return false;
  }

  return Date.now() >= new Date(args.stopAt).getTime();
}

async function checkTrades(args, state) {
  const trades = await fetchJson(tsnTradeFeedUrl);
  const rangersTrades = trades.filter(isRangersTrade);
  const processed = new Set(state.processedTradeIds || []);
  const newTrades = rangersTrades.filter((trade) => !processed.has(trade.id));

  if (args.primeExisting) {
    state.processedTradeIds = Array.from(new Set([...processed, ...rangersTrades.map((trade) => trade.id)]));
    state.lastPrimedAt = new Date().toISOString();
    saveState(state);
    console.log(
      `[${new Date().toISOString()}] Primed ${rangersTrades.length} existing Rangers trade(s) from TSN.`,
    );
    return;
  }

  for (const trade of newTrades) {
    const summary = formatTradeSummary(trade);
    console.log(`[${new Date().toISOString()}] NEW NYR TRADE ${trade.id}: ${summary}`);
    notifyLocal("NYR Prospects HQ trade watch", summary);

    if (!args.noText) {
      const textResult = sendText(args.phone, summary);
      if (textResult.ok) {
        console.log("Trade text alert sent.");
      } else {
        console.error(`Trade text alert failed: ${textResult.reason}`);
      }
    }

    processed.add(trade.id);
    state.processedTradeIds = Array.from(processed);
    state.lastProcessedAt = new Date().toISOString();
    saveState(state);
  }

  if (!newTrades.length) {
    console.log(
      `[${new Date().toISOString()}] Checked ${rangersTrades.length} Rangers trade(s) on TSN; no new alerts.`,
    );
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  ensureStateDir();
  const state = loadState();
  saveState(state);

  console.log(
    `NYR trade watch running. Source: TSN TradeCentre feed. Polling every ${Math.round(args.pollMs / 1000)}s${args.stopAt ? ` until ${args.stopAt}` : ""}.`,
  );

  while (true) {
    if (shouldStop(args)) {
      console.log(`[${new Date().toISOString()}] Stop time reached. Exiting trade watch.`);
      break;
    }

    try {
      await checkTrades(args, state);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] ${error.stack || error.message}`);
    }

    if (args.once || args.primeExisting) {
      break;
    }

    await sleep(args.pollMs);
  }
}

main();
