import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Building2, Check, CheckCircle2, Handshake, KeyRound, LineChart, Search, TrendingUp, Video } from "lucide-react";
import type { AppointmentFormData, AppointmentMode, AppointmentProjectType } from "@/types";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import ChoiceCard from "./ChoiceCard";
import AppointmentStep from "./AppointmentStep";
import AppointmentSummary from "./AppointmentSummary";

type SubmitStatus = "idle" | "submitting" | "done";
type StepErrors = Partial<Record<keyof AppointmentFormData, string>>;

const STEPS = ["Projet", "Créneau", "Coordonnées", "Confirmation"];
const LAST_STEP = STEPS.length - 1;

const PROJECT_OPTIONS: { value: AppointmentProjectType; title: string; description: string; icon: LucideIcon }[] = [
  { value: "acheter", title: "Acheter", description: "Je recherche un bien immobilier", icon: Search },
  { value: "vendre", title: "Vendre", description: "Je souhaite vendre un bien", icon: TrendingUp },
  { value: "louer", title: "Louer", description: "Je recherche une location", icon: KeyRound },
  { value: "investir", title: "Investir", description: "Je souhaite investir dans l'immobilier", icon: LineChart },
  { value: "conseil", title: "Conseil", description: "J'ai besoin d'un conseil", icon: Handshake },
];

const MODE_OPTIONS: { value: AppointmentMode; title: string; description: string; icon: LucideIcon }[] = [
  { value: "agence", title: "En agence", description: "Rendez-vous dans nos bureaux à Rabat", icon: Building2 },
  { value: "visio", title: "En visioconférence", description: "Échange à distance", icon: Video },
];

/** Créneaux de démonstration — aucune disponibilité réelle (pas de backend). */
const TIME_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Délai de simulation (ms) — aucune requête réseau n'est réellement envoyée. */
const SIMULATED_DELAY = 900;

const INITIAL_DATA: AppointmentFormData = {
  fullName: "",
  email: "",
  phone: "",
  preferredDate: "",
  message: "",
};

/** Date du jour au format YYYY-MM-DD, en heure locale (et non UTC). */
function getTodayISO(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function validateStep(step: number, data: AppointmentFormData): StepErrors {
  const errors: StepErrors = {};

  if (step === 0 && !data.projectType) {
    errors.projectType = "Veuillez sélectionner votre projet.";
  }

  if (step === 1) {
    if (!data.preferredDate) errors.preferredDate = "Veuillez choisir une date.";
    else if (data.preferredDate < getTodayISO()) errors.preferredDate = "Veuillez choisir une date à venir.";
    if (!data.preferredTime) errors.preferredTime = "Veuillez choisir un créneau.";
    if (!data.mode) errors.mode = "Veuillez choisir un mode de rendez-vous.";
  }

  if (step === 2) {
    if (!data.fullName.trim()) errors.fullName = "Veuillez renseigner votre nom.";
    if (!EMAIL_REGEX.test(data.email.trim())) errors.email = "Veuillez renseigner une adresse email valide.";
    if (!data.phone.trim()) errors.phone = "Veuillez renseigner votre numéro de téléphone.";
  }

  return errors;
}

/**
 * Formulaire de rendez-vous en 4 étapes (Projet → Créneau → Coordonnées →
 * Confirmation), 100% frontend. Chaque étape est validée avant de passer à
 * la suivante. La confirmation finale est simulée : elle ne prétend PAS
 * qu'un rendez-vous réel a été réservé (aucun backend).
 */
export default function AppointmentForm() {
  const [step, setStep] = useState(0);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [data, setData] = useState<AppointmentFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<StepErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const timeoutRef = useRef<number | undefined>(undefined);

  // Évite un setState après démontage si l'utilisateur quitte la page pendant la simulation.
  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const update = <K extends keyof AppointmentFormData>(field: K, value: AppointmentFormData[K]) => {
    setData((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const goNext = () => {
    const stepErrors = validateStep(step, data);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;

    setHasNavigated(true);
    setStep((current) => Math.min(current + 1, LAST_STEP));
  };

  const goBack = () => {
    setErrors({});
    setHasNavigated(true);
    setStep((current) => Math.max(current - 1, 0));
  };

  const handleConfirm = () => {
    setStatus("submitting");
    timeoutRef.current = window.setTimeout(() => setStatus("done"), SIMULATED_DELAY);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    if (step < LAST_STEP) goNext();
    else handleConfirm();
  };

  /** "Modifier" : retour au début avec les données conservées, pour tout pouvoir corriger. */
  const handleEdit = () => {
    setStep(0);
    setHasNavigated(true);
    setStatus("idle");
  };

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        role="status"
        className="flex flex-col items-center gap-8 rounded-card border border-onyx-900/5 bg-white p-6 text-center shadow-card sm:p-10"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-100 text-gold-700">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </div>

        <div>
          <h2 className="text-h3">Votre demande de rendez-vous est enregistrée</h2>
          <p className="mx-auto mt-3 max-w-md text-body">
            Merci pour votre confiance. Dans cette démonstration, aucune demande n&rsquo;est réellement envoyée à un
            serveur.
          </p>
        </div>

        <AppointmentSummary data={data} />

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button variant="outline" onClick={handleEdit} className="w-full sm:w-auto">
            Modifier
          </Button>
          <Button href="/" className="w-full sm:w-auto">
            Retour à l&rsquo;accueil
          </Button>
        </div>
      </motion.div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-card border border-onyx-900/5 bg-white p-6 shadow-card sm:p-8 lg:p-10"
    >
      {/* Indicateur de progression — cercles seuls sur mobile, avec libellés dès sm */}
      <nav aria-label="Progression du formulaire de rendez-vous" className="mb-10">
        <p className="sr-only" aria-live="polite">
          Étape {step + 1} sur {STEPS.length} : {STEPS[step]}
        </p>
        <ol className="flex items-center gap-2 sm:gap-4">
          {STEPS.map((label, index) => (
            <li
              key={label}
              className={cn("flex items-center gap-2 sm:gap-3", index < LAST_STEP && "flex-1")}
              aria-current={index === step ? "step" : undefined}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-display text-xs font-semibold transition-colors",
                  index < step && "border-gold-500 bg-gold-500 text-onyx-950",
                  index === step && "border-gold-500 text-gold-700",
                  index > step && "border-onyx-900/10 text-onyx-400"
                )}
              >
                {index < step ? (
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  String(index + 1).padStart(2, "0")
                )}
              </span>
              <span className={cn("hidden text-small sm:block", index === step && "font-medium !text-onyx-900")}>
                {label}
              </span>
              {index < LAST_STEP && <span aria-hidden="true" className="hidden h-px flex-1 bg-onyx-900/10 sm:block" />}
            </li>
          ))}
        </ol>
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === 0 && (
            <AppointmentStep title="Quel est votre projet ?" autoFocusHeading={hasNavigated}>
              <fieldset aria-describedby={errors.projectType ? "error-projectType" : undefined}>
                <legend className="sr-only">Type de projet</legend>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {PROJECT_OPTIONS.map((option) => (
                    <ChoiceCard
                      key={option.value}
                      name="projectType"
                      value={option.value}
                      icon={option.icon}
                      title={option.title}
                      description={option.description}
                      selected={data.projectType === option.value}
                      onSelect={() => update("projectType", option.value)}
                    />
                  ))}
                </div>
                {errors.projectType && (
                  <p id="error-projectType" role="alert" className="mt-4 text-small !text-red-600">
                    {errors.projectType}
                  </p>
                )}
              </fieldset>
            </AppointmentStep>
          )}

          {step === 1 && (
            <AppointmentStep title="Choisissez votre créneau" autoFocusHeading={hasNavigated}>
              <div className="flex flex-col gap-8">
                <Input
                  type="date"
                  label="Date souhaitée"
                  required
                  min={getTodayISO()}
                  value={data.preferredDate}
                  error={errors.preferredDate}
                  onChange={(event) => update("preferredDate", event.target.value)}
                />

                <fieldset aria-describedby={errors.preferredTime ? "error-preferredTime" : undefined}>
                  <legend className="text-label">
                    Heure souhaitée
                    <span className="ml-1 text-gold-600" aria-hidden="true">
                      *
                    </span>
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {TIME_SLOTS.map((slot) => {
                      const selected = data.preferredTime === slot;
                      return (
                        <label key={slot} className="relative cursor-pointer">
                          <input
                            type="radio"
                            name="preferredTime"
                            value={slot}
                            checked={selected}
                            onChange={() => update("preferredTime", slot)}
                            className="peer sr-only"
                          />
                          <span
                            className={cn(
                              "block rounded-full border px-5 py-3 text-sm font-medium transition-colors",
                              "peer-focus-visible:ring-2 peer-focus-visible:ring-gold-400 peer-focus-visible:ring-offset-2",
                              selected
                                ? "border-gold-500 bg-gold-500 font-semibold text-onyx-950"
                                : "border-onyx-900/10 bg-white text-onyx-700 hover:border-onyx-300"
                            )}
                          >
                            {slot}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.preferredTime && (
                    <p id="error-preferredTime" role="alert" className="mt-3 text-small !text-red-600">
                      {errors.preferredTime}
                    </p>
                  )}
                </fieldset>

                <fieldset aria-describedby={errors.mode ? "error-mode" : undefined}>
                  <legend className="text-label">
                    Mode du rendez-vous
                    <span className="ml-1 text-gold-600" aria-hidden="true">
                      *
                    </span>
                  </legend>
                  <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {MODE_OPTIONS.map((option) => (
                      <ChoiceCard
                        key={option.value}
                        name="mode"
                        value={option.value}
                        icon={option.icon}
                        title={option.title}
                        description={option.description}
                        layout="inline"
                        selected={data.mode === option.value}
                        onSelect={() => update("mode", option.value)}
                      />
                    ))}
                  </div>
                  {errors.mode && (
                    <p id="error-mode" role="alert" className="mt-3 text-small !text-red-600">
                      {errors.mode}
                    </p>
                  )}
                </fieldset>
              </div>
            </AppointmentStep>
          )}

          {step === 2 && (
            <AppointmentStep title="Vos coordonnées" autoFocusHeading={hasNavigated}>
              <div className="flex flex-col gap-5">
                <Input
                  label="Nom complet"
                  autoComplete="name"
                  required
                  value={data.fullName}
                  error={errors.fullName}
                  onChange={(event) => update("fullName", event.target.value)}
                />
                <Input
                  label="Email"
                  type="email"
                  autoComplete="email"
                  placeholder="vous@example.com"
                  required
                  value={data.email}
                  error={errors.email}
                  onChange={(event) => update("email", event.target.value)}
                />
                <Input
                  label="Téléphone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+212 6 XX XX XX XX"
                  required
                  value={data.phone}
                  error={errors.phone}
                  onChange={(event) => update("phone", event.target.value)}
                />
                <Textarea
                  label="Parlez-nous de votre projet"
                  placeholder="Quelques informations supplémentaires..."
                  rows={4}
                  hint="Optionnel"
                  value={data.message ?? ""}
                  onChange={(event) => update("message", event.target.value)}
                />
              </div>
            </AppointmentStep>
          )}

          {step === 3 && (
            <AppointmentStep
              title="Vérifiez votre demande"
              description="Assurez-vous que les informations ci-dessous sont correctes avant de confirmer."
              autoFocusHeading={hasNavigated}
            >
              <AppointmentSummary data={data} />
            </AppointmentStep>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation entre les étapes (sur mobile : action principale en haut, "Retour" dessous) */}
      <div className="mt-10 flex flex-col-reverse gap-3 border-t border-onyx-900/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={goBack} disabled={isSubmitting} className="w-full sm:w-auto">
            Retour
          </Button>
        ) : (
          <span aria-hidden="true" className="hidden sm:block" />
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {step < LAST_STEP ? "Continuer" : isSubmitting ? "Envoi..." : "Confirmer le rendez-vous"}
        </Button>
      </div>
    </form>
  );
}
