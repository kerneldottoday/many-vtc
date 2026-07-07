import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ServiceSubPage from "@/components/ServiceSubPage";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { isServiceSlug, SERVICE_SLUGS } from "@/lib/routes";
import { getSeoMeta } from "@/lib/seo-config";
import {
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
  buildServiceJsonLd,
  seoMetadata,
} from "@/lib/seo";
import { getServicePageContent } from "@/lib/service-pages";
import type { ServiceSlug } from "@/lib/routes";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw) || !isServiceSlug(slug)) return {};
  return seoMetadata(slug as ServiceSlug, raw as Locale);
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw) || !isServiceSlug(slug)) notFound();

  const locale = raw as Locale;
  const serviceSlug = slug as ServiceSlug;
  const seo = getSeoMeta(serviceSlug, locale);
  const content = getServicePageContent(serviceSlug, locale);

  const homeLabel =
    locale === "fr" ? "Accueil" : locale === "en" ? "Home" : "Inicio";

  const breadcrumbs = [
    { name: homeLabel, path: "" },
    { name: content.breadcrumbServices, path: "services" },
    { name: seo.h1, path: seo.path },
  ];

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd(locale, breadcrumbs),
          buildServiceJsonLd(locale, seo.h1, content.lead, seo.path),
          buildFaqPageJsonLd(content.faq),
        ]}
      />
      <ServiceSubPage
        slug={serviceSlug}
        locale={locale}
        seo={seo}
        content={content}
        homeLabel={homeLabel}
      />
    </>
  );
}
