import type { PropertyAgent as Agent } from "@/types";
import { getInitials } from "@/utils/formatters";
import Button from "@/components/ui/Button";

export interface PropertyAgentProps {
  agent: Agent;
}

/**
 * Carte "Votre conseiller". Avatar en initiales (pas d'image, pas d'API
 * externe). Les boutons pointent vers /rendez-vous et /contact — les
 * formulaires eux-mêmes seront implémentés à une étape ultérieure.
 */
export default function PropertyAgent({ agent }: PropertyAgentProps) {
  return (
    <div className="rounded-card border border-onyx-900/5 bg-white p-6 shadow-card sm:p-8">
      <p className="text-eyebrow">Votre conseiller</p>

      <div className="mt-4 flex items-center gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-onyx-800 font-display text-lg font-semibold text-ivory-50"
          aria-hidden="true"
        >
          {getInitials(agent.name)}
        </div>
        <div>
          <p className="text-base font-semibold text-onyx-900">{agent.name}</p>
          <p className="text-small">{agent.role ?? "Conseiller immobilier"}</p>
        </div>
      </div>

      <p className="mt-5 text-body">
        Je suis à votre disposition pour répondre à vos questions et organiser une visite.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <Button href="/rendez-vous" variant="secondary" className="w-full">
          Prendre rendez-vous
        </Button>
        <Button href="/contact" variant="outline" className="w-full">
          Nous contacter
        </Button>
      </div>
    </div>
  );
}
