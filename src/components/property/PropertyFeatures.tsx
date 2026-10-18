import type { LucideIcon } from "lucide-react";
import {
  ArrowUpDown,
  Car,
  CheckCircle2,
  ConciergeBell,
  Dumbbell,
  Eye,
  GraduationCap,
  Home,
  Lightbulb,
  ShieldCheck,
  Sofa,
  Sun,
  Trees,
  Waves,
  Wind,
} from "lucide-react";
import type { PropertyFeature } from "@/types";

export interface PropertyFeaturesProps {
  features: PropertyFeature[];
}

/** Correspondance nom d'icône (donnée) → composant Lucide, avec repli générique. */
const ICONS: Record<string, LucideIcon> = {
  Trees,
  Car,
  Lightbulb,
  ShieldCheck,
  Sun,
  ArrowUpDown,
  Waves,
  Home,
  Sofa,
  Dumbbell,
  Wind,
  ConciergeBell,
  GraduationCap,
  Eye,
};

export default function PropertyFeatures({ features }: PropertyFeaturesProps) {
  if (features.length === 0) return null;

  return (
    <div>
      <h2 className="text-h3">Caractéristiques</h2>
      <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {features.map((feature) => {
          const Icon = ICONS[feature.icon ?? ""] ?? CheckCircle2;
          return (
            <li key={feature.id} className="flex items-center gap-3 text-body">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-onyx-50 text-onyx-700">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              {feature.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
