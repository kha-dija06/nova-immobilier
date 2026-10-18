import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import SEO from "@/components/shared/SEO";

/**
 * Page: Introuvable (route inconnue, catch-all "*")
 * Restait un placeholder non stylé depuis l'étape 0 — corrigé ici pour
 * offrir une vraie sortie (retour accueil / biens) au lieu d'une impasse.
 */
export default function NotFound() {
  return (
    <>
      <SEO
        title="Page introuvable | NOVA IMMOBILIER"
        description="Cette page n'existe pas ou n'est plus disponible. Retrouvez l'accueil ou notre sélection de biens immobiliers."
      />
      <Section background="white" className="flex min-h-[70vh] items-center pb-16 pt-32 lg:pt-40">
        <EmptyState
          title="Page introuvable"
          description="Cette page n'existe pas ou n'est plus disponible."
          action={
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/" className="w-full sm:w-auto">
                Retour à l&rsquo;accueil
              </Button>
              <Button href="/biens" variant="outline" className="w-full sm:w-auto">
                Voir nos biens
              </Button>
            </div>
          }
        />
      </Section>
    </>
  );
}
