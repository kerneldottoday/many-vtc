import Reveal from "@/components/Reveal";
import { AvailabilitySection, ServicesFull } from "@/components/Sections";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/translations";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw);
  return pageMetadata(raw as Locale, dict.meta.services, "services");
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = await getDictionary(raw);

  return (
    <>
      <section className="border-b border-brand-border pt-[120px] pb-16 md:pt-[140px]">
        <div className="mx-auto max-w-editorial px-5 md:px-10 lg:px-20">
          <Reveal>
            <p className="label-meta">{dict.services.overline}</p>
            <h1 className="section-heading mt-3">{dict.services.pageTitle}</h1>
            <p className="body-lg mt-5 max-w-2xl">{dict.services.pageLead}</p>
          </Reveal>
        </div>
      </section>

      <AvailabilitySection dict={dict} />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-editorial px-5 md:px-10 lg:px-20">
          <ServicesFull dict={dict} />
        </div>
      </section>
    </>
  );
}
