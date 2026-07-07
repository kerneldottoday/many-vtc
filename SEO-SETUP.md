# SEO — Mise en place VTC MANY (vtcmany.fr)

Guide pour le propriétaire / prestataire après déploiement du site.

## 1. Google Search Console

1. Créer une propriété **Domaine** ou **Préfixe URL** : `https://www.vtcmany.fr`
2. Vérifier la propriété (DNS TXT ou fichier HTML Vercel)
3. Soumettre le sitemap : **https://www.vtcmany.fr/sitemap.xml**
4. Vérifier l’indexation des 3 locales :
   - `https://www.vtcmany.fr/fr`
   - `https://www.vtcmany.fr/en`
   - `https://www.vtcmany.fr/es`
5. Contrôler les **hreflang** (rapport Internationalisation) — chaque URL doit avoir ses alternates fr/en/es + x-default → `/fr`

## 2. Google Analytics (GA4) ou alternative

1. Créer une propriété GA4 pour `vtcmany.fr`
2. Installer le tag (ou Plausible/Umami si préférence privacy-friendly)
3. Définir des **conversions** :
   - Clics `tel:+33768146015`
   - Soumissions formulaire contact (`/api/contact` succès)
   - Clics WhatsApp
   - Clics « Avis Google »

## 3. NAP & Google Business Profile

Le NAP du site doit rester **identique** partout :

| Champ | Valeur |
|-------|--------|
| Nom | **VTC MANY** |
| Téléphone | **07 68 14 60 15** (`+33768146015`) |
| Email | **vtcmany@gmail.com** |
| Zone | Narbonne + communes alentour (service-area, pas vitrine rue) |
| Google Maps | https://www.google.com/maps?cid=12210354936377896073 |

- Lier la fiche GBP → site `https://www.vtcmany.fr`
- Catégorie : chauffeur privé / VTC (pas taxi)
- Horaires : **24h/24 · 7j/7**
- Collecter des avis Google régulièrement (lien fiche ci-dessus)

## 4. Rich Results Test

Après chaque déploiement majeur, tester :

- Accueil FR : `https://www.vtcmany.fr/fr` → LimousineService, FAQPage, Organization
- Contact : `https://www.vtcmany.fr/fr/contact` → LimousineService, BreadcrumbList
- Page transfert : `https://www.vtcmany.fr/fr/services/transfert-aeroport-montpellier` → Service, FAQPage, BreadcrumbList

Outil : https://search.google.com/test/rich-results

## 5. Structure SEO implémentée

- **Config centralisée** : `lib/seo-config.ts` (title, description, H1, mot-clé par route × locale)
- **Pages transferts** (slugs identiques, contenu localisé) :
  - `/services/transfert-aeroport-montpellier`
  - `/services/transfert-aeroport-toulouse`
  - `/services/transfert-gare-narbonne`
  - `/services/longue-distance`
  - `/services/mise-a-disposition-evenements`
- **Sitemap** : toutes routes × fr/en/es + hreflang alternates
- **robots.txt** : allow + lien sitemap
- **Canonical** : auto-référent par locale
- **Pas de tarifs** affichés — devis sur demande
- **Pas de positionnement « taxi »** (sauf FAQ comparative)

## 6. Performance (Lighthouse mobile)

Objectif : Performance, SEO, Accessibilité ≥ 95.

- Images : `next/image`, formats WebP/AVIF (Vercel)
- Police Inter : `next/font` (display: swap)
- Clash Display : Fontshare (display: swap)
- Carte Google : lazy-load (Intersection Observer)
- GSAP : respect `prefers-reduced-motion`

Relancer Lighthouse après déploiement et corriger si score < 95.

## 7. Variables Vercel (production)

Configurer dans le projet `many-vtc` :

```
NEXT_PUBLIC_SITE_URL=https://www.vtcmany.fr
MAILERSEND_API_KEY=...
MAILERSEND_FROM_EMAIL=...
MAILERSEND_TO_EMAIL=vtcmany@gmail.com
```

## 8. Maintenance contenu

- Mettre à jour `lib/seo-config.ts` pour tout changement de title/description
- Mettre à jour `lib/service-pages.ts` pour le contenu des pages transferts
- Ne pas créer de page ciblant « taxi Narbonne »
- Un intent principal par page (éviter cannibalisation « vtc narbonne »)

---

*Document généré lors de la passe SEO MASTER — KERNEL.today*
