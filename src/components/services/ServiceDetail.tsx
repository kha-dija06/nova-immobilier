import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import ServiceFeatureList from "./ServiceFeatureList";

export interface ServiceDetailProps {
  service: Service;
  icon: LucideIcon;
  /** true → contenu à gauche / image à droite (alterne visuellement la page) */
  reverse?: boolean;
  /** Utilisé pour le numéro "Service 01", "Service 02"... */
  index: number;
}

function getVariants(fromLeft: boolean) {
  return {
    hidden: { opacity: 0, x: fromLeft ? -24 : 24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };
}

/**
 * Un service = une image et un bloc de contenu (titre, description, liste
 * de fonctionnalités, CTA). `reverse` inverse l'ordre en colonnes desktop
 * pour éviter que les 4 services se ressemblent tous (cf. instructions).
 */
export default function ServiceDetail({ service, icon: Icon, reverse = false, index }: ServiceDetailProps) {
  const { title, description, features, ctaLabel, ctaHref, image } = service;
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <motion.div
        className={cn("relative", reverse && "lg:order-2")}
        variants={getVariants(!reverse)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {image && (
          <div className="overflow-hidden rounded-card">
            <ImageWithFallback
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/10]"
            />
          </div>
        )}
      </motion.div>

      <motion.div
        className={cn(reverse && "lg:order-1")}
        variants={getVariants(reverse)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-onyx-50 text-onyx-800">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>

        <p className="mt-4 text-eyebrow">Service {number}</p>
        <h2 className="mt-2 text-h2">{title}</h2>
        <p className="mt-4 text-body">{description}</p>

        {features && features.length > 0 && <ServiceFeatureList features={features} />}

        {ctaLabel && ctaHref && (
          <Button
            href={ctaHref}
            variant="outline"
            icon={<ArrowRight className="h-4 w-4" />}
            iconPosition="right"
            className="mt-8 w-full sm:w-auto"
          >
            {ctaLabel}
          </Button>
        )}
      </motion.div>
    </div>
  );
}
