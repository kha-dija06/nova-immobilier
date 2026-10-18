import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

/**
 * Image de la section À propos (prototype).
 * TODO: remplacer par un asset local une fois disponible, par ex. :
 *   import aboutImage from "@/assets/about-office.jpg";
 * Même convention que Hero.tsx et les images de PropertyCard.
 */
const ABOUT_IMAGE = {
  src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80",
  alt: "Maquette de maison et documents sur un bureau, symbole de conseil immobilier",
};

const imageVariants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const textVariants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function AboutSection() {
  return (
    <Section background="white">
      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="relative"
          variants={imageVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="overflow-hidden rounded-card">
            <ImageWithFallback
              src={ABOUT_IMAGE.src}
              alt={ABOUT_IMAGE.alt}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/10] lg:aspect-[4/5]"
            />
          </div>

          {/* Carte flottante — offset réduit sur mobile pour rester dans le viewport */}
          <motion.div
            className="absolute -bottom-4 -right-4 max-w-[10.5rem] rounded-card border border-onyx-900/5 bg-ivory-50 p-5 shadow-card-hover sm:-bottom-6 sm:-right-6 sm:max-w-[13rem] sm:p-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display text-xl font-semibold text-onyx-900 sm:text-2xl">Depuis 2012</p>
            <p className="mt-1 text-small">Une expertise locale</p>
          </motion.div>
        </motion.div>

        <motion.div variants={textVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <span className="text-eyebrow">À propos de Nova</span>
          <h2 className="mt-3 text-h2">Une expertise immobilière au service de vos projets</h2>
          <p className="mt-6 text-body">
            NOVA IMMOBILIER accompagne ses clients dans leurs projets d&rsquo;achat, de vente et de location avec une
            approche fondée sur l&rsquo;écoute, la transparence et une parfaite connaissance du marché.
          </p>
          <p className="mt-4 text-body">
            Notre objectif est simple&nbsp;: vous aider à prendre les bonnes décisions et transformer chaque projet
            immobilier en une expérience claire, sereine et réussie.
          </p>
          <Button
            href="/a-propos"
            variant="outline"
            icon={<ArrowRight className="h-4 w-4" />}
            iconPosition="right"
            className="mt-8 w-full sm:w-auto"
          >
            Découvrir notre histoire
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
