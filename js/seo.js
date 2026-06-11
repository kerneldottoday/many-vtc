(function () {
  "use strict";

  if (typeof SEO_CONFIG === "undefined") return;

  const { siteUrl, siteName, locale, defaultImage, business } = SEO_CONFIG;

  function absoluteUrl(path) {
    const clean = path.startsWith("/") ? path : `/${path}`;
    return `${siteUrl.replace(/\/$/, "")}${clean}`;
  }

  function currentPath() {
    const path = window.location.pathname.replace(/\/index\.html$/, "/");
    return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path || "/";
  }

  function getMeta(name) {
    const el = document.querySelector(`meta[name="${name}"]`);
    return el ? el.getAttribute("content") : "";
  }

  function setMeta(property, content, isOg) {
    if (!content) return;
    const attr = isOg ? "property" : "name";
    let el = document.querySelector(`meta[${attr}="${property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function injectCanonical() {
    if (document.querySelector('link[rel="canonical"]')) return;
    const link = document.createElement("link");
    link.rel = "canonical";
    link.href = absoluteUrl(currentPath());
    document.head.appendChild(link);
  }

  function injectOpenGraph() {
    const title = document.title;
    const description = getMeta("description");
    const url = absoluteUrl(currentPath());
    const image =
      document.querySelector('meta[property="og:image"]')?.getAttribute("content") ||
      defaultImage;

    setMeta("og:type", "website", true);
    setMeta("og:locale", locale, true);
    setMeta("og:site_name", siteName, true);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:url", url, true);
    setMeta("og:image", image, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
  }

  function injectLocalBusiness() {
    if (document.getElementById("schema-local-business")) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      "@id": `${siteUrl}/#organization`,
      name: business.name,
      description: business.description,
      url: siteUrl,
      telephone: business.telephone,
      email: business.email,
      image: defaultImage,
      priceRange: "€€",
      openingHours: business.openingHours,
      address: {
        "@type": "PostalAddress",
        addressLocality: business.addressLocality,
        addressRegion: business.addressRegion,
        postalCode: business.postalCode,
        addressCountry: business.addressCountry,
      },
      areaServed: business.areaServed.map((name) => ({
        "@type": "City",
        name,
      })),
      sameAs: [],
    };

    const script = document.createElement("script");
    script.id = "schema-local-business";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  function injectWebSite() {
    if (document.getElementById("schema-website")) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: business.description,
      inLanguage: "fr-FR",
      publisher: { "@id": `${siteUrl}/#organization` },
    };

    const script = document.createElement("script");
    script.id = "schema-website";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectCanonical();
    injectOpenGraph();
    injectLocalBusiness();
    injectWebSite();
  });
})();
