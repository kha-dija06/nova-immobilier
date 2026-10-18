import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import ErrorBoundary from "@/components/shared/ErrorBoundary";

/**
 * Layout partagé par toutes les pages publiques du site.
 * Navbar et Footer restent montés en permanence (pas de flash/remount à
 * chaque navigation) ; seul le contenu de la page (<Outlet />) est animé
 * en fondu + léger déplacement vertical au changement de route, via une
 * key sur `location.pathname` limitée à <motion.main> — la transition ne
 * touche donc jamais Navbar ni Footer.
 * ErrorBoundary protège le contenu de page : une erreur de rendu n'emporte
 * jamais la Navbar/le Footer, et se réinitialise automatiquement dès que
 * l'utilisateur navigue ailleurs (même key que la transition).
 */
export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="flex-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </motion.main>
      </AnimatePresence>

      <Footer />
      <BackToTop />
    </div>
  );
}
