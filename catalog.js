const GITHUB_USERNAME = "georgefotiadis2010-dotcom";
const SELF_REPO_NAME = "app-hoster";

const KNOWN_PROJECTS = [
  {
    name: "Nebula-Idea-Jotter",
    title: "SnippetVault",
    category: "Tool",
    preview: "previews/Nebula-Idea-Jotter.webp",
    pagesUrl: "https://georgefotiadis2010-dotcom.github.io/Nebula-Idea-Jotter/",
    repoUrl: "https://github.com/georgefotiadis2010-dotcom/Nebula-Idea-Jotter",
    description:
      "Infinite spatial canvas for pinning notes, code snippets, hex swatches, and links.",
    language: "TypeScript",
    updatedAt: "2026-11-18T03:48:11Z",
  },
  {
    name: "Chamber-Loading",
    title: "Chamber Loading",
    category: "Game",
    preview: "previews/Chamber-Loading.webp",
    pagesUrl: "https://georgefotiadis2010-dotcom.github.io/Chamber-Loading/",
    repoUrl: "https://github.com/georgefotiadis2010-dotcom/Chamber-Loading",
    description: "3D tabletop roguelike revolver deckbuilder with 50/50 chamber bets.",
    language: "TypeScript",
    updatedAt: "2026-11-16T22:58:27Z",
  },
  {
    name: "LXG-rollout-chcker",
    title: "LXG Release Command Center",
    category: "Tool",
    preview: "previews/LXG-rollout-chcker.webp",
    pagesUrl: "https://georgefotiadis2010-dotcom.github.io/LXG-rollout-chcker/",
    repoUrl: "https://github.com/georgefotiadis2010-dotcom/LXG-rollout-chcker",
    description: "Music release command center tracking distribution, editorial pitches, and deadlines.",
    language: "TypeScript",
    updatedAt: "2026-11-13T07:22:33Z",
  },
  {
    name: "Hooper-Gym",
    title: "Hooper Gym",
    category: "Fitness",
    preview: "previews/Hooper-Gym.webp",
    pagesUrl: "https://hooper-gym-app.web.app/",
    description:
      "Workout and weight tracking app with muscle focus visualization.",
    updatedAt: "2026-11-13T04:00:00Z",
  },
  {
    name: "Video-Editor",
    title: "Video Editor",
    category: "Tool",
    preview: "previews/Video-Editor.webp",
    pagesUrl: "https://georgefotiadis2010-dotcom.github.io/Video-Editor/",
    repoUrl: "https://github.com/georgefotiadis2010-dotcom/Video-Editor",
    description: "Beat-synced browser video editor for turning raw clips and hooks into reels.",
    language: "TypeScript",
    updatedAt: "2026-11-13T02:11:00Z",
  },
  {
    name: "Aftermath-Living-Hell",
    title: "Aftermath: Living Hell",
    category: "Game",
    preview: "previews/Aftermath-Living-Hell.webp",
    pagesUrl: "https://agentalex1076.github.io/Aftermath-Living-Hell/",
    repoUrl: "https://github.com/AgentAlex1076/Aftermath-Living-Hell",
    description: "Comic-styled 3D survival game where you hold the hut against the fog.",
    language: "TypeScript",
    updatedAt: "2026-10-27T21:28:00Z",
  },
  {
    name: "animator",
    title: "Animator",
    category: "Tool",
    preview: "previews/animator.webp",
    pagesUrl: "https://georgefotiadis2010-dotcom.github.io/animator/",
    repoUrl: "https://github.com/georgefotiadis2010-dotcom/animator",
    description: "Vibe-coded animation gallery and visual studio with one-click code export.",
    language: "TypeScript",
    updatedAt: "2026-11-19T02:11:57Z",
  },
  {
    name: "Arsenal-TCG",
    title: "Arsenal TCG",
    category: "Game",
    preview: "previews/Arsenal-TCG.webp",
    pagesUrl: "https://georgefotiadis2010-dotcom.github.io/Arsenal-TCG/",
    repoUrl: "https://github.com/georgefotiadis2010-dotcom/Arsenal-TCG",
    description: "Turn-based tactical card battler where characters equip melee, magic, and ranged weapons.",
    language: "GDScript",
    updatedAt: "2026-11-18T11:11:18Z",
  },
  {
    name: "Chess-TCG",
    title: "Chess TCG",
    category: "Game",
    preview: "previews/Chess-TCG.webp",
    pagesUrl: "https://georgefotiadis2010-dotcom.github.io/Chess-TCG/",
    repoUrl: "https://github.com/georgefotiadis2010-dotcom/Chess-TCG",
    description: "39-point tactical chess deckbuilder with custom piece abilities and Minimax AI.",
    language: "JavaScript",
    updatedAt: "2026-11-22T07:54:19Z",
  },
  {
    name: "Headcoach",
    title: "Headcoach",
    category: "Fitness",
    preview: "previews/Headcoach.webp",
    pagesUrl: "https://georgefotiadis2010-dotcom.github.io/Headcoach/",
    repoUrl: "https://github.com/georgefotiadis2010-dotcom/Headcoach",
    description: "Mental performance academy for athletes with courses, mastery maps, and readiness check-ins.",
    language: "TypeScript",
    updatedAt: "2026-11-19T05:30:00Z",
  },
  {
    name: "LXG-dashboard",
    title: "LXG Dashboard",
    category: "Tool",
    preview: "previews/LXG-dashboard.webp",
    pagesUrl: "https://georgefotiadis2010-dotcom.github.io/LXG-dashboard/",
    repoUrl: "https://github.com/georgefotiadis2010-dotcom/LXG-dashboard",
    description: "Artist analytics dashboard tracking monthly listeners, release goals, and content calendars.",
    language: "TypeScript",
    updatedAt: "2026-11-25T21:55:24Z",
  },
  {
    name: "Smoots-Survival",
    title: "Smoots Survival",
    category: "Game",
    preview: "previews/Smoots-Survival.webp",
    pagesUrl: "https://georgefotiadis2010-dotcom.github.io/Smoots-Survival/",
    repoUrl: "https://github.com/georgefotiadis2010-dotcom/Smoots-Survival",
    description: "Isometric island survival adventure with stealth, campfires, and narrative quests.",
    language: "JavaScript",
    updatedAt: "2026-11-25T07:43:30Z",
  },
  {
    name: "Sneaker-resell-game",
    title: "Sneaker Hustle",
    category: "Game",
    preview: "previews/Sneaker-resell-game.webp",
    pagesUrl: "https://georgefotiadis2010-dotcom.github.io/Sneaker-resell-game/",
    repoUrl: "https://github.com/georgefotiadis2010-dotcom/Sneaker-resell-game",
    description: "Sneaker flipping tycoon game with crates, auctions, and live market trends.",
    language: "HTML",
    updatedAt: "2026-11-18T08:29:53Z",
  },
  {
    name: "Spilling-Sand",
    title: "AetherSand",
    category: "Game",
    preview: "previews/Spilling-Sand.webp",
    pagesUrl: "https://georgefotiadis2010-dotcom.github.io/Spilling-Sand/",
    repoUrl: "https://github.com/georgefotiadis2010-dotcom/Spilling-Sand",
    description: "WebGL2 2.5D falling-sand physics sandbox with raymarched GI, fluids, and thermal tools.",
    language: "JavaScript",
    updatedAt: "2026-11-20T04:58:34Z",
  },
  {
    name: "Animations-App",
    title: "Animations App",
    category: "Tool",
    preview: "previews/Animations-App.webp",
    pagesUrl: "https://georgefotiadis2010-dotcom.github.io/Animations-App/",
    repoUrl: "https://github.com/georgefotiadis2010-dotcom/Animations-App",
    description: "GitHub Pages placeholder (404 — superseded by Animator).",
    updatedAt: "2026-11-19T02:10:10Z",
  },
];

const HERO_PALETTES = [
  ["#a85d87", "#613353"],
  ["#336ec4", "#183366"],
  ["#268466", "#114338"],
  ["#6e52b5", "#2d2057"],
  ["#b04949", "#4f1e24"],
];

function formatTitle(repoName) {
  return repoName
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatHost(url) {
  try {
    return new URL(url).host;
  } catch {
    return "";
  }
}

function getProjectPageUrl(project) {
  return `project.html?id=${encodeURIComponent(project.name)}`;
}

function createSvgIcon(pathD) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 20 20");
  svg.setAttribute("fill", "none");
  svg.setAttribute("aria-hidden", "true");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathD);
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "1.75");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");

  svg.appendChild(path);
  return svg;
}

function randomBubbleRadius() {
  const r = (min, max) => Math.floor(min + Math.random() * (max - min));
  const a = r(32, 68);
  const b = 100 - a;
  const c = r(30, 70);
  const d = 100 - c;
  const e = r(34, 66);
  const f = 100 - e;
  const g = r(30, 70);
  const h = 100 - g;
  return `${a}% ${b}% ${c}% ${d}% / ${e}% ${f}% ${g}% ${h}%`;
}

function createCardBubbles(count = 7) {
  const layer = document.createElement("div");
  layer.className = "card-bubbles";
  layer.setAttribute("aria-hidden", "true");

  for (let i = 0; i < count; i++) {
    const bubble = document.createElement("span");
    bubble.className = "water-bubble";

    const size = Math.round(22 + Math.random() * 54);
    const x = Math.round(6 + Math.random() * 82);
    const y = Math.round(6 + Math.random() * 78);
    const dx = Math.round((Math.random() - 0.5) * 22);
    const dy = Math.round(-6 - Math.random() * 16);
    const rot = Math.round((Math.random() - 0.5) * 32);
    const delay = (i * 0.055 + Math.random() * 0.08).toFixed(2);
    const dur = (3.2 + Math.random() * 2.4).toFixed(2);

    bubble.style.setProperty("--bx", `${x}%`);
    bubble.style.setProperty("--by", `${y}%`);
    bubble.style.setProperty("--bsize", `${size}px`);
    bubble.style.setProperty("--b-dx", `${dx}px`);
    bubble.style.setProperty("--b-dy", `${dy}px`);
    bubble.style.setProperty("--b-rot", `${rot}deg`);
    bubble.style.setProperty("--b-delay", `${delay}s`);
    bubble.style.setProperty("--b-dur", `${dur}s`);
    bubble.style.setProperty("--b-r1", randomBubbleRadius());
    bubble.style.setProperty("--b-r2", randomBubbleRadius());
    bubble.style.setProperty("--b-r3", randomBubbleRadius());

    layer.appendChild(bubble);
  }

  return layer;
}

async function fetchNewGitHubProjects(existingProjects) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
    );
    if (!response.ok) return [];

    const repos = await response.json();
    if (!Array.isArray(repos)) return [];

    const knownKeys = new Set(
      existingProjects.map((item) => item.pagesUrl.toLowerCase())
    );

    return repos
      .filter(
        (repo) =>
          repo.has_pages &&
          repo.name.toLowerCase() !== SELF_REPO_NAME &&
          !knownKeys.has(
            `https://${repo.owner.login.toLowerCase()}.github.io/${repo.name}/`.toLowerCase()
          )
      )
      .map((repo) => ({
        name: repo.name,
        title: formatTitle(repo.name),
        category: "Web App",
        pagesUrl: `https://${repo.owner.login.toLowerCase()}.github.io/${repo.name}/`,
        repoUrl: repo.html_url,
        description: repo.description || "Hosted on GitHub Pages.",
        language: repo.language || "",
        updatedAt: repo.updated_at || "",
      }));
  } catch {
    return [];
  }
}
