import type { Testimonial } from "@/types";

/** Témoignages fictifs à but de démonstration/portfolio uniquement. */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    author: "Sarah M.",
    role: "Achat immobilier",
    content:
      "Une équipe à l'écoute et très professionnelle. J'ai été accompagnée à chaque étape de mon projet avec beaucoup de sérieux.",
    rating: 5,
  },
  {
    id: "t2",
    author: "Youssef B.",
    role: "Vente d'un appartement",
    content:
      "NOVA IMMOBILIER a su comprendre mon besoin et m'accompagner efficacement jusqu'à la finalisation de la vente.",
    rating: 5,
  },
  {
    id: "t3",
    author: "Amine R.",
    role: "Location",
    content: "Une expérience simple et rassurante. Les échanges étaient clairs et le suivi vraiment appréciable.",
    rating: 5,
  },
];
