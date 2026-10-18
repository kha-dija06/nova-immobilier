import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import TeamCard from "./TeamCard";
import { team } from "@/data/team";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function TeamSection() {
  return (
    <Section background="white">
      <SectionTitle
        eyebrow="Notre équipe"
        title="Des professionnels à vos côtés"
        description="Une équipe complémentaire, disponible pour vous accompagner dans chaque étape de votre projet."
        align="center"
        className="mx-auto"
      />

      <motion.div
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:mt-16 lg:gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {team.map((member) => (
          <motion.div key={member.id} variants={item}>
            <TeamCard member={member} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
