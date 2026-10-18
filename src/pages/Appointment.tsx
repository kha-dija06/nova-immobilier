import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import Section from "@/components/ui/Section";
import PageHero from "@/components/shared/PageHero";
import SEO from "@/components/shared/SEO";
import AppointmentForm from "@/components/forms/AppointmentForm";

const REASONS = [
  "Échange personnalisé",
  "Conseil adapté à votre projet",
  "Présentation des opportunités disponibles",
  "Réponse à vos questions",
];

const reveal = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Page: Prendre rendez-vous (/rendez-vous)
 * Formulaire multi-étapes 100% frontend + panneau de réassurance.
 * Aucune demande n'est envoyée nulle part (aucun backend).
 */
export default function Appointment() {
  return (
    <>
      <SEO
        title="Prendre rendez-vous | NOVA IMMOBILIER"
        description="Planifiez un échange avec NOVA IMMOBILIER pour discuter de votre projet immobilier."
      />
      <PageHero
        eyebrow="Rendez-vous"
        title="Planifions un échange autour de votre projet"
        description="Choisissez le type de rendez-vous qui vous convient et partagez-nous quelques informations sur votre projet."
      />

      <Section background="white">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-12">
          <motion.div
            className="min-w-0 lg:col-span-2"
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            <AppointmentForm />
          </motion.div>

          <motion.aside
            className="lg:col-span-1"
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="rounded-card border border-onyx-900/5 bg-ivory-100 p-6 sm:p-8 lg:sticky lg:top-28">
              <h2 className="text-h3">Pourquoi prendre rendez-vous ?</h2>

              <ul className="mt-6 flex flex-col gap-4">
                {REASONS.map((reason) => (
                  <li key={reason} className="flex items-start gap-3 text-body">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                    {reason}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-3 border-t border-onyx-900/5 pt-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-gold-600">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="text-body font-medium text-onyx-900">Durée moyenne : 30 minutes</p>
              </div>
            </div>
          </motion.aside>
        </div>
      </Section>
    </>
  );
}
