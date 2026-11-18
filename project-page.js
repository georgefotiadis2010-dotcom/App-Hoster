const projectHeroEl = document.getElementById("project-hero");
const projectBgImg = document.getElementById("project-bg-img");
const projectCategory = document.getElementById("project-category");
const projectTitle = document.getElementById("project-title");
const projectDesc = document.getElementById("project-desc");
const projectLaunch = document.getElementById("project-launch");
const projectRepo = document.getElementById("project-repo");
const projectMediaFrame = document.getElementById("project-media-frame");
const projectPreviewImg = document.getElementById("project-preview-img");
const projectMeta = document.getElementById("project-meta");
const moreGridEl = document.getElementById("more-projects-grid");

let allProjects = [...KNOWN_PROJECTS];

function getRequestedId() {
  const params = new URLSearchParams(window.location.search);
  return (params.get("id") || "").trim();
}

function findProject(id) {
  if (!id) return allProjects[0];
  const lower = id.toLowerCase();
  return (
    allProjects.find((p) => p.name.toLowerCase() === lower) ||
    allProjects[0]
  );
}

function renderDetail(project) {
  const index = Math.max(0, allProjects.indexOf(project));
  const [tintA, tintB] = HERO_PALETTES[index % HERO_PALETTES.length];
  const title = project.title || formatTitle(project.name);

  document.title = `${title} — George's Project Catalog`;
  projectHeroEl.style.setProperty("--hero-tint-a", tintA);
  projectHeroEl.style.setProperty("--hero-tint-b", tintB);

  projectCategory.textContent = project.category || "Web App";
  projectTitle.textContent = title;
  projectDesc.textContent = project.description || "Hosted web application.";
  projectLaunch.href = project.pagesUrl;

  if (project.repoUrl) {
    projectRepo.href = project.repoUrl;
    projectRepo.hidden = false;
  } else {
    projectRepo.hidden = true;
  }

  if (project.preview) {
    projectBgImg.src = project.preview;
    projectBgImg.hidden = false;
    projectPreviewImg.src = project.preview;
    projectPreviewImg.alt = `${title} screenshot`;
    projectPreviewImg.hidden = false;
  } else {
    projectBgImg.hidden = true;
    const fallback = document.createElement("div");
    fallback.className = "preview-fallback";
    fallback.textContent = title;
    projectMediaFrame.replaceChildren(fallback);
  }

  const specs = [
    { label: "Category", value: project.category || "Web App" },
    project.language ? { label: "Language", value: project.language } : null,
    formatDate(project.updatedAt)
      ? { label: "Updated", value: formatDate(project.updatedAt) }
      : null,
    formatHost(project.pagesUrl)
      ? { label: "Host", value: formatHost(project.pagesUrl) }
      : null,
  ].filter(Boolean);

  projectMeta.replaceChildren(
    ...specs.map((spec) => {
      const chip = document.createElement("div");
      chip.className = "spec-chip";
      const k = document.createElement("span");
      k.className = "spec-label";
      k.textContent = spec.label;
      const v = document.createElement("span");
      v.className = "spec-value";
      v.textContent = spec.value;
      chip.append(k, v);
      return chip;
    })
  );
}

function renderMoreProjects(current) {
  const others = allProjects.filter((p) => p !== current).slice(0, 3);
  moreGridEl.replaceChildren();

  others.forEach((project) => {
    const title = project.title || formatTitle(project.name);
    const category = project.category || "Web App";
    const card = document.createElement("article");
    card.className = "card";

    const preview = document.createElement("div");
    preview.className = "card-preview";
    const badges = document.createElement("div");
    badges.className = "preview-badges";
    const categoryTag = document.createElement("span");
    categoryTag.className = "preview-category";
    categoryTag.dataset.category = category.toLowerCase();
    categoryTag.textContent = category;
    badges.appendChild(categoryTag);

    if (project.preview) {
      const img = document.createElement("img");
      img.src = project.preview;
      img.alt = `${title} preview`;
      img.width = 1280;
      img.height = 800;
      img.loading = "lazy";
      preview.append(img, badges);
    } else {
      const fallback = document.createElement("div");
      fallback.className = "preview-fallback";
      fallback.textContent = title;
      preview.append(fallback, badges);
    }

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
    desc.textContent = project.description || "Hosted web application.";

    const footer = document.createElement("footer");
    footer.className = "card-footer";
    const label = document.createElement("span");
    label.className = "try-it-label";
    label.setAttribute("aria-hidden", "true");
    label.textContent = "View Project →";
    footer.appendChild(label);

    card.append(preview, header, desc, footer);
    moreGridEl.appendChild(card);
  });
}

document.addEventListener("keydown", (event) => {
  if (
    event.key === "/" &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.altKey
  ) {
    event.preventDefault();
    window.location.href = "projects.html#search-input";
  }
});

async function initProjectPage() {
  const initial = findProject(getRequestedId());
  renderDetail(initial);
  renderMoreProjects(initial);

  const newEntries = await fetchNewGitHubProjects(allProjects);
  if (newEntries.length > 0) {
    allProjects = [...allProjects, ...newEntries];
    const resolved = findProject(getRequestedId());
    renderDetail(resolved);
    renderMoreProjects(resolved);
  }
}

initProjectPage();
