import { useMemo, useState } from "react";
import { LEAD_IDS, type LeadId, GRID, COL_SEC, TOTAL_SEC } from "@/lib/ecg/types";
import { buildEvents, leadPath } from "@/lib/ecg/synth";
import { getTracing } from "@/lib/ecg/presets";
import { cn } from "@/lib/utils";

const LAYOUT: LeadId[][] = [
  ["I", "aVR", "V1", "V4"],
  ["II", "aVL", "V2", "V5"],
  ["III", "aVF", "V3", "V6"],
];

const MARGIN_X = 36;
const HEADER = 28;
const ROW_H = 118;
const RHYTHM_H = 96;
const FOOTER = 22;

function Grid({ width, height, x, y }: { width: number; height: number; x: number; y: number }) {
  const minors: string[] = [];
  const majors: string[] = [];
  for (let gx = 0; gx <= width; gx += GRID.small) {
    const isMajor = Math.round(gx / GRID.small) % 5 === 0;
    const d = `M ${x + gx} ${y} V ${y + height}`;
    (isMajor ? majors : minors).push(d);
  }
  for (let gy = 0; gy <= height; gy += GRID.small) {
    const isMajor = Math.round(gy / GRID.small) % 5 === 0;
    const d = `M ${x} ${y + gy} H ${x + width}`;
    (isMajor ? majors : minors).push(d);
  }
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill="var(--color-ecg-paper)" />
      <path d={minors.join(" ")} stroke="var(--color-grid-minor)" strokeWidth={0.6} fill="none" />
      <path d={majors.join(" ")} stroke="var(--color-grid-major)" strokeWidth={1} fill="none" />
    </g>
  );
}

export function EcgPaper({
  tracingId,
  compact,
  showMeta = true,
  className,
}: {
  tracingId: string;
  compact?: boolean;
  showMeta?: boolean;
  className?: string;
}) {
  const spec = getTracing(tracingId);
  const [focus, setFocus] = useState<LeadId | "II-rhythm" | null>(null);
  const events = useMemo(() => buildEvents(spec), [spec]);

  const colW = COL_SEC * GRID.pxPerSec;
  const plotW = 4 * colW;
  const width = MARGIN_X + plotW + 8;
  const height = HEADER + 3 * ROW_H + RHYTHM_H + FOOTER;
  const plotY = HEADER;

  const paths = useMemo(() => {
    const out: { key: string; pts: string; label: string; lx: number; ly: number }[] = [];
    LAYOUT.forEach((row, ri) => {
      row.forEach((lead, ci) => {
        const x0 = MARGIN_X + ci * colW;
        const y0 = plotY + ri * ROW_H + ROW_H * 0.58;
        const t0 = ci * COL_SEC * 1000;
        const t1 = (ci + 1) * COL_SEC * 1000;
        out.push({
          key: lead,
          pts: leadPath(spec, lead, x0, y0, t0, t1, events),
          label: lead,
          lx: x0 + 4,
          ly: plotY + ri * ROW_H + 14,
        });
      });
    });
    const rx = MARGIN_X;
    const ry = plotY + 3 * ROW_H + RHYTHM_H * 0.58;
    out.push({
      key: "II-rhythm",
      pts: leadPath(spec, "II", rx, ry, 0, TOTAL_SEC * 1000, events),
      label: "II",
      lx: rx + 4,
      ly: plotY + 3 * ROW_H + 14,
    });
    return out;
  }, [spec, events, colW]);

  return (
    <div className={cn("ecg-scroll w-full min-w-0 overflow-x-auto rounded-2xl bg-ecg-paper shadow-border", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={cn("w-full min-w-[720px]", compact ? "max-h-[360px]" : "max-h-[640px]")}
        role="img"
        aria-label={`12-lead ECG: ${spec.label ?? spec.id}`}
      >
        <Grid x={MARGIN_X} y={plotY} width={plotW} height={3 * ROW_H + RHYTHM_H} />
        {showMeta ? (
          <g fill="var(--color-ink)" fontFamily="var(--font-sans)">
            <text x={MARGIN_X} y={18} fontSize={11} fontWeight={600}>
              25 mm/s
            </text>
            <text x={MARGIN_X + 70} y={18} fontSize={11}>
              10 mm/mV
            </text>
            <text x={MARGIN_X + 160} y={18} fontSize={11}>
              150 Hz
            </text>
            <text x={width - 12} y={18} fontSize={11} textAnchor="end" fontFamily="var(--font-mono)">
              {spec.rate} bpm
            </text>
          </g>
        ) : null}
        {paths.map((p) => (
          <g key={p.key}>
            <text
              x={p.lx}
              y={p.ly}
              fontSize={11}
              fontWeight={600}
              fill="var(--color-ink-soft)"
              fontFamily="var(--font-sans)"
            >
              {p.label}
            </text>
            <polyline
              points={p.pts}
              fill="none"
              stroke="var(--color-trace)"
              strokeWidth={1.55}
              strokeLinejoin="round"
              strokeLinecap="round"
              className={cn(focus && focus !== p.key && "opacity-30")}
            />
            <rect
              x={p.lx - 4}
              y={p.ly - 12}
              width={40}
              height={22}
              fill="transparent"
              className="cursor-pointer"
              onClick={() => setFocus(focus === p.key ? null : (p.key as LeadId))}
            />
          </g>
        ))}
        {[1, 2, 3].map((i) => (
          <line
            key={i}
            x1={MARGIN_X + i * colW}
            x2={MARGIN_X + i * colW}
            y1={plotY}
            y2={plotY + 3 * ROW_H}
            stroke="var(--color-ink)"
            strokeOpacity={0.18}
            strokeWidth={1}
          />
        ))}
        <text
          x={MARGIN_X}
          y={height - 6}
          fontSize={10}
          fill="var(--color-stone)"
          fontFamily="var(--font-sans)"
        >
          Unconfirmed · for teaching
        </text>
      </svg>
    </div>
  );
}

export function EcgStrip({
  tracingId,
  lead = "II",
  seconds = 6,
  className,
}: {
  tracingId: string;
  lead?: LeadId;
  seconds?: number;
  className?: string;
}) {
  const spec = getTracing(tracingId);
  const events = useMemo(() => buildEvents(spec), [spec]);
  const w = seconds * GRID.pxPerSec + 16;
  const h = 92;
  const pts = useMemo(
    () => leadPath(spec, lead, 8, 52, 0, seconds * 1000, events),
    [spec, lead, seconds, events],
  );
  return (
    <div className={cn("overflow-hidden rounded-xl shadow-border bg-ecg-paper", className)}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label={`${lead} strip`}>
        <Grid x={0} y={0} width={w} height={h} />
        <text x={8} y={14} fontSize={10} fontWeight={600} fill="var(--color-ink-soft)">
          {lead}
        </text>
        <polyline
          points={pts}
          fill="none"
          stroke="var(--color-trace)"
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
