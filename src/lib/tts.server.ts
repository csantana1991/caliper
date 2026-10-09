import { getLesson } from "@/lib/content/lessons";
import { env } from "@/lib/env.server";

const cache = new Map<string, ArrayBuffer>();
const inflight = new Map<string, Promise<ArrayBuffer>>();

const MAX_CHARS = 4500;

export function ttsKeyAvailable() {
  return Boolean(env("XAI_API_KEY"));
}

export async function synthesizeChapter(lessonId: string, chapter: number) {
  const lesson = getLesson(lessonId);
  const part = lesson?.chapters[chapter];
  if (!lesson || !part) {
    return { ok: false as const, status: 404, error: "Unknown lesson" };
  }
  if (part.script.length > MAX_CHARS) {
    return { ok: false as const, status: 400, error: "Chapter too long" };
  }

  const apiKey = env("XAI_API_KEY");
  if (!apiKey) {
    return { ok: false as const, status: 503, error: "Audio is not available" };
  }

  const key = `${lessonId}:${chapter}`;
  const hit = cache.get(key);
  if (hit) return { ok: true as const, audio: hit };

  const pending = inflight.get(key);
  if (pending) {
    const audio = await pending;
    return { ok: true as const, audio };
  }

  const work = (async () => {
    const res = await fetch("https://api.x.ai/v1/tts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: part.script.replace(/\s*\[pause\]\s*/g, ". ").replace(/\s+/g, " ").trim(),
        voice_id: "orion",
        language: "en",
        speed: 0.95,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`TTS ${res.status} ${detail.slice(0, 180)}`);
    }
    const audio = await res.arrayBuffer();
    cache.set(key, audio);
    return audio;
  })();

  inflight.set(key, work);
  try {
    const audio = await work;
    return { ok: true as const, audio };
  } catch (err) {
    const message = err instanceof Error ? err.message : "TTS failed";
    return { ok: false as const, status: 502, error: message };
  } finally {
    inflight.delete(key);
  }
}
