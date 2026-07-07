import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import ServiceHubLinks from "@/components/ServiceHubLinks";
import { AvailabilitySection, ServicesFull } from "@/components/Sections";
import { isLocale, type Locale } from "@/lib/i18n";
import { getSeoMeta } from "@/lib/seo-config";
import { buildBreadcrumbJsonLd, seoMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/translations";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return seoMetadata("services", raw as Locale);
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const seo = getSeoMeta("services", locale);
  const homeLabel =
    locale === "fr" ? "Accueil" : locale === "en" ? "Home" : "Inicio";

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd(locale, [
          { name: homeLabel, path: "" },
          { name: seo.h1, path: "services" },
        ])}
      />
      <section className="border-b border-brand-border pt-[120px] pb-16 md:pt-[140px]">
        <div className="mx-auto max-w-editorial px-5 md:px-10 lg:px-20">
          <Reveal>
            <p className="label-meta">{dict.services.overline}</p>
            <h1 className="section-heading mt-3">{seo.h1}</h1>
            <p className="body-lg mt-5 max-w-2xl">{dict.services.pageLead}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-brand-border py-12 md:py-16">
        <div className="mx-auto max-w-editorial px-5 md:px-10 lg:px-20">
          <ServiceHubLinks locale={locale} />
        </div>
      </section>

      <AvailabilitySection dict={dict} />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-editorial px-5 md:px-10 lg:px-20">
          <ServicesFull dict={dict} locale={locale} />
        </div>
      </section>
    </>
  );
}
