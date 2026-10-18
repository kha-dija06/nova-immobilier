import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import PageHero from "@/components/shared/PageHero";
import ApproachSection from "@/components/shared/ApproachSection";
import ValuesSection from "@/components/about/ValuesSection";
import TeamSection from "@/components/about/TeamSection";
import StatsSection from "@/components/home/StatsSection";
import FinalCta from "@/components/home/FinalCta";
import SEO from "@/components/shared/SEO";

/**
 * Image de la section "Notre histoire" (prototype).
 * TODO: remplacer par un asset local une fois disponible.
 */
const STORY_IMAGE = {
  src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80",
  alt: "Maquette de maison et documents sur un bureau, symbole du conseil immobilier Nova",
};

const imageVariants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const textVariants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Page: À propos (/a-propos)
 * Présentation approfondie de l'agence — distincte de la courte section
 * "À propos" de l'accueil (autre copy, autre image, plus de contenu :
 * histoire, valeurs, approche, équipe).
 * Réutilise StatsSection et FinalCta tels quels (Step 4), ainsi
 * qu'ApproachSection (partagé avec la page Services).
 */
export default function About() {
  return (
    <>
      <SEO
        title="À propos | NOVA IMMOBILIER"
        description="Découvrez NOVA IMMOBILIER, notre histoire, nos valeurs et notre approche de l'accompagnement immobilier."
      />
      <PageHero
        eyebrow="À propos de Nova"
        title="Une expertise immobilière pensée pour vos projets"
        description="Depuis plusieurs années, NOVA IMMOBILIER accompagne particuliers et investisseurs dans leurs projets immobiliers avec une approche fondée sur l'écoute, la transparence et la connaissance du marché."
      />

      {/* Notre histoire */}
      <Section background="white">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="relative"
            variants={imageVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="overflow-hidden rounded-card">
              <ImageWithFallback
                src={STORY_IMAGE.src}
                alt={STORY_IMAGE.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover sm:aspect-[16/10] lg:aspect-[4/5]"
              />
            </div>

            <motion.div
              className="absolute -bottom-4 -right-4 max-w-[10.5rem] rounded-card border border-onyx-900/5 bg-ivory-50 p-5 shadow-card-hover sm:-bottom-6 sm:-right-6 sm:max-w-[13rem] sm:p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display text-xl font-semibold text-onyx-900 sm:text-2xl">2012</p>
              <p className="mt-1 text-small">Création de NOVA IMMOBILIER</p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={textVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="text-eyebrow">Notre histoire</span>
            <h2 className="mt-3 text-h2">Construire une relation de confiance, projet après projet</h2>
            <p className="mt-6 text-body">
              NOVA IMMOBILIER est née d&rsquo;une volonté simple&nbsp;: proposer un accompagnement immobilier plus
              humain, plus clair et plus personnalisé.
            </p>
            <p className="mt-4 text-body">
              Au fil des années, l&rsquo;agence a développé une connaissance approfondie du marché local et une
              méthode de travail centrée sur les besoins réels de ses clients.
            </p>
            <p className="mt-4 text-body">
              Achat, vente, location ou investissement, chaque projet bénéficie d&rsquo;un accompagnement adapté à
              ses objectifs.
            </p>
          </motion.div>
        </div>
      </Section>

      <ValuesSection />
      <ApproachSection background="white" />
      <StatsSection />
      <TeamSection />

      <FinalCta
        eyebrow="Votre projet"
        title="Vous avez un projet immobilier ?"
        description="Parlons de vos besoins et trouvons ensemble la solution adaptée."
        secondaryLabel="Découvrir nos biens"
        secondaryHref="/biens"
      />
    </>
  );
}
