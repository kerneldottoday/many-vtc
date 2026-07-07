"use client";

import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqItem from "@/components/FaqItem";
import Reveal from "@/components/Reveal";
import { business } from "@/lib/business";
import type { Locale } from "@/lib/i18n";
import type { SeoMeta } from "@/lib/seo-config";
import {
  SERVICE_PAGE_IMAGES,
  type ServicePageContent,
} from "@/lib/service-pages";
import type { ServiceSlug } from "@/lib/routes";
import { servicePath } from "@/lib/routes";

type ServiceSubPageProps = {
  slug: ServiceSlug;
  locale: Locale;
  seo: SeoMeta;
  content: ServicePageContent;
  homeLabel: string;
};

export default function ServiceSubPage({
  slug,
  locale,
  seo,
  content,
  homeLabel,
}: ServiceSubPageProps) {
  const imageSrc = SERVICE_PAGE_IMAGES[slug];

  return (
    <>
      <section className="border-b border-brand-border pt-[120px] pb-16 md:pt-[140px]">
        <div className="mx-auto max-w-editorial px-5 md:px-10 lg:px-20">
          <Reveal>
            <Breadcrumbs
              locale={locale}
              items={[
                { label: homeLabel, href: `/${locale}` },
                { label: content.breadcrumbServices, href: `/${locale}/services` },
                { label: seo.h1 },
              ]}
            />
            <p className="label-meta">{content.overline}</p>
            <h1 className="section-heading mt-3">{seo.h1}</h1>
            <p className="body-lg mt-5 max-w-2xl">{content.lead}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-editorial px-5 md:px-10 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="overflow-hidden border border-brand-border">
                <Image
                  src={imageSrc}
                  alt={content.imageAlt}
                  width={800}
                  height={600}
                  className="aspect-[4/3] w-full object-cover brightness-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5">
                {content.paragraphs.map((p, i) => (
                  <p key={i} className="body-md text-base leading-relaxed">
                    {p}
                  </p>
                ))}
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {content.features.map((f) => (
                    <li key={f} className="label-meta flex items-center gap-2 text-white/70">
                      <span className="h-1 w-1 rounded-full bg-orange-500" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-brand-border py-16 md:py-24">
        <div className="mx-auto max-w-editorial px-5 md:px-10 lg:px-20">
          <Reveal>
            <p className="label-meta">FAQ</p>
            <h2 className="section-heading mt-3 max-w-xl">{content.ctaTitle}</h2>
          </Reveal>
          <div className="mt-10 divide-y divide-brand-border border-y border-brand-border">
            {content.faq.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.05}>
                <FaqItem question={item.q} answer={item.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-border py-16 md:py-24">
        <div className="mx-auto max-w-editorial px-5 text-center md:px-10 lg:px-20">
          <Reveal>
            <h2 className="font-display text-2xl font-medium tracking-tighter md:text-3xl">
              {content.ctaTitle}
            </h2>
            <p className="body-md mx-auto mt-4 max-w-lg">{content.ctaText}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href={`tel:${business.phone}`} className="btn-solid">
                {business.phoneDisplay}
              </a>
              <Link href={`/${locale}/contact`} className="btn-pill text-white">
                {locale === "fr"
                  ? "Demander un devis en ligne"
                  : locale === "en"
                    ? "Request a quote online"
                    : "Solicitar presupuesto online"}
              </Link>
              <a
                href={business.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill text-white"
              >
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-brand-border py-12 md:py-16">
        <div className="mx-auto max-w-editorial px-5 md:px-10 lg:px-20">
          <p className="label-meta">
            {locale === "fr"
              ? "Autres prestations VTC"
              : locale === "en"
                ? "Other VTC services"
                : "Otros servicios VTC"}
          </p>
          <ul className="mt-4 flex flex-wrap gap-4">
            {content.relatedLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${locale}/${servicePath(link.href)}`}
                  className="editorial-link text-base"
                >
                  {link.label}
                  <span className="editorial-link-arrow" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/${locale}/services`} className="editorial-link text-base">
                {locale === "fr"
                  ? "Tous les services VTC à Narbonne"
                  : locale === "en"
                    ? "All VTC services in Narbonne"
                    : "Todos los servicios VTC en Narbona"}
                <span className="editorial-link-arrow" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
