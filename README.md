# NYR Prospects HQ

NYR Prospects HQ is a New York Rangers prospect-tracking website for daily schedules, results, statistics, transactions, injuries, and development updates.

Public URL: `https://nyr-prospects-hq.netlify.app`

## Local preview

```sh
python3 -m http.server 8097 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8097/index.html`.

## Public pages

- `index.html` - active prospect registry
- `graduated.html` - graduated prospects
- `player.html?player=liam-greentree` - player profile and stats pages
- `404.html` - fallback page

## Stats data

Stats live in:

- `data/player-stats.json`
- `data/player-stats.js`

Run the updater manually with:

```sh
node tools/update-stats.js
```

## X drafts

After running the stats updater, generate X-ready nightly drafts with:

```sh
node tools/generate-x-posts.js
```

Drafts are written to `social-drafts/x-posts-YYYY-MM-DD.md`. The file includes tonight's results, news and notes, and a next-day watch post intended to be scheduled for 7:00 AM ET. Use `--date YYYY-MM-DD` to generate drafts for a specific results date.

For the full nightly routine, run:

```sh
node tools/run-nightly.js
```

That runs the stats updater first and then writes the X draft file. It does not post publicly.

## Offseason social rule

During the offseason, run the nightly prospect check first. Verified news always takes priority: camp notes, assignment changes, signings/trades, injuries, highlights, interviews, video links, and meaningful site updates.

Drafted-by-Rangers alumni are tracked in a separate news-only lane. Include notable contracts, trades, retirements, career milestones, hat tricks, major highlights, and similar updates for players originally drafted by New York, even if they are no longer prospects or no longer in the Rangers organization. Do not import alumni game logs or move alumni into prospect counts unless explicitly approved.

If there is no verified news, do not force a filler post. Prospect profiles are optional feature posts when we intentionally want to spotlight a player, not automatic no-news content. Start profile features with the newest Rangers-controlled additions from the 2026 draft and free-agency/trade period.

Instagram profile posts should normally be two-image carousels:

- Slide 1: best available visual. Prefer a rights-clear player/camp/scrimmage/draft/action photo. A clean light-text graphic is acceptable when no good photo is available, but avoid text-heavy first slides.
- Slide 2: profile breakdown card with the player's name, position, size, acquisition, short scouting note, and site link.

X can mirror the same update with more detail, links, and highlight/video URLs when available. Use the best media X will support: player photo, action image, draft image, site card, clean graphic, official video link, or highlight link. X can be text-only when no good media is available; do not let missing media block a useful news/profile post. Once the season starts, prioritize morning watch posts, nightly prospect/game recaps, and real stat/result updates over offseason profile filler.

## Draft watch

For draft night, watch the official NHL draft feed and create approval drafts when the Rangers pick:

```sh
DRAFT_ALERT_PHONE=+12010000000 node tools/watch-draft.js --poll-ms 15000
```

Each Rangers pick creates a file in `social-drafts/draft-2026/` and sends a Messages alert if `DRAFT_ALERT_PHONE` is set. This watcher does not post publicly; it only prepares the X copy for approval.

The GitHub Actions workflow in `.github/workflows/update-prospect-stats.yml` is set to refresh stats once per day and commit changed stats files back to the repository.

## Launch notes

Use `site-publish.zip` for a fast static-host upload.

Use the full project files for GitHub Pages or any setup that should keep the daily stats workflow.
