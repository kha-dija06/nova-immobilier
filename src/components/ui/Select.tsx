import { forwardRef, useId } from "react";
import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";
import FormField from "./FormField";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  /** Option désactivée affichée quand aucune valeur n'est encore choisie */
  placeholder?: string;
}

/**
 * Liste déroulante native (type de bien, ville, budget dans PropertyFilters...).
 * Style aligné sur Input/Textarea, avec une icône Lucide cohérente
 * (une seule bibliothèque d'icônes dans tout le projet).
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, required, id, className, options, placeholder, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    // N'applique defaultValue qu'en mode non contrôlé : sinon React avertit
    // ("Select contains both value and defaultValue") dès qu'un appelant
    // passe `value` + `onChange` (ex: PropertyFilters).
    const isControlled = props.value !== undefined;

    return (
      <FormField id={selectId} label={label} required={required} error={error} hint={hint}>
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
            {...(isControlled ? {} : { defaultValue: props.defaultValue ?? "" })}
            className={cn(
              "w-full appearance-none rounded-md border bg-white px-4 py-3 pr-10 text-body !text-onyx-900",
              "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold-400/40",
              error ? "border-red-400 focus:border-red-500" : "border-stone-300 focus:border-gold-500",
              "disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
            aria-hidden="true"
          />
        </div>
      </FormField>
    );
  }
);

Select.displayName = "Select";
export default Select;
