import { useState } from "react";
import type { ImgHTMLAttributes } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/utils/cn";

export interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
}

/**
 * <img> avec repli élégant si le chargement échoue (lien rompu, coupure
 * réseau...) : affiche une icône + "Image indisponible" au lieu de l'icône
 * de navigateur cassée par défaut. `className` s'applique aussi bien à
 * l'image qu'au conteneur de repli, pour occuper exactement le même espace.
 */
export default function ImageWithFallback({ alt, className, onError, ...props }: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("flex flex-col items-center justify-center gap-2 bg-onyx-50 text-onyx-400", className)}
      >
        <ImageOff className="h-6 w-6" aria-hidden="true" />
        <span className="text-small">Image indisponible</span>
      </div>
    );
  }

  return (
    <img
      alt={alt}
      className={className}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
      {...props}
    />
  );
}
