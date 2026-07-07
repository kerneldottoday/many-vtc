import { locales, siteUrl } from "@/lib/i18n";
import { allSitemapPaths } from "@/lib/routes";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const lastmod = new Date().toISOString();
  const urls: string[] = [];

  for (const page of allSitemapPaths()) {
    const isLegal = page.includes("mentions") || page.includes("politique");
    const isServiceSub = page.startsWith("services/") && page !== "services";
    const changefreq = page === "" ? "weekly" : isLegal ? "yearly" : "monthly";
    const priority = page === "" ? "1.0" : isLegal ? "0.3" : isServiceSub ? "0.85" : "0.8";

    for (const locale of locales) {
      const loc = `${siteUrl}/${locale}${page ? `/${page}` : ""}`;
      urls.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
