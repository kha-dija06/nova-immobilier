type ClassValue = string | number | boolean | null | undefined;

/**
 * Fusionne des classes Tailwind conditionnelles en une seule chaîne,
 * en ignorant les valeurs falsy (false, undefined, null, "").
 * Évite d'ajouter une dépendance externe (clsx) pour un besoin aussi simple.
 *
 * @example cn("px-4", isActive && "bg-gold-500", error && "border-red-500")
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter((value) => typeof value === "string" && value.length > 0).join(" ");
}
