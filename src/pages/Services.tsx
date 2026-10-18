import type { LucideIcon } from "lucide-react";
import { Handshake, KeyRound, Search, TrendingUp } from "lucide-react";
import Section from "@/components/ui/Section";
import PageHero from "@/components/shared/PageHero";
import ApproachSection from "@/components/shared/ApproachSection";
import ServiceDetail from "@/components/services/ServiceDetail";
import WhyNovaSection from "@/components/services/WhyNovaSection";
import FinalCta from "@/components/home/FinalCta";
import SEO from "@/components/shared/SEO";
import { services } from "@/data/services";

/** Correspondance nom d'icône (donnée) → composant Lucide, comme dans ServiceCard. */
const ICONS: Record<string, LucideIcon> = { Search, TrendingUp, KeyRound, Handshake };

/**
 * Page: Services (/services)
 * Présentation détaillée des 4 services (ServiceDetail, mise en page
 * alternée) — la page d'accueil ne garde que l'aperçu résumé (ServiceCard).
 * Réutilise ApproachSection (partagé avec la page À propos) et FinalCta.
 */
export default function Services() {
  return (
    <>
      <SEO
        title="Nos services immobiliers | NOVA IMMOBILIER"
        description="Achat, vente, location et conseil immobilier : découvrez les services proposés par NOVA IMMOBILIER."
      />
      <PageHero
        eyebrow="Nos services"
        title="Un accompagnement immobilier de A à Z"
        description="Que vous souhaitiez acheter, vendre, louer ou investir, NOVA IMMOBILIER vous accompagne avec une approche personnalisée et transparente."
      />

      <Section background="white">
        <div className="flex flex-col gap-20 lg:gap-28">
          {services.map((service, index) => (
            <ServiceDetail
              key={service.id}
              service={service}
              icon={ICONS[service.icon ?? ""] ?? Search}
              reverse={index % 2 === 1}
              index={index}
            />
          ))}
        </div>
      </Section>

      <WhyNovaSection />
      <ApproachSection />

      <FinalCta
        eyebrow="Parlons de votre projet"
        title="Prêt à commencer votre projet immobilier ?"
        description="Notre équipe est disponible pour échanger avec vous et comprendre vos besoins."
        secondaryLabel="Nous contacter"
        secondaryHref="/contact"
      />
    </>
  );
}
