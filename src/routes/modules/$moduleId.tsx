import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { getModule, MODULES } from "@/lib/content/modules";
import { getTeach, lessonFromModule } from "@/lib/content/teach";
import { FLASHCARDS } from "@/lib/content/flashcards";
import { Blocks, QuickTable } from "@/components/blocks";
import { QuizList } from "@/components/quiz";
import { StudyMedia } from "@/components/study-media";
import { LectureFilm } from "@/components/lecture-film";
import { AnatomyFilm } from "@/components/anatomy-film";
import { FrameworkBoard, OneLiner, TeachGrid } from "@/components/framework-board";
import { useProgress } from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Module } from "@/lib/content/types";

export const Route = createFileRoute("/modules/$moduleId")({
  component: ModulePage,
});

const TABS = [
  { id: "notes", label: "Notes" },
  { id: "lecture", label: "Film" },
  { id: "questions", label: "Questions" },
  { id: "drill", label: "Drill" },
] as const;

type Tab = (typeof TABS)[number]["id"];

function filmMedia(mod: Module) {
  if (mod.track === "echo" && mod.echoId) return { echoId: mod.echoId };
  if (mod.track === "scan" && mod.nuclearId) return { nuclearId: mod.nuclearId };
  if (mod.track === "scan" && mod.cmrId) return { cmrId: mod.cmrId };
  if (mod.track === "angio" && mod.angioId) return { angioId: mod.angioId };
  if (mod.track === "angio" && mod.hemoId) return { hemoId: mod.hemoId };
  if (mod.tracingId) return { tracingId: mod.tracingId };
  if (mod.echoId) return { echoId: mod.echoId };
  if (mod.angioId) return { angioId: mod.angioId };
  if (mod.hemoId) return { hemoId: mod.hemoId };
  if (mod.nuclearId) return { nuclearId: mod.nuclearId };
  if (mod.cmrId) return { cmrId: mod.cmrId };
  return {};
}

function ModulePage() {
  const { moduleId } = Route.useParams();
  const mod = getModule(moduleId);
  const teach = getTeach(moduleId);
  const lesson = lessonFromModule(moduleId);
  const progress = useProgress();
  const [tab, setTab] = useState<Tab>(lesson ? "lecture" : "notes");
  const markLesson = useProgress((s) => s.markLesson);

  useEffect(() => {
    setTab(lessonFromModule(moduleId) ? "lecture" : "notes");
  }, [moduleId]);

  const drill = useMemo(() => {
    if (!teach) return [];
    return FLASHCARDS.filter((c) => teach.drillTags.includes(c.tag));
  }, [teach]);

  if (!mod) {
    return <p>Module not found.</p>;
  }
  const idx = MODULES.findIndex((m) => m.id === mod.id);
  const next = MODULES[idx + 1];
  const rec = progress.modules[mod.id]?.quiz ?? {};
  const quizDone = mod.quiz.filter((q) => rec[q.id]).length;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3">
        <p className="font-mono text-xs text-stone">
          Module {mod.n} · {mod.minutes} min
          {mod.track && mod.track !== "ecg" ? ` · ${mod.track}` : ""}
        </p>
        <h1 className="font-display text-4xl">{mod.title}</h1>
        <p className="text-[15px] text-ink-soft">{mod.dek}</p>
      </header>

      <div className="flex gap-1 overflow-x-auto rounded-2xl bg-paper-2 p-1">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setTab(item.id);
              progress.markModuleSection(mod.id, TABS.findIndex((t) => t.id === item.id));
            }}
            className={cn(
              "flex-1 rounded-xl px-3 py-2.5 text-sm",
              tab === item.id ? "bg-elevated text-ink shadow-border" : "text-stone",
            )}
          >
            {item.id === "questions"
              ? `Questions ${quizDone}/${mod.quiz.length}`
              : item.label}
          </button>
        ))}
      </div>

      {tab === "notes" ? (
        <div className="space-y-8">
          {teach ? (
            <>
              <FrameworkBoard nodes={teach.framework} />
              <OneLiner label="If you remember nothing else" text={teach.remember} />
              <TeachGrid path={teach.path} dx={teach.dx} tx={teach.tx} />
            </>
          ) : null}
          <StudyMedia
            tracingId={mod.tracingId}
            echoId={mod.echoId}
            angioId={mod.angioId}
            hemoId={mod.hemoId}
            nuclearId={mod.nuclearId}
            cmrId={mod.cmrId}
            compact
          />
          {mod.sections.map((sec) => (
            <section key={sec.id} className="space-y-4">
              <h2 className="font-display text-2xl">{sec.title}</h2>
              <Blocks blocks={sec.blocks} />
            </section>
          ))}
        </div>
      ) : null}

      {tab === "lecture" && lesson ? (
        <div className="space-y-4">
          <p className="text-sm text-ink-soft">
            Watch the film, then take the questions. Same facts as the notes.
          </p>
          {mod.id === "cardiac-anatomy" ? <AnatomyFilm /> : null}
          <LectureFilm
            key={lesson.id}
            lesson={lesson}
            teach={teach}
            media={filmMedia(mod)}
            onChapter={(chapter) => markLesson(lesson.id, chapter, false)}
            onDone={() => markLesson(lesson.id, lesson.chapters.length - 1, true)}
          />
        </div>
      ) : null}

      {tab === "questions" ? (
        <section className="space-y-4">
          <div>
            <h2 className="font-display text-2xl">Challenge</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Watch then quiz. Most-likely-diagnosis and next-step stems, same tracing family.
            </p>
          </div>
          <QuizList
            questions={mod.quiz}
            recorded={rec}
            onAnswer={(qid, choice, correct) =>
              progress.answerModuleQuiz(mod.id, qid, { choice, correct, at: Date.now() })
            }
          />
        </section>
      ) : null}

      {tab === "drill" && teach ? (
        <section className="space-y-6">
          <div>
            <h2 className="font-display text-2xl">Quick table</h2>
            <p className="mt-1 text-sm text-ink-soft">
              One page. Come back tomorrow and say it out loud.
            </p>
          </div>
          <QuickTable headers={teach.quickTable.headers} rows={teach.quickTable.rows} />
          {drill.length ? (
            <div className="space-y-3">
              <h3 className="font-display text-xl">Cards from this lesson</h3>
              <ul className="space-y-2">
                {drill.map((c) => (
                  <li key={c.id} className="rounded-2xl bg-elevated px-4 py-3 shadow-border">
                    <p className="text-sm text-ink">{c.front}</p>
                    <p className="mt-1 text-sm text-ink-soft">{c.back}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <Button asChild variant="outline">
            <Link to="/flashcards">Full drill deck</Link>
          </Button>
        </section>
      ) : null}

      <div className="flex flex-wrap gap-2 border-t border-line pt-6">
        <Button asChild variant="outline">
          <Link to="/modules">All modules</Link>
        </Button>
        {tab !== "questions" ? (
          <Button variant="ink" onClick={() => setTab("questions")}>
            Take the questions
          </Button>
        ) : next ? (
          <Button asChild variant="ink">
            <Link to="/modules/$moduleId" params={{ moduleId: next.id }}>
              Next: {next.title}
            </Link>
          </Button>
        ) : (
          <Button asChild variant="ink">
            <Link to="/cases">Unknowns</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
