"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Locale, localeFlags, locales } from "@/lib/i18n";
import type { Dictionary } from "@/lib/translations";

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

export default function Header({ dict, locale }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/services`, label: dict.nav.services },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-border bg-brand-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-[100px] max-w-editorial items-center justify-between gap-4 px-5 md:px-10 lg:px-20">
        <Link
          href={`/${locale}`}
          className="font-display text-lg font-bold uppercase tracking-tighter text-white md:text-xl"
        >
          MANY VTC
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
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden>
              <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-brand-border bg-brand-bg px-5 py-6 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="label-meta text-white"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/${locale}/contact`}
                className="btn-pill inline-flex text-white"
                onClick={() => setOpen(false)}
              >
                {dict.nav.book}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
