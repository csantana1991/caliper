import { getEcho } from "@/lib/echo/presets";
import type { EchoStudy, WallMotion } from "@/lib/echo/types";

const WALL: Record<WallMotion, string> = {
  normal: "var(--color-myo)",
  hypo: "var(--color-warn)",
  akinetic: "var(--color-danger)",
  aneurysm: "var(--color-danger)",
};

function wall(study: EchoStudy, key: keyof NonNullable<EchoStudy["walls"]>) {
  return WALL[study.walls?.[key] ?? "normal"];
}

function A4C({ s }: { s: EchoStudy }) {
  const dilated = s.lvSize === "dilated";
  const small = s.lvSize === "small";
  const lvW = dilated ? 92 : small ? 62 : 74;
  const lvH = dilated ? 118 : small ? 86 : 100;
  const apexY = s.walls?.apex === "aneurysm" ? 28 : 42;
  const laW = s.laSize === "large" ? 78 : 58;
  return (
    <g>
      <ellipse cx="168" cy="118" rx={lvW} ry={lvH} fill="var(--color-cavity)" stroke={wall(s, "septum")} strokeWidth="14" />
      <path d={`M168 ${apexY} Q 120 70 110 130 Q 125 210 168 ${210 - (dilated ? 0 : 8)} Q 210 210 226 130 Q 216 70 168 ${apexY}`} fill="none" stroke={wall(s, "apex")} strokeWidth="10" />
      <ellipse cx="168" cy="228" rx={laW} ry="36" fill="var(--color-cavity)" stroke="var(--color-myo)" strokeWidth="8" />
      <ellipse cx="258" cy="130" rx="40" ry={s.rvStrain ? 62 : 48} fill="var(--color-cavity)" stroke="var(--color-myo)" strokeWidth="8" />
      <ellipse cx="250" cy="228" rx="42" ry="32" fill="var(--color-cavity)" stroke="var(--color-myo)" strokeWidth="7" />
      <path d="M145 186 Q168 176 191 186" fill="none" stroke="var(--color-vessel)" strokeWidth="3" />
      <path d="M232 186 Q250 178 266 186" fill="none" stroke="var(--color-vessel)" strokeWidth="2.5" />
      {s.mr && s.mr >= 2 ? (
        <path d={`M168 186 Q 150 ${210 - s.mr * 4} 140 248`} fill="none" stroke="var(--color-jet)" strokeWidth={2 + s.mr} opacity="0.85" />
      ) : null}
      {s.shunt === "asd" ? <rect x="198" y="214" width="14" height="28" fill="var(--color-scan)" /> : null}
      {s.shunt === "vsd" ? <rect x="196" y="108" width="12" height="22" fill="var(--color-scan)" /> : null}
      {s.vegetation === "mv" ? <circle cx="176" cy="182" r="6" fill="var(--color-vessel)" /> : null}
      <text x="150" y="120" fill="var(--color-vessel)" fontSize="11" opacity="0.5">LV</text>
      <text x="248" y="130" fill="var(--color-vessel)" fontSize="11" opacity="0.5">RV</text>
      <text x="150" y="234" fill="var(--color-vessel)" fontSize="11" opacity="0.5">LA</text>
      <text x="238" y="234" fill="var(--color-vessel)" fontSize="11" opacity="0.5">RA</text>
    </g>
  );
}

function PLAX({ s }: { s: EchoStudy }) {
  const thick = s.septum === "ash" ? 28 : s.septum === "infiltrate" ? 24 : 14;
  const lvH = s.lvSize === "dilated" ? 70 : s.lvSize === "small" ? 42 : 52;
  const avOpen = s.as && s.as >= 3 ? 4 : 14;
  return (
    <g>
      {s.effusion === "large" ? (
        <ellipse cx="200" cy="155" rx="168" ry="108" fill="var(--color-info-bg)" opacity="0.35" />
      ) : null}
      <path d="M70 70 Q 200 40 330 78" fill="none" stroke="var(--color-myo)" strokeWidth="10" />
      <rect x="86" y={140 - lvH} width="150" height={lvH * 2} rx="40" fill="var(--color-cavity)" stroke={wall(s, "anterior")} strokeWidth={thick} />
      <rect x="236" y="86" width="70" height="44" rx="8" fill="var(--color-cavity)" stroke="var(--color-myo)" strokeWidth="8" />
      <rect x="236" y="168" width="86" height="58" rx="16" fill="var(--color-cavity)" stroke="var(--color-myo)" strokeWidth="8" />
      <path d={`M236 108 L ${236 + avOpen} 108`} stroke="var(--color-vessel)" strokeWidth="3" />
      <path d={`M236 118 L ${236 + avOpen} 118`} stroke="var(--color-vessel)" strokeWidth="3" />
      <path d={s.ms && s.ms >= 3 ? "M200 140 L 228 148" : "M198 132 Q 214 148 232 132"} fill="none" stroke="var(--color-vessel)" strokeWidth="3" />
      {s.sam ? <path d="M210 128 L 228 108" stroke="var(--color-warn)" strokeWidth="3" /> : null}
      {s.ar && s.ar >= 2 ? (
        <path d={`M240 120 Q 200 ${140 + s.ar * 6} 170 170`} fill="none" stroke="var(--color-jet)" strokeWidth={2 + s.ar} />
      ) : null}
      {s.vegetation === "av" ? <circle cx="242" cy="114" r="6" fill="var(--color-vessel)" /> : null}
      {s.effusion === "large" ? (
        <path d="M70 200 Q 200 250 330 210" fill="none" stroke="var(--color-info)" strokeWidth="18" opacity="0.45" />
      ) : null}
      <text x="130" y="150" fill="var(--color-vessel)" fontSize="11" opacity="0.5">LV</text>
      <text x="258" y="112" fill="var(--color-vessel)" fontSize="11" opacity="0.5">Ao</text>
      <text x="258" y="200" fill="var(--color-vessel)" fontSize="11" opacity="0.5">LA</text>
    </g>
  );
}

function PSAX({ s }: { s: EchoStudy }) {
  const dSign = s.rvStrain;
  return (
    <g>
      <circle cx="200" cy="150" r="78" fill="var(--color-cavity)" stroke="var(--color-myo)" strokeWidth="18" />
      {dSign ? (
        <path d="M145 150 Q 200 128 255 150" fill="none" stroke="var(--color-warn)" strokeWidth="6" />
      ) : (
        <circle cx="200" cy="150" r="8" fill="var(--color-myo)" opacity="0.4" />
      )}
      <path d="M110 88 Q 70 150 120 220" fill="var(--color-cavity)" stroke="var(--color-myo)" strokeWidth="10" />
      <text x="186" y="154" fill="var(--color-vessel)" fontSize="11" opacity="0.5">LV</text>
      <text x="78" y="154" fill="var(--color-vessel)" fontSize="11" opacity="0.5">RV</text>
    </g>
  );
}

export function EchoStudyView({ studyId }: { studyId: string }) {
  const s = getEcho(studyId);
  return (
    <figure className="overflow-hidden rounded-3xl bg-scan shadow-border">
      <div className="flex items-center justify-between px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-vessel/70">
        <span>Echo · {s.view.toUpperCase()}</span>
        <span className="font-mono tabular-nums">EF {s.ef}%</span>
      </div>
      <svg viewBox="0 0 400 300" className="h-auto w-full" role="img" aria-label={s.label}>
        <defs>
          <clipPath id={`sector-${s.id}`}>
            <path d="M200 8 L 28 292 H 372 Z" />
          </clipPath>
        </defs>
        <rect width="400" height="300" fill="var(--color-scan)" />
        <g clipPath={`url(#sector-${s.id})`}>
          <path d="M200 8 L 28 292 H 372 Z" fill="#0a1418" />
          {s.view === "a4c" ? <A4C s={s} /> : s.view === "plax" ? <PLAX s={s} /> : <PSAX s={s} />}
        </g>
        <path d="M200 8 L 28 292" fill="none" stroke="var(--color-accent)" strokeWidth="1" opacity="0.35" />
        <path d="M200 8 L 372 292" fill="none" stroke="var(--color-accent)" strokeWidth="1" opacity="0.35" />
      </svg>
      <figcaption className="px-4 py-2 text-sm text-vessel">{s.label}</figcaption>
    </figure>
  );
}
