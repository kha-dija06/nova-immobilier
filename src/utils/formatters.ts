/**
 * Fonctions utilitaires transverses.
 */
import type { Property } from "@/types";

/**
 * Formate un prix en MAD selon le statut du bien :
 * - vente    → "2 450 000 MAD"
 * - location → "12 000 MAD / mois"
 */
export function formatPrice(price: number, status: Property["status"]): string {
  const formatted = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(price);

  return status === "location" ? `${formatted} MAD / mois` : `${formatted} MAD`;
}

/** Formate une surface en m² (ex: "120 m²") */
export function formatSurface(surface: number): string {
  return `${surface} m²`;
}

/** Initiales à partir d'un nom (ex: "Sarah M." → "SM"), pour un avatar élégant sans image. */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
