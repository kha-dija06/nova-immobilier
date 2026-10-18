import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";

/**
 * Image de Hero (prototype).
 * TODO: remplacer `src` par un asset local une fois disponible, par ex. :
 *   import heroImage from "@/assets/hero-exterior.jpg";
 *   puis utiliser <img src={heroImage} ... />
 * Le reste du composant n'a rien à changer pour ce remplacement.
 */
const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=80",
  alt: "Maison contemporaine avec piscine, façade blanche et grandes baies vitrées",
};

// Orchestration de l'apparition du contenu : chaque enfant direct de
// `container` (eyebrow, titre, sous-titre, CTA, mention rassurante) apparaît
// l'un après l'autre grâce à `staggerChildren`.
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-onyx-900">
      {/* Image de fond avec très léger zoom d'entrée (élégant, non répétitif) */}
      <motion.img
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      />

      {/* Overlay sombre pour garantir la lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/85 via-onyx-950/45 to-onyx-950/30" />

      <div className="relative w-full px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div className="max-w-2xl" variants={container} initial="hidden" animate="show">
            <motion.span variants={item} className="mb-5 block text-eyebrow !text-gold-400">
              Immobilier d&rsquo;exception
            </motion.span>

            <motion.h1
              variants={item}
              className="text-display !text-ivory-50 !text-[2rem] sm:!text-4xl md:!text-5xl lg:!text-[3.5rem]"
            >
              Votre prochain chez-vous commence ici.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xs text-body-lg !text-ivory-200 !text-base sm:max-w-md sm:!text-lg md:max-w-lg lg:max-w-xl"
            >
              Découvrez une sélection de propriétés soigneusement choisies pour répondre à vos
              projets de vie et d&rsquo;investissement.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center">
              <Button
                href="/biens"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
                className="w-full md:w-auto"
              >
                Découvrir nos biens
              </Button>
              <Button
                href="/rendez-vous"
                variant="outline"
                size="lg"
                className="w-full !border-ivory-50/40 !text-ivory-50 hover:!border-ivory-50 hover:!bg-ivory-50/10 md:w-auto"
              >
                Prendre rendez-vous
              </Button>
            </motion.div>

            <motion.p variants={item} className="mt-6 text-small !text-ivory-300">
              Vente&nbsp;•&nbsp;Location&nbsp;•&nbsp;Conseil immobilier
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Mini-card flottante — masquée sous lg pour ne pas nuire à la lisibilité mobile */}
      <motion.div
        className="absolute bottom-28 right-8 hidden max-w-[13rem] rounded-card border border-ivory-50/15 bg-onyx-950/40 p-4 backdrop-blur-md lg:block xl:right-16"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-display text-2xl font-semibold text-ivory-50">120+</p>
        <p className="mt-1 text-small !text-ivory-300">Propriétés sélectionnées avec soin</p>
      </motion.div>

      {/* Indicateur de scroll — masqué sur petit mobile où l'espace vertical
          est trop contraint pour l'ajouter sans risquer de chevaucher le
          contenu ou les CTA. */}
      <motion.div
        className="absolute inset-x-0 bottom-6 hidden flex-col items-center gap-2 sm:flex sm:bottom-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <span className="text-label !text-ivory-300">Découvrir</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-4 w-4 text-ivory-300" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
}
