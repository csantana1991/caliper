import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MODULES } from "@/lib/content/modules";
import type { Track } from "@/lib/content/types";
import { useProgress } from "@/lib/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/modules/")({ component: ModulesPage });

const TRACKS: { id: "all" | Track; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ecg", label: "ECG" },
  { id: "echo", label: "Echo" },
  { id: "angio", label: "Angio / hemo" },
  { id: "scan", label: "Scan" },
  { id: "clinical", label: "Wards" },
];

const BLUEPRINT = [
  ["Arrhythmias", "15%", "ECG 02–06, 12 · Wards AF / devices"],
  ["Coronary disease", "21.5%", "ECG 07–08, 13 · Angio · Nuclear · ACS"],
  ["HF / myocardium", "17–19%", "Echo CM · CMR · Wards HF/shock"],
  ["Valves", "15%", "Echo valves · Hemo · Endocarditis"],
  ["Pericardial", "3–4%", "ECG 15 · Echo tamponade"],
  ["Congenital", "3–5%", "ECG 15 · ACHD · CT anomalies"],
  ["Vascular / aorta", "5–6%", "Wards aorta"],
  ["HTN / PH", "8–11%", "Wards HTN-PH"],
  ["Systemic / other", "4–7%", "Pharm · trials · cardio-onc · peri-op"],
] as const;

function trackOf(id: string, explicit?: Track): Track {
  return explicit ?? "ecg";
}

function ModulesPage() {
  const modules = useProgress((s) => s.modules);
  const [track, setTrack] = useState<"all" | Track>("all");
  const list = MODULES.filter((m) => track === "all" || trackOf(m.id, m.track) === track);
  return (
    <div className="space-y-8">
      <header className="max-w-2xl space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">Classroom</p>
        <h1 className="font-display text-4xl">{MODULES.length} modules</h1>
        <p className="text-[15px] text-ink-soft">
          Full ABIM cardiovascular map: ECG, echo, angiograms, nuclear, CMR,
          hemodynamics, and the ward questions. Notes, lecture, questions, drill
          on every topic.
        </p>
      </header>
      <div className="flex gap-1 overflow-x-auto rounded-2xl bg-paper-2 p-1">
        {TRACKS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTrack(t.id)}
            className={cn(
              "flex-1 rounded-xl px-3 py-2.5 text-sm whitespace-nowrap",
              track === t.id ? "bg-elevated text-ink shadow-border" : "text-stone",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-3xl bg-elevated shadow-border">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-ink text-paper">
            <tr>
              <th className="px-4 py-2 font-medium">ABIM category</th>
              <th className="px-4 py-2 font-medium">Exam weight</th>
              <th className="px-4 py-2 font-medium">Where we teach it</th>
            </tr>
          </thead>
          <tbody>
            {BLUEPRINT.map((row) => (
              <tr key={row[0]} className="border-t border-line">
                <td className="px-4 py-2 text-ink">{row[0]}</td>
                <td className="px-4 py-2 font-mono text-ink-soft">{row[1]}</td>
                <td className="px-4 py-2 text-ink-soft">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="px-4 py-3 text-xs text-stone">
          Imaging session: ECG ~48%, echo ~37%, coronary angiograms ~15% — plus
          nuclear and CMR as the extra imaging half-day. Multiple-choice day is
          the categories above. Not affiliated with ABIM, ACC, or AHA.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {list.map((m) => {
          const quiz = modules[m.id]?.quiz ?? {};
          const done = m.quiz.filter((q) => quiz[q.id]).length;
          return (
            <Link
              key={m.id}
              to="/modules/$moduleId"
              params={{ moduleId: m.id }}
              className="rounded-2xl bg-elevated p-5 shadow-border transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-stone">
                  {m.n} · {trackOf(m.id, m.track)}
                </span>
                <Badge tone={done === m.quiz.length ? "ok" : "neutral"}>
                  {done}/{m.quiz.length} items
                </Badge>
              </div>
              <h2 className="mt-3 font-display text-2xl">{m.title}</h2>
              <p className="mt-1 text-sm text-ink-soft">{m.dek}</p>
              <p className="mt-3 text-xs text-stone">{m.minutes} min</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
