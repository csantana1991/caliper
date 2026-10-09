export type HemoTrace = {
  id: string;
  name: string;
  color: "lv" | "ao" | "la" | "rv" | "pa" | "ra";
  /** mmHg samples over one or two beats, 0–1 phase */
  samples: number[];
};

export type HemoStudy = {
  id: string;
  label: string;
  ymax: number;
  traces: HemoTrace[];
  callout: string;
};

function wave(values: number[]): number[] {
  return values;
}

export const HEMO_STUDIES: Record<string, HemoStudy> = {
  "hemo-as": {
    id: "hemo-as",
    label: "LV–aorta: severe AS",
    ymax: 220,
    traces: [
      { id: "lv", name: "LV", color: "lv", samples: wave([12, 18, 90, 180, 210, 195, 80, 22, 14, 12]) },
      { id: "ao", name: "AO", color: "ao", samples: wave([78, 80, 82, 95, 108, 100, 88, 80, 78, 76]) },
    ],
    callout: "Peak-to-peak gradient ~100 mmHg. Slow-rising aortic pulse. This is severe AS until proven otherwise.",
  },
  "hemo-ms": {
    id: "hemo-ms",
    label: "LA–LV: mitral stenosis",
    ymax: 40,
    traces: [
      { id: "la", name: "LA", color: "la", samples: wave([22, 24, 28, 26, 24, 25, 27, 24, 22, 22]) },
      { id: "lv", name: "LV", color: "lv", samples: wave([8, 8, 10, 32, 18, 10, 8, 8, 8, 8]) },
    ],
    callout: "Diastolic LA–LV gradient persists. Mean gradient and valve area (Gorlin / echo) grade the MS.",
  },
  "hemo-tamponade": {
    id: "hemo-tamponade",
    label: "Equalization: tamponade",
    ymax: 30,
    traces: [
      { id: "ra", name: "RA", color: "ra", samples: wave([16, 17, 18, 17, 16, 16, 17, 16, 16, 16]) },
      { id: "rv", name: "RV", color: "rv", samples: wave([16, 17, 28, 18, 16, 16, 17, 16, 16, 16]) },
      { id: "lv", name: "LV", color: "lv", samples: wave([16, 17, 18, 17, 16, 16, 17, 16, 16, 16]) },
    ],
    callout: "Diastolic equalization of RA, RV, and LV. Absent y descent. Echo + pulsus confirm tamponade.",
  },
  "hemo-constriction": {
    id: "hemo-constriction",
    label: "Discordance: constriction",
    ymax: 140,
    traces: [
      { id: "lv", name: "LV", color: "lv", samples: wave([18, 22, 110, 125, 40, 20, 18, 22, 118, 40]) },
      { id: "rv", name: "RV", color: "rv", samples: wave([18, 22, 38, 28, 18, 18, 22, 42, 28, 18]) },
    ],
    callout: "LV/RV discordance with respiration and a square-root sign. Constriction, not restriction.",
  },
  "hemo-hocm": {
    id: "hemo-hocm",
    label: "HOCM: Brockenbrough",
    ymax: 240,
    traces: [
      { id: "lv", name: "LV", color: "lv", samples: wave([14, 20, 120, 160, 50, 16, 20, 200, 60, 16]) },
      { id: "ao", name: "AO", color: "ao", samples: wave([80, 82, 118, 110, 86, 80, 70, 68, 80, 80]) },
    ],
    callout: "Post-PVC beat: LV pressure up, aortic pulse down (Brockenbrough). Dynamic subaortic gradient.",
  },
  "hemo-mr": {
    id: "hemo-mr",
    label: "Giant V waves — severe MR",
    ymax: 160,
    traces: [
      { id: "lv", name: "LV", color: "lv", samples: wave([12, 16, 90, 140, 50, 16, 14, 16, 90, 50]) },
      { id: "la", name: "LA", color: "la", samples: wave([16, 18, 22, 18, 16, 48, 62, 28, 18, 16]) },
    ],
    callout: "LA V wave dwarfs the mean. Severe MR (or VSD into the atrium). Not MS — MS lives in diastole.",
  },
  "hemo-ph": {
    id: "hemo-ph",
    label: "PA 78/32 — precapillary PH",
    ymax: 100,
    traces: [
      { id: "pa", name: "PA", color: "pa", samples: wave([32, 34, 70, 78, 50, 34, 32, 34, 72, 48]) },
      { id: "ra", name: "RA", color: "ra", samples: wave([8, 9, 11, 9, 8, 8, 9, 8, 8, 8]) },
    ],
    callout: "PA mean well above 20 with a low RA. Next number you need is PCWP to sort group 1 vs 2.",
  },
};

export function getHemo(id: string): HemoStudy {
  const s = HEMO_STUDIES[id];
  if (!s) throw new Error(`Unknown hemo: ${id}`);
  return s;
}
