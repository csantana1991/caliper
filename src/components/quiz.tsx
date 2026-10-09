import { useState } from "react";
import type { Question } from "@/lib/content/types";
import { Button } from "@/components/ui/button";
import { EcgPaper, EcgStrip } from "@/components/ecg-paper";
import { EchoStudyView } from "@/components/echo-study";
import { AngioFilm } from "@/components/angio-film";
import { HemoStrip } from "@/components/hemo-strip";
import { NuclearMap } from "@/components/nuclear-map";
import { CmrStudyView } from "@/components/cmr-study";
import { cn } from "@/lib/utils";

export function QuizItem({
  q,
  recorded,
  onAnswer,
}: {
  q: Question;
  recorded?: { choice: number; correct: boolean };
  onAnswer: (choice: number) => void;
}) {
  const [picked, setPicked] = useState<number | null>(recorded?.choice ?? null);
  const locked = picked !== null;

  return (
    <article className="space-y-4">
      {q.tracingId ? (
        q.lead ? (
          <EcgStrip tracingId={q.tracingId} lead={q.lead} />
        ) : (
          <EcgPaper tracingId={q.tracingId} compact />
        )
      ) : null}
      {q.echoId ? <EchoStudyView studyId={q.echoId} /> : null}
      {q.angioId ? <AngioFilm studyId={q.angioId} /> : null}
      {q.hemoId ? <HemoStrip studyId={q.hemoId} /> : null}
      {q.nuclearId ? <NuclearMap studyId={q.nuclearId} /> : null}
      {q.cmrId ? <CmrStudyView studyId={q.cmrId} /> : null}
      {q.ask ? (
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone">
          {q.ask === "dx" ? "Most likely diagnosis" : q.ask === "next" ? "Next step in management" : "Mechanism"}
        </p>
      ) : (
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone">Boards item</p>
      )}
      <p className="text-[15px] leading-relaxed text-ink">{q.prompt}</p>
      <div className="grid gap-2">
        {q.choices.map((c, i) => {
          const chosen = picked === i;
          const show = locked;
          const right = i === q.answer;
          return (
            <button
              key={c}
              type="button"
              disabled={locked}
              onClick={() => {
                setPicked(i);
                onAnswer(i);
              }}
              className={cn(
                "rounded-2xl px-4 py-3 text-left text-sm shadow-border transition-[background-color,box-shadow] duration-150",
                !show && "bg-elevated hover:shadow-[var(--shadow-border-hover)]",
                show && right && "bg-ok-bg text-ok",
                show && chosen && !right && "bg-danger-bg text-danger",
                show && !right && !chosen && "bg-elevated text-stone",
              )}
            >
              <span className="mr-2 font-mono text-xs text-stone">
                {String.fromCharCode(65 + i)}
              </span>
              {c}
            </button>
          );
        })}
      </div>
      {locked ? (
        <div className="space-y-2 rounded-2xl bg-paper-2 px-4 py-3 text-sm text-ink-soft">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone">
            {picked === q.answer ? "Why this is right" : "Why that is wrong"}
          </p>
          <p>{q.explain}</p>
          {q.pearls?.map((p) => (
            <p key={p} className="text-ok">
              {p}
            </p>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function QuizList({
  questions,
  recorded,
  onAnswer,
}: {
  questions: Question[];
  recorded: Record<string, { choice: number; correct: boolean }>;
  onAnswer: (qid: string, choice: number, correct: boolean) => void;
}) {
  const [idx, setIdx] = useState(0);
  const q = questions[idx];
  if (!q) return null;
  const rec = recorded[q.id];
  const done = questions.filter((item) => recorded[item.id]).length;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-stone">
        <span>
          {idx + 1} / {questions.length}
        </span>
        <span className="tabular-nums">
          {done} answered
        </span>
      </div>
      <QuizItem
        q={q}
        recorded={rec}
        onAnswer={(choice) => onAnswer(q.id, choice, choice === q.answer)}
      />
      <div className="flex gap-2">
        <Button
          variant="outline"
          disabled={idx === 0}
          onClick={() => setIdx((n) => Math.max(0, n - 1))}
        >
          Previous
        </Button>
        <Button
          variant="ink"
          disabled={idx === questions.length - 1}
          onClick={() => setIdx((n) => Math.min(questions.length - 1, n + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
