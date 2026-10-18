import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export type BadgeVariant = "sale" | "rent" | "exclusive" | "new" | "favorite";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

// Uniquement onyx / gold / ivory : les badges restent dans la palette
// de la marque plutôt que d'introduire des couleurs sémantiques (vert, rouge...).
const variantStyles: Record<BadgeVariant, string> = {
  sale: "bg-onyx-800 text-ivory-50",
  rent: "bg-gold-500 text-onyx-950",
  exclusive: "border border-gold-400 bg-ivory-50 text-gold-700",
  new: "border border-onyx-300 bg-ivory-50 text-onyx-700",
  favorite: "bg-gold-100 text-gold-800",
};

const defaultLabels: Record<BadgeVariant, string> = {
  sale: "À vendre",
  rent: "À louer",
  exclusive: "Exclusivité",
  new: "Nouveau",
  favorite: "Coup de cœur",
};

/**
 * Badge premium pour les biens immobiliers (à poser sur PropertyCard).
 * `children` est optionnel : sans contenu, le libellé français par défaut
 * de la variante est utilisé.
 */
export default function Badge({ variant = "new", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-label uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children ?? defaultLabels[variant]}
    </span>
  );
}
