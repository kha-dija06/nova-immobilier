import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import Container, { type ContainerSize } from "./Container";

export type SectionBackground = "ivory" | "onyx" | "white" | "transparent";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Fond de la section. `onyx` inverse automatiquement la couleur du texte. */
  background?: SectionBackground;
  containerSize?: ContainerSize;
  children: ReactNode;
}

const backgroundStyles: Record<SectionBackground, string> = {
  ivory: "bg-ivory-100 text-onyx-900",
  onyx: "bg-onyx-900 text-ivory-50",
  white: "bg-white text-onyx-900",
  transparent: "bg-transparent",
};

/**
 * Bloc de section standard : padding vertical généreux (section-padding)
 * + Container intégré. Sert de brique de base à toutes les futures sections
 * de page (Hero excepté, qui a ses propres besoins de mise en page).
 */
export default function Section({
  as: Tag = "section",
  background = "transparent",
  containerSize = "lg",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn("section-padding", backgroundStyles[background], className)} {...props}>
      <Container size={containerSize}>{children}</Container>
    </Tag>
  );
}
