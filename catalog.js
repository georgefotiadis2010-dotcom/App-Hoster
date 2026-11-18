const GITHUB_USERNAME = "georgefotiadis2010-dotcom";
const SELF_REPO_NAME = "app-hoster";

const KNOWN_PROJECTS = [
  {
    name: "Chamber-Loading",
    title: "Chamber Loading",
    category: "Game",
    preview: "previews/Chamber-Loading.webp",
    pagesUrl: "https://georgefotiadis2010-dotcom.github.io/Chamber-Loading/",
    repoUrl: "https://github.com/georgefotiadis2010-dotcom/Chamber-Loading",
    description: "3D Roguelike Revolver Deckbuilder.",
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
    description: "Release rollout checker and status dashboard.",
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
      "Workout and weight tracking with muscle focus visualization.",
    updatedAt: "2026-11-13T04:00:00Z",
  },
  {
    name: "Video-Editor",
    title: "Video Editor",
    category: "Tool",
    preview: "previews/Video-Editor.webp",
    pagesUrl: "https://georgefotiadis2010-dotcom.github.io/Video-Editor/",
    repoUrl: "https://github.com/georgefotiadis2010-dotcom/Video-Editor",
    description: "Browser-based video editor.",
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
    description: "Interactive web project.",
    language: "TypeScript",
    updatedAt: "2026-10-27T21:28:00Z",
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
