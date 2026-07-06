"use client";

import Link from "next/link";
import type { Dictionary } from "@/lib/translations";
import type { Locale } from "@/lib/i18n";
import { business } from "@/lib/business";

type StickyCallProps = {
  dict: Dictionary;
  locale: Locale;
};

export default function StickyCall({ dict, locale }: StickyCallProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-brand-border bg-brand-bg/95 p-3 backdrop-blur-lg md:hidden">
      <a
        href={`tel:${business.phone}`}
        className="label-meta flex min-h-[48px] flex-1 items-center justify-center border border-white/20 text-white"
      >
        {dict.cta.call}
      </a>
      <Link
        href={`/${locale}/contact`}
        className="label-meta flex min-h-[48px] flex-1 items-center justify-center bg-white text-brand-bg"
      >
        {dict.cta.book}
      </Link>
    </div>
  );
}
