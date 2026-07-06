import { notFound } from "next/navigation";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SetHtmlLang from "@/components/SetHtmlLang";
import StickyCall from "@/components/StickyCall";
import WhatsAppButton from "@/components/WhatsAppButton";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { buildLocalBusinessJsonLd } from "@/lib/seo";
import { getDictionary } from "@/lib/translations";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const jsonLd = buildLocalBusinessJsonLd(locale);

  return (
    <>
      <SetHtmlLang locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header dict={dict} locale={locale} />
      <main className="min-h-screen bg-brand-bg pb-24 text-brand-foreground md:pb-0">{children}</main>
      <Footer dict={dict} locale={locale} />
      <StickyCall dict={dict} locale={locale} />
      <WhatsAppButton label={dict.whatsapp.label} />
      <CookieBanner dict={dict.cookies} />
    </>
  );
}
