import { cn } from "@/utils/cn";

export interface SectionTitleProps {
  /** Court libellé accent au-dessus du titre (ex: "NOS SERVICES") */
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Niveau de titre sémantique. `h1` pour l'en-tête d'une page, `h2` (défaut) pour une section. */
  as?: "h1" | "h2";
  className?: string;
}

/**
 * En-tête de section standardisé : eyebrow (accent gold) + titre (display) +
 * description (body). Utilisé en tête de chaque section de contenu du site.
 * Le rendu visuel est identique quel que soit le niveau sémantique choisi.
 */
export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
}: SectionTitleProps) {
  const isCentered = align === "center";

  return (
    <div className={cn("max-w-2xl", isCentered && "mx-auto text-center", className)}>
      {eyebrow && <span className="mb-3 block text-eyebrow">{eyebrow}</span>}
      <Heading className="text-h2">{title}</Heading>
      {description && <p className="mt-4 text-body">{description}</p>}
    </div>
  );
}
