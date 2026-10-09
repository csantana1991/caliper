import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FLASHCARDS } from "@/lib/content/flashcards";
import { useProgress } from "@/lib/progress";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/flashcards")({ component: FlashPage });

function FlashPage() {
  const flash = useProgress((s) => s.flash);
  const mark = useProgress((s) => s.markFlash);
  const reset = useProgress((s) => s.resetFlash);
  const remaining = useMemo(
    () => FLASHCARDS.filter((c) => flash[c.id] !== "know"),
    [flash],
  );
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const card = remaining[i] ?? remaining[0];
  const know = Object.values(flash).filter((x) => x === "know").length;

  function grade(state: "know" | "again") {
    if (!card) return;
    mark(card.id, state);
    setShow(false);
    setI((n) => {
      const nextLen = remaining.length - (state === "know" ? 1 : 0);
      if (nextLen <= 0) return 0;
      return n >= nextLen ? 0 : n;
    });
  }

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">Drill</p>
        <h1 className="font-display text-4xl">Say it out loud</h1>
        <p className="text-[15px] text-ink-soft">
          After the lecture, come back and force recall. One fact per card. No
          mnemonics unless the fact will not stick without one.
        </p>
        <p className="font-mono text-sm tabular-nums text-stone">
          {know}/{FLASHCARDS.length} known
        </p>
      </header>
      {card ? (
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="w-full rounded-3xl bg-elevated px-6 py-10 text-left shadow-border"
        >
          <p className="text-xs uppercase tracking-[0.14em] text-stone">{card.tag}</p>
          <p className="mt-4 font-display text-2xl">{card.front}</p>
          {show ? <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">{card.back}</p> : (
            <p className="mt-6 text-sm text-stone">Tap to reveal</p>
          )}
        </button>
      ) : (
        <p className="text-ink-soft">Deck clear. Reset to drill again.</p>
      )}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => grade("again")} disabled={!card}>
          Again
        </Button>
        <Button variant="ink" onClick={() => grade("know")} disabled={!card}>
          Known
        </Button>
        <Button variant="ghost" onClick={() => { reset(); setI(0); setShow(false); }}>
          Reset deck
        </Button>
      </div>
    </div>
  );
}
