import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import StatCounter from "./StatCounter";
import { cn } from "@/utils/cn";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

/** Valeurs marketing fictives, à but de démonstration/portfolio uniquement. */
const stats: Stat[] = [
  { value: 120, suffix: "+", label: "Propriétés sélectionnées" },
  { value: 12, suffix: "+", label: "Années d'expérience" },
  { value: 350, suffix: "+", label: "Clients accompagnés" },
  { value: 95, suffix: "%", label: "Clients satisfaits" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * 2 colonnes sur mobile ET tablette (donc 2×2 dès qu'il y a 4 éléments),
 * 4 colonnes sur desktop. Séparateurs verticaux discrets uniquement en
 * ligne unique (desktop), pour ne pas créer de bordures incohérentes
 * quand la grille passe sur deux lignes.
 */
export default function StatsSection() {
  return (
    <Section background="onyx">
      <motion.div
        className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={item}
            className={cn(
              "text-center lg:text-left",
              index > 0 && "lg:border-l lg:border-ivory-50/10 lg:pl-8"
            )}
          >
            <StatCounter
              value={stat.value}
              suffix={stat.suffix}
              className="font-display text-4xl font-semibold text-ivory-50 sm:text-5xl"
            />
            <p className="mt-2 text-small !text-ivory-300">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
