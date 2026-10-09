import { getNuclear } from "@/lib/nuclear/presets";
import type { Uptake } from "@/lib/nuclear/types";

const FILL: Record<Uptake, string> = {
  normal: "var(--color-uptake)",
  mild: "var(--color-uptake-mid)",
  severe: "var(--color-uptake-low)",
  absent: "var(--color-defect)",
};

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [
    Math.round((cx + r * Math.cos(rad)) * 10) / 10,
    Math.round((cy + r * Math.sin(rad)) * 10) / 10,
  ] as const;
}

function ring(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) {
  const [x0, y0] = polar(cx, cy, r1, a0);
  const [x1, y1] = polar(cx, cy, r1, a1);
  const [x2, y2] = polar(cx, cy, r0, a1);
  const [x3, y3] = polar(cx, cy, r0, a0);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${x0} ${y0} A ${r1} ${r1} 0 ${large} 1 ${x1} ${y1} L ${x2} ${y2} A ${r0} ${r0} 0 ${large} 0 ${x3} ${y3} Z`;
}

/** Clockwise from 12 o'clock. Septum is 9 o'clock (left), lateral is 3 o'clock (right). */
const BASAL = [0, 5, 4, 3, 2, 1];
const MID = [6, 11, 10, 9, 8, 7];
const APICAL = [12, 15, 14, 13];

function Bullseye({
  uptake,
  cx,
  title,
}: {
  uptake: Uptake[];
  cx: number;
  title: string;
}) {
  const cy = 118;
  const parts: { i: number; d: string }[] = [];
  for (let i = 0; i < 6; i++) {
    const a0 = i * 60 - 30;
    parts.push({ i: BASAL[i]!, d: ring(cx, cy, 72, 104, a0, a0 + 60) });
    parts.push({ i: MID[i]!, d: ring(cx, cy, 40, 72, a0, a0 + 60) });
  }
  for (let i = 0; i < 4; i++) {
    const a0 = i * 90 - 45;
    parts.push({ i: APICAL[i]!, d: ring(cx, cy, 16, 40, a0, a0 + 90) });
  }
  return (
    <g>
      <text x={cx} y="18" textAnchor="middle" fill="var(--color-vessel)" fontSize="11" opacity="0.7">
        {title}
      </text>
      {parts.map((p) => (
        <path
          key={p.i}
          d={p.d}
          fill={FILL[uptake[p.i] ?? "normal"]}
          stroke="var(--color-scan)"
          strokeWidth="1.2"
        />
      ))}
      <circle cx={cx} cy={cy} r="16" fill={FILL[uptake[16] ?? "normal"]} stroke="var(--color-scan)" strokeWidth="1.2" />
    </g>
  );
}

export function NuclearMap({ studyId }: { studyId: string }) {
  const s = getNuclear(studyId);
  const both = s.mode === "both" && s.rest;
  return (
    <figure className="overflow-hidden rounded-3xl bg-scan shadow-border">
      <div className="flex items-center justify-between px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-vessel/70">
        <span>MPI · 17-segment</span>
        <span className="font-mono">{both ? "stress / rest" : "stress"}</span>
      </div>
      <svg
        viewBox={both ? "0 0 400 236" : "0 0 220 236"}
        className="h-auto w-full"
        role="img"
        aria-label={s.label}
      >
        <rect width="100%" height="100%" fill="var(--color-scan)" />
        <Bullseye uptake={s.stress} cx={both ? 110 : 110} title="Stress" />
        {both && s.rest ? <Bullseye uptake={s.rest} cx={290} title="Rest" /> : null}
        <text x={both ? 200 : 110} y="224" textAnchor="middle" fill="var(--color-vessel)" fontSize="10" opacity="0.45">
          ant · lat · inf · sept
        </text>
      </svg>
      <figcaption className="px-4 py-2 text-sm text-vessel">{s.label}</figcaption>
    </figure>
  );
}
