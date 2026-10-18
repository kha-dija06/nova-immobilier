import type { Config } from "tailwindcss";

/**
 * DESIGN SYSTEM — NOVA IMMOBILIER
 * ================================
 * Ce fichier est la source de vérité de l'identité visuelle du site.
 *
 * PALETTE (3 familles de couleurs, volontairement restreintes) :
 * - `onyx`  : couleur sombre principale (charbon/anthracite quasi-noir).
 *             Utilisée pour les headings, la navbar, le footer, les boutons
 *             primaires. Évoque la solidité, le sérieux, le premium.
 * - `ivory` : couleur claire / ivoire chaud. Utilisée comme fond principal
 *             des sections, cartes et formulaires. Plus douce qu'un blanc pur.
 * - `gold`  : couleur accent raffinée (bronze/laiton mat, jamais un jaune vif).
 *             Réservée aux éléments qui doivent attirer l'attention avec retenue :
 *             CTA secondaires, focus, badges, eyebrows, liens actifs.
 *
 * Pour les textes neutres et les bordures, on s'appuie sur le gris chaud
 * natif de Tailwind (`stone`) plutôt que d'ajouter une 4e palette custom :
 * il s'harmonise naturellement avec ivory/gold et limite le nombre de
 * couleurs à mémoriser (cf. contrainte "éviter les couleurs trop nombreuses").
 *
 * TYPOGRAPHIE :
 * - `font-display` (Fraunces) : serif élégant à fort caractère, réservé aux
 *   titres (Hero, H1, H2, H3) pour l'impression "agence haut de gamme".
 * - `font-sans` (Inter) : sans-serif très lisible pour le corps de texte,
 *   les labels, les boutons et les formulaires.
 * Les tailles sémantiques (display/h1/h2/h3/body/small/label) sont exposées
 * comme classes utilitaires réutilisables dans src/index.css
 * (.text-display, .text-h1, etc.) pour garder une hiérarchie cohérente
 * partout dans le site.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    // Repères responsive du design system :
    // mobile 320px+ (défaut) · tablet 768px (md) · desktop 1024px (lg) · large desktop 1280px (xl)
    extend: {
      colors: {
        onyx: {
          50: "#F1F2F3",
          100: "#E1E3E5",
          200: "#C4C8CB",
          300: "#A0A6AB",
          400: "#767D84",
          500: "#565D64",
          600: "#40464B",
          700: "#2E3236",
          800: "#202225", // navbar / footer / boutons primaires
          900: "#16171A", // texte des titres sur fond clair
          950: "#0B0C0D",
        },
        ivory: {
          50: "#FFFEFC", // fond principal du site
          100: "#FBF9F4", // fond des sections alternées
          200: "#F6F1E8", // fond des cartes
          300: "#EEE6D6",
          400: "#E2D5B9",
        },
        gold: {
          50: "#FAF6EC",
          100: "#F3E8CE", // fond badge "Coup de cœur"
          200: "#E6CD9C",
          300: "#D8B06D",
          400: "#C99848", // anneaux de focus
          500: "#B3823A", // accent principal (CTA secondaire, liens actifs)
          600: "#93692D",
          700: "#745225", // texte accent sur fond clair (contraste AA)
          800: "#593F1E",
          900: "#443118",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
      },
      // Rayons de bordure sémantiques utilisés par les cards et boutons
      borderRadius: {
        card: "1rem",
        btn: "0.625rem",
      },
      // Ombres douces et premium (jamais dures ni saturées)
      boxShadow: {
        card: "0 2px 10px -2px rgba(11,12,13,0.08)",
        "card-hover": "0 20px 40px -12px rgba(11,12,13,0.20)",
      },
      // Container centré avec marges progressives selon la largeur d'écran
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "2.5rem",
        },
      },
      // Animations discrètes pour les cas hors Framer Motion (ex: apparition CSS pure)
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out both",
        "slide-up": "slideUp 0.6s ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
