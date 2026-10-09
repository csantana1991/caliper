import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import type { Lesson } from "@/lib/content/lessons";
import { Button } from "@/components/ui/button";
import { EcgPaper } from "@/components/ecg-paper";
import { cn } from "@/lib/utils";

const urls = new Map<string, string>();

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

export function AudioLesson({
  lesson,
  hidePaper,
  hideTranscript,
  onChapter,
  onDone,
}: {
  lesson: Lesson;
  hidePaper?: boolean;
  hideTranscript?: boolean;
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

  lessonRef.current = lesson;
  onDoneRef.current = onDone;
  onChapterRef.current = onChapter;
  indexRef.current = index;

  const chapter = lesson.chapters[index];

  useEffect(() => {
    finished.current = false;
    setIndex(0);
    setHasSrc(false);
    setPlaying(false);
    setTime(0);
    setDuration(0);
    setError(null);
  }, [lesson.id]);

  async function playAt(nextIndex: number) {
    const current = lessonRef.current;
    const part = current.chapters[nextIndex];
    const audio = audioRef.current;
    if (!part || !audio) return;
    setIndex(nextIndex);
    indexRef.current = nextIndex;
    onChapterRef.current?.(nextIndex);
    setError(null);
    setLoading(true);
    try {
      const url = await fetchChapter(current.id, nextIndex);
      audio.src = url;
      setHasSrc(true);
      setTime(0);
      await audio.play();
      setPlaying(true);
      if (nextIndex + 1 < current.chapters.length) {
        void fetchChapter(current.id, nextIndex + 1).catch(() => undefined);
      }
    } catch (err) {
      setPlaying(false);
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
    if (audio.src) {
      await audio.play();
      setPlaying(true);
      return;
    }
    await playAt(index);
  }

  const bar = duration > 0 ? Math.min(1, time / duration) : 0;

  return (
    <div className="space-y-6">
      {!hidePaper && lesson.tracingId ? <EcgPaper tracingId={lesson.tracingId} compact /> : null}

      <div className="rounded-3xl bg-elevated p-5 shadow-border">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-stone">
              Chapter {index + 1} of {lesson.chapters.length}
            </p>
            <h2 className="font-display text-2xl">{chapter?.title}</h2>
          </div>
          <p className="font-mono text-sm tabular-nums text-stone">
            {formatTime(time)} / {formatTime(duration)}
          </p>
        </div>

        <audio
          ref={audioRef}
          className="sr-only"
          preload="none"
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
          onEnded={() => {
            setPlaying(false);
            const current = lessonRef.current;
            const i = indexRef.current;
            if (i < current.chapters.length - 1) {
              void playAt(i + 1);
            } else if (!finished.current) {
              finished.current = true;
              onDoneRef.current?.();
            }
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />

        <button
          type="button"
          aria-label="Seek"
          className="mt-4 h-2 w-full overflow-hidden rounded-full bg-paper-2"
          onClick={(e) => {
            const audio = audioRef.current;
            if (!audio || !duration) return;
            const rect = e.currentTarget.getBoundingClientRect();
            audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
          }}
        >
          <span
            className="block h-full rounded-full bg-ink"
            style={{ width: `${bar * 100}%` }}
          />
        </button>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous chapter"
            disabled={index === 0 || loading}
            onClick={() => void playAt(index - 1)}
          >
            <SkipBack className="size-4" />
          </Button>
          <Button
            variant="ink"
            size="lg"
            data-audio-play
            onClick={() => void toggle()}
            disabled={loading}
          >
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
                {hasSrc ? "Resume" : "Play lesson"}
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
        </div>

        {error ? (
          <p className="mt-4 text-sm text-danger">{error}. Read the transcript below.</p>
        ) : null}
      </div>

      {hideTranscript ? null : (
        <>
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

          <article className="space-y-3">
            <p className="text-xs uppercase tracking-[0.14em] text-stone">Transcript</p>
            <p className="text-[15px] leading-relaxed text-ink-soft">
              {chapter?.script.replace(/\s*\[pause\]\s*/g, " ")}
            </p>
          </article>
        </>
      )}
    </div>
  );
}
