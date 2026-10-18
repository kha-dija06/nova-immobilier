import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Handshake, LineChart, MessageCircle, ShieldCheck } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

interface Value {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const VALUES: Value[] = [
  {
    id: "ecoute",
    title: "Écoute",
    description: "Comprendre vos besoins avant de vous proposer une solution.",
    icon: MessageCircle,
  },
  {
    id: "transparence",
    title: "Transparence",
    description: "Des informations claires pour vous permettre de prendre vos décisions en toute sérénité.",
    icon: ShieldCheck,
  },
  {
    id: "expertise",
    title: "Expertise",
    description: "Une connaissance du marché immobilier et une approche adaptée à chaque projet.",
    icon: LineChart,
  },
  {
    id: "engagement",
    title: "Engagement",
    description: "Nous restons à vos côtés à chaque étape de votre projet.",
    icon: Handshake,
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
export default function ValuesSection() {
  return (
    <Section background="ivory">
      <SectionTitle
        eyebrow="Nos valeurs"
        title="Ce qui guide notre façon de travailler"
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
        {VALUES.map(({ id, title, description, icon: Icon }) => (
          <motion.div
            key={id}
            variants={item}
            className="group h-full rounded-card border border-onyx-900/5 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-card-hover motion-reduce:hover:translate-y-0"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-onyx-50 text-onyx-800 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-onyx-950">
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
