"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Locale, localeFlags, locales } from "@/lib/i18n";
import { business } from "@/lib/business";
import type { Dictionary } from "@/lib/translations";

const LOGO = {
  src: "/assets/vtc-many-logo-header.png",
  width: 941,
  height: 153,
} as const;

const REVEAL_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type HeaderProps = {
  dict: Dictionary;
  locale: Locale;
};

function switchLocalePath(pathname: string, next: Locale) {
  const parts = pathname.split("/");
  if (locales.includes(parts[1] as Locale)) {
    parts[1] = next;
    return parts.join("/") || `/${next}`;
  }
  return `/${next}${pathname === "/" ? "" : pathname}`;
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-[14px] w-5" aria-hidden>
      <span
        className={`absolute left-0 block h-[1.5px] w-5 origin-center bg-white transition-all duration-500 ease-reveal ${
          open ? "top-[6px] rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 top-[6px] block h-[1.5px] w-5 bg-white transition-all duration-300 ${
          open ? "scale-x-0 opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 block h-[1.5px] w-5 origin-center bg-white transition-all duration-500 ease-reveal ${
          open ? "top-[6px] -rotate-45" : "top-[12px]"
        }`}
      />
    </span>
  );
}

export default function Header({ dict, locale }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const wasOpenRef = useRef(false);

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/services`, label: dict.nav.services },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const items = nav.querySelectorAll(".mobile-nav-item");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (open) {
      wasOpenRef.current = true;
      nav.style.pointerEvents = "auto";
      nav.setAttribute("aria-hidden", "false");

      if (reduced) {
        gsap.set(nav, { height: "auto", opacity: 1 });
        gsap.set(items, { y: 0, opacity: 1 });
        return;
      }

      gsap.killTweensOf([nav, items]);
      gsap.set(nav, { height: 0, opacity: 0 });
      gsap.set(items, { y: 18, opacity: 0 });

      gsap.to(nav, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: REVEAL_EASE,
      });

      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        delay: 0.1,
        stagger: 0.07,
        ease: REVEAL_EASE,
      });
      return;
    }

    if (!wasOpenRef.current) return;

    nav.style.pointerEvents = "none";
    nav.setAttribute("aria-hidden", "true");

    if (reduced) {
      gsap.set(nav, { height: 0, opacity: 0 });
      gsap.set(items, { y: 0, opacity: 1 });
      return;
    }

    gsap.killTweensOf([nav, items]);
    gsap.to(items, {
      y: -8,
      opacity: 0,
      duration: 0.2,
      stagger: 0.03,
      ease: "power2.in",
    });
    gsap.to(nav, {
      height: 0,
      opacity: 0,
      duration: 0.35,
      ease: "power2.inOut",
    });
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-border bg-brand-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-[100px] max-w-editorial items-center justify-between gap-4 px-5 md:px-10 lg:px-20">
        <Link
          href={`/${locale}`}
          className="relative block shrink-0 transition-opacity hover:opacity-80"
          aria-label={`${business.name} — ${business.city}`}
        >
          <Image
            src={LOGO.src}
            alt={`VTC MANY — Chauffeur privé à ${business.city}`}
            width={LOGO.width}
            height={LOGO.height}
            className="h-10 w-auto md:h-12"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="label-meta text-white transition-opacity hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
          <Link href={`/${locale}/contact`} className="btn-pill border-white/20 text-white">
            {dict.nav.book}
          </Link>
          <div className="flex items-center gap-1" role="group" aria-label="Language">
            {locales.map((l) => (
              <Link
                key={l}
                href={switchLocalePath(pathname, l)}
                className={`flex h-9 w-9 items-center justify-center text-lg transition ${
                  l === locale ? "opacity-100" : "opacity-50 hover:opacity-80"
                }`}
                aria-current={l === locale ? "page" : undefined}
                title={l.toUpperCase()}
              >
                {localeFlags[l]}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex items-center gap-0.5" role="group" aria-label="Language">
            {locales.map((l) => (
              <Link
                key={l}
                href={switchLocalePath(pathname, l)}
                className={`flex h-9 w-9 items-center justify-center text-base ${
                  l === locale ? "opacity-100" : "opacity-50"
                }`}
              >
                {localeFlags[l]}
              </Link>
            ))}
          </div>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-white"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((prev) => !prev)}
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        ref={navRef}
        className="overflow-hidden border-t border-brand-border bg-brand-bg px-5 py-6 lg:hidden"
        aria-label="Mobile"
        aria-hidden="true"
        style={{ height: 0, opacity: 0, pointerEvents: "none" }}
      >
        <ul className="flex flex-col gap-4">
          {links.map((link) => (
            <li key={link.href} className="mobile-nav-item">
              <Link href={link.href} className="label-meta text-white" onClick={closeMenu}>
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mobile-nav-item">
            <Link
              href={`/${locale}/contact`}
              className="btn-pill inline-flex text-white"
              onClick={closeMenu}
            >
              {dict.nav.book}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
