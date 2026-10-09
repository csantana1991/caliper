import { createFileRoute } from "@tanstack/react-router";
import { synthesizeChapter } from "@/lib/tts.server";

export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { lessonId?: unknown; chapter?: unknown };
        try {
          body = (await request.json()) as { lessonId?: unknown; chapter?: unknown };
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const lessonId = typeof body.lessonId === "string" ? body.lessonId : "";
        const chapter = typeof body.chapter === "number" ? body.chapter : Number(body.chapter);
        if (!lessonId || !Number.isInteger(chapter) || chapter < 0 || chapter > 20) {
          return Response.json({ error: "Bad request" }, { status: 400 });
        }
        const result = await synthesizeChapter(lessonId, chapter);
        if (!result.ok) {
          return Response.json({ error: result.error }, { status: result.status });
        }
        return new Response(new Uint8Array(result.audio), {
          headers: {
            "Content-Type": "audio/mpeg",
            "Cache-Control": "private, max-age=86400",
          },
        });
      },
    },
  },
});
