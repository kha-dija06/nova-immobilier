import { forwardRef, useId } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import FormField from "./FormField";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

/**
 * Zone de texte multi-lignes (message de ContactForm/AppointmentForm).
 * Même logique visuelle et d'accessibilité que Input, avec une hauteur
 * minimale confortable (4 lignes) par défaut.
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, required, id, className, rows = 4, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    return (
      <FormField id={textareaId} label={label} required={required} error={error} hint={hint}>
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          className={cn(
            "w-full resize-y rounded-md border bg-white px-4 py-3 text-body !text-onyx-900 placeholder:text-stone-400",
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

Textarea.displayName = "Textarea";
export default Textarea;
