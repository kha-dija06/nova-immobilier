import Hero from "@/components/home/Hero";
import PropertyShowcase from "@/components/home/PropertyShowcase";
import AboutSection from "@/components/home/AboutSection";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FinalCta from "@/components/home/FinalCta";
import SEO from "@/components/shared/SEO";

/**
 * Page: Accueil
 * Ordre : Hero → Biens en vedette → À propos → Statistiques → Services →
 * Témoignages → CTA final. Le Footer sera ajouté à une étape ultérieure.
 */
export default function Home() {
  return (
    <>
      <SEO
        title="NOVA IMMOBILIER | Agence immobilière à Rabat"
        description="Découvrez NOVA IMMOBILIER, votre partenaire pour l'achat, la vente, la location et le conseil immobilier à Rabat."
      />
      <Hero />
      <PropertyShowcase />
      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <TestimonialsSection />
      <FinalCta />
    </>
  );
}
