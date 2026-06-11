#!/usr/bin/env python3
"""Serveur statique local avec URLs propres (compatible vercel.json cleanUrls)."""
from __future__ import annotations

import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent
PORT = int(os.environ.get("PORT", "8000"))

CLEAN_PAGES: dict[str, str] = {
    "": "index.html",
    "index": "index.html",
    "savoir-faire": "savoir-faire.html",
    "realisations": "realisations.html",
    "contact": "contact.html",
    "atelier": "atelier.html",
    "processus": "processus.html",
    "projet": "projet.html",
    "mentions-legales": "mentions-legales.html",
    "politique-confidentialite": "politique-confidentialite.html",
}


class CleanURLHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def translate_path(self, path: str) -> str:
        parsed = urlparse(path)
        slug = unquote(parsed.path).strip("/")
        if slug.endswith(".html"):
            slug = slug[:-5]
        parts = slug.split("/") if slug else []
        if len(parts) == 2 and parts[0] == "realisations" and parts[1] not in CLEAN_PAGES:
            static = ROOT / "realisations" / f"{parts[1]}.html"
            path = f"/realisations/{parts[1]}.html" if static.is_file() else "/projet.html"
        elif slug in CLEAN_PAGES:
            path = "/" + CLEAN_PAGES[slug]
        return super().translate_path(path)

    def log_message(self, format: str, *args) -> None:  # noqa: A003
        print(f"[{self.log_date_time_string()}] {format % args}")


def main() -> None:
    server = ThreadingHTTPServer(("", PORT), CleanURLHandler)
    print(f"Many VTC — http://localhost:{PORT}")
    print("URLs : /savoir-faire ou /savoir-faire.html")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nArrêt du serveur.")
        server.server_close()


if __name__ == "__main__":
    main()
