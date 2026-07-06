import LegalContent from "@/components/LegalContent";
import Reveal from "@/components/Reveal";
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
  return pageMetadata(raw as Locale, dict.meta.privacy, "politique-confidentialite");
}

export default async function PolitiqueConfidentialitePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = await getDictionary(raw);

  return (
    <section className="border-b border-brand-border pb-28 pt-[120px] md:pb-32 md:pt-[140px]">
      <div className="mx-auto max-w-editorial px-5 md:px-10 lg:px-20">
        <Reveal>
          <LegalContent
            title={dict.legal.privacyTitle}
            lead={dict.legal.privacyLead}
            sections={dict.legal.privacySections}
            showContact
          />
        </Reveal>
      </div>
    </section>
  );
}
