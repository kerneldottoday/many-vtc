function pageSlug() {
  const part = (location.pathname.split("/").pop() || "").replace(/\.html$/, "");
  if (!part || part === "index") return "home";
  return part;
}

function navHrefSlug(href) {
  if (!href || href.startsWith("tel:") || href.startsWith("#")) return null;
  const clean = href.replace(/^\//, "").replace(/\.html$/, "");
  if (!clean || clean === "index") return "home";
  return clean;
}

function initNav() {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const isHero = nav?.classList.contains("nav--hero");

  if (nav) {
    const syncScroll = () => {
      const scrolled = !isHero || window.scrollY > 48;
      nav.classList.toggle("scrolled", scrolled);
    };
    syncScroll();
    window.addEventListener("scroll", syncScroll, { passive: true });
  }

  const current = pageSlug();
  document.querySelectorAll(".nav__links a, .mobile-menu__nav a").forEach((link) => {
    const slug = navHrefSlug(link.getAttribute("href"));
    if (slug && slug === current) link.classList.add("active");
  });

  if (!toggle || !mobileMenu) return;

  const backdrop = mobileMenu.querySelector(".mobile-menu__backdrop");

  const setMenuOpen = (open) => {
    toggle.classList.toggle("open", open);
    mobileMenu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.classList.toggle("menu-open", open);
  };

  toggle.addEventListener("click", () => {
    setMenuOpen(!mobileMenu.classList.contains("open"));
  });

  backdrop?.addEventListener("click", () => setMenuOpen(false));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
      setMenuOpen(false);
    }
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach((el) => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => observer.observe(el));
}

function initStickyCta() {
  const bar = document.querySelector(".sticky-cta");
  if (!bar || bar.classList.contains("sticky-cta--always")) return;
  const show = () => {
    bar.classList.toggle("visible", window.scrollY > window.innerHeight * 0.45);
  };
  show();
  window.addEventListener("scroll", show, { passive: true });
}

function initShowcaseNotice() {
  if (sessionStorage.getItem("showcase-notice-dismissed")) return;
  const notice = document.createElement("div");
  notice.className = "showcase-notice";
  notice.setAttribute("role", "status");
  notice.innerHTML =
    '<span>Maquette Many VTC, visuels de démonstration</span><button type="button" aria-label="Fermer">×</button>';
  document.body.appendChild(notice);
  notice.querySelector("button").addEventListener("click", () => {
    notice.hidden = true;
    sessionStorage.setItem("showcase-notice-dismissed", "1");
  });
}

function imageFallbackAttr() {
  return `onerror="this.onerror=null;this.src='${IMAGES.fallback}'"`;
}

function initImageFallbacks() {
  document.querySelectorAll("img").forEach((img) => {
    if (img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = "true";
    if (!img.getAttribute("alt")) img.setAttribute("alt", "");
    img.addEventListener("error", () => {
      if (img.src !== IMAGES.fallback) img.src = IMAGES.fallback;
    });
  });
}

function projectUrl(slug) {
  return `/realisations/${slug}`;
}

function getProjectSlugFromUrl() {
  const fromQuery = new URLSearchParams(location.search).get("slug");
  if (fromQuery) return fromQuery;
  const parts = location.pathname.split("/").filter(Boolean);
  if (parts[0] === "realisations" && parts.length === 2) return parts[1];
  return null;
}

function renderProjectCard(project, options = {}) {
  const cat = CATEGORIES[project.categorie] || project.categorie;
  const alt = `${project.titre}, ${cat} — Many VTC Narbonne`;
  const meta = `
        <div class="project-card__cat">${cat}</div>
        <div class="project-card__title">${project.titre}</div>
        <div class="project-card__info">${project.annee} · ${project.lieu}</div>`;

  const imageMarkup = options.placeLabel
    ? `<div class="project-card__image project-card__image--place" aria-hidden="true">
        <span class="project-card__place">${project.lieu}</span>
      </div>`
    : `<div class="project-card__image">
        <img src="${project.image}" alt="${alt}" loading="lazy" ${imageFallbackAttr()}>
      </div>`;

  if (options.lightboxImage) {
    return `
    <article class="project-card reveal">
      <button type="button" class="project-card__image project-card__zoom" aria-label="Agrandir ${project.titre}">
        <img src="${project.image}" alt="${alt}" loading="lazy" ${imageFallbackAttr()}>
      </button>
      <a href="${projectUrl(project.slug)}" class="project-card__meta">
        ${meta}
      </a>
    </article>`;
  }

  return `
    <a href="${projectUrl(project.slug)}" class="project-card reveal">
      ${imageMarkup}
      <div class="project-card__meta">
        ${meta}
      </div>
    </a>`;
}

function initImageLightbox() {
  let lightbox = document.getElementById("image-lightbox");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "image-lightbox";
    lightbox.className = "image-lightbox";
    lightbox.hidden = true;
    lightbox.innerHTML = `
      <button type="button" class="image-lightbox__backdrop" aria-label="Fermer"></button>
      <figure class="image-lightbox__figure">
        <button type="button" class="image-lightbox__close" aria-label="Fermer">×</button>
        <img class="image-lightbox__img" alt="">
      </figure>`;
    document.body.appendChild(lightbox);

    const close = () => {
      lightbox.hidden = true;
      document.body.classList.remove("lightbox-open");
      lightbox.querySelector(".image-lightbox__img").removeAttribute("src");
    };

    lightbox.querySelector(".image-lightbox__close").addEventListener("click", close);
    lightbox.querySelector(".image-lightbox__backdrop").addEventListener("click", close);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lightbox.hidden) close();
    });
  }

  return (src, alt) => {
    const img = lightbox.querySelector(".image-lightbox__img");
    img.src = src;
    img.alt = alt || "";
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    lightbox.querySelector(".image-lightbox__close").focus();
  };
}

function initHomeProjects() {
  const grid = document.getElementById("featured-projects");
  if (!grid) return;
  const featured = PROJECTS.filter((p) => p.featured);
  grid.innerHTML = featured.map((project) => renderProjectCard(project)).join("");
  initReveal();
}

function initRealisationsPage() {
  const grid = document.getElementById("all-projects");
  const filters = document.getElementById("filters");
  if (!grid) return;

  const openLightbox = initImageLightbox();
  let active = "all";

  function render(filter) {
    const list =
      filter === "all"
        ? PROJECTS
        : PROJECTS.filter((p) => p.categorie === filter);
    grid.innerHTML = list.map((p) => renderProjectCard(p, { lightboxImage: true })).join("");
    initReveal();
    initImageFallbacks();
  }

  if (!grid.dataset.lightboxBound) {
    grid.dataset.lightboxBound = "1";
    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".project-card__zoom");
      if (!btn) return;
      const img = btn.querySelector("img");
      if (img) openLightbox(img.src, img.alt);
    });
  }

  if (filters) {
    filters.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filters.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      active = btn.dataset.filter;
      render(active);
    });
  }

  render(active);
}

function initProjectDetail() {
  const container = document.getElementById("project-content");
  if (!container) return;

  const slug = getProjectSlugFromUrl();
  if (!slug) {
    if (document.body.classList.contains("page-projet")) {
      container.innerHTML = `
        <section class="section page-content">
          <div class="container">
            <h1 class="h1">Prestations</h1>
            <p class="lead">Sélectionnez une prestation depuis la <a href="/realisations">liste des prestations</a>.</p>
          </div>
        </section>`;
    }
    return;
  }

  const project = getProject(slug);

  if (!project) {
    document.title = "Prestation introuvable, Many VTC";
    container.innerHTML = `
      <section class="section page-content">
        <div class="container">
          <nav class="breadcrumb" aria-label="Fil d'Ariane">
            <a href="/realisations">Prestations</a>
          </nav>
          <h1 class="h1">Prestation introuvable</h1>
          <p class="lead">Cette prestation n'existe pas ou n'est plus disponible.</p>
          <a href="/realisations" class="btn btn--primary">Voir toutes les prestations</a>
        </div>
      </section>`;
    return;
  }

  if (location.search.includes("slug=")) {
    history.replaceState(null, "", projectUrl(slug));
  }

  const cat = CATEGORIES[project.categorie];
  const { prev, next } = getAdjacentProjects(slug);

  document.title = `${project.titre}, ${cat} | Many VTC Narbonne`;

  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute("content", project.description_courte);
  }

  document.querySelectorAll(".nav__links a").forEach((link) => {
    if (navHrefSlug(link.getAttribute("href")) === "realisations") {
      link.classList.add("active");
    }
  });

  container.innerHTML = `
    <section class="project-hero">
      <img src="${project.image}" alt="${project.titre}, ${cat} — Many VTC ${project.lieu}" ${imageFallbackAttr()}>
    </section>
    <div class="container section section--tight">
      <nav class="breadcrumb reveal" aria-label="Fil d'Ariane">
        <a href="/realisations">Prestations</a>
        <span aria-hidden="true">/</span>
        <span>${cat}</span>
        <span aria-hidden="true">/</span>
        <span aria-current="page">${project.titre}</span>
      </nav>
      <div class="overline reveal">${cat}</div>
      <h1 class="h1 reveal">${project.titre}</h1>
      <p class="lead project-lead reveal">${project.description_courte}</p>
      <div class="project-meta reveal">
        <span>${project.annee}</span>
        <span>${project.lieu}</span>
        <span>${project.surface}</span>
        <span>${project.type_client}</span>
      </div>
      <div class="project-body reveal">
        ${project.description.map((p) => `<p>${p}</p>`).join("")}
      </div>
      <div class="materials reveal">
        <p class="materials__label">Inclus</p>
        ${project.materiaux.map((m) => `<span class="material-tag">${m}</span>`).join("")}
      </div>
      <div class="project-gallery reveal">
        ${project.galerie.map((img, i) => `<img src="${img}" alt="${project.titre}, vue ${i + 1}" loading="lazy" ${imageFallbackAttr()}>`).join("")}
      </div>
      <div class="project-nav reveal">
        <a href="${projectUrl(prev.slug)}" class="btn--text">← ${prev.titre}</a>
        <a href="/contact" class="btn btn--primary">Réserver ce type de trajet</a>
        <a href="${projectUrl(next.slug)}" class="btn--text">${next.titre} →</a>
      </div>
    </div>
    <section class="cta-banner">
      <div class="container reveal">
        <h2>Besoin d'un trajet similaire ?</h2>
        <div class="cta-banner__actions">
          <a href="/contact" class="btn btn--primary">Réserver un trajet</a>
          <a href="/realisations" class="btn btn--outline">Toutes les prestations</a>
        </div>
      </div>
    </section>
  `;

  initReveal();
  initImageFallbacks();
}

async function ensureSiteFooter() {
  const footer = document.getElementById("site-footer");
  if (footer?.querySelector(".footer__grid")) return;

  try {
    const res = await fetch("/partials/site-footer.html");
    if (!res.ok) return;
    const html = await res.text();
    document.querySelector(".sticky-cta")?.remove();
    document.querySelector("footer.footer")?.remove();
    document.body.insertAdjacentHTML("beforeend", html);
  } catch (_) {
    /* hors-ligne ou fichier manquant */
  }
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const success = document.getElementById("form-success");
  const error = document.getElementById("form-error");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      if (error) error.hidden = false;
      form.reportValidity();
      return;
    }
    if (error) error.hidden = true;
    form.style.display = "none";
    if (success) success.classList.add("visible");
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await ensureSiteFooter();
  initNav();
  initReveal();
  initStickyCta();
  initShowcaseNotice();
  initHomeProjects();
  initRealisationsPage();
  initProjectDetail();
  initContactForm();
  initImageFallbacks();
});
