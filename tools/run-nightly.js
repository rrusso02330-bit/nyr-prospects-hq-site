#!/usr/bin/env node

const path = require("path");
const { spawnSync } = require("child_process");

const toolsDir = __dirname;
const defaultAlertPhone = "+12019212755";

function runScript(scriptName, args = []) {
  const scriptPath = path.join(toolsDir, scriptName);
  const result = spawnSync(process.execPath, [scriptPath, ...args], {
    stdio: "inherit",
    env: {
      ...process.env,
      DRAFT_ALERT_PHONE: process.env.DRAFT_ALERT_PHONE || process.env.POST_ALERT_PHONE || defaultAlertPhone,
    },
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

runScript("update-stats.js");
runScript("generate-x-posts.js", process.argv.slice(2));
