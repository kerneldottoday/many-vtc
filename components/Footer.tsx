import Link from "next/link";
import LightLeaks from "@/components/LightLeaks";
import { business } from "@/lib/business";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/translations";

type FooterProps = {
  dict: Dictionary;
  locale: Locale;
};

export default function Footer({ dict, locale }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-brand-border bg-brand-footer py-24 md:py-32">
      <LightLeaks />

      <div className="relative z-10 mx-auto max-w-editorial px-5 text-center md:px-10 lg:px-20">
        <p className="label-meta">{dict.footer.contact}</p>
        <a
          href={`mailto:${business.email}`}
          className="font-display mt-6 inline-block text-3xl font-bold tracking-tighter text-white underline decoration-white/20 decoration-1 underline-offset-8 transition-all hover:decoration-2 hover:decoration-white md:text-5xl lg:text-6xl"
        >
          {dict.footer.ctaEmail}
        </a>
        <p className="body-md mx-auto mt-6 max-w-md">{dict.footer.tagline}</p>
        <p className="label-meta mt-3">{dict.footer.baseline}</p>

        <nav className="mt-12 flex flex-wrap items-center justify-center gap-6" aria-label="Footer">
          <Link href={`/${locale}/services`} className="label-meta hover:text-white">
            {dict.nav.services}
          </Link>
          <Link href={`/${locale}/contact`} className="label-meta hover:text-white">
            {dict.nav.contact}
          </Link>
          <Link href={`/${locale}/mentions-legales`} className="label-meta hover:text-white">
            {dict.footer.legal}
          </Link>
          <Link href={`/${locale}/politique-confidentialite`} className="label-meta hover:text-white">
            {dict.footer.privacy}
          </Link>
          <a href={`tel:${business.phone}`} className="label-meta hover:text-white">
            {business.phoneDisplay}
          </a>
          <a
            href={business.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="label-meta hover:text-white"
          >
            {locale === "fr"
              ? "Avis Google"
              : locale === "en"
                ? "Google reviews"
                : "Reseñas Google"}
          </a>
        </nav>

        <p className="label-meta mt-12 text-white/30">
          {dict.footer.copyright.replace("{year}", String(year))}
        </p>
      </div>
    </footer>
  );
}
