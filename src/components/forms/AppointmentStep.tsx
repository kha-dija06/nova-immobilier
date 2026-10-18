import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export interface AppointmentStepProps {
  title: string;
  description?: string;
  /**
   * Déplace le focus sur le titre à l'apparition de l'étape, pour que les
   * utilisateurs clavier / lecteurs d'écran atterrissent sur le nouveau
   * contenu au lieu de rester sur un bouton qui vient de disparaître.
   */
  autoFocusHeading?: boolean;
  children: ReactNode;
}

export default function AppointmentStep({ title, description, autoFocusHeading = false, children }: AppointmentStepProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (autoFocusHeading) headingRef.current?.focus({ preventScroll: true });
  }, [autoFocusHeading]);

  return (
    <div>
      <h2 ref={headingRef} tabIndex={-1} className="text-h3 focus:outline-none focus-visible:ring-0">
        {title}
      </h2>
      {description && <p className="mt-2 text-body">{description}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}
