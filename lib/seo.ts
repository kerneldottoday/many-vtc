import type { Metadata } from "next";
import { business } from "./business";
import { Locale, locales, siteUrl } from "./i18n";
import type { Dictionary } from "./translations";

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

export function buildLocalBusinessJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        additionalType: "https://schema.org/LimousineBusiness",
        "@id": `${siteUrl}/#organization`,
        name: business.name,
        legalName: business.legalName,
        alternateName: ["vtcmany", "vtcmany.fr", "Many VTC", "VTC Many"],
        description:
          locale === "fr"
            ? "Chauffeur privé VTC à Narbonne et alentours. Disponible 24h/24 et 7j/7."
            : locale === "en"
              ? "Private chauffeur in Narbonne and surrounding area. Available 24/7."
              : "Chófer privado en Narbona y alrededores. Disponible 24h/24 y 7d/7.",
        url: siteUrl,
        logo: `${siteUrl}/favicon.svg`,
        image: `${siteUrl}/assets/og-vtcmany.svg`,
        telephone: business.phone,
        email: business.email,
        priceRange: "€€",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
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
          },
        ],
        areaServed: business.areaServed.map((name) => ({
          "@type": "City",
          name,
        })),
        sameAs: [business.googleMapsUrl],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: business.name,
        inLanguage: locale,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
}

export function pageMetadata(
  locale: Locale,
  meta: Dictionary["meta"][keyof Dictionary["meta"]],
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
    robots: {
      index: true,
      follow: true,
    },
  };
}
