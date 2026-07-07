# VTC MANY — Next.js 14

Site vitrine **VTC MANY** (MANY CARS), chauffeur privé à Narbonne.

**Stack :** Next.js 14 · App Router · Tailwind CSS · GSAP · i18n `/fr` `/en` `/es`

## Développement

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000/fr](http://localhost:3000/fr)

## Déploiement Vercel

1. Importer le dossier `many-vtc-web` sur Vercel
2. Variable d'environnement optionnelle : `NEXT_PUBLIC_SITE_URL=https://www.vtcmany.fr`
3. Domaine : `www.vtcmany.fr`

## Structure

| Route | Page |
|-------|------|
| `/fr` | Accueil (FR) |
| `/en` | Home (EN) |
| `/es` | Inicio (ES) |
| `/{locale}/services` | Services |
| `/{locale}/contact` | Contact + formulaire |

## Notes

- Pas de section tarifs (sur devis uniquement)
- Vocabulaire réglementaire : VTC / chauffeur privé — jamais « taxi »
- Formulaire contact : API `/api/contact` via MailerSend (variables `MAILERSEND_*` sur Vercel)
