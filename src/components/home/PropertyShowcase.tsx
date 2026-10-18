import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import PropertyGrid from "@/components/property/PropertyGrid";
import CtaBanner from "./CtaBanner";
import { properties } from "@/data/properties";

/** Nombre de biens affichés sur la page d'accueil */
const SHOWCASE_COUNT = 6;

const headerVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Section "Notre sélection" de la page d'accueil : intro + grille de biens
 * en vedette + CTA final vers la prise de rendez-vous.
 */
export default function PropertyShowcase() {
  const featuredProperties = properties.slice(0, SHOWCASE_COUNT);

  return (
    <Section background="ivory">
      <motion.div
        className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={headerVariants}
      >
        <SectionTitle
          eyebrow="Notre sélection"
          title="Des propriétés qui méritent votre attention"
          description="Un aperçu de notre catalogue actuel, entre résidences familiales, villas avec piscine et biens d'investissement."
        />
        <Button
          href="/biens"
          variant="outline"
          icon={<ArrowRight className="h-4 w-4" />}
          iconPosition="right"
          className="w-full shrink-0 sm:w-auto"
        >
          Voir tous les biens
        </Button>
      </motion.div>

      <div className="mt-12 lg:mt-16">
        <PropertyGrid properties={featuredProperties} />
      </div>

      <div className="mt-16 lg:mt-20">
        <CtaBanner />
      </div>
    </Section>
  );
}
