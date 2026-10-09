import { getHemo } from "@/lib/hemo/presets";

const COL: Record<string, string> = {
  lv: "var(--color-danger)",
  ao: "var(--color-ok)",
  la: "var(--color-warn)",
  rv: "var(--color-info)",
  pa: "var(--color-accent-2)",
  ra: "var(--color-stone)",
};

export function HemoStrip({ studyId }: { studyId: string }) {
  const s = getHemo(studyId);
  const w = 640;
  const h = 220;
  const pad = 28;
  function xy(i: number, n: number, mm: number) {
    const x = pad + (i / (n - 1)) * (w - pad * 2);
    const y = h - pad - (mm / s.ymax) * (h - pad * 2);
    return `${x},${y}`;
  }
  return (
    <figure className="overflow-hidden rounded-3xl bg-ink shadow-border">
      <div className="flex items-center justify-between px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-paper/50">
        <span>Cath hemodynamics</span>
        <span className="font-mono">{s.ymax} mmHg</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" role="img" aria-label={s.label}>
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={pad}
            x2={w - pad}
            y1={h - pad - f * (h - pad * 2)}
            y2={h - pad - f * (h - pad * 2)}
            stroke="var(--color-paper)"
            opacity="0.08"
          />
        ))}
        {s.traces.map((t) => (
          <polyline
            key={t.id}
            fill="none"
            stroke={COL[t.color]}
            strokeWidth="2.4"
            points={t.samples.map((mm, i) => xy(i, t.samples.length, mm)).join(" ")}
          />
        ))}
        {s.traces.map((t, i) => (
          <text key={t.id} x={pad + i * 72} y={18} fill={COL[t.color]} fontSize="12">
            {t.name}
          </text>
        ))}
      </svg>
      <figcaption className="px-4 py-3 text-sm text-paper/80">{s.callout}</figcaption>
    </figure>
  );
}
