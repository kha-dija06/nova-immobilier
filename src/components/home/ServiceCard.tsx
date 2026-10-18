import type { LucideIcon } from "lucide-react";
import { ArrowRight, Handshake, KeyRound, Search, TrendingUp } from "lucide-react";
import type { Service } from "@/types";

export interface ServiceCardProps {
  service: Service;
}

/** Correspondance nom d'icône (donnée) → composant Lucide. */
const ICONS: Record<string, LucideIcon> = {
  Search,
  TrendingUp,
  KeyRound,
  Handshake,
};

/**
 * Card de service, pilotée par les données (voir data/services.ts).
 * Pas de lien réel pour l'instant : la page Services n'est pas encore
 * implémentée (hors périmètre de cette étape) — "En savoir plus" est un
 * indice visuel, pas un lien mort.
 */
export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = ICONS[service.icon ?? ""] ?? Search;

  return (
    <div className="group h-full rounded-card border border-onyx-900/5 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-card-hover motion-reduce:hover:translate-y-0">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-onyx-50 text-onyx-800 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-onyx-950">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <h3 className="mt-6 text-h3">{service.title}</h3>
      <p className="mt-3 text-body">{service.description}</p>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-onyx-800 transition-colors group-hover:text-gold-600">
        En savoir plus
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
          aria-hidden="true"
        />
      </span>
    </div>
  );
}
