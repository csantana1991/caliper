import {
  LEAD_IDS,
  type LeadId,
  type LeadShape,
  type RhythmEvent,
  type TracingSpec,
} from "./types";

function gauss(t: number, mu: number, sigma: number) {
  const z = (t - mu) / sigma;
  return Math.exp(-0.5 * z * z);
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function sampleQrs(u: number, shape: LeadShape, wide: boolean): number {
  const d = shape.delta ?? 0;
  if (d !== 0 && u < 0.28) {
    return d * (u / 0.28) * 0.85;
  }
  const r2 = shape.rPrime ?? 0;
  const s2 = shape.sPrime ?? 0;
  const notch = shape.notch ?? 0;
  if (r2 !== 0) {
    if (u < 0.18) return shape.q * (u / 0.18);
    if (u < 0.38) return shape.q + (shape.r - shape.q) * ((u - 0.18) / 0.2);
    if (u < 0.55) return shape.r + (shape.s - shape.r) * ((u - 0.38) / 0.17);
    if (u < 0.78) return shape.s + (r2 - shape.s) * ((u - 0.55) / 0.23);
    return r2 + ((s2 || shape.s * 0.2) - r2) * ((u - 0.78) / 0.22);
  }
  if (u < 0.2) return shape.q * (u / 0.2);
  if (u < 0.48) {
    const r = shape.r + (notch && u > 0.34 && u < 0.42 ? -notch : 0);
    return shape.q + (r - shape.q) * ((u - 0.2) / 0.28);
  }
  const tail = wide ? 1 : 1;
  return shape.r + (shape.s - shape.r) * ((u - 0.48) / (0.52 * tail));
}

function sampleBeat(
  tFromQrs: number,
  spec: TracingSpec,
  shape: LeadShape,
  event: RhythmEvent,
  lead?: LeadId,
): number {
  const pr = event.prMs ?? spec.pr;
  const qrs = event.wide ? Math.max(spec.qrs, 140) : spec.qrs;
  const qt = event.wide ? spec.qt + 40 : spec.qt;
  const pol = event.polarity ?? 1;
  let v = 0;

  if (event.pWave && event.kind !== "pvc") {
    const pWidth = spec.rhythm === "svt" ? 70 : 90;
    const pCenter = -pr + pWidth * 0.45;
    v += shape.p * gauss(tFromQrs, pCenter, pWidth / 2.35);
  }

  if (event.kind === "pvc") {
    const width = 160;
    if (tFromQrs >= 0 && tFromQrs < width) {
      const u = tFromQrs / width;
      v += pol * (shape.r * 1.4 - shape.s) * Math.sin(Math.PI * u) * (u < 0.55 ? 1 : 0.7);
      v += pol * -0.4 * gauss(tFromQrs, width * 0.7, 28);
    }
    v += -pol * Math.abs(shape.t) * 1.1 * gauss(tFromQrs, 230, 70);
    return v;
  }

  if (tFromQrs >= 0 && tFromQrs < qrs) {
    v += sampleQrs(tFromQrs / qrs, shape, Boolean(event.wide));
  }

  if (spec.osborn && tFromQrs >= qrs - 8 && tFromQrs < qrs + 55) {
    v += 0.35 * gauss(tFromQrs, qrs + 12, 10);
  }

  if (spec.epsilon && (lead === "V1" || lead === "V2" || lead === "V3") && tFromQrs >= qrs + 8 && tFromQrs < qrs + 48) {
    v += 0.14 * gauss(tFromQrs, qrs + 22, 6);
  }

  const stStart = qrs;
  const stEnd = qrs + 70;
  if (tFromQrs >= stStart && tFromQrs < stEnd) {
    const u = (tFromQrs - stStart) / (stEnd - stStart);
    const from = tFromQrs < qrs ? 0 : shape.s * Math.max(0, 1 - (tFromQrs - (qrs - 8)) / 16);
    v += from * (1 - u) + shape.st * u;
  } else if (tFromQrs >= stEnd && tFromQrs < qt - 20) {
    const tCenter = qrs + (qt - qrs) * 0.58;
    const decay = 1 - clamp((tFromQrs - stEnd) / 90, 0, 1);
    v += shape.st * decay * 0.85;
    const tAmp = shape.tInvert ? -Math.abs(shape.t) : shape.t;
    v += tAmp * gauss(tFromQrs, tCenter, (qt - qrs) / 3.1);
  } else if (tFromQrs >= 0) {
    const tCenter = qrs + (qt - qrs) * 0.58;
    const tAmp = shape.tInvert ? -Math.abs(shape.t) : shape.t;
    v += tAmp * gauss(tFromQrs, tCenter, (qt - qrs) / 3.1);
  }

  return v;
}

function flutterVoltage(tMs: number, lead: LeadId, rate: number) {
  const inferior = lead === "II" || lead === "III" || lead === "aVF";
  const amp = inferior ? 0.28 : lead === "V1" ? 0.16 : 0.08;
  const phase = (tMs / 1000) * rate;
  const saw = 1 - 2 * (phase - Math.floor(phase));
  const sharp = Math.pow(Math.abs(saw), 0.65) * Math.sign(saw);
  return inferior ? -amp * (0.45 + 0.55 * sharp) : amp * sharp * 0.5;
}

function afNoise(tMs: number, lead: LeadId) {
  const amp = lead === "V1" ? 0.08 : lead === "II" ? 0.05 : 0.03;
  return (
    amp *
    (Math.sin(tMs * 0.11) * 0.4 +
      Math.sin(tMs * 0.073 + 1.2) * 0.3 +
      Math.sin(tMs * 0.19 + 2.1) * 0.2)
  );
}

function vfVoltage(tMs: number, lead: LeadId) {
  const seed = LEAD_IDS.indexOf(lead);
  return (
    0.55 * Math.sin(tMs * 0.041 + seed) +
    0.35 * Math.sin(tMs * 0.067 + seed * 1.7) +
    0.22 * Math.sin(tMs * 0.11 + seed * 0.4) +
    0.12 * Math.sin(tMs * 0.019)
  );
}

function torsadesVoltage(tMs: number, lead: LeadId) {
  const twist = Math.sin((2 * Math.PI * tMs) / 1800);
  const amp = 0.45 + 1.15 * Math.abs(twist);
  const inferior = lead === "II" || lead === "III" || lead === "aVF";
  const pol = inferior ? 1 : lead.startsWith("V") ? -0.7 : 0.5;
  return amp * pol * Math.sin((2 * Math.PI * tMs) / 200);
}

export function buildEvents(spec: TracingSpec, durationMs = 10000): RhythmEvent[] {
  if (spec.events?.length) return spec.events;
  const events: RhythmEvent[] = [];
  const rr = 60000 / Math.max(spec.rate, 20);

  if (spec.rhythm === "vf" || spec.rhythm === "torsades") return events;

  if (spec.rhythm === "af") {
    let t = 90;
    while (t < durationMs + 400) {
      const jitter = 0.55 + hash(t + spec.rate) * 0.9;
      events.push({ tMs: t, kind: "sinus", pWave: false });
      t += rr * jitter;
    }
    return events;
  }

  if (spec.rhythm === "flutter") {
    const frr = 60000 / (spec.flutterRate ?? 300);
    const ratio = spec.flutterRatio ?? 4;
    let t = 70;
    let n = 0;
    while (t < durationMs + 400) {
      if (n % ratio === 0) events.push({ tMs: t, kind: "sinus", pWave: false });
      t += frr;
      n += 1;
    }
    return events;
  }

  if (spec.rhythm === "mat") {
    let t = 80;
    let i = 0;
    while (t < durationMs + 400) {
      events.push({ tMs: t, kind: "pac", pWave: true, prMs: 120 + (i % 3) * 30 });
      t += rr * (0.78 + hash(i + 9) * 0.45);
      i += 1;
    }
    return events;
  }

  if (spec.rhythm === "svt") {
    for (let t = 40; t < durationMs + 400; t += rr) {
      events.push({ tMs: t, kind: "sinus", pWave: true, prMs: 90 });
    }
    return events;
  }

  if (spec.rhythm === "vt") {
    for (let t = 60; t < durationMs + 400; t += rr) {
      events.push({ tMs: t, kind: "pvc", pWave: false, wide: true, polarity: -1 });
    }
    return events;
  }

  if (spec.rhythm === "chb") {
    const pRr = 60000 / 88;
    const vRr = 60000 / spec.rate;
    for (let t = 40; t < durationMs + 400; t += vRr) {
      events.push({ tMs: t, kind: "escape", pWave: false, wide: spec.qrs >= 120 });
    }
    for (let t = 20; t < durationMs + 400; t += pRr) {
      events.push({ tMs: t, kind: "sinus", pWave: true, prMs: 0, wide: false });
    }
    events.sort((a, b) => a.tMs - b.tMs);
    return events;
  }

  if (spec.rhythm === "mobitz1") {
    let t = 80;
    let beat = 0;
    const cycle = 4;
    while (t < durationMs + 400) {
      const pos = beat % cycle;
      if (pos === cycle - 1) {
        events.push({ tMs: t, kind: "dropped", pWave: true, prMs: 320 });
        t += rr;
      } else {
        events.push({ tMs: t, kind: "sinus", pWave: true, prMs: 160 + pos * 70 });
        t += rr;
      }
      beat += 1;
    }
    return events;
  }

  if (spec.rhythm === "mobitz2") {
    let t = 90;
    let n = 0;
    while (t < durationMs + 400) {
      if (n % 3 === 2) {
        events.push({ tMs: t, kind: "dropped", pWave: true, prMs: spec.pr });
      } else {
        events.push({ tMs: t, kind: "sinus", pWave: true, prMs: spec.pr });
      }
      t += rr;
      n += 1;
    }
    return events;
  }

  if (spec.rhythm === "paced") {
    for (let t = 70; t < durationMs + 400; t += rr) {
      events.push({ tMs: t, kind: "paced", pWave: false, wide: true });
    }
    return events;
  }

  if (spec.rhythm === "junctional") {
    for (let t = 90; t < durationMs + 400; t += rr) {
      events.push({ tMs: t, kind: "escape", pWave: false, prMs: 0 });
    }
    return events;
  }

  for (let t = 110; t < durationMs + 400; t += rr) {
    events.push({ tMs: t, kind: "sinus", pWave: true, prMs: spec.pr });
  }
  return events;
}

export function sampleLead(spec: TracingSpec, lead: LeadId, tMs: number, events: RhythmEvent[]) {
  const shape = spec.leads[lead];
  let v = 0;

  if (spec.rhythm === "vf") return vfVoltage(tMs, lead);
  if (spec.rhythm === "torsades") return torsadesVoltage(tMs, lead);

  if (spec.rhythm === "flutter") v += flutterVoltage(tMs, lead, spec.flutterRate ?? 300);
  if (spec.rhythm === "af") v += afNoise(tMs, lead);

  if (spec.rhythm === "chb") {
    for (const ev of events) {
      if (ev.kind === "sinus" && ev.pWave) {
        const dt = tMs - ev.tMs;
        if (dt > -120 && dt < 80) v += shape.p * gauss(dt, 0, 28);
      }
    }
  }

  for (const ev of events) {
    if (ev.kind === "dropped") {
      const dt = tMs - ev.tMs;
      if (ev.pWave && dt > -((ev.prMs ?? 200) + 40) && dt < 40) {
        const pWidth = 90;
        const pCenter = -(ev.prMs ?? 200) + pWidth * 0.45;
        v += shape.p * gauss(dt, pCenter, pWidth / 2.35);
      }
      continue;
    }
    if (spec.rhythm === "chb" && ev.kind === "sinus") continue;
    const dt = tMs - ev.tMs;
    if (dt < -220 || dt > 520) continue;
    v += sampleBeat(dt, spec, shape, ev, lead);
  }

  if (spec.electricalAlternans) {
    const rr = 60000 / spec.rate;
    v *= 1 + spec.electricalAlternans * Math.sin((2 * Math.PI * tMs) / rr);
  }

  const n = spec.noise ?? 0.012;
  v += (hash(tMs * 0.17 + lead.charCodeAt(0)) - 0.5) * n;
  return v;
}

export function leadPath(
  spec: TracingSpec,
  lead: LeadId,
  x0: number,
  y0: number,
  t0: number,
  t1: number,
  events: RhythmEvent[],
) {
  const step = 4;
  const pts: string[] = [];
  for (let t = t0; t <= t1; t += step) {
    const v = sampleLead(spec, lead, t, events);
    const x = x0 + ((t - t0) / 1000) * 105;
    const y = y0 - v * 42;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}
