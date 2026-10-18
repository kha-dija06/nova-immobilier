import type { TeamMember } from "@/types";
import { getInitials } from "@/utils/formatters";

export interface TeamCardProps {
  member: TeamMember;
}

/**
 * Avatar en initiales (pas d'image, pas d'API externe). Pas d'icônes
 * sociales : l'équipe n'a pas de comptes réels à ce stade, et un lien mort
 * serait pire qu'une carte sans icône.
 */
export default function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="flex h-full flex-col items-center rounded-card border border-onyx-900/5 bg-white p-8 text-center shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full bg-onyx-800 font-display text-xl font-semibold text-ivory-50"
        aria-hidden="true"
      >
        {getInitials(member.name)}
      </div>
      <p className="mt-5 text-base font-semibold text-onyx-900">{member.name}</p>
      <p className="mt-1 text-small">{member.role}</p>
    </div>
  );
}
