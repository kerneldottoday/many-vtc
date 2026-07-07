import type { Locale } from "./i18n";

/** Static page paths (without locale prefix). Service sub-pages use `services/{slug}`. */
export const STATIC_ROUTES = [
  "",
  "services",
  "contact",
  "mentions-legales",
  "politique-confidentialite",
] as const;

export type StaticRoute = (typeof STATIC_ROUTES)[number];

export const SERVICE_SLUGS = [
  "transfert-aeroport-montpellier",
  "transfert-aeroport-toulouse",
  "transfert-gare-narbonne",
  "longue-distance",
  "mise-a-disposition-evenements",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export function isServiceSlug(value: string): value is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(value);
}

export function servicePath(slug: ServiceSlug): string {
  return `services/${slug}`;
}

export function allSitemapPaths(): string[] {
  return [
    ...STATIC_ROUTES,
    ...SERVICE_SLUGS.map((slug) => servicePath(slug)),
  ];
}

export function localizedUrl(locale: Locale, path = ""): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.vtcmany.fr";
  return path ? `${base}/${locale}/${path}` : `${base}/${locale}`;
}
