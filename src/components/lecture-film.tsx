import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import type { Lesson, Teach } from "@/lib/content/types";
import { StudyMedia } from "@/components/study-media";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const urls = new Map<string, string>();
const VISUAL_CHAPTER_SEC = 18;

async function fetchChapter(lessonId: string, chapter: number) {
  const key = `${lessonId}:${chapter}`;
  const cached = urls.get(key);
  if (cached) return cached;
  const res = await fetch("/api/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lessonId, chapter }),
  });
  if (!res.ok) {
    let msg = "Could not build audio";
    try {
      const body = (await res.json()) as { error?: string };
      if (body.error) msg = body.error;
    } catch {
      /* keep default */
    }
    throw new Error(msg);
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  urls.set(key, url);
  return url;
}

function formatTime(s: number) {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function wordsOf(script: string) {
  return script
    .replace(/\s*\[pause\]\s*/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function captionAt(script: string, progress: number) {
  const words = wordsOf(script);
  if (words.length === 0) return "";
  const i = Math.min(words.length - 1, Math.floor(progress * words.length));
  const start = Math.max(0, i - 3);
  return words.slice(start, start + 12).join(" ");
}

type Media = {
  tracingId?: string;
  echoId?: string;
  angioId?: string;
  hemoId?: string;
  nuclearId?: string;
  cmrId?: string;
};

function hasMedia(m: Media) {
  return Boolean(m.tracingId || m.echoId || m.angioId || m.hemoId || m.nuclearId || m.cmrId);
}

export function LectureFilm({
  lesson,
  teach,
  media,
  onChapter,
  onDone,
}: {
  lesson: Lesson;
  teach?: Teach;
  media?: Media;
  onChapter?: (index: number) => void;
  onDone?: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const indexRef = useRef(0);
  const lessonRef = useRef(lesson);
  const onDoneRef = useRef(onDone);
  const onChapterRef = useRef(onChapter);
  const finished = useRef(false);
  const [index, setIndex] = useState(0);
  const [hasSrc, setHasSrc] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [local, setLocal] = useState(0);

  lessonRef.current = lesson;
  onDoneRef.current = onDone;
  onChapterRef.current = onChapter;
  indexRef.current = index;

  const chapter = lesson.chapters[index];
  const picture: Media = {
    tracingId: media?.tracingId ?? lesson.tracingId,
    echoId: media?.echoId,
    angioId: media?.angioId,
    hemoId: media?.hemoId,
    nuclearId: media?.nuclearId,
    cmrId: media?.cmrId,
  };
  const progress = hasSrc && duration > 0 ? Math.min(1, time / duration) : playing ? Math.min(1, local / VISUAL_CHAPTER_SEC) : 0;
  const shown = duration > 0 && hasSrc ? time : local;

  useEffect(() => {
    finished.current = false;
    setIndex(0);
    setHasSrc(false);
    setPlaying(false);
    setTime(0);
    setDuration(0);
    setLocal(0);
    setError(null);
  }, [lesson.id]);

  useEffect(() => {
    if (!playing || hasSrc || loading) return;
    const started = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = (now - started) / 1000;
      if (t >= VISUAL_CHAPTER_SEC) {
        const i = indexRef.current;
        const current = lessonRef.current;
        if (i < current.chapters.length - 1) {
          const next = i + 1;
          setIndex(next);
          indexRef.current = next;
          onChapterRef.current?.(next);
          setLocal(0);
        } else {
          setPlaying(false);
          if (!finished.current) {
            finished.current = true;
            onDoneRef.current?.();
          }
        }
        return;
      }
      setLocal(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, hasSrc, loading, index]);

  async function playAt(nextIndex: number) {
    const current = lessonRef.current;
    const part = current.chapters[nextIndex];
    const audio = audioRef.current;
    if (!part || !audio) return;
    setIndex(nextIndex);
    indexRef.current = nextIndex;
    onChapterRef.current?.(nextIndex);
    setError(null);
    setLocal(0);
    setLoading(true);
    setPlaying(true);
    try {
      const url = await fetchChapter(current.id, nextIndex);
      audio.src = url;
      setHasSrc(true);
      setTime(0);
      await audio.play();
      if (nextIndex + 1 < current.chapters.length) {
        void fetchChapter(current.id, nextIndex + 1).catch(() => undefined);
      }
    } catch (err) {
      setHasSrc(false);
      setError(err instanceof Error ? err.message : "Audio is not available");
    } finally {
      setLoading(false);
    }
  }

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    if (hasSrc && audio.src) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(true);
      }
      return;
    }
    await playAt(index);
  }

  const scene = index % 3;
  const showStudy = hasMedia(picture) && (scene === 0 || !teach);
  const showFramework = !showStudy && scene === 1 && !!teach && teach.framework.length > 0;
  const showBoard = !showStudy && !showFramework && !!teach;

  return (
    <div className="space-y-4">
      <figure className="overflow-hidden rounded-3xl bg-ink shadow-border">
        <div className="relative aspect-video bg-scan">
          <svg
            viewBox="0 0 640 40"
            className="pointer-events-none absolute inset-x-0 bottom-16 h-10 w-full opacity-40"
            aria-hidden
          >
            <polyline
              className="caliper-trace"
              points="0,22 70,22 92,8 114,34 132,4 156,22 640,22"
              fill="none"
              stroke="var(--color-paper)"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.16em] text-paper/70">
              <span>Film · {chapter?.title}</span>
              <span className="font-mono tabular-nums">
                {index + 1}/{lesson.chapters.length}
              </span>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 py-2">
              {showStudy ? (
                <div className="max-h-full w-full max-w-2xl overflow-hidden rounded-2xl [&_figure]:shadow-none">
                  <StudyMedia {...picture} compact />
                </div>
              ) : null}

              {showFramework && teach ? (
                <ol className="grid w-full max-w-lg grid-cols-2 gap-2">
                  {teach.framework.map((node, i) => {
                    const on = (i + 1) / teach.framework.length <= progress + 0.08 || !playing;
                    return (
                      <li
                        key={node.text}
                        className={cn(
                          "rounded-xl px-3 py-2.5 text-sm leading-snug transition-opacity duration-300",
                          on ? "opacity-100" : "opacity-30",
                          node.tone === "danger" && "bg-danger text-paper",
                          node.tone === "warn" && "bg-warn text-paper",
                          node.tone === "ok" && "bg-ok text-paper",
                          (!node.tone || node.tone === "ink") && "bg-paper text-ink",
                        )}
                      >
                        <span className="mr-2 font-mono text-[11px] opacity-70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {node.text}
                      </li>
                    );
                  })}
                </ol>
              ) : null}

              {showBoard && teach ? (
                <div className="w-full max-w-lg space-y-3">
                  <p className="font-display text-xl leading-snug text-paper sm:text-2xl">{teach.remember}</p>
                  <div className="overflow-hidden rounded-xl bg-paper/10">
                    <table className="w-full text-left text-xs text-paper">
                      <thead>
                        <tr>
                          {teach.quickTable.headers.map((h) => (
                            <th key={h} className="px-2 py-1.5 font-medium text-paper/60">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {teach.quickTable.rows.slice(0, 4).map((row) => (
                          <tr key={row.join("|")} className="border-t border-paper/10">
                            {row.map((cell) => (
                              <td key={cell} className="px-2 py-1.5">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}

              {!showStudy && !showFramework && !showBoard ? (
                <div className="max-w-lg space-y-2 text-center">
                  <p className="font-display text-3xl leading-tight text-paper">{lesson.title}</p>
                  <p className="text-sm text-paper/70">{chapter?.title}</p>
                </div>
              ) : null}
            </div>

            <p className="min-h-10 text-center text-sm leading-snug text-paper" aria-live="polite">
              {chapter ? captionAt(chapter.script, playing || hasSrc ? progress : 0) : ""}
            </p>
          </div>

          {!playing ? (
            <button
              type="button"
              onClick={() => void toggle()}
              className="absolute inset-0 flex items-center justify-center bg-ink/25"
              aria-label={hasSrc ? "Resume film" : "Play film"}
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-paper text-ink shadow-border">
                <Play className="size-7 translate-x-0.5" />
              </span>
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-paper px-3 py-3">
          <audio
            ref={audioRef}
            className="sr-only"
            preload="none"
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
            onEnded={() => {
              const current = lessonRef.current;
              const i = indexRef.current;
              if (i < current.chapters.length - 1) {
                void playAt(i + 1);
              } else {
                setPlaying(false);
                if (!finished.current) {
                  finished.current = true;
                  onDoneRef.current?.();
                }
              }
            }}
            onPlay={() => setPlaying(true)}
          />
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous chapter"
            disabled={index === 0 || loading}
            onClick={() => void playAt(Math.max(0, index - 1))}
          >
            <SkipBack className="size-4" />
          </Button>
          <Button variant="ink" size="lg" onClick={() => void toggle()} disabled={loading}>
            {loading ? (
              "Loading"
            ) : playing ? (
              <>
                <Pause className="size-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="size-4" />
                {hasSrc ? "Resume" : "Play film"}
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next chapter"
            disabled={index >= lesson.chapters.length - 1 || loading}
            onClick={() => void playAt(index + 1)}
          >
            <SkipForward className="size-4" />
          </Button>
          <button
            type="button"
            aria-label="Seek"
            className="h-2 min-w-24 flex-1 overflow-hidden rounded-full bg-paper-2"
            onClick={(e) => {
              const audio = audioRef.current;
              if (!audio || !duration || !hasSrc) return;
              const rect = e.currentTarget.getBoundingClientRect();
              audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
            }}
          >
            <span className="block h-full rounded-full bg-ink" style={{ width: `${progress * 100}%` }} />
          </button>
          <p className="font-mono text-xs tabular-nums text-stone">
            {formatTime(shown)}
            {hasSrc ? ` / ${formatTime(duration)}` : ""}
          </p>
        </div>
      </figure>

      {error ? (
        <p className="text-sm text-danger">Voice unavailable — the film still plays. {error}</p>
      ) : null}

      <div className="flex gap-2 overflow-x-auto pb-1">
        {lesson.chapters.map((c, i) => (
          <button
            key={c.id}
            type="button"
            onClick={() => void playAt(i)}
            className={cn(
              "shrink-0 rounded-full px-3 py-2 text-xs",
              i === index ? "bg-ink text-paper" : "bg-paper-2 text-ink-soft",
            )}
          >
            {i + 1}. {c.title}
          </button>
        ))}
      </div>
    </div>
  );
}
