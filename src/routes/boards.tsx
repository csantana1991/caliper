import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { QUESTIONS, TOPICS } from "@/lib/content/questions";
import { QuizItem } from "@/components/quiz";
import { useProgress } from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/boards")({ component: BoardsPage });

function BoardsPage() {
  const [topic, setTopic] = useState<string>("All");
  const [idx, setIdx] = useState(0);
  const boards = useProgress((s) => s.boards);
  const answerBoard = useProgress((s) => s.answerBoard);
  const pool = useMemo(
    () => (topic === "All" ? QUESTIONS : QUESTIONS.filter((q) => q.topic === topic)),
    [topic],
  );
  const q = pool[idx] ?? pool[0];
  const correct = Object.values(boards).filter((x) => x.correct).length;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">Q-bank</p>
        <h1 className="font-display text-4xl">Board items</h1>
        <p className="text-[15px] text-ink-soft">
          Mixed one-liners and tracings. Filter by topic. Your score lives on this device.
        </p>
        <p className="font-mono text-sm tabular-nums text-stone">
          {correct} correct · {Object.keys(boards).length} answered · {QUESTIONS.length} in bank
        </p>
      </header>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["All", ...TOPICS].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTopic(t);
              setIdx(0);
            }}
            className={cn(
              "shrink-0 rounded-full px-3 py-2 text-xs",
              topic === t ? "bg-ink text-paper" : "bg-paper-2 text-ink-soft",
            )}
          >
            {t}
          </button>
        ))}
      </div>
      {q ? (
        <QuizItem
          key={q.id}
          q={q}
          recorded={boards[q.id]}
          onAnswer={(choice) =>
            answerBoard(q.id, { choice, correct: choice === q.answer, at: Date.now() })
          }
        />
      ) : (
        <p>No items in this topic.</p>
      )}
      <div className="flex gap-2">
        <Button variant="outline" disabled={idx === 0} onClick={() => setIdx((n) => n - 1)}>
          Previous
        </Button>
        <Button
          variant="ink"
          disabled={idx >= pool.length - 1}
          onClick={() => setIdx((n) => n + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
