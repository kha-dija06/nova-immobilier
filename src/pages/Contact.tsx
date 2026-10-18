import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import PageHero from "@/components/shared/PageHero";
import SEO from "@/components/shared/SEO";
import ContactForm from "@/components/forms/ContactForm";

interface ContactInfoItem {
  icon: LucideIcon;
  label: string;
  lines: string[];
  href?: string;
}

/** Coordonnées fictives à but de démonstration/portfolio uniquement. */
const CONTACT_INFO: ContactInfoItem[] = [
  { icon: MapPin, label: "Adresse", lines: ["152 Avenue Mohammed VI, Rabat"] },
  { icon: Phone, label: "Téléphone", lines: ["+212 5 37 00 00 00"], href: "tel:+212537000000" },
  { icon: Mail, label: "Email", lines: ["contact@nova-immobilier.ma"], href: "mailto:contact@nova-immobilier.ma" },
  { icon: Clock, label: "Horaires", lines: ["Lundi – Vendredi : 09:00 – 18:00", "Samedi : 09:00 – 13:00"] },
];

/**
 * Simple lien vers la recherche Google Maps (format d'URL public, sans clé
 * d'API ni SDK) — ce n'est pas une intégration de carte, juste un lien.
 */
const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "152 Avenue Mohammed VI, Rabat, Maroc"
)}`;

const reveal = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Page: Contact (/contact)
 * 100% frontend : le formulaire valide et simule un envoi, mais n'envoie
 * rien nulle part (aucun backend, aucun service d'email).
 */
export default function Contact() {
  return (
    <>
      <SEO
        title="Contact | NOVA IMMOBILIER"
        description="Contactez NOVA IMMOBILIER pour toute question concernant votre projet immobilier à Rabat."
      />
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet immobilier"
        description="Une question, un projet ou simplement besoin d'un conseil ? Notre équipe est à votre écoute."
      />

      <Section background="white">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Coordonnées + localisation */}
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <h2 className="text-h3">Nos coordonnées</h2>

            <ul className="mt-8 flex flex-col gap-6">
              {CONTACT_INFO.map(({ icon: Icon, label, lines, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-onyx-50 text-onyx-800">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-label">{label}</p>
                    {lines.map((line) =>
                      href ? (
                        <a
                          key={line}
                          href={href}
                          className="mt-1 block rounded-sm text-body font-medium text-onyx-900 transition-colors hover:text-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="mt-1 text-body text-onyx-900">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Carte de localisation statique — aucune API de carte */}
            <div className="relative mt-10 overflow-hidden rounded-card bg-onyx-900 p-8 sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-500/10 blur-3xl"
              />
              <div className="relative">
                <MapPin className="h-8 w-8 text-gold-400" aria-hidden="true" />
                <p className="mt-6 font-display text-xl font-semibold text-ivory-50">NOVA IMMOBILIER</p>
                <p className="mt-1 text-body !text-ivory-300">Rabat, Maroc</p>
                <p className="text-body !text-ivory-300">152 Avenue Mohammed VI</p>
                <Button
                  href={DIRECTIONS_URL}
                  variant="outline"
                  size="sm"
                  className="mt-6 w-full !border-ivory-50/40 !text-ivory-50 hover:!border-ivory-50 hover:!bg-ivory-50/10 sm:w-auto"
                >
                  Voir l&rsquo;itinéraire
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="h-fit rounded-card border border-onyx-900/5 bg-white p-6 shadow-card sm:p-8"
          >
            <ContactForm />
          </motion.div>
        </div>
      </Section>
    </>
  );
}
