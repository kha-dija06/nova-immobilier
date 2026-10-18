import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { ContactFormData } from "@/types";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;
type SubmitStatus = "idle" | "submitting" | "success";

const SUBJECT_OPTIONS = [
  { value: "information", label: "Demande d'information" },
  { value: "achat", label: "Achat immobilier" },
  { value: "vente", label: "Vente d'un bien" },
  { value: "location", label: "Location" },
  { value: "investissement", label: "Investissement" },
  { value: "autre", label: "Autre" },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;
/** Délai de simulation (ms) — aucune requête réseau n'est réellement envoyée. */
const SIMULATED_DELAY = 900;

const INITIAL_DATA: ContactFormData = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function validate(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.fullName.trim()) errors.fullName = "Veuillez renseigner votre nom.";
  if (!EMAIL_REGEX.test(data.email.trim())) errors.email = "Veuillez renseigner une adresse email valide.";
  if (!data.subject) errors.subject = "Veuillez sélectionner un sujet.";
  if (data.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = `Votre message doit contenir au moins ${MIN_MESSAGE_LENGTH} caractères.`;
  }

  return errors;
}

/**
 * Formulaire de contact 100% frontend : validation en React (pas seulement
 * celle du navigateur), état de chargement simulé, puis un succès de
 * démonstration honnête — il ne prétend PAS qu'un email a été envoyé,
 * puisqu'aucun backend n'existe.
 */
export default function ContactForm() {
  const [data, setData] = useState<ContactFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const timeoutRef = useRef<number | undefined>(undefined);

  // Évite un setState après démontage si l'utilisateur quitte la page pendant la simulation.
  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const handleChange = <K extends keyof ContactFormData>(field: K, value: ContactFormData[K]) => {
    setData((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    timeoutRef.current = window.setTimeout(() => setStatus("success"), SIMULATED_DELAY);
  };

  const handleReset = () => {
    setData(INITIAL_DATA);
    setErrors({});
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center px-2 py-10 text-center"
        role="status"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-100 text-gold-700">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-h3">Merci pour votre message</h2>
        <p className="mt-3 max-w-md text-body">
          Votre demande a bien été enregistrée dans cette démonstration. Dans une version connectée, notre équipe
          pourra vous répondre directement.
        </p>
        <Button variant="outline" className="mt-8 w-full sm:w-auto" onClick={handleReset}>
          Envoyer un autre message
        </Button>
      </motion.div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2 className="text-h3">Envoyez-nous un message</h2>

      <Input
        label="Nom complet"
        placeholder="Votre nom"
        autoComplete="name"
        required
        value={data.fullName}
        error={errors.fullName}
        onChange={(event) => handleChange("fullName", event.target.value)}
      />

      <Input
        label="Email"
        type="email"
        placeholder="vous@example.com"
        autoComplete="email"
        required
        value={data.email}
        error={errors.email}
        onChange={(event) => handleChange("email", event.target.value)}
      />

      <Input
        label="Téléphone"
        type="tel"
        placeholder="+212 6 XX XX XX XX"
        autoComplete="tel"
        hint="Optionnel"
        value={data.phone ?? ""}
        onChange={(event) => handleChange("phone", event.target.value)}
      />

      <Select
        label="Sujet"
        placeholder="Choisissez un sujet"
        required
        value={data.subject}
        error={errors.subject}
        options={SUBJECT_OPTIONS}
        onChange={(event) => handleChange("subject", event.target.value)}
      />

      <Textarea
        label="Message"
        placeholder="Décrivez votre projet ou votre demande..."
        rows={5}
        required
        value={data.message}
        error={errors.message}
        onChange={(event) => handleChange("message", event.target.value)}
      />

      <Button type="submit" size="lg" className="mt-2 w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? "Envoi..." : "Envoyer le message"}
      </Button>
    </form>
  );
}
