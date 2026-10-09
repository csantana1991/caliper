import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { examQuestions } from "@/lib/content/questions";
import { QuizItem } from "@/components/quiz";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/exam")({ component: ExamPage });

function ExamPage() {
  const exam = useProgress((s) => s.exam);
  const start = useProgress((s) => s.startExam);
  const answer = useProgress((s) => s.answerExam);
  const submit = useProgress((s) => s.submitExam);
  const reset = useProgress((s) => s.resetExam);
  const questions = useMemo(() => examQuestions(), []);
  const [idx, setIdx] = useState(0);
  const q = questions[idx];
  const correct = Object.values(exam.answers).filter((x) => x.correct).length;

  if (!exam.startedAt) {
    return (
      <div className="mx-auto max-w-xl space-y-5">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">Mock boards</p>
        <h1 className="font-display text-4xl">Twenty items. No peeking.</h1>
        <p className="text-[15px] text-ink-soft">
          A mixed set drawn from the didactics. Submit when you have answered what you can.
          Score is local to this browser.
        </p>
        <Button variant="ink" size="lg" onClick={() => start()}>
          Begin exam
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-stone">Mock boards</p>
          <h1 className="font-display text-3xl">Item {idx + 1} of {questions.length}</h1>
        </div>
        {exam.submitted ? (
          <p className="font-mono text-lg tabular-nums">
            {correct}/{questions.length}
          </p>
        ) : (
          <p className="font-mono text-sm text-stone">
            {Object.keys(exam.answers).length} answered
          </p>
        )}
      </header>
      {q ? (
        <QuizItem
          key={q.id}
          q={q}
          recorded={exam.submitted || exam.answers[q.id] ? exam.answers[q.id] : undefined}
          onAnswer={(choice) => {
            if (exam.submitted) return;
            answer(q.id, { choice, correct: choice === q.answer, at: Date.now() });
          }}
        />
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" disabled={idx === 0} onClick={() => setIdx((n) => n - 1)}>
          Previous
        </Button>
        <Button
          variant="outline"
          disabled={idx >= questions.length - 1}
          onClick={() => setIdx((n) => n + 1)}
        >
          Next
        </Button>
        {!exam.submitted ? (
          <Button variant="ink" onClick={() => submit()}>
            Submit exam
          </Button>
        ) : (
          <Button variant="ghost" onClick={() => { reset(); setIdx(0); }}>
            Reset exam
          </Button>
        )}
      </div>
    </div>
  );
}
