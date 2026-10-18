import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/data/testimonials";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/** 1 colonne (mobile) → 2 colonnes (tablette) → 3 colonnes (desktop). */
export default function TestimonialsSection() {
  return (
    <Section background="ivory">
      <SectionTitle
        eyebrow="Témoignages"
        title="Ils nous ont fait confiance"
        description="Découvrez quelques retours de clients ayant choisi NOVA IMMOBILIER pour leurs projets."
        align="center"
        className="mx-auto"
      />

      <motion.div
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {testimonials.map((testimonial) => (
          <motion.div key={testimonial.id} variants={item} className="h-full">
            <TestimonialCard testimonial={testimonial} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
