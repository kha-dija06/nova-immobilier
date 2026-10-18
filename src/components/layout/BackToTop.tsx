import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

/** Distance de scroll (px) à partir de laquelle le bouton apparaît. */
const SHOW_THRESHOLD = 480;

/**
 * Bouton flottant bas-droite. Masqué près du haut de page, apparaît après
 * un scroll significatif. Le scroll fluide est désactivé si l'utilisateur
 * préfère un mouvement réduit (saut instantané à la place).
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let ticking = false;

    const updateVisible = () => {
      setVisible(window.scrollY > SHOW_THRESHOLD);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVisible);
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Retour en haut"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={[
            "fixed bottom-6 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full",
            "bg-onyx-900 text-ivory-50 shadow-card-hover transition-colors hover:bg-onyx-800",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2",
            "sm:bottom-8 sm:right-6",
          ].join(" ")}
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
