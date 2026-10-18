import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Accueil", to: "/" },
  { label: "Nos biens", to: "/biens" },
  { label: "À propos", to: "/a-propos" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

/** Toutes pointent vers /services : aucune route par service dédiée n'existe (et n'est pas nécessaire). */
const SERVICE_LINKS = ["Achat immobilier", "Vente de biens", "Location", "Conseil immobilier"];

const linkClasses =
  "rounded-sm text-small !text-ivory-300 transition-colors hover:!text-ivory-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400";

/**
 * Footer global — rendu une seule fois par MainLayout, présent sur toutes
 * les pages publiques. Fond onyx-950 (plus sombre que les autres sections
 * onyx du site) pour ancrer visuellement la fin de page.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-onyx-950 text-ivory-200">
      <Container size="lg">
        {/* CTA compact */}
        <div className="flex flex-col items-start gap-4 border-b border-ivory-50/10 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-ivory-50">Un projet immobilier ?</p>
            <p className="mt-1 text-small !text-ivory-300">Notre équipe est à votre écoute.</p>
          </div>
          <Button href="/rendez-vous" variant="secondary" className="w-full sm:w-auto">
            Prendre rendez-vous
          </Button>
        </div>

        {/* Colonnes : marque · navigation · services · contact */}
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl font-semibold text-ivory-50">NOVA</span>
              <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-gold-400">
                Immobilier
              </span>
            </div>
            <span aria-hidden="true" className="mt-5 block h-px w-10 bg-gold-500" />
            <p className="mt-5 max-w-xs text-small !text-ivory-300">
              Votre partenaire de confiance pour vos projets immobiliers à Rabat et au Maroc.
            </p>
          </div>

          <nav aria-label="Navigation du pied de page">
            <h2 className="text-label !text-ivory-400">Navigation</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Nos services">
            <h2 className="text-label !text-ivory-400">Nos services</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {SERVICE_LINKS.map((label) => (
                <li key={label}>
                  <Link to="/services" className={linkClasses}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-label !text-ivory-400">Nous contacter</h2>
            <ul className="mt-5 flex flex-col gap-3 text-small !text-ivory-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                152 Avenue Mohammed VI, Rabat
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                <a href="tel:+212537000000" className={linkClasses}>
                  +212 5 37 00 00 00
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                <a href="mailto:contact@nova-immobilier.ma" className={linkClasses}>
                  contact@nova-immobilier.ma
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                Du lundi au vendredi, 09:00 – 18:00
              </li>
            </ul>
          </div>
        </div>

        {/* Barre du bas — les liens légaux restent du texte simple : les pages n'existent pas encore */}
        <div className="flex flex-col items-center gap-3 border-t border-ivory-50/10 py-6 text-small !text-ivory-400 sm:flex-row sm:justify-between">
          <p>© {year} NOVA IMMOBILIER. Tous droits réservés.</p>
          <p className="flex items-center gap-3">
            <span>Politique de confidentialité</span>
            <span aria-hidden="true">•</span>
            <span>Mentions légales</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
