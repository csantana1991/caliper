import type { Block } from "./types";

export const METHOD_STEPS: {
  n: string;
  title: string;
  dek: string;
  blocks: Block[];
}[] = [
  {
    n: "01",
    title: "The paper",
    dek: "Refuse to interpret a tracing you have not authenticated.",
    blocks: [
      {
        type: "p",
        text: "Every board ECG is a document, not a vibe. Confirm 25 mm/s, 10 mm/mV, and a 1 mV calibration pulse. Filter labels (0.05–150 Hz vs 0.5–40 Hz) change ST segments. A high-pass filter at 0.5 Hz can mimic ST depression.",
      },
      {
        type: "ul",
        items: [
          "Lead reversal: inverted P-QRS-T in I with upright aVR is dextrocardia or arm-lead reversal. Check V1–V6 progression to tell them apart.",
          "Artifact: Parkinson tremor ~4–6 Hz can mimic flutter. Parkinson is in limb leads; flutter marches through V1 too.",
          "Standardization: half-standard (5 mm/mV) makes voltage criteria lie.",
        ],
      },
      {
        type: "remember",
        text: "The computer read is a consultant, not a diagnosis. Excellent at intervals. Mediocre at ischemia. Use it. Do not obey it.",
      },
    ],
  },
  {
    n: "02",
    title: "Rate",
    dek: "Count before you name the rhythm.",
    blocks: [
      {
        type: "p",
        text: "At 25 mm/s each large box is 0.20 s. For regular rhythms: 300 ÷ large boxes between R waves (300, 150, 100, 75, 60, 50, 43, 37). For irregular rhythms count QRS complexes in 10 seconds (the full tracing) and multiply by 6.",
      },
      {
        type: "formula",
        text: "QTc (Bazett) = QT / √RR    with RR in seconds. Report both QT and QTc.",
      },
      {
        type: "hy",
        text: "Bradycardia on boards is a rate. Always ask: sinus, junctional, or ventricular escape? The P-wave map decides.",
      },
    ],
  },
  {
    n: "03",
    title: "Rhythm",
    dek: "P waves, then the marriage between P and QRS.",
    blocks: [
      {
        type: "ul",
        items: [
          "Are there P waves? If yes, are they sinus (upright in I, II, aVF, inverted in aVR)?",
          "Is every P married to a QRS, and every QRS to a P?",
          "Is the PR constant?",
          "Is the RR regular? If irregular: regularly irregular (Wenckebach, bigeminy) vs irregularly irregular (AF, MAT, sinus with frequent PACs).",
        ],
      },
      {
        type: "p",
        text: "Name the rhythm in this order: sinus → atrial → junctional → ventricular, then add the conduction clause (1° AVB, 2:1, complete dissociation).",
      },
      {
        type: "tracing",
        id: "brady-1avb",
        caption: "The tracing that started this course: slow, sinus, long PR, otherwise quiet.",
      },
    ],
  },
  {
    n: "04",
    title: "Axis",
    dek: "Leads I and aVF are enough for boards.",
    blocks: [
      {
        type: "table",
        headers: ["I", "aVF", "Axis"],
        rows: [
          ["+", "+", "Normal (−30° to +90°)"],
          ["+", "−", "Check II: + is still normal; − is LAD"],
          ["−", "+", "RAD"],
          ["−", "−", "Extreme (northwest)"],
        ],
      },
      {
        type: "p",
        text: "Normal axis is −30° to +90°. LAD beyond −30° with qR in aVL and rS in II/III is LAFB until proven otherwise. RAD in an adult is RV strain, PE, lateral infarct, sodium-channel block, or a child who grew up.",
      },
    ],
  },
  {
    n: "05",
    title: "Intervals",
    dek: "PR, QRS, QT — the three numbers that fail people.",
    blocks: [
      {
        type: "ul",
        items: [
          "PR 120–200 ms. Short with a delta = WPW. Short without a delta = Lown–Ganong–Levine is not a modern diagnosis; think junctional or measurement error.",
          "QRS <120 ms is narrow. 120–140 is incomplete bundle or nonspecific IVCD. ≥140 with typical morphology is complete bundle.",
          "QTc >460 ms (women) or >450 ms (men) is prolonged. >500 ms is a torsades number.",
        ],
      },
      {
        type: "trap",
        text: "First-degree AV block is a PR >200 ms with 1:1 conduction. It is not a rhythm. It is a clause. The tracing you were sent is sinus bradycardia with first-degree AV block — two findings, one sentence.",
      },
    ],
  },
  {
    n: "06",
    title: "Chamber",
    dek: "Voltage, then strain, then the story.",
    blocks: [
      {
        type: "p",
        text: "LVH: Sokolow–Lyon (S V1 + R V5/V6 ≥35 mm) or Cornell (R aVL + S V3 >28 mm men, >20 mm women). Strain is ST depression + T inversion in the lateral leads, discordant to the tall R.",
      },
      {
        type: "p",
        text: "RAE (P pulmonale): P ≥2.5 mm in II. LAE (P mitrale): P ≥120 ms, notched, or negative terminal P in V1 ≥1 mm deep and ≥40 ms.",
      },
      {
        type: "pearl",
        text: "Voltage without strain in a young athlete is often a normal heart. Strain in a 70-year-old is not.",
      },
    ],
  },
  {
    n: "07",
    title: "Ischemia",
    dek: "Territory, reciprocity, and the equivalents.",
    blocks: [
      {
        type: "p",
        text: "STEMI is ST elevation at the J point in two contiguous leads, with age/sex thresholds (V2–V3 are picky). Reciprocal depression is your lie detector. Q waves tell you the infarct is not from this morning — unless they are hyperacute and already deep.",
      },
      {
        type: "ul",
        items: [
          "Anterior: V1–V4 — proximal or mid LAD.",
          "Inferior: II, III, aVF — usually RCA (III > II, V1 elevation = RV).",
          "Lateral: I, aVL, V5–V6 — LCx or diagonal.",
          "Posterior: isolated ST depression V1–V3; flip the paper or record V7–V9.",
          "Equivalents: Wellens, de Winter, Sgarbossa/Smith in LBBB, isolated aVR elevation with widespread depression.",
        ],
      },
    ],
  },
  {
    n: "08",
    title: "The sentence",
    dek: "One line a consultant could sign.",
    blocks: [
      {
        type: "p",
        text: "Write the ECG the way the boards want it: rate, rhythm, conduction, then the lesion. Example: “Sinus bradycardia at 48 with first-degree AV block (PR 232 ms). Normal QRS, axis, and repolarization. No acute ischemia.” That is the entire tracing you photographed.",
      },
      {
        type: "pearl",
        text: "If you cannot say the sentence out loud in one breath, you are not done looking.",
      },
      {
        type: "p",
        text: "Then ask the clinical question the ECG cannot answer: meds (beta-blocker, diltiazem, digoxin, amiodarone), overnight athlete, inferior ischemia, Lyme, sleep apnea. The tracing is the start of the note, not the end.",
      },
    ],
  },
];
