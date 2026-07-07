import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/lib/i18n";
import { allSitemapPaths } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of allSitemapPaths()) {
    const isLegal = page.includes("mentions") || page.includes("politique");
    const isServiceSub = page.startsWith("services/") && page !== "services";

    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}${page ? `/${page}` : ""}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : isLegal ? "yearly" : "monthly",
        priority: page === "" ? 1 : isLegal ? 0.3 : isServiceSub ? 0.85 : 0.8,
      });
    }
  }

  return entries;
}
