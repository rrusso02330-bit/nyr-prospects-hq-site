#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const rootDir = path.resolve(__dirname, "..");
const draftsDir = path.join(rootDir, "social-drafts", "draft-2026");
const statePath = path.join(rootDir, "social-drafts", "draft-watch-state.json");
const defaultYear = "2026";
const defaultPollMs = 300000;
const draftApiBase = "https://api-web.nhle.com/v1";
const siteBaseUrl = "https://nyr-prospects-hq.netlify.app";

function parseArgs(argv) {
  const args = {
    year: defaultYear,
    pollMs: defaultPollMs,
    phone: process.env.DRAFT_ALERT_PHONE || "",
    once: false,
    noText: false,
    alertAllExisting: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--year") {
      args.year = argv[index + 1] || defaultYear;
      index += 1;
    } else if (arg === "--poll-ms") {
      args.pollMs = Number(argv[index + 1]) || defaultPollMs;
      index += 1;
    } else if (arg === "--phone") {
      args.phone = argv[index + 1] || "";
      index += 1;
    } else if (arg === "--once") {
      args.once = true;
    } else if (arg === "--no-text") {
      args.noText = true;
    } else if (arg === "--alert-all-existing") {
      args.alertAllExisting = true;
    }
  }

  return args;
}

function ensureDirs() {
  fs.mkdirSync(draftsDir, { recursive: true });
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
}

function loadState() {
  if (!fs.existsSync(statePath)) {
    return {
      startedAt: new Date().toISOString(),
      processedPickKeys: [],
    };
  }

  return JSON.parse(fs.readFileSync(statePath, "utf8"));
}

function saveState(state) {
  fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);
}

function defaultText(value) {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  return value.default || value.en || Object.values(value)[0] || "";
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatHeight(inches) {
  if (!Number.isFinite(Number(inches))) {
    return "TBD";
  }

  const total = Number(inches);
  return `${Math.floor(total / 12)}'${total % 12}"`;
}

function formatWeight(weight) {
  return Number.isFinite(Number(weight)) ? `${weight} lb` : "TBD";
}

function escapeAppleScriptText(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "NYRProspectsHQDraftWatch/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from ${url}`);
  }

  return response.json();
}

function getPickName(pick) {
  return [defaultText(pick.firstName), defaultText(pick.lastName)].filter(Boolean).join(" ");
}

function isSelectedPick(pick) {
  return Boolean(getPickName(pick));
}

function isRangersPick(pick) {
  return pick.teamAbbrev === "NYR" || defaultText(pick.displayAbbrev) === "NYR";
}

function pickKey(year, pick) {
  return `${year}-${pick.overallPick}`;
}

function formatPickNumber(pick) {
  return `Round ${pick.round}, Pick ${pick.pickInRound} (No. ${pick.overallPick} overall)`;
}

function playerProfileUrl(name) {
  return `${siteBaseUrl}/player.html?player=${slugify(name)}`;
}

function buildPostText(pick) {
  const name = getPickName(pick);
  const position = pick.positionCode || "TBD";
  const club = pick.amateurClubName || "Club TBD";
  const league = pick.amateurLeague || "League TBD";
  const country = pick.countryCode ? `, ${pick.countryCode}` : "";

  return [
    `NYR pick No. ${pick.overallPick}: ${name}`,
    `${position} | ${club}, ${league}${country}`,
    `${formatHeight(pick.height)} | ${formatWeight(pick.weight)}`,
    "",
    `Full bio, scouting notes, and updates: ${playerProfileUrl(name)}`,
    "",
    "#NYR #NHLDraft",
  ].join("\n");
}

function buildDraftMarkdown(pick, apiUrl) {
  const name = getPickName(pick);
  const postText = buildPostText(pick);
  const generatedAt = new Date().toISOString();

  return [
    `# Rangers Draft Pick Alert - ${name}`,
    "",
    "Status: awaiting approval",
    `Generated: ${generatedAt}`,
    `Source: Official NHL draft API - ${apiUrl}`,
    "",
    "## X Short Bio Draft",
    "",
    "```text",
    postText,
    "```",
    "",
    `Characters: ${postText.length}`,
    "",
    "## Highlight Links For X",
    "",
    "- Highlight 1: TBD - add only if verified from an official/team/league account or trusted video source.",
    "- Highlight 2: TBD - add only if verified from an official/team/league account or trusted video source.",
    "",
    "Posting note: the short bio post is approved for X tonight after the website bio is created. Add 1-2 highlight links as replies or follow-up posts when verified.",
    "",
    "## Website Fields",
    "",
    `- Name: ${name}`,
    `- Position: ${pick.positionCode || "TBD"}`,
    `- Height: ${formatHeight(pick.height)}`,
    `- Weight: ${formatWeight(pick.weight)}`,
    `- Amateur team: ${pick.amateurClubName || "TBD"}`,
    `- Amateur league: ${pick.amateurLeague || "TBD"}`,
    `- Country: ${pick.countryCode || "TBD"}`,
    `- Draft year: 2026`,
    `- Draft pick: Rd ${pick.round}, No. ${pick.overallPick}`,
    `- Rangers acquisition: 2026 draft, Rd ${pick.round}, No. ${pick.overallPick}`,
    `- Website profile: ${playerProfileUrl(name)}`,
    "",
    "## Bio Build Checklist",
    "",
    "- Create or update a clickable player bio page before adding social copy.",
    "- Keep this player in the temporary 2026 Rangers Draft Class section until post-draft prospect rankings settle.",
    "- Add verified quick bio details: hometown, birthdate, shoots/catches, height, weight, position, amateur team, league, country, and draft slot when available.",
    "- Add a prospect writeup with style, strengths, development focus, projection, and comparable style.",
    "- Add reliable pre-draft/amateur stats to the bio without approval, clearly labeled as pre-draft or amateur stats when they occurred before selection.",
    "- Stats since Rangers control should stay empty until post-draft Rangers-control games exist.",
    "- Add source links from official NHL/team/league pages first, then trusted scouting outlets as supporting context.",
    "",
    "## Draft Night Rules",
    "",
    "- Website bio/category updates for Rangers draft picks are pre-approved tonight.",
    "- Adding newly drafted Rangers prospects to the website is pre-approved once the pick is verified.",
    "- X short-bio posts for Rangers draft picks are pre-approved tonight after the website bio is created.",
    "- Do not post to Instagram automatically.",
    "- Do not remove, graduate, trade-archive, or otherwise take an existing player out of the ranked prospect pool without explicit user approval.",
    "- Trades require explicit user approval before website changes or social posts.",
    "",
    "## Raw Pick",
    "",
    "```json",
    JSON.stringify(pick, null, 2),
    "```",
    "",
  ].join("\n");
}

function writePickDraft(year, pick, apiUrl) {
  const name = getPickName(pick);
  const fileName = `${String(pick.overallPick).padStart(3, "0")}-${slugify(name)}.md`;
  const outPath = path.join(draftsDir, fileName);
  fs.writeFileSync(outPath, buildDraftMarkdown(pick, apiUrl));
  return outPath;
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkDraft(args, state) {
  const apiUrl = `${draftApiBase}/draft/picks/${args.year}/all`;
  const draft = await fetchJson(apiUrl);
  const selectedRangersPicks = (draft.picks || [])
    .filter(isRangersPick)
    .filter(isSelectedPick);
  const processed = new Set(state.processedPickKeys || []);
  const newPicks = selectedRangersPicks.filter((pick) => {
    const key = pickKey(args.year, pick);
    return args.alertAllExisting || !processed.has(key);
  });

  for (const pick of newPicks) {
    const key = pickKey(args.year, pick);
    const name = getPickName(pick);
    const outPath = writePickDraft(args.year, pick, apiUrl);
    const alertText = `NYR Prospects HQ: new draft-pick post ready for approval. No. ${pick.overallPick} - ${name}. Please approve before posting.`;

    console.log(`[${new Date().toISOString()}] NEW NYR PICK ${key}: ${name}`);
    console.log(`Draft: ${outPath}`);
    notifyLocal("NYR Prospects HQ", alertText);

    if (!args.noText) {
      const textResult = sendText(args.phone, alertText);
      if (textResult.ok) {
        console.log("Text alert sent.");
      } else {
        console.error(`Text alert failed: ${textResult.reason}`);
      }
    }

    if (!args.alertAllExisting) {
      processed.add(key);
      state.processedPickKeys = Array.from(processed);
      state.lastProcessedAt = new Date().toISOString();
      saveState(state);
    }
  }

  if (!newPicks.length) {
    console.log(
      `[${new Date().toISOString()}] Checked ${selectedRangersPicks.length} selected NYR pick(s); no new alerts.`,
    );
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  ensureDirs();
  const state = loadState();
  saveState(state);

  console.log(
    `NYR draft watch running for ${args.year}. Polling every ${Math.round(args.pollMs / 1000)}s.`,
  );

  while (true) {
    try {
      await checkDraft(args, state);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] ${error.stack || error.message}`);
    }

    if (args.once) {
      break;
    }

    await sleep(args.pollMs);
  }
}

main();
