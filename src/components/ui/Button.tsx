import { forwardRef } from "react";
import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  /** Style visuel du bouton. `primary` pour l'action principale d'une page. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icône Lucide optionnelle (ex: <ArrowRight className="h-4 w-4" />) */
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  /**
   * Route interne (react-router) ou URL externe (http/https). Quand elle est
   * fournie, le bouton est rendu comme un lien (<Link> en interne, <a> dans
   * un nouvel onglet en externe) avec exactement le même style visuel qu'un
   * <button> — plutôt que de créer un second composant "ButtonLink" dupliqué.
   */
  href?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const baseStyles = cn(
  "inline-flex items-center justify-center gap-2 rounded-btn font-sans font-medium",
  "transition-all duration-200 ease-out motion-reduce:transition-none motion-reduce:hover:translate-y-0",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-50",
  "disabled:pointer-events-none disabled:opacity-40"
);

const variantStyles: Record<ButtonVariant, string> = {
  // Action principale (ex: "Découvrir nos biens")
  primary: cn(
    "bg-onyx-800 text-ivory-50 shadow-sm",
    "hover:bg-onyx-900 hover:-translate-y-0.5 hover:shadow-card",
    "active:translate-y-0 active:bg-onyx-950"
  ),
  // Action secondaire, mise en avant douce via l'accent gold (ex: "Prendre rendez-vous")
  secondary: cn(
    "bg-gold-500 text-onyx-950 shadow-sm",
    "hover:bg-gold-600 hover:-translate-y-0.5 hover:shadow-card",
    "active:translate-y-0 active:bg-gold-700"
  ),
  // Action moins prioritaire (ex: "En savoir plus")
  outline: cn(
    "border border-onyx-300 bg-transparent text-onyx-800",
    "hover:border-onyx-800 hover:bg-onyx-50",
    "active:bg-onyx-100"
  ),
  // Action discrète (ex: lien d'action dans une card)
  ghost: cn("bg-transparent text-onyx-800", "hover:bg-onyx-100", "active:bg-onyx-200"),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[0.8125rem]",
  md: "px-6 py-3 text-button",
  lg: "px-8 py-4 text-base",
};

/**
 * Bouton réutilisable du design system.
 * 4 variantes (primary/secondary/outline/ghost) x 3 tailles (sm/md/lg).
 * Gère nativement hover / focus-visible / active / disabled et respecte
 * `prefers-reduced-motion` (pas de translation au survol si activé).
 *
 * Avec `href`, rend un <Link> react-router au lieu d'un <button> (même
 * classes, même API) — utile pour les CTA de la Navbar et du Hero.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", icon, iconPosition = "left", href, onClick, className, children, ...props }, ref) => {
    const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

    const content = (
      <>
        {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
      </>
    );

    if (href) {
      // URL externe → vrai lien <a> dans un nouvel onglet ; route interne → <Link> react-router.
      if (/^https?:\/\//.test(href)) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
            {content}
          </a>
        );
      }

      return (
        <Link to={href} className={classes} onClick={onClick}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} onClick={onClick} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
