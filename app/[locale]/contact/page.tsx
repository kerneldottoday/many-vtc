import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import ServiceAreaMap from "@/components/ServiceAreaMap";
import { business } from "@/lib/business";
import { isLocale, type Locale } from "@/lib/i18n";
import { getSeoMeta } from "@/lib/seo-config";
import {
  buildBreadcrumbJsonLd,
  buildLimousineServiceJsonLd,
  seoMetadata,
} from "@/lib/seo";
import { getDictionary } from "@/lib/translations";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return seoMetadata("contact", raw as Locale);
}

const mapCopy = {
  fr: {
    title: "Zone d'intervention VTC MANY",
    caption:
      "Narbonne, Gruissan, Sigean, Coursan et toute l'Occitanie — service 24h/24 · 7j/7.",
    reviews: "Voir nos avis Google",
  },
  en: {
    title: "VTC MANY service area",
    caption:
      "Narbonne, Gruissan, Sigean, Coursan and all of Occitanie — 24/7 service.",
    reviews: "See our Google reviews",
  },
  es: {
    title: "Zona de servicio VTC MANY",
    caption:
      "Narbona, Gruissan, Sigean, Coursan y toda Occitania — servicio 24h/24 · 7d/7.",
    reviews: "Ver nuestras reseñas en Google",
  },
} as const;

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const seo = getSeoMeta("contact", locale);
  const map = mapCopy[locale];
  const homeLabel =
    locale === "fr" ? "Accueil" : locale === "en" ? "Home" : "Inicio";

  return (
    <>
      <JsonLd
        data={[
          buildLimousineServiceJsonLd(locale),
          buildBreadcrumbJsonLd(locale, [
            { name: homeLabel, path: "" },
            { name: seo.h1, path: "contact" },
          ]),
        ]}
      />
      <section className="border-b border-brand-border pt-[120px] pb-16 md:pt-[140px]">
        <div className="mx-auto max-w-editorial px-5 md:px-10 lg:px-20">
          <Reveal>
            <p className="label-meta">{dict.contact.overline}</p>
            <h1 className="section-heading mt-3">{seo.h1}</h1>
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
              <a
                href={business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill text-white"
              >
                {map.reviews}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-5 md:px-10 lg:px-20">
          <Reveal>
            <ContactForm dict={dict.contact.form} locale={locale} />
          </Reveal>
          <Reveal>
            <ServiceAreaMap title={map.title} caption={map.caption} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
