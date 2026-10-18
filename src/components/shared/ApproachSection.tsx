import { motion } from "framer-motion";
import Section, { type SectionBackground } from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

export interface ApproachSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  background?: SectionBackground;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  { number: "01", title: "Écouter", description: "Nous commençons par comprendre votre projet, vos besoins et vos priorités." },
  { number: "02", title: "Analyser", description: "Nous étudions les opportunités et les caractéristiques du marché." },
  { number: "03", title: "Accompagner", description: "Nous vous guidons dans les différentes étapes de votre projet." },
  { number: "04", title: "Concrétiser", description: "Nous vous accompagnons jusqu'à la réalisation de votre objectif." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * 4 étapes du processus d'accompagnement. Timeline horizontale sur desktop
 * (ligne de connexion fine derrière les pastilles numérotées), verticale sur
 * mobile (ligne à gauche des pastilles) — aucune librairie de timeline,
 * juste deux divs positionnées en absolu.
 * Réutilisée telle quelle par la page À propos et la page Services.
 */
export default function ApproachSection({
  eyebrow = "Notre approche",
  title = "Un accompagnement simple et structuré",
  description,
  background = "white",
}: ApproachSectionProps) {
  return (
    <Section background={background}>
      <SectionTitle eyebrow={eyebrow} title={title} description={description} align="center" className="mx-auto" />

      <div className="relative mt-14 lg:mt-16">
        {/* Ligne de connexion verticale (mobile) */}
        <div aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-px bg-onyx-900/10 lg:hidden" />
        {/* Ligne de connexion horizontale (desktop), au centre des pastilles */}
        <div aria-hidden="true" className="absolute left-0 right-0 top-6 hidden h-px bg-onyx-900/10 lg:block" />

        <motion.div
          className="relative grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {STEPS.map((step) => (
            <motion.div key={step.number} variants={item} className="relative flex gap-4 lg:flex-col lg:gap-0">
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-onyx-900/10 bg-white font-display text-sm font-semibold text-gold-600 shadow-card">
                {step.number}
              </div>
              <div className="lg:mt-5">
                <h3 className="text-h3">{step.title}</h3>
                <p className="mt-2 text-body">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
