import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface SEOProps {
  /** Titre complet de la page, tel qu'il doit apparaître dans l'onglet et les résultats de recherche. */
  title: string;
  description: string;
  /** Image Open Graph / Twitter. Par défaut, l'image du Hero de l'accueil. */
  image?: string;
  type?: "website" | "article";
}

const SITE_NAME = "NOVA IMMOBILIER";

/** Image de repli pour les pages sans visuel dédié plus pertinent (même image que le Hero de l'accueil). */
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80";

function setMetaByName(name: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

/**
 * Met à jour le <title> et les balises meta de la page courante (description,
 * Open Graph, Twitter Card, canonical) à chaque montage/changement de route.
 * Implémentation volontairement légère (pas de react-helmet) : les balises
 * sont recherchées par sélecteur puis mises à jour en place, jamais
 * dupliquées, via un simple effet impératif sur le <head>.
 * Ne rend rien dans le DOM React (composant "effet pur").
 */
export default function SEO({ title, description, image = DEFAULT_IMAGE, type = "website" }: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    const url = `${window.location.origin}${location.pathname}`;

    document.title = title;

    setMetaByName("description", description);
    setCanonical(url);

    setMetaByProperty("og:title", title);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:type", type);
    setMetaByProperty("og:url", url);
    setMetaByProperty("og:image", image);
    setMetaByProperty("og:site_name", SITE_NAME);

    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", title);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", image);
  }, [title, description, image, type, location.pathname]);

  return null;
}
