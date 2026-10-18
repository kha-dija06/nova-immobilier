import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Sans ce composant, React Router conserve la position de scroll précédente
 * lors d'une navigation interne (comportement par défaut d'une SPA) : on
 * pourrait arriver sur une nouvelle page déjà scrollé en bas. Monté une
 * seule fois dans App.tsx, à l'intérieur du BrowserRouter.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
