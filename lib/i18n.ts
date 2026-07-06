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

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.vtcmany.fr";
