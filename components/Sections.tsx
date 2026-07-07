"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dictionary } from "@/lib/translations";
import type { Locale } from "@/lib/i18n";
import { business } from "@/lib/business";
import { SERVICE_IMAGES } from "@/lib/service-images";
import type { ServiceSlug } from "@/lib/routes";
import { servicePath } from "@/lib/routes";
import { getSeoMeta } from "@/lib/seo-config";
import Reveal from "./Reveal";
import FaqItem from "./FaqItem";

gsap.registerPlugin(ScrollTrigger);

type SectionProps = {
  dict: Dictionary;
  locale?: Locale;
};

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&q=80",
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80",
];

function ServicePhotoFrame({ id, title }: { id: string; title: string }) {
  const image = SERVICE_IMAGES[id] ?? {
    src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
    alt: title,
  };

  return (
    <div className="group relative overflow-hidden border border-brand-border">
      <Image
        src={image.src}
        alt={image.alt}
        width={640}
        height={480}
        className="image-hover-scale aspect-[4/3] w-full object-cover brightness-105"
        sizes="(max-width: 640px) 100vw, 50vw"
      />
    </div>
  );
}

const PREVIEW_LINKS: Partial<Record<string, ServiceSlug>> = {
  airport: "transfert-aeroport-montpellier",
  station: "transfert-gare-narbonne",
};

export function ServicesPreview({ dict, locale = "fr" }: SectionProps) {
  return (
    <section className="border-t border-brand-border py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-5 md:px-10 lg:px-20">
        <div className="grid grid-cols-12 gap-x-6 gap-y-4">
          <Reveal className="col-span-12 md:col-span-3">
            <p className="font-display text-6xl font-bold tracking-tighter section-index md:text-8xl">01</p>
          </Reveal>
          <Reveal className="col-span-12 md:col-start-5 md:col-span-8">
            <p className="label-meta">{dict.services.overline}</p>
            <h2 className="section-heading mt-3">{dict.services.title}</h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {dict.services.items.map((item, i) => {
            const slug = PREVIEW_LINKS[item.id];
            const detailHref = slug
              ? `/${locale}/${servicePath(slug)}`
              : `/${locale}/services#${item.id}`;

            return (
            <Reveal key={item.id} delay={i * 0.05}>
              <article className="card-surface group h-full p-5 transition hover:border-white/15">
                <ServicePhotoFrame id={item.id} title={item.title} />
                {"category" in item && item.category ? (
                  <p className="label-meta mt-5">{item.category}</p>
                ) : null}
                <h3 className="font-display mt-2 text-xl font-medium tracking-tighter">{item.title}</h3>
                <p className="body-md mt-3 text-base">{item.description}</p>
                <Link href={detailHref} className="editorial-link mt-4 inline-flex text-sm">
                  {dict.services.explore}
                  <span className="editorial-link-arrow" aria-hidden>
                    →
                  </span>
                </Link>
              </article>
            </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12">
          <Link href={`/${locale}/services`} className="editorial-link">
            {dict.services.viewAll}
            <span className="editorial-link-arrow" aria-hidden>
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

const SERVICE_DETAIL_ORDER = ["local", "beaches", "transfers", "long", "disposal"] as const;

const DETAIL_LINKS: Partial<
  Record<(typeof SERVICE_DETAIL_ORDER)[number], ServiceSlug[]>
> = {
  transfers: [
    "transfert-aeroport-montpellier",
    "transfert-aeroport-toulouse",
    "transfert-gare-narbonne",
  ],
  long: ["longue-distance"],
  disposal: ["mise-a-disposition-evenements"],
};

export function ServicesFull({ dict, locale = "fr" }: SectionProps) {
  return (
    <div className="space-y-24 md:space-y-32">
      {SERVICE_DETAIL_ORDER.map((key, i) => {
        const service = dict.services.detail[key];
        const image = SERVICE_IMAGES[key];
        const num = String(i + 1).padStart(2, "0");
        const links = DETAIL_LINKS[key];

        return (
          <Reveal key={key}>
            <article id={key} className="grid grid-cols-12 gap-x-6 gap-y-8 lg:items-start">
              <div className="col-span-12 lg:col-span-3 lg:sticky lg:top-32">
                <p className="font-display text-7xl font-bold tracking-tighter section-index">{num}</p>
              </div>
              <div className="col-span-12 lg:col-span-5">
                <h2 className="font-display text-3xl font-bold tracking-tighter md:text-4xl">{service.title}</h2>
                <p className="body-lg mt-4 text-base">{service.short}</p>
                <div className="body-md mt-6 space-y-4 text-base">
                  {service.paragraphs.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {service.features.map((f) => (
                    <li key={f} className="label-meta border border-brand-border px-3 py-1.5 text-white/60">
                      {f}
                    </li>
                  ))}
                </ul>
                {links?.length ? (
                  <ul className="mt-8 space-y-2">
                    {links.map((slug) => {
                      const seo = getSeoMeta(slug, locale);
                      return (
                        <li key={slug}>
                          <Link
                            href={`/${locale}/${servicePath(slug)}`}
                            className="editorial-link text-base"
                          >
                            {seo.h1}
                            <span className="editorial-link-arrow" aria-hidden>
                              →
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
              {image ? (
                <div className="col-span-12 lg:col-span-4">
                  <ServicePhotoFrame id={key} title={service.title} />
                </div>
              ) : null}
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

export function TrustBand({ dict }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const cells = el.querySelectorAll(".trust-cell");
    const ctx = gsap.context(() => {
      gsap.from(cells, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="border-t border-brand-border py-16 md:py-20">
      <div className="mx-auto max-w-editorial px-5 md:px-10 lg:px-20">
        <Reveal>
          <p className="label-meta">{dict.trust.overline}</p>
          <h2 className="section-heading mt-3 text-3xl md:text-4xl">{dict.trust.title}</h2>
        </Reveal>
        <div ref={ref} className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
          {dict.trust.items.map((item) => (
            <div key={item.label} className="trust-cell border-t border-brand-border pt-6">
              <p className="label-meta">{item.label}</p>
              <p className="font-display mt-3 text-xl font-medium tracking-tighter md:text-2xl">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AvailabilitySection({ dict }: SectionProps) {
  return (
    <section className="border-t border-brand-border py-16 md:py-24">
      <div className="mx-auto max-w-editorial px-5 text-center md:px-10 lg:px-20">
        <Reveal>
          <h2 className="section-heading">{dict.availability.title}</h2>
          <ul className="mt-10 flex flex-wrap justify-center gap-3">
            {dict.availability.items.map((item) => (
              <li
                key={item}
                className="label-meta border border-white/20 px-5 py-2.5 text-white"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function ServicesOverviewSection({ dict }: SectionProps) {
  return (
    <section className="border-t border-brand-border py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-5 md:px-10 lg:px-20">
        <div className="grid grid-cols-12 gap-x-6">
          <Reveal className="col-span-12 md:col-span-3">
            <p className="font-display text-6xl font-bold tracking-tighter section-index md:text-8xl">02</p>
          </Reveal>
          <Reveal className="col-span-12 md:col-start-5 md:col-span-8">
            <p className="label-meta">{dict.services.overview.overline}</p>
            <h2 className="section-heading mt-3">{dict.services.overview.title}</h2>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-px bg-brand-border md:grid-cols-2">
          {dict.services.overview.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <article className="h-full bg-brand-bg p-8 md:p-10">
                <h3 className="font-display text-xl font-medium tracking-tighter">{item.title}</h3>
                <p className="body-md mt-4">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GallerySection({ dict }: SectionProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.to(el.querySelector(".gallery-parallax-img"), {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="border-t border-brand-border">
      <div ref={parallaxRef} className="relative aspect-[21/9] overflow-hidden">
        <Image
          src={GALLERY_IMAGES[0]}
          alt={dict.gallery.items[0].alt}
          fill
          className="gallery-parallax-img object-cover brightness-105"
          sizes="100vw"
        />
        <p className="label-meta absolute bottom-6 left-6 md:bottom-10 md:left-10">
          {dict.gallery.items[0].caption}
        </p>
      </div>

      <div className="grid md:grid-cols-2">
        {dict.gallery.items.slice(1).map((item, i) => (
          <div key={item.caption} className="group relative aspect-[4/3] overflow-hidden border-t border-brand-border md:border-l">
            <Image
              src={GALLERY_IMAGES[i + 1]}
              alt={item.alt}
              fill
              className="image-hover-scale object-cover brightness-105"
              sizes="50vw"
            />
            <p className="label-meta absolute bottom-4 left-4">
              {item.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CoverageSection({ dict }: SectionProps) {
  return (
    <section className="border-t border-brand-border py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-5 md:px-10 lg:px-20">
        <Reveal>
          <p className="label-meta">{dict.coverage.overline}</p>
          <h2 className="section-heading mt-3">{dict.coverage.title}</h2>
          <p className="body-lg mt-6 max-w-3xl">{dict.coverage.text}</p>
        </Reveal>
        <Reveal className="mt-10 flex flex-wrap gap-2">
          {dict.coverage.cities.map((city) => (
            <span key={city} className="label-meta border border-brand-border px-4 py-2 text-white/60">
              {city}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function ProcessSection({ dict }: SectionProps) {
  return (
    <section className="border-t border-brand-border py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-5 md:px-10 lg:px-20">
        <Reveal>
          <p className="label-meta">{dict.process.overline}</p>
          <h2 className="section-heading mt-3">{dict.process.title}</h2>
        </Reveal>
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dict.process.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <li className="card-surface p-6">
                <span className="font-display text-4xl font-bold section-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-4 text-lg font-medium tracking-tighter">{step.title}</h3>
                <p className="body-md mt-3 text-sm">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ReviewsSection({ dict }: SectionProps) {
  return (
    <section className="border-t border-brand-border py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-5 md:px-10 lg:px-20">
        <Reveal>
          <p className="label-meta">{dict.reviews.overline}</p>
          <h2 className="section-heading mt-3">{dict.reviews.title}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <p className="label-meta text-white/60">{dict.reviews.rating}</p>
            <span className="flex items-center gap-0.5 text-[#FBBC04]" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                  <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.77l-4.94 2.94.94-5.5-4-3.9 5.53-.8L10 1.5z" />
                </svg>
              ))}
            </span>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {dict.reviews.items.map((review, i) => (
            <Reveal key={review.text.slice(0, 20)} delay={i * 0.08}>
              <blockquote className="card-surface flex h-full flex-col p-6">
                <p className="body-lg text-base">&ldquo;{review.text}&rdquo;</p>
              </blockquote>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <a
            href={business.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link"
          >
            {dict.reviews.google}
            <span className="editorial-link-arrow" aria-hidden>
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function FaqSection({ dict }: SectionProps) {
  return (
    <section className="border-t border-brand-border py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-5 md:px-10 lg:px-20">
        <Reveal>
          <p className="label-meta">{dict.faq.overline}</p>
          <h2 className="section-heading mt-3">{dict.faq.title}</h2>
        </Reveal>
        <div className="mt-12 space-y-3">
          {dict.faq.items.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <FaqItem question={item.q} answer={item.a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
