#!/usr/bin/env python3
"""Génère sitemap.xml et pages prestations statiques (SEO)."""
from __future__ import annotations

import json
import re
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SITE_URL = "https://many-vtc.fr"
TODAY = date.today().isoformat()

STATIC_PAGES = [
    ("/", "weekly", "1.0"),
    ("/realisations", "weekly", "0.9"),
    ("/savoir-faire", "monthly", "0.8"),
    ("/atelier", "monthly", "0.8"),
    ("/processus", "monthly", "0.8"),
    ("/contact", "monthly", "0.9"),
    ("/mentions-legales", "yearly", "0.3"),
    ("/politique-confidentialite", "yearly", "0.3"),
]

HEAD_PARTIAL = """  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="canonical" href="{canonical}">
  <meta name="robots" content="index, follow">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:site_name" content="Many VTC">
  <meta property="og:title" content="{og_title}">
  <meta property="og:description" content="{og_desc}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="{og_image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{og_title}">
  <meta name="twitter:description" content="{og_desc}">
  <meta name="twitter:image" content="{og_image}">
"""


def resolve_image(url: str) -> str:
    if url.startswith("assets/"):
        return f"/{url}"
    return url


def resolve_image_absolute(url: str) -> str:
    if url.startswith("http"):
        return url
    if url.startswith("/"):
        return f"{SITE_URL}{url}"
    return f"{SITE_URL}/{url}"


def load_projects() -> list[dict]:
    data_js = (ROOT / "js" / "data.js").read_text(encoding="utf-8")
    header, projects_src = data_js.split("const PROJECTS =", 1)
    categories = dict(re.findall(r"(\w+):\s*\"([^\"]+)\"", header))
    images = dict(re.findall(r'(\w+):\s*"(https://[^"]+|assets/[^"]+)"', header))

    projects = []
    chunks = re.split(r"\n  \{", projects_src)
    for chunk in chunks[1:]:
        slug = re.search(r'slug:\s*"([^"]+)"', chunk)
        titre = re.search(r'titre:\s*"([^"]+)"', chunk)
        cat_key = re.search(r'categorie:\s*"([^"]+)"', chunk)
        annee = re.search(r"annee:\s*(\d+)", chunk)
        lieu = re.search(r'lieu:\s*"([^"]+)"', chunk)
        type_client = re.search(r'type_client:\s*"([^"]+)"', chunk)
        surface = re.search(r'surface:\s*"([^"]+)"', chunk)
        img_key = re.search(r"image:\s*IMAGES\.(\w+)", chunk)
        desc_short = re.search(
            r"description_courte:\s*(?:\n\s*)?\"([^\"]+)\"",
            chunk,
            re.DOTALL,
        )
        desc_block = re.search(r"description:\s*\[(.*?)\]", chunk, re.DOTALL)
        mat_block = re.search(r"materiaux:\s*\[(.*?)\]", chunk, re.DOTALL)
        if not slug:
            continue
        projects.append(
            {
                "slug": slug.group(1),
                "titre": titre.group(1) if titre else slug.group(1),
                "categorie": categories.get(
                    cat_key.group(1) if cat_key else "", cat_key.group(1) if cat_key else ""
                ),
                "annee": annee.group(1) if annee else "",
                "lieu": lieu.group(1) if lieu else "Narbonne",
                "type_client": type_client.group(1) if type_client else "",
                "surface": surface.group(1) if surface else "",
                "image": resolve_image(
                    images.get(
                        img_key.group(1) if img_key else "fallback",
                        images.get("fallback", ""),
                    )
                ),
                "description_courte": desc_short.group(1) if desc_short else "",
                "description": re.findall(r'"([^"]+)"', desc_block.group(1)) if desc_block else [],
                "materiaux": re.findall(r'"([^"]+)"', mat_block.group(1)) if mat_block else [],
            }
        )
    return projects


def esc(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def nav_footer() -> str:
    return """
  <header class="nav nav--inner" id="site-nav">
    <div class="container nav__inner">
      <a href="/" class="logo" aria-label="Many VTC, accueil">Many VTC</a>
      <nav aria-label="Navigation principale">
        <ul class="nav__links">
          <li><a href="/realisations">Prestations</a></li>
          <li><a href="/savoir-faire">Services</a></li>
          <li><a href="/atelier">Many VTC</a></li>
          <li><a href="/processus">Réservation</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <a href="/contact" class="btn btn--outline nav__cta">Réserver un trajet</a>
    </div>
  </header>
"""


def render_prestation(project: dict, all_projects: list[dict]) -> str:
    idx = next(i for i, p in enumerate(all_projects) if p["slug"] == project["slug"])
    prev_p = all_projects[(idx - 1) % len(all_projects)]
    next_p = all_projects[(idx + 1) % len(all_projects)]
    canonical = f"{SITE_URL}/realisations/{project['slug']}"
    title = f"{project['titre']}, {project['categorie']} | Many VTC Narbonne"
    desc = project["description_courte"]
    body = "".join(f"<p>{esc(p)}</p>" for p in project["description"])
    tags = "".join(f'<span class="material-tag">{esc(m)}</span>' for m in project["materiaux"])
    schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": project["titre"],
        "description": project["description_courte"],
        "provider": {"@type": "TaxiService", "name": "Many VTC", "telephone": "+33768146015"},
        "areaServed": project["lieu"],
        "url": canonical,
    }

    return f"""<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(desc)}">
{HEAD_PARTIAL.format(canonical=canonical, og_title=esc(title), og_desc=esc(desc), og_image=resolve_image_absolute(project['image']))}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700&family=Outfit:wght@700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
  <script type="application/ld+json">{json.dumps(schema, ensure_ascii=False)}</script>
  <script>
    window.va = window.va || function () {{ (window.vaq = window.vaq || []).push(arguments); }};
  </script>
  <script defer src="/_vercel/insights/script.js"></script>
</head>
<body class="page-projet">
  <a class="skip-link" href="#main">Aller au contenu</a>
{nav_footer()}
<main id="main">
  <section class="project-hero">
    <img src="{project['image']}" alt="{esc(project['titre'])}, {esc(project['categorie'])} — Many VTC {esc(project['lieu'])}">
  </section>
  <div class="container section section--tight">
    <nav class="breadcrumb" aria-label="Fil d'Ariane">
      <a href="/realisations">Prestations</a>
      <span aria-hidden="true">/</span>
      <span>{esc(project['categorie'])}</span>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{esc(project['titre'])}</span>
    </nav>
    <div class="overline">{esc(project['categorie'])}</div>
    <h1 class="h1">{esc(project['titre'])}</h1>
    <p class="lead project-lead">{esc(project['description_courte'])}</p>
    <div class="project-meta">
      <span>{project['annee']}</span>
      <span>{esc(project['lieu'])}</span>
      <span>{esc(project['surface'])}</span>
      <span>{esc(project['type_client'])}</span>
    </div>
    <div class="project-body">{body}</div>
    <div class="materials">
      <p class="materials__label">Inclus</p>
      {tags}
    </div>
    <div class="project-nav">
      <a href="/realisations/{prev_p['slug']}" class="btn--text">← {esc(prev_p['titre'])}</a>
      <a href="/contact" class="btn btn--primary">Réserver ce type de trajet</a>
      <a href="/realisations/{next_p['slug']}" class="btn--text">{esc(next_p['titre'])} →</a>
    </div>
  </div>
  <section class="cta-banner">
    <div class="container">
      <h2>Besoin d'un trajet similaire ?</h2>
      <div class="cta-banner__actions">
        <a href="/contact" class="btn btn--primary">Réserver un trajet</a>
        <a href="/realisations" class="btn btn--outline">Toutes les prestations</a>
      </div>
    </div>
  </section>
</main>
  <script src="/js/seo-config.js"></script>
  <script src="/js/seo.js"></script>
  <script src="/js/data.js"></script>
  <script src="/js/app.js"></script>
</body>
</html>
"""


def write_sitemap(projects: list[dict]) -> None:
    urls = []
    for path, freq, priority in STATIC_PAGES:
        urls.append(
            f"  <url><loc>{SITE_URL}{path if path != '/' else '/'}</loc>"
            f"<lastmod>{TODAY}</lastmod><changefreq>{freq}</changefreq>"
            f"<priority>{priority}</priority></url>"
        )
    for p in projects:
        urls.append(
            f"  <url><loc>{SITE_URL}/realisations/{p['slug']}</loc>"
            f"<lastmod>{TODAY}</lastmod><changefreq>monthly</changefreq>"
            f"<priority>0.7</priority></url>"
        )
    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(urls)
        + "\n</urlset>\n"
    )
    (ROOT / "sitemap.xml").write_text(xml, encoding="utf-8")


def inject_head_into_pages() -> None:
    pages = {
        "index.html": ("/", "Many VTC, Chauffeur Privé à Narbonne & Alentours",
                       "Many VTC, chauffeur privé à Narbonne. Courses locales, transferts gare et aéroport, mise à disposition. Disponible 7j/7. 07 68 14 60 15."),
        "realisations.html": ("/realisations", "Prestations VTC | Many VTC Narbonne",
                              "Prestations Many VTC : courses locales, transferts gare et aéroport, longue distance, mise à disposition à Narbonne."),
        "savoir-faire.html": ("/savoir-faire", "Services VTC, Many VTC Narbonne",
                              "Courses locales, transferts, longue distance et mise à disposition. Service VTC complet à Narbonne et alentours."),
        "atelier.html": ("/atelier", "Many VTC, Chauffeur Privé à Narbonne",
                         "Many VTC, chauffeur privé basé à Narbonne. Disponible 7j/7 pour vos déplacements dans l'Aude et alentours."),
        "processus.html": ("/processus", "Réservation VTC, Many VTC Narbonne",
                           "Comment réserver votre chauffeur VTC Many : contact, devis, prise en charge et arrivée. Simple et rapide, 7j/7."),
        "contact.html": ("/contact", "Contact & Réservation, Many VTC Narbonne",
                         "Réservez votre chauffeur VTC Many à Narbonne. 07 68 14 60 15 · vtcmany@gmail.com · Disponible 7j/7."),
        "mentions-legales.html": ("/mentions-legales", "Mentions légales, Many VTC",
                                  "Mentions légales du site Many VTC, chauffeur privé à Narbonne."),
        "politique-confidentialite.html": ("/politique-confidentialite", "Politique de confidentialité, Many VTC",
                                          "Politique de confidentialité et traitement des données personnelles, Many VTC."),
        "projet.html": ("/projet", "Prestation VTC, Many VTC Narbonne",
                        "Détail d'une prestation Many VTC, chauffeur privé à Narbonne et alentours."),
    }
    og_image = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80"
    local_business = {
        "@context": "https://schema.org",
        "@type": "TaxiService",
        "@id": f"{SITE_URL}/#organization",
        "name": "Many VTC",
        "description": "Chauffeur privé VTC à Narbonne et alentours. Disponible 7j/7.",
        "url": SITE_URL,
        "telephone": "+33768146015",
        "email": "vtcmany@gmail.com",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Narbonne",
            "postalCode": "11100",
            "addressCountry": "FR",
        },
        "areaServed": ["Narbonne", "Aude", "Gruissan", "Béziers", "Perpignan", "Montpellier"],
        "openingHours": "Mo-Su 00:00-23:59",
    }

    for filename, (path, og_title, og_desc) in pages.items():
        fp = ROOT / filename
        if not fp.exists():
            continue
        content = fp.read_text(encoding="utf-8")
        canonical = f"{SITE_URL}{path}"
        block = HEAD_PARTIAL.format(
            canonical=canonical, og_title=og_title, og_desc=og_desc, og_image=og_image
        )
        if 'rel="canonical"' in content and 'src="js/seo-config.js"' in content:
            continue
        insert = block
        if 'rel="icon"' not in content:
            insert = f'  <link rel="icon" href="/favicon.svg" type="image/svg+xml">\n{insert}'
        if 'rel="canonical"' not in content:
            content = content.replace(
                '  <link rel="stylesheet" href="css/style.css">',
                f'{insert}  <link rel="stylesheet" href="css/style.css">',
                1,
            )
        if filename == "index.html" and "schema-local-business-static" not in content:
            schema = (
                f'  <script type="application/ld+json" id="schema-local-business-static">'
                f"{json.dumps(local_business, ensure_ascii=False)}</script>\n"
            )
            content = content.replace("</head>", schema + "</head>")
        if 'src="js/seo-config.js"' not in content:
            content = content.replace(
                '  <script src="js/data.js"></script>',
                '  <script src="js/seo-config.js"></script>\n  <script src="js/seo.js"></script>\n  <script src="js/data.js"></script>',
            )
        fp.write_text(content, encoding="utf-8")


def main() -> None:
    projects = load_projects()
    out_dir = ROOT / "realisations"
    out_dir.mkdir(exist_ok=True)
    for project in projects:
        html = render_prestation(project, projects)
        (out_dir / f"{project['slug']}.html").write_text(html, encoding="utf-8")
        print(f"  OK realisations/{project['slug']}.html")
    write_sitemap(projects)
    print("  OK sitemap.xml")
    inject_head_into_pages()
    print("  OK balises SEO injectees dans les pages principales")
    print(f"\n{len(projects)} prestations · sitemap à {SITE_URL}/sitemap.xml")


if __name__ == "__main__":
    main()
