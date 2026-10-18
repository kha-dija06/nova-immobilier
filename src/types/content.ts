/**
 * Types transverses pour les autres sections du site.
 * Restent volontairement simples : ils seront affinés quand on construira
 * chaque page (Équipe, Témoignages, Services, Contact, Rendez-vous).
 */

/** Membre de l'équipe affiché dans TeamCard / page À propos */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo?: string;
  bio?: string;
  email?: string;
  phone?: string;
}

/** Avis client affiché dans TestimonialCard */
export interface Testimonial {
  id: string;
  author: string;
  role?: string;
  content: string;
  rating: number; // 1 à 5
  avatar?: string;
}

/** Image associée à un service (page /services uniquement) */
export interface ServiceImage {
  src: string;
  alt: string;
}

/** Service proposé par l'agence, affiché dans ServiceCard / page Services */
export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string; // nom d'icône Lucide React
  /** Champs détaillés utilisés uniquement par la page /services (ServiceDetail) */
  features?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  image?: ServiceImage;
}

/** Données du formulaire de contact (page Contact) */
export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/** Type de projet choisi à l'étape 1 du formulaire de rendez-vous */
export type AppointmentProjectType = "acheter" | "vendre" | "louer" | "investir" | "conseil";

/** Mode du rendez-vous : dans les bureaux ou à distance */
export type AppointmentMode = "agence" | "visio";

/** Données du formulaire de prise de rendez-vous (page Rendez-vous) */
export interface AppointmentFormData {
  projectType?: AppointmentProjectType;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime?: string;
  mode?: AppointmentMode;
  propertyId?: string; // rendez-vous lié à un bien précis, optionnel
  message?: string;
}
