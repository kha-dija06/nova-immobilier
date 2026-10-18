import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "./ServiceCard";
import { services } from "@/data/services";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/** 1 colonne (mobile) → 2×2 (tablette) → 4 en ligne (desktop). */
export default function ServicesSection() {
  return (
    <Section background="white">
      <SectionTitle
        eyebrow="Nos services"
        title="Un accompagnement à chaque étape"
        description="De la recherche de votre futur bien à la finalisation de votre projet, notre équipe vous accompagne avec une approche personnalisée."
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
        {services.map((service) => (
          <motion.div key={service.id} variants={item} className="h-full">
            <ServiceCard service={service} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
