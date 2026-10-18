import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Bandeau CTA de fin de section — invite à prendre contact avec un
 * conseiller. Redirige vers /rendez-vous (la page de prise de rendez-vous
 * complète sera construite à une étape ultérieure).
 */
export default function CtaBanner() {
  return (
    <motion.div
      className="flex flex-col items-start gap-6 rounded-card bg-onyx-900 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={cardVariants}
    >
      <div className="max-w-xl">
        <h3 className="text-h3 !text-ivory-50">Vous recherchez un bien particulier ?</h3>
        <p className="mt-3 text-body !text-ivory-300">
          Notre équipe vous accompagne pour trouver une propriété adaptée à votre projet.
        </p>
      </div>

      <Button href="/rendez-vous" variant="secondary" size="lg" className="w-full shrink-0 lg:w-auto">
        Parler à un conseiller
      </Button>
    </motion.div>
  );
}
