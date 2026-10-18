import type { AppointmentFormData, AppointmentMode, AppointmentProjectType } from "@/types";

export interface AppointmentSummaryProps {
  data: AppointmentFormData;
}

const PROJECT_LABELS: Record<AppointmentProjectType, string> = {
  acheter: "Achat immobilier",
  vendre: "Vente d'un bien",
  louer: "Location",
  investir: "Investissement",
  conseil: "Conseil immobilier",
};

const MODE_LABELS: Record<AppointmentMode, string> = {
  agence: "En agence",
  visio: "En visioconférence",
};

/** "2026-10-12" → "12 octobre 2026" (heure fixée à midi pour éviter tout décalage de fuseau) */
function formatDateFr(isoDate: string): string {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${isoDate}T12:00:00`)
  );
}

/** Affiche les valeurs réellement saisies par l'utilisateur. */
export default function AppointmentSummary({ data }: AppointmentSummaryProps) {
  const rows: { label: string; value: string }[] = [
    { label: "Projet", value: data.projectType ? PROJECT_LABELS[data.projectType] : "—" },
    { label: "Date", value: data.preferredDate ? formatDateFr(data.preferredDate) : "—" },
    { label: "Heure", value: data.preferredTime ?? "—" },
    { label: "Mode", value: data.mode ? MODE_LABELS[data.mode] : "—" },
    { label: "Nom", value: data.fullName || "—" },
    { label: "Email", value: data.email || "—" },
    { label: "Téléphone", value: data.phone || "—" },
  ];

  return (
    <dl className="w-full divide-y divide-onyx-900/5 rounded-card border border-onyx-900/5 bg-white text-left">
      {rows.map((row) => (
        <div key={row.label} className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6">
          <dt className="text-small">{row.label}</dt>
          <dd className="min-w-0 break-words text-right text-body font-medium text-onyx-900">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
