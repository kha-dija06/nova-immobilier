import { motion } from "framer-motion";
import type { Property } from "@/types";
import PropertyCard from "./PropertyCard";

export interface PropertyGridProps {
  properties: Property[];
}

// Orchestration du stagger : chaque PropertyCard (qui déclare ses propres
// variants "hidden"/"show") apparaît l'une après l'autre.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/**
 * Grille responsive de biens immobiliers.
 * 1 colonne (mobile) → 2 colonnes (tablette, dès 640px) → 3 colonnes (desktop, dès 1024px).
 * L'animation ne se joue qu'une fois, quand la grille entre dans le viewport.
 */
export default function PropertyGrid({ properties }: PropertyGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </motion.div>
  );
}
