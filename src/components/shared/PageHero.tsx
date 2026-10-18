import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Section, { type SectionBackground } from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { cn } from "@/utils/cn";

export interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  background?: SectionBackground;
  className?: string;
  children?: ReactNode;
}

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * En-tête compact réutilisé en haut de chaque page de contenu (Biens, À
 * propos, Services...) — volontairement plus court que le Hero de l'accueil.
 * Le padding-top généreux compense la navbar fixe, non transparente sur ces
 * pages (contrairement à l'accueil).
 */
export default function PageHero({ eyebrow, title, description, background = "ivory", className, children }: PageHeroProps) {
  return (
    <Section background={background} className={cn("pb-12 pt-32 lg:pb-16 lg:pt-40", className)}>
      <motion.div initial="hidden" animate="show" variants={fadeIn}>
        <SectionTitle
          as="h1"
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          className="mx-auto"
        />
        {children}
      </motion.div>
    </Section>
  );
}
