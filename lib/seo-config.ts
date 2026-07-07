import type { Locale } from "./i18n";
import type { ServiceSlug } from "./routes";
import { servicePath } from "./routes";

export type SeoRoute =
  | "home"
  | "services"
  | "contact"
  | "mentions"
  | "privacy"
  | ServiceSlug;

export type SeoMeta = {
  title: string;
  description: string;
  h1: string;
  path: string;
  primaryKeyword: string;
};

const BRAND = "VTC MANY";

function meta(
  title: string,
  description: string,
  h1: string,
  path: string,
  primaryKeyword: string
): SeoMeta {
  return { title, description, h1, path, primaryKeyword };
}

const home: Record<Locale, SeoMeta> = {
  fr: meta(
    `VTC Narbonne — Chauffeur privé 24h/24 | ${BRAND}`,
    "Chauffeur privé VTC à Narbonne et alentours, disponible 24h/24 · 7j/7. Courses locales, transferts gare et aéroport, longue distance. Réservez sur devis.",
    "VTC Narbonne — votre chauffeur privé 24h/24",
    "",
    "vtc narbonne"
  ),
  en: meta(
    `Private Chauffeur Narbonne — VTC 24/7 | ${BRAND}`,
    "Private VTC chauffeur in Narbonne and surrounding area, available 24/7. Local rides, station and airport transfers, long-distance trips. Quote on request.",
    "Private chauffeur in Narbonne — VTC available 24/7",
    "",
    "private chauffeur narbonne"
  ),
  es: meta(
    `VTC Narbona — Chófer privado 24h | ${BRAND}`,
    "Chófer privado VTC en Narbona y alrededores, disponible 24h/24 · 7d/7. Trayectos locales, traslados estación y aeropuerto, larga distancia. Presupuesto previo.",
    "VTC Narbona — chófer privado disponible 24h/24",
    "",
    "vtc narbona"
  ),
};

const services: Record<Locale, SeoMeta> = {
  fr: meta(
    `Services VTC à Narbonne — Transferts & courses | ${BRAND}`,
    "Courses locales, transferts gare et aéroport, longue distance et mise à disposition à Narbonne. Chauffeur privé 24h/24 · 7j/7, tarif annoncé sur devis.",
    "Services VTC à Narbonne transferts et courses",
    "services",
    "services vtc narbonne"
  ),
  en: meta(
    `VTC Services Narbonne — Transfers & Rides | ${BRAND}`,
    "Local rides, station and airport transfers, long-distance and hourly hire in Narbonne. Private chauffeur 24/7, fixed quote before every trip.",
    "VTC services in Narbonne — transfers and local rides",
    "services",
    "vtc services narbonne"
  ),
  es: meta(
    `Servicios VTC Narbona — Traslados y trayectos | ${BRAND}`,
    "Trayectos locales, traslados estación y aeropuerto, larga distancia y disposición en Narbona. Chófer privado 24h/24 · 7d/7, tarifa previa.",
    "Servicios VTC en Narbona — traslados y trayectos",
    "services",
    "servicios vtc narbona"
  ),
};

const contact: Record<Locale, SeoMeta> = {
  fr: meta(
    `Réserver un VTC à Narbonne | ${BRAND}`,
    "Réservez votre chauffeur privé VTC à Narbonne : 07 68 14 60 15 ou formulaire en ligne. Réponse rapide 24h/24 · 7j/7.",
    "Réserver un VTC à Narbonne",
    "contact",
    "réservation vtc narbonne"
  ),
  en: meta(
    `Book a VTC in Narbonne | ${BRAND}`,
    "Book your private VTC chauffeur in Narbonne: +33 7 68 14 60 15 or online form. Fast response 24/7.",
    "Book a private VTC in Narbonne",
    "contact",
    "book vtc narbonne"
  ),
  es: meta(
    `Reservar VTC en Narbona | ${BRAND}`,
    "Reserve su chófer privado VTC en Narbona: +33 7 68 14 60 15 o formulario online. Respuesta rápida 24h/24 · 7d/7.",
    "Reservar un VTC en Narbona",
    "contact",
    "reservar vtc narbona"
  ),
};

const mentions: Record<Locale, SeoMeta> = {
  fr: meta(
    `Mentions légales | ${BRAND}`,
    "Mentions légales du site VTC MANY, chauffeur privé à Narbonne et Occitanie.",
    "Mentions légales",
    "mentions-legales",
    "mentions légales"
  ),
  en: meta(
    `Legal Notice | ${BRAND}`,
    "Legal notice for the VTC MANY website, private chauffeur in Narbonne.",
    "Legal notice",
    "mentions-legales",
    "legal notice"
  ),
  es: meta(
    `Aviso legal | ${BRAND}`,
    "Aviso legal del sitio VTC MANY, chófer privado en Narbona.",
    "Aviso legal",
    "mentions-legales",
    "aviso legal"
  ),
};

const privacy: Record<Locale, SeoMeta> = {
  fr: meta(
    `Politique de confidentialité | ${BRAND}`,
    "Politique de confidentialité VTC MANY : traitement des données lors d'une réservation ou d'un contact.",
    "Politique de confidentialité",
    "politique-confidentialite",
    "confidentialité"
  ),
  en: meta(
    `Privacy Policy | ${BRAND}`,
    "VTC MANY privacy policy: how we handle your data when you contact us or book a ride.",
    "Privacy policy",
    "politique-confidentialite",
    "privacy policy"
  ),
  es: meta(
    `Política de privacidad | ${BRAND}`,
    "Política de privacidad VTC MANY: tratamiento de datos al contactar o reservar.",
    "Política de privacidad",
    "politique-confidentialite",
    "política de privacidad"
  ),
};

const servicePages: Record<ServiceSlug, Record<Locale, SeoMeta>> = {
  "transfert-aeroport-montpellier": {
    fr: meta(
      `Transfert aéroport Montpellier depuis Narbonne | ${BRAND}`,
      "VTC Narbonne ↔ aéroport Montpellier-Méditerranée. Chauffeur privé, suivi de vol, accueil pancarte. Disponible 24h/24 · 7j/7, tarif sur devis.",
      "Transfert aéroport Montpellier depuis Narbonne",
      servicePath("transfert-aeroport-montpellier"),
      "transfert aéroport montpellier narbonne"
    ),
    en: meta(
      `Montpellier Airport Transfer from Narbonne | ${BRAND}`,
      "Private VTC Narbonne ↔ Montpellier-Méditerranée Airport. Flight tracking, meet & greet. Available 24/7, quote on request.",
      "Montpellier airport transfer from Narbonne",
      servicePath("transfert-aeroport-montpellier"),
      "montpellier airport transfer narbonne"
    ),
    es: meta(
      `Traslado aeropuerto Montpellier desde Narbona | ${BRAND}`,
      "VTC Narbona ↔ aeropuerto Montpellier-Méditerranée. Chófer privado, seguimiento de vuelo, cartel de bienvenida. 24h/24 · 7d/7, presupuesto previo.",
      "Traslado aeropuerto Montpellier desde Narbona",
      servicePath("transfert-aeroport-montpellier"),
      "traslado aeropuerto montpellier narbona"
    ),
  },
  "transfert-aeroport-toulouse": {
    fr: meta(
      `VTC aéroport Toulouse depuis Narbonne | ${BRAND}`,
      "Chauffeur privé Narbonne ↔ Toulouse-Blagnac. Suivi des vols, aide bagages, ponctualité. Service 24h/24 · 7j/7, tarif annoncé à l'avance.",
      "VTC aéroport Toulouse depuis Narbonne",
      servicePath("transfert-aeroport-toulouse"),
      "vtc aéroport toulouse narbonne"
    ),
    en: meta(
      `Toulouse Airport VTC from Narbonne | ${BRAND}`,
      "Private chauffeur Narbonne ↔ Toulouse-Blagnac. Flight tracking, luggage help, on time. 24/7 service, fixed quote in advance.",
      "Toulouse airport VTC from Narbonne",
      servicePath("transfert-aeroport-toulouse"),
      "toulouse airport transfer narbonne"
    ),
    es: meta(
      `VTC aeropuerto Toulouse desde Narbona | ${BRAND}`,
      "Chófer privado Narbona ↔ Toulouse-Blagnac. Seguimiento de vuelos, ayuda con equipaje. Servicio 24h/24 · 7d/7, tarifa previa.",
      "VTC aeropuerto Toulouse desde Narbona",
      servicePath("transfert-aeroport-toulouse"),
      "vtc aeropuerto toulouse narbona"
    ),
  },
  "transfert-gare-narbonne": {
    fr: meta(
      `Transfert gare de Narbonne — VTC & chauffeur privé | ${BRAND}`,
      "Prise en charge à domicile vers la gare SNCF de Narbonne ou accueil à l'arrivée. Chauffeur privé 24h/24 · 7j/7, tarif sur devis.",
      "Transfert gare de Narbonne — VTC chauffeur privé",
      servicePath("transfert-gare-narbonne"),
      "transfert gare narbonne"
    ),
    en: meta(
      `Narbonne Station Transfer — Private VTC | ${BRAND}`,
      "Door-to-door pickup to Narbonne SNCF station or meet on arrival. Private chauffeur 24/7, quote on request.",
      "Narbonne station transfer — private VTC",
      servicePath("transfert-gare-narbonne"),
      "narbonne station transfer"
    ),
    es: meta(
      `Traslado estación Narbona — VTC privado | ${BRAND}`,
      "Recogida a domicilio hacia la estación SNCF de Narbona o bienvenida a la llegada. Chófer privado 24h/24 · 7d/7.",
      "Traslado estación de Narbona — VTC privado",
      servicePath("transfert-gare-narbonne"),
      "traslado estación narbona"
    ),
  },
  "longue-distance": {
    fr: meta(
      `VTC longue distance Narbonne — Barcelone, Perpignan… | ${BRAND}`,
      "Trajets longue distance depuis Narbonne : Barcelone, Perpignan, Montpellier, Toulouse. Chauffeur privé confortable, 24h/24 · 7j/7, devis préalable.",
      "VTC longue distance depuis Narbonne",
      servicePath("longue-distance"),
      "vtc longue distance narbonne"
    ),
    en: meta(
      `Long-Distance VTC from Narbonne — Barcelona & more | ${BRAND}`,
      "Long-distance private rides from Narbonne to Barcelona, Perpignan, Montpellier and beyond. Comfortable chauffeur, 24/7, quote in advance.",
      "Long-distance VTC from Narbonne",
      servicePath("longue-distance"),
      "long distance chauffeur narbonne"
    ),
    es: meta(
      `VTC larga distancia Narbona — Barcelona, Perpiñán… | ${BRAND}`,
      "Trayectos larga distancia desde Narbona: Barcelona, Perpiñán, Montpellier. Chófer privado cómodo, 24h/24 · 7d/7, presupuesto previo.",
      "VTC larga distancia desde Narbona",
      servicePath("longue-distance"),
      "vtc larga distancia narbona barcelona"
    ),
  },
  "mise-a-disposition-evenements": {
    fr: meta(
      `Mise à disposition chauffeur Narbonne — mariages & événements | ${BRAND}`,
      "Chauffeur privé à disposition pour mariages, séminaires et événements en Occitanie. Horaires flexibles, 24h/24 · 7j/7, tarif sur devis.",
      "Mise à disposition chauffeur privé à Narbonne",
      servicePath("mise-a-disposition-evenements"),
      "mise à disposition chauffeur narbonne"
    ),
    en: meta(
      `Hourly Chauffeur Hire Narbonne — Weddings & Events | ${BRAND}`,
      "Private chauffeur on standby for weddings, corporate events and occasions in Occitanie. Flexible hours, 24/7, quote on request.",
      "Hourly private chauffeur hire in Narbonne",
      servicePath("mise-a-disposition-evenements"),
      "private chauffeur wedding narbonne"
    ),
    es: meta(
      `Chófer a disposición Narbona — bodas y eventos | ${BRAND}`,
      "Chófer privado a disposición para bodas, seminarios y eventos en Occitania. Horarios flexibles, 24h/24 · 7d/7, presupuesto previo.",
      "Chófer privado a disposición en Narbona",
      servicePath("mise-a-disposition-evenements"),
      "chófer privado boda narbona"
    ),
  },
};

export function getSeoMeta(route: SeoRoute, locale: Locale): SeoMeta {
  switch (route) {
    case "home":
      return home[locale];
    case "services":
      return services[locale];
    case "contact":
      return contact[locale];
    case "mentions":
      return mentions[locale];
    case "privacy":
      return privacy[locale];
    default:
      return servicePages[route][locale];
  }
}

export function getAllSeoRoutes(): SeoRoute[] {
  return [
    "home",
    "services",
    "contact",
    "mentions",
    "privacy",
    ...(Object.keys(servicePages) as ServiceSlug[]),
  ];
}
