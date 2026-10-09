import { getCmr } from "@/lib/cmr/presets";
import type { CmrStudy, CmrWall, LgePattern } from "@/lib/cmr/types";

const WALL_ARC: Record<CmrWall, [number, number]> = {
  ant: [-45, 45],
  lat: [45, 135],
  inf: [135, 225],
  sept: [225, 315],
};

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [
    Math.round((cx + r * Math.cos(rad)) * 10) / 10,
    Math.round((cy + r * Math.sin(rad)) * 10) / 10,
  ] as const;
}

function arcBand(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) {
  const [x0, y0] = polar(cx, cy, r1, a0);
  const [x1, y1] = polar(cx, cy, r1, a1);
  const [x2, y2] = polar(cx, cy, r0, a1);
  const [x3, y3] = polar(cx, cy, r0, a0);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${x0} ${y0} A ${r1} ${r1} 0 ${large} 1 ${x1} ${y1} L ${x2} ${y2} A ${r0} ${r0} 0 ${large} 0 ${x3} ${y3} Z`;
}

function bandFor(pattern: LgePattern, rInner: number, rOuter: number): [number, number] | null {
  const span = rOuter - rInner;
  if (pattern === "none") return null;
  if (pattern === "subendo" || pattern === "global-subendo") return [rInner, rInner + span * 0.45];
  if (pattern === "epi") return [rOuter - span * 0.4, rOuter];
  if (pattern === "midwall" || pattern === "patchy") return [rInner + span * 0.28, rInner + span * 0.72];
  if (pattern === "transmural") return [rInner, rOuter];
  return [rInner, rInner + span * 0.45];
}

function ShortAxis({ s }: { s: CmrStudy }) {
  const cx = 120;
  const cy = 140;
  const thick = s.cavity === "thick";
  const dilated = s.cavity === "dilated";
  const rInner = thick ? 38 : dilated ? 58 : 48;
  const rOuter = thick ? 92 : dilated ? 88 : 84;
  const walls: CmrWall[] = ["ant", "lat", "inf", "sept"];
  return (
    <g>
      <circle cx={cx} cy={cy} r={rOuter} fill="var(--color-myo)" />
      <circle cx={cx} cy={cy} r={rInner} fill="var(--color-cavity)" />
      {s.global
        ? (() => {
            const b = bandFor(s.global, rInner, rOuter);
            if (!b) return null;
            return (
              <g>
                <path d={arcBand(cx, cy, b[0], b[1], -180, 0)} fill="var(--color-lge)" opacity="0.92" />
                <path d={arcBand(cx, cy, b[0], b[1], 0, 180)} fill="var(--color-lge)" opacity="0.92" />
              </g>
            );
          })()
        : null}
      {walls.map((w) => {
        const p = s.walls[w];
        if (!p || p === "none") return null;
        const b = bandFor(p, rInner, rOuter);
        if (!b) return null;
        const [a0, a1] = WALL_ARC[w];
        return <path key={w} d={arcBand(cx, cy, b[0], b[1], a0, a1)} fill="var(--color-lge)" opacity={p === "patchy" ? 0.7 : 0.95} />;
      })}
      <text x={cx} y="28" textAnchor="middle" fill="var(--color-vessel)" fontSize="11" opacity="0.7">
        SAX mid · LGE
      </text>
      <text x={cx} y="48" textAnchor="middle" fill="var(--color-vessel)" fontSize="10" opacity="0.4">
        ant
      </text>
      <text x="28" y={cy + 4} fill="var(--color-vessel)" fontSize="10" opacity="0.4">
        sept
      </text>
      <text x="196" y={cy + 4} fill="var(--color-vessel)" fontSize="10" opacity="0.4">
        lat
      </text>
      <text x={cx} y="252" textAnchor="middle" fill="var(--color-vessel)" fontSize="10" opacity="0.4">
        inf
      </text>
    </g>
  );
}

export function CmrStudyView({ studyId }: { studyId: string }) {
  const s = getCmr(studyId);
  return (
    <figure className="overflow-hidden rounded-3xl bg-scan shadow-border">
      <div className="flex items-center justify-between px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-vessel/70">
        <span>CMR · late gadolinium</span>
        <span className="font-mono tabular-nums">EF {s.ef}%</span>
      </div>
      <svg viewBox="0 0 240 270" className="h-auto w-full" role="img" aria-label={s.label}>
        <rect width="240" height="270" fill="var(--color-scan)" />
        <ShortAxis s={s} />
      </svg>
      <figcaption className="px-4 py-2 text-sm text-vessel">{s.label}</figcaption>
    </figure>
  );
}
