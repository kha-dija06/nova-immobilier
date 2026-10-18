import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyInfo from "@/components/property/PropertyInfo";
import PropertyFeatures from "@/components/property/PropertyFeatures";
import PropertyAgent from "@/components/property/PropertyAgent";
import SimilarProperties from "@/components/property/SimilarProperties";
import SEO from "@/components/shared/SEO";
import { properties } from "@/data/properties";
import type { PropertyAgent as Agent } from "@/types";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/** Repli si un bien n'a exceptionnellement pas d'agent assigné en donnée. */
const DEFAULT_AGENT: Agent = {
  id: "nova-team",
  name: "L'équipe Nova Immobilier",
  role: "Conseil immobilier",
};

/**
 * Page: Détail d'un bien (/biens/:slug)
 * Le bien est retrouvé dans les données statiques via son slug. Si aucun
 * bien ne correspond, un état "introuvable" premium est affiché (pas de
 * redirection silencieuse, pas de crash).
 */
export default function PropertyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const property = properties.find((item) => item.slug === slug);

  if (!property) {
    return (
      <Section background="white" className="pb-16 pt-32 lg:pt-40">
        <SEO
          title="Bien immobilier introuvable | NOVA IMMOBILIER"
          description="Cette propriété n'existe pas ou n'est plus disponible. Retrouvez toutes nos propriétés en vente ou en location."
        />
        <EmptyState
          title="Bien immobilier introuvable"
          description="Cette propriété n'existe pas ou n'est plus disponible."
          action={
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/biens" className="w-full sm:w-auto">
                Voir tous les biens
              </Button>
              <Button href="/" variant="outline" className="w-full sm:w-auto">
                Retour à l&rsquo;accueil
              </Button>
            </div>
          }
        />
      </Section>
    );
  }

  return (
    <>
      <SEO
        title={`${property.title} à ${property.location.city} | NOVA IMMOBILIER`}
        description={`Découvrez ${property.title} à ${property.location.city}. Consultez ses caractéristiques, sa surface, son prix et demandez une visite.`}
        image={property.images[0]}
        type="article"
      />
      <Section background="white" className="pt-32 lg:pt-40">
        <motion.div initial="hidden" animate="show" variants={fadeIn}>
          <Link
            to="/biens"
            className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-onyx-600 transition-colors hover:text-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour aux biens
          </Link>

          <div className="mt-6">
            <PropertyGallery images={property.images} title={property.title} />
          </div>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <div className="lg:col-span-2">
            <motion.div variants={fadeIn}>
              <PropertyInfo property={property} />
            </motion.div>

            <motion.div variants={fadeIn} className="mt-10 border-t border-onyx-900/5 pt-10">
              <h2 className="text-h3">À propos de ce bien</h2>
              <p className="mt-4 max-w-2xl text-body">{property.description}</p>
            </motion.div>

            <motion.div variants={fadeIn} className="mt-10 border-t border-onyx-900/5 pt-10">
              <PropertyFeatures features={property.features} />
            </motion.div>
          </div>

          <motion.aside variants={fadeIn} className="lg:col-span-1">
            <div className="flex flex-col gap-6 lg:sticky lg:top-28">
              <PropertyAgent agent={property.agent ?? DEFAULT_AGENT} />

              <div className="rounded-card bg-onyx-900 p-6 sm:p-8">
                <h3 className="text-h3 !text-ivory-50">Ce bien vous intéresse ?</h3>
                <p className="mt-3 text-body !text-ivory-300">
                  Contactez notre équipe pour obtenir plus d&rsquo;informations ou organiser une visite.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button href="/rendez-vous" variant="secondary" className="w-full">
                    Prendre rendez-vous
                  </Button>
                  <Button
                    href="/biens"
                    variant="outline"
                    className="w-full !border-ivory-50/40 !text-ivory-50 hover:!border-ivory-50 hover:!bg-ivory-50/10"
                  >
                    Retour aux biens
                  </Button>
                </div>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      </Section>

      <Section background="ivory">
        <SimilarProperties current={property} properties={properties} />
      </Section>
    </>
  );
}
