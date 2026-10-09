import type { Module } from "./types";
import { EXTRA_MODULES } from "./modules-extra";
import { SCAN_MODULES } from "./modules-scan";
import { EXTRA_QUIZ } from "./quiz-extra";
import { ANATOMY_MODULE } from "./anatomy-module";

const ECG_MODULES: Module[] = [
  {
    id: "paper",
    n: "01",
    title: "Paper, rate, and numbers",
    dek: "How to measure a tracing so the rest of the course is legal.",
    minutes: 12,
    tracingId: "nsr-normal",
    sections: [
      {
        id: "boxes",
        title: "The grid is a ruler",
        blocks: [
          {
            type: "p",
            text: "Small box: 40 ms by 0.1 mV. Large box: 200 ms by 0.5 mV. Paper speed 25 mm/s is the default; 50 mm/s doubles widths and is used for flutter hunts and peds. Never quote a QTc from a 50 mm/s tracing without converting.",
          },
          {
            type: "table",
            headers: ["Finding", "Normal", "Board cutoff"],
            rows: [
              ["PR", "120–200 ms", ">200 ms = 1° AVB"],
              ["QRS", "<100 ms", "≥120 ms = bundle or IVCD"],
              ["QTc", "<450/460", ">500 ms is the torsades line"],
              ["P width", "<110 ms", "≥120 ms suggests LAE"],
            ],
          },
          {
            type: "tracing",
            id: "nsr-normal",
            caption: "Normal sinus. Count boxes on lead II before you trust the printed numbers.",
          },
        ],
      },
      {
        id: "rate",
        title: "Rate without the computer",
        blocks: [
          {
            type: "p",
            text: "Regular: 300 / large boxes. Irregular: QRS count in 10 s × 6. Bradycardia is not a diagnosis — it is a rate. Sinus brady, junctional escape, and complete heart block can share a pulse of 48 and nothing else.",
          },
          { type: "formula", text: "QTc = QT / √RR     (Bazett). Prefer a computer QT only after you eyeball it." },
          {
            type: "pearl",
            text: "Printed HR of 48 with RR 1248 ms is internally consistent (60,000/1248 ≈ 48). If the printed rate and the boxes disagree, believe the boxes.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "paper-q1",
        prompt: "A regular tracing has 5 large boxes between R waves. The rate is",
        choices: ["50 bpm", "60 bpm", "75 bpm", "100 bpm"],
        answer: 1,
        explain: "300 ÷ 5 = 60.",
        topic: "Rate",
      },
      {
        id: "paper-q2",
        prompt: "Which filter setting is most likely to create false ST depression?",
        choices: ["0.05–150 Hz", "0.5–40 Hz", "0.05–40 Hz", "No filter"],
        answer: 1,
        explain: "A high-pass of 0.5 Hz distorts the ST segment. Diagnostic ECGs should use 0.05 Hz high-pass.",
        topic: "Paper",
      },
    ],
  },
  {
    id: "sinus",
    n: "02",
    title: "Sinus and atrial rhythms",
    dek: "P-wave maps, wandering pacemakers, MAT, and the AF/flutter split.",
    minutes: 14,
    tracingId: "brady-1avb",
    sections: [
      {
        id: "sinus",
        title: "What makes it sinus",
        blocks: [
          {
            type: "p",
            text: "Sinus P waves are upright in I, II, aVF and inverted in aVR. Morphology is stable. Rate 60–100 is convention; athletes and sleep live below 50 without being sick. Sinus arrhythmia is phasic with respiration in the young — RR varies, P morphology does not.",
          },
          {
            type: "tracing",
            id: "brady-1avb",
            caption: "Sinus bradycardia. P upright in II, one P per QRS, just slow — and a long PR riding along.",
          },
        ],
      },
      {
        id: "atrial",
        title: "When the P wave is not sinus",
        blocks: [
          {
            type: "ul",
            items: [
              "PAC: premature, different P, usually a pause after.",
              "Wandering atrial pacemaker: ≥3 P morphologies, rate <100.",
              "MAT: ≥3 P morphologies, rate >100, irregular. Think COPD.",
              "Atrial tachycardia: discrete P, often 1:1 or 2:1, warm-up possible.",
            ],
          },
          {
            type: "trap",
            text: "MAT is not AF. You must see isoelectric baseline and clear, changing P waves. Treating MAT with anticoagulation is a boards-wrong answer.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "sinus-q1",
        prompt: "79-year-old woman, 48 bpm, upright P in II before every QRS. Best rhythm name?",
        tracingId: "brady-1avb",
        ask: "dx",
        choices: [
          "Junctional bradycardia",
          "Sinus bradycardia",
          "Complete heart block",
          "Atrial fibrillation with slow response",
        ],
        answer: 1,
        explain: "P before every QRS, sinus P morphology, rate 48. Complete block would show dissociation; AF would have no P waves.",
        topic: "Sinus",
      },
      {
        id: "sinus-q2",
        prompt: "COPD patient, irregular tachycardia, ≥3 P-wave morphologies, isoelectric baseline. Diagnosis?",
        choices: ["AF", "Atrial flutter", "MAT", "Sinus with frequent PACs"],
        answer: 2,
        explain: "MAT: three or more P morphologies, rate >100. Classic in COPD.",
        topic: "Atrial",
      },
    ],
  },
  {
    id: "avblock",
    n: "03",
    title: "AV block",
    dek: "First-degree, Wenckebach, Mobitz II, 2:1, and complete dissociation.",
    minutes: 18,
    tracingId: "brady-1avb",
    sections: [
      {
        id: "first",
        title: "First-degree is a PR, not a rhythm",
        blocks: [
          {
            type: "hy",
            text: "First-degree is not a rhythm. You say sinus bradycardia with first-degree AV block. Two findings. One sentence.",
          },
          {
            type: "p",
            text: "PR >200 ms with 1:1 conduction. Every P conducts. The QRS is usually narrow (AV node delay). Causes: high vagal tone, beta-blockers, calcium-channel blockers, digoxin, amiodarone, ischemia of the node (inferior MI), Lyme, infiltrative disease, aging.",
          },
          {
            type: "tracing",
            id: "brady-1avb",
            caption: "PR 232 ms. One P, one QRS, always. Computer: sinus bradycardia with 1st-degree AV block — correct.",
          },
          {
            type: "pearl",
            text: "Isolated first-degree AVB with a narrow QRS does not need a pacemaker. Marked PR (>300 ms) that causes cannon A waves or pacemaker syndrome–like symptoms is a rare exception (IIb).",
          },
        ],
      },
      {
        id: "second",
        title: "Second-degree: group beating",
        blocks: [
          {
            type: "p",
            text: "Mobitz I (Wenckebach): PR lengthens, RR shortens, then a P fails. The pause is less than two conducted RR intervals. Site is usually the node. Narrow QRS. Observe if stable.",
          },
          {
            type: "tracing",
            id: "mobitz1",
            caption: "Group beating. PR creeps, then a dropped QRS.",
          },
          {
            type: "p",
            text: "Mobitz II: PR constant, sudden dropped QRS. Site is His-Purkinje. QRS often wide. This is a pacemaker conversation today, not tomorrow.",
          },
          {
            type: "tracing",
            id: "mobitz2",
            caption: "Fixed PR, abrupt drop. Do not call this Wenckebach.",
          },
          {
            type: "trap",
            text: "2:1 block cannot be typed from PR change (there is no successive PR). Use QRS width, PR length, and atropine/exercise: improvement = node; worsening = infranodal.",
          },
        ],
      },
      {
        id: "third",
        title: "Complete heart block",
        blocks: [
          {
            type: "p",
            text: "P waves march through, QRS marches slower, no consistent PR. Narrow escape ≈ 40–60 (junctional). Wide escape ≈ 20–40 (ventricular) — less stable. Cannon A waves, variable S1, and a rate that does not respond to the sinus node.",
          },
          {
            type: "tracing",
            id: "chb",
            caption: "Dissociation. Count two rates: atrial and ventricular.",
          },
          {
            type: "pearl",
            text: "Isorhythmic dissociation is not complete block — P and QRS rates are similar and may appear married. Look over a longer strip.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "av-q1",
        prompt: "PR 232 ms, every P conducts, rate 48, QRS 84 ms. Management implication?",
        tracingId: "brady-1avb",
        ask: "next",
        choices: [
          "Urgent transvenous pacer",
          "This is Mobitz II — implant",
          "No pacing indicated for the block itself; look for reversible causes",
          "Cardiovert",
        ],
        answer: 2,
        explain: "1° AVB + sinus brady, narrow QRS: not a pacing indication. Review meds, ischemia, Lyme, sleep apnea, athlete physiology.",
        topic: "AV block",
        pearls: ["Isolated narrow-QRS first-degree AVB is not a class I pacing indication."],
      },
      {
        id: "av-q2",
        prompt: "Which finding most strongly localizes second-degree block to the His-Purkinje system?",
        choices: [
          "PR lengthening then drop, narrow QRS",
          "Fixed PR, sudden drop, wide QRS",
          "Sinus arrhythmia",
          "Rate-related bundle",
        ],
        answer: 1,
        explain: "Mobitz II, especially with bundle-branch block, is infranodal.",
        topic: "AV block",
      },
      {
        id: "av-q3",
        prompt: "Escape rate 38, wide QRS, P waves at 88 with no relation. Next step in a hypotensive patient?",
        tracingId: "chb",
        choices: ["IV metoprolol", "Transcutaneous pacing / atropine while preparing TCP/TVP", "IB ibutilide", "Observe"],
        answer: 1,
        explain: "Unstable complete heart block: pacing. Atropine may work if the escape is junctional; do not wait on it if the patient is crashing.",
        topic: "AV block",
      },
    ],
  },
  {
    id: "bbb",
    n: "04",
    title: "Bundles and fascicles",
    dek: "RBBB, LBBB, LAFB, LPFB, and the bifascicular warning.",
    minutes: 14,
    tracingId: "rbbb",
    sections: [
      {
        id: "rbbb",
        title: "Right bundle",
        blocks: [
          {
            type: "p",
            text: "QRS ≥120 ms, rsR' in V1–V2, wide S in I and V6. ST/T discordant in the right precordials is expected. New RBBB plus LAFB in chest pain is a proximal LAD / trifascicular-threat pattern — treat like a STEMI equivalent if the clinic fits.",
          },
          { type: "tracing", id: "rbbb", caption: "rsR' in V1. Wide S laterally." },
        ],
      },
      {
        id: "lbbb",
        title: "Left bundle",
        blocks: [
          {
            type: "p",
            text: "QRS ≥120 ms, QS or rS in V1, monophasic notched R in I/aVL/V6, absent septal q. Discordant ST depression / T inversion is appropriate. Concordant ST elevation is never appropriate — Sgarbossa.",
          },
          { type: "tracing", id: "lbbb", caption: "Broad R laterally, QS in V1, discordant ST." },
          {
            type: "pearl",
            text: "Smith-modified Sgarbossa: discordant STE/S ≥0.25 in any one lead is a high-specificity occlusion sign.",
          },
        ],
      },
      {
        id: "fasc",
        title: "Fascicles",
        blocks: [
          {
            type: "table",
            headers: ["Fascicle", "Axis", "Morphology"],
            rows: [
              ["LAFB", "≤ −45°", "qR in aVL, rS in II/III/aVF, delayed aVL intrinsicoid"],
              ["LPFB", "≥ +90°", "rS in I/aVL, qR inferior — rare; exclude RVH/PE first"],
            ],
          },
          { type: "tracing", id: "lafb", caption: "Left axis, tall R in aVL, rS inferior." },
        ],
      },
    ],
    quiz: [
      {
        id: "bbb-q1",
        prompt: "rsR' in V1, QRS 142 ms, wide S in V6. Diagnosis?",
        tracingId: "rbbb",
        choices: ["LBBB", "RBBB", "LVH", "WPW"],
        answer: 1,
        explain: "Typical RBBB.",
        topic: "BBB",
      },
      {
        id: "bbb-q2",
        prompt: "New LBBB plus chest pain. Which ST finding is most specific for occlusion?",
        choices: [
          "Discordant ST depression in V1–V2",
          "Concordant ST elevation ≥1 mm",
          "T inversion in I and V6",
          "Poor R-wave progression",
        ],
        answer: 1,
        explain: "Sgarbossa concordant STE is specific. Discordant ST depression is expected in LBBB.",
        topic: "BBB",
      },
    ],
  },
  {
    id: "svt",
    n: "05",
    title: "Narrow complex tachycardia",
    dek: "AVNRT, AVRT, atrial tach, flutter, and the RP interval.",
    minutes: 16,
    tracingId: "avnrt",
    sections: [
      {
        id: "approach",
        title: "Regular vs irregular first",
        blocks: [
          {
            type: "ul",
            items: [
              "Irregular + no P = AF.",
              "Irregular + sawtooth = flutter with variable block.",
              "Irregular + ≥3 P morphologies = MAT.",
              "Regular: look at RP. Short RP (RP < PR) = typical AVNRT or AVRT. Long RP = atypical AVNRT, atrial tach, PJRT.",
            ],
          },
        ],
      },
      {
        id: "flutter",
        title: "Flutter is 300 until it is not",
        blocks: [
          {
            type: "p",
            text: "Typical counterclockwise flutter: inverted sawtooth in II/III/aVF, discrete F in V1. Atrial rate ~300, ventricular 150 (2:1) or 75 (4:1). If you see a regular 150, hunt for flutter waves. Vagal or adenosine may unmask them; it will not terminate typical flutter.",
          },
          { type: "tracing", id: "flutter", caption: "4:1 flutter. Inferior sawtooth." },
          { type: "tracing", id: "2to1-flutter", caption: "2:1 at 150. The sawtooth is hiding in the T waves." },
        ],
      },
      {
        id: "avnrt",
        title: "AVNRT and WPW",
        blocks: [
          {
            type: "p",
            text: "Typical slow-fast AVNRT: 140–220, very short RP, pseudo-r' in V1, pseudo-S inferior. WPW in sinus: short PR, delta, slightly wide QRS. Orthodromic AVRT is narrow; antidromic is wide and looks like VT.",
          },
          { type: "tracing", id: "avnrt", caption: "Regular narrow tachycardia. Buried retrograde P." },
          { type: "tracing", id: "wpw", caption: "Pre-excitation in sinus. Short PR, delta." },
          {
            type: "trap",
            text: "AF plus pre-excitation: irregular, very wide, changing QRS. Do not give AV nodal blockers. Procainamide or shock.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "svt-q1",
        prompt: "Regular wide-complex? No — regular narrow at 168, no visible P. First drug if stable?",
        tracingId: "avnrt",
        choices: ["Amiodarone", "Adenosine", "Digoxin", "Verapamil as first-line in a wide unknown"],
        answer: 1,
        explain: "Stable regular narrow SVT: vagal then adenosine. Diagnostic and often therapeutic for AVNRT/AVRT.",
        topic: "SVT",
      },
      {
        id: "svt-q2",
        prompt: "Regular 150 bpm, inferior sawtooth. Diagnosis?",
        tracingId: "2to1-flutter",
        choices: ["AVNRT", "Sinus tach", "Atrial flutter 2:1", "VT"],
        answer: 2,
        explain: "150 is the classic 2:1 flutter ventricular rate.",
        topic: "Flutter",
      },
    ],
  },
  {
    id: "vt",
    n: "06",
    title: "Wide complex tachycardia",
    dek: "Assume VT, then spend points trying to prove SVT.",
    minutes: 16,
    tracingId: "vt",
    sections: [
      {
        id: "assume",
        title: "The prior",
        blocks: [
          {
            type: "p",
            text: "Wide, regular, and a history of infarct or systolic failure is VT until proven otherwise. Treat the patient: unstable → shock. Stable → expert-level drugs, still with defibrillator pads on.",
          },
          { type: "tracing", id: "vt", caption: "Monomorphic VT. Northwest-ish axis, wide, fast." },
        ],
      },
      {
        id: "criteria",
        title: "When you have time to be clever",
        blocks: [
          {
            type: "ul",
            items: [
              "AV dissociation, fusion, capture — pathognomonic for VT.",
              "Brugada algorithm / Vereckei aVR: initial R in aVR, or Vi/Vt <1, favors VT.",
              "RBBB-like WCT with monophasic R in V1 and QS in V6 favors VT.",
              "LBBB-like WCT with broad R in V1 (>30–40 ms) or QS in V6 favors VT.",
              "Concordance across V1–V6 favors VT.",
            ],
          },
          {
            type: "pearl",
            text: "If it is wide and you are unsure, it is VT in the hallway and an electrophysiologist’s tracing later.",
          },
        ],
      },
      {
        id: "special",
        title: "Polymorphic and VF",
        blocks: [
          {
            type: "p",
            text: "Torsades: polymorphic VT with a long QT in the last sinus beat, twisting QRS. Treat with magnesium, overdrive, stop the QT drug, replete K. Ischemic polymorphic VT has a normal QT — treat the artery.",
          },
          { type: "tracing", id: "torsades", caption: "Twisting points. This is a crash-cart strip." },
          { type: "tracing", id: "vf", caption: "VF. No QRS. Defibrillate." },
        ],
      },
    ],
    quiz: [
      {
        id: "vt-q1",
        prompt: "75-year-old with prior anterior MI, regular WCT at 176. Most likely diagnosis?",
        tracingId: "vt",
        choices: ["Antidromic AVRT", "SVT with LBBB aberrancy", "Monomorphic VT", "Artifact"],
        answer: 2,
        explain: "Prior infarct + WCT = VT. Probability >90%.",
        topic: "VT",
      },
      {
        id: "vt-q2",
        prompt: "Polymorphic VT, QTc 560 on the last sinus complex. Immediate electrolyte?",
        tracingId: "torsades",
        choices: ["Calcium", "Magnesium", "Bicarbonate", "Phosphate"],
        answer: 1,
        explain: "Torsades: 2 g IV magnesium even if the serum Mg is ‘normal’.",
        topic: "Torsades",
      },
    ],
  },
  {
    id: "stemi",
    n: "07",
    title: "STEMI territories",
    dek: "J-point, reciprocity, RCA vs LCx, and the posterior wall.",
    minutes: 16,
    tracingId: "stemi-anterior",
    sections: [
      {
        id: "rules",
        title: "Elevation that counts",
        blocks: [
          {
            type: "p",
            text: "Two contiguous leads, measured at the J point. V2–V3 thresholds are sex and age specific (≥2 mm in men ≥40, ≥2.5 mm in younger men, ≥1.5 mm in women). Other leads ≥1 mm. Reciprocal change raises specificity more than any millimeter argument.",
          },
        ],
      },
      {
        id: "maps",
        title: "The map",
        blocks: [
          {
            type: "table",
            headers: ["Leads", "Wall", "Usual artery"],
            rows: [
              ["V1–V4", "Anterior / septal", "LAD"],
              ["II, III, aVF", "Inferior", "RCA (III>II) or LCx (II>III)"],
              ["I, aVL, V5–V6", "Lateral", "LCx or diagonal"],
              ["V7–V9 / ST dep V1–V3", "Posterior", "LCx or RCA PDA"],
              ["V3R–V4R", "Right ventricle", "Proximal RCA"],
            ],
          },
          { type: "tracing", id: "stemi-anterior", caption: "Anterior STE with inferior reciprocity." },
          { type: "tracing", id: "stemi-inferior", caption: "Inferior STE, III > II, reciprocal aVL." },
          {
            type: "pearl",
            text: "Inferior STEMI: always record right-sided leads. V4R elevation = RV infarct = preload-dependent. Nitroglycerin can drop the pressure.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "stemi-q1",
        prompt: "ST elevation V2–V4 with depression in II/III/aVF. Culprit?",
        tracingId: "stemi-anterior",
        choices: ["RCA", "LAD", "Circumflex", "PDA"],
        answer: 1,
        explain: "Anterior territory is LAD.",
        topic: "STEMI",
      },
      {
        id: "stemi-q2",
        prompt: "Inferior STE, III > II, STE in V1. Which additional infarct is likely?",
        tracingId: "stemi-inferior",
        choices: ["Posterior only", "RV infarction", "High lateral", "Apical ballooning without coronary disease"],
        answer: 1,
        explain: "III>II plus V1 elevation points to proximal RCA and RV involvement.",
        topic: "STEMI",
      },
    ],
  },
  {
    id: "equivalents",
    n: "08",
    title: "Occlusion equivalents",
    dek: "Wellens, de Winter, aVR, and the restless T wave.",
    minutes: 14,
    tracingId: "wellens",
    sections: [
      {
        id: "wellens",
        title: "Wellens",
        blocks: [
          {
            type: "p",
            text: "Pain-free patient, preserved R waves, little STE, and deep symmetric T inversions (Type B) or biphasic T (Type A) in V2–V3. This is a critical proximal LAD that is open for the moment. Do not stress. Catheterize.",
          },
          { type: "tracing", id: "wellens", caption: "Deep T inversions V2–V3. The enzyme may still be shy." },
        ],
      },
      {
        id: "dewinter",
        title: "De Winter",
        blocks: [
          {
            type: "p",
            text: "Upsloping ST depression at the J point in V3–V6 that takes off into tall symmetric T waves, plus mild STE in aVR. It is an anterior occlusion equivalent. Activate the lab the same as STEMI.",
          },
          { type: "tracing", id: "dewinter", caption: "J-point depression, hyperacute T, aVR elevation." },
        ],
      },
      {
        id: "avr",
        title: "aVR and the rest",
        blocks: [
          {
            type: "p",
            text: "STE in aVR with widespread depression can be left-main / proximal LAD ischemia or, equally, demand ischemia (GI bleed, hypoxia, aortic stenosis). The ECG does not grant automatic left-main status — the patient does.",
          },
          {
            type: "trap",
            text: "Hyperacute T waves are fat and broad, not just tall. Compare to old tracings. A tall T with a thin base is often hyperkalemia.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "eq-q1",
        prompt: "Pain resolved. Deep T inversions V2–V3, R waves intact, enzymes borderline. Next step?",
        tracingId: "wellens",
        ask: "next",
        choices: ["Treadmill ECG", "Discharge with aspirin", "Urgent angiography", "Start flecainide"],
        answer: 2,
        explain: "Wellens is a catheterization, not a stress test.",
        topic: "Wellens",
      },
      {
        id: "eq-q2",
        prompt: "This pattern is an anterior occlusion equivalent even without classic STE. Name it.",
        tracingId: "dewinter",
        choices: ["Sgarbossa", "De Winter", "Brugada", "Early repolarization"],
        answer: 1,
        explain: "De Winter: upsloping ST depression into hyperacute T waves.",
        topic: "De Winter",
      },
    ],
  },
  {
    id: "chamber",
    n: "09",
    title: "Hypertrophy and strain",
    dek: "Voltage, strain, and when voltage is a lie.",
    minutes: 10,
    tracingId: "lvh",
    sections: [
      {
        id: "lvh",
        title: "Left ventricle",
        blocks: [
          {
            type: "p",
            text: "Sokolow–Lyon, Cornell, and aVL ≥11 mm are the board criteria. Strain pattern (ST depression + asymmetric T inversion in I, aVL, V5–V6) raises the probability of true mass and of adverse outcome. Low voltage plus thick walls is infiltrative disease, not ‘no LVH’.",
          },
          { type: "tracing", id: "lvh", caption: "Deep S in V1, tall R in V5–V6, lateral strain." },
        ],
      },
      {
        id: "rvh",
        title: "Right heart",
        blocks: [
          {
            type: "ul",
            items: [
              "R/S in V1 >1, right axis, strain in V1–V3.",
              "S1Q3T3 is neither sensitive nor specific for PE; it is a strain pattern. Sinus tach is the PE ECG.",
            ],
          },
          { type: "tracing", id: "pe-s1q3t3", caption: "Sinus tach, S1Q3T3. Think RV strain, then think clinically." },
        ],
      },
    ],
    quiz: [
      {
        id: "ch-q1",
        prompt: "Which finding most supports true LVH rather than a thin, high-voltage youth?",
        tracingId: "lvh",
        choices: ["R in aVL of 8 mm", "Lateral strain pattern", "Sinus arrhythmia", "Early precordial transition"],
        answer: 1,
        explain: "Strain is the specificity upgrade.",
        topic: "LVH",
      },
    ],
  },
  {
    id: "metabolic",
    n: "10",
    title: "Electrolytes, drugs, temperature",
    dek: "Peaked T, long QT, Osborn, digoxin, and the TCA.",
    minutes: 14,
    tracingId: "hyperk",
    sections: [
      {
        id: "k",
        title: "Potassium",
        blocks: [
          {
            type: "p",
            text: "HyperK: peaked narrow T, flattened P, long PR, wide QRS, sine wave, asystole. Treat the ECG, not the lab delay — calcium to stabilize membrane if QRS is wide.",
          },
          { type: "tracing", id: "hyperk", caption: "Peaked T, shrinking P, fattening QRS." },
          {
            type: "p",
            text: "HypoK: ST depression, flattened T, prominent U, apparent long QT (really QU). Risk of polymorphic VT. Replete K and Mg.",
          },
          { type: "tracing", id: "hypok", caption: "Flattened T, stretched QU." },
        ],
      },
      {
        id: "other",
        title: "Calcium, cold, and pills",
        blocks: [
          {
            type: "ul",
            items: [
              "HyperCa shortens QT (short ST). HypoCa lengthens it.",
              "Digoxin: scooped ST, downsloping, short QT. Toxicity: bidirectional VT, atrial tach with block.",
              "TCA: sinus tach, RAD, wide QRS, prominent R in aVR. Sodium bicarb.",
              "Hypothermia: bradycardia, long QT, Osborn (J) waves, shiver artifact, risk of VF on rewarming.",
            ],
          },
          { type: "tracing", id: "osborn", caption: "Bradycardia and J waves. Warm the patient, not the ECG machine." },
        ],
      },
    ],
    quiz: [
      {
        id: "met-q1",
        prompt: "Peaked T waves, PR 210, QRS 118. First membrane-stabilizing drug if the QRS is widening?",
        tracingId: "hyperk",
        choices: ["Insulin", "Calcium gluconate", "Albuterol", "Kayexalate"],
        answer: 1,
        explain: "Calcium first when the QRS is at risk. Shifters come immediately after.",
        topic: "HyperK",
      },
      {
        id: "met-q2",
        prompt: "Overdose, wide QRS, tall R in aVR, sinus tach. Antidote?",
        choices: ["Digibind", "Sodium bicarbonate", "Glucagon", "Flumazenil"],
        answer: 1,
        explain: "TCA sodium-channel block: bicarb.",
        topic: "TCA",
      },
    ],
  },
  {
    id: "inherited",
    n: "11",
    title: "Inherited and high-risk patterns",
    dek: "Brugada, long QT, WPW, ARVC, and the athlete.",
    minutes: 14,
    tracingId: "brugada",
    sections: [
      {
        id: "brugada",
        title: "Brugada",
        blocks: [
          {
            type: "p",
            text: "Type 1: coved STE ≥2 mm in V1–V2 with T inversion — the only pattern that is diagnostic in isolation. High leads (2nd intercostal) increase yield. Fever unmasks it. Do not put these patients on sodium-channel blockers unless you are running a drug challenge in a lab.",
          },
          { type: "tracing", id: "brugada", caption: "Coved ST in V1–V2. Type 1." },
        ],
      },
      {
        id: "lqt",
        title: "Long QT",
        blocks: [
          {
            type: "p",
            text: "QTc >480–500 with syncope, family history, or T-wave notching is a channelopathy until you have a better story. LQT1: broad T, swim/emotion. LQT2: notched T, startle. LQT3: long isoelectric ST, sleep. Acquired long QT (drugs + hypoK) is far more common on boards than congenital.",
          },
          { type: "tracing", id: "lqt", caption: "QTc well over 500. Measure in lead II or V5, not the computer blindly." },
        ],
      },
      {
        id: "peri",
        title: "Pericarditis vs STEMI",
        blocks: [
          {
            type: "p",
            text: "Pericarditis: diffuse STE, PR depression, STE in aVR inverted (PR elevation in aVR). Ratio STE/T <0.25 in V6 favors early repol; higher favors pericarditis. Reciprocal depression (except aVR/V1) is STEMI, not pericarditis.",
          },
          { type: "tracing", id: "pericarditis", caption: "Widespread STE, PR depression. No reciprocal wall." },
        ],
      },
    ],
    quiz: [
      {
        id: "inh-q1",
        prompt: "Coved ST elevation in V1–V2 with T inversion. Pattern?",
        tracingId: "brugada",
        choices: ["Type 2 Brugada", "Type 1 Brugada", "Wellens", "RBBB with early repol"],
        answer: 1,
        explain: "Coved STE + T inversion = type 1.",
        topic: "Brugada",
      },
      {
        id: "inh-q2",
        prompt: "Diffuse STE and PR depression without reciprocal ST depression in a coronary territory. Most likely?",
        tracingId: "pericarditis",
        choices: ["Anterior STEMI", "Pericarditis", "De Winter", "Hyperkalemia"],
        answer: 1,
        explain: "Diffuse STE + PR depression is pericarditis. Reciprocal change would have saved STEMI.",
        topic: "Pericarditis",
      },
    ],
  },
  {
    id: "pacing",
    n: "12",
    title: "Pacing and pitfalls",
    dek: "Spikes, failure modes, lead reversal, and the computer.",
    minutes: 12,
    tracingId: "paced",
    sections: [
      {
        id: "pacing",
        title: "Read the spike",
        blocks: [
          {
            type: "p",
            text: "Atrial spike → P. Ventricular spike → wide QRS, usually LBBB morphology for an RV apical lead (negative in inferior leads). BiV pacing may be narrower and positive in V1 (RBBB-ish) if the LV lead contributes.",
          },
          { type: "tracing", id: "paced", caption: "Ventricular paced. LBBB-like, left axis." },
          {
            type: "ul",
            items: [
              "Failure to capture: spike, no chamber.",
              "Failure to sense: spikes in the wrong place, possibly on T (R-on-T).",
              "Failure to output: no spike when you expect one (oversensing).",
            ],
          },
        ],
      },
      {
        id: "pitfalls",
        title: "Classic traps",
        blocks: [
          {
            type: "ul",
            items: [
              "Limb-lead reversal: I inverted, aVR upright, progression in V leads preserved (vs dextrocardia, where precordial R waves also vanish).",
              "Lead V1/V2 too high: rSr' and T inversion that mimic Brugada or PE.",
              "Parkinson tremor vs flutter: tremor is 4–6 Hz and spare V1.",
              "The computer overcalls infarction in LBBB and undercalls Wellens.",
            ],
          },
          {
            type: "pearl",
            text: "On the tracing that opened this course, the computer was right. That happens. Still do the eight steps. Trust is earned per tracing, not per vendor.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "pac-q1",
        prompt: "Wide QRS after a pacing spike, QS in V1, left axis. This is typically",
        tracingId: "paced",
        choices: ["Biatrial pacing", "RV apical pacing", "LV-only pacing", "Atrial pacing with LBBB"],
        answer: 1,
        explain: "RV apical pacing ≈ LBBB + left/superior axis.",
        topic: "Pacing",
      },
      {
        id: "pac-q2",
        prompt: "Inverted P-QRS in I, upright aVR, normal R-wave progression V1–V6. Most likely?",
        choices: ["Dextrocardia", "Left-right arm reversal", "Anterior MI", "Situs inversus"],
        answer: 1,
        explain: "Arm reversal keeps precordial progression. Dextrocardia loses it.",
        topic: "Pitfalls",
      },
    ],
  },
  {
    id: "mi-map",
    n: "13",
    title: "The full MI map",
    dek: "Anterior, inferior, RV, lateral, posterior, NSTEMI, Q waves, and aneurysm — 2025 ACC/AHA ACS.",
    minutes: 18,
    tracingId: "stemi-posterior",
    sections: [
      {
        id: "acs",
        title: "STEMI vs NSTEMI is an ECG sentence",
        blocks: [
          {
            type: "hy",
            text: "2025 ACC/AHA ACS: STE at the J point in 2 contiguous leads. V2–V3 thresholds are sex- and age-specific. NSTE-ACS is horizontal or downsloping ST depression ≥0.5 mm or T inversion >1 mm with a prominent R.",
          },
          {
            type: "p",
            text: "A normal ECG does not exclude NSTEMI. Dynamic change on serial tracings is the high-yield NSTE-ACS finding. Isolated ST depression in V1–V3 is posterior occlusion until you have recorded V7–V9.",
          },
          { type: "tracing", id: "nstemi", caption: "NSTEMI. Horizontal ST depression and T inversion laterally. Not a STEMI — still ACS." },
          { type: "tracing", id: "hyperacute-t", caption: "Hyperacute T waves. Fat and broad, not tented. Minutes later this is an anterior STEMI." },
        ],
      },
      {
        id: "walls",
        title: "Walls the first twelve missed",
        blocks: [
          {
            type: "table",
            headers: ["Pattern", "Leads", "Artery", "Do not miss"],
            rows: [
              ["Lateral", "I, aVL ± V5–V6", "LCx or diagonal", "Reciprocal III/aVF"],
              ["Posterior", "STD V1–V3, tall R, upright T", "LCx or RCA-PDA", "Record V7–V9"],
              ["RV", "Inferior STE + STE in V1", "Proximal RCA", "V4R; preload-dependent"],
              ["Old anterior", "Q in V1–V4, no STE", "Healed LAD", "Not acute"],
              ["Aneurysm", "Q + persistent STE, no reciprocal", "Old LAD", "Not a new STEMI"],
            ],
          },
          { type: "tracing", id: "stemi-lateral", caption: "High lateral STEMI. STE in I and aVL. Reciprocal inferior depression." },
          { type: "tracing", id: "stemi-posterior", caption: "Posterior occlusion. Horizontal depression and tall R in V1–V3. Think V7–V9." },
          { type: "tracing", id: "stemi-rv", caption: "Inferior STE, III>II, and STE in V1. Proximal RCA with RV infarct." },
          { type: "tracing", id: "old-anterior-mi", caption: "Pathologic Q waves V1–V4. The infarct already happened." },
          { type: "tracing", id: "lv-aneurysm", caption: "Persistent STE plus Q, no reciprocal wall. Aneurysm, not a fresh occlusion." },
          {
            type: "trap",
            text: "Persistent STE after a completed anterior infarct is aneurysm until you have a reason to re-activate. Reciprocal change and hyperacute T waves argue for acute occlusion.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "mi-q1",
        prompt: "Isolated ST depression V1–V3 with tall R waves. Next ECG move?",
        tracingId: "stemi-posterior",
        ask: "next",
        choices: ["Discharge", "Record V7–V9", "Give a beta-blocker and observe", "Diagnose Wellens"],
        answer: 1,
        explain: "Posterior occlusion equivalent. Confirm with posterior leads.",
        topic: "STEMI",
      },
      {
        id: "mi-q2",
        prompt: "Inferior STE, III>II, STE in V1. Additional infarct?",
        tracingId: "stemi-rv",
        ask: "dx",
        choices: ["Lateral only", "RV infarction", "Apical HCM", "Early repol"],
        answer: 1,
        explain: "V1 elevation with inferior STE (III>II) is RV involvement. Nitroglycerin can drop the pressure.",
        topic: "STEMI",
      },
      {
        id: "mi-q3",
        prompt: "Q waves V1–V4 plus persistent STE, no reciprocal depression, pain-free for weeks. Most likely?",
        tracingId: "lv-aneurysm",
        ask: "dx",
        choices: ["Hyperacute anterior STEMI", "Left ventricular aneurysm", "Pericarditis", "Brugada"],
        answer: 1,
        explain: "Chronic aneurysm: Q + persistent STE without a reciprocal wall.",
        topic: "STEMI",
      },
    ],
  },
  {
    id: "myocardium",
    n: "14",
    title: "Myocardium that is not a coronary",
    dek: "Myocarditis, sarcoid, amyloid, ARVC, HCM, and takotsubo — the boards' favorite mimics.",
    minutes: 20,
    tracingId: "myocarditis",
    sections: [
      {
        id: "myocarditis",
        title: "Myocarditis",
        blocks: [
          {
            type: "remember",
            text: "Young patient, viral prodrome, STE that will not pick a coronary territory, no reciprocal wall. The cath is often clean. That is myocarditis until MRI says otherwise.",
          },
          {
            type: "p",
            text: "ECG is abnormal in most acute myocarditis. Sinus tachycardia is common. STE may be pericarditis-like (concave, diffuse) or MI-like (convex, sometimes focal). Q waves can appear and later vanish. Advanced AV block in myocarditis should make you think sarcoid, Lyme, or checkpoint-inhibitor myocarditis.",
          },
          { type: "tracing", id: "myocarditis", caption: "Diffuse STE, some T inversion, no inferior-for-anterior reciprocity. Not a wall." },
        ],
      },
      {
        id: "infiltrative",
        title: "Sarcoid and amyloid",
        blocks: [
          {
            type: "hy",
            text: "Cardiac sarcoid on boards: unexplained high-grade AV block in a young or middle-aged adult, often with RBBB or VT. PET or MRI, not the ECG alone, makes the diagnosis — the ECG tells you to look.",
          },
          { type: "tracing", id: "sarcoid", caption: "Complete heart block, wide RBBB-like escape, anterior Qs. Hunt sarcoid." },
          {
            type: "p",
            text: "Amyloid: low QRS voltage in the limb leads with thick walls on echo — the mismatch is the pearl. Pseudoinfarct Q waves, AF, and a long PR are common. Do not call this an old inferior MI without an echo.",
          },
          { type: "tracing", id: "amyloid", caption: "Tiny limb QRS, pseudoinfarct Qs, long PR. Voltage-echo mismatch is amyloid until proven otherwise." },
        ],
      },
      {
        id: "hcm-arvc",
        title: "HCM, ARVC, takotsubo",
        blocks: [
          {
            type: "table",
            headers: ["Disease", "ECG", "Trap"],
            rows: [
              ["Apical HCM", "Giant negative T V3–V6, huge R", "Not Wellens — voltage is enormous, patient is often pain-free at baseline"],
              ["ARVC", "T inversion V1–V3 ± V4, epsilon, PVCs", "Athlete TWI usually stops at V2; ARVC goes further and has PVCs"],
              ["Takotsubo", "Deep T ± modest STE, long QTc, beyond one wall", "Looks like a huge anterior infarct; coronaries are open"],
            ],
          },
          { type: "tracing", id: "hcm", caption: "Apical HCM. Giant T inversion and enormous precordial voltage. Dagger Q laterally." },
          { type: "tracing", id: "arvc", caption: "ARVC. T inversion through V3, epsilon after QRS in V1–V2, incomplete RBBB." },
          { type: "tracing", id: "takotsubo", caption: "Takotsubo. Deep precordial T, long QTc, no Q waves, no reciprocal inferior wall." },
          {
            type: "next",
            text: "Unexplained CHB under 60: sarcoid workup. Low voltage + thick walls: amyloid. Giant T + giant voltage: HCM, not Wellens.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "myo-q1",
        prompt: "28-year-old, viral illness, troponin up, diffuse STE, no reciprocal depression, coronaries clean. Diagnosis?",
        tracingId: "myocarditis",
        ask: "dx",
        choices: ["Anterior STEMI", "Acute myocarditis", "Wellens", "Brugada"],
        answer: 1,
        explain: "Diffuse, no reciprocal wall, young, prodrome. Myocarditis.",
        topic: "Myocarditis",
      },
      {
        id: "myo-q2",
        prompt: "42-year-old with new complete heart block and RBBB-like escape. Which infiltrate is the boards favorite?",
        tracingId: "sarcoid",
        ask: "dx",
        choices: ["Amyloid", "Cardiac sarcoidosis", "Hemochromatosis", "Fabry"],
        answer: 1,
        explain: "Young-ish high-grade AV block ± bundle is sarcoid until you have looked (MRI/PET).",
        topic: "Sarcoid",
      },
      {
        id: "myo-q3",
        prompt: "Limb-lead voltage is tiny, echo walls are thick. The mismatch is",
        tracingId: "amyloid",
        ask: "dx",
        choices: ["Athlete heart", "Amyloid cardiomyopathy", "Isolated LVH", "Lead misplacement"],
        answer: 1,
        explain: "ECG-echo voltage mismatch is classic for infiltrative disease, especially amyloid.",
        topic: "Amyloid",
      },
    ],
  },
  {
    id: "special",
    n: "15",
    title: "Congenital, tamponade, and lookalikes",
    dek: "Dextrocardia, ASD, Ebstein, electrical alternans, and early repolarization.",
    minutes: 14,
    tracingId: "tamponade",
    sections: [
      {
        id: "congenital",
        title: "Congenital ECGs that show up on boards",
        blocks: [
          {
            type: "ul",
            items: [
              "Dextrocardia: inverted P-QRS-T in I, upright aVR, and R waves that die across V1–V6. Arm reversal keeps precordial progression.",
              "ASD: incomplete RBBB (rsR' in V1) plus right axis. Crochetage (notch in inferior R) is a bonus.",
              "Ebstein: Himalayan P waves, long PR, RBBB, accessory pathway common (WPW).",
              "Congenital complete heart block: narrow junctional escape, often in a young woman with anti-Ro history in the mother.",
            ],
          },
          { type: "tracing", id: "dextrocardia", caption: "Dextrocardia. I inverted, aVR upright, precordial R waves vanish." },
          { type: "tracing", id: "asd", caption: "Secundum ASD pattern: rsR' in V1 and right axis." },
          { type: "tracing", id: "ebstein", caption: "Ebstein. Huge P, long PR, RBBB." },
        ],
      },
      {
        id: "lookalikes",
        title: "Tamponade and early repol",
        blocks: [
          {
            type: "p",
            text: "Tamponade: sinus tachycardia, low voltage, and electrical alternans (QRS amplitude swinging beat to beat). Alternans is specific, not sensitive. The diagnosis is still clinical plus echo.",
          },
          { type: "tracing", id: "tamponade", caption: "Low voltage, sinus tach, beat-to-beat QRS swing. Think effusion." },
          {
            type: "hy",
            text: "Early repolarization: concave STE, notched J point, tall T, usually V2–V5 in a young person. STE/T ratio in V6 <0.25 favors early repol over pericarditis. Reciprocal depression is still STEMI.",
          },
          { type: "tracing", id: "early-repol", caption: "Early repol. Concave STE, J-point notch, tall T. Not a tombstone." },
        ],
      },
    ],
    quiz: [
      {
        id: "sp-q1",
        prompt: "Inverted P-QRS in I, upright aVR, and no R-wave progression V1–V6. Diagnosis?",
        tracingId: "dextrocardia",
        ask: "dx",
        choices: ["Left-right arm reversal", "Dextrocardia", "Extensive anterior MI", "Lead V1–V2 too high"],
        answer: 1,
        explain: "Precordial R waves die only in dextrocardia (or reversed precordials). Arm reversal keeps them.",
        topic: "Pitfalls",
      },
      {
        id: "sp-q2",
        prompt: "Sinus tach, tiny QRS, beat-to-beat voltage swing. Next test?",
        tracingId: "tamponade",
        ask: "next",
        choices: ["Stress ECG", "Urgent echo", "Procainamide", "Discharge"],
        answer: 1,
        explain: "Electrical alternans + low voltage: effusion/tamponade until echo says no.",
        topic: "Pericardial",
      },
    ],
  },
];

export const MODULES: Module[] = [ANATOMY_MODULE, ...ECG_MODULES, ...EXTRA_MODULES, ...SCAN_MODULES].map((m) => {
  const more = EXTRA_QUIZ[m.id];
  return more ? { ...m, quiz: [...m.quiz, ...more] } : m;
});

export function getModule(id: string) {
  return MODULES.find((m) => m.id === id);
}
