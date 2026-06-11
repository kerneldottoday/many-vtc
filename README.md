# Copie site — adaptation autre service

Copie autonome du site BOIS DESIGN, prête à être ouverte dans une **nouvelle fenêtre Cursor** et adaptée à un autre client / service.

## Ouvrir dans Cursor

1. **Fichier → Ouvrir le dossier…**
2. Sélectionner ce dossier : `copie-adaptation`
3. Vous travaillez dans un projet isolé, sans toucher au site d’origine (`prototype/`).

## Lancer en local (localhost)

**Option A — PowerShell (recommandé)**

```powershell
.\start-local.ps1
```

**Option B — Python direct**

```powershell
python dev-server.py
```

**Option C — Double-clic**

Double-cliquer sur `start-local.bat`

Puis ouvrir dans le navigateur :

**http://localhost:8000**

URLs propres supportées : `/savoir-faire`, `/realisations`, `/contact`, `/realisations/nom-du-projet`, etc.

## Fichiers à modifier pour l’adaptation

| Fichier | Rôle |
|---------|------|
| `js/data.js` | Projets, textes CMS |
| `js/app.js` | Comportements (nav, lightbox, formulaire) |
| `css/style.css` | Charte graphique |
| `apply-layout.py` | Header / footer commun (puis `python apply-layout.py`) |
| `*.html` | Contenu des pages |
| `partials/site-footer.html` | Pied de page |
| `assets/` | Logos et visuels |

## Déploiement Vercel (optionnel)

1. Créer un nouveau projet Vercel pointant vers ce dossier
2. Le `vercel.json` inclus est déjà configuré (`outputDirectory: "."`)

## Prérequis

- Python 3 installé (`python --version`)
- Windows : PowerShell pour `start-local.ps1`
