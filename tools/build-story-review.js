#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const storiesRoot = path.join(projectRoot, "social-drafts", "instagram-stories");
const batchRoot = path.join(
  storiesRoot,
  "batches",
  "2026-08-21-to-2026-09-19",
);
const manifestPath = path.join(batchRoot, "calendar.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const savedAt = new Date().toISOString();

const galleryStories = manifest.stories.map((story, index) => {
  const folderName = `${story.date}-${story.slug}`;
  const storyDir = path.join(storiesRoot, folderName);
  const files = fs.readdirSync(storyDir).sort();
  const cover = files.find((file) => file.endsWith("-cover.png"));

  if (!cover) {
    throw new Error(`No cover found for ${folderName}`);
  }

  const references = files.filter((file) => file.startsWith("reference-"));
  const metadata = {
    date: story.date,
    subject: story.subject,
    type: story.type,
    status: "saved-awaiting-user-review",
    image: cover,
    fact: story.fact,
    coverText: story.coverText,
    sourceUrls: story.sources,
    localReferences: references,
    batch: manifest.batch,
    savedAt,
    publishing: "local-only-not-scheduled",
  };

  fs.writeFileSync(
    path.join(storyDir, "story.json"),
    `${JSON.stringify(metadata, null, 2)}\n`,
  );

  return {
    number: index + 1,
    date: story.date,
    subject: story.subject,
    type: story.type,
    fact: story.fact,
    image: `../../${folderName}/${cover}`,
    metadata: `../../${folderName}/story.json`,
  };
});

const cards = galleryStories
  .map(
    (story) => `
      <article class="story-card">
        <button class="cover-button" type="button" data-index="${story.number - 1}" aria-label="Open ${escapeHtml(story.subject)} story for ${story.date}">
          <img src="${story.image}" alt="${escapeHtml(story.subject)} Instagram Story cover for ${story.date}" loading="lazy">
        </button>
        <div class="card-copy">
          <p class="date">${formatDate(story.date)}</p>
          <h2>${escapeHtml(story.subject)}</h2>
          <p class="type">${formatType(story.type)}</p>
          <div class="card-links">
            <a href="${story.image}" target="_blank" rel="noopener">Open full size</a>
            <a href="${story.metadata}" target="_blank" rel="noopener">Details</a>
          </div>
        </div>
      </article>`,
  )
  .join("");

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>NYR Prospects HQ | 30-Day Story Review</title>
  <style>
    :root {
      color-scheme: dark;
      --ink: #061226;
      --panel: #0d203d;
      --panel-2: #132d50;
      --line: #31547b;
      --blue: #5da9ff;
      --red: #ef3f4d;
      --paper: #f5f7fb;
      --muted: #aebdd0;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-width: 320px;
      background: var(--ink);
      color: var(--paper);
      font-family: Arial, Helvetica, sans-serif;
      letter-spacing: 0;
    }
    header {
      border-bottom: 1px solid var(--line);
      background: #08172d;
    }
    .header-inner, main {
      width: min(1480px, calc(100% - 32px));
      margin: 0 auto;
    }
    .header-inner { padding: 30px 0 26px; }
    .eyebrow, .date, .type {
      margin: 0;
      color: var(--blue);
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
    }
    h1 { margin: 8px 0 8px; font-size: 34px; line-height: 1.05; }
    .summary { margin: 0; color: var(--muted); line-height: 1.5; }
    main { padding: 28px 0 60px; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
      gap: 18px;
    }
    .story-card {
      overflow: hidden;
      border: 1px solid var(--line);
      border-radius: 6px;
      background: var(--panel);
    }
    .cover-button {
      display: block;
      width: 100%;
      aspect-ratio: 9 / 16;
      padding: 0;
      border: 0;
      background: #020814;
      cursor: zoom-in;
    }
    .cover-button img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .cover-button:focus-visible { outline: 3px solid var(--blue); outline-offset: -3px; }
    .card-copy { padding: 15px; }
    .card-copy h2 {
      min-height: 44px;
      margin: 6px 0 7px;
      font-size: 19px;
      line-height: 1.15;
    }
    .type { min-height: 30px; color: var(--muted); font-size: 11px; }
    .card-links { display: flex; gap: 14px; margin-top: 12px; }
    a { color: #8cc1ff; font-size: 13px; font-weight: 700; }
    dialog {
      width: min(1180px, calc(100% - 20px));
      height: min(96vh, 1050px);
      padding: 0;
      border: 1px solid var(--line);
      border-radius: 6px;
      background: #030914;
      color: var(--paper);
    }
    dialog::backdrop { background: rgba(0, 0, 0, .88); }
    .viewer {
      display: grid;
      grid-template-columns: minmax(300px, 1fr) minmax(250px, 360px);
      height: 100%;
    }
    .image-stage {
      min-width: 0;
      overflow: auto;
      display: grid;
      place-items: center;
      padding: 20px;
      background: #02050b;
    }
    .image-stage img {
      display: block;
      width: auto;
      max-width: 100%;
      height: auto;
      max-height: calc(96vh - 40px);
    }
    .viewer-copy {
      border-left: 1px solid var(--line);
      padding: 24px;
      overflow: auto;
      background: var(--panel);
    }
    .viewer-copy h2 { margin: 8px 0 10px; font-size: 27px; }
    .viewer-copy p { color: var(--muted); line-height: 1.5; }
    .viewer-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
    .viewer-actions button, .viewer-actions a {
      min-height: 42px;
      padding: 11px 14px;
      border: 1px solid var(--line);
      border-radius: 4px;
      background: var(--panel-2);
      color: var(--paper);
      font: inherit;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      text-decoration: none;
    }
    @media (max-width: 760px) {
      .header-inner, main { width: min(100% - 20px, 1480px); }
      .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
      .card-copy { padding: 10px; }
      .card-copy h2 { min-height: 38px; font-size: 15px; }
      .card-links { flex-direction: column; gap: 8px; }
      .viewer { grid-template-columns: 1fr; grid-template-rows: minmax(0, 1fr) auto; }
      .viewer-copy { border-top: 1px solid var(--line); border-left: 0; padding: 15px; }
      .viewer-copy p { display: none; }
      .image-stage img { max-height: calc(72vh - 30px); }
    }
  </style>
</head>
<body>
  <header>
    <div class="header-inner">
      <p class="eyebrow">NYR Prospects HQ · Local review</p>
      <h1>30-Day Instagram Story Run</h1>
      <p class="summary">August 21 through September 19 · Click any cover to inspect it, or open the full-size PNG in a new tab.</p>
    </div>
  </header>
  <main>
    <section class="grid" aria-label="Thirty Instagram Story covers">${cards}
    </section>
  </main>
  <dialog id="viewer">
    <div class="viewer">
      <div class="image-stage"><img id="viewer-image" alt=""></div>
      <div class="viewer-copy">
        <p class="date" id="viewer-date"></p>
        <h2 id="viewer-title"></h2>
        <p id="viewer-fact"></p>
        <div class="viewer-actions">
          <button type="button" id="previous">Previous</button>
          <button type="button" id="next">Next</button>
          <a id="viewer-full" target="_blank" rel="noopener">Open full size</a>
          <button type="button" id="close">Close</button>
        </div>
      </div>
    </div>
  </dialog>
  <script>
    const stories = ${JSON.stringify(galleryStories)};
    const viewer = document.getElementById("viewer");
    const image = document.getElementById("viewer-image");
    const title = document.getElementById("viewer-title");
    const date = document.getElementById("viewer-date");
    const fact = document.getElementById("viewer-fact");
    const full = document.getElementById("viewer-full");
    let current = 0;

    function show(index) {
      current = (index + stories.length) % stories.length;
      const story = stories[current];
      image.src = story.image;
      image.alt = story.subject + " Instagram Story cover";
      title.textContent = story.subject;
      date.textContent = new Date(story.date + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
      fact.textContent = story.fact;
      full.href = story.image;
      if (!viewer.open) viewer.showModal();
    }

    document.querySelectorAll(".cover-button").forEach((button) => {
      button.addEventListener("click", () => show(Number(button.dataset.index)));
    });
    document.getElementById("previous").addEventListener("click", () => show(current - 1));
    document.getElementById("next").addEventListener("click", () => show(current + 1));
    document.getElementById("close").addEventListener("click", () => viewer.close());
    viewer.addEventListener("click", (event) => {
      if (event.target === viewer) viewer.close();
    });
    document.addEventListener("keydown", (event) => {
      if (!viewer.open) return;
      if (event.key === "ArrowLeft") show(current - 1);
      if (event.key === "ArrowRight") show(current + 1);
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(batchRoot, "review.html"), html);
fs.writeFileSync(
  path.join(batchRoot, "review-data.json"),
  `${JSON.stringify(galleryStories, null, 2)}\n`,
);

manifest.reviewStatus = "ready-for-user-review";
manifest.completedAt = savedAt;
manifest.reviewPage = "review.html";
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Prepared ${galleryStories.length} story records and review.html`);

function formatDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatType(value) {
  return value.replaceAll("-", " ");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
