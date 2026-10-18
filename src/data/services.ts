import type { Service } from "@/types";

/**
 * Icônes référencées par leur nom Lucide (voir la correspondance dans
 * ServiceCard.tsx et Services.tsx). Reste des données pures — pas de JSX ici.
 *
 * `features`, `ctaLabel`, `ctaHref` et `image` ne sont utilisés que par la
 * page /services (ServiceDetail) ; la card résumée de l'accueil (ServiceCard)
 * ignore ces champs. Une seule source de données pour les deux usages.
 */
export const services: Service[] = [
  {
    id: "achat",
    title: "Achat immobilier",
    description:
      "Nous vous accompagnons dans la recherche et la sélection d'un bien correspondant réellement à vos besoins.",
    icon: "Search",
    features: [
      "Analyse de vos besoins",
      "Sélection des biens",
      "Organisation des visites",
      "Accompagnement dans les démarches",
      "Suivi jusqu'à la finalisation",
    ],
    ctaLabel: "Trouver mon bien",
    ctaHref: "/biens",
    image: {
      src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
      alt: "Villa contemporaine à l'architecture épurée",
    },
  },
  {
    id: "vente",
    title: "Vente de biens",
    description: "Valorisez votre propriété grâce à une stratégie de commercialisation adaptée au marché.",
    icon: "TrendingUp",
    features: [
      "Analyse du bien",
      "Conseil sur le positionnement",
      "Mise en valeur du bien",
      "Diffusion de l'annonce",
      "Accompagnement des visites",
      "Suivi des échanges",
    ],
    ctaLabel: "Parler de mon projet",
    ctaHref: "/rendez-vous",
    image: {
      src: "https://images.unsplash.com/photo-1763909130793-68be9aaa3407?auto=format&fit=crop&w=1400&q=80",
      alt: "Maison familiale avec jardin, prête à être mise en vente",
    },
  },
  {
    id: "location",
    title: "Location",
    description:
      "Découvrez des biens soigneusement sélectionnés pour répondre à vos critères et à votre budget.",
    icon: "KeyRound",
    features: [
      "Recherche selon vos critères",
      "Sélection des biens",
      "Organisation des visites",
      "Accompagnement administratif",
      "Suivi du dossier",
    ],
    ctaLabel: "Voir les biens",
    ctaHref: "/biens",
    image: {
      src: "https://images.unsplash.com/photo-1492138645880-160f6a5136fa?auto=format&fit=crop&w=1400&q=80",
      alt: "Salon lumineux d'un appartement en location",
    },
  },
  {
    id: "conseil",
    title: "Conseil immobilier",
    description:
      "Bénéficiez d'un accompagnement personnalisé pour prendre vos décisions immobilières avec sérénité.",
    icon: "Handshake",
    features: [
      "Analyse du projet",
      "Étude des opportunités",
      "Analyse du marché",
      "Conseils sur le choix du bien",
      "Accompagnement personnalisé",
    ],
    ctaLabel: "Parler à un conseiller",
    ctaHref: "/rendez-vous",
    image: {
      src: "https://images.unsplash.com/photo-1627799048600-ab328d27f853?auto=format&fit=crop&w=1400&q=80",
      alt: "Façade d'un immeuble résidentiel moderne",
    },
  },
];
