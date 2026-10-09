import { createFileRoute, Link } from "@tanstack/react-router";
import { CASES } from "@/lib/content/cases";
import { Badge } from "@/components/ui/badge";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/cases/")({ component: CasesPage });

function CasesPage() {
  const cases = useProgress((s) => s.cases);
  return (
    <div className="space-y-8">
      <header className="max-w-2xl space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">Unknowns</p>
        <h1 className="font-display text-4xl">{CASES.length} unknowns</h1>
        <p className="text-[15px] text-ink-soft">
          ECG, echo, angiogram, nuclear, CMR, and hemodynamics. Hide the diagnosis.
          Write the sentence. Case 01 is still the bradycardia with a long PR.
        </p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2">
        {CASES.map((c) => {
          const done = cases[c.id]?.revealed;
          return (
            <Link
              key={c.id}
              to="/cases/$caseId"
              params={{ caseId: c.id }}
              className="rounded-2xl bg-elevated p-5 shadow-border transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-stone">
                  {String(c.n).padStart(2, "0")}
                </span>
                <div className="flex gap-2">
                  <Badge tone={c.difficulty === "hot" ? "danger" : c.difficulty === "boards" ? "warn" : "accent"}>
                    {c.difficulty}
                  </Badge>
                  {done ? <Badge tone="ok">Read</Badge> : null}
                </div>
              </div>
              <h2 className="mt-3 font-display text-2xl">{c.title}</h2>
              <p className="mt-1 text-sm text-ink-soft">
                {c.ageSex} · {c.setting}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
