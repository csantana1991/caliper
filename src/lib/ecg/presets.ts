import { LEAD_IDS, type LeadId, type LeadShape, type TracingSpec } from "./types";

function L(
  p: number,
  q: number,
  r: number,
  s: number,
  st: number,
  t: number,
  extra?: Partial<LeadShape>,
): LeadShape {
  return { p, q, r, s, st, t, ...extra };
}

function normalLeads(): Record<LeadId, LeadShape> {
  return {
    I: L(0.1, -0.06, 0.72, -0.12, 0, 0.24),
    II: L(0.16, -0.08, 1.15, -0.18, 0, 0.32),
    III: L(0.08, -0.1, 0.42, -0.22, 0, 0.14),
    aVR: L(-0.1, 0.04, -0.55, 0.12, 0, -0.18),
    aVL: L(0.07, -0.08, 0.38, -0.1, 0, 0.14),
    aVF: L(0.12, -0.1, 0.78, -0.16, 0, 0.24),
    V1: L(0.05, 0, 0.18, -0.72, 0, 0.04),
    V2: L(0.07, 0, 0.48, -1.15, 0, 0.28),
    V3: L(0.09, -0.04, 1.05, -0.72, 0, 0.36),
    V4: L(0.1, -0.1, 1.55, -0.38, 0, 0.38),
    V5: L(0.1, -0.12, 1.28, -0.18, 0, 0.32),
    V6: L(0.09, -0.1, 1.02, -0.1, 0, 0.28),
  };
}

function clone(leads: Record<LeadId, LeadShape>): Record<LeadId, LeadShape> {
  const out = {} as Record<LeadId, LeadShape>;
  for (const id of LEAD_IDS) out[id] = { ...leads[id] };
  return out;
}

function mapLeads(
  leads: Record<LeadId, LeadShape>,
  ids: LeadId[],
  fn: (s: LeadShape) => LeadShape,
) {
  const out = clone(leads);
  for (const id of ids) out[id] = fn(out[id]);
  return out;
}

function spec(
  partial: Omit<TracingSpec, "leads"> & { leads?: Record<LeadId, LeadShape> },
): TracingSpec {
  return {
    leads: partial.leads ?? normalLeads(),
    ...partial,
  };
}

const INFERIOR: LeadId[] = ["II", "III", "aVF"];
const ANTERIOR: LeadId[] = ["V1", "V2", "V3", "V4"];
const LATERAL: LeadId[] = ["I", "aVL", "V5", "V6"];

export const TRACINGS: Record<string, TracingSpec> = {
  "nsr-normal": spec({
    id: "nsr-normal",
    rate: 72,
    pr: 160,
    qrs: 86,
    qt: 380,
    qtc: 416,
    axis: 48,
    rhythm: "sinus",
    label: "Normal sinus rhythm",
  }),

  "brady-1avb": spec({
    id: "brady-1avb",
    rate: 48,
    pr: 232,
    qrs: 84,
    qt: 417,
    qtc: 370,
    axis: 37,
    rhythm: "sinus",
    label: "Sinus bradycardia with first-degree AV block",
  }),

  "sinus-tach": spec({
    id: "sinus-tach",
    rate: 118,
    pr: 140,
    qrs: 82,
    qt: 310,
    qtc: 434,
    axis: 62,
    rhythm: "sinus",
    label: "Sinus tachycardia",
  }),

  "1avb": spec({
    id: "1avb",
    rate: 68,
    pr: 280,
    qrs: 88,
    qt: 390,
    qtc: 415,
    axis: 22,
    rhythm: "sinus",
    label: "First-degree AV block",
  }),

  mobitz1: spec({
    id: "mobitz1",
    rate: 64,
    pr: 180,
    qrs: 86,
    qt: 400,
    axis: 40,
    rhythm: "mobitz1",
    label: "Mobitz I (Wenckebach)",
  }),

  mobitz2: spec({
    id: "mobitz2",
    rate: 70,
    pr: 180,
    qrs: 128,
    qt: 420,
    axis: -12,
    rhythm: "mobitz2",
    label: "Mobitz II",
    leads: mapLeads(normalLeads(), ["V1"], (s) => ({
      ...s,
      r: 0.22,
      s: -0.5,
      rPrime: 0.85,
    })),
  }),

  chb: spec({
    id: "chb",
    rate: 38,
    pr: 160,
    qrs: 148,
    qt: 460,
    axis: -40,
    rhythm: "chb",
    label: "Complete heart block",
    leads: mapLeads(normalLeads(), ["V1", "V2", "I", "V6"], (s) => ({
      ...s,
      r: 0.1,
      s: -0.9,
      t: -0.2,
      st: 0.08,
    })),
  }),

  rbbb: spec({
    id: "rbbb",
    rate: 76,
    pr: 168,
    qrs: 142,
    qt: 410,
    axis: 70,
    rhythm: "sinus",
    label: "Right bundle branch block",
    leads: (() => {
      const l = normalLeads();
      l.V1 = L(0.05, 0, 0.22, -0.35, 0, -0.12, { rPrime: 0.95 });
      l.V2 = L(0.06, 0, 0.4, -0.5, 0, -0.08, { rPrime: 0.7 });
      l.I = L(0.1, -0.05, 0.55, -0.42, 0, 0.18);
      l.V6 = L(0.09, -0.08, 0.85, -0.45, 0, 0.22);
      l.aVL = L(0.06, -0.06, 0.32, -0.35, 0, 0.12);
      return l;
    })(),
  }),

  lbbb: spec({
    id: "lbbb",
    rate: 74,
    pr: 170,
    qrs: 156,
    qt: 430,
    axis: -18,
    rhythm: "sinus",
    label: "Left bundle branch block",
    leads: (() => {
      const l = normalLeads();
      l.V1 = L(0.04, 0, 0.08, -1.35, 0.12, -0.22);
      l.V2 = L(0.05, 0, 0.12, -1.5, 0.14, -0.18);
      l.I = L(0.08, 0, 1.05, 0, -0.12, -0.28, { notch: 0.18 });
      l.aVL = L(0.06, 0, 0.82, 0, -0.1, -0.22, { notch: 0.14 });
      l.V5 = L(0.08, 0, 1.35, -0.05, -0.14, -0.3, { notch: 0.2 });
      l.V6 = L(0.08, 0, 1.2, 0, -0.12, -0.26, { notch: 0.16 });
      l.V3 = L(0.06, 0, 0.35, -0.85, 0.06, 0.08);
      return l;
    })(),
  }),

  lafb: spec({
    id: "lafb",
    rate: 70,
    pr: 162,
    qrs: 98,
    qt: 390,
    axis: -58,
    rhythm: "sinus",
    label: "Left anterior fascicular block",
    leads: (() => {
      const l = normalLeads();
      l.I = L(0.1, -0.04, 0.88, -0.08, 0, 0.22);
      l.aVL = L(0.08, -0.04, 0.95, -0.06, 0, 0.2);
      l.II = L(0.08, -0.22, 0.28, -0.35, 0, 0.1);
      l.III = L(0.04, -0.32, 0.15, -0.55, 0, 0.06);
      l.aVF = L(0.06, -0.28, 0.2, -0.42, 0, 0.08);
      return l;
    })(),
  }),

  afib: spec({
    id: "afib",
    rate: 96,
    pr: 0,
    qrs: 86,
    qt: 340,
    axis: 44,
    rhythm: "af",
    label: "Atrial fibrillation",
    noise: 0.02,
  }),

  flutter: spec({
    id: "flutter",
    rate: 75,
    pr: 0,
    qrs: 84,
    qt: 360,
    axis: 55,
    rhythm: "flutter",
    flutterRate: 300,
    flutterRatio: 4,
    label: "Atrial flutter, 4:1",
  }),

  avnrt: spec({
    id: "avnrt",
    rate: 168,
    pr: 80,
    qrs: 78,
    qt: 260,
    axis: 50,
    rhythm: "svt",
    label: "AVNRT",
    leads: mapLeads(normalLeads(), ["II", "III", "aVF", "V1"], (s) => ({
      ...s,
      p: -0.08,
    })),
  }),

  wpw: spec({
    id: "wpw",
    rate: 78,
    pr: 92,
    qrs: 132,
    qt: 400,
    axis: -12,
    rhythm: "sinus",
    label: "WPW (pre-excitation)",
    leads: (() => {
      const l = normalLeads();
      for (const id of LEAD_IDS) {
        l[id] = { ...l[id], delta: id === "V1" ? -0.25 : 0.28 };
        l[id].q = id === "V1" ? 0 : -0.02;
      }
      l.V1 = { ...l.V1, r: -0.15, s: -0.9, delta: -0.3, t: 0.1 };
      l.I = { ...l.I, r: 0.9, delta: 0.32, q: 0 };
      l.V6 = { ...l.V6, r: 1.15, delta: 0.3, q: 0 };
      return l;
    })(),
  }),

  "stemi-anterior": spec({
    id: "stemi-anterior",
    rate: 88,
    pr: 154,
    qrs: 90,
    qt: 380,
    axis: 18,
    rhythm: "sinus",
    label: "Anterior STEMI",
    leads: (() => {
      const l = normalLeads();
      l.V1 = L(0.05, -0.18, 0.12, -0.4, 0.32, 0.55);
      l.V2 = L(0.06, -0.35, 0.22, -0.2, 0.55, 0.72);
      l.V3 = L(0.07, -0.42, 0.45, -0.1, 0.62, 0.8);
      l.V4 = L(0.08, -0.28, 0.85, -0.08, 0.42, 0.6);
      l.V5 = L(0.08, -0.12, 1.05, -0.1, 0.12, 0.38);
      l.II = L(0.14, -0.08, 1.0, -0.18, -0.12, 0.12);
      l.III = L(0.08, -0.1, 0.38, -0.2, -0.14, 0.06);
      l.aVF = L(0.1, -0.1, 0.7, -0.16, -0.12, 0.1);
      return l;
    })(),
  }),

  "stemi-inferior": spec({
    id: "stemi-inferior",
    rate: 62,
    pr: 170,
    qrs: 88,
    qt: 400,
    axis: 78,
    rhythm: "sinus",
    label: "Inferior STEMI",
    leads: (() => {
      const l = normalLeads();
      l.II = L(0.14, -0.28, 0.7, -0.1, 0.38, 0.5);
      l.III = L(0.1, -0.42, 0.55, -0.08, 0.48, 0.55);
      l.aVF = L(0.12, -0.35, 0.62, -0.08, 0.42, 0.52);
      l.aVL = L(0.05, 0.02, 0.28, -0.12, -0.18, -0.08);
      l.I = L(0.08, -0.04, 0.55, -0.12, -0.1, 0.08);
      l.V1 = L(0.05, 0, 0.15, -0.55, 0.08, 0.18);
      l.V2 = L(0.06, 0, 0.4, -0.7, -0.06, 0.16);
      return l;
    })(),
  }),

  wellens: spec({
    id: "wellens",
    rate: 68,
    pr: 158,
    qrs: 84,
    qt: 410,
    axis: 32,
    rhythm: "sinus",
    label: "Wellens pattern",
    leads: (() => {
      const l = normalLeads();
      l.V2 = L(0.07, 0, 0.55, -0.85, 0.04, -0.55, { tInvert: true });
      l.V3 = L(0.08, -0.04, 1.05, -0.5, 0.02, -0.62, { tInvert: true });
      l.V4 = L(0.09, -0.08, 1.35, -0.28, 0, -0.38, { tInvert: true });
      l.V1 = L(0.05, 0, 0.2, -0.7, 0, -0.12, { tInvert: true });
      return l;
    })(),
  }),

  dewinter: spec({
    id: "dewinter",
    rate: 82,
    pr: 150,
    qrs: 92,
    qt: 370,
    axis: 28,
    rhythm: "sinus",
    label: "De Winter pattern",
    leads: (() => {
      const l = normalLeads();
      l.V2 = L(0.06, 0, 1.4, -0.15, -0.28, 0.72);
      l.V3 = L(0.07, -0.04, 1.7, -0.1, -0.32, 0.85);
      l.V4 = L(0.08, -0.08, 1.85, -0.08, -0.28, 0.78);
      l.V5 = L(0.08, -0.1, 1.4, -0.1, -0.16, 0.5);
      l.V1 = L(0.05, 0, 0.3, -0.4, 0.18, 0.22);
      l.aVR = L(-0.08, 0.04, -0.45, 0.1, 0.12, -0.1);
      return l;
    })(),
  }),

  hyperk: spec({
    id: "hyperk",
    rate: 58,
    pr: 210,
    qrs: 118,
    qt: 340,
    axis: 10,
    rhythm: "sinus",
    label: "Hyperkalemia",
    leads: mapLeads(normalLeads(), LEAD_IDS.slice(), (s) => ({
      ...s,
      p: s.p * 0.35,
      t: Math.max(0.55, Math.abs(s.t) * 2.4),
      r: s.r * 0.85,
      s: s.s * 1.1,
    })),
  }),

  hypok: spec({
    id: "hypok",
    rate: 72,
    pr: 168,
    qrs: 90,
    qt: 520,
    axis: 40,
    rhythm: "sinus",
    label: "Hypokalemia",
    leads: mapLeads(normalLeads(), LEAD_IDS.slice(), (s) => ({
      ...s,
      t: s.t * 0.25,
      st: -0.08,
    })),
  }),

  brugada: spec({
    id: "brugada",
    rate: 66,
    pr: 162,
    qrs: 108,
    qt: 400,
    axis: 48,
    rhythm: "sinus",
    label: "Brugada type 1",
    leads: (() => {
      const l = normalLeads();
      l.V1 = L(0.05, 0, 0.15, -0.2, 0.55, -0.22, { rPrime: 0.55, tInvert: true });
      l.V2 = L(0.06, 0, 0.22, -0.15, 0.48, -0.2, { rPrime: 0.42, tInvert: true });
      l.V3 = L(0.07, 0, 0.7, -0.4, 0.08, 0.18);
      return l;
    })(),
  }),

  lqt: spec({
    id: "lqt",
    rate: 60,
    pr: 160,
    qrs: 84,
    qt: 560,
    qtc: 560,
    axis: 42,
    rhythm: "sinus",
    label: "Long QT",
    leads: mapLeads(normalLeads(), LEAD_IDS.slice(), (s) => ({
      ...s,
      t: s.t * 1.15,
    })),
  }),

  pericarditis: spec({
    id: "pericarditis",
    rate: 102,
    pr: 148,
    qrs: 82,
    qt: 340,
    axis: 50,
    rhythm: "sinus",
    label: "Pericarditis",
    leads: (() => {
      const l = mapLeads(normalLeads(), LEAD_IDS.slice(), (s) => ({
        ...s,
        st: 0.18,
        t: s.t * 1.1,
      }));
      l.aVR = L(-0.1, 0.04, -0.5, 0.1, -0.12, -0.1);
      l.V1 = L(0.05, 0, 0.18, -0.7, -0.04, 0.04);
      return l;
    })(),
  }),

  lvh: spec({
    id: "lvh",
    rate: 64,
    pr: 172,
    qrs: 102,
    qt: 420,
    axis: -8,
    rhythm: "sinus",
    label: "LVH with strain",
    leads: (() => {
      const l = normalLeads();
      l.V1 = L(0.06, 0, 0.12, -1.85, 0.08, 0.12);
      l.V2 = L(0.07, 0, 0.2, -2.1, 0.06, 0.1);
      l.V5 = L(0.1, -0.15, 2.35, -0.08, -0.14, -0.32, { tInvert: true });
      l.V6 = L(0.1, -0.14, 2.05, -0.06, -0.12, -0.28, { tInvert: true });
      l.aVL = L(0.08, -0.1, 1.35, -0.06, -0.1, -0.24, { tInvert: true });
      l.I = L(0.1, -0.08, 1.4, -0.08, -0.08, -0.18, { tInvert: true });
      return l;
    })(),
  }),

  vt: spec({
    id: "vt",
    rate: 176,
    pr: 0,
    qrs: 168,
    qt: 300,
    axis: -92,
    rhythm: "vt",
    label: "Monomorphic VT",
    leads: mapLeads(normalLeads(), LEAD_IDS.slice(), (s) => ({
      ...s,
      r: s.r * 0.2,
      s: -Math.abs(s.s) - 0.8,
      t: -0.35,
      st: 0.15,
    })),
  }),

  torsades: spec({
    id: "torsades",
    rate: 220,
    pr: 0,
    qrs: 180,
    qt: 200,
    axis: 0,
    rhythm: "torsades",
    label: "Torsades de pointes",
  }),

  vf: spec({
    id: "vf",
    rate: 280,
    pr: 0,
    qrs: 0,
    qt: 0,
    axis: 0,
    rhythm: "vf",
    label: "Ventricular fibrillation",
  }),

  paced: spec({
    id: "paced",
    rate: 70,
    pr: 0,
    qrs: 168,
    qt: 440,
    axis: -62,
    rhythm: "paced",
    label: "Ventricular paced rhythm",
    leads: (() => {
      const l = normalLeads();
      l.V1 = L(0, 0, 0.08, -1.4, 0.14, -0.22);
      l.I = L(0, 0, 1.1, 0, -0.14, -0.28);
      l.V6 = L(0, 0, 1.2, 0, -0.12, -0.26);
      l.II = L(0, -0.2, 0.25, -0.7, 0.08, -0.1);
      return l;
    })(),
  }),

  osborn: spec({
    id: "osborn",
    rate: 44,
    pr: 210,
    qrs: 110,
    qt: 520,
    axis: 70,
    rhythm: "sinus",
    osborn: true,
    label: "Hypothermia (Osborn waves)",
    leads: mapLeads(normalLeads(), ["V2", "V3", "V4", "II"], (s) => ({
      ...s,
      st: 0.08,
    })),
  }),

  "pe-s1q3t3": spec({
    id: "pe-s1q3t3",
    rate: 118,
    pr: 150,
    qrs: 92,
    qt: 330,
    axis: 110,
    rhythm: "sinus",
    label: "S1Q3T3 with sinus tachycardia",
    leads: (() => {
      const l = normalLeads();
      l.I = L(0.08, 0, 0.22, -0.55, 0, 0.1);
      l.III = L(0.04, -0.38, 0.55, -0.1, 0, -0.28, { tInvert: true });
      l.aVF = L(0.08, -0.18, 0.7, -0.12, 0, -0.12);
      l.V1 = L(0.06, 0, 0.45, -0.55, 0, -0.18, { tInvert: true });
      l.II = L(0.14, -0.08, 0.95, -0.2, 0, 0.16);
      return l;
    })(),
  }),

  junctional: spec({
    id: "junctional",
    rate: 48,
    pr: 0,
    qrs: 82,
    qt: 420,
    axis: 40,
    rhythm: "junctional",
    label: "Junctional escape",
    leads: mapLeads(normalLeads(), LEAD_IDS.slice(), (s) => ({ ...s, p: 0 })),
  }),

  "2to1-flutter": spec({
    id: "2to1-flutter",
    rate: 150,
    pr: 0,
    qrs: 84,
    qt: 280,
    axis: 55,
    rhythm: "flutter",
    flutterRate: 300,
    flutterRatio: 2,
    label: "Atrial flutter, 2:1",
  }),

  mat: spec({
    id: "mat",
    rate: 118,
    pr: 140,
    qrs: 84,
    qt: 320,
    axis: 70,
    rhythm: "mat",
    label: "Multifocal atrial tachycardia",
  }),

  "stemi-lateral": spec({
    id: "stemi-lateral",
    rate: 84,
    pr: 156,
    qrs: 88,
    qt: 380,
    axis: -12,
    rhythm: "sinus",
    label: "High lateral STEMI",
    leads: (() => {
      const l = normalLeads();
      l.I = L(0.1, -0.22, 0.55, -0.08, 0.32, 0.42);
      l.aVL = L(0.08, -0.35, 0.48, -0.06, 0.42, 0.5);
      l.V5 = L(0.09, -0.18, 1.15, -0.1, 0.28, 0.4);
      l.V6 = L(0.09, -0.16, 1.05, -0.08, 0.3, 0.42);
      l.III = L(0.06, -0.08, 0.42, -0.22, -0.18, 0.04);
      l.aVF = L(0.1, -0.1, 0.65, -0.16, -0.14, 0.08);
      l.II = L(0.14, -0.08, 0.95, -0.16, -0.08, 0.14);
      return l;
    })(),
  }),

  "stemi-posterior": spec({
    id: "stemi-posterior",
    rate: 78,
    pr: 160,
    qrs: 92,
    qt: 390,
    axis: 20,
    rhythm: "sinus",
    label: "Posterior STEMI",
    leads: (() => {
      const l = normalLeads();
      l.V1 = L(0.05, 0, 0.72, -0.22, -0.22, 0.32);
      l.V2 = L(0.06, 0, 1.05, -0.18, -0.28, 0.38);
      l.V3 = L(0.07, 0, 1.2, -0.2, -0.18, 0.28);
      l.V4 = L(0.08, -0.06, 1.35, -0.22, -0.06, 0.22);
      l.II = L(0.14, -0.12, 0.85, -0.12, 0.08, 0.22);
      l.III = L(0.08, -0.08, 0.5, -0.1, 0.12, 0.18);
      return l;
    })(),
  }),

  "stemi-rv": spec({
    id: "stemi-rv",
    rate: 58,
    pr: 176,
    qrs: 90,
    qt: 410,
    axis: 85,
    rhythm: "sinus",
    label: "Inferior STEMI with RV involvement",
    leads: (() => {
      const l = normalLeads();
      l.II = L(0.14, -0.28, 0.65, -0.1, 0.32, 0.45);
      l.III = L(0.1, -0.48, 0.5, -0.08, 0.52, 0.58);
      l.aVF = L(0.12, -0.38, 0.58, -0.08, 0.4, 0.5);
      l.aVL = L(0.05, 0.04, 0.22, -0.14, -0.22, -0.12);
      l.I = L(0.08, -0.04, 0.48, -0.12, -0.1, 0.06);
      l.V1 = L(0.05, 0, 0.22, -0.42, 0.22, 0.28);
      l.V2 = L(0.06, 0, 0.35, -0.85, -0.08, 0.12);
      l.V3 = L(0.07, 0, 0.55, -0.9, -0.1, 0.14);
      return l;
    })(),
  }),

  "old-anterior-mi": spec({
    id: "old-anterior-mi",
    rate: 72,
    pr: 164,
    qrs: 96,
    qt: 400,
    axis: 12,
    rhythm: "sinus",
    label: "Old anterior infarct (Q waves)",
    leads: (() => {
      const l = normalLeads();
      l.V1 = L(0.05, -0.55, 0.08, -0.35, 0, 0.08);
      l.V2 = L(0.06, -0.72, 0.12, -0.28, 0, 0.1);
      l.V3 = L(0.07, -0.62, 0.22, -0.22, 0, 0.14);
      l.V4 = L(0.08, -0.38, 0.55, -0.18, 0, 0.2);
      l.V5 = L(0.09, -0.12, 0.95, -0.12, 0, 0.24);
      return l;
    })(),
  }),

  "lv-aneurysm": spec({
    id: "lv-aneurysm",
    rate: 68,
    pr: 166,
    qrs: 102,
    qt: 420,
    axis: -8,
    rhythm: "sinus",
    label: "Anterior aneurysm (persistent STE + Q)",
    leads: (() => {
      const l = normalLeads();
      l.V1 = L(0.05, -0.62, 0.1, -0.28, 0.28, 0.12);
      l.V2 = L(0.06, -0.85, 0.14, -0.2, 0.38, 0.1);
      l.V3 = L(0.06, -0.78, 0.22, -0.16, 0.35, 0.12);
      l.V4 = L(0.07, -0.45, 0.48, -0.12, 0.22, 0.16);
      l.V5 = L(0.08, -0.12, 0.88, -0.1, 0.06, 0.2);
      return l;
    })(),
  }),

  nstemi: spec({
    id: "nstemi",
    rate: 86,
    pr: 158,
    qrs: 88,
    qt: 380,
    axis: 28,
    rhythm: "sinus",
    label: "NSTEMI (horizontal ST depression)",
    leads: (() => {
      const l = normalLeads();
      l.V3 = L(0.08, -0.06, 1.05, -0.55, -0.14, -0.12);
      l.V4 = L(0.09, -0.1, 1.35, -0.42, -0.2, -0.22, { tInvert: true });
      l.V5 = L(0.1, -0.12, 1.15, -0.22, -0.18, -0.28, { tInvert: true });
      l.V6 = L(0.09, -0.1, 0.95, -0.14, -0.16, -0.24, { tInvert: true });
      l.I = L(0.1, -0.08, 0.62, -0.12, -0.1, -0.12);
      l.aVL = L(0.07, -0.08, 0.42, -0.1, -0.1, -0.14);
      return l;
    })(),
  }),

  "hyperacute-t": spec({
    id: "hyperacute-t",
    rate: 80,
    pr: 152,
    qrs: 86,
    qt: 360,
    axis: 35,
    rhythm: "sinus",
    label: "Hyperacute T waves (early anterior occlusion)",
    leads: (() => {
      const l = normalLeads();
      l.V2 = L(0.06, 0, 0.55, -0.7, 0.08, 0.85);
      l.V3 = L(0.08, -0.06, 1.15, -0.4, 0.1, 1.05);
      l.V4 = L(0.09, -0.1, 1.45, -0.22, 0.08, 0.92);
      l.V5 = L(0.09, -0.1, 1.2, -0.14, 0.04, 0.55);
      l.II = L(0.14, -0.08, 1.0, -0.16, -0.06, 0.18);
      return l;
    })(),
  }),

  myocarditis: spec({
    id: "myocarditis",
    rate: 108,
    pr: 146,
    qrs: 86,
    qt: 340,
    axis: 48,
    rhythm: "sinus",
    label: "Myocarditis (diffuse STE, no reciprocal wall)",
    leads: (() => {
      const l = mapLeads(normalLeads(), LEAD_IDS.slice(), (s) => ({
        ...s,
        st: 0.16,
        t: s.t * 0.7,
      }));
      l.aVR = L(-0.1, 0.04, -0.5, 0.1, -0.08, -0.12);
      l.V1 = L(0.05, 0, 0.16, -0.72, 0.02, 0.02);
      l.II = L(0.16, -0.08, 1.05, -0.16, 0.2, 0.18);
      l.V5 = L(0.1, -0.12, 1.15, -0.14, 0.18, -0.12, { tInvert: true });
      l.V6 = L(0.09, -0.1, 0.95, -0.1, 0.16, -0.1, { tInvert: true });
      return l;
    })(),
  }),

  sarcoid: spec({
    id: "sarcoid",
    rate: 36,
    pr: 160,
    qrs: 148,
    qt: 460,
    axis: -42,
    rhythm: "chb",
    label: "Cardiac sarcoid (complete block + RBBB-like escape)",
    leads: (() => {
      const l = normalLeads();
      l.V1 = L(0.04, 0, 0.18, -0.28, 0.08, -0.16, { rPrime: 0.82 });
      l.V2 = L(0.05, 0, 0.28, -0.4, 0.06, -0.12, { rPrime: 0.55 });
      l.I = L(0.08, -0.04, 0.45, -0.42, 0, 0.1);
      l.V6 = L(0.08, -0.06, 0.7, -0.4, 0, 0.12);
      l.V3 = L(0.05, -0.35, 0.22, -0.5, 0.04, 0.08);
      l.V4 = L(0.06, -0.22, 0.4, -0.28, 0.02, 0.1);
      return l;
    })(),
  }),

  amyloid: spec({
    id: "amyloid",
    rate: 88,
    pr: 210,
    qrs: 102,
    qt: 400,
    axis: -18,
    rhythm: "sinus",
    label: "Amyloid (low voltage + pseudoinfarct Q)",
    leads: (() => {
      const l = normalLeads();
      for (const id of ["I", "II", "III", "aVR", "aVL", "aVF"] as LeadId[]) {
        l[id] = {
          ...l[id],
          r: l[id].r * 0.32,
          s: l[id].s * 0.4,
          p: l[id].p * 0.7,
          t: l[id].t * 0.5,
        };
      }
      l.V1 = L(0.04, -0.28, 0.12, -0.35, 0, 0.06);
      l.V2 = L(0.05, -0.32, 0.22, -0.4, 0, 0.08);
      l.V3 = L(0.06, -0.22, 0.45, -0.35, 0, 0.1);
      l.V4 = L(0.07, -0.08, 0.7, -0.22, 0, 0.14);
      l.V5 = L(0.08, -0.06, 0.62, -0.14, 0, 0.12);
      l.V6 = L(0.07, -0.05, 0.5, -0.1, 0, 0.1);
      return l;
    })(),
  }),

  arvc: spec({
    id: "arvc",
    rate: 64,
    pr: 168,
    qrs: 112,
    qt: 410,
    axis: 78,
    rhythm: "sinus",
    epsilon: true,
    label: "ARVC (T inversion V1–V3, epsilon)",
    leads: (() => {
      const l = normalLeads();
      l.V1 = L(0.05, 0, 0.22, -0.28, 0.02, -0.28, { rPrime: 0.38, tInvert: true });
      l.V2 = L(0.06, 0, 0.35, -0.4, 0, -0.35, { rPrime: 0.22, tInvert: true });
      l.V3 = L(0.07, 0, 0.55, -0.55, 0, -0.32, { tInvert: true });
      l.V4 = L(0.08, -0.04, 0.95, -0.4, 0, -0.08);
      l.II = L(0.14, -0.08, 0.85, -0.18, 0, -0.12);
      l.III = L(0.08, -0.1, 0.45, -0.2, 0, -0.16, { tInvert: true });
      return l;
    })(),
  }),

  hcm: spec({
    id: "hcm",
    rate: 62,
    pr: 170,
    qrs: 108,
    qt: 440,
    axis: -22,
    rhythm: "sinus",
    label: "Apical HCM (giant T inversion)",
    leads: (() => {
      const l = normalLeads();
      l.V3 = L(0.08, -0.08, 1.85, -0.35, 0.02, -0.85, { tInvert: true });
      l.V4 = L(0.1, -0.12, 2.45, -0.18, 0, -1.15, { tInvert: true });
      l.V5 = L(0.1, -0.18, 2.15, -0.1, -0.04, -0.95, { tInvert: true });
      l.V6 = L(0.09, -0.22, 1.55, -0.08, -0.04, -0.55, { tInvert: true });
      l.I = L(0.1, -0.28, 0.95, -0.08, 0, 0.16);
      l.aVL = L(0.08, -0.32, 0.72, -0.06, 0, 0.12);
      l.V2 = L(0.07, 0, 0.85, -1.15, 0.04, -0.22);
      return l;
    })(),
  }),

  takotsubo: spec({
    id: "takotsubo",
    rate: 92,
    pr: 154,
    qrs: 88,
    qt: 520,
    qtc: 540,
    axis: 18,
    rhythm: "sinus",
    label: "Takotsubo (deep precordial T, long QTc)",
    leads: (() => {
      const l = normalLeads();
      l.V2 = L(0.06, 0, 0.48, -0.95, 0.08, -0.45, { tInvert: true });
      l.V3 = L(0.07, -0.04, 0.95, -0.55, 0.1, -0.72, { tInvert: true });
      l.V4 = L(0.08, -0.08, 1.15, -0.28, 0.08, -0.78, { tInvert: true });
      l.V5 = L(0.09, -0.1, 1.05, -0.16, 0.06, -0.62, { tInvert: true });
      l.V6 = L(0.08, -0.08, 0.88, -0.1, 0.04, -0.42, { tInvert: true });
      l.I = L(0.1, -0.06, 0.65, -0.1, 0.04, -0.18);
      l.aVL = L(0.07, -0.06, 0.42, -0.08, 0.04, -0.16);
      return l;
    })(),
  }),

  "early-repol": spec({
    id: "early-repol",
    rate: 58,
    pr: 156,
    qrs: 88,
    qt: 400,
    axis: 62,
    rhythm: "sinus",
    label: "Early repolarization",
    leads: (() => {
      const l = normalLeads();
      l.V3 = L(0.08, -0.04, 1.35, -0.45, 0.18, 0.55);
      l.V4 = L(0.1, -0.1, 1.85, -0.22, 0.22, 0.62);
      l.V5 = L(0.1, -0.12, 1.55, -0.12, 0.18, 0.48);
      l.V6 = L(0.09, -0.1, 1.15, -0.08, 0.14, 0.38);
      l.II = L(0.16, -0.08, 1.25, -0.16, 0.1, 0.38);
      l.V2 = L(0.07, 0, 0.65, -1.05, 0.12, 0.42);
      return l;
    })(),
  }),

  dextrocardia: spec({
    id: "dextrocardia",
    rate: 72,
    pr: 160,
    qrs: 88,
    qt: 380,
    axis: 120,
    rhythm: "sinus",
    label: "Dextrocardia",
    leads: (() => {
      const l = normalLeads();
      l.I = L(-0.1, 0.06, -0.72, 0.12, 0, -0.24);
      l.aVR = L(0.1, -0.04, 0.55, -0.12, 0, 0.18);
      l.aVL = L(-0.08, 0.04, -0.38, 0.1, 0, -0.14);
      l.II = L(0.08, -0.1, 0.42, -0.22, 0, 0.14);
      l.III = L(0.16, -0.08, 1.05, -0.16, 0, 0.28);
      l.V1 = L(0.06, 0, 0.55, -0.22, 0, 0.18);
      l.V2 = L(0.05, 0, 0.32, -0.45, 0, 0.12);
      l.V3 = L(0.04, 0, 0.18, -0.55, 0, 0.08);
      l.V4 = L(0.03, 0, 0.12, -0.48, 0, 0.06);
      l.V5 = L(0.03, 0, 0.08, -0.4, 0, 0.04);
      l.V6 = L(0.02, 0, 0.05, -0.32, 0, 0.02);
      return l;
    })(),
  }),

  tamponade: spec({
    id: "tamponade",
    rate: 118,
    pr: 148,
    qrs: 82,
    qt: 320,
    axis: 40,
    rhythm: "sinus",
    electricalAlternans: 0.28,
    label: "Low voltage with electrical alternans",
    leads: mapLeads(normalLeads(), LEAD_IDS.slice(), (s) => ({
      ...s,
      r: s.r * 0.38,
      s: s.s * 0.4,
      p: s.p * 0.55,
      t: s.t * 0.45,
    })),
  }),

  asd: spec({
    id: "asd",
    rate: 78,
    pr: 172,
    qrs: 108,
    qt: 390,
    axis: 105,
    rhythm: "sinus",
    label: "ASD (rsR' V1, right axis)",
    leads: (() => {
      const l = normalLeads();
      l.V1 = L(0.08, 0, 0.22, -0.28, 0, 0.08, { rPrime: 0.42 });
      l.V2 = L(0.08, 0, 0.4, -0.45, 0, 0.14, { rPrime: 0.22 });
      l.I = L(0.08, 0, 0.28, -0.42, 0, 0.1);
      l.III = L(0.1, -0.08, 0.85, -0.12, 0, 0.18);
      l.aVF = L(0.12, -0.08, 0.9, -0.14, 0, 0.2);
      l.II = L(0.18, -0.06, 1.05, -0.16, 0, 0.24);
      return l;
    })(),
  }),

  ebstein: spec({
    id: "ebstein",
    rate: 66,
    pr: 230,
    qrs: 138,
    qt: 430,
    axis: 95,
    rhythm: "sinus",
    label: "Ebstein (Himalayan P, RBBB)",
    leads: (() => {
      const l = mapLeads(normalLeads(), LEAD_IDS.slice(), (s) => ({
        ...s,
        p: s.p * 2.4,
      }));
      l.II = L(0.42, -0.08, 0.7, -0.22, 0, 0.18);
      l.V1 = L(0.28, 0, 0.18, -0.22, 0, 0.06, { rPrime: 0.7 });
      l.V2 = L(0.22, 0, 0.28, -0.35, 0, 0.08, { rPrime: 0.45 });
      l.I = L(0.18, -0.04, 0.45, -0.38, 0, 0.12);
      l.V6 = L(0.16, -0.06, 0.65, -0.4, 0, 0.14);
      return l;
    })(),
  }),
};

export function getTracing(id: string): TracingSpec {
  const t = TRACINGS[id];
  if (!t) throw new Error(`Unknown tracing: ${id}`);
  return t;
}
