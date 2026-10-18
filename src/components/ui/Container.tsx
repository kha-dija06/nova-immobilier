import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

export type ContainerSize = "sm" | "md" | "lg" | "full";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Balise HTML à utiliser (div par défaut, utile pour <header>, <article>...) */
  as?: ElementType;
  /** sm: contenu texte/formulaires · md: contenu intermédiaire · lg: grilles larges */
  size?: ContainerSize;
  children: ReactNode;
}

const sizeStyles: Record<ContainerSize, string> = {
  sm: "max-w-3xl", // ~768px — formulaires, texte long
  md: "max-w-5xl", // ~1024px — contenu intermédiaire
  lg: "max-w-7xl", // ~1280px — grilles de biens, sections larges
  full: "max-w-none",
};

/**
 * Garantit une largeur maximale cohérente et des marges latérales
 * responsives (mobile 1rem → desktop 2.5rem). Le contenu n'est jamais
 * collé aux bords de l'écran.
 */
export default function Container({ as: Tag = "div", size = "lg", className, children, ...props }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeStyles[size], className)} {...props}>
      {children}
    </Tag>
  );
}
