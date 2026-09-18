#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const toolDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(toolDir, "..");
const queuePath = path.join(projectDir, "social-drafts", "daily-profile-queue.json");
const sourceGroupsPath = path.join(projectDir, "automation", "schedule-source-groups.json");

function readArg(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : process.argv[index + 1];
}

function isEvidenceUrl(value) {
  if (typeof value !== "string" || !/^https?:\/\//.test(value)) return false;
  try {
    const hostname = new URL(value).hostname.toLowerCase();
    return hostname !== "example.com" && !hostname.endsWith(".example.com");
  } catch {
    return false;
  }
}

function validateManifest(manifest, queue, sourceIndex, expectedDate) {
  const errors = [];
  const expectedNames = queue.entries.map((entry) => entry.name);
  const expectedSet = new Set(expectedNames);

  if (manifest.date !== expectedDate) errors.push(`date must be ${expectedDate}`);
  if (!manifest.registrySource) errors.push("registrySource is required");
  if (manifest.expectedCount !== queue.activeCount) {
    errors.push(`expectedCount must equal the active registry count (${queue.activeCount})`);
  }

  if (!Array.isArray(manifest.sourceGroups)) {
    errors.push("sourceGroups must be an array");
  } else {
    const sourceMap = new Map(manifest.sourceGroups.map((group) => [group.id, group]));
    for (const required of sourceIndex.requiredDaily) {
      const group = sourceMap.get(required.id);
      if (!group) {
        errors.push(`missing required source group: ${required.id}`);
        continue;
      }
      if (group.status !== "checked") errors.push(`source group ${required.id} is not checked`);
      if (!group.checkedAt) errors.push(`source group ${required.id} is missing checkedAt`);
      if (!Array.isArray(group.urlsChecked) || !group.urlsChecked.some(isEvidenceUrl)) {
        errors.push(`source group ${required.id} has no official URL checked`);
      }
    }
  }

  if (!Array.isArray(manifest.coverage)) {
    errors.push("coverage must be an array");
  } else {
    const names = manifest.coverage.map((row) => row.name);
    const uniqueNames = new Set(names);
    if (manifest.coverage.length !== queue.activeCount) {
      errors.push(`coverage must contain exactly ${queue.activeCount} rows`);
    }
    if (uniqueNames.size !== names.length) errors.push("coverage contains duplicate players");
    for (const name of expectedNames) {
      if (!uniqueNames.has(name)) errors.push(`coverage is missing ${name}`);
    }
    for (const name of uniqueNames) {
      if (!expectedSet.has(name)) errors.push(`coverage contains non-registry player ${name}`);
    }

    for (const row of manifest.coverage) {
      const prefix = row.name || "unnamed coverage row";
      if (typeof row.currentTeam !== "string" || !row.currentTeam.trim()) {
        errors.push(`${prefix}: currentTeam is required`);
      }
      if (!Array.isArray(row.officialScheduleUrlsChecked) || !row.officialScheduleUrlsChecked.some(isEvidenceUrl)) {
        errors.push(`${prefix}: no official schedule URL checked`);
      }
      if (!Array.isArray(row.assignments) || row.assignments.length === 0) {
        errors.push(`${prefix}: assignments are required`);
      } else {
        for (const assignment of row.assignments) {
          if (!assignment.team || !assignment.league) {
            errors.push(`${prefix}: each assignment needs team and league`);
          }
          if (!Array.isArray(assignment.officialScheduleUrlsChecked) || !assignment.officialScheduleUrlsChecked.some(isEvidenceUrl)) {
            errors.push(`${prefix}: assignment ${assignment.team || "unknown"} has no official schedule URL`);
          }
          if (!assignment.checkedAt) errors.push(`${prefix}: assignment ${assignment.team || "unknown"} is missing checkedAt`);
          if (!["game_found", "no_game"].includes(assignment.result)) {
            errors.push(`${prefix}: assignment ${assignment.team || "unknown"} is unresolved`);
          }
        }
      }
      if (!["game_found", "no_game"].includes(row.result)) {
        errors.push(`${prefix}: coverage result is unresolved`);
      }

      const international = row.internationalCheck;
      if (!international || typeof international !== "object") {
        errors.push(`${prefix}: internationalCheck is required`);
      } else {
        if (!international.checkedAt) errors.push(`${prefix}: international check is missing checkedAt`);
        if (!Array.isArray(international.candidateNationalTeams)) {
          errors.push(`${prefix}: candidateNationalTeams must be an array`);
        }
        if (!Array.isArray(international.officialRosterUrlsChecked)
          || !international.officialRosterUrlsChecked.some(isEvidenceUrl)) {
          errors.push(`${prefix}: no official international roster/pool URL checked`);
        }
        if (!["game_found", "no_game", "not_in_active_pool"].includes(international.result)) {
          errors.push(`${prefix}: international result is unresolved`);
        }
        if (["game_found", "no_game"].includes(international.result)
          && (!Array.isArray(international.officialScheduleUrlsChecked)
            || !international.officialScheduleUrlsChecked.some(isEvidenceUrl))) {
          errors.push(`${prefix}: international assignment has no official schedule URL`);
        }
      }
    }
  }

  if (!Array.isArray(manifest.internationalEvents)) {
    errors.push("internationalEvents must be an array");
  } else {
    for (const event of manifest.internationalEvents) {
      const prefix = event.name || "unnamed international event";
      if (!event.name) errors.push("international event name is required");
      if (!event.checkedAt) errors.push(`${prefix}: checkedAt is required`);
      if (!isEvidenceUrl(event.officialRosterUrl)) errors.push(`${prefix}: officialRosterUrl is required`);
      if (!isEvidenceUrl(event.officialScheduleUrl)) errors.push(`${prefix}: officialScheduleUrl is required`);
    }
  }

  if (!Array.isArray(manifest.games)) {
    errors.push("games must be an array");
  } else {
    for (const game of manifest.games) {
      const prefix = game.player || "unnamed game";
      for (const field of ["player", "team", "opponent", "league", "assignmentType", "mountainTime", "lineupStatus", "viewingStatus"]) {
        if (!game[field]) errors.push(`${prefix}: game is missing ${field}`);
      }
      if (game.assignmentType && !["club", "international"].includes(game.assignmentType)) {
        errors.push(`${prefix}: assignmentType must be club or international`);
      }
      if (!isEvidenceUrl(game.officialScheduleUrl)) errors.push(`${prefix}: game needs an officialScheduleUrl`);
      if (!expectedSet.has(game.player)) errors.push(`${prefix}: game player is not in the active registry`);
    }

    if (Array.isArray(manifest.coverage)) {
      const gamePlayers = new Set(manifest.games.map((game) => game.player));
      for (const row of manifest.coverage) {
        if (row.result === "game_found" && !gamePlayers.has(row.name)) {
          errors.push(`${row.name}: coverage says game_found but no game row exists`);
        }
        if (row.result === "no_game" && gamePlayers.has(row.name)) {
          errors.push(`${row.name}: coverage says no_game but a game row exists`);
        }
        if (row.internationalCheck?.result === "game_found"
          && !manifest.games.some((game) => game.player === row.name && game.assignmentType === "international")) {
          errors.push(`${row.name}: international check says game_found but no international game row exists`);
        }
      }
    }
  }

  const gate = manifest.noGamesGate;
  if (!gate || typeof gate !== "object") {
    errors.push("noGamesGate is required");
  } else {
    if (gate.checkedCount !== queue.activeCount) {
      errors.push(`noGamesGate.checkedCount must equal ${queue.activeCount}`);
    }
    if (gate.expectedCount !== queue.activeCount) {
      errors.push(`noGamesGate.expectedCount must equal ${queue.activeCount}`);
    }
    if (!Array.isArray(gate.unresolved) || gate.unresolved.length !== 0) {
      errors.push("noGamesGate.unresolved must be empty");
    }
    if ((manifest.games || []).length === 0 && gate.passed !== true) {
      errors.push("noGamesGate.passed must be true when the completed manifest contains no games");
    }
    if ((manifest.games || []).length > 0 && gate.passed !== false) {
      errors.push("noGamesGate.passed must be false when games are present");
    }
  }

  return errors;
}

const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const sourceIndex = JSON.parse(fs.readFileSync(sourceGroupsPath, "utf8"));

if (process.argv.includes("--self-test")) {
  const checkedAt = "2026-08-11T12:00:00.000Z";
  const valid = {
    date: "2026-08-11",
    registrySource: "social-drafts/daily-profile-queue.json",
    expectedCount: queue.activeCount,
    sourceGroups: sourceIndex.requiredDaily.map((group) => ({
      id: group.id,
      status: "checked",
      checkedAt,
      urlsChecked: group.seedUrls.length ? group.seedUrls : ["https://official.test/schedule"]
    })),
    coverage: queue.entries.map((entry) => ({
      name: entry.name,
      currentTeam: "Verified team",
      officialScheduleUrlsChecked: ["https://official.test/schedule"],
      assignments: [{
        team: "Verified team",
        league: "Verified league",
        officialScheduleUrlsChecked: ["https://official.test/schedule"],
        checkedAt,
        result: "no_game"
      }],
      internationalCheck: {
        result: "not_in_active_pool",
        candidateNationalTeams: [],
        officialRosterUrlsChecked: ["https://official.test/roster"],
        officialScheduleUrlsChecked: [],
        checkedAt,
        notes: ""
      },
      result: "no_game"
    })),
    internationalEvents: [],
    games: [],
    noGamesGate: {
      passed: true,
      checkedCount: queue.activeCount,
      expectedCount: queue.activeCount,
      unresolved: []
    }
  };
  const validErrors = validateManifest(valid, queue, sourceIndex, valid.date);
  const internationalGame = structuredClone(valid);
  internationalGame.coverage[0].result = "game_found";
  internationalGame.coverage[0].internationalCheck = {
    result: "game_found",
    candidateNationalTeams: ["Verified national team"],
    officialRosterUrlsChecked: ["https://official.test/roster"],
    officialScheduleUrlsChecked: ["https://official.test/international-schedule"],
    checkedAt,
    notes: ""
  };
  internationalGame.games = [{
    player: internationalGame.coverage[0].name,
    team: "Verified national team",
    opponent: "Verified opponent",
    league: "Verified international event",
    assignmentType: "international",
    mountainTime: "10:00 AM MDT",
    lineupStatus: "lineup not yet confirmed",
    viewingStatus: "Viewing information unavailable",
    officialScheduleUrl: "https://official.test/international-schedule"
  }];
  internationalGame.noGamesGate.passed = false;
  const internationalErrors = validateManifest(internationalGame, queue, sourceIndex, internationalGame.date);
  const invalid = structuredClone(valid);
  invalid.coverage.pop();
  const invalidErrors = validateManifest(invalid, queue, sourceIndex, invalid.date);
  if (validErrors.length || internationalErrors.length || invalidErrors.length === 0) {
    console.error(JSON.stringify({ validErrors, internationalErrors, invalidErrors }, null, 2));
    process.exit(1);
  }
  console.log(JSON.stringify({ status: "self-test-passed", activeCount: queue.activeCount }));
  process.exit(0);
}

const date = readArg("--date");
if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) {
  console.error("Usage: node tools/validate-game-manifest.mjs --date YYYY-MM-DD");
  process.exit(2);
}

const manifestPath = path.join(projectDir, "social-drafts", `watch-list-${date}`, "game-manifest.json");
if (!fs.existsSync(manifestPath)) {
  console.error(JSON.stringify({ valid: false, errors: [`missing manifest: ${manifestPath}`] }, null, 2));
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const errors = validateManifest(manifest, queue, sourceIndex, date);
if (errors.length) {
  console.error(JSON.stringify({ valid: false, path: manifestPath, errorCount: errors.length, errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  valid: true,
  path: manifestPath,
  mode: manifest.games.length ? "games" : "no_games",
  gameCount: manifest.games.length,
  checkedCount: manifest.noGamesGate.checkedCount
}));
