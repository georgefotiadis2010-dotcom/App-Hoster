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
    description: "LXG rollout checker and release command center.",
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

const gridEl = document.getElementById("project-grid");
const emptyEl = document.getElementById("empty-state");
const statusEl = document.getElementById("status-line");
const searchInput = document.getElementById("search-input");
const filterPillsEl = document.getElementById("filter-pills");

const previewDialog = document.getElementById("preview-dialog");
const dialogTitle = document.getElementById("dialog-title");
const dialogCategory = document.getElementById("dialog-category");
const dialogImg = document.getElementById("dialog-img");
const dialogDesc = document.getElementById("dialog-desc");
const dialogLaunch = document.getElementById("dialog-launch");
const dialogRepo = document.getElementById("dialog-repo");
const dialogClose = document.getElementById("dialog-close");

let allProjects = [...KNOWN_PROJECTS];
let activeCategory = "all";

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

function createPreviewElement(project, index) {
  const title = project.title || formatTitle(project.name);
  const preview = document.createElement("div");
  preview.className = "card-preview";

  const showFallback = () => {
    const fallback = document.createElement("div");
    fallback.className = "preview-fallback";
    fallback.textContent = title;
    preview.replaceChildren(fallback, categoryTag);
  };

  const categoryTag = document.createElement("span");
  categoryTag.className = "preview-category";
  categoryTag.textContent = project.category || "Web App";

  if (project.preview) {
    const img = document.createElement("img");
    img.src = project.preview;
    img.alt = `${title} app preview screenshot`;
    img.width = 1280;
    img.height = 800;

    if (index < 2) {
      img.setAttribute("fetchpriority", "high");
    } else {
      img.loading = "lazy";
    }

    img.addEventListener("error", showFallback, { once: true });

    const expandBtn = document.createElement("button");
    expandBtn.type = "button";
    expandBtn.className = "preview-expand";
    expandBtn.setAttribute("aria-label", `Inspect ${title} preview`);
    expandBtn.title = "Inspect preview";
    expandBtn.appendChild(
      createSvgIcon("M12.5 3.5h4v4m0-4-4.75 4.75M7.5 16.5h-4v-4m0 4 4.75-4.75")
    );
    expandBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openPreviewDialog(project);
    });

    preview.append(img, categoryTag, expandBtn);
  } else {
    showFallback();
  }

  return preview;
}

function openPreviewDialog(project) {
  const title = project.title || formatTitle(project.name);
  dialogTitle.textContent = title;
  dialogCategory.textContent = project.category || "Web App";
  dialogImg.src = project.preview || "";
  dialogImg.alt = `${title} full preview screenshot`;
  dialogDesc.textContent = project.description || "Hosted web application.";
  dialogLaunch.href = project.pagesUrl;

  if (project.repoUrl) {
    dialogRepo.href = project.repoUrl;
    dialogRepo.hidden = false;
  } else {
    dialogRepo.hidden = true;
  }

  previewDialog.showModal();
}

function renderProjects(filterText = searchInput.value) {
  const query = filterText.trim().toLowerCase();
  const filtered = allProjects.filter((project) => {
    const matchesCategory =
      activeCategory === "all" ||
      (project.category || "Web App").toLowerCase() === activeCategory.toLowerCase();
    if (!matchesCategory) return false;
    if (!query) return true;
    const haystack = [
      project.title,
      project.name,
      project.description,
      project.language,
      project.category,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });

  gridEl.replaceChildren();

  filtered.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "card";

    const preview = createPreviewElement(project, index);

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
    badge.appendChild(createSvgIcon("M5.5 14.5 14.5 5.5m0 0H7.5m7 0v7"));

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

    card.append(preview, header, desc, footer);
    gridEl.appendChild(card);
  });

  emptyEl.hidden = filtered.length > 0;
  const total = allProjects.length;
  statusEl.textContent =
    query || activeCategory !== "all"
      ? `Showing ${filtered.length} of ${total} apps`
      : `${total} live ${total === 1 ? "app" : "apps"}`;
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
        category: "Web App",
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
      mergedByUrl.set(
        key,
        existing
          ? { ...item, ...existing, updatedAt: item.updatedAt || existing.updatedAt }
          : item
      );
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

filterPillsEl.addEventListener("click", (event) => {
  const btn = event.target.closest(".filter-pill");
  if (!btn) return;
  activeCategory = btn.dataset.filter || "all";
  for (const pill of filterPillsEl.querySelectorAll(".filter-pill")) {
    const isSelected = pill === btn;
    pill.classList.toggle("is-active", isSelected);
    pill.setAttribute("aria-pressed", String(isSelected));
  }
  renderProjects(searchInput.value);
});

dialogClose.addEventListener("click", () => {
  previewDialog.close();
});

previewDialog.addEventListener("click", (event) => {
  if (event.target === previewDialog) {
    previewDialog.close();
  }
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "/" &&
    document.activeElement !== searchInput &&
    !previewDialog.open &&
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
