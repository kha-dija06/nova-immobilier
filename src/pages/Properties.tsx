import { useMemo, useState } from "react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import PageHero from "@/components/shared/PageHero";
import SEO from "@/components/shared/SEO";
import PropertyGrid from "@/components/property/PropertyGrid";
import PropertyFilters from "@/components/property/PropertyFilters";
import type { PropertySort } from "@/components/property/PropertyFilters";
import { properties } from "@/data/properties";
import type { Property, PropertyFilters as PropertyFiltersState } from "@/types";

function matchesFilters(property: Property, filters: PropertyFiltersState): boolean {
  if (filters.type && property.type !== filters.type) return false;
  if (filters.status && property.status !== filters.status) return false;
  if (filters.city && property.location.city !== filters.city) return false;
  if (filters.minBedrooms && property.bedrooms < filters.minBedrooms) return false;
  if (filters.minPrice !== undefined && property.price < filters.minPrice) return false;
  if (filters.maxPrice !== undefined && property.price > filters.maxPrice) return false;
  return true;
}

function sortProperties(list: Property[], sort: PropertySort): Property[] {
  const sorted = [...list];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "surface-asc":
      return sorted.sort((a, b) => a.surface - b.surface);
    case "surface-desc":
      return sorted.sort((a, b) => b.surface - a.surface);
    case "relevance":
    default:
      // Mis en avant d'abord, puis les plus récents.
      return sorted.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || Date.parse(b.publishedAt) - Date.parse(a.publishedAt)
      );
  }
}

/**
 * Page: Biens immobiliers (/biens)
 * Filtrage + tri 100% frontend sur les données statiques existantes.
 * PRICE_RANGES importé de PropertyFilters pour ne pas dupliquer les bornes.
 */
export default function Properties() {
  const [filters, setFilters] = useState<PropertyFiltersState>({});
  const [sort, setSort] = useState<PropertySort>("relevance");

  const cities = useMemo(
    () => Array.from(new Set(properties.map((property) => property.location.city))).sort((a, b) => a.localeCompare(b, "fr")),
    []
  );

  const filteredProperties = useMemo(() => {
    const filtered = properties.filter((property) => matchesFilters(property, filters));
    return sortProperties(filtered, sort);
  }, [filters, sort]);

  return (
    <>
      <SEO
        title="Nos biens immobiliers | NOVA IMMOBILIER"
        description="Découvrez notre sélection de maisons, villas, appartements et propriétés à vendre ou à louer."
      />
      <PageHero
        eyebrow="Notre collection"
        title="Découvrez nos propriétés"
        description="Explorez une sélection de propriétés soigneusement choisies pour répondre à différents projets de vie et d'investissement."
      />

      <Section background="white">
        <PropertyFilters
          filters={filters}
          onFiltersChange={setFilters}
          sort={sort}
          onSortChange={setSort}
          cities={cities}
          resultCount={filteredProperties.length}
        />

        <div className="mt-10">
          {filteredProperties.length > 0 ? (
            <PropertyGrid properties={filteredProperties} />
          ) : (
            <EmptyState
              title="Aucun bien ne correspond à vos critères"
              description="Essayez de modifier vos filtres."
              action={
                <Button variant="outline" onClick={() => setFilters({})}>
                  Réinitialiser les filtres
                </Button>
              }
            />
          )}
        </div>
      </Section>
    </>
  );
}
