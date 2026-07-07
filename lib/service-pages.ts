import type { Locale } from "./i18n";
import type { ServiceSlug } from "./routes";

export type ServicePageFaq = { q: string; a: string };

export type ServicePageContent = {
  overline: string;
  lead: string;
  paragraphs: string[];
  features: string[];
  faq: ServicePageFaq[];
  ctaTitle: string;
  ctaText: string;
  breadcrumbServices: string;
  relatedLinks: { href: ServiceSlug; label: string }[];
  imageAlt: string;
};

const sharedRelated = {
  fr: {
    montpellier: "Transfert aéroport Montpellier",
    toulouse: "Transfert aéroport Toulouse",
    gare: "Transfert gare Narbonne",
    long: "VTC longue distance",
    events: "Mise à disposition événements",
  },
  en: {
    montpellier: "Montpellier airport transfer",
    toulouse: "Toulouse airport transfer",
    gare: "Narbonne station transfer",
    long: "Long-distance VTC",
    events: "Hourly hire for events",
  },
  es: {
    montpellier: "Traslado aeropuerto Montpellier",
    toulouse: "Traslado aeropuerto Toulouse",
    gare: "Traslado estación Narbona",
    long: "VTC larga distancia",
    events: "Chófer a disposición eventos",
  },
} as const;

function relatedFor(
  locale: Locale,
  current: ServiceSlug
): { href: ServiceSlug; label: string }[] {
  const labels = sharedRelated[locale];
  const all: { href: ServiceSlug; label: string }[] = [
    { href: "transfert-aeroport-montpellier", label: labels.montpellier },
    { href: "transfert-aeroport-toulouse", label: labels.toulouse },
    { href: "transfert-gare-narbonne", label: labels.gare },
    { href: "longue-distance", label: labels.long },
    { href: "mise-a-disposition-evenements", label: labels.events },
  ];
  return all.filter((l) => l.href !== current).slice(0, 3);
}

const pages: Record<ServiceSlug, Record<Locale, ServicePageContent>> = {
  "transfert-aeroport-montpellier": {
    fr: {
      overline: "Transfert aéroport",
      lead: "Liaison directe entre Narbonne et l'aéroport Montpellier-Méditerranée (MPL) avec un chauffeur privé VTC, disponible 24h/24 et 7j/7.",
      paragraphs: [
        "Depuis Narbonne, Gruissan, Sigean ou Coursan, VTC MANY assure votre transfert vers l'aéroport Montpellier-Méditerranée en berline confortable. Le trajet dure environ 45 à 55 minutes selon le trafic et le point de prise en charge. Vous bénéficiez d'un horaire adapté à votre vol, avec suivi des horaires en temps réel pour anticiper retards ou avances.",
        "À l'aéroport, votre chauffeur vous accueille en zone dépose avec une pancarte nominative, vous aide avec les bagages et vous conduit directement à votre adresse à Narbonne ou dans les communes alentour. Pour un départ, la prise en charge est organisée avec une marge de sécurité pour arriver sereinement en zone embarquement.",
        "Le tarif est communiqué à l'avance sur devis — aller simple, aller-retour ou navette pour plusieurs passagers. Paiement par carte bancaire ou espèces. Idéal pour les voyages d'affaires, les séjours en Languedoc et les correspondances TGV depuis la gare de Narbonne.",
      ],
      features: [
        "Suivi des vols en temps réel",
        "Accueil pancarte à l'arrivée",
        "Aide bagages incluse",
        "Tarif annoncé sur devis",
        "24h/24 · 7j/7",
      ],
      faq: [
        {
          q: "Combien de temps entre Narbonne et l'aéroport de Montpellier ?",
          a: "Comptez environ 45 à 55 minutes en VTC selon le trafic et votre adresse de prise en charge dans l'agglomération narbonnaise.",
        },
        {
          q: "Proposez-vous un retour aéroport → Narbonne ?",
          a: "Oui, aller simple ou aller-retour. L'heure de prise en charge est ajustée à votre atterrissage avec suivi du vol.",
        },
        {
          q: "Y a-t-il un supplément pour les vols de nuit ?",
          a: "Le tarif est fixé à la réservation selon l'horaire. Contactez-nous pour un devis transparent, sans surprise.",
        },
      ],
      ctaTitle: "Réserver votre transfert Montpellier",
      ctaText: "Indiquez date, heure de vol, adresse de prise en charge et nombre de passagers.",
      breadcrumbServices: "Services",
      relatedLinks: relatedFor("fr", "transfert-aeroport-montpellier"),
      imageAlt: "Chauffeur privé VTC — transfert aéroport Montpellier depuis Narbonne",
    },
    en: {
      overline: "Airport transfer",
      lead: "Direct private VTC ride between Narbonne and Montpellier-Méditerranée Airport (MPL), available 24/7.",
      paragraphs: [
        "From Narbonne, Gruissan, Sigean or Coursan, VTC MANY drives you to Montpellier-Méditerranée Airport in a comfortable sedan. The trip takes roughly 45–55 minutes depending on traffic and pickup location. Pickup time is aligned with your flight, with live schedule tracking for delays or early arrivals.",
        "On arrival, your chauffeur meets you with a name board, helps with luggage and drives you straight to your address in Narbonne or nearby towns. For departures, pickup is planned with a safety margin so you reach the terminal calmly.",
        "The fare is quoted in advance — one-way, return or group shuttle. Card or cash payment. Ideal for business travel, holidays in Languedoc and TGV connections from Narbonne station.",
      ],
      features: [
        "Live flight tracking",
        "Meet & greet on arrival",
        "Luggage assistance",
        "Fixed quote in advance",
        "24/7 availability",
      ],
      faq: [
        {
          q: "How long from Narbonne to Montpellier airport?",
          a: "About 45–55 minutes by private VTC depending on traffic and your pickup address.",
        },
        {
          q: "Do you offer airport → Narbonne returns?",
          a: "Yes, one-way or return. Pickup time follows your landing with flight tracking.",
        },
        {
          q: "Is there a night surcharge?",
          a: "The fare is set when you book. Contact us for a clear quote with no hidden fees.",
        },
      ],
      ctaTitle: "Book your Montpellier transfer",
      ctaText: "Share your flight date, time, pickup address and number of passengers.",
      breadcrumbServices: "Services",
      relatedLinks: relatedFor("en", "transfert-aeroport-montpellier"),
      imageAlt: "Private VTC chauffeur — Montpellier airport transfer from Narbonne",
    },
    es: {
      overline: "Traslado aeropuerto",
      lead: "Conexión directa entre Narbona y el aeropuerto Montpellier-Méditerranée (MPL) con chófer privado VTC, disponible 24h/24 y 7d/7.",
      paragraphs: [
        "Desde Narbona, Gruissan, Sigean o Coursan, VTC MANY le lleva al aeropuerto Montpellier-Méditerranée en berlina confortable. El trayecto dura unos 45–55 minutos según el tráfico y el punto de recogida. El horario se adapta a su vuelo, con seguimiento en tiempo real de retrasos o adelantos.",
        "En el aeropuerto, su chófer le recibe con cartel nominativo, le ayuda con el equipaje y le conduce directamente a su dirección en Narbona o municipios cercanos. Para salidas, la recogida se planifica con margen de seguridad para llegar tranquilo a embarque.",
        "La tarifa se comunica por adelantado — ida, ida y vuelta o shuttle para varios pasajeros. Pago con tarjeta o efectivo. Ideal para viajes de negocios, estancias en Languedoc y conexiones TGV desde la estación de Narbona.",
      ],
      features: [
        "Seguimiento de vuelos",
        "Cartel de bienvenida",
        "Ayuda con equipaje",
        "Tarifa previa",
        "24h/24 · 7d/7",
      ],
      faq: [
        {
          q: "¿Cuánto tarda de Narbona al aeropuerto de Montpellier?",
          a: "Unos 45–55 minutos en VTC según el tráfico y su dirección de recogida.",
        },
        {
          q: "¿Ofrecen vuelta aeropuerto → Narbona?",
          a: "Sí, ida o ida y vuelta. La hora de recogida sigue su aterrizaje con seguimiento del vuelo.",
        },
        {
          q: "¿Hay suplemento nocturno?",
          a: "La tarifa se fija al reservar. Contáctenos para un presupuesto transparente.",
        },
      ],
      ctaTitle: "Reservar traslado Montpellier",
      ctaText: "Indique fecha, hora de vuelo, dirección de recogida y número de pasajeros.",
      breadcrumbServices: "Servicios",
      relatedLinks: relatedFor("es", "transfert-aeroport-montpellier"),
      imageAlt: "Chófer privado VTC — traslado aeropuerto Montpellier desde Narbona",
    },
  },
  "transfert-aeroport-toulouse": {
    fr: {
      overline: "Transfert aéroport",
      lead: "Chauffeur privé VTC entre Narbonne et l'aéroport Toulouse-Blagnac (TLS), pour vols nationaux et internationaux, 24h/24.",
      paragraphs: [
        "Le trajet Narbonne → Toulouse-Blagnac prend environ 1 h 30 à 1 h 45 en conditions normales. VTC MANY planifie votre prise en charge selon l'heure de votre vol, avec une marge pour les embouteillages aux heures de pointe. Vous voyagez en berline climatisée, sans correspondance ni attente de navette.",
        "Pour les arrivées, le chauffeur suit votre vol et vous attend en zone dépose avec pancarte. Bagages aidés, trajet direct vers Narbonne, Gruissan, Béziers ou toute commune de l'Aude. Pour les professionnels, facturation et horaires matinaux ou tardifs sont possibles sur demande.",
        "Tarif annoncé à l'avance sur devis — pas de compteur, pas de surprise. Service disponible de nuit, week-end et jours fériés. Alternative confortable au train avec correspondances, notamment pour les familles et les voyageurs avec bagages volumineux.",
      ],
      features: [
        "Toulouse-Blagnac (TLS)",
        "Suivi vol & ponctualité",
        "Trajet direct sans correspondance",
        "Devis préalable",
        "Nuit & week-end",
      ],
      faq: [
        {
          q: "Durée du trajet Narbonne – Toulouse aéroport ?",
          a: "Environ 1 h 30 à 1 h 45 selon le trafic. Un horaire de prise en charge sécurisé est proposé à la réservation.",
        },
        {
          q: "Pouvez-vous récupérer à Toulouse et déposer à Narbonne ?",
          a: "Oui, dans les deux sens. Indiquez votre numéro de vol pour un suivi précis.",
        },
        {
          q: "Le tarif inclut-il les péages ?",
          a: "Le devis précise ce qui est inclus. Transparence totale avant confirmation.",
        },
      ],
      ctaTitle: "Réserver votre transfert Toulouse",
      ctaText: "Appelez ou envoyez votre demande avec date, vol et adresses.",
      breadcrumbServices: "Services",
      relatedLinks: relatedFor("fr", "transfert-aeroport-toulouse"),
      imageAlt: "Chauffeur privé VTC — transfert aéroport Toulouse depuis Narbonne",
    },
    en: {
      overline: "Airport transfer",
      lead: "Private VTC chauffeur between Narbonne and Toulouse-Blagnac Airport (TLS) for domestic and international flights, 24/7.",
      paragraphs: [
        "The Narbonne → Toulouse-Blagnac ride takes about 1h30–1h45 in normal traffic. VTC MANY schedules pickup based on your flight time, with buffer for rush-hour delays. You travel in an air-conditioned sedan — no connections, no shuttle wait.",
        "On arrival, your chauffeur tracks your flight and waits with a name board. Luggage help included, direct drive to Narbonne, Gruissan, Béziers or anywhere in Aude. Business invoicing and early/late pickups available on request.",
        "Fare quoted in advance — no meter, no surprises. Nights, weekends and bank holidays covered. A comfortable alternative to train connections, especially for families and travellers with heavy luggage.",
      ],
      features: [
        "Toulouse-Blagnac (TLS)",
        "Flight tracking",
        "Direct door-to-door",
        "Quote in advance",
        "Nights & weekends",
      ],
      faq: [
        {
          q: "How long from Narbonne to Toulouse airport?",
          a: "About 1h30–1h45 depending on traffic. A safe pickup time is suggested when you book.",
        },
        {
          q: "Can you pick up in Toulouse and drop off in Narbonne?",
          a: "Yes, both directions. Share your flight number for accurate tracking.",
        },
        {
          q: "Are tolls included?",
          a: "Your quote states what is included. Full transparency before confirmation.",
        },
      ],
      ctaTitle: "Book your Toulouse transfer",
      ctaText: "Call or send your request with date, flight and addresses.",
      breadcrumbServices: "Services",
      relatedLinks: relatedFor("en", "transfert-aeroport-toulouse"),
      imageAlt: "Private VTC — Toulouse airport transfer from Narbonne",
    },
    es: {
      overline: "Traslado aeropuerto",
      lead: "Chófer privado VTC entre Narbona y el aeropuerto Toulouse-Blagnac (TLS), vuelos nacionales e internacionales, 24h/24.",
      paragraphs: [
        "El trayecto Narbona → Toulouse-Blagnac dura unos 1 h 30–1 h 45 en condiciones normales. VTC MANY planifica la recogida según su vuelo, con margen para tráfico en hora punta. Viaje en berlina climatizada, sin transbordos ni espera de shuttle.",
        "A la llegada, el chófer sigue su vuelo y le espera con cartel. Ayuda con equipaje, trayecto directo a Narbona, Gruissan, Béziers o cualquier municipio del Aude. Facturación empresarial y horarios tempranos o tardíos bajo petición.",
        "Tarifa previa por presupuesto — sin taxímetro, sin sorpresas. Servicio de noche, fines de semana y festivos. Alternativa cómoda al tren con transbordos, especialmente para familias y equipaje voluminoso.",
      ],
      features: [
        "Toulouse-Blagnac (TLS)",
        "Seguimiento de vuelo",
        "Puerta a puerta directo",
        "Presupuesto previo",
        "Noche y fin de semana",
      ],
      faq: [
        {
          q: "¿Duración Narbona – aeropuerto Toulouse?",
          a: "Unos 1 h 30–1 h 45 según tráfico. Se propone hora de recogida segura al reservar.",
        },
        {
          q: "¿Recogen en Toulouse y dejan en Narbona?",
          a: "Sí, en ambos sentidos. Indique su número de vuelo para seguimiento preciso.",
        },
        {
          q: "¿Incluye peajes?",
          a: "El presupuesto detalla lo incluido. Transparencia total antes de confirmar.",
        },
      ],
      ctaTitle: "Reservar traslado Toulouse",
      ctaText: "Llame o envíe su solicitud con fecha, vuelo y direcciones.",
      breadcrumbServices: "Servicios",
      relatedLinks: relatedFor("es", "transfert-aeroport-toulouse"),
      imageAlt: "Chófer privado VTC — traslado aeropuerto Toulouse desde Narbona",
    },
  },
  "transfert-gare-narbonne": {
    fr: {
      overline: "Transfert gare",
      lead: "Prise en charge et dépose à la gare SNCF de Narbonne avec chauffeur privé VTC — TGV, TER et correspondances, 24h/24.",
      paragraphs: [
        "La gare de Narbonne est un hub ferroviaire majeur entre Montpellier, Toulouse, Perpignan et Barcelone. VTC MANY assure le lien entre votre domicile, hôtel ou entreprise et les quais, à l'heure exacte de votre train. Fini le stress du stationnement en gare : un seul interlocuteur, un tarif fixé à l'avance.",
        "À l'arrivée d'un TGV ou TER, votre chauffeur vous attend en sortie de gare avec pancarte, même en cas de retard grâce au suivi des horaires SNCF. Trajet direct vers Gruissan, Narbonne centre, Sigean, Coursan ou les zones d'activité de l'Aude.",
        "Service également vers la Gare de l'Occitanie (Béziers) et autres gares de la région sur devis. Idéal pour les navettes domicile-travail, les déplacements médicaux et les transferts vers les aéroports après une correspondance ferroviaire.",
      ],
      features: [
        "Gare SNCF Narbonne",
        "Suivi trains & retards",
        "Accueil pancarte",
        "Domicile ↔ quais",
        "24h/24 · 7j/7",
      ],
      faq: [
        {
          q: "Pouvez-vous me déposer devant la gare avant un TGV ?",
          a: "Oui, prise en charge à domicile avec horaire calculé pour arriver à l'heure sur les quais.",
        },
        {
          q: "Mon train a du retard, que se passe-t-il ?",
          a: "Nous suivons les horaires en temps réel et ajustons l'accueil sans frais cachés si le retard est modéré.",
        },
        {
          q: "Proposez-vous des trajets gare de Béziers ?",
          a: "Oui, vers la Gare de l'Occitanie et autres gares de la région sur devis.",
        },
      ],
      ctaTitle: "Réserver un transfert gare",
      ctaText: "Précisez numéro de train, heure d'arrivée ou de départ et adresse.",
      breadcrumbServices: "Services",
      relatedLinks: relatedFor("fr", "transfert-gare-narbonne"),
      imageAlt: "Chauffeur privé VTC — transfert gare SNCF de Narbonne",
    },
    en: {
      overline: "Station transfer",
      lead: "Pickup and drop-off at Narbonne SNCF station with a private VTC chauffeur — TGV, regional trains and connections, 24/7.",
      paragraphs: [
        "Narbonne station is a major rail hub between Montpellier, Toulouse, Perpignan and Barcelona. VTC MANY links your home, hotel or office to the platforms at the exact time of your train. No parking stress — one contact, fixed quote in advance.",
        "When your TGV or regional train arrives, your chauffeur waits at the exit with a name board, even if delayed thanks to live SNCF tracking. Direct ride to Gruissan, central Narbonne, Sigean, Coursan or business parks in Aude.",
        "We also serve Béziers Occitanie station and other regional stations on quote. Ideal for commutes, medical appointments and airport connections after rail travel.",
      ],
      features: [
        "Narbonne SNCF station",
        "Train delay tracking",
        "Meet & greet",
        "Home ↔ platforms",
        "24/7",
      ],
      faq: [
        {
          q: "Can you drop me at the station before a TGV?",
          a: "Yes — home pickup timed so you reach the platform on schedule.",
        },
        {
          q: "What if my train is delayed?",
          a: "We track live schedules and adjust pickup without hidden fees for moderate delays.",
        },
        {
          q: "Do you cover Béziers station?",
          a: "Yes, Béziers Occitanie and other regional stations on quote.",
        },
      ],
      ctaTitle: "Book a station transfer",
      ctaText: "Share train number, arrival or departure time and address.",
      breadcrumbServices: "Services",
      relatedLinks: relatedFor("en", "transfert-gare-narbonne"),
      imageAlt: "Private VTC chauffeur — Narbonne SNCF station transfer",
    },
    es: {
      overline: "Traslado estación",
      lead: "Recogida y dejada en la estación SNCF de Narbona con chófer privado VTC — TGV, TER y conexiones, 24h/24.",
      paragraphs: [
        "La estación de Narbona es un nudo ferroviario entre Montpellier, Toulouse, Perpiñán y Barcelona. VTC MANY conecta su domicilio, hotel o empresa con los andenes a la hora exacta de su tren. Sin estrés de aparcamiento: un interlocutor, tarifa fijada por adelantado.",
        "A la llegada de un TGV o TER, su chófer le espera en la salida con cartel, incluso con retraso gracias al seguimiento SNCF. Trayecto directo a Gruissan, centro de Narbona, Sigean, Coursan o polígonos del Aude.",
        "También servimos la estación de Béziers Occitania y otras de la región bajo presupuesto. Ideal para desplazamientos diarios, citas médicas y conexiones aeropuerto tras el tren.",
      ],
      features: [
        "Estación SNCF Narbona",
        "Seguimiento de trenes",
        "Cartel de bienvenida",
        "Domicilio ↔ andenes",
        "24h/24 · 7d/7",
      ],
      faq: [
        {
          q: "¿Me dejan en la estación antes de un TGV?",
          a: "Sí, recogida a domicilio con horario calculado para llegar a tiempo al andén.",
        },
        {
          q: "¿Qué pasa si mi tren se retrasa?",
          a: "Seguimos horarios en tiempo real y ajustamos la bienvenida sin costes ocultos.",
        },
        {
          q: "¿Cubren la estación de Béziers?",
          a: "Sí, Béziers Occitania y otras estaciones regionales bajo presupuesto.",
        },
      ],
      ctaTitle: "Reservar traslado estación",
      ctaText: "Indique número de tren, hora de llegada o salida y dirección.",
      breadcrumbServices: "Servicios",
      relatedLinks: relatedFor("es", "transfert-gare-narbonne"),
      imageAlt: "Chófer privado VTC — traslado estación SNCF de Narbona",
    },
  },
  "longue-distance": {
    fr: {
      overline: "Longue distance",
      lead: "Chauffeur privé VTC pour trajets longue distance depuis Narbonne : Barcelone, Perpignan, Montpellier, Toulouse et au-delà.",
      paragraphs: [
        "Au-delà des transferts locaux, VTC MANY organise des trajets longue distance en berline confortable. Le corridor vers Barcelone est particulièrement demandé par les voyageurs espagnols et les professionnels de la région. Durée indicative Narbonne → Barcelone : environ 2 h 30 selon le trafic frontalier.",
        "Chaque longue distance fait l'objet d'un devis personnalisé : horaires de départ, pauses possibles sur autoroute, retour le même jour ou lendemain. Véhicule climatisé, conduite souple, bouteilles d'eau sur demande. Pas de co-voiturage — service exclusif pour vous ou votre groupe.",
        "Autres destinations fréquentes : Perpignan, Carcassonne, Montpellier, Toulouse, Nîmes, Marseille. Tarif annoncé à l'avance, sans compteur. Disponible tôt le matin, tard le soir et les week-ends pour correspondances aéroport ou événements professionnels.",
      ],
      features: [
        "Barcelone & Catalogne",
        "Perpignan & Roussillon",
        "Pauses sur demande",
        "Devis personnalisé",
        "Tôt le matin & nuit",
      ],
      faq: [
        {
          q: "Proposez-vous Narbonne → Barcelone ?",
          a: "Oui, trajet direct sur devis. Durée indicative 2 h 30, selon trafic et point de dépose en Catalogne.",
        },
        {
          q: "Peut-on faire une pause sur l'autoroute ?",
          a: "Oui, pauses possibles sur demande lors de la réservation.",
        },
        {
          q: "Y a-t-il un minimum de kilomètres ?",
          a: "Contactez-nous avec votre itinéraire : nous confirmons disponibilité et tarif transparent.",
        },
      ],
      ctaTitle: "Demander un devis longue distance",
      ctaText: "Décrivez départ, destination, date et nombre de passagers.",
      breadcrumbServices: "Services",
      relatedLinks: relatedFor("fr", "longue-distance"),
      imageAlt: "Chauffeur privé VTC longue distance — Narbonne vers Barcelone et Occitanie",
    },
    en: {
      overline: "Long distance",
      lead: "Private VTC chauffeur for long-distance trips from Narbonne: Barcelona, Perpignan, Montpellier, Toulouse and beyond.",
      paragraphs: [
        "Beyond local rides, VTC MANY arranges long-distance trips in a comfortable sedan. The Barcelona corridor is popular with Spanish visitors and regional professionals. Indicative time Narbonne → Barcelona: about 2h30 depending on border traffic.",
        "Each long trip gets a tailored quote: departure time, optional motorway breaks, same-day or next-day return. Air-conditioned car, smooth driving, water on request. No ride-sharing — exclusive service for you or your group.",
        "Other frequent destinations: Perpignan, Carcassonne, Montpellier, Toulouse, Nîmes, Marseille. Fare quoted in advance, no meter. Early mornings, late nights and weekends for airport connections or business events.",
      ],
      features: [
        "Barcelona & Catalonia",
        "Perpignan & Roussillon",
        "Breaks on request",
        "Tailored quote",
        "Early & late hours",
      ],
      faq: [
        {
          q: "Do you offer Narbonne → Barcelona?",
          a: "Yes, direct trip on quote. About 2h30 indicative, depending on traffic and drop-off in Catalonia.",
        },
        {
          q: "Can we take a break on the motorway?",
          a: "Yes, breaks available when you book.",
        },
        {
          q: "Is there a minimum distance?",
          a: "Contact us with your route — we confirm availability and a clear fare.",
        },
      ],
      ctaTitle: "Request a long-distance quote",
      ctaText: "Describe departure, destination, date and passengers.",
      breadcrumbServices: "Services",
      relatedLinks: relatedFor("en", "longue-distance"),
      imageAlt: "Private VTC long-distance chauffeur — Narbonne to Barcelona and Occitanie",
    },
    es: {
      overline: "Larga distancia",
      lead: "Chófer privado VTC para trayectos larga distancia desde Narbona: Barcelona, Perpiñán, Montpellier, Toulouse y más.",
      paragraphs: [
        "Más allá de los trayectos locales, VTC MANY organiza viajes larga distancia en berlina confortable. El corredor hacia Barcelona es muy solicitado por visitantes españoles y profesionales de la región. Duración indicativa Narbona → Barcelona: unos 2 h 30 según tráfico fronterizo.",
        "Cada trayecto largo tiene presupuesto personalizado: hora de salida, pausas en autopista, vuelta el mismo día o al día siguiente. Vehículo climatizado, conducción suave, agua bajo petición. Sin compartir — servicio exclusivo para usted o su grupo.",
        "Otros destinos frecuentes: Perpiñán, Carcasona, Montpellier, Toulouse, Nîmes, Marsella. Tarifa previa, sin taxímetro. Disponible temprano, tarde y fines de semana para conexiones aeropuerto o eventos.",
      ],
      features: [
        "Barcelona y Cataluña",
        "Perpiñán y Rosellón",
        "Pausas bajo petición",
        "Presupuesto personalizado",
        "Madrugada y noche",
      ],
      faq: [
        {
          q: "¿Ofrecen Narbona → Barcelona?",
          a: "Sí, trayecto directo bajo presupuesto. Unos 2 h 30 indicativos según tráfico.",
        },
        {
          q: "¿Podemos parar en la autopista?",
          a: "Sí, pausas posibles al reservar.",
        },
        {
          q: "¿Hay distancia mínima?",
          a: "Contáctenos con su ruta: confirmamos disponibilidad y tarifa clara.",
        },
      ],
      ctaTitle: "Solicitar presupuesto larga distancia",
      ctaText: "Describa salida, destino, fecha y pasajeros.",
      breadcrumbServices: "Servicios",
      relatedLinks: relatedFor("es", "longue-distance"),
      imageAlt: "Chófer privado VTC larga distancia — Narbona hacia Barcelona y Occitania",
    },
  },
  "mise-a-disposition-evenements": {
    fr: {
      overline: "Mise à disposition",
      lead: "Chauffeur privé à disposition pour mariages, séminaires, soirées et événements en Occitanie — horaires flexibles, 24h/24.",
      paragraphs: [
        "Pour un mariage à Narbonne, Gruissan ou dans le Minervois, VTC MANY met un chauffeur et une berline à votre service pour la durée convenue : transfert des mariés, navette invités aller-retour, retour tard dans la nuit. Discrétion, élégance et ponctualité au rendez-vous.",
        "Les entreprises et organisateurs d'événements peuvent réserver une mise à disposition à l'heure ou à la journée : salons, séminaires, déplacements multi-sites, accueil VIP gare ou aéroport. Un interlocuteur unique simplifie la logistique.",
        "Circuits touristiques personnalisés possibles : cité de Carcassonne, vignobles du Minervois, plages de Gruissan. Tarif sur devis selon durée et kilométrage. Service disponible week-end, jours fériés et de nuit pour vos événements en Occitanie.",
      ],
      features: [
        "Mariages & cérémonies",
        "Séminaires & salons",
        "Navettes invités",
        "À l'heure ou journée",
        "Occitanie & Aude",
      ],
      faq: [
        {
          q: "Proposez-vous des navettes mariage ?",
          a: "Oui, navettes aller-retour pour invités entre lieu de cérémonie, réception et hébergements.",
        },
        {
          q: "Peut-on réserver plusieurs heures consécutives ?",
          a: "Oui, à l'heure ou à la demi-journée/journée. Devis selon durée et itinéraire.",
        },
        {
          q: "Intervenez-vous hors Narbonne ?",
          a: "Oui, dans toute l'Occitanie sur réservation préalable.",
        },
      ],
      ctaTitle: "Réserver une mise à disposition",
      ctaText: "Décrivez votre événement, dates, horaires et nombre de trajets.",
      breadcrumbServices: "Services",
      relatedLinks: relatedFor("fr", "mise-a-disposition-evenements"),
      imageAlt: "Chauffeur privé VTC — mise à disposition mariage et événement Narbonne",
    },
    en: {
      overline: "Hourly hire",
      lead: "Private chauffeur on standby for weddings, seminars, evenings and events in Occitanie — flexible hours, 24/7.",
      paragraphs: [
        "For a wedding in Narbonne, Gruissan or the Minervois, VTC MANY provides chauffeur and sedan for the agreed duration: bridal transfers, guest shuttles, late-night returns. Discretion, elegance and punctuality guaranteed.",
        "Companies and event planners can book hourly or full-day hire: trade shows, seminars, multi-site trips, VIP station or airport welcome. One point of contact simplifies logistics.",
        "Custom tourist circuits available: Carcassonne citadel, Minervois vineyards, Gruissan beaches. Quote based on duration and mileage. Weekends, bank holidays and nights covered across Occitanie.",
      ],
      features: [
        "Weddings & ceremonies",
        "Seminars & trade shows",
        "Guest shuttles",
        "Hourly or full day",
        "Occitanie & Aude",
      ],
      faq: [
        {
          q: "Do you offer wedding shuttles?",
          a: "Yes, return shuttles for guests between ceremony, reception and hotels.",
        },
        {
          q: "Can I book several consecutive hours?",
          a: "Yes, hourly or half/full day. Quote based on duration and route.",
        },
        {
          q: "Do you work outside Narbonne?",
          a: "Yes, across Occitanie with advance booking.",
        },
      ],
      ctaTitle: "Book hourly chauffeur hire",
      ctaText: "Describe your event, dates, times and number of trips.",
      breadcrumbServices: "Services",
      relatedLinks: relatedFor("en", "mise-a-disposition-evenements"),
      imageAlt: "Private VTC chauffeur — hourly hire for weddings and events in Narbonne",
    },
    es: {
      overline: "A disposición",
      lead: "Chófer privado a disposición para bodas, seminarios, eventos y noches en Occitania — horarios flexibles, 24h/24.",
      paragraphs: [
        "Para una boda en Narbona, Gruissan o el Minervois, VTC MANY pone chófer y berlina a su servicio: traslado de novios, shuttle de invitados, regreso tarde. Discreción, elegancia y puntualidad.",
        "Empresas y organizadores pueden reservar por horas o jornada completa: ferias, seminarios, desplazamientos multi-sede, bienvenida VIP estación o aeropuerto. Un solo interlocutor simplifica la logística.",
        "Circuitos turísticos personalizados: ciudadela de Carcasona, viñedos del Minervois, playas de Gruissan. Presupuesto según duración y kilómetros. Fines de semana, festivos y noches en toda Occitania.",
      ],
      features: [
        "Bodas y ceremonias",
        "Seminarios y ferias",
        "Shuttle invitados",
        "Por horas o día",
        "Occitania y Aude",
      ],
      faq: [
        {
          q: "¿Ofrecen shuttle para bodas?",
          a: "Sí, ida y vuelta para invitados entre ceremonia, banquete y alojamiento.",
        },
        {
          q: "¿Se pueden reservar varias horas seguidas?",
          a: "Sí, por horas o media/jornada completa. Presupuesto según duración.",
        },
        {
          q: "¿Trabajan fuera de Narbona?",
          a: "Sí, en toda Occitania con reserva previa.",
        },
      ],
      ctaTitle: "Reservar chófer a disposición",
      ctaText: "Describa su evento, fechas, horarios y número de trayectos.",
      breadcrumbServices: "Servicios",
      relatedLinks: relatedFor("es", "mise-a-disposition-evenements"),
      imageAlt: "Chófer privado VTC — disposición bodas y eventos Narbona",
    },
  },
};

export function getServicePageContent(
  slug: ServiceSlug,
  locale: Locale
): ServicePageContent {
  return pages[slug][locale];
}

export const SERVICE_PAGE_IMAGES: Record<ServiceSlug, string> = {
  "transfert-aeroport-montpellier":
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
  "transfert-aeroport-toulouse":
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
  "transfert-gare-narbonne": "/assets/images/gare-narbonne.png",
  "longue-distance": "/assets/images/longue-distance.png",
  "mise-a-disposition-evenements":
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
};
