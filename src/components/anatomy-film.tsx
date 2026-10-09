export function AnatomyFilm() {
  return (
    <div className="space-y-4">
      <figure className="overflow-hidden rounded-3xl bg-ink shadow-border">
        <div className="flex items-center justify-between px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-paper/60">
          <span>Cardiac anatomy</span>
          <span className="font-mono">0:10</span>
        </div>
        <video
          className="aspect-video w-full bg-scan"
          controls
          playsInline
          preload="metadata"
          poster="/anatomy/poster.jpg"
        >
          <source src="/anatomy/cardiac-anatomy.mp4" type="video/mp4" />
        </video>
        <figcaption className="bg-paper px-4 py-3 text-sm leading-relaxed text-ink-soft">
          Blue is the right heart: body to lungs. Red is the left heart: lungs to the body.
          The clip is unlabeled. Names are on the map.
        </figcaption>
      </figure>
      <AnatomyMap />
    </div>
  );
}

function AnatomyMap() {
  return (
    <figure className="overflow-hidden rounded-3xl bg-scan shadow-border">
      <div className="flex items-center justify-between px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-vessel/70">
        <span>Anterior map · patient’s right is on your left</span>
        <span className="font-mono">Label it</span>
      </div>
      <svg viewBox="0 0 720 420" className="h-auto w-full" role="img" aria-label="Labeled anterior heart: chambers, coronaries, conduction">
        <rect width="720" height="420" fill="var(--color-scan)" />
        <ellipse cx="250" cy="168" rx="62" ry="52" fill="#16323a" stroke="var(--color-info)" strokeWidth="3" />
        <ellipse cx="228" cy="268" rx="78" ry="62" fill="#16323a" stroke="var(--color-info)" strokeWidth="3" />
        <ellipse cx="390" cy="156" rx="54" ry="44" fill="#2a1816" stroke="var(--color-jet)" strokeWidth="3" />
        <ellipse cx="400" cy="268" rx="86" ry="72" fill="#2a1816" stroke="var(--color-jet)" strokeWidth="3" />
        <path d="M330 118 C 360 70 430 70 470 120" fill="none" stroke="var(--color-jet)" strokeWidth="8" strokeLinecap="round" />
        <path d="M250 210 C 250 160 300 130 330 118" fill="none" stroke="var(--color-info)" strokeWidth="7" strokeLinecap="round" />
        <path d="M250 70 V 120" fill="none" stroke="var(--color-vessel)" strokeWidth="4" />
        <path d="M210 320 V 370" fill="none" stroke="var(--color-vessel)" strokeWidth="4" />
        <path d="M348 148 L 368 210 L 392 320" fill="none" stroke="var(--color-vessel)" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M348 148 C 430 150 490 180 520 230" fill="none" stroke="var(--color-vessel)" strokeWidth="3" strokeLinecap="round" />
        <path d="M318 140 C 240 160 190 210 176 280" fill="none" stroke="var(--color-warn)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="248" cy="112" r="6" fill="var(--color-ok)" />
        <circle cx="318" cy="200" r="6" fill="var(--color-ok)" />
        <path d="M318 200 L 340 250" fill="none" stroke="var(--color-ok)" strokeWidth="2" />
        <path d="M340 250 L 300 310" fill="none" stroke="var(--color-ok)" strokeWidth="2" />
        <path d="M340 250 L 400 320" fill="none" stroke="var(--color-ok)" strokeWidth="2" />
        <text x="228" y="172" fill="var(--color-vessel)" fontSize="14">RA</text>
        <text x="200" y="272" fill="var(--color-vessel)" fontSize="14">RV</text>
        <text x="372" y="160" fill="var(--color-vessel)" fontSize="14">LA</text>
        <text x="382" y="274" fill="var(--color-vessel)" fontSize="14">LV</text>
        <text x="430" y="78" fill="var(--color-jet)" fontSize="13">Aorta</text>
        <text x="300" y="128" fill="var(--color-info)" fontSize="12">PA</text>
        <text x="258" y="64" fill="var(--color-vessel)" fontSize="12">SVC</text>
        <text x="176" y="384" fill="var(--color-vessel)" fontSize="12">IVC</text>
        <text x="398" y="336" fill="var(--color-vessel)" fontSize="12">LAD</text>
        <text x="524" y="246" fill="var(--color-vessel)" fontSize="12">LCx</text>
        <text x="128" y="292" fill="var(--color-warn)" fontSize="12">RCA</text>
        <text x="214" y="108" fill="var(--color-ok)" fontSize="11">SA</text>
        <text x="326" y="196" fill="var(--color-ok)" fontSize="11">AV</text>
        <g transform="translate(560 70)">
          <text fill="var(--color-vessel)" fontSize="13">Right heart</text>
          <text y="22" fill="var(--color-info)" fontSize="12">to the lungs</text>
          <text y="52" fill="var(--color-vessel)" fontSize="13">Left heart</text>
          <text y="74" fill="var(--color-jet)" fontSize="12">to the body</text>
          <text y="110" fill="var(--color-vessel)" fontSize="13">LAD</text>
          <text y="130" fill="var(--color-vessel)" fontSize="12" opacity="0.8">front and septum</text>
          <text y="158" fill="var(--color-warn)" fontSize="13">RCA</text>
          <text y="178" fill="var(--color-warn)" fontSize="12" opacity="0.85">inferior if dominant</text>
          <text y="206" fill="var(--color-ok)" fontSize="13">SA → AV → His</text>
        </g>
      </svg>
    </figure>
  );
}
