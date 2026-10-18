/**
 * Types métiers liés aux biens immobiliers.
 * Consommés par : PropertyCard, PropertyGrid, PropertyFilters, PropertyInfo,
 * les pages Properties / PropertyDetail, et data/properties.ts.
 */

/** Type de transaction proposé pour le bien */
export type PropertyStatus = "vente" | "location";

/** Catégorie du bien */
export type PropertyType =
  | "appartement"
  | "maison"
  | "villa"
  | "penthouse"
  | "studio"
  | "loft"
  | "terrain"
  | "local-commercial"
  | "bureau";

/** Une caractéristique / équipement du bien (ex: "Piscine", "Garage", "Balcon") */
export interface PropertyFeature {
  id: string;
  label: string;
  /** Nom d'icône Lucide React associé (ex: "Waves", "Car", "Trees") */
  icon?: string;
}

/** Localisation du bien */
export interface PropertyLocation {
  address?: string;
  city: string;
  postalCode?: string;
  country?: string;
  /** Coordonnées pour une future intégration carte */
  latitude?: number;
  longitude?: number;
}

/** Coordonnées d'un agent en charge du bien (référence légère vers l'équipe) */
export interface PropertyAgent {
  id: string;
  name: string;
  /** Ex: "Conseillère immobilière" */
  role?: string;
  avatar?: string;
  phone?: string;
  email?: string;
}

/** Entité principale : un bien immobilier */
export interface Property {
  id: string;
  /** Slug utilisé dans l'URL /biens/:slug */
  slug: string;
  title: string;
  type: PropertyType;
  status: PropertyStatus;

  /** Prix en euros. Pour une location, il s'agit du loyer mensuel. */
  price: number;
  /** Charges mensuelles (uniquement pertinent pour les locations) */
  charges?: number;

  location: PropertyLocation;

  bedrooms: number;
  bathrooms: number;
  /** Surface habitable en m² */
  surface: number;
  /** Surface du terrain en m² (optionnel, pertinent pour maisons/villas/terrains) */
  landSurface?: number;
  /** Nombre d'étages */
  floors?: number;
  /** Année de construction */
  yearBuilt?: number;

  /** URLs ou chemins d'images. La première image est utilisée comme image principale. */
  images: string[];

  description: string;
  /** Résumé court utilisé dans les cartes (PropertyCard) */
  shortDescription?: string;

  features: PropertyFeature[];
  agent?: PropertyAgent;

  /** Mis en avant sur la page d'accueil */
  featured: boolean;
  /** Date de publication (ISO 8601) */
  publishedAt: string;
}

/** Filtres applicables depuis PropertyFilters / SearchBar */
export interface PropertyFilters {
  status?: PropertyStatus;
  type?: PropertyType;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minSurface?: number;
}
