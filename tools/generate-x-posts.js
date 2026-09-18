#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { spawnSync } = require("child_process");

const rootDir = path.resolve(__dirname, "..");
const statsPath = path.join(rootDir, "data", "player-stats.json");
const scriptsPath = path.join(rootDir, "scripts.js");
const outputDir = path.join(rootDir, "social-drafts");
const defaultTimeZone = "America/New_York";
const maxPostLength = 275;

function parseArgs(argv) {
  const args = {
    timeZone: defaultTimeZone,
    out: "",
    date: "",
    phone: process.env.DRAFT_ALERT_PHONE || process.env.POST_ALERT_PHONE || "",
    noText: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--date") {
      args.date = argv[index + 1] || "";
      index += 1;
    } else if (arg === "--timezone") {
      args.timeZone = argv[index + 1] || defaultTimeZone;
      index += 1;
    } else if (arg === "--out") {
      args.out = argv[index + 1] || "";
      index += 1;
    } else if (arg === "--phone") {
      args.phone = argv[index + 1] || "";
      index += 1;
    } else if (arg === "--no-text") {
      args.noText = true;
    }
  }

  return args;
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

function dateInTimeZone(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${values.year}-${values.month}-${values.day}`;
}

function addDays(dateString, days) {
  const date = new Date(`${dateString}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function displayDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${dateString}T12:00:00Z`));
}

function displayTimeInEt(value) {
  if (!value) {
    return "Time TBD";
  }

  return new Intl.DateTimeFormat("en-US", {
    timeZone: defaultTimeZone,
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(value));
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractArrayLiteral(source, variableName) {
  const marker = `const ${variableName} = [`;
  const start = source.indexOf(marker);

  if (start === -1) {
    throw new Error(`Could not find ${variableName} in scripts.js`);
  }

  const openIndex = source.indexOf("[", start);
  let depth = 0;
  let quote = "";
  let escaped = false;

  for (let index = openIndex; index < source.length; index += 1) {
    const char = source[index];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (quote) {
      if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = "";
      }
      continue;
    }

    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "[") {
      depth += 1;
    } else if (char === "]") {
      depth -= 1;

      if (depth === 0) {
        return source.slice(openIndex, index + 1);
      }
    }
  }

  throw new Error(`Could not parse ${variableName} in scripts.js`);
}

function readRegistry() {
  const source = fs.readFileSync(scriptsPath, "utf8");
  const sandbox = {};
  vm.runInNewContext(
    `playerProfiles = ${extractArrayLiteral(source, "playerProfiles")}; prospectConsensusOrder = ${extractArrayLiteral(source, "prospectConsensusOrder")};`,
    sandbox,
  );

  const rankByName = new Map(
    sandbox.prospectConsensusOrder.map((name, index) => [name, index]),
  );

  return sandbox.playerProfiles.map((player) => ({
    ...player,
    slug: slugify(player.name),
    rank: rankByName.get(player.name) ?? Number.MAX_SAFE_INTEGER,
  }));
}

function readDraftedRangersNews() {
  const source = fs.readFileSync(scriptsPath, "utf8");

  if (!source.includes("const draftedRangersNews = [")) {
    return [];
  }

  const sandbox = {};
  vm.runInNewContext(
    `draftedRangersNews = ${extractArrayLiteral(source, "draftedRangersNews")};`,
    sandbox,
  );

  return sandbox.draftedRangersNews || [];
}

function readStats() {
  return JSON.parse(fs.readFileSync(statsPath, "utf8"));
}

function getLeagueFromCurrentTeam(currentTeam = "") {
  const match = String(currentTeam).match(/,\s*([^,]+)$/);
  if (/no qualifying offer|ufa/i.test(currentTeam)) {
    return "Roster Review";
  }
  return match ? match[1].trim() : "TBD";
}

function getGameLeague(player, playerStats, game) {
  return (
    game.league ||
    playerStats?.currentAssignment?.league ||
    getLeagueFromCurrentTeam(player.currentTeam)
  );
}

function isActiveRegistryPlayer(player) {
  return !["Graduated", "Traded draft picks"].includes(player.group);
}

function groupBy(items, getKey) {
  return items.reduce((groups, item) => {
    const key = getKey(item);
    groups.set(key, [...(groups.get(key) || []), item]);
    return groups;
  }, new Map());
}

function formatOpponent(game) {
  const opponent = game.opponentName || game.opponent || "Opponent TBD";
  return `${game.homeAway || "vs"} ${opponent}`.trim();
}

function formatResultLine(result) {
  const { player, game } = result;
  const gameResult = game.result ? `, ${game.result}` : "";
  const prefix = `${player.name} (${game.team || "Team TBD"} ${formatOpponent(game)}${gameResult})`;
  const source = game.source?.url ? ` ${game.source.url}` : "";

  if (game.role === "goalie") {
    const decision = game.decision ? `${game.decision}, ` : "";
    const saves =
      game.saves !== undefined && game.shotsAgainst !== undefined
        ? `${game.saves}/${game.shotsAgainst} saves`
        : "saves TBD";
    const savePct = game.savePct ? `, ${game.savePct} SV%` : "";
    const goalsAgainst = game.goalsAgainst !== undefined ? `, ${game.goalsAgainst} GA` : "";
    return `${prefix}: ${decision}${saves}${savePct}${goalsAgainst}${source}`;
  }

  const goals = game.goals ?? 0;
  const assists = game.assists ?? 0;
  const points = game.points ?? goals + assists;
  const shots = game.shots !== undefined && game.shots !== null ? `, ${game.shots} SOG` : "";
  const pim = game.pim !== undefined ? `, ${game.pim} PIM` : "";
  const pointsLabel = points === 1 ? "PT" : "PTS";
  const toi = game.toi && game.toi !== "0:00" ? `, ${game.toi} TOI` : "";

  return `${prefix}: ${goals}G, ${assists}A, ${points}${pointsLabel}${shots}${pim}${toi}${source}`;
}

function formatWatchLine(item) {
  const { player, game } = item;
  const source = game.source?.url ? ` | ${game.source.label || "Game link"}: ${game.source.url}` : "";
  return `${displayTimeInEt(game.time)} - ${player.name}: ${game.team || "Team TBD"} ${formatOpponent(game)}${source}`;
}

function splitIntoPosts(title, lines, footer = "") {
  if (!lines.length) {
    return [];
  }

  const posts = [];
  let current = title;

  lines.forEach((line) => {
    const candidate = `${current}\n${line}`;

    if (candidate.length > maxPostLength && current !== title) {
      posts.push(current);
      current = `${title}\n${line}`;
    } else {
      current = candidate;
    }
  });

  if (footer) {
    const candidate = `${current}\n${footer}`;
    if (candidate.length > maxPostLength && current !== title) {
      posts.push(current);
      current = `${title}\n${footer}`;
    } else {
      current = candidate;
    }
  }

  posts.push(current);

  return posts.map((post, index, allPosts) =>
    allPosts.length > 1 ? `${post}\n(${index + 1}/${allPosts.length})` : post,
  );
}

function collectResults(players, stats, targetDate) {
  return players
    .filter(isActiveRegistryPlayer)
    .flatMap((player) => {
      const playerStats = stats.players?.[player.slug];
      const games = playerStats?.lastFiveGames?.games || [];

      return games
        .filter((game) => game.date === targetDate)
        .map((game) => ({
          player,
          playerStats,
          game,
          league: getGameLeague(player, playerStats, game),
          highlights: game.highlightLinks || [],
        }));
    })
    .sort((first, second) => first.player.rank - second.player.rank);
}

function collectNews(players, stats, targetDate, draftedNews = []) {
  const notes = [];

  players
    .filter(isActiveRegistryPlayer)
    .forEach((player) => {
      const playerStats = stats.players?.[player.slug];
      const marker = playerStats?.latestUpdateNews;
      const sameDayNewsNotes = (playerStats?.newsNotes || []).filter(
        (note) => note.date === targetDate,
      );
      const postableNewsNotes = sameDayNewsNotes.filter(
        (note) => !/game logged|game result/i.test(`${note.title || ""} ${note.body || ""}`),
      );

      if (marker?.status === "new" && !sameDayNewsNotes.length) {
        notes.push({
          player,
          date: marker.updatedAt?.slice(0, 10) || targetDate,
          line: `${player.name}: ${marker.note || marker.label || "Updated in latest cycle."}`,
        });
      }

      postableNewsNotes.forEach((note) => {
        const source = note.source?.url ? ` ${note.source.url}` : "";
        notes.push({
          player,
          date: note.date,
          line: `${player.name}: ${note.title || "Note"} - ${note.body || ""}${source}`.trim(),
        });
      });
    });

  draftedNews
    .filter((item) => (item.detectedDate || item.date) === targetDate)
    .forEach((item, index) => {
      const source = item.source?.url ? ` ${item.source.url}` : "";
      notes.push({
        player: {
          name: item.playerName,
          rank: Number.MAX_SAFE_INTEGER - 1000 + index,
        },
        date: item.date,
        line:
          `Drafted by NYR alumni: ${item.playerName}: ${item.title}. ${item.draftInfo}.${source}`.trim(),
      });
    });

  return notes.sort((first, second) => first.player.rank - second.player.rank);
}

function collectTomorrowWatch(players, stats, watchDate) {
  return players
    .filter(isActiveRegistryPlayer)
    .flatMap((player) => {
      const playerStats = stats.players?.[player.slug];
      const games = playerStats?.nextFiveGames?.games || [];

      return games
        .filter((game) => game.date === watchDate)
        .map((game) => ({
          player,
          playerStats,
          game,
          league: getGameLeague(player, playerStats, game),
        }));
    })
    .sort((first, second) => {
      const timeCompare = String(first.game.time || "").localeCompare(String(second.game.time || ""));
      return timeCompare || first.player.rank - second.player.rank;
    });
}

function buildResultPosts(results, targetDate) {
  if (!results.length) {
    return [];
  }

  const footer = "#NYR";

  if (results.length <= 5) {
    const lines = results.map(formatResultLine);
    const highlightLines = results.flatMap((result) =>
      result.highlights.map((link) => `Clip - ${result.player.name}: ${link.url}`),
    );

    return splitIntoPosts(
      `NYR Prospects results - ${displayDate(targetDate)}`,
      [...lines, ...highlightLines],
      footer,
    );
  }

  return Array.from(groupBy(results, (result) => result.league).entries()).flatMap(
    ([league, leagueResults]) => {
      const lines = leagueResults.map(formatResultLine);
      const highlightLines = leagueResults.flatMap((result) =>
        result.highlights.map((link) => `Clip - ${result.player.name}: ${link.url}`),
      );

      return splitIntoPosts(
        `NYR Prospects ${league} results - ${displayDate(targetDate)}`,
        [...lines, ...highlightLines],
        footer,
      );
    },
  );
}

function buildNewsPosts(news, targetDate) {
  if (!news.length) {
    return [];
  }

  return splitIntoPosts(
    `NYR Prospects News & Notes - ${displayDate(targetDate)}`,
    news.map((item) => item.line),
    "#NYR",
  );
}

function buildWatchPosts(watchItems, watchDate) {
  if (!watchItems.length) {
    return [];
  }

  const groupedLines = Array.from(groupBy(watchItems, (item) => item.league).entries()).flatMap(
    ([league, items]) => [`${league}:`, ...items.map(formatWatchLine)],
  );

  return splitIntoPosts(
    `NYR Prospects watch list - ${displayDate(watchDate)}`,
    groupedLines,
    "#NYR",
  );
}

function renderPostBlock(label, posts, emptyMessage, schedule = "") {
  if (!posts.length) {
    return `## ${label}\n\n${emptyMessage}\n`;
  }

  return [
    `## ${label}`,
    schedule ? `\nSuggested timing: ${schedule}` : "",
    posts
      .map(
        (post, index) => `
### Post ${index + 1}

\`\`\`text
${post}
\`\`\`

Characters: ${post.length}
`,
      )
      .join("\n"),
  ].join("\n");
}

function getPostDraftAlerts(resultPosts, newsPosts, watchPosts) {
  return [
    ...resultPosts.map((post, index) => ({
      label: "results",
      index,
      total: resultPosts.length,
      post,
    })),
    ...newsPosts.map((post, index) => ({
      label: "news",
      index,
      total: newsPosts.length,
      post,
    })),
    ...watchPosts.map((post, index) => ({
      label: "next-day watch",
      index,
      total: watchPosts.length,
      post,
    })),
  ];
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const targetDate = args.date || dateInTimeZone(new Date(), args.timeZone);
  const watchDate = addDays(targetDate, 1);
  const players = readRegistry();
  const draftedNews = readDraftedRangersNews();
  const stats = readStats();
  const results = collectResults(players, stats, targetDate);
  const news = collectNews(players, stats, targetDate, draftedNews);
  const watchItems = collectTomorrowWatch(players, stats, watchDate);
  const resultPosts = buildResultPosts(results, targetDate);
  const newsPosts = buildNewsPosts(news, targetDate);
  const watchPosts = buildWatchPosts(watchItems, watchDate);
  const postDraftAlerts = getPostDraftAlerts(resultPosts, newsPosts, watchPosts);
  const postCount = postDraftAlerts.length;
  const outPath =
    args.out || path.join(outputDir, `x-posts-${targetDate}.md`);

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(
    outPath,
    [
      `# X Drafts - ${displayDate(targetDate)}`,
      "",
      `Generated from NYR Prospects HQ data checked at: ${stats.metadata?.lastCheckedAt || "unknown"}`,
      `Results date: ${targetDate}`,
      `Next-day watch date: ${watchDate}`,
      "",
      renderPostBlock(
        "Tonight's Results",
        resultPosts,
        "No verified prospect game results found for this date. Skip the results post.",
      ),
      renderPostBlock(
        "News & Notes",
        newsPosts,
        "No new verified prospect news notes found for this date. Skip the news post unless adding a manual note.",
      ),
      renderPostBlock(
        "Next-Day Watch",
        watchPosts,
        "No verified next-day games found. Skip the 7 AM ET watch post.",
        "Schedule for 7:00 AM ET the next morning",
      ),
      "",
      "## Source Counts",
      "",
      `- Result player-games: ${results.length}`,
      `- News notes: ${news.length}`,
      `- Next-day watch items: ${watchItems.length}`,
      "",
      "Note: preview markers are ignored. Only real automation markers with status `new` are treated as news.",
      "",
    ].join("\n"),
  );

  console.log(`Wrote ${outPath}`);
  console.log(
    `Drafted ${resultPosts.length} result post(s), ${newsPosts.length} news post(s), and ${watchPosts.length} next-day watch post(s).`,
  );

  if (!args.noText && postCount > 0) {
    postDraftAlerts.forEach((draft, alertIndex) => {
      const textResult = sendText(
        args.phone,
        `NYR Prospects HQ: ${draft.label} post ${draft.index + 1}/${draft.total} ready for approval (${alertIndex + 1}/${postCount}) for ${displayDate(targetDate)}. File: ${outPath}`,
      );

      if (textResult.ok) {
        console.log(`Post draft text alert sent for ${draft.label} post ${draft.index + 1}.`);
      } else {
        console.error(`Post draft text alert failed: ${textResult.reason}`);
      }
    });
  }
}

main();
