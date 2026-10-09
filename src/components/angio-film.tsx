import { getAngio } from "@/lib/angio/presets";
import type { AngioStudy, VesselId } from "@/lib/angio/types";

const LCA: Record<VesselId, string> = {
  lm: "M 120 70 L 168 96",
  lad: "M 168 96 L 210 210 L 222 268",
  diag: "M 186 140 L 248 188",
  lcx: "M 168 96 L 96 150 L 70 210",
  om: "M 120 132 L 64 168",
  rca: "",
  pda: "",
  pla: "",
};

const RCA: Record<VesselId, string> = {
  rca: "M 210 64 Q 280 110 268 190 Q 250 250 200 268",
  pda: "M 200 268 L 140 250",
  pla: "M 200 268 L 168 292",
  lm: "",
  lad: "",
  diag: "",
  lcx: "",
  om: "",
};

function width(pct?: number) {
  if (!pct) return 7;
  if (pct >= 99) return 1.2;
  if (pct >= 90) return 2.2;
  if (pct >= 70) return 3.4;
  return 4.5;
}

export function AngioFilm({ studyId }: { studyId: string }) {
  const s = getAngio(studyId);
  const map = s.tree === "lca" ? LCA : RCA;
  const lesion = (v: VesselId) => s.lesions.find((l) => l.vessel === v)?.pct;
  return (
    <figure className="overflow-hidden rounded-3xl bg-film shadow-border">
      <div className="flex items-center justify-between px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-vessel/60">
        <span>Cine · {s.view}</span>
        <span className="font-mono">TIMI {s.timi ?? "—"}</span>
      </div>
      <svg viewBox="0 0 360 320" className="h-auto w-full" role="img" aria-label={s.label}>
        <rect width="360" height="320" fill="var(--color-film)" />
        <circle cx="180" cy="160" r="148" fill="#1a1917" />
        {Object.entries(map).map(([id, d]) =>
          d ? (
            <path
              key={id}
              d={d}
              fill="none"
              stroke="var(--color-vessel)"
              strokeWidth={width(lesion(id as VesselId))}
              strokeLinecap="round"
              opacity={lesion(id as VesselId) === 100 ? 0.25 : 0.95}
            />
          ) : null,
        )}
        {s.lesions.map((l) => {
          const d = map[l.vessel];
          if (!d) return null;
          return (
            <path
              key={l.vessel}
              d={d}
              fill="none"
              stroke="var(--color-danger)"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.35"
            />
          );
        })}
        <text x="20" y="300" fill="var(--color-vessel)" fontSize="11" opacity="0.55">
          {s.tree === "lca" ? "LM · LAD · LCx" : "RCA · PDA"}
        </text>
      </svg>
      <figcaption className="px-4 py-2 text-sm text-vessel">
        {s.label}
        {s.note ? ` — ${s.note}` : ""}
      </figcaption>
    </figure>
  );
}
