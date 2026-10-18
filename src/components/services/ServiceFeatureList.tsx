import { Check } from "lucide-react";

export interface ServiceFeatureListProps {
  features: string[];
}

export default function ServiceFeatureList({ features }: ServiceFeatureListProps) {
  return (
    <ul className="mt-6 flex flex-col gap-3">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-3 text-body">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
          {feature}
        </li>
      ))}
    </ul>
  );
}
