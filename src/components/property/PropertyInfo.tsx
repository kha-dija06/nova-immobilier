import { Bath, BedDouble, MapPin, Maximize } from "lucide-react";
import type { Property } from "@/types";
import { formatPrice, formatSurface } from "@/utils/formatters";
import Badge from "@/components/ui/Badge";

export interface PropertyInfoProps {
  property: Property;
}

export default function PropertyInfo({ property }: PropertyInfoProps) {
  const { title, status, price, location, bedrooms, bathrooms, surface } = property;

  return (
    <div>
      <Badge variant={status === "vente" ? "sale" : "rent"} />

      <h1 className="mt-4 text-h1">{title}</h1>

      <p className="mt-2 flex items-center gap-1.5 text-body">
        <MapPin className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
        {location.address ? `${location.address}, ${location.city}` : location.city}
      </p>

      <p className="mt-5 font-display text-3xl font-semibold text-onyx-900">{formatPrice(price, status)}</p>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-onyx-900/5 pt-6 text-body">
        <span className="flex items-center gap-2">
          <Maximize className="h-5 w-5 text-onyx-400" aria-hidden="true" />
          {formatSurface(surface)}
        </span>
        <span className="flex items-center gap-2">
          <BedDouble className="h-5 w-5 text-onyx-400" aria-hidden="true" />
          {bedrooms} chambre{bedrooms > 1 ? "s" : ""}
        </span>
        <span className="flex items-center gap-2">
          <Bath className="h-5 w-5 text-onyx-400" aria-hidden="true" />
          {bathrooms} salle{bathrooms > 1 ? "s" : ""} de bain
        </span>
      </div>
    </div>
  );
}
