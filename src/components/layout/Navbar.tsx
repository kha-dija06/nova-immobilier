import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Accueil", to: "/" },
  { label: "Nos biens", to: "/biens" },
  { label: "À propos", to: "/a-propos" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

/** Logo typographique "NOVA / IMMOBILIER" — s'adapte au fond clair ou sombre. */
function Logo({ inverted }: { inverted: boolean }) {
  return (
    <Link to="/" className="flex flex-col leading-none" aria-label="Nova Immobilier — Accueil">
      <span
        className={cn(
          "font-display text-xl font-semibold tracking-tight sm:text-2xl",
          inverted ? "text-ivory-50" : "text-onyx-900"
        )}
      >
        NOVA
      </span>
      <span
        className={cn(
          "text-[0.6rem] font-medium uppercase tracking-[0.35em] sm:text-[0.65rem]",
          inverted ? "text-ivory-200" : "text-gold-600"
        )}
      >
        Immobilier
      </span>
    </Link>
  );
}

/**
 * Navbar principale du site.
 * - Transparente + texte clair uniquement sur la page d'accueil, tant qu'on
 *   n'a pas scrollé (elle repose alors sur le Hero en image de fond).
 * - Fond solide + léger flou + ombre douce dès qu'on scrolle, ou sur toute
 *   page qui n'a pas de Hero plein écran.
 * - Menu mobile animé (Framer Motion), fermeture au clic sur un lien, à
 *   l'Escape, ou en cliquant l'overlay ; scroll du body verrouillé pendant
 *   l'ouverture.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isTransparent = isHomePage && !scrolled;

  // Écoute du scroll, throttlée via requestAnimationFrame pour éviter les
  // re-renders excessifs (un seul setState par frame au maximum).
  useEffect(() => {
    let ticking = false;

    const updateScrolled = () => {
      setScrolled(window.scrollY > 24);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrolled);
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ferme le menu mobile à chaque changement de route (ex: retour navigateur).
  // Pattern React officiel "ajuster l'état pendant le rendu" plutôt qu'un
  // effet : évite un rendu en cascade pour une simple remise à zéro.
  const [lastPathname, setLastPathname] = useState(location.pathname);
  if (location.pathname !== lastPathname) {
    setLastPathname(location.pathname);
    setMobileOpen(false);
  }

  // Verrouille le scroll du body et permet la fermeture avec Escape.
  useEffect(() => {
    if (!mobileOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        isTransparent ? "bg-transparent" : "border-b border-onyx-900/5 bg-ivory-50/95 shadow-sm backdrop-blur-md"
      )}
    >
      <Container size="lg">
        <div className="relative z-50 flex h-20 items-center justify-between">
          <Logo inverted={isTransparent} />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors",
                    isTransparent ? "text-ivory-100 hover:text-ivory-50" : "text-onyx-700 hover:text-onyx-900",
                    isActive && (isTransparent ? "text-ivory-50" : "text-gold-600")
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="/rendez-vous" variant="secondary" size="sm">
              Prendre rendez-vous
            </Button>
          </div>

          {/* Bouton hamburger (mobile / tablette uniquement) */}
          <button
            type="button"
            className={cn(
              "-mr-2 flex items-center justify-center rounded-md p-2 transition-colors lg:hidden",
              isTransparent ? "text-ivory-50" : "text-onyx-900"
            )}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {/* Menu mobile / tablette : overlay + panneau latéral animés */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Couvre tout le viewport, y compris derrière la navbar : bloque
                visuellement le contenu de la page pendant que le menu est ouvert. */}
            <motion.div
              className="fixed inset-0 z-40 bg-onyx-950/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/*
              Panneau : commence sous la barre de navigation (top-20) pour ne
              jamais la recouvrir ni la dupliquer — le logo et le bouton de
              fermeture (X) de la barre du haut restent seuls et visibles
              au-dessus de l'overlay (cf. z-50 sur le top-bar ci-dessus).
              Largeur progressive : pleine largeur sur petit mobile, panneau
              confortable dédié sur tablette (jamais un simple "téléphone
              agrandi").
            */}
            <motion.nav
              id="mobile-menu"
              aria-label="Navigation mobile"
              className={cn(
                "fixed right-0 top-20 bottom-0 z-50 flex w-full flex-col overflow-y-auto",
                "bg-ivory-50 px-6 py-8 shadow-card-hover sm:w-[420px] sm:px-8 md:w-[480px] lg:hidden"
              )}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-1 flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "rounded-md px-3 py-3 text-base font-medium text-onyx-800 transition-colors hover:bg-ivory-200",
                        isActive && "text-gold-700"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              <Button href="/rendez-vous" variant="secondary" className="mt-8 w-full shrink-0">
                Prendre rendez-vous
              </Button>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
