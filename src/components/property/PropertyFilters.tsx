import type { ChangeEvent } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { PropertyFilters as PropertyFiltersState, PropertyStatus, PropertyType } from "@/types";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export type PropertySort = "relevance" | "price-asc" | "price-desc" | "surface-asc" | "surface-desc";

export const SORT_OPTIONS: { value: PropertySort; label: string }[] = [
  { value: "relevance", label: "Pertinence" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "surface-asc", label: "Surface croissante" },
  { value: "surface-desc", label: "Surface décroissante" },
];

interface PriceRange {
  id: string;
  label: string;
  minPrice?: number;
  maxPrice?: number;
}

/** Bornes adaptées aux prix des données de démonstration actuelles. */
export const PRICE_RANGES: PriceRange[] = [
  { id: "all", label: "Tous les prix" },
  { id: "under-1m", label: "Moins de 1 000 000 MAD", maxPrice: 1000000 },
  { id: "1m-2m", label: "1 000 000 – 2 000 000 MAD", minPrice: 1000000, maxPrice: 2000000 },
  { id: "2m-5m", label: "2 000 000 – 5 000 000 MAD", minPrice: 2000000, maxPrice: 5000000 },
  { id: "over-5m", label: "Plus de 5 000 000 MAD", minPrice: 5000000 },
];

const TYPE_OPTIONS: { value: PropertyType | "all"; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "appartement", label: "Appartement" },
  { value: "villa", label: "Villa" },
  { value: "maison", label: "Maison" },
  { value: "penthouse", label: "Penthouse" },
];

const STATUS_OPTIONS: { value: PropertyStatus | "all"; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "vente", label: "Vente" },
  { value: "location", label: "Location" },
];

const BEDROOMS_OPTIONS = [
  { value: "all", label: "Toutes" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
];

export interface PropertyFiltersProps {
  filters: PropertyFiltersState;
  onFiltersChange: (filters: PropertyFiltersState) => void;
  sort: PropertySort;
  onSortChange: (sort: PropertySort) => void;
  /** Villes disponibles, calculées par la page à partir des données actuelles. */
  cities: string[];
  resultCount: number;
}

/** "3 propriétés disponibles" / "1 propriété disponible" / "0 propriété disponible" */
function formatResultCount(count: number): string {
  return `${count} propriété${count > 1 ? "s" : ""} disponible${count > 1 ? "s" : ""}`;
}

/**
 * Barre de filtres + tri, 100% frontend (React state, aucune librairie).
 * Champs natifs (Select du Design System) : accessibles et clavier-friendly
 * par défaut. S'empile proprement sur mobile grâce à flex-wrap + w-full.
 */
export default function PropertyFilters({
  filters,
  onFiltersChange,
  sort,
  onSortChange,
  cities,
  resultCount,
}: PropertyFiltersProps) {
  const activePriceRangeId =
    PRICE_RANGES.find((range) => range.minPrice === filters.minPrice && range.maxPrice === filters.maxPrice)?.id ??
    "all";

  const hasActiveFilters = Object.values(filters).some((value) => value !== undefined);

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onFiltersChange({ ...filters, type: value === "all" ? undefined : (value as PropertyType) });
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onFiltersChange({ ...filters, status: value === "all" ? undefined : (value as PropertyStatus) });
  };

  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onFiltersChange({ ...filters, city: value === "all" ? undefined : value });
  };

  const handleBedroomsChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onFiltersChange({ ...filters, minBedrooms: value === "all" ? undefined : Number(value) });
  };

  const handlePriceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const range = PRICE_RANGES.find((item) => item.id === event.target.value);
    onFiltersChange({ ...filters, minPrice: range?.minPrice, maxPrice: range?.maxPrice });
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as PropertySort);
  };

  const cityOptions = [{ value: "all", label: "Toutes" }, ...cities.map((city) => ({ value: city, label: city }))];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end gap-4">
        <Select
          label="Type"
          value={filters.type ?? "all"}
          onChange={handleTypeChange}
          options={TYPE_OPTIONS}
          className="w-full sm:w-auto sm:min-w-[9.5rem]"
        />
        <Select
          label="Transaction"
          value={filters.status ?? "all"}
          onChange={handleStatusChange}
          options={STATUS_OPTIONS}
          className="w-full sm:w-auto sm:min-w-[9rem]"
        />
        <Select
          label="Ville"
          value={filters.city ?? "all"}
          onChange={handleCityChange}
          options={cityOptions}
          className="w-full sm:w-auto sm:min-w-[9rem]"
        />
        <Select
          label="Chambres"
          value={filters.minBedrooms?.toString() ?? "all"}
          onChange={handleBedroomsChange}
          options={BEDROOMS_OPTIONS}
          className="w-full sm:w-auto sm:min-w-[8rem]"
        />
        <Select
          label="Budget"
          value={activePriceRangeId}
          onChange={handlePriceChange}
          options={PRICE_RANGES.map((range) => ({ value: range.id, label: range.label }))}
          className="w-full sm:w-auto sm:min-w-[13rem]"
        />

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={() => onFiltersChange({})} className="w-full sm:w-auto">
            Réinitialiser les filtres
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4 border-t border-onyx-900/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-small">
          <SlidersHorizontal className="h-4 w-4 text-onyx-400" aria-hidden="true" />
          {formatResultCount(resultCount)}
        </p>
        <Select
          label="Trier par"
          value={sort}
          onChange={handleSortChange}
          options={SORT_OPTIONS}
          className="w-full sm:w-auto sm:min-w-[13rem]"
        />
      </div>
    </div>
  );
}
