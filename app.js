const GITHUB_USERNAME = "georgefotiadis2010-dotcom";
const SELF_REPO_NAME = "app-hoster";

/**
 * Fallback & custom GitHub Pages entries.
 * Any public repo under GITHUB_USERNAME with GitHub Pages enabled is also
 * discovered automatically via the GitHub API when online.
 * Add extra or collaborator projects here if they live under another owner.
 */
const KNOWN_PROJECTS = [
  {
    name: "Video-Editor",
    title: "Video Editor",
    pagesUrl: "https://georgefotiadis2010-dotcom.github.io/Video-Editor/",
    repoUrl: "https://github.com/georgefotiadis2010-dotcom/Video-Editor",
    description: "Browser-based video editor.",
    language: "TypeScript",
    updatedAt: "2026-11-13T02:11:00Z",
  },
  {
    name: "Aftermath-Living-Hell",
    title: "Aftermath: Living Hell",
    pagesUrl: "https://agentalex1076.github.io/Aftermath-Living-Hell/",
    repoUrl: "https://github.com/AgentAlex1076/Aftermath-Living-Hell",
    description: "Interactive web project.",
    language: "TypeScript",
    updatedAt: "2026-10-27T21:28:00Z",
  },
];

const gridEl = document.getElementById("project-grid");
const emptyEl = document.getElementById("empty-state");
const statusEl = document.getElementById("status-line");
const searchInput = document.getElementById("search-input");

let allProjects = [...KNOWN_PROJECTS];

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

function createArrowIcon() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 20 20");
  svg.setAttribute("fill", "none");
  svg.setAttribute("aria-hidden", "true");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M5.5 14.5 14.5 5.5m0 0H7.5m7 0v7"
  );
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "1.75");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");

  svg.appendChild(path);
  return svg;
}

function renderProjects(filterText = "") {
  const query = filterText.trim().toLowerCase();
  const filtered = allProjects.filter((project) => {
    if (!query) return true;
    const haystack = [
      project.title,
      project.name,
      project.description,
      project.language,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });

  gridEl.replaceChildren();

  for (const project of filtered) {
    const card = document.createElement("article");
    card.className = "card";

    const header = document.createElement("header");
    header.className = "card-header";

    const heading = document.createElement("h2");
    const link = document.createElement("a");
    link.className = "card-link";
    link.href = project.pagesUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = project.title || formatTitle(project.name);
    heading.appendChild(link);

    const badge = document.createElement("span");
    badge.className = "launch-badge";
    badge.setAttribute("aria-hidden", "true");
    badge.appendChild(createArrowIcon());

    header.append(heading, badge);

    const desc = document.createElement("p");
    desc.className = "card-desc";
    desc.textContent = project.description || "Hosted on GitHub Pages.";

    const footer = document.createElement("footer");
    footer.className = "card-footer";

    const metaTags = document.createElement("div");
    metaTags.className = "meta-tags";

    if (project.language) {
      const langTag = document.createElement("span");
      langTag.className = "tag";
      langTag.textContent = project.language;
      metaTags.appendChild(langTag);
    }

    const updatedLabel = formatDate(project.updatedAt);
    if (updatedLabel) {
      const time = document.createElement("time");
      time.dateTime = project.updatedAt;
      time.textContent = `Updated ${updatedLabel}`;
      metaTags.appendChild(time);
    }

    footer.appendChild(metaTags);

    if (project.repoUrl) {
      const repoLink = document.createElement("a");
      repoLink.className = "repo-link";
      repoLink.href = project.repoUrl;
      repoLink.target = "_blank";
      repoLink.rel = "noopener noreferrer";
      repoLink.textContent = "Source";
      repoLink.setAttribute(
        "aria-label",
        `View ${project.title || project.name} source on GitHub`
      );
      footer.appendChild(repoLink);
    }

    card.append(header, desc, footer);
    gridEl.appendChild(card);
  }

  emptyEl.hidden = filtered.length > 0;
  const total = allProjects.length;
  statusEl.textContent = query
    ? `Showing ${filtered.length} of ${total} GitHub Pages`
    : `${total} live GitHub ${total === 1 ? "Page" : "Pages"}`;
}

async function syncGitHubPages() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
    );
    if (!response.ok) return;

    const repos = await response.json();
    if (!Array.isArray(repos)) return;

    const discovered = repos
      .filter(
        (repo) =>
          repo.has_pages && repo.name.toLowerCase() !== SELF_REPO_NAME
      )
      .map((repo) => ({
        name: repo.name,
        title: formatTitle(repo.name),
        pagesUrl: `https://${repo.owner.login.toLowerCase()}.github.io/${repo.name}/`,
        repoUrl: repo.html_url,
        description: repo.description || "Hosted on GitHub Pages.",
        language: repo.language || "",
        updatedAt: repo.updated_at || "",
      }));

    const mergedByUrl = new Map();
    for (const item of KNOWN_PROJECTS) {
      mergedByUrl.set(item.pagesUrl.toLowerCase(), item);
    }
    for (const item of discovered) {
      const key = item.pagesUrl.toLowerCase();
      const existing = mergedByUrl.get(key);
      mergedByUrl.set(key, existing ? { ...item, ...existing, updatedAt: item.updatedAt || existing.updatedAt } : item);
    }

    allProjects = Array.from(mergedByUrl.values()).sort((a, b) =>
      (b.updatedAt || "").localeCompare(a.updatedAt || "")
    );
    renderProjects(searchInput.value);
  } catch {
    // Keep KNOWN_PROJECTS fallback when offline or rate-limited.
  }
}

searchInput.addEventListener("input", (event) => {
  renderProjects(event.target.value);
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "/" &&
    document.activeElement !== searchInput &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.altKey
  ) {
    event.preventDefault();
    searchInput.focus();
  }
});

renderProjects();
syncGitHubPages();
