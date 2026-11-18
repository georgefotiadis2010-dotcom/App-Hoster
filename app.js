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
const dialogExpId = document.getElementById("dialog-exp-id");
const dialogTitle = document.getElementById("dialog-title");
const dialogCategory = document.getElementById("dialog-category");
const dialogImg = document.getElementById("dialog-img");
const dialogMeta = document.getElementById("dialog-meta");
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

function formatExpId(index) {
  return `EXP-${String(index + 1).padStart(2, "0")}`;
}

function formatHost(url) {
  try {
    return new URL(url).host;
  } catch {
    return "";
  }
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

function createPreviewElement(project, index, expId) {
  const title = project.title || formatTitle(project.name);
  const category = project.category || "Web App";
  const preview = document.createElement("div");
  preview.className = "card-preview";

  const badges = document.createElement("div");
  badges.className = "preview-badges";

  const expBadge = document.createElement("span");
  expBadge.className = "preview-exp-id";
  expBadge.textContent = expId;

  const categoryTag = document.createElement("span");
  categoryTag.className = "preview-category";
  categoryTag.dataset.category = category.toLowerCase();
  categoryTag.textContent = category;

  badges.append(expBadge, categoryTag);

  const showFallback = () => {
    const fallback = document.createElement("div");
    fallback.className = "preview-fallback";
    fallback.textContent = title;
    preview.replaceChildren(fallback, badges);
  };

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
      openPreviewDialog(project, expId);
    });

    preview.append(img, badges, expandBtn);
  } else {
    showFallback();
  }

  return preview;
}

function openPreviewDialog(project, expId) {
  const title = project.title || formatTitle(project.name);
  dialogExpId.textContent = expId;
  dialogTitle.textContent = title;
  dialogCategory.textContent = project.category || "Web App";
  dialogImg.src = project.preview || "";
  dialogImg.alt = `${title} full preview screenshot`;
  dialogDesc.textContent = project.description || "Hosted web application.";
  dialogLaunch.href = project.pagesUrl;

  const metaItems = [
    project.language,
    formatDate(project.updatedAt) ? `Updated ${formatDate(project.updatedAt)}` : "",
    formatHost(project.pagesUrl),
  ].filter(Boolean);

  dialogMeta.replaceChildren(
    ...metaItems.map((label) => {
      const chip = document.createElement("span");
      chip.className = "dialog-meta-chip";
      chip.textContent = label;
      return chip;
    })
  );

  if (project.repoUrl) {
    dialogRepo.href = project.repoUrl;
    dialogRepo.hidden = false;
  } else {
    dialogRepo.hidden = true;
  }

  previewDialog.removeAttribute("data-closing");
  previewDialog.showModal();
}

let supportsDisplayTransition;
function canTransitionDisplay() {
  if (supportsDisplayTransition !== undefined) return supportsDisplayTransition;
  if (!window.CSS?.supports?.("transition-behavior", "allow-discrete") || !document.body) {
    return false;
  }
  const probe = document.createElement("div");
  probe.style.cssText = "transition: display 1s allow-discrete !important; display: block;";
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = "none";
  supportsDisplayTransition = getComputedStyle(probe).display === "block";
  probe.remove();
  return supportsDisplayTransition;
}

function supportsTopLayerExit() {
  return window.CSS?.supports?.("overlay", "auto") && canTransitionDisplay();
}

async function closeTopLayer(element) {
  if (!element.open) return;
  if (!supportsTopLayerExit()) {
    element.setAttribute("data-closing", "");
    const animations = element.getAnimations({ subtree: true });
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((a) => a.finished)),
        new Promise((r) => setTimeout(r, 2000)),
      ]);
    }
    if (!element.hasAttribute("data-closing")) return;
    element.removeAttribute("data-closing");
  }
  element.close();
}

function renderProjects(filterText = searchInput.value) {
  const query = filterText.trim().toLowerCase();
  const indexedProjects = allProjects.map((project, idx) => ({
    project,
    expId: formatExpId(idx),
  }));

  const filtered = indexedProjects.filter(({ project }) => {
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

  filtered.forEach(({ project, expId }, index) => {
    const card = document.createElement("article");
    card.className = "card";

    const preview = createPreviewElement(project, index, expId);

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
      ? `${filtered.length} / ${total} experiments`
      : `${total} live ${total === 1 ? "experiment" : "experiments"}`;
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
  closeTopLayer(previewDialog);
});

previewDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeTopLayer(previewDialog);
});

if (!("closedBy" in HTMLDialogElement.prototype)) {
  previewDialog.addEventListener("click", (event) => {
    if (event.target !== previewDialog) return;
    const rect = previewDialog.getBoundingClientRect();
    const isDialogContent =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (isDialogContent) return;
    closeTopLayer(previewDialog);
  });
}

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
