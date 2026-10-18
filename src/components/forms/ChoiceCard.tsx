import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { cn } from "@/utils/cn";

export interface ChoiceCardProps {
  /** Nom du groupe radio (toutes les cartes d'un même choix partagent le même) */
  name: string;
  value: string;
  icon: LucideIcon;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  /** "stacked" : icône au-dessus du texte · "inline" : icône à gauche */
  layout?: "stacked" | "inline";
}

/**
 * Carte de sélection premium reposant sur un vrai <input type="radio">
 * masqué visuellement (sr-only) : navigation clavier (flèches), regroupement
 * et annonce lecteur d'écran natifs. L'état sélectionné combine bordure,
 * fond ET une coche visible — jamais la couleur seule.
 * Les <span> (et non des <div>) respectent le contenu autorisé dans un <label>.
 */
export default function ChoiceCard({
  name,
  value,
  icon: Icon,
  title,
  description,
  selected,
  onSelect,
  layout = "stacked",
}: ChoiceCardProps) {
  return (
    <label className="relative block cursor-pointer">
      <input type="radio" name={name} value={value} checked={selected} onChange={onSelect} className="peer sr-only" />

      <span
        className={cn(
          "flex h-full rounded-card border p-5 transition-all duration-200 sm:p-6",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-gold-400 peer-focus-visible:ring-offset-2",
          layout === "stacked" ? "flex-col items-start gap-3" : "items-start gap-4",
          selected ? "border-gold-500 bg-gold-50/60 shadow-card" : "border-onyx-900/10 bg-white hover:border-onyx-300"
        )}
      >
        {selected && (
          <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-onyx-950">
            <Check className="h-3 w-3" aria-hidden="true" />
          </span>
        )}

        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-onyx-50 text-onyx-800">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>

        <span className="block pr-6">
          <span className="block text-base font-semibold text-onyx-900">{title}</span>
          <span className="mt-1 block text-small">{description}</span>
        </span>
      </span>
    </label>
  );
}
