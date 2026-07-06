import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/lib/i18n";

const pages = ["", "services", "contact", "mentions-legales", "politique-confidentialite"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${siteUrl}/${locale}${page ? `/${page}` : ""}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : page.includes("mentions") || page.includes("politique") ? 0.3 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${siteUrl}/${l}${page ? `/${page}` : ""}`])
          ),
        },
      });
    }
  }

  return entries;
}
