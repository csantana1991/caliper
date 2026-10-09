import { createFileRoute, Link } from "@tanstack/react-router";
import { METHOD_STEPS } from "@/lib/content/method";
import { Blocks } from "@/components/blocks";
import { FrameworkBoard, OneLiner } from "@/components/framework-board";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/method")({ component: MethodPage });

function MethodPage() {
  const setDone = useProgress((s) => s.setMethodDone);
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">The method</p>
        <h1 className="font-display text-4xl">Eight steps. One sentence.</h1>
        <p className="text-[15px] leading-relaxed text-ink-soft">
          Mechanism first, then the tracing, then the next step. No stories. If the
          sentence will not fit in one breath, look again.
        </p>
        <Button asChild variant="ink">
          <Link to="/listen" search={{ lesson: "method" }}>
            Hear the eight steps
          </Link>
        </Button>
      </header>
      <FrameworkBoard
        nodes={[
          { text: "Paper" },
          { text: "Rate" },
          { text: "Rhythm" },
          { text: "Axis" },
          { text: "Intervals" },
          { text: "Chamber" },
          { text: "Ischemia" },
          { text: "One sentence", tone: "ok" },
        ]}
      />
      <OneLiner
        label="If you remember nothing else"
        text="First-degree AV block is a PR, not a rhythm. Name sinus bradycardia with first-degree AV block — two findings, one sentence."
      />
      <ol className="space-y-10">
        {METHOD_STEPS.map((step) => (
          <li key={step.n} className="space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs text-stone">{step.n}</span>
              <h2 className="font-display text-2xl">{step.title}</h2>
            </div>
            <p className="text-sm text-stone">{step.dek}</p>
            <Blocks blocks={step.blocks} />
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap gap-2 border-t border-line pt-6">
        <Button variant="ink" onClick={() => setDone()}>
          Mark method complete
        </Button>
        <Button asChild variant="outline">
          <Link to="/modules">Start modules</Link>
        </Button>
      </div>
    </div>
  );
}
