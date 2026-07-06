import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { business } from "@/lib/business";
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
  return pageMetadata(raw as Locale, dict.meta.contact, "contact");
}

export default async function ContactPage({
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
            <p className="label-meta">{dict.contact.overline}</p>
            <h1 className="section-heading mt-3">{dict.contact.title}</h1>
            <p className="body-lg mt-5 max-w-2xl">{dict.contact.subtitle}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href={`tel:${business.phone}`} className="btn-solid">
                {dict.contact.callNow} — {business.phoneDisplay}
              </a>
              <a
                href={business.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill text-white"
              >
                {dict.contact.whatsappNow}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-5 md:px-10 lg:px-20">
          <Reveal>
            <ContactForm dict={dict.contact.form} locale={raw as Locale} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
