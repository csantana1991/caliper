import { createFileRoute, Link } from "@tanstack/react-router";
import { CASES, getCase } from "@/lib/content/cases";
import { StudyMedia } from "@/components/study-media";
import { QuizList } from "@/components/quiz";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/lib/progress";
import { getTracing } from "@/lib/ecg/presets";

export const Route = createFileRoute("/cases/$caseId")({
  component: CasePage,
});

function CasePage() {
  const { caseId } = Route.useParams();
  const item = getCase(caseId);
  const progress = useProgress();
  if (!item) return <p>Unknown not found.</p>;
  const rec = progress.cases[item.id]?.answers ?? {};
  const revealed = progress.cases[item.id]?.revealed ?? false;
  const spec = item.tracingId ? getTracing(item.tracingId) : null;
  const idx = CASES.findIndex((c) => c.id === item.id);
  const next = CASES[idx + 1];
  const prev = CASES[idx - 1];

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="font-mono text-xs text-stone">Unknown {String(item.n).padStart(2, "0")}</p>
          <h1 className="font-display text-4xl">{item.title}</h1>
          <p className="text-sm text-ink-soft">
            {item.ageSex} · {item.setting}
          </p>
        </div>
        <Badge tone={item.difficulty === "hot" ? "danger" : item.difficulty === "boards" ? "warn" : "accent"}>
          {item.difficulty}
        </Badge>
      </header>

      <StudyMedia
        tracingId={item.tracingId}
        echoId={item.echoId}
        angioId={item.angioId}
        hemoId={item.hemoId}
        nuclearId={item.nuclearId}
        cmrId={item.cmrId}
      />

      {item.id === "c01" && !progress.lessons?.before?.done ? (
        <p className="text-sm text-ink-soft">
          Hear the walkthrough first —{" "}
          <Link to="/listen" search={{ lesson: "before" }} className="underline decoration-line-strong">
            Before the unknown
          </Link>
          .
        </p>
      ) : null}

      {spec ? (
      <div className="grid gap-3 sm:grid-cols-4">
        {[
          ["Rate", `${spec.rate} bpm`],
          ["PR", spec.pr ? `${spec.pr} ms` : "—"],
          ["QRS", `${spec.qrs} ms`],
          ["QTc", spec.qtc ? `${spec.qtc} ms` : `${spec.qt} ms QT`],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl bg-elevated px-4 py-3 shadow-border">
            <p className="text-xs uppercase tracking-[0.14em] text-stone">{k}</p>
            <p className="font-mono text-lg tabular-nums">{v}</p>
          </div>
        ))}
      </div>
      ) : null}

      <p className="max-w-3xl text-[15px] leading-relaxed text-ink-soft">{item.stem}</p>
      {item.vitals ? <p className="text-sm text-stone">{item.vitals}</p> : null}

      <section className="space-y-4">
        <h2 className="font-display text-2xl">Read it</h2>
        <QuizList
          questions={item.questions}
          recorded={rec}
          onAnswer={(qid, choice, correct) =>
            progress.answerCase(item.id, qid, { choice, correct, at: Date.now() })
          }
        />
      </section>

      <section className="space-y-4">
        {!revealed ? (
          <Button variant="ink" onClick={() => progress.revealCase(item.id)}>
            Reveal the sentence
          </Button>
        ) : (
          <div className="space-y-4 rounded-3xl bg-elevated p-5 shadow-border">
            <p className="text-xs uppercase tracking-[0.14em] text-stone">Diagnosis</p>
            <h2 className="font-display text-2xl">{item.diagnosis}</h2>
            {item.computerRead ? (
              <p className="text-sm text-stone">Machine: {item.computerRead}</p>
            ) : null}
            <ul className="space-y-2 text-[15px] text-ink-soft">
              {item.debrief.map((d) => (
                <li key={d} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            {item.nextStep ? (
              <p className="text-sm text-ok">Next: {item.nextStep}</p>
            ) : null}
          </div>
        )}
      </section>

      <div className="flex flex-wrap gap-2">
        {prev ? (
          <Button asChild variant="outline">
            <Link to="/cases/$caseId" params={{ caseId: prev.id }}>
              Previous
            </Link>
          </Button>
        ) : null}
        {next ? (
          <Button asChild variant="ink">
            <Link to="/cases/$caseId" params={{ caseId: next.id }}>
              Next unknown
            </Link>
          </Button>
        ) : (
          <Button asChild variant="ink">
            <Link to="/boards">Q-bank</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
