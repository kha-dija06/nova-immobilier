import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

export interface FinalCtaProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Bloc de fermeture réutilisable, utilisé en bas de l'accueil, de la page
 * À propos et de la page Services (contenu différent à chaque fois via
 * props ; les valeurs par défaut reproduisent exactement le CTA original
 * de l'accueil pour ne rien casser côté Home.tsx).
 * Fond onyx + formes décoratives très discrètes (cercles flous), contenues
 * par `overflow-hidden` sur la section pour ne jamais créer de scroll
 * horizontal.
 */
export default function FinalCta({
  eyebrow = "Votre projet commence ici",
  title = "Parlons de votre prochain projet immobilier.",
  description = "Que vous souhaitiez acheter, vendre ou louer, notre équipe est là pour vous accompagner.",
  primaryLabel = "Prendre rendez-vous",
  primaryHref = "/rendez-vous",
  secondaryLabel = "Voir nos biens",
  secondaryHref = "/biens",
}: FinalCtaProps) {
  return (
    <Section background="onyx" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold-500/5 blur-3xl"
      />

      <motion.div
        className="relative mx-auto max-w-2xl text-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.span variants={item} className="text-eyebrow !text-gold-400">
          {eyebrow}
        </motion.span>

        <motion.h2 variants={item} className="mt-4 text-h1 !text-ivory-50">
          {title}
        </motion.h2>

        <motion.p variants={item} className="mt-5 text-body-lg !text-ivory-300">
          {description}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
          <Button href={primaryHref} variant="secondary" size="lg" className="w-full sm:w-auto">
            {primaryLabel}
          </Button>
          <Button
            href={secondaryHref}
            variant="outline"
            size="lg"
            className="w-full !border-ivory-50/40 !text-ivory-50 hover:!border-ivory-50 hover:!bg-ivory-50/10 sm:w-auto"
          >
            {secondaryLabel}
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
}
