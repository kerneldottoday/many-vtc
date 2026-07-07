export const locales = ["fr", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
};

export const localeFlags: Record<Locale, string> = {
  fr: "🇫🇷",
  en: "🇬🇧",
  es: "🇪🇸",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const siteUrl =
  rawSiteUrl && rawSiteUrl.length > 0
    ? rawSiteUrl.replace(/\/$/, "")
    : "https://www.vtcmany.fr";
