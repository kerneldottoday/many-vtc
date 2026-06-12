const CATEGORIES = {
  cours_locales: "Courses locales",
  transferts: "Transferts",
  longue_distance: "Longue distance",
  mise_disposition: "Mise à disposition",
  evenements: "Événements",
  business: "Business",
};

const IMAGES = {
  fallback: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80",
  hero: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80",
  narbonne: "assets/cities/narbonne.png",
  montpellier: "assets/cities/montpellier.png",
  beziers: "assets/cities/beziers.png",
  beziersPro: "assets/cities/beziers-pro.png",
  atelier: "https://images.unsplash.com/photo-1544627661-8a4f2d5c6e3b?w=1200&q=80",
  cuisine: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
  dressing: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80",
  mobilier: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
  bureau: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80",
  boutique: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
  escalier: "https://images.unsplash.com/photo-1511919886586-0d5d8a2e4b0c?w=1200&q=80",
  wood: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80",
  detail: "https://images.unsplash.com/photo-1549317661-8d8fcc2e4a56?w=1200&q=80",
};

const PROJECTS = [
  {
    slug: "course-narbonne-centre",
    titre: "Course Narbonne centre",
    categorie: "cours_locales",
    annee: 2025,
    lieu: "Narbonne",
    type_client: "Particulier",
    surface: "Trajet court",
    featured: true,
    image: IMAGES.narbonne,
    description_courte:
      "Déplacement en ville : domicile, gare, hôpital ou rendez-vous professionnel à Narbonne.",
    description: [
      "Many VTC assure vos courses quotidiennes à Narbonne et dans les communes proches. Prise en charge à l'adresse de votre choix, trajet direct et tarif communiqué avant le départ.",
      "Idéal pour un rendez-vous médical, un déplacement professionnel ou un transfert vers la gare SNCF de Narbonne.",
      "Disponible 7j/7, y compris les jours fériés, selon réservation.",
    ],
    materiaux: ["Berline confort", "Prise en charge à domicile", "Tarif annoncé à l'avance", "Paiement CB ou espèces"],
    galerie: [IMAGES.narbonne, IMAGES.wood, IMAGES.hero],
  },
  {
    slug: "transfert-aeroport-montpellier",
    titre: "Aéroport Montpellier",
    categorie: "transferts",
    annee: 2025,
    lieu: "Montpellier",
    type_client: "Particulier",
    surface: "~75 km",
    featured: true,
    image: IMAGES.montpellier,
    description_courte:
      "Transfert Narbonne ↔ Aéroport Montpellier-Méditerranée, avec suivi des horaires de vol.",
    description: [
      "Départ de Narbonne ou des alentours vers l'aéroport de Montpellier-Méditerranée. Many adapte l'horaire de prise en charge à votre vol ou à votre train de correspondance.",
      "Accueil personnalisé à l'arrivée avec pancarte, aide pour les bagages, attente incluse en cas de retard avion.",
      "Tarif fixe annoncé lors de la réservation, sans surprise à l'arrivée.",
    ],
    materiaux: ["Suivi des vols", "Accueil pancarte", "Bagages inclus", "Aller simple ou retour"],
    galerie: [IMAGES.montpellier, IMAGES.wood, IMAGES.detail],
  },
  {
    slug: "transfert-gare-beziers",
    titre: "Gare de Béziers",
    categorie: "transferts",
    annee: 2025,
    lieu: "Béziers",
    type_client: "Particulier",
    surface: "~35 km",
    featured: true,
    image: IMAGES.beziers,
    description_courte: "Transfert Narbonne ↔ Gare SNCF de Béziers Saint-Achiul, ponctuel et confortable.",
    description: [
      "Liaison régulière entre Narbonne et la gare TGV de Béziers. Prise en charge à domicile, à l'hôtel ou directement en gare.",
      "Many connaît les accès et les créneaux de pointe pour vous garantir une arrivée sereine avant votre train.",
      "Possibilité de réserver un retour à l'heure de votre choix.",
    ],
    materiaux: ["Gare SNCF", "Correspondance TGV", "Horaire adapté", "Retour sur demande"],
    galerie: [IMAGES.beziers, IMAGES.wood, IMAGES.detail, IMAGES.hero],
  },
  {
    slug: "trajet-professionnel-beziers",
    titre: "Déplacement pro Béziers",
    categorie: "business",
    annee: 2024,
    lieu: "Béziers",
    type_client: "Professionnel",
    surface: "Aller-retour",
    featured: false,
    image: IMAGES.beziersPro,
    description_courte: "Trajet professionnel Narbonne ↔ Béziers pour rendez-vous clients ou sites d'entreprise.",
    description: [
      "Many accompagne les professionnels de l'Aude pour leurs déplacements vers Béziers, Montpellier ou Perpignan.",
      "Conduite souple, discrétion et ponctualité pour vos rendez-vous d'affaires.",
      "Facturation simplifiée sur demande pour les entreprises et indépendants.",
    ],
    materiaux: ["Discrétion", "Ponctualité", "Facturation pro", "Aller-retour"],
    galerie: [IMAGES.beziersPro, IMAGES.wood, IMAGES.detail],
  },
  {
    slug: "mariage-gruissan",
    titre: "Mariage Gruissan",
    categorie: "evenements",
    annee: 2024,
    lieu: "Gruissan",
    type_client: "Événement",
    surface: "Demi-journée",
    featured: false,
    image: IMAGES.boutique,
    description_courte: "Mise à disposition pour un mariage : navettes invités et retour en soirée.",
    description: [
      "Many assure les transferts d'invités entre Narbonne, Gruissan et le lieu de réception.",
      "Navettes aller-retour, horaires flexibles jusqu'à tard dans la nuit, coordination avec le traiteur ou le lieu.",
      "Un seul interlocuteur pour simplifier l'organisation de votre événement.",
    ],
    materiaux: ["Navettes invités", "Horaires flexibles", "Soirée incluse", "Coordination sur site"],
    galerie: [IMAGES.boutique, IMAGES.wood, IMAGES.detail],
  },
  {
    slug: "circuit-minervois",
    titre: "Circuit Minervois",
    categorie: "mise_disposition",
    annee: 2024,
    lieu: "Minervois",
    type_client: "Tourisme",
    surface: "Journée",
    featured: false,
    image: IMAGES.escalier,
    description_courte: "Mise à disposition d'une journée pour découvrir le Minervois et ses domaines viticoles.",
    description: [
      "Many vous conduit à votre rythme à travers le Minervois : villages, caves, points de vue et dégustations.",
      "Itinéraire personnalisé selon vos envies, arrêts photos et pauses quand vous le souhaitez.",
      "Idéal pour une journée découverte sans se soucier de la route ou du stationnement.",
    ],
    materiaux: ["Journée complète", "Itinéraire sur mesure", "Arrêts libres", "Conseils locaux"],
    galerie: [IMAGES.escalier, IMAGES.wood, IMAGES.detail],
  },
];

const TESTIMONIALS = [
  {
    citation:
      "Ponctuel et professionnel pour mes transferts vers Montpellier. Le tarif est annoncé à l'avance, c'est rassurant.",
    auteur: "Client professionnel",
    date: "Narbonne",
  },
  {
    citation:
      "Many m'a conduit en soirée après un dîner à Gruissan. Discret, véhicule propre, retour sans stress.",
    auteur: "Cliente particulière",
    date: "Gruissan",
  },
];

function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}

function getProjectIndex(slug) {
  return PROJECTS.findIndex((p) => p.slug === slug);
}

function getAdjacentProjects(slug) {
  const i = getProjectIndex(slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length],
    next: PROJECTS[(i + 1) % PROJECTS.length],
  };
}
