import type { ReactNode } from "react";
import { SearchX } from "lucide-react";
import { cn } from "@/utils/cn";

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

/**
 * État vide générique et premium — utilisé ici pour "aucun bien ne
 * correspond à la recherche", réutilisable pour d'autres listes futures
 * (aucun résultat de recherche, aucun favori, etc.).
 */
export default function EmptyState({ title, description, action, icon, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center rounded-card border border-onyx-900/5 bg-white px-6 py-16 text-center", className)}>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-onyx-50 text-onyx-400">
        {icon ?? <SearchX className="h-6 w-6" aria-hidden="true" />}
      </div>
      <h3 className="mt-6 text-h3">{title}</h3>
      {description && <p className="mt-3 max-w-md text-body">{description}</p>}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
