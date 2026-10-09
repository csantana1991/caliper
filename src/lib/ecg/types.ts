export const LEAD_IDS = [
  "I",
  "II",
  "III",
  "aVR",
  "aVL",
  "aVF",
  "V1",
  "V2",
  "V3",
  "V4",
  "V5",
  "V6",
] as const;

export type LeadId = (typeof LEAD_IDS)[number];

export type LeadShape = {
  p: number;
  q: number;
  r: number;
  s: number;
  st: number;
  t: number;
  rPrime?: number;
  sPrime?: number;
  delta?: number;
  notch?: number;
  tInvert?: boolean;
};

export type RhythmKind =
  | "sinus"
  | "af"
  | "flutter"
  | "mat"
  | "svt"
  | "vt"
  | "vf"
  | "torsades"
  | "chb"
  | "mobitz1"
  | "mobitz2"
  | "paced"
  | "junctional";

export type BeatKind = "sinus" | "pvc" | "pac" | "paced" | "escape" | "aberrant" | "dropped";

export type RhythmEvent = {
  tMs: number;
  kind: BeatKind;
  pWave: boolean;
  prMs?: number;
  wide?: boolean;
  polarity?: number;
};

export type TracingSpec = {
  id: string;
  rate: number;
  pr: number;
  qrs: number;
  qt: number;
  qtc?: number;
  axis: number;
  rhythm: RhythmKind;
  flutterRate?: number;
  flutterRatio?: number;
  leads: Record<LeadId, LeadShape>;
  events?: RhythmEvent[];
  noise?: number;
  osborn?: boolean;
  epsilon?: boolean;
  electricalAlternans?: number;
  label?: string;
};

export const GRID = {
  mm: 4.2,
  small: 4.2,
  large: 21,
  pxPerMv: 42,
  pxPerSec: 105,
} as const;

export const COL_SEC = 2.5;
export const TOTAL_SEC = 10;
