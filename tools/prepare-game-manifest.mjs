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

const date = readArg("--date");
if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) {
  console.error("Usage: node tools/prepare-game-manifest.mjs --date YYYY-MM-DD");
  process.exit(2);
}

const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const sourceIndex = JSON.parse(fs.readFileSync(sourceGroupsPath, "utf8"));
const outputDir = path.join(projectDir, "social-drafts", `watch-list-${date}`);
const outputPath = path.join(outputDir, "game-manifest.json");

fs.mkdirSync(outputDir, { recursive: true });

function pendingInternationalCheck() {
  return {
    result: "unresolved",
    candidateNationalTeams: [],
    officialRosterUrlsChecked: [],
    officialScheduleUrlsChecked: [],
    checkedAt: null,
    notes: ""
  };
}

function pendingCoverage(entry) {
  return {
    position: entry.position,
    name: entry.name,
    slug: entry.slug,
    group: entry.group,
    currentTeam: "",
    assignments: [],
    officialScheduleUrlsChecked: [],
    internationalCheck: pendingInternationalCheck(),
    result: "assignment_unresolved",
    notes: ""
  };
}

function pendingSourceGroup(group) {
  return {
    id: group.id,
    label: group.label,
    status: "pending",
    urlsChecked: [],
    checkedAt: null,
    notes: ""
  };
}

const baseManifest = {
  version: 1,
  date,
  generatedAt: new Date().toISOString(),
  registrySource: path.relative(projectDir, queuePath),
  expectedCount: queue.activeCount,
  sourceGroups: sourceIndex.requiredDaily.map(pendingSourceGroup),
  coverage: queue.entries.map(pendingCoverage),
  internationalEvents: [],
  games: [],
  noGamesGate: {
    passed: false,
    checkedCount: 0,
    expectedCount: queue.activeCount,
    unresolved: queue.entries.map((entry) => entry.name)
  }
};

if (!fs.existsSync(outputPath)) {
  fs.writeFileSync(outputPath, `${JSON.stringify(baseManifest, null, 2)}\n`);
  console.log(JSON.stringify({ status: "created", path: outputPath, expectedCount: queue.activeCount }));
  process.exit(0);
}

const manifest = JSON.parse(fs.readFileSync(outputPath, "utf8"));
const original = JSON.stringify(manifest);
const sourceMap = new Map((manifest.sourceGroups || []).map((group) => [group.id, group]));
manifest.sourceGroups = sourceIndex.requiredDaily.map((group) => sourceMap.get(group.id) || pendingSourceGroup(group));

const coverageMap = new Map((manifest.coverage || []).map((row) => [row.name, row]));
manifest.coverage = queue.entries.map((entry) => {
  const row = coverageMap.get(entry.name) || pendingCoverage(entry);
  row.position = entry.position;
  row.slug = entry.slug;
  row.group = entry.group;
  if (!row.internationalCheck) row.internationalCheck = pendingInternationalCheck();
  return row;
});

manifest.date = date;
manifest.registrySource = path.relative(projectDir, queuePath);
manifest.expectedCount = queue.activeCount;
if (!Array.isArray(manifest.internationalEvents)) manifest.internationalEvents = [];
if (!Array.isArray(manifest.games)) manifest.games = [];

const unresolved = manifest.coverage
  .filter((row) => !["game_found", "no_game"].includes(row.result)
    || !["game_found", "no_game", "not_in_active_pool"].includes(row.internationalCheck?.result))
  .map((row) => row.name);
manifest.noGamesGate = {
  passed: unresolved.length === 0 && manifest.games.length === 0,
  checkedCount: queue.activeCount - unresolved.length,
  expectedCount: queue.activeCount,
  unresolved
};

const changed = original !== JSON.stringify(manifest);
if (changed) fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({
  status: changed ? "migrated" : "exists",
  path: outputPath,
  expectedCount: queue.activeCount,
  unresolvedCount: unresolved.length
}));
