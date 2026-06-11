#!/usr/bin/env python3
"""Applique le header/footer unifiés sur toutes les pages HTML."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent

HEADER_HOME = """  <a class="skip-link" href="#main">Aller au contenu</a>

  <header class="nav nav--hero" id="site-nav">
    <div class="container nav__inner">
      <a href="/" class="logo" aria-label="BOIS DESIGN, accueil">BOIS DESIGN</a>
      <nav aria-label="Navigation principale">
        <ul class="nav__links">
          <li><a href="/realisations">Réalisations</a></li>
          <li><a href="/savoir-faire">Savoir-faire</a></li>
          <li><a href="/atelier">Atelier</a></li>
          <li><a href="/processus">Processus</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <a href="/contact" class="btn btn--outline nav__cta">Demander un devis</a>
      <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Ouvrir le menu">
        <span class="menu-toggle__bars" aria-hidden="true">
          <span class="menu-toggle__bar"></span>
          <span class="menu-toggle__bar"></span>
        </span>
      </button>
    </div>
  </header>

  <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
    <button type="button" class="mobile-menu__backdrop" aria-label="Fermer le menu" tabindex="-1"></button>
    <aside class="mobile-menu__panel" aria-label="Menu mobile">
      <p class="mobile-menu__label">Navigation</p>
      <nav class="mobile-menu__nav" aria-label="Liens du menu">
        <a href="/realisations">Réalisations</a>
        <a href="/savoir-faire">Savoir-faire</a>
        <a href="/atelier">Atelier</a>
        <a href="/processus">Processus</a>
        <a href="/contact">Contact</a>
      </nav>
      <div class="mobile-menu__footer">
        <a href="/contact" class="btn btn--primary mobile-menu__cta">Demander un devis</a>
        <a href="tel:+33468454340" class="mobile-menu__phone">04 68 45 43 40</a>
      </div>
    </aside>
  </div>"""

HEADER_INNER = HEADER_HOME.replace('class="nav nav--hero"', 'class="nav nav--inner"')

LEGAL_PAGES = {"mentions-legales.html", "politique-confidentialite.html"}

FOOTER_SHELL = (ROOT / "partials" / "site-footer.html").read_text(encoding="utf-8")
FOOTER = f"""
{FOOTER_SHELL}
  <script src="js/data.js"></script>
  <script src="js/app.js"></script>
</body>
</html>"""

BODY_CLASS = {
    "index.html": "page-home",
    "realisations.html": "page-realisations",
    "savoir-faire.html": "page-savoir-faire",
    "atelier.html": "page-atelier",
    "processus.html": "page-processus",
    "contact.html": "page-contact",
    "projet.html": "page-projet",
    "mentions-legales.html": "page-legal",
    "politique-confidentialite.html": "page-legal",
}


def extract_main(html: str) -> str:
    match = re.search(r"<main[^>]*>(.*?)</main>", html, re.DOTALL | re.IGNORECASE)
    if not match:
        raise ValueError("Balise <main> introuvable")
    return f"<main id=\"main\">{match.group(1)}</main>"


def extract_head(html: str) -> str:
    match = re.search(r"(<!DOCTYPE.*?</head>)", html, re.DOTALL | re.IGNORECASE)
    if not match:
        raise ValueError("<head> introuvable")
    return match.group(1)


def apply_file(path: Path) -> None:
    html = path.read_text(encoding="utf-8")
    head = extract_head(html)
    main = extract_main(html)
    body_class = BODY_CLASS.get(path.name, "page-inner")
    header = HEADER_INNER if path.name in LEGAL_PAGES else HEADER_HOME
    rebuilt = f"{head}\n<body class=\"{body_class}\">\n{header}\n\n{main}\n{FOOTER}\n"
    path.write_text(rebuilt, encoding="utf-8")
    print(f"OK {path.name}")


def main() -> None:
    for name in BODY_CLASS:
        apply_file(ROOT / name)


if __name__ == "__main__":
    main()
