import type { Property } from "@/types";
import SectionTitle from "@/components/ui/SectionTitle";
import PropertyGrid from "./PropertyGrid";

export interface SimilarPropertiesProps {
  current: Property;
  properties: Property[];
}

/**
 * Score chaque bien (hors bien courant) : même ville (+3) > même type (+2) >
 * prix proche à 30% près (+1). Comme TOUS les biens sont scorés puis triés
 * (jamais filtrés), s'il y a moins de 3 vraies correspondances les places
 * restantes se remplissent naturellement avec les biens les mieux notés
 * suivants plutôt que de rester vides.
 */
function getSimilarProperties(current: Property, all: Property[], limit = 3): Property[] {
  const scored = all
    .filter((property) => property.id !== current.id)
    .map((property) => {
      let score = 0;
      if (property.location.city === current.location.city) score += 3;
      if (property.type === current.type) score += 2;
      if (Math.abs(property.price - current.price) / current.price < 0.3) score += 1;
      return { property, score };
    });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((entry) => entry.property);
}

export default function SimilarProperties({ current, properties }: SimilarPropertiesProps) {
  const similar = getSimilarProperties(current, properties);

  if (similar.length === 0) return null;

  return (
    <div>
      <SectionTitle eyebrow="À découvrir aussi" title="Vous pourriez également aimer" />
      <div className="mt-10">
        <PropertyGrid properties={similar} />
      </div>
    </div>
  );
}
