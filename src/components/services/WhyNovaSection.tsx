import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Compass, Eye, MapPinned, MessagesSquare } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

interface Advantage {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const ADVANTAGES: Advantage[] = [
  {
    id: "personnalisee",
    title: "Approche personnalisée",
    description: "Chaque projet est différent. Notre accompagnement s'adapte à vos objectifs.",
    icon: Compass,
  },
  {
    id: "marche",
    title: "Connaissance du marché",
    description: "Nous nous appuyons sur notre connaissance du marché local pour vous orienter.",
    icon: MapPinned,
  },
  {
    id: "proximite",
    title: "Suivi de proximité",
    description: "Un interlocuteur reste disponible pour répondre à vos questions.",
    icon: MessagesSquare,
  },
  {
    id: "transparence",
    title: "Transparence",
    description: "Nous privilégions des échanges clairs à chaque étape.",
    icon: Eye,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/** 1 colonne (mobile) → 2×2 (tablette) → 4 en ligne (desktop). */
export default function WhyNovaSection() {
  return (
    <Section background="ivory">
      <SectionTitle
        eyebrow="Pourquoi Nova"
        title="Un accompagnement qui va au-delà de la transaction"
        align="center"
        className="mx-auto"
      />

      <motion.div
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {ADVANTAGES.map(({ id, title, description, icon: Icon }) => (
          <motion.div key={id} variants={item} className="h-full rounded-card border border-onyx-900/5 bg-white p-8 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-onyx-50 text-onyx-800">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-6 text-h3">{title}</h3>
            <p className="mt-3 text-body">{description}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
