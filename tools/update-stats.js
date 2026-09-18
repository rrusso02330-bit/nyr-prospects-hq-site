#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rootDir = path.resolve(__dirname, "..");
const statsPath = path.join(rootDir, "data", "player-stats.json");
const statsJsPath = path.join(rootDir, "data", "player-stats.js");
const scriptsPath = path.join(rootDir, "scripts.js");
const now = new Date().toISOString();
const currentCycleDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Denver",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());
const gamecenterCache = new Map();
const hockeyTechCache = new Map();
const ahlScheduleCache = new Map();
const ahlGameSummaryCache = new Map();
const pageTextCache = new Map();

const ahlConfig = {
  clientCode: "ahl",
  key: "ccb91f29d6744675",
  leagueId: "4",
  siteId: "3",
  baseUrl: "https://lscluster.hockeytech.com/feed/index.php",
  sourceBaseUrl: "https://theahl.com/stats",
  teams: {
    "hartford wolf pack": {
      id: "307",
      abbreviation: "HFD",
      name: "Hartford Wolf Pack",
    },
  },
};

const ohlConfig = {
  baseUrl: "https://chl.ca/ohl",
  playerLookupSeasons: ["85", "83", "88"],
  gameSeasons: [
    { id: "88", label: "2026-27", type: "Regular" },
    { id: "85", label: "2025-26", type: "Playoffs" },
    { id: "83", label: "2025-26", type: "Regular" },
  ],
  scheduleSeason: { id: "88", label: "2026-27", type: "Regular" },
  teams: {
    "barrie colts": {
      id: "7",
      city: "Barrie",
      abbreviation: "BAR",
      name: "Barrie Colts",
    },
    "flint firebirds": {
      id: "13",
      city: "Flint",
      abbreviation: "FLNT",
      name: "Flint Firebirds",
    },
    "kingston frontenacs": {
      id: "2",
      city: "Kingston",
      abbreviation: "KGN",
      name: "Kingston Frontenacs",
    },
    "ottawa 67's": {
      id: "5",
      city: "Ottawa",
      abbreviation: "OTT",
      name: "Ottawa 67's",
    },
    "sudbury wolves": {
      id: "12",
      city: "Sudbury",
      abbreviation: "SBY",
      name: "Sudbury Wolves",
    },
    "windsor spitfires": {
      id: "17",
      city: "Windsor",
      abbreviation: "WSR",
      name: "Windsor Spitfires",
    },
  },
};

const nhlApiPlayerIds = {
  "nathan-aspinall": 8485039,
  "sean-barnhill": 8485427,
  "jacob-battaglia": 8484785,
  "raoul-boilard": 8484791,
  "ej-emery": 8484848,
  "mikkel-eriksen": 8485596,
  "felix-farhammar": 8485668,
  "rico-gredig": 8485058,
  "liam-greentree": 8484802,
  "artem-gonchar": 8485573,
  "ty-henricks": 8484457,
  "samuel-jung": 8485632,
  "rasmus-larsson": 8484436,
  "zeb-lindgren": 8485443,
  "evan-passmore": 8485643,
  "malcolm-spence": 8485359,
  "jaroslav-chmelar": 8482877,
  "drew-fortescue": 8484169,
  "gabe-perreault": 8484210,
  "adam-sykora": 8483669,
  "noah-laba": 8483690,
  "dylan-garand": 8482193,
  "brett-berard": 8482132,
  "william-trudeau": 8482806,
  "talyn-boyko": 8482869,
  "brendan-brisson": 8482153,
  "jackson-dorrington": 8483750,
  "brody-lamb": 8482928,
  "bryce-mcconnell-barker": 8483486,
  "scott-morrow": 8482666,
  "hugo-ollas": 8482504,
  "dylan-roobroeck": 8484461,
  "carey-terrance": 8484236,
  "callum-tung": 8485489,
  "kalle-vaisanen": 8482868,
  "karl-henriksson": 8481548,
  "lauri-pajuniemi": 8480986,
  "juuso-parssinen": 8481704,
  "aidan-thompson": 8483685,
  "vincent-iorio": 8482861,
  "massimo-rizzo": 8481760,
  "alberts-smits": 8485957,
  "benjamin-macbeath": 8486064,
  "danai-shaiikov": 8486226,
  "charlie-morrison": 8486069,
  "tomas-chrenko": 8486232,
  "spencer-bowes": 8486247,
  "andre-mondoux": 8485710,
  "darian-anderson": 8486295,
  "ivan-patrikhayev": 8486321,
};

const clubLeagues = new Set([
  "AHL",
  "DEL",
  "ECHL",
  "HockeyAllsvenskan",
  "HockeyEttan",
  "J20 Nationell",
  "KHL",
  "Liiga",
  "MHL",
  "NCAA",
  "NHL",
  "NL",
  "OHL",
  "QMJHL",
  "SHL",
  "Slovakia",
  "U20 Nationell",
  "USHL",
  "VHL",
  "WHL",
]);

function readStats() {
  return JSON.parse(fs.readFileSync(statsPath, "utf8"));
}

function writeStats(stats) {
  fs.writeFileSync(statsPath, `${JSON.stringify(stats, null, 2)}\n`);
  fs.writeFileSync(
    statsJsPath,
    `window.NYR_PLAYER_STATS = ${JSON.stringify(stats, null, 2)};\n`,
  );
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getLeagueFromCurrentTeam(currentTeam = "") {
  const match = String(currentTeam).match(/,\s*([^,]+)$/);

  if (match) {
    return match[1].trim();
  }

  if (/pending|tbd/i.test(currentTeam)) {
    return "Assignment TBD";
  }

  if (/no qualifying offer|ufa/i.test(currentTeam)) {
    return "Roster Review";
  }

  if (/\bU20\b/i.test(currentTeam)) {
    return "Sweden Jr.";
  }

  return "TBD";
}

function getTeamNameFromCurrentTeam(currentTeam = "") {
  return String(currentTeam).split(",")[0]?.trim() || "TBD";
}

function withoutVolatileFields(value) {
  if (Array.isArray(value)) {
    return value.map(withoutVolatileFields);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => key !== "updatedAt")
        .map(([key, entryValue]) => [key, withoutVolatileFields(entryValue)]),
    );
  }

  return value;
}

function comparableUpdateValue(value) {
  return JSON.stringify(withoutVolatileFields(value ?? null));
}

function buildPlayerUpdateSnapshot(player) {
  return {
    sourceStatus: comparableUpdateValue(player.sourceStatus || ""),
    sourceError: comparableUpdateValue(player.sourceError || ""),
    sourceNote: comparableUpdateValue(player.sourceNote || ""),
    seasons: comparableUpdateValue(player.seasons || []),
    currentSeasonStats: comparableUpdateValue(player.currentSeasonStats || null),
    lastFiveGames: comparableUpdateValue(player.lastFiveGames || null),
    nextFiveGames: comparableUpdateValue(player.nextFiveGames || null),
    draftInfo: comparableUpdateValue(player.draftInfo || null),
    currentAssignment: comparableUpdateValue(player.currentAssignment || null),
  };
}

function getPlayerUpdateChanges(beforeSnapshot, player) {
  const watchedFields = [
    ["sourceError", "source error", player.sourceError || ""],
    ["draftInfo", "draft details", player.draftInfo || null],
    ["currentAssignment", "team/league assignment", player.currentAssignment || null],
  ];

  return watchedFields
    .filter(([key, , value]) => beforeSnapshot[key] !== comparableUpdateValue(value))
    .map(([, label]) => label);
}

function getCurrentCycleNewsNoteLabels(player) {
  const notes = Array.isArray(player.newsNotes) ? player.newsNotes : [];

  return notes
    .filter((note) => note?.date === currentCycleDate)
    .map((note) => note.title || "News note");
}

function uniqueLabels(labels) {
  return Array.from(new Set(labels.filter(Boolean)));
}

function gameDedupKey(game) {
  return [
    game?.gameId || "",
    game?.date || "",
    game?.team || "",
    game?.opponentName || game?.opponent || "",
  ].join("|");
}

function uniqueSourceLinks(links) {
  const seen = new Set();

  return links
    .filter((link) => link?.url)
    .filter((link) => {
      if (seen.has(link.url)) {
        return false;
      }

      seen.add(link.url);
      return true;
    });
}

function mergeManualLastFiveGames(gameWindow, manualGames = []) {
  const manualEntries = Array.isArray(manualGames)
    ? manualGames
        .filter((game) => game?.date)
        .map((game) => ({
          ...game,
          highlightLinks: Array.isArray(game.highlightLinks) ? game.highlightLinks : [],
        }))
    : [];

  if (!manualEntries.length) {
    return gameWindow;
  }

  const baseWindow = gameWindow || { games: [] };
  const generatedEntries = Array.isArray(baseWindow.games) ? baseWindow.games : [];
  const seen = new Set();
  const games = [...manualEntries, ...generatedEntries]
    .filter((game) => {
      const key = gameDedupKey(game);

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .sort((first, second) => {
      const dateCompare = String(second.date || "").localeCompare(String(first.date || ""));

      if (dateCompare) {
        return dateCompare;
      }

      return String(second.gameId || "").localeCompare(String(first.gameId || ""));
    })
    .slice(0, 5);

  return {
    ...baseWindow,
    status: generatedEntries.length
      ? `${baseWindow.status || "verified"}_with_manual_entries`
      : "manual_verified",
    league: manualEntries[0]?.league || baseWindow.league,
    team: manualEntries[0]?.team || baseWindow.team,
    sourceLinks: uniqueSourceLinks([
      ...(baseWindow.sourceLinks || []),
      ...manualEntries.map((game) => game.source),
    ]),
    games,
    note: [
      baseWindow.note,
      "Manual game entries are preserved for verified showcase or international games outside the connected league feeds.",
    ]
      .filter(Boolean)
      .join(" "),
  };
}

function extractArrayLiteral(source, variableName) {
  const marker = `const ${variableName} = [`;
  const start = source.indexOf(marker);

  if (start === -1) {
    return null;
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

  return null;
}

function readRegistryAssignments() {
  try {
    const source = fs.readFileSync(scriptsPath, "utf8");
    const literal = extractArrayLiteral(source, "playerProfiles");

    if (!literal) {
      return new Map();
    }

    const profiles = vm.runInNewContext(`(${literal})`, {});

    return new Map(
      profiles.map((profile) => {
        const currentTeam = profile.currentTeam || "TBD";
        return [
          slugify(profile.name),
          {
            currentTeam,
            team: getTeamNameFromCurrentTeam(currentTeam),
            league: getLeagueFromCurrentTeam(currentTeam),
            group: profile.group || "TBD",
          },
        ];
      }),
    );
  } catch (error) {
    console.warn(`Unable to read player assignments from scripts.js: ${error.message}`);
    return new Map();
  }
}

function seasonNumberToLabel(season) {
  const value = String(season);
  return `${value.slice(0, 4)}-${value.slice(6, 8)}`;
}

function seasonLabelToNumber(label) {
  const match = String(label).match(/^(\d{4})-(\d{2})$/);

  if (!match) {
    return 0;
  }

  const start = Number(match[1]);
  return Number(`${start}${start + 1}`);
}

function controlDateToSeason(controlStartDate) {
  const date = new Date(`${controlStartDate}T00:00:00Z`);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const seasonStart = month >= 6 ? year : year - 1;
  return Number(`${seasonStart}${seasonStart + 1}`);
}

function formatNumber(value, digits = 2) {
  if (value === undefined || value === null || Number.isNaN(Number(value))) {
    return null;
  }

  return Number(value).toFixed(digits);
}

function formatSavePct(value) {
  if (value === undefined || value === null || Number.isNaN(Number(value))) {
    return null;
  }

  return Number(value).toFixed(3).replace(/^0/, "");
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchJsonWithRetry(url, label) {
  let latestError = null;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(url);

    if (response.ok) {
      await sleep(125);
      return response.json();
    }

    latestError = new Error(`${label} returned ${response.status}`);

    if (response.status !== 429 || attempt === 3) {
      break;
    }

    const retryAfter = Number(response.headers.get("retry-after"));
    const waitMs = Number.isFinite(retryAfter)
      ? retryAfter * 1000
      : 900 * (attempt + 1);
    await sleep(waitMs);
  }

  throw latestError;
}

function parseJsonOrJsonp(text) {
  const trimmed = String(text).trim();
  const jsonText =
    trimmed.startsWith("(") && trimmed.endsWith(")")
      ? trimmed.slice(1, -1)
      : trimmed.replace(/^[^(]+\(/, "").replace(/\);?$/, "");

  return JSON.parse(jsonText);
}

async function fetchJsonpWithRetry(url, label) {
  if (hockeyTechCache.has(url)) {
    return hockeyTechCache.get(url);
  }

  let latestError = null;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(url);

    if (response.ok) {
      const text = await response.text();
      await sleep(125);
      const data = parseJsonOrJsonp(text);
      hockeyTechCache.set(url, data);
      return data;
    }

    latestError = new Error(`${label} returned ${response.status}`);

    if (response.status !== 429 || attempt === 3) {
      break;
    }

    const retryAfter = Number(response.headers.get("retry-after"));
    const waitMs = Number.isFinite(retryAfter)
      ? retryAfter * 1000
      : 900 * (attempt + 1);
    await sleep(waitMs);
  }

  throw latestError;
}

async function fetchTextWithRetry(url, label) {
  if (pageTextCache.has(url)) {
    return pageTextCache.get(url);
  }

  let latestError = null;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; NYRProspectsHQ/1.0; +https://nyr-prospects-hq.netlify.app)",
      },
    });

    if (response.ok) {
      const text = await response.text();
      await sleep(125);
      pageTextCache.set(url, text);
      return text;
    }

    latestError = new Error(`${label} returned ${response.status}`);

    if (response.status !== 429 || attempt === 3) {
      break;
    }

    const retryAfter = Number(response.headers.get("retry-after"));
    const waitMs = Number.isFinite(retryAfter)
      ? retryAfter * 1000
      : 900 * (attempt + 1);
    await sleep(waitMs);
  }

  throw latestError;
}

function extractDataArrayAfter(source, marker) {
  const markerIndex = source.indexOf(marker);

  if (markerIndex === -1) {
    return [];
  }

  const dataIndex = source.indexOf("data:", markerIndex);

  if (dataIndex === -1) {
    return [];
  }

  const openIndex = source.indexOf("[", dataIndex);

  if (openIndex === -1) {
    return [];
  }

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
        return vm.runInNewContext(source.slice(openIndex, index + 1), {});
      }
    }
  }

  return [];
}

function sourceForPlayer(playerId) {
  return {
    label: "NHL API",
    url: `https://api-web.nhle.com/v1/player/${playerId}/landing`,
  };
}

function sourceForGameLog(playerId, season, gameTypeId) {
  return {
    label: "NHL API game log",
    url: `https://api-web.nhle.com/v1/player/${playerId}/game-log/${season}/${gameTypeId}`,
  };
}

function sourceForGamecenter(gameId) {
  return {
    label: "NHL Gamecenter",
    url: `https://api-web.nhle.com/v1/gamecenter/${gameId}/landing`,
  };
}

function sourceForNhlSchedule(teamAbbrev, season) {
  return {
    label: "NHL API schedule",
    url: `https://api-web.nhle.com/v1/club-schedule-season/${teamAbbrev}/${season}`,
  };
}

function sourceForAhlSchedule(teamId = ahlConfig.teams["hartford wolf pack"].id, seasonId = "90") {
  return {
    label: "AHL schedule",
    url: `${ahlConfig.sourceBaseUrl}/schedule/${teamId}/${seasonId}`,
  };
}

function sourceForAhlGameSummary(gameId) {
  return {
    label: "AHL game summary",
    url: `${ahlConfig.sourceBaseUrl}/game-summary/${gameId}`,
  };
}

function sourceForOhlPlayerStats(seasonId = "83") {
  return {
    label: "OHL player stats",
    url: `${ohlConfig.baseUrl}/stats/players/${seasonId}/`,
  };
}

function sourceForOhlGameByGame(playerId, seasonId) {
  return {
    label: "OHL game-by-game",
    url: `${ohlConfig.baseUrl}/players/${playerId}/game_by_game/${seasonId}`,
  };
}

function sourceForOhlSchedule(seasonId = ohlConfig.scheduleSeason.id) {
  return {
    label: "OHL schedule",
    url: `${ohlConfig.baseUrl}/schedule/0/${seasonId}/`,
  };
}

function sourceLinksForLeague(league, assignment = {}) {
  const teamKey = (assignment.team || "").toLowerCase();

  if (league === "AHL" && ahlConfig.teams[teamKey]) {
    const team = ahlConfig.teams[teamKey];
    return [
      {
        label: "AHL player stats",
        url: `${ahlConfig.sourceBaseUrl}/player-stats/${team.id}/90`,
      },
      sourceForAhlSchedule(team.id, "90"),
    ];
  }

  const linksByLeague = {
    ECHL: [{ label: "ECHL stats", url: "https://echl.com/stats" }],
    DEL: [{ label: "DEL stats", url: "https://www.penny-del.org/statistiken" }],
    "HockeyAllsvenskan": [
      { label: "HockeyAllsvenskan stats", url: "https://www.hockeyallsvenskan.se/statistik" },
    ],
    Liiga: [{ label: "Liiga stats", url: "https://liiga.fi/en/stats" }],
    KHL: [{ label: "KHL stats", url: "https://en.khl.ru/stat/" }],
    NCAA: [{ label: "NCAA hockey stats", url: "https://www.ncaa.com/stats/icehockey-men/d1" }],
    NL: [
      { label: "National League stats", url: "https://www.nationalleague.ch/statistics" },
    ],
    OHL: [
      sourceForOhlPlayerStats("83"),
      sourceForOhlPlayerStats("85"),
      sourceForOhlSchedule(ohlConfig.scheduleSeason.id),
    ],
    SHL: [{ label: "SHL stats", url: "https://www.shl.se/statistik/spelare" }],
    Slovakia: [{ label: "Slovak Extraliga stats", url: "https://www.hockeyslovakia.sk/en/stats" }],
    "Sweden Jr.": [{ label: "Swedish hockey stats", url: "https://stats.swehockey.se/" }],
    QMJHL: [{ label: "QMJHL stats", url: "https://chl.ca/lhjmq/en/stats/players/" }],
    WHL: [{ label: "WHL stats", url: "https://chl.ca/whl/stats/players/" }],
  };

  return linksByLeague[league] || [];
}

function draftInfoFromLanding(landing, player, playerId) {
  const details = landing.draftDetails;

  if (!details) {
    const isUndrafted = /^Undrafted/i.test(player.controlStartLabel || player.name);

    return {
      status: isUndrafted ? "undrafted" : "not_listed",
      year: null,
      team: null,
      round: null,
      pickInRound: null,
      overallPick: null,
      displayYear: isUndrafted ? "Undrafted" : "TBD",
      displayPick: isUndrafted ? "Undrafted" : "TBD",
      source: sourceForPlayer(playerId),
    };
  }

  return {
    status: "drafted",
    year: details.year ?? null,
    team: details.teamAbbrev || null,
    round: details.round ?? null,
    pickInRound: details.pickInRound ?? null,
    overallPick: details.overallPick ?? null,
    displayYear: details.year ? String(details.year) : "TBD",
    displayPick:
      details.round && details.overallPick
        ? `Rd ${details.round}, No. ${details.overallPick}`
        : "TBD",
    source: sourceForPlayer(playerId),
  };
}

function rowFromSeasonTotal(total, playerId) {
  const isGoalie = total.goalsAgainstAvg !== undefined || total.savePctg !== undefined;
  const type = total.gameTypeId === 3 ? "Playoffs" : "Regular";
  const base = {
    season: seasonNumberToLabel(total.season),
    type,
    team: total.teamName?.default || "TBD",
    league: total.leagueAbbrev || "TBD",
    gp: total.gamesPlayed ?? 0,
    source: sourceForPlayer(playerId),
  };

  if (isGoalie) {
    return {
      ...base,
      w: total.wins ?? null,
      l: total.losses ?? null,
      ot: total.otLosses ?? null,
      gaa: formatNumber(total.goalsAgainstAvg),
      savePct: formatSavePct(total.savePctg),
    };
  }

  return {
    ...base,
    goals: total.goals ?? 0,
    assists: total.assists ?? 0,
    points: total.points ?? 0,
    pim: total.pim ?? 0,
  };
}

function rowFromGameLog(game, gameTypeId) {
  const isGoalie =
    game.shotsAgainst !== undefined ||
    game.goalsAgainst !== undefined ||
    game.savePctg !== undefined ||
    game.decision !== undefined;
  const base = {
    gameId: game.gameId,
    date: game.gameDate,
    type: gameTypeId === 3 ? "Playoffs" : "Regular",
    team: game.teamAbbrev || "TBD",
    opponent: game.opponentAbbrev || game.opponentCommonName?.default || "TBD",
    opponentName: game.opponentCommonName?.default || game.opponentAbbrev || "TBD",
    homeAway: game.homeRoadFlag === "H" ? "vs" : "@",
    toi: game.toi || null,
  };

  if (isGoalie) {
    const saves =
      game.shotsAgainst !== undefined && game.goalsAgainst !== undefined
        ? game.shotsAgainst - game.goalsAgainst
        : null;

    return {
      ...base,
      role: "goalie",
      gamesStarted: game.gamesStarted ?? null,
      decision: game.decision || null,
      shotsAgainst: game.shotsAgainst ?? null,
      saves,
      goalsAgainst: game.goalsAgainst ?? null,
      savePct: formatSavePct(game.savePctg),
    };
  }

  return {
    ...base,
    role: "skater",
    goals: game.goals ?? 0,
    assists: game.assists ?? 0,
    points: game.points ?? (game.goals ?? 0) + (game.assists ?? 0),
    shots: game.shots ?? null,
    pim: game.pim ?? 0,
  };
}

function latestSeasonLabel(rows) {
  return rows.reduce((latest, row) => {
    if (!latest) {
      return row.season;
    }

    return seasonLabelToNumber(row.season) > seasonLabelToNumber(latest)
      ? row.season
      : latest;
  }, "");
}

function rowsForLatestSeason(rows) {
  const season = latestSeasonLabel(rows);

  if (!season) {
    return { season: null, rows: [] };
  }

  return {
    season,
    rows: rows.filter((row) => row.season === season),
  };
}

async function fetchNhlLanding(playerId) {
  return fetchJsonWithRetry(
    `https://api-web.nhle.com/v1/player/${playerId}/landing`,
    "NHL API",
  );
}

async function fetchNhlGameLog(playerId, season, gameTypeId) {
  return fetchJsonWithRetry(
    `https://api-web.nhle.com/v1/player/${playerId}/game-log/${season}/${gameTypeId}`,
    "NHL API game log",
  );
}

async function fetchNhlGamecenter(gameId) {
  if (!gameId) {
    return null;
  }

  if (!gamecenterCache.has(gameId)) {
    gamecenterCache.set(
      gameId,
      fetchJsonWithRetry(
        `https://api-web.nhle.com/v1/gamecenter/${gameId}/landing`,
        "NHL Gamecenter",
      ),
    );
  }

  return gamecenterCache.get(gameId);
}

function playerHighlightLinksFromGamecenter(gamecenter, playerId) {
  const scoringPeriods = gamecenter?.summary?.scoring || [];
  const links = [];

  scoringPeriods.forEach((period) => {
    const periodNumber = period.periodDescriptor?.number;

    (period.goals || []).forEach((goal) => {
      const isGoal = goal.playerId === playerId;
      const isAssist = (goal.assists || []).some(
        (assist) => assist.playerId === playerId,
      );

      if (!isGoal && !isAssist) {
        return;
      }

      if (!goal.highlightClipSharingUrl) {
        return;
      }

      const type = isGoal ? "goal" : "assist";
      const periodLabel = periodNumber ? `P${periodNumber}` : "Goal";
      const timeLabel = goal.timeInPeriod ? ` ${goal.timeInPeriod}` : "";

      links.push({
        type,
        label: `${isGoal ? "Goal" : "Assist"} ${periodLabel}${timeLabel}`,
        url: goal.highlightClipSharingUrl,
        gameId: gamecenter.id || null,
        eventId: goal.eventId ?? null,
        period: periodNumber ?? null,
        timeInPeriod: goal.timeInPeriod || null,
        source: sourceForGamecenter(gamecenter.id),
      });
    });
  });

  return links;
}

async function attachHighlightsToGames(games, playerId) {
  for (const game of games) {
    try {
      const gamecenter = await fetchNhlGamecenter(game.gameId);
      game.highlightLinks = playerHighlightLinksFromGamecenter(
        gamecenter,
        playerId,
      );
    } catch (error) {
      game.highlightLinks = [];
      game.highlightStatus = "source_error";
      game.highlightError = error.message;
    }
  }

  return games;
}

async function buildLastFiveGames(playerId, seasonLabel, controlStartDate) {
  const season = seasonLabelToNumber(seasonLabel);

  if (!season) {
    return {
      status: "connected_no_rows",
      season: seasonLabel || "TBD",
      updatedAt: now,
      games: [],
      note: "No season label is available for game-log lookup yet.",
    };
  }

  try {
    const gameLogs = [];

    for (const gameTypeId of [2, 3]) {
      const log = await fetchNhlGameLog(playerId, season, gameTypeId);
      gameLogs.push((log.gameLog || []).map((game) => rowFromGameLog(game, gameTypeId)));
    }

    const controlDate = controlStartDate ? new Date(`${controlStartDate}T00:00:00Z`) : null;
    const games = gameLogs
      .flat()
      .filter((game) => {
        if (!controlDate || Number.isNaN(controlDate.getTime())) {
          return true;
        }

        return new Date(`${game.date}T00:00:00Z`) >= controlDate;
      })
      .sort((first, second) => new Date(second.date) - new Date(first.date))
      .slice(0, 5);

    await attachHighlightsToGames(games, playerId);

    return {
      status: games.length ? "verified" : "connected_no_rows",
      season: seasonLabel,
      updatedAt: now,
      sourceLinks: [sourceForGameLog(playerId, season, 2), sourceForGameLog(playerId, season, 3)],
      games,
      note: games.length
        ? "NHL game-log rows are imported for the latest available season. Player-specific NHL scoring-play clips are attached when available."
        : "No NHL game-log rows were returned for the latest season. League-specific game-log connectors may still be needed.",
    };
  } catch (error) {
    return {
      status: "source_error",
      season: seasonLabel,
      updatedAt: now,
      games: [],
      sourceLinks: [sourceForGameLog(playerId, season, 2), sourceForGameLog(playerId, season, 3)],
      sourceError: error.message,
      note: "NHL game-log lookup failed during the latest update.",
    };
  }
}

function currentSeasonNumberFromRows(rows) {
  const season = latestSeasonLabel(rows);
  return seasonLabelToNumber(season);
}

function leagueScopedPendingWindow(kind, seasonLabel, league, assignment, note) {
  return {
    status: "league_connector_pending",
    season: seasonLabel || "TBD",
    updatedAt: now,
    league: league || assignment?.league || "TBD",
    team: assignment?.team || "TBD",
    sourceLinks: sourceLinksForLeague(league, assignment),
    games: [],
    note:
      note ||
      `${league || "This league"} game-by-game connector is not connected yet for ${assignment?.team || "this assignment"}. Season totals still update from the NHL API landing feed where available.`,
  };
}

function activeLeagueFromRows(rows, assignment) {
  if (assignment?.league && assignment.league !== "TBD") {
    return assignment.league;
  }

  const currentSeason = rowsForLatestSeason(rows);
  const nonNhl = currentSeason.rows.find((row) => row.league && row.league !== "NHL");
  return nonNhl?.league || currentSeason.rows[0]?.league || "TBD";
}

function activeTeamFromRows(rows, assignment) {
  if (assignment?.team && assignment.team !== "TBD") {
    return assignment.team;
  }

  const currentSeason = rowsForLatestSeason(rows);
  return currentSeason.rows[0]?.team || "TBD";
}

function ahlFeedUrl(params) {
  const searchParams = new URLSearchParams({
    feed: "statviewfeed",
    key: ahlConfig.key,
    client_code: ahlConfig.clientCode,
    site_id: ahlConfig.siteId,
    lang: "en",
    ...params,
  });

  return `${ahlConfig.baseUrl}?${searchParams.toString()}`;
}

function normalizeComparableName(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function ahlSeasonYearBounds(seasonName = "") {
  const match = String(seasonName).match(/(\d{4})-(\d{2})/);

  if (!match) {
    const currentYear = new Date(now).getUTCFullYear();
    return { startYear: currentYear, endYear: currentYear + 1 };
  }

  const startYear = Number(match[1]);
  return {
    startYear,
    endYear: startYear + 1,
  };
}

function ahlSeasonLabelFromName(seasonName = "") {
  return String(seasonName).match(/\d{4}-\d{2}/)?.[0] || null;
}

function ahlScheduleDate(row, seasonName) {
  const match = String(row.date_with_day || "").match(/([A-Za-z]{3}),\s*([A-Za-z]{3})\s+(\d{1,2})/);

  if (!match) {
    return null;
  }

  const monthIndex = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  }[match[2]];

  if (monthIndex === undefined) {
    return null;
  }

  const { startYear, endYear } = ahlSeasonYearBounds(seasonName);
  const year = monthIndex >= 8 ? startYear : endYear;
  return new Date(Date.UTC(year, monthIndex, Number(match[3]), 12, 0, 0));
}

async function fetchAhlBootstrap() {
  const url = ahlFeedUrl({
    view: "bootstrap",
    season: "",
    pageName: "schedule",
    league_id: ahlConfig.leagueId,
    league_code: "ahl",
    conference: "-1",
    division: "-1",
  });

  return fetchJsonpWithRetry(url, "AHL bootstrap");
}

async function fetchAhlSchedule(team, seasonId, seasonName) {
  const cacheKey = `${team.id}:${seasonId}`;

  if (ahlScheduleCache.has(cacheKey)) {
    return ahlScheduleCache.get(cacheKey);
  }

  const url = ahlFeedUrl({
    view: "schedule",
    team: team.id,
    season: seasonId,
    month: "-1",
    location: "",
    league_id: ahlConfig.leagueId,
    conference_id: "-1",
    division_id: "-1",
  });
  const feed = await fetchJsonpWithRetry(url, "AHL schedule");
  const rows = feed?.[0]?.sections?.[0]?.data || [];
  const seasonLabel = ahlSeasonLabelFromName(seasonName);
  const games = rows.map((entry) => {
    const row = entry.row || {};
    const homeTeamId = entry.prop?.home_team_city?.teamLink || null;
    const visitingTeamId = entry.prop?.visiting_team_city?.teamLink || null;
    const date = ahlScheduleDate(row, seasonName);
    const isHome = String(homeTeamId) === String(team.id);
    const opponent = isHome ? row.visiting_team_city : row.home_team_city;

    return {
      gameId: row.game_id,
      date: date ? date.toISOString().slice(0, 10) : null,
      dateObject: date,
      team: team.abbreviation,
      opponent: opponent || "TBD",
      opponentName: opponent || "TBD",
      homeAway: isHome ? "vs" : "@",
      status: row.game_status || "Scheduled",
      type: /playoff/i.test(seasonName) ? "Playoffs" : "Regular",
      season: seasonLabel,
      league: "AHL",
      gameSummaryUrl: entry.prop?.game_summary_long?.gameLink
        ? `${ahlConfig.sourceBaseUrl}/game-summary/${entry.prop.game_summary_long.gameLink}`
        : null,
      source: sourceForAhlSchedule(team.id, seasonId),
    };
  });

  ahlScheduleCache.set(cacheKey, games);
  return games;
}

async function fetchAhlGameSummary(gameId) {
  if (ahlGameSummaryCache.has(gameId)) {
    return ahlGameSummaryCache.get(gameId);
  }

  const url = ahlFeedUrl({
    view: "gameSummary",
    game_id: gameId,
  });
  const summary = await fetchJsonpWithRetry(url, "AHL game summary");
  ahlGameSummaryCache.set(gameId, summary);
  return summary;
}

function findAhlPlayerInTeam(teamSummary, playerName, playerPosition) {
  const normalizedName = normalizeComparableName(playerName);
  const skater = (teamSummary.skaters || []).find((entry) => {
    const name = normalizeComparableName(
      `${entry.info?.firstName || ""} ${entry.info?.lastName || ""}`,
    );
    return name === normalizedName;
  });

  if (playerPosition !== "G" && skater) {
    return { entry: skater, role: "skater" };
  }

  const goalie = (teamSummary.goalies || []).find((entry) => {
    const name = normalizeComparableName(
      `${entry.info?.firstName || ""} ${entry.info?.lastName || ""}`,
    );
    return name === normalizedName;
  });

  if (goalie) {
    return { entry: goalie, role: "goalie" };
  }

  return skater ? { entry: skater, role: "skater" } : null;
}

function ahlGameRowFromSummary(summary, game, playerName, playerPosition) {
  const teamSummary =
    String(summary.homeTeam?.info?.abbreviation) === game.team
      ? summary.homeTeam
      : summary.visitingTeam;
  const found = findAhlPlayerInTeam(teamSummary, playerName, playerPosition);

  if (!found) {
    return null;
  }

  const stats = found.entry.stats || {};
  const base = {
    gameId: String(summary.details?.id || game.gameId),
    date: summary.details?.GameDateISO8601
      ? summary.details.GameDateISO8601.slice(0, 10)
      : game.date,
    type: game.type,
    season: game.season || null,
    team: game.team,
    opponent: game.opponent,
    opponentName: game.opponentName,
    homeAway: game.homeAway,
    league: "AHL",
    highlightLinks: [],
    source: sourceForAhlGameSummary(game.gameId),
  };

  if (found.role === "goalie") {
    return {
      ...base,
      role: "goalie",
      gamesStarted: Number(found.entry.starting || 0),
      decision: null,
      shotsAgainst: stats.shotsAgainst ?? null,
      saves: stats.saves ?? null,
      goalsAgainst: stats.goalsAgainst ?? null,
      savePct:
        stats.shotsAgainst && stats.saves !== undefined
          ? formatSavePct(Number(stats.saves) / Number(stats.shotsAgainst))
          : null,
      toi: stats.timeOnIce || null,
    };
  }

  return {
    ...base,
    role: "skater",
    goals: stats.goals ?? 0,
    assists: stats.assists ?? 0,
    points: stats.points ?? (Number(stats.goals || 0) + Number(stats.assists || 0)),
    shots: stats.shots ?? null,
    pim: stats.penaltyMinutes ?? 0,
    toi: stats.toi || null,
  };
}

async function buildAhlGameWindows(player, assignment, currentSeason, controlStartDate) {
  const team = ahlConfig.teams[(assignment.team || "").toLowerCase()];

  if (!team) {
    return {
      lastFiveGames: leagueScopedPendingWindow(
        "last",
        currentSeason.season,
        "AHL",
        assignment,
        `AHL connector is available, but ${assignment.team || "this AHL team"} has not been mapped yet.`,
      ),
      nextFiveGames: leagueScopedPendingWindow(
        "next",
        currentSeason.season,
        "AHL",
        assignment,
        `AHL schedule connector is available, but ${assignment.team || "this AHL team"} has not been mapped yet.`,
      ),
    };
  }

  try {
    const bootstrap = await fetchAhlBootstrap();
    const currentSeasonId = bootstrap.current_season_id || "90";
    const season =
      bootstrap.seasons?.find((entry) => String(entry.id) === String(currentSeasonId)) || {};
    const seasonName = season.name || "2025-26 Regular Season";
    const seasonLabel = ahlSeasonLabelFromName(seasonName) || currentSeason.season || "TBD";
    const schedule = await fetchAhlSchedule(team, currentSeasonId, seasonName);
    const controlDate = controlStartDate ? new Date(`${controlStartDate}T00:00:00Z`) : null;
    const today = new Date(now);
    const pastGames = schedule
      .filter((game) => game.dateObject)
      .filter((game) => /final/i.test(game.status || ""))
      .filter((game) => {
        if (!controlDate || Number.isNaN(controlDate.getTime())) {
          return true;
        }

        return game.dateObject >= controlDate;
      })
      .sort((first, second) => second.dateObject - first.dateObject);
    const lastGames = [];

    for (const game of pastGames) {
      if (lastGames.length >= 5) {
        break;
      }

      try {
        const summary = await fetchAhlGameSummary(game.gameId);
        const row = ahlGameRowFromSummary(summary, game, player.name, player.position);

        if (row) {
          lastGames.push(row);
        }
      } catch (error) {
        // Keep moving through the last-five window if one game summary fails.
      }
    }

    const nextGames = schedule
      .filter((game) => game.dateObject)
      .filter((game) => game.dateObject >= today && !/final/i.test(game.status || ""))
      .sort((first, second) => first.dateObject - second.dateObject)
      .slice(0, 5)
      .map((game) => ({
        gameId: game.gameId,
        date: game.date,
        team: game.team,
        opponent: game.opponent,
        opponentName: game.opponentName,
        homeAway: game.homeAway,
        type: game.type,
        season: game.season || seasonLabel,
        league: "AHL",
        status: game.status || "Scheduled",
        source: game.source,
      }));

    return {
      lastFiveGames: {
        status: lastGames.length ? "verified" : "connected_no_rows",
        season: seasonLabel,
        updatedAt: now,
        league: "AHL",
        team: team.name,
        sourceLinks: [
          {
            label: "AHL player stats",
            url: `${ahlConfig.sourceBaseUrl}/player-stats/${team.id}/${currentSeasonId}`,
          },
          sourceForAhlSchedule(team.id, currentSeasonId),
        ],
        games: lastGames,
        note: lastGames.length
          ? "Recent AHL rows come from official AHL game-summary feeds for Hartford games."
          : `No recent Hartford game-summary row was found for ${player.name}.`,
      },
      nextFiveGames: {
        status: nextGames.length ? "verified" : "connected_no_rows",
        season: seasonLabel,
        updatedAt: now,
        league: "AHL",
        team: team.name,
        sourceLinks: [sourceForAhlSchedule(team.id, currentSeasonId)],
        games: nextGames,
        note: nextGames.length
          ? "Upcoming AHL games come from the official AHL schedule feed."
          : "No upcoming Hartford games are listed in the current AHL schedule feed.",
      },
    };
  } catch (error) {
    return {
      lastFiveGames: {
        status: "source_error",
        season: currentSeason.season || "TBD",
        updatedAt: now,
        league: "AHL",
        team: assignment.team || "TBD",
        games: [],
        sourceLinks: sourceLinksForLeague("AHL", assignment),
        sourceError: error.message,
        note: "AHL game-summary lookup failed during the latest update.",
      },
      nextFiveGames: {
        status: "source_error",
        season: currentSeason.season || "TBD",
        updatedAt: now,
        league: "AHL",
        team: assignment.team || "TBD",
        games: [],
        sourceLinks: sourceLinksForLeague("AHL", assignment),
        sourceError: error.message,
        note: "AHL schedule lookup failed during the latest update.",
      },
    };
  }
}

function numberOrNull(value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function numberOrZero(value) {
  return numberOrNull(value) ?? 0;
}

function parseOhlPlayerName(value = "") {
  const [lastName, firstName] = String(value).split(",").map((part) => part.trim());

  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  return String(value).trim();
}

function parseOhlPlayerStatsRow(row) {
  const playerLink = row?.[5]?.[0] || "";
  const playerId = String(playerLink).match(/\/players\/(\d+)/)?.[1] || null;

  return {
    playerId,
    name: parseOhlPlayerName(row?.[5]?.[1] || ""),
    teamEntries: Array.isArray(row?.[6]) ? row[6] : [],
  };
}

async function fetchOhlPlayerRows(seasonId) {
  const source = sourceForOhlPlayerStats(seasonId);
  const html = await fetchTextWithRetry(source.url, "OHL player stats");
  return extractDataArrayAfter(html, "topskaters");
}

async function findOhlPlayer(player, assignment) {
  const team = ohlConfig.teams[(assignment.team || "").toLowerCase()] || null;
  const targetName = normalizeComparableName(player.name);
  let nameOnlyMatch = null;

  for (const seasonId of ohlConfig.playerLookupSeasons) {
    const rows = await fetchOhlPlayerRows(seasonId);

    for (const row of rows) {
      const parsed = parseOhlPlayerStatsRow(row);

      if (!parsed.playerId || normalizeComparableName(parsed.name) !== targetName) {
        continue;
      }

      const teamMatches = !team
        ? true
        : parsed.teamEntries.some((entry) => {
            const rosterUrl = String(entry?.[0] || "");
            const teamAbbrev = String(entry?.[1] || "");

            return teamAbbrev === team.abbreviation || rosterUrl.includes(`/roster/${team.id}/`);
          });

      if (teamMatches) {
        return { playerId: parsed.playerId, team };
      }

      nameOnlyMatch = nameOnlyMatch || { playerId: parsed.playerId, team };
    }
  }

  return nameOnlyMatch;
}

async function fetchOhlGameByGameRows(playerId, seasonMeta) {
  const source = sourceForOhlGameByGame(playerId, seasonMeta.id);
  const html = await fetchTextWithRetry(source.url, "OHL game-by-game");
  return extractDataArrayAfter(html, "GameByGame");
}

function ohlGameRowFromGameByGame(row, seasonMeta, team) {
  const game = Array.isArray(row?.[0]) ? row[0] : [];
  const visitorCode = game[0] || "TBD";
  const homeCode = game[1] || "TBD";
  const gameUrl = game[2] || null;
  const playerTeamId = String(game[3] || team?.id || "");
  const visitorTeamId = String(game[4] || "");
  const homeTeamId = String(game[5] || "");
  const isHome = playerTeamId && playerTeamId === homeTeamId;
  const isAway = playerTeamId && playerTeamId === visitorTeamId;
  const teamAbbrev = isHome ? homeCode : isAway ? visitorCode : team?.abbreviation || "TBD";
  const opponent = isHome ? visitorCode : homeCode;

  return {
    gameId: String(gameUrl || "").match(/gamecentre\/(\d+)/)?.[1] || null,
    date: row?.[1] || null,
    type: seasonMeta.type,
    season: seasonMeta.label,
    team: teamAbbrev,
    opponent,
    opponentName: opponent,
    homeAway: isHome ? "vs" : "@",
    league: "OHL",
    role: "skater",
    goals: numberOrZero(row?.[2]),
    assists: numberOrZero(row?.[3]),
    points: numberOrZero(row?.[4]),
    plusMinus: numberOrNull(row?.[5]),
    pim: numberOrZero(row?.[6]),
    shots: numberOrNull(row?.[9]),
    toi: null,
    highlightLinks: [],
    source: gameUrl ? { label: "OHL gamecentre", url: gameUrl } : null,
  };
}

async function fetchOhlScheduleRows(seasonMeta) {
  const source = sourceForOhlSchedule(seasonMeta.id);
  const html = await fetchTextWithRetry(source.url, "OHL schedule");
  return extractDataArrayAfter(html, "GAMES");
}

function ohlScheduleGameFromRow(row, team, seasonMeta) {
  const visitorName = row?.[2]?.[1] || "TBD";
  const homeName = row?.[4]?.[1] || "TBD";
  const status = Array.isArray(row?.[6]) ? row[6] : [];
  const gameUrl = status[2] || null;
  const startTime = status[1] && String(status[1]).includes("T") ? status[1] : null;
  const date = row?.[1]?.[0] || (startTime ? startTime.slice(0, 10) : null);
  const isHome = normalizeComparableName(homeName) === normalizeComparableName(team.city);
  const isAway = normalizeComparableName(visitorName) === normalizeComparableName(team.city);

  if (!isHome && !isAway) {
    return null;
  }

  const opponent = isHome ? visitorName : homeName;

  return {
    gameId: String(gameUrl || "").match(/gamecentre\/(\d+)/)?.[1] || row?.[0] || null,
    date,
    time: startTime,
    team: team.abbreviation,
    opponent,
    opponentName: opponent,
    homeAway: isHome ? "vs" : "@",
    type: seasonMeta.type,
    season: seasonMeta.label,
    league: "OHL",
    status: "Scheduled",
    source: gameUrl ? { label: "OHL gamecentre", url: gameUrl } : sourceForOhlSchedule(seasonMeta.id),
  };
}

async function buildOhlGameWindows(player, assignment, currentSeason, controlStartDate) {
  const team = ohlConfig.teams[(assignment.team || "").toLowerCase()] || null;

  if (!team) {
    return {
      lastFiveGames: leagueScopedPendingWindow(
        "last",
        currentSeason.season,
        "OHL",
        assignment,
        `OHL connector is available, but ${assignment.team || "this OHL team"} has not been mapped yet.`,
      ),
      nextFiveGames: leagueScopedPendingWindow(
        "next",
        ohlConfig.scheduleSeason.label,
        "OHL",
        assignment,
        `OHL schedule connector is available, but ${assignment.team || "this OHL team"} has not been mapped yet.`,
      ),
    };
  }

  try {
    const found = await findOhlPlayer(player, assignment);

    if (!found?.playerId) {
      return {
        lastFiveGames: leagueScopedPendingWindow(
          "last",
          currentSeason.season,
          "OHL",
          assignment,
          `No OHL player-page match was found yet for ${player.name} with ${team.name}.`,
        ),
        nextFiveGames: leagueScopedPendingWindow(
          "next",
          ohlConfig.scheduleSeason.label,
          "OHL",
          assignment,
          `No OHL player-page match was found yet for ${player.name} with ${team.name}.`,
        ),
      };
    }

    const controlDate = controlStartDate ? new Date(`${controlStartDate}T00:00:00Z`) : null;
    const gameRows = [];

    for (const seasonMeta of ohlConfig.gameSeasons) {
      try {
        const rows = await fetchOhlGameByGameRows(found.playerId, seasonMeta);
        rows.forEach((row) => {
          gameRows.push(ohlGameRowFromGameByGame(row, seasonMeta, team));
        });
      } catch (error) {
        // Continue through other OHL seasons if one page is missing or temporarily down.
      }
    }

    const lastGames = gameRows
      .filter((game) => game.date)
      .filter((game) => {
        if (!controlDate || Number.isNaN(controlDate.getTime())) {
          return true;
        }

        return new Date(`${game.date}T00:00:00Z`) >= controlDate;
      })
      .sort((first, second) => new Date(second.date) - new Date(first.date))
      .slice(0, 5);

    const scheduleRows = await fetchOhlScheduleRows(ohlConfig.scheduleSeason);
    const today = new Date(now);
    const nextGames = scheduleRows
      .map((row) => ohlScheduleGameFromRow(row, team, ohlConfig.scheduleSeason))
      .filter(Boolean)
      .filter((game) => {
        const date = game.time ? new Date(game.time) : new Date(`${game.date}T23:59:59Z`);
        return date >= today;
      })
      .sort((first, second) => {
        const firstDate = first.time ? new Date(first.time) : new Date(first.date);
        const secondDate = second.time ? new Date(second.time) : new Date(second.date);
        return firstDate - secondDate;
      })
      .slice(0, 5);

    return {
      lastFiveGames: {
        status: lastGames.length ? "verified" : "connected_no_rows",
        season: lastGames[0]?.season || currentSeason.season || "TBD",
        updatedAt: now,
        league: "OHL",
        team: team.name,
        sourceLinks: [
          sourceForOhlGameByGame(found.playerId, "83"),
          sourceForOhlGameByGame(found.playerId, "85"),
        ],
        games: lastGames,
        note: lastGames.length
          ? "Recent OHL rows come from official OHL player game-by-game pages."
          : `No OHL game-by-game rows were found for ${player.name} after Rangers control began.`,
      },
      nextFiveGames: {
        status: nextGames.length ? "verified" : "connected_no_rows",
        season: ohlConfig.scheduleSeason.label,
        updatedAt: now,
        league: "OHL",
        team: team.name,
        sourceLinks: [sourceForOhlSchedule(ohlConfig.scheduleSeason.id)],
        games: nextGames,
        note: nextGames.length
          ? "Upcoming OHL games come from the official OHL schedule page."
          : `No upcoming ${team.name} games are listed in the current OHL schedule page.`,
      },
    };
  } catch (error) {
    return {
      lastFiveGames: {
        status: "source_error",
        season: currentSeason.season || "TBD",
        updatedAt: now,
        league: "OHL",
        team: team.name,
        games: [],
        sourceLinks: sourceLinksForLeague("OHL", assignment),
        sourceError: error.message,
        note: "OHL game-by-game lookup failed during the latest update.",
      },
      nextFiveGames: {
        status: "source_error",
        season: ohlConfig.scheduleSeason.label,
        updatedAt: now,
        league: "OHL",
        team: team.name,
        games: [],
        sourceLinks: sourceLinksForLeague("OHL", assignment),
        sourceError: error.message,
        note: "OHL schedule lookup failed during the latest update.",
      },
    };
  }
}

async function fetchNhlClubSchedule(teamAbbrev, season) {
  return fetchJsonWithRetry(
    `https://api-web.nhle.com/v1/club-schedule-season/${teamAbbrev}/${season}`,
    "NHL API schedule",
  );
}

async function buildNhlNextFiveGames(teamAbbrev, seasonLabel) {
  const season = seasonLabelToNumber(seasonLabel);

  if (!season || !teamAbbrev) {
    return {
      status: "connected_no_rows",
      season: seasonLabel || "TBD",
      updatedAt: now,
      league: "NHL",
      team: teamAbbrev || "TBD",
      games: [],
      note: "No NHL season or club abbreviation is available for schedule lookup yet.",
    };
  }

  try {
    const schedule = await fetchNhlClubSchedule(teamAbbrev, season);
    const today = new Date(now);
    const games = (schedule.games || [])
      .filter((game) => game.gameDate)
      .filter((game) => new Date(`${game.gameDate}T23:59:59Z`) >= today)
      .filter((game) => !/FINAL|OFF/i.test(game.gameState || ""))
      .sort((first, second) => new Date(first.gameDate) - new Date(second.gameDate))
      .slice(0, 5)
      .map((game) => {
        const homeAbbrev = game.homeTeam?.abbrev;
        const awayAbbrev = game.awayTeam?.abbrev;
        const isHome = homeAbbrev === teamAbbrev;
        return {
          gameId: game.id,
          date: game.gameDate,
          time: game.startTimeUTC || null,
          team: teamAbbrev,
          opponent: isHome ? awayAbbrev : homeAbbrev,
          opponentName: isHome
            ? game.awayTeam?.placeName?.default || awayAbbrev
            : game.homeTeam?.placeName?.default || homeAbbrev,
          homeAway: isHome ? "vs" : "@",
          type: game.gameType === 3 ? "Playoffs" : "Regular",
          league: "NHL",
          status: game.gameState || "Scheduled",
          source: sourceForNhlSchedule(teamAbbrev, season),
        };
      });

    return {
      status: games.length ? "verified" : "connected_no_rows",
      season: seasonLabel,
      updatedAt: now,
      league: "NHL",
      team: teamAbbrev,
      sourceLinks: [sourceForNhlSchedule(teamAbbrev, season)],
      games,
      note: games.length
        ? "Upcoming NHL games come from the NHL club schedule feed."
        : "No upcoming NHL games are listed in the current club schedule feed.",
    };
  } catch (error) {
    return {
      status: "source_error",
      season: seasonLabel,
      updatedAt: now,
      league: "NHL",
      team: teamAbbrev,
      games: [],
      sourceLinks: [sourceForNhlSchedule(teamAbbrev, season)],
      sourceError: error.message,
      note: "NHL schedule lookup failed during the latest update.",
    };
  }
}

async function buildLeagueGameWindows(slug, player, playerId, rows, currentSeason, assignment) {
  const activeLeague = activeLeagueFromRows(rows, assignment);
  const activeTeam = activeTeamFromRows(rows, assignment);
  const leagueAssignment = {
    ...assignment,
    league: activeLeague,
    team: activeTeam,
  };

  if (activeLeague === "AHL") {
    return buildAhlGameWindows(player, leagueAssignment, currentSeason, player.controlStartDate);
  }

  if (activeLeague === "OHL") {
    return buildOhlGameWindows(player, leagueAssignment, currentSeason, player.controlStartDate);
  }

  if (activeLeague === "NHL") {
    const teamAbbrev = activeTeam === "New York Rangers" ? "NYR" : null;
    const lastFiveGames = await buildLastFiveGames(
      playerId,
      currentSeason.season,
      player.controlStartDate,
    );

    return {
      lastFiveGames: {
        ...lastFiveGames,
        league: "NHL",
        team: activeTeam,
      },
      nextFiveGames: await buildNhlNextFiveGames(teamAbbrev, currentSeason.season),
    };
  }

  return {
    lastFiveGames: leagueScopedPendingWindow(
      "last",
      currentSeason.season,
      activeLeague,
      leagueAssignment,
    ),
    nextFiveGames: leagueScopedPendingWindow(
      "next",
      currentSeason.season,
      activeLeague,
      leagueAssignment,
      `${activeLeague} schedule connector is not connected yet for ${activeTeam}.`,
    ),
  };
}

async function updatePlayerFromNhlApi(slug, player, assignment) {
  const playerId = nhlApiPlayerIds[slug];

  if (player.manualStatsOnly) {
    player.currentAssignment = assignment
      ? {
          team: assignment.team,
          league: assignment.league,
          currentTeam: assignment.currentTeam,
          group: assignment.group,
        }
      : player.currentAssignment;
    player.sourceStatus = player.sourceStatus || "manual_pre_draft";
    player.currentSeasonStats = {
      ...(player.currentSeasonStats || {}),
      updatedAt: now,
    };
    player.lastFiveGames = {
      ...(player.lastFiveGames || { games: [] }),
      updatedAt: now,
    };
    player.lastFiveGames = mergeManualLastFiveGames(
      player.lastFiveGames,
      player.manualLastFiveGames,
    );
    player.nextFiveGames = {
      ...(player.nextFiveGames || { games: [] }),
      updatedAt: now,
    };

    return {
      connected: true,
      rows: player.seasons?.length || 0,
      currentRows: player.currentSeasonStats?.rows?.length || 0,
      lastFiveRows: player.lastFiveGames?.games?.length || 0,
      nextFiveRows: player.nextFiveGames?.games?.length || 0,
      highlightRows:
        player.lastFiveGames?.games?.reduce(
          (sum, game) => sum + (game.highlightLinks?.length || 0),
          0,
        ) || 0,
    };
  }

  if (!playerId) {
    player.sourceStatus = "missing_source_id";
    player.sourceLinks = [];
    player.currentSeasonStats = {
      status: "missing_source_id",
      season: "TBD",
      updatedAt: now,
      rows: [],
    };
    player.lastFiveGames = {
      status: "missing_source_id",
      season: "TBD",
      updatedAt: now,
      games: [],
    };
    player.nextFiveGames = {
      status: "missing_source_id",
      season: "TBD",
      updatedAt: now,
      games: [],
    };
    return { connected: false, rows: 0, currentRows: 0, lastFiveRows: 0, nextFiveRows: 0 };
  }

  const apiUrl = `https://api-web.nhle.com/v1/player/${playerId}/landing`;

  try {
    const landing = await fetchNhlLanding(playerId);
    const controlSeason = controlDateToSeason(player.controlStartDate);
    const rows = (landing.seasonTotals || [])
      .filter((total) => total.season >= controlSeason)
      .filter((total) => total.gameTypeId === 2 || total.gameTypeId === 3)
      .filter((total) => clubLeagues.has(total.leagueAbbrev))
      .map((total) => rowFromSeasonTotal(total, playerId));

    player.nhlApiPlayerId = playerId;
    player.sourceLinks = [
      {
        label: "NHL.com profile",
        url: `https://www.nhl.com/player/${landing.playerSlug || playerId}`,
      },
      {
        label: "NHL API data",
        url: apiUrl,
      },
    ];
    player.sourceStatus = rows.length ? "verified" : "connected_no_rows";
    player.sourceNote =
      "Rows come from NHL API season totals. Acquisition-season rows are not date-split yet.";
    player.currentAssignment = assignment
      ? {
          team: assignment.team,
          league: assignment.league,
          currentTeam: assignment.currentTeam,
          group: assignment.group,
        }
      : undefined;
    player.seasons = rows;
    player.draftInfo = draftInfoFromLanding(landing, player, playerId);
    delete player.sourceError;

    const currentSeason = rowsForLatestSeason(rows);
    player.currentSeasonStats = {
      status: currentSeason.rows.length ? "verified" : "connected_no_rows",
      season: currentSeason.season || "TBD",
      updatedAt: now,
      rows: currentSeason.rows,
      note: currentSeason.rows.length
        ? "Latest available season totals from the NHL API feed."
        : "No current-season total rows were returned by the NHL API feed.",
    };
    const gameWindows = await buildLeagueGameWindows(
      slug,
      player,
      playerId,
      rows,
      currentSeason,
      assignment,
    );
    player.lastFiveGames = mergeManualLastFiveGames(
      gameWindows.lastFiveGames,
      player.manualLastFiveGames,
    );
    player.nextFiveGames = gameWindows.nextFiveGames;

    return {
      connected: true,
      rows: rows.length,
      currentRows: player.currentSeasonStats.rows.length,
      lastFiveRows: player.lastFiveGames.games.length,
      nextFiveRows: player.nextFiveGames.games.length,
      highlightRows: player.lastFiveGames.games.reduce(
        (sum, game) => sum + (game.highlightLinks?.length || 0),
        0,
      ),
    };
  } catch (error) {
    player.nhlApiPlayerId = playerId;
    player.sourceLinks = [
      {
        label: "NHL API data",
        url: apiUrl,
      },
    ];
    player.sourceStatus = "source_error";
    player.sourceError = error.message;
    player.seasons = Array.isArray(player.seasons) ? player.seasons : [];
    const currentSeason = rowsForLatestSeason(player.seasons);
    player.currentSeasonStats = {
      status: "source_error",
      season: currentSeason.season || player.currentSeasonStats?.season || "TBD",
      updatedAt: now,
      rows: currentSeason.rows.length
        ? currentSeason.rows
        : player.currentSeasonStats?.rows || [],
      sourceError: error.message,
    };
    player.lastFiveGames = player.lastFiveGames?.games?.length
      ? player.lastFiveGames
      : {
          status: "source_error",
          season: currentSeason.season || player.lastFiveGames?.season || "TBD",
          updatedAt: now,
          games: [],
          sourceError: error.message,
        };
    player.nextFiveGames = player.nextFiveGames?.games?.length
      ? player.nextFiveGames
      : {
          status: "source_error",
          season: currentSeason.season || player.nextFiveGames?.season || "TBD",
          updatedAt: now,
          games: [],
          sourceError: error.message,
        };
    return {
      connected: false,
      rows: player.seasons.length,
      currentRows: player.currentSeasonStats.rows?.length || 0,
      lastFiveRows: player.lastFiveGames.games?.length || 0,
      nextFiveRows: player.nextFiveGames.games?.length || 0,
      highlightRows:
        player.lastFiveGames.games?.reduce(
          (sum, game) => sum + (game.highlightLinks?.length || 0),
          0,
        ) || 0,
    };
  }
}

async function main() {
  const stats = readStats();
  const assignments = readRegistryAssignments();
  const players = stats.players || {};
  const entries = Object.entries(players);
  let connectedPlayers = 0;
  let playersWithRows = 0;
  let importedRows = 0;
  let playersWithCurrentSeasonRows = 0;
  let currentSeasonRows = 0;
  let playersWithLastFiveGames = 0;
  let lastFiveGameRows = 0;
  let playersWithNextFiveGames = 0;
  let nextFiveGameRows = 0;
  let playersWithHighlightLinks = 0;
  let highlightLinks = 0;
  let playersWithLatestUpdateNews = 0;

  entries.forEach(([, player]) => {
    delete player.latestUpdateNews;
  });

  for (const [slug, player] of entries) {
    const beforeSnapshot = buildPlayerUpdateSnapshot(player);
    const result = await updatePlayerFromNhlApi(slug, player, assignments.get(slug));
    const updateChanges = uniqueLabels([
      ...getCurrentCycleNewsNoteLabels(player),
      ...getPlayerUpdateChanges(beforeSnapshot, player),
    ]);

    if (updateChanges.length) {
      player.latestUpdateNews = {
        status: "new",
        updatedAt: now,
        date: currentCycleDate,
        label: "News this cycle",
        changes: updateChanges,
        note: `News this cycle: ${updateChanges.join(", ")}.`,
      };
      playersWithLatestUpdateNews += 1;
    }

    if (result.connected) {
      connectedPlayers += 1;
    }

    if (result.rows) {
      playersWithRows += 1;
      importedRows += result.rows;
    }

    if (result.currentRows) {
      playersWithCurrentSeasonRows += 1;
      currentSeasonRows += result.currentRows;
    }

    if (result.lastFiveRows) {
      playersWithLastFiveGames += 1;
      lastFiveGameRows += result.lastFiveRows;
    }

    if (result.nextFiveRows) {
      playersWithNextFiveGames += 1;
      nextFiveGameRows += result.nextFiveRows;
    }

    if (result.highlightRows) {
      playersWithHighlightLinks += 1;
      highlightLinks += result.highlightRows;
    }
  }

  stats.metadata = {
    ...stats.metadata,
    lastCheckedAt: now,
    lastUpdatedAt: importedRows ? now : stats.metadata?.lastUpdatedAt || null,
    status: "nhl_api_connected",
    connectedPlayers,
    playersWithRows,
    importedRows,
    playersWithCurrentSeasonRows,
    currentSeasonRows,
    playersWithLastFiveGames,
    lastFiveGameRows,
    playersWithNextFiveGames,
    nextFiveGameRows,
    playersWithHighlightLinks,
    highlightLinks,
    playersWithLatestUpdateNews,
    note:
      "NHL API season totals are connected for all tracked players where available. NHL, Hartford/AHL, and OHL game windows are connected; NCAA, ECHL, and European league game-log connectors remain explicit pending sources until their feeds are added. Midseason acquisition rows are full season totals until league game-log date filtering is expanded.",
  };

  writeStats(stats);
  console.log(
    `Checked ${entries.length} player stat records. Imported ${importedRows} NHL API season rows, ${lastFiveGameRows} last-five rows, ${nextFiveGameRows} next-five rows, ${highlightLinks} highlight links, and ${playersWithLatestUpdateNews} current-cycle news markers.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
