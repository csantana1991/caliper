import type { NuclearStudy, Uptake } from "./types";

const N: Uptake = "normal";

function segs(overrides: Partial<Record<number, Uptake>>): Uptake[] {
  const a: Uptake[] = Array.from({ length: 17 }, () => N);
  for (const [k, v] of Object.entries(overrides)) {
    if (v) a[Number(k) - 1] = v;
  }
  return a;
}

/** LAD: 1,2,7,8,13,14,17. RCA: 3,4,9,10,15. LCx: 5,6,11,12,16. */
export const NUCLEAR_STUDIES: Record<string, NuclearStudy> = {
  "nuc-normal": {
    id: "nuc-normal",
    label: "Normal stress perfusion",
    mode: "stress",
    stress: segs({}),
    note: "Uniform uptake. No territorial drop-out.",
  },
  "nuc-lad-ischemia": {
    id: "nuc-lad-ischemia",
    label: "Reversible anterior/septal/apical ischemia (LAD)",
    mode: "both",
    stress: segs({
      1: "severe",
      2: "severe",
      7: "absent",
      8: "severe",
      13: "absent",
      14: "severe",
      17: "absent",
    }),
    rest: segs({}),
    note: "Stress defect fills in at rest = ischemia, not scar. LAD territory.",
  },
  "nuc-inferior-scar": {
    id: "nuc-inferior-scar",
    label: "Fixed inferior infarct (RCA)",
    mode: "both",
    stress: segs({ 4: "absent", 10: "absent", 15: "severe", 3: "mild" }),
    rest: segs({ 4: "absent", 10: "absent", 15: "severe", 3: "mild" }),
    note: "Fixed = scar. Viability imaging will not wake this wall.",
  },
  "nuc-viable-lad": {
    id: "nuc-viable-lad",
    label: "Hibernating anterior wall — rest/FDG mismatch",
    mode: "both",
    stress: segs({
      7: "absent",
      8: "absent",
      13: "absent",
      14: "severe",
      17: "absent",
    }),
    rest: segs({ 7: "mild", 8: "mild", 13: "mild", 14: "normal", 17: "mild" }),
    note: "Rest (or FDG) uptake in a stress defect = viable hibernating myocardium. Revascularize.",
  },
  "nuc-3vd": {
    id: "nuc-3vd",
    label: "Balanced 3VD — look at the cavity, not just color",
    mode: "both",
    stress: segs({
      1: "mild",
      4: "mild",
      5: "mild",
      7: "mild",
      10: "mild",
      11: "mild",
      13: "mild",
      17: "mild",
    }),
    rest: segs({}),
    note: "Mild global drop can hide 3VD. Transient ischemic dilation and a falling EF with stress are the tells.",
  },
};

export function getNuclear(id: string): NuclearStudy {
  const s = NUCLEAR_STUDIES[id];
  if (!s) throw new Error(`Unknown nuclear: ${id}`);
  return s;
}
