import type { AngioStudy } from "./types";

export const ANGIO_STUDIES: Record<string, AngioStudy> = {
  "angio-lca-normal": {
    id: "angio-lca-normal",
    label: "Normal left coronary",
    tree: "lca",
    view: "RAO cranial",
    lesions: [],
    timi: 3,
  },
  "angio-rca-normal": {
    id: "angio-rca-normal",
    label: "Normal right coronary",
    tree: "rca",
    view: "LAO",
    lesions: [],
    timi: 3,
  },
  "angio-lad-prox": {
    id: "angio-lad-prox",
    label: "Proximal LAD 99%",
    tree: "lca",
    view: "RAO cranial",
    lesions: [{ vessel: "lad", pct: 99 }],
    timi: 1,
    note: "Anterior STEMI culprit",
  },
  "angio-rca-ostial": {
    id: "angio-rca-ostial",
    label: "RCA occlusion",
    tree: "rca",
    view: "LAO",
    lesions: [{ vessel: "rca", pct: 100 }],
    timi: 0,
    note: "Inferior STEMI culprit",
  },
  "angio-lcx": {
    id: "angio-lcx",
    label: "Dominant LCx 95%",
    tree: "lca",
    view: "LAO caudal (spider)",
    lesions: [{ vessel: "lcx", pct: 95 }, { vessel: "om", pct: 80 }],
    timi: 2,
    note: "Lateral / posterior culprit",
  },
  "angio-lm": {
    id: "angio-lm",
    label: "Distal left main 70%",
    tree: "lca",
    view: "LAO caudal",
    lesions: [{ vessel: "lm", pct: 70 }, { vessel: "lad", pct: 60 }],
    timi: 3,
    note: "High-risk anatomy — heart team",
  },
  "angio-3vd": {
    id: "angio-3vd",
    label: "Three-vessel disease",
    tree: "lca",
    view: "RAO cranial",
    lesions: [
      { vessel: "lad", pct: 80 },
      { vessel: "diag", pct: 70 },
      { vessel: "lcx", pct: 75 },
      { vessel: "om", pct: 90 },
    ],
    timi: 3,
    note: "Syntax high — CABG conversation",
  },
};

export function getAngio(id: string): AngioStudy {
  const s = ANGIO_STUDIES[id];
  if (!s) throw new Error(`Unknown angio: ${id}`);
  return s;
}
