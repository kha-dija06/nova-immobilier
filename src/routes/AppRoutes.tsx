import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

import Home from "@/pages/Home";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Appointment from "@/pages/Appointment";
import NotFound from "@/pages/NotFound";

/**
 * Table de routage centrale du site.
 * Toutes les pages publiques partagent MainLayout (Navbar + Footer).
 *
 *   /                -> Accueil
 *   /biens           -> Liste des biens immobiliers
 *   /biens/:slug     -> Détail d'un bien
 *   /a-propos        -> À propos de l'agence
 *   /services        -> Services proposés
 *   /contact         -> Formulaire de contact
 *   /rendez-vous     -> Prise de rendez-vous
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/biens" element={<Properties />} />
        <Route path="/biens/:slug" element={<PropertyDetail />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/rendez-vous" element={<Appointment />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
