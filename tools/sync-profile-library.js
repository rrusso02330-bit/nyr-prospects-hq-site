const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const scripts = fs.readFileSync(path.join(root, 'scripts.js'), 'utf8');
const stats = JSON.parse(fs.readFileSync(path.join(root, 'data', 'player-stats.json'), 'utf8'));
const orderMatch = scripts.match(/const prospectConsensusOrder = (\[[\s\S]*?\n\]);/);
const playersStart = scripts.indexOf('const playerProfiles = [');
const playersEnd = scripts.indexOf('];\n\nconst tradeAcquisitionDetails', playersStart) + 2;
const scoutingStart = scripts.indexOf('const scoutingProfiles = {');
const scoutingEnd = scripts.indexOf('\n}\n\nfunction getLeague', scoutingStart) + 2;
if (!orderMatch || playersStart < 0 || playersEnd < 2 || scoutingStart < 0 || scoutingEnd < 3) {
  throw new Error('Website roster data was not found.');
}

const order = Function(`return ${orderMatch[1]}`)();
const players = Function(`${scripts.slice(playersStart, playersEnd)}; return playerProfiles;`)();
const scoutingProfiles = Function(`${scripts.slice(scoutingStart, scoutingEnd)}; return scoutingProfiles;`)();
const byName = new Map(players.map((player) => [player.name, player]));
const statsBySlug = new Map(Object.entries(stats.players || {}));
const inactive = new Set(['Graduated', 'Traded draft picks']);
const active = order.filter((name) => byName.has(name) && !inactive.has(byName.get(name).group));
const library = path.join(root, 'social-drafts', 'daily-profile-library');
const queuePath = path.join(root, 'social-drafts', 'daily-profile-queue.json');
const statePath = path.join(root, 'social-drafts', 'daily-profile-state.json');
fs.mkdirSync(library, { recursive: true });
const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const officialHeadshotUrl = (playerId) => `https://assets.nhle.com/mugs/nhl/latest/${playerId}.png`;
const mdLink = (source) => `- [${source.label}](${source.url})`;
const profileMarkdown = ({ name, position, player, profile, playerStats }) => {
  const sources = profile?.sources?.length ? profile.sources : (playerStats?.sourceLinks || []);
  const sourceLines = sources.length ? sources.map(mdLink).join('\n') : '- Website player profile; add an external verification source before publishing.';
  const headshot = playerStats?.nhlApiPlayerId ? officialHeadshotUrl(playerStats.nhlApiPlayerId) : 'Unavailable';
  return `# ${name}\n\n- Website order: ${position}\n- Package status: image-ready and evergreen-writeup-ready\n- Preferred visual: official NHL player headshot in official-nhl-headshot.png. At posting time, search for a verified game/action photo first; use this official photo when an action photo is not available.\n- Image credit/source: [NHL player headshot](${headshot})\n- Hashtags: #NYR #NYRProspects #NewYorkRangers #${name.replace(/[^A-Za-z]/g, '')}\n\n## Evergreen write-up\n\n${profile?.bio || `${name} is a current Rangers-controlled prospect. Confirm an evergreen profile before publishing.`}\n\n### Style\n${profile?.style || 'Confirm from an official team, league, or player source before publishing.'}\n\n### Strengths\n${profile?.strengths || 'Confirm from an official team, league, or player source before publishing.'}\n\n### Development focus\n${profile?.development || 'Confirm from an official team, league, or player source before publishing.'}\n\n### Projection\n${profile?.projection || 'Do not add a projection without a verified source.'}\n\n### Style comparison\n${profile?.comparable || 'No comparison saved.'}\n\n## Source notes\n${sourceLines}\n\n## Stats rule\n\nDo not save a static current-season stats slide. At posting time, refresh verified current-season totals from reliable live sources, include the prior two seasons when available, and label unavailable data rather than guessing.\n`;
};
const entries = active.map((name, index) => {
  const player = byName.get(name);
  const playerSlug = slug(name);
  const playerStats = statsBySlug.get(playerSlug);
  const profile = scoutingProfiles[playerSlug];
  const folder = `${String(index + 1).padStart(2, '0')}-${playerSlug}`;
  const dir = path.join(library, folder);
  fs.mkdirSync(dir, { recursive: true });
  const brief = path.join(dir, 'profile.md');
  const existing = fs.existsSync(brief) ? fs.readFileSync(brief, 'utf8') : '';
  if (!existing.includes('Status: selected for live noon run')) {
    fs.writeFileSync(brief, profileMarkdown({ name, position: index + 1, player, profile, playerStats }));
  }
  return {
    position: index + 1,
    name,
    slug: playerSlug,
    group: player.group,
    profileFile: path.relative(root, brief),
    assetsDir: path.relative(root, dir),
    package: {
      evergreenWriteup: Boolean(profile?.bio),
      sourceCount: (profile?.sources?.length ? profile.sources : (playerStats?.sourceLinks || [])).length,
      preferredImage: path.relative(root, path.join(dir, 'official-nhl-headshot.png')),
      imageSource: playerStats?.nhlApiPlayerId ? officialHeadshotUrl(playerStats.nhlApiPlayerId) : null,
      imageStatus: fs.existsSync(path.join(dir, 'official-nhl-headshot.png')) ? 'official NHL headshot downloaded' : 'image pending',
    },
    visualOrder: ['game/action photo', 'official team/league/player photo', 'draft photo', 'clean name graphic last resort'],
    statsRule: 'Retain verified historical baseline locally; generate the current-season stats slide at post time from verified live data; include prior two seasons when available and label unavailable data.',
  };
});
fs.writeFileSync(queuePath, JSON.stringify({ version: 1, generatedAt: new Date().toISOString(), source: 'scripts.js prospectConsensusOrder filtered to non-graduated/non-traded registry entries', activeCount: entries.length, note: entries.length === 47 ? 'Website data currently resolves to 47 current/non-traded entries; no 48th player was added or inferred.' : '', entries }, null, 2) + '\n');
let state = { version: 1, updatedAt: new Date().toISOString(), entries: {} };
if (fs.existsSync(statePath)) state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
for (const entry of entries) state.entries[entry.slug] ??= { position: entry.position, status: 'pending', history: [] };
state.updatedAt = new Date().toISOString();
fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + '\n');
console.log(`Synced ${entries.length} noon-profile library entries.`);
