import type { Metadata } from "next";
import { business } from "./business";
import type { Locale } from "./i18n";
import { locales, siteUrl } from "./i18n";
import { getSeoMeta, type SeoRoute } from "./seo-config";
import type { ServicePageFaq } from "./service-pages";

const SCHEMA_AREA = [
  { "@type": "City" as const, name: "Narbonne" },
  { "@type": "City" as const, name: "Gruissan" },
  { "@type": "City" as const, name: "Sigean" },
  { "@type": "City" as const, name: "Coursan" },
  { "@type": "AdministrativeArea" as const, name: "Aude" },
  { "@type": "AdministrativeArea" as const, name: "Occitanie" },
];

const OPENING_HOURS = {
  "@type": "OpeningHoursSpecification" as const,
  dayOfWeek: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  opens: "00:00",
  closes: "23:59",
};

export function buildAlternates(locale: Locale, path = "") {
  const cleanPath = path ? `/${path}` : "";
  const languages: Record<string, string> = {
    "x-default": `${siteUrl}/fr${cleanPath}`,
  };
  for (const l of locales) {
    languages[l] = `${siteUrl}/${l}${cleanPath}`;
  }
  return {
    canonical: `${siteUrl}/${locale}${cleanPath}`,
    languages,
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: business.name,
    legalName: business.legalName,
    alternateName: ["Many VTC", "vtcmany", "vtcmany.fr"],
    url: siteUrl,
    logo: `${siteUrl}/favicon.svg`,
    image: `${siteUrl}/assets/og-vtcmany.svg`,
    telephone: business.phone,
    email: business.email,
    sameAs: [business.googleMapsUrl],
  };
}

export function buildLimousineServiceJsonLd(locale: Locale) {
  const descriptions: Record<Locale, string> = {
    fr: "Chauffeur privé VTC à Narbonne et alentours. Disponible 24h/24 et 7j/7.",
    en: "Private VTC chauffeur in Narbonne and surrounding area. Available 24/7.",
    es: "Chófer privado VTC en Narbona y alrededores. Disponible 24h/24 y 7d/7.",
  };

  return {
    "@context": "https://schema.org",
    "@type": "LimousineService",
    "@id": `${siteUrl}/#localbusiness`,
    name: business.name,
    image: `${siteUrl}/assets/og-vtcmany.svg`,
    telephone: business.phone,
    email: business.email,
    url: siteUrl,
    description: descriptions[locale],
    areaServed: SCHEMA_AREA,
    openingHoursSpecification: OPENING_HOURS,
    sameAs: [business.googleMapsUrl],
    parentOrganization: { "@id": `${siteUrl}/#organization` },
  };
}

export function buildFaqPageJsonLd(items: ServicePageFaq[] | { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  locale: Locale,
  crumbs: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${siteUrl}/${locale}${crumb.path ? `/${crumb.path}` : ""}`,
    })),
  };
}

export function buildServiceJsonLd(
  locale: Locale,
  serviceName: string,
  description: string,
  path: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description,
    url: `${siteUrl}/${locale}/${path}`,
    provider: {
      "@type": "LimousineService",
      name: business.name,
      telephone: business.phone,
      url: siteUrl,
    },
    areaServed: SCHEMA_AREA,
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: business.phone,
      serviceUrl: `${siteUrl}/${locale}/contact`,
    },
  };
}

export function buildWebSiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: business.name,
    inLanguage: locale,
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function seoMetadata(route: SeoRoute, locale: Locale): Metadata {
  const meta = getSeoMeta(route, locale);
  const ogLocale =
    locale === "fr" ? "fr_FR" : locale === "en" ? "en_GB" : "es_ES";

  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL(siteUrl),
    alternates: buildAlternates(locale, meta.path),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteUrl}/${locale}${meta.path ? `/${meta.path}` : ""}`,
      siteName: business.name,
      locale: ogLocale,
      type: "website",
      images: [`${siteUrl}/assets/og-vtcmany.svg`],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${siteUrl}/assets/og-vtcmany.svg`],
    },
    robots: { index: true, follow: true },
  };
}

/** @deprecated Use seoMetadata(route, locale) */
export function pageMetadata(
  locale: Locale,
  meta: { title: string; description: string },
  path = ""
): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL(siteUrl),
    alternates: buildAlternates(locale, path),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteUrl}/${locale}${path ? `/${path}` : ""}`,
      siteName: business.name,
      locale: locale === "fr" ? "fr_FR" : locale === "en" ? "en_GB" : "es_ES",
      type: "website",
      images: [`${siteUrl}/assets/og-vtcmany.svg`],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${siteUrl}/assets/og-vtcmany.svg`],
    },
    robots: { index: true, follow: true },
  };
}

/** @deprecated Use buildLimousineServiceJsonLd */
export function buildLocalBusinessJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationJsonLd(),
      buildLimousineServiceJsonLd(locale),
      buildWebSiteJsonLd(locale),
    ],
  };
}
