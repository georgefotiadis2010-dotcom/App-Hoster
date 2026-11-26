const heroStageEl = document.getElementById("hero-stage");
const heroBgImg = document.getElementById("hero-bg-img");
const heroKicker = document.getElementById("hero-kicker");
const heroTitle = document.getElementById("hero-title");
const heroSubtitle = document.getElementById("hero-subtitle");
const heroDetailLink = document.getElementById("hero-detail-link");
const heroLaunch = document.getElementById("hero-launch");
const heroPreviewLink = document.getElementById("hero-preview-link");
const heroPreviewImg = document.getElementById("hero-preview-img");
const heroDotsEl = document.getElementById("hero-dots");
const heroPrevBtn = document.getElementById("hero-prev");
const heroNextBtn = document.getElementById("hero-next");

const spotlightGridEl = document.getElementById("spotlight-grid");
const gridEl = document.getElementById("project-grid");
const emptyEl = document.getElementById("empty-state");
const statusEl = document.getElementById("status-line");
const searchInput = document.getElementById("search-input");
const filterPillsEl = document.getElementById("filter-pills");

let allProjects = [...KNOWN_PROJECTS];
let activeCategory = "all";
let heroIndex = 0;

function preloadFeaturedPreviews() {
  for (const project of allProjects) {
    if (project.preview) {
      const img = new Image();
      img.src = project.preview;
    }
  }
}

/* =========================================================
   HERO CAROUSEL (USER-CONTROLLED, ACTIVE PROJECT IMAGE)
   ========================================================= */
function getFeaturedProjects() {
  return allProjects.slice(0, 5);
}

function renderHeroDots(count) {
  if (!heroDotsEl) return;
  heroDotsEl.replaceChildren();
  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Show featured project ${i + 1}`);
    dot.setAttribute("aria-selected", String(i === heroIndex));
    if (i === heroIndex) dot.classList.add("is-active");
    dot.addEventListener("click", () => {
      heroIndex = i;
      updateHeroSlide();
    });
    heroDotsEl.appendChild(dot);
  }
}

function updateHeroSlide() {
  if (!heroStageEl) return;
  const featured = getFeaturedProjects();
  if (featured.length === 0) return;
  heroIndex = ((heroIndex % featured.length) + featured.length) % featured.length;

  const current = featured[heroIndex];
  const [tintA, tintB] = HERO_PALETTES[heroIndex % HERO_PALETTES.length];
  const title = current.title || formatTitle(current.name);
  const detailUrl = getProjectPageUrl(current);

  heroStageEl.style.setProperty("--hero-tint-a", tintA);
  heroStageEl.style.setProperty("--hero-tint-b", tintB);

  if (heroKicker) heroKicker.textContent = current.category || "Web App";
  if (heroTitle) heroTitle.textContent = title;
  if (heroSubtitle) heroSubtitle.textContent = current.description || "Hosted web application.";
  if (heroDetailLink) heroDetailLink.href = detailUrl;
  if (heroLaunch) heroLaunch.href = current.pagesUrl;
  if (heroPreviewLink) {
    heroPreviewLink.href = detailUrl;
    heroPreviewLink.setAttribute("aria-label", `View ${title} project page`);
  }

  if (current.preview) {
    if (heroBgImg) {
      if (heroBgImg.getAttribute("src") !== current.preview) {
        heroBgImg.src = current.preview;
      }
      heroBgImg.hidden = false;
    }
    if (heroPreviewImg) {
      if (heroPreviewImg.getAttribute("src") !== current.preview) {
        heroPreviewImg.src = current.preview;
      }
      heroPreviewImg.alt = `${title} preview`;
      heroPreviewImg.hidden = false;
    }
  } else {
    if (heroBgImg) heroBgImg.hidden = true;
    if (heroPreviewImg) heroPreviewImg.hidden = true;
  }

  if (heroDotsEl) {
    const dots = heroDotsEl.querySelectorAll(".carousel-dot");
    if (dots.length !== featured.length) {
      renderHeroDots(featured.length);
    } else {
      dots.forEach((dot, idx) => {
        const isSelected = idx === heroIndex;
        dot.classList.toggle("is-active", isSelected);
        dot.setAttribute("aria-selected", String(isSelected));
      });
    }
  }
}

/* =========================================================
   FEATURED SPOTLIGHT ROW
   ========================================================= */
function renderSpotlight() {
  if (!spotlightGridEl) return;
  const showAll = spotlightGridEl.dataset.limit === "all";
  const spotlightItems = showAll ? allProjects : allProjects.slice(0, 3);
  spotlightGridEl.replaceChildren();

  spotlightItems.forEach((project, index) => {
    const title = project.title || formatTitle(project.name);
    const detailUrl = getProjectPageUrl(project);
    const card = document.createElement("article");
    card.className = "spotlight-card";

    const media = document.createElement("div");
    media.className = "spotlight-media";
    if (project.preview) {
      const img = document.createElement("img");
      img.src = project.preview;
      img.alt = `${title} preview`;
      img.width = 1280;
      img.height = 800;
      if (index < 2) img.setAttribute("fetchpriority", "high");
      media.appendChild(img);
    }

    const topPills = document.createElement("div");
    topPills.className = "spotlight-top-pills";

    const catPill = document.createElement("span");
    catPill.className = "spotlight-pill";
    catPill.textContent = project.category || "Web App";
    topPills.appendChild(catPill);

    if (project.language) {
      const langPill = document.createElement("span");
      langPill.className = "spotlight-pill";
      langPill.textContent = project.language;
      topPills.appendChild(langPill);
    }

    const body = document.createElement("div");
    body.className = "spotlight-body";

    const h3 = document.createElement("h3");
    h3.textContent = title;

    const p = document.createElement("p");
    p.textContent = project.description || "Hosted web application.";

    const actions = document.createElement("div");
    actions.className = "spotlight-actions";

    const cta = document.createElement("a");
    cta.className = "spotlight-cta";
    cta.href = detailUrl;
    cta.textContent = "View Project";

    const launchIcon = document.createElement("a");
    launchIcon.className = "spotlight-inspect";
    launchIcon.href = project.pagesUrl;
    launchIcon.target = "_blank";
    launchIcon.rel = "noopener noreferrer";
    launchIcon.setAttribute("aria-label", `Open ${title} live app`);
    launchIcon.title = "Open live app";
    launchIcon.appendChild(createSvgIcon("M5.5 14.5 14.5 5.5m0 0H7.5m7 0v7"));

    actions.append(cta, launchIcon);
    body.append(h3, p, actions);
    card.append(media, topPills, body, createCardBubbles(8));
    spotlightGridEl.appendChild(card);
  });
}

/* =========================================================
   CATALOG GRID (TILTED CARDS + SEARCH)
   ========================================================= */
function createPreviewElement(project) {
  const title = project.title || formatTitle(project.name);
  const category = project.category || "Web App";
  const preview = document.createElement("div");
  preview.className = "card-preview";

  const badges = document.createElement("div");
  badges.className = "preview-badges";

  const categoryTag = document.createElement("span");
  categoryTag.className = "preview-category";
  categoryTag.dataset.category = category.toLowerCase();
  categoryTag.textContent = category;
  badges.appendChild(categoryTag);

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
    img.loading = "lazy";
    img.addEventListener("error", showFallback, { once: true });
    preview.append(img, badges);
  } else {
    showFallback();
  }

  return preview;
}

function renderProjects(filterText = searchInput ? searchInput.value : "") {
  if (!gridEl) return;
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

  filtered.forEach((project) => {
    const title = project.title || formatTitle(project.name);
    const card = document.createElement("article");
    card.className = "card";

    const preview = createPreviewElement(project);

    const header = document.createElement("header");
    header.className = "card-header";

    const heading = document.createElement("h3");
    const link = document.createElement("a");
    link.className = "card-link";
    link.href = getProjectPageUrl(project);
    link.textContent = title;
    heading.appendChild(link);
    header.appendChild(heading);

    const desc = document.createElement("p");
    desc.className = "card-desc";
    desc.textContent = project.description || "Hosted on GitHub Pages.";

    const footer = document.createElement("footer");
    footer.className = "card-footer";

    const viewLabel = document.createElement("span");
    viewLabel.className = "try-it-label";
    viewLabel.setAttribute("aria-hidden", "true");
    viewLabel.textContent = "View Project →";

    const rightMeta = document.createElement("div");
    rightMeta.className = "card-meta-right";

    if (project.language) {
      const langTag = document.createElement("span");
      langTag.className = "tag";
      langTag.textContent = project.language;
      rightMeta.appendChild(langTag);
    }

    if (project.repoUrl) {
      const repoLink = document.createElement("a");
      repoLink.className = "repo-link";
      repoLink.href = project.repoUrl;
      repoLink.target = "_blank";
      repoLink.rel = "noopener noreferrer";
      repoLink.textContent = "Source";
      repoLink.setAttribute(
        "aria-label",
        `View ${title} source on GitHub`
      );
      rightMeta.appendChild(repoLink);
    }

    footer.append(viewLabel, rightMeta);
    card.append(preview, header, desc, footer, createCardBubbles(7));
    gridEl.appendChild(card);
  });

  if (emptyEl) emptyEl.hidden = filtered.length > 0;
  if (statusEl) {
    const total = allProjects.length;
    statusEl.textContent =
      query || activeCategory !== "all"
        ? `${filtered.length} of ${total} projects`
        : `${total} ${total === 1 ? "project" : "projects"}`;
  }
}

/* =========================================================
   EVENT LISTENERS & INIT
   ========================================================= */
if (heroPrevBtn) {
  heroPrevBtn.addEventListener("click", () => {
    heroIndex -= 1;
    updateHeroSlide();
  });
}

if (heroNextBtn) {
  heroNextBtn.addEventListener("click", () => {
    heroIndex += 1;
    updateHeroSlide();
  });
}

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    renderProjects(event.target.value);
  });
}

if (filterPillsEl) {
  filterPillsEl.addEventListener("click", (event) => {
    const btn = event.target.closest(".filter-pill");
    if (!btn) return;
    activeCategory = btn.dataset.filter || "all";
    for (const pill of filterPillsEl.querySelectorAll(".filter-pill")) {
      const isSelected = pill === btn;
      pill.classList.toggle("is-active", isSelected);
      pill.setAttribute("aria-pressed", String(isSelected));
    }
    renderProjects(searchInput ? searchInput.value : "");
  });
}

document.addEventListener("keydown", (event) => {
  if (
    event.key === "/" &&
    document.activeElement !== searchInput &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.altKey
  ) {
    event.preventDefault();
    if (searchInput) {
      searchInput.focus();
    } else {
      window.location.href = "projects.html#search-input";
    }
  }
});

async function init() {
  renderHeroDots(getFeaturedProjects().length);
  updateHeroSlide();
  preloadFeaturedPreviews();
  renderSpotlight();
  renderProjects();

  if (window.location.hash === "#search-input" && searchInput) {
    searchInput.focus();
  }

  const newEntries = await fetchNewGitHubProjects(allProjects);
  if (newEntries.length > 0) {
    allProjects = [...allProjects, ...newEntries];
    renderHeroDots(getFeaturedProjects().length);
    updateHeroSlide();
    renderSpotlight();
    renderProjects();
  }
}

init();
