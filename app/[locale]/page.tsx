import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import {
  AvailabilitySection,
  FaqSection,
  ProcessSection,
  ReviewsSection,
  ServicesOverviewSection,
  ServicesPreview,
  TrustBand,
} from "@/components/Sections";
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
  return pageMetadata(raw as Locale, dict.meta.home);
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero dict={dict} locale={locale} />

      <section className="border-t border-brand-border py-16 md:py-24">
        <div className="mx-auto max-w-editorial px-5 md:px-10 lg:px-20">
          <Reveal>
            <p className="body-lg mx-auto max-w-3xl text-center">{dict.intro.text}</p>
          </Reveal>
        </div>
      </section>

      <ServicesPreview dict={dict} locale={locale} />
      <ServicesOverviewSection dict={dict} />
      <TrustBand dict={dict} />
      <AvailabilitySection dict={dict} />
      <ProcessSection dict={dict} />
      <FaqSection dict={dict} />
      <ReviewsSection dict={dict} />
    </>
  );
}
