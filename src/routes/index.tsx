import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LectureFilm } from "@/components/lecture-film";
import { MODULES } from "@/lib/content/modules";
import { CASES } from "@/lib/content/cases";
import { getLesson } from "@/lib/content/lessons";
import { useProgress } from "@/lib/progress";
import { useStats } from "@/lib/stats";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const s = useStats();
  const lesson = getLesson("before")!;
  const markLesson = useProgress((p) => p.markLesson);
  return (
    <div className="space-y-12">
      <section className="space-y-5">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">
            Lecture film
          </p>
          <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl">
            Watch it, then name it.
          </h1>
          <p className="text-[15px] leading-relaxed text-ink-soft">
            Every lesson is a film — the tracing or study on screen, captions, and the
            spoken chapter. Start with the one you brought: sinus bradycardia with
            first-degree AV block.
          </p>
        </div>
        <LectureFilm
          lesson={lesson}
          media={{ tracingId: "brady-1avb" }}
          onChapter={(chapter) => markLesson(lesson.id, chapter, false)}
          onDone={() => markLesson(lesson.id, lesson.chapters.length - 1, true)}
        />
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link to="/listen" search={{ lesson: "method" }}>
              Eight-step film
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/modules/$moduleId" params={{ moduleId: "cardiac-anatomy" }}>
              Cardiac anatomy
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/cases/$caseId" params={{ caseId: "c01" }}>
              Skip to the unknown
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Course", `${s.pct}%`],
          ["Modules", `${s.modulesDone}/${s.modulesTotal}`],
          ["Unknowns", `${s.casesDone}/${s.casesTotal}`],
          ["Q-bank", s.boardAnswered === 0 ? "—" : `${s.boardCorrect}/${s.boardAnswered}`],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl bg-elevated px-4 py-4 shadow-border">
            <p className="text-xs uppercase tracking-[0.14em] text-stone">{k}</p>
            <p className="mt-1 font-mono text-2xl tabular-nums">{v}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl">Tracks</h2>
          <Link to="/modules" className="text-sm text-stone hover:text-ink">
            All modules
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["ECG", "15 lessons · the paper you brought", "ecg"],
            ["Echo", "Windows, valves, cardiomyopathy", "echo"],
            ["Angio / hemo", "Culprits, gradients, equalization", "angio"],
            ["Scan", "Nuclear bullseye, CMR late gadolinium", "scan"],
            ["Wards", "ACS, devices, pharm, trials, ACHD", "clinical"],
          ].map(([title, dek]) => (
            <Link
              key={title}
              to="/modules"
              className="rounded-2xl bg-elevated p-4 shadow-border"
            >
              <p className="font-display text-xl">{title}</p>
              <p className="mt-1 text-sm text-ink-soft">{dek}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl">Start here</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {MODULES.filter((m) => !m.track || m.track === "ecg").slice(0, 4).map((m) => (
            <Link
              key={m.id}
              to="/modules/$moduleId"
              params={{ moduleId: m.id }}
              className="group rounded-2xl bg-elevated p-4 shadow-border transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
            >
              <p className="font-mono text-xs text-stone">{m.n}</p>
              <p className="mt-1 font-display text-xl">{m.title}</p>
              <p className="mt-1 text-sm text-ink-soft">{m.dek}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {CASES.slice(0, 3).map((c) => (
          <Link
            key={c.id}
            to="/cases/$caseId"
            params={{ caseId: c.id }}
            className="rounded-2xl bg-elevated p-4 shadow-border"
          >
            <Badge tone={c.difficulty === "hot" ? "danger" : c.difficulty === "boards" ? "warn" : "accent"}>
              {c.difficulty}
            </Badge>
            <p className="mt-3 font-display text-xl">{c.title}</p>
            <p className="mt-1 text-sm text-stone">{c.ageSex}</p>
          </Link>
        ))}
      </section>

      <p className="text-xs text-stone">
        Teaching product, not a diagnostic device. Fictional patients. Not medical advice.
      </p>
    </div>
  );
}
