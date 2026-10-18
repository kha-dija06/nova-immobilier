import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

export interface StatCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Anime un nombre de 0 à `value` quand il entre dans le viewport.
 * Utilise uniquement les utilitaires déjà exposés par framer-motion
 * (`animate`, `useInView`, `useReducedMotion`) — aucune dépendance ajoutée.
 * Si l'utilisateur préfère un mouvement réduit, la valeur finale s'affiche
 * directement, sans décompte animé.
 */
export default function StatCounter({ value, suffix = "", duration = 1.4, className }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, value, duration, prefersReducedMotion]);

  // Mouvement réduit : la valeur finale s'affiche directement (dérivée au
  // rendu, jamais via setState dans l'effet) dès que l'élément est visible.
  const shown = isInView ? (prefersReducedMotion ? value : display) : 0;

  return (
    <span ref={ref} className={className}>
      {shown}
      {suffix}
    </span>
  );
}
