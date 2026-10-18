import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface FormFieldProps {
  id: string;
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Enveloppe interne partagée par Input, Textarea et Select : rend le label,
 * puis le champ, puis un message d'erreur OU d'aide. Non exposée comme
 * composant "public" du design system (pas dans la liste demandée) mais
 * nécessaire pour éviter de dupliquer ce balisage trois fois.
 */
export default function FormField({ id, label, required, error, hint, children, className }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={id} className="text-label text-onyx-800">
          {label}
          {required && (
            <span className="ml-1 text-gold-600" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {children}

      {error ? (
        <p id={`${id}-error`} role="alert" className="text-small !text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-small">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
