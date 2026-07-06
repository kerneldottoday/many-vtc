"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import LightLeaks from "@/components/LightLeaks";
import type { Dictionary } from "@/lib/translations";
import type { Locale } from "@/lib/i18n";
import { business } from "@/lib/business";

const HERO_VIDEO = "/assets/video/hero-bg.mp4";
const HERO_POSTER =
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80";

type HeroProps = {
  dict: Dictionary;
  locale: Locale;
};

export default function Hero({ dict, locale }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-badge", { opacity: 0, y: 16, duration: 0.7, delay: 0.2 });
      gsap.from(".hero-display", {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.3,
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
      });
      gsap.from(".hero-title", {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.45,
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
      });
      gsap.from(".hero-sub", { opacity: 0, y: 24, duration: 0.8, delay: 0.6 });
      gsap.from(".hero-cta", { opacity: 0, y: 20, duration: 0.7, delay: 0.75, stagger: 0.12 });
    }, el);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    video.play().catch(() => {
      /* autoplay blocked — poster remains visible */
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-end overflow-hidden bg-brand-bg pb-24 pt-[100px] md:items-center md:pb-20"
    >
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="hero-video h-full w-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_POSTER}
          aria-hidden
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        <Image
          src={HERO_POSTER}
          alt=""
          fill
          priority
          className="hidden object-cover motion-reduce:block"
          sizes="100vw"
          aria-hidden
        />

        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-brand-bg/30" />
      </div>

      <LightLeaks />

      <div className="relative z-10 mx-auto w-full max-w-editorial px-5 md:px-10 lg:px-20">
        <span className="hero-badge label-meta inline-flex items-center gap-2 text-white/80">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" aria-hidden />
          {dict.hero.badge}
        </span>

        <p className="hero-display mt-4" aria-hidden>
          {dict.hero.displayTitle}
        </p>

        <h1 className="hero-title sr-only">{dict.hero.title}</h1>
        <p className="font-display mt-4 max-w-2xl text-2xl font-medium tracking-tighter text-white md:text-4xl">
          {dict.hero.title}
        </p>

        <p className="hero-sub body-lg mt-6 max-w-xl">{dict.hero.subtitle}</p>

        <div className="hero-cta mt-10 flex flex-wrap gap-4">
          <a href={`tel:${business.phone}`} className="btn-solid">
            {dict.hero.ctaCall}
          </a>
          <Link href={`/${locale}/contact`} className="btn-pill text-white">
            {dict.hero.ctaBook}
          </Link>
        </div>
      </div>
    </section>
  );
}
