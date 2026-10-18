import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Bath, BedDouble, MapPin, Maximize } from "lucide-react";
import type { Property } from "@/types";
import { formatPrice, formatSurface } from "@/utils/formatters";
import Badge from "@/components/ui/Badge";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

export interface PropertyCardProps {
  property: Property;
}

// Doit partager les clés "hidden"/"show" avec le variants du parent
// (PropertyGrid) pour hériter du stagger sans dépendre de la même référence.
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Card premium pour un bien immobilier. Toute la card est un seul lien
 * cliquable vers /biens/:slug — "Voir le bien" est un indice visuel, pas un
 * second élément interactif imbriqué (accessibilité).
 */
export default function PropertyCard({ property }: PropertyCardProps) {
  const { slug, title, status, price, location, bedrooms, bathrooms, surface, images, shortDescription } = property;

  return (
    <motion.article variants={item} className="h-full">
      <Link
        to={`/biens/${slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-card border border-onyx-900/5 bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2"
      >
        {/* Image — élément visuel principal, léger zoom au survol */}
        <div className="relative aspect-[4/3] overflow-hidden bg-onyx-100">
          <ImageWithFallback
            src={images[0]}
            alt={`${title} — ${location.city}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx-950/20 via-transparent to-transparent" />
          <div className="absolute left-4 top-4">
            <Badge variant={status === "vente" ? "sale" : "rent"} />
          </div>
        </div>

        {/* Informations */}
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div>
            <h3 className="text-h3">{title}</h3>
            <p className="mt-1.5 flex items-center gap-1.5 text-small">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-600" aria-hidden="true" />
              {location.city}
            </p>
          </div>

          {shortDescription && <p className="line-clamp-2 text-small">{shortDescription}</p>}

          <p className="font-display text-xl font-semibold text-onyx-900">{formatPrice(price, status)}</p>

          <div className="flex items-center gap-4 border-t border-onyx-900/5 pt-4 text-small">
            <span className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 text-onyx-400" aria-hidden="true" />
              {bedrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-onyx-400" aria-hidden="true" />
              {bathrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize className="h-4 w-4 text-onyx-400" aria-hidden="true" />
              {formatSurface(surface)}
            </span>
          </div>

          <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-onyx-800 transition-colors group-hover:text-gold-600">
            Voir le bien
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
