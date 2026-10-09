import type { CmrStudy } from "./types";

export const CMR_STUDIES: Record<string, CmrStudy> = {
  "cmr-normal": {
    id: "cmr-normal",
    label: "Normal late gadolinium — no scar",
    ef: 62,
    walls: {},
    note: "Black blood, no white scar. This is not a normal-coronary-equals-normal-heart rule — look at T2 and T1 too.",
  },
  "cmr-infarct-lad": {
    id: "cmr-infarct-lad",
    label: "Anterior transmural infarct (CAD pattern)",
    ef: 38,
    cavity: "dilated",
    walls: { ant: "transmural", sept: "subendo" },
    note: "Subendocardial or transmural, in a coronary territory = infarct. Always starts at the endocardium.",
  },
  "cmr-myocarditis": {
    id: "cmr-myocarditis",
    label: "Epicardial/midwall LGE — myocarditis",
    ef: 48,
    walls: { lat: "epi", inf: "midwall" },
    note: "Epicardial or midwall, not a coronary distribution. Lake Louise: T2 edema + LGE.",
  },
  "cmr-amyloid": {
    id: "cmr-amyloid",
    label: "Global subendocardial LGE — amyloid",
    ef: 46,
    cavity: "thick",
    walls: {},
    global: "global-subendo",
    note: "Difficulty nulling myocardium, global subendo LGE, high native T1 / ECV. Pair with the low-voltage ECG.",
  },
  "cmr-hcm": {
    id: "cmr-hcm",
    label: "Patchy septal / RV-insertion LGE — HCM",
    ef: 70,
    cavity: "thick",
    walls: { sept: "patchy" },
    note: "Patchy midwall at RV insertion points. Extent of LGE tracks SCD risk.",
  },
  "cmr-sarcoid": {
    id: "cmr-sarcoid",
    label: "Midwall basal septum LGE — sarcoid",
    ef: 44,
    walls: { sept: "midwall", ant: "patchy" },
    note: "Patchy midwall, often basal septum. Young AV block + this pattern = sarcoid until PET says no.",
  },
};

export function getCmr(id: string): CmrStudy {
  const s = CMR_STUDIES[id];
  if (!s) throw new Error(`Unknown CMR: ${id}`);
  return s;
}
