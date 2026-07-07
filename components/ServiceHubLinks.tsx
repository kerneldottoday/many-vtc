import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { SERVICE_SLUGS, servicePath } from "@/lib/routes";
import { getSeoMeta } from "@/lib/seo-config";

const labels: Record<Locale, { overline: string; all: string }> = {
  fr: { overline: "Transferts & prestations dédiées", all: "Voir la fiche" },
  en: { overline: "Dedicated transfers & services", all: "View page" },
  es: { overline: "Traslados y servicios dedicados", all: "Ver ficha" },
};

export default function ServiceHubLinks({ locale }: { locale: Locale }) {
  const copy = labels[locale];

  return (
    <div>
      <p className="label-meta">{copy.overline}</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_SLUGS.map((slug) => {
          const seo = getSeoMeta(slug, locale);
          return (
            <li key={slug}>
              <Link
                href={`/${locale}/${servicePath(slug)}`}
                className="card-surface block h-full p-5 transition hover:border-white/15"
              >
                <h2 className="font-display text-lg font-medium tracking-tighter">
                  {seo.h1}
                </h2>
                <p className="body-md mt-2 text-sm text-white/60 line-clamp-2">
                  {seo.description}
                </p>
                <span className="editorial-link mt-4 inline-flex text-sm">
                  {copy.all}
                  <span className="editorial-link-arrow" aria-hidden>
                    →
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
