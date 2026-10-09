import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LectureFilm } from "@/components/lecture-film";
import { Button } from "@/components/ui/button";
import { LESSONS, getLesson } from "@/lib/content/lessons";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/listen")({
  validateSearch: (search: Record<string, unknown>) => ({
    lesson: typeof search.lesson === "string" ? search.lesson : "before",
  }),
  component: ListenPage,
});

function ListenPage() {
  const { lesson: lessonId } = Route.useSearch();
  const lesson = getLesson(lessonId) ?? LESSONS[0];
  const markLesson = useProgress((s) => s.markLesson);
  const [ready, setReady] = useState(false);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">
          Lecture film
        </p>
        <h1 className="font-display text-4xl">{lesson.title}</h1>
        <p className="text-[15px] leading-relaxed text-ink-soft">{lesson.dek}</p>
        <p className="text-sm text-stone">About {lesson.minutes} minutes</p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {LESSONS.map((item) => (
          <Link
            key={item.id}
            to="/listen"
            search={{ lesson: item.id }}
            className={cn(
              "shrink-0 rounded-full px-3 py-2 text-xs",
              item.id === lesson.id ? "bg-ink text-paper" : "bg-paper-2 text-ink-soft",
            )}
          >
            {item.title}
          </Link>
        ))}
      </div>

      <LectureFilm
        key={lesson.id}
        lesson={lesson}
        onChapter={(chapter) => markLesson(lesson.id, chapter, false)}
        onDone={() => {
          markLesson(lesson.id, lesson.chapters.length - 1, true);
          setReady(true);
        }}
      />

      <div className="flex flex-wrap gap-2 border-t border-line pt-6">
        {lesson.id === "before" ? (
          <Button asChild variant="ink">
            <Link to="/cases/$caseId" params={{ caseId: "c01" }}>
              {ready ? "Now read the unknown" : "Skip to the unknown"}
            </Link>
          </Button>
        ) : (
          <Button asChild variant="ink">
            <Link to="/method">{ready ? "Open the method notes" : "Skip to method notes"}</Link>
          </Button>
        )}
        <Button asChild variant="outline">
          <Link to="/listen" search={{ lesson: lesson.id === "before" ? "method" : "before" }}>
            {lesson.id === "before" ? "Eight-step lecture" : "Tracing lecture"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
