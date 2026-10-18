import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import FormField from "./FormField";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

/**
 * Champ de texte standard (ContactForm, AppointmentForm, SearchBar...).
 * Génère automatiquement un id accessible si aucun n'est fourni, relie
 * label/erreur via aria-describedby, et distingue visuellement l'état
 * d'erreur et l'état disabled.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, required, id, className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <FormField id={inputId} label={label} required={required} error={error} hint={hint}>
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={cn(
            "w-full rounded-md border bg-white px-4 py-3 text-body !text-onyx-900 placeholder:text-stone-400",
            "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold-400/40",
            error ? "border-red-400 focus:border-red-500" : "border-stone-300 focus:border-gold-500",
            "disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400",
            className
          )}
          {...props}
        />
      </FormField>
    );
  }
);

Input.displayName = "Input";
export default Input;
