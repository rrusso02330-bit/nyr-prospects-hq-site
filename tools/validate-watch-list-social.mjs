#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const toolDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(toolDir, "..");

function readArg(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : process.argv[index + 1];
}

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function containsForbiddenSummary(text) {
  return [
    /\bplayers? checked\b/i,
    /\b\d+ checked\b/i,
    /\b\d+ games?\s*\/\s*\d+ prospects?\b/i,
    /\bdetails(?: and verified links)? below\b/i,
    /\bstandalone (?:title|summary)\b/i
  ].some((pattern) => pattern.test(text));
}

function validate(date, manifest, plan, draftDir) {
  const errors = [];
  const games = Array.isArray(manifest.games) ? manifest.games : [];

  if (plan.date !== date) errors.push(`publish-plan date must be ${date}`);

  if (games.length === 0) {
    if (plan.publish !== false) errors.push("no-games plan must set publish to false");
    if (plan.reason !== "verified_no_games") errors.push("no-games plan reason must be verified_no_games");
    if ((plan.instagram?.media || []).length) errors.push("no-games plan cannot select Instagram media");
    if ((plan.x?.posts || []).length) errors.push("no-games plan cannot contain X posts");
    return errors;
  }

  if (plan.publish !== true) errors.push("game-day plan must set publish to true");

  const media = plan.instagram?.media;
  const caption = plan.instagram?.caption;
  const posts = plan.x?.posts;

  if (!Array.isArray(media) || media.length === 0) {
    errors.push("Instagram media allowlist must contain at least one game-detail image");
  } else {
    for (const filename of media) {
      if (!hasText(filename)) {
        errors.push("Instagram media entries must be filenames");
        continue;
      }
      if (/(?:^|[-_.])(title|cover|summary|totals?|links?|outro)(?:[-_.]|$)/i.test(filename)) {
        errors.push(`forbidden non-game Instagram asset selected: ${filename}`);
      }
      const fullPath = path.resolve(draftDir, filename);
      if (!fullPath.startsWith(`${draftDir}${path.sep}`) || !fs.existsSync(fullPath)) {
        errors.push(`selected Instagram asset does not exist in the draft directory: ${filename}`);
      }
    }
  }

  if (!hasText(caption)) errors.push("Instagram caption is required");
  if (hasText(caption) && containsForbiddenSummary(caption)) {
    errors.push("Instagram caption contains forbidden totals/overview language");
  }

  if (!Array.isArray(posts) || posts.length === 0) {
    errors.push("at least one X post is required");
  } else {
    posts.forEach((post, index) => {
      if (!hasText(post)) errors.push(`X post ${index + 1} is empty`);
      if (hasText(post) && post.length > 280) errors.push(`X post ${index + 1} exceeds 280 characters`);
      if (hasText(post) && containsForbiddenSummary(post)) {
        errors.push(`X post ${index + 1} contains forbidden totals/overview language`);
      }
    });
    if (hasText(posts[0]) && !games.some((game) => posts[0].includes(game.player))) {
      errors.push("the first X post must begin with an actual tracked player/game listing");
    }
  }

  const instagramText = hasText(caption) ? caption : "";
  const xText = Array.isArray(posts) ? posts.join("\n") : "";
  for (const game of games) {
    if (!instagramText.includes(game.player)) {
      errors.push(`Instagram caption is missing game player: ${game.player}`);
    }
    if (!xText.includes(game.player)) {
      errors.push(`X posts are missing game player: ${game.player}`);
    }
    if (!instagramText.includes(game.opponent)) {
      errors.push(`Instagram caption is missing opponent for ${game.player}: ${game.opponent}`);
    }
    if (!xText.includes(game.opponent)) {
      errors.push(`X posts are missing opponent for ${game.player}: ${game.opponent}`);
    }
  }

  return errors;
}

const date = readArg("--date");
if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) {
  console.error("Usage: node tools/validate-watch-list-social.mjs --date YYYY-MM-DD");
  process.exit(2);
}

const draftDir = path.join(projectDir, "social-drafts", `watch-list-${date}`);
const manifestPath = path.join(draftDir, "game-manifest.json");
const planPath = path.join(draftDir, "publish-plan.json");

const missing = [manifestPath, planPath].filter((file) => !fs.existsSync(file));
if (missing.length) {
  console.error(JSON.stringify({ valid: false, errors: missing.map((file) => `missing file: ${file}`) }, null, 2));
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const plan = JSON.parse(fs.readFileSync(planPath, "utf8"));
const errors = validate(date, manifest, plan, draftDir);

if (errors.length) {
  console.error(JSON.stringify({ valid: false, path: planPath, errorCount: errors.length, errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  valid: true,
  path: planPath,
  publish: plan.publish,
  instagramMediaCount: plan.instagram?.media?.length || 0,
  xPostCount: plan.x?.posts?.length || 0
}));
