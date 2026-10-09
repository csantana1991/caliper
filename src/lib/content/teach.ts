import type { Lesson, Teach } from "./types";
import { MODULES } from "./modules";
import { TEACH_EXTRA } from "./teach-extra";
import { TEACH_SCAN } from "./teach-scan";
import { TEACH_ANATOMY } from "./anatomy-module";

export const TEACH: Record<string, Teach> = {
  paper: {
    framework: [
      { text: "Authenticate the paper" },
      { text: "Count the rate from boxes" },
      { text: "Measure PR, QRS, QT yourself" },
      { text: "Only then name the rhythm", tone: "ok" },
    ],
    remember: "If the printed numbers fight the boxes, believe the boxes. Bradycardia is a rate, not a diagnosis.",
    path: "The grid is a ruler. 25 mm/s, 10 mm/mV. Every later claim is illegal if this is wrong.",
    dx: "Small box 40 ms / 0.1 mV. Large box 200 ms / 0.5 mV. Regular rate = 300 ÷ large boxes.",
    tx: "Do not quote a QTc or a computer HR until you have counted. Filter 0.5 Hz high-pass fakes ST depression.",
    drillTags: ["Paper", "Rate", "Intervals", "QT", "Axis"],
    quickTable: {
      headers: ["Finding", "Normal", "Boards cutoff"],
      rows: [
        ["PR", "120–200 ms", ">200 ms = 1° AVB"],
        ["QRS", "<100 ms", "≥120 ms = bundle / IVCD"],
        ["QTc", "<450 men / <460 women", ">500 ms = torsades line"],
        ["P width", "<110 ms", "≥120 ms suggests LAE"],
      ],
    },
    lecture: [
      {
        id: "p1",
        title: "The ruler",
        script: `Start with the paper. Not the diagnosis. The grid is a ruler. Twenty-five millimeters a second. Ten millimeters a millivolt. Small box: forty milliseconds. Large box: two hundred. [pause]
If those are wrong, every number after this is theater. A high-pass filter at half a hertz can fake ST depression. Lead reversal inverts lead one and stands A V R up. Check the V leads to tell reversal from dextrocardia. [pause]
This is high yield. Authenticate the tracing before you interpret it.`,
      },
      {
        id: "p2",
        title: "Count, then name",
        script: `Rate: three hundred over large boxes if regular. QRS count in ten seconds times six if irregular. [pause]
Bradycardia is not a diagnosis. It is a rate. Sinus bradycardia, junctional escape, and complete heart block can share a pulse of forty-eight and share nothing else. The P-wave map decides. [pause]
Printed heart rate of forty-eight with R-R twelve forty-eight milliseconds is internally consistent. If the printer and the boxes disagree, believe the boxes.`,
      },
    ],
  },
  sinus: {
    framework: [
      { text: "P waves present?" },
      { text: "Sinus morphology? (upright II, inverted aVR)" },
      { text: "One P per QRS?" },
      { text: "Name sinus, then add the clause", tone: "ok" },
    ],
    remember: "Sinus is a P-wave map, not a rate. Slow sinus is still sinus. No P is not sinus.",
    path: "The sinus node depolarizes the atria high-to-low, right-to-left. That vector makes an upright P in I, II, aVF.",
    dx: "Stable P morphology. Every P married to a QRS. Rate is a separate sentence.",
    tx: "If the P is not sinus, say so: PAC, MAT, atrial tach, flutter, AF. MAT is not AF — do not anticoagulate MAT for that reason.",
    drillTags: ["Paper", "Rate", "AF", "SVT"],
    quickTable: {
      headers: ["Rhythm", "P waves", "Regular?"],
      rows: [
        ["Sinus", "Stable, sinus morphology", "Usually"],
        ["MAT", "≥3 morphologies, isoelectric baseline", "No"],
        ["AF", "None; fibrillatory baseline", "No"],
        ["Flutter", "Sawtooth, ~300 atrial", "Often 2:1 or 4:1"],
      ],
    },
    lecture: [
      {
        id: "s1",
        title: "What makes it sinus",
        script: `Sinus is a P-wave diagnosis. Upright in lead one, two, and A V F. Inverted in A V R. Morphology is stable. [pause]
Rate sixty to one hundred is convention. Athletes and sleep live below fifty without being sick. Sinus arrhythmia in the young: R-R varies, P morphology does not. [pause]
The tracing that opened this course is sinus. Slow. Upright P in two. One P, one QRS. Then a clause: the P-R is long.`,
      },
      {
        id: "s2",
        title: "When it is not sinus",
        script: `PAC: premature, different P, usually a pause after. Wandering atrial pacemaker: three P morphologies, rate under one hundred. M A T: three P morphologies, rate over one hundred, irregular. Think C O P D. [pause]
High yield: M A T is not atrial fibrillation. You must see an isoelectric baseline and clear changing P waves. Treating M A T with anticoagulation is a boards-wrong answer.`,
      },
    ],
  },
  avblock: {
    framework: [
      { text: "Every P conducts? → 1° (a PR, not a rhythm)" },
      { text: "PR grows, then drop? → Mobitz I" },
      { text: "PR fixed, sudden drop? → Mobitz II", tone: "warn" },
      { text: "Two clocks? → Complete block. Pace II and III.", tone: "danger" },
    ],
    remember: "First-degree is a clause you attach to a rhythm. Isolated narrow-QRS 1° AVB does not get a pacemaker. Mobitz II and complete block do.",
    path: "Delay in the AV node lengthens PR (1° / Wenckebach). His-Purkinje failure drops QRS without warning (Mobitz II, complete).",
    dx: "1°: PR >200, 1:1. I: group beating, PR creeps. II: fixed PR, abrupt drop, often wide QRS. III: P and QRS dissociated, ventricular slower.",
    tx: "Reversible causes first for 1° and Wenckebach (meds, ischemia, Lyme, vagal). Mobitz II and unstable complete block: pacing now.",
    drillTags: ["AV block", "Intervals", "Clinical"],
    quickTable: {
      headers: ["Block", "Site", "QRS", "Pace?"],
      rows: [
        ["1°", "Usually node", "Usually narrow", "No, if isolated"],
        ["Mobitz I", "Node", "Usually narrow", "Observe if stable"],
        ["Mobitz II", "His-Purkinje", "Often wide", "Yes"],
        ["Complete", "Node or below", "Narrow or wide", "Yes if unstable / infranodal"],
      ],
    },
    lecture: [
      {
        id: "a1",
        title: "The grammar",
        script: `Framework. First question: does every P get through? Yes, and the P-R is over two hundred: first-degree. That is not a rhythm. It is a clause. You say sinus bradycardia with first-degree A V block. [pause]
No, the P-R grows and then a beat drops: Wenckebach. Node. Often observe. P-R fixed and a QRS vanishes: Mobitz two. His-Purkinje. Pacemaker conversation today. Two clocks, atrial faster than ventricular, no marriage: complete block. [pause]
Two-to-one block cannot be typed from P-R change. Use Q R S width, P-R length, atropine or exercise. Better means node. Worse means below the node.`,
      },
      {
        id: "a2",
        title: "The tracing you brought",
        script: `Seventy-nine-year-old woman. Forty-eight. P-R two thirty-two. Every P conducts. Q R S eighty-four, narrow. [pause]
This is sinus bradycardia with first-degree A V block. Isolated, narrow, no symptoms of cannon waves. Not a pacing indication. Look at the medication list. Look for inferior ischemia. Look for Lyme in the right season. [pause]
If you remember nothing else: first-degree does not get a generator. Mobitz two does.`,
      },
    ],
  },
  bbb: {
    framework: [
      { text: "QRS ≥120? If no, not a bundle." },
      { text: "V1: rsR′ → RBBB. QS / rS → LBBB" },
      { text: "Axis: ≤−45 LAFB, ≥+90 LPFB" },
      { text: "Chest pain + new LBBB: use Sgarbossa", tone: "danger" },
    ],
    remember: "Discordant ST in bundle is expected. Concordant ST elevation is never expected — that is occlusion until proven otherwise.",
    path: "A bundle delay lets the other ventricle start. The last vector points to the delayed ventricle: right terminal R in V1 for RBBB, left terminal R laterally for LBBB.",
    dx: "RBBB: rsR′ V1, wide S I/V6. LBBB: QS V1, monophasic R I/V6, no septal q. LAFB: left axis, qR aVL, rS inferior.",
    tx: "New RBBB + LAFB in ACS is a proximal LAD / trifascicular threat. New LBBB with pain: Smith-modified Sgarbossa, then the lab.",
    drillTags: ["BBB"],
    quickTable: {
      headers: ["Pattern", "V1", "Lateral"],
      rows: [
        ["RBBB", "rsR′", "Wide S in I, V6"],
        ["LBBB", "QS or rS", "Notched R, no septal q"],
        ["LAFB", "Normal QRS width", "qR aVL, axis ≤ −45"],
        ["LPFB", "Normal QRS width", "rS I, qR inferior — rare"],
      ],
    },
    lecture: [
      {
        id: "b1",
        title: "Name the bundle from V1",
        script: `Q R S one-twenty or more. Look at V one. r s R-prime is right bundle. Q S or r S is left bundle. Then confirm laterally: wide S in one and V six for right. Monophasic notched R, no septal q, for left. [pause]
Fascicles live in the axis. Left anterior fascicular block: axis minus forty-five or more left, q R in A V L, r S inferior. Left posterior is rare. Exclude R V H and pulmonary embolism before you write it.`,
      },
      {
        id: "b2",
        title: "ST in bundle",
        script: `This is high yield. Discordant ST depression and T inversion are appropriate in bundle. Concordant ST elevation is never appropriate. That is Sgarbossa. Smith-modified: discordant elevation over S wave of twenty-five percent or more in any one lead is a high-specificity occlusion sign. [pause]
New right bundle plus left anterior fascicular block in chest pain is a proximal L A D warning. Treat the clinic, not the acronym.`,
      },
    ],
  },
  svt: {
    framework: [
      { text: "Regular or irregular?" },
      { text: "Irregular: AF / MAT / flutter variable" },
      { text: "Regular: RP interval" },
      { text: "150 exactly? Hunt 2:1 flutter", tone: "warn" },
    ],
    remember: "Regular narrow at 150 is flutter until you have proved it is not. Adenosine is a diagnostic tool, not just a drug.",
    path: "Reentry in the node (AVNRT), using an accessory pathway (AVRT), or an atrial driver (tach, flutter, AF). The RP interval tells you who turns first.",
    dx: "Short RP: typical AVNRT or AVRT. Long RP: atrial tach, atypical AVNRT, PJRT. Sawtooth inferior: flutter. No P, irregular: AF.",
    tx: "Stable regular narrow: vagal, then adenosine. Unstable: shock. Pre-excited AF: no nodal blockers — procainamide or shock.",
    drillTags: ["SVT", "AF", "WPW"],
    quickTable: {
      headers: ["Pattern", "ECG", "First move if stable"],
      rows: [
        ["AVNRT", "Very short RP, pseudo-r′ V1", "Vagal → adenosine"],
        ["2:1 flutter", "Regular 150, sawtooth", "Adenosine to unmask; not to terminate"],
        ["AF", "Irregular, no P", "Rate control vs shock; anticoagulate by CHA2DS2-VASc"],
        ["Pre-excited AF", "Irregular, very wide, changing QRS", "Procainamide or shock. Never AV nodal block."],
      ],
    },
    lecture: [
      {
        id: "n1",
        title: "Regular versus irregular",
        script: `Narrow complex tachycardia. First split: regular or irregular. Irregular and no P: A F. Irregular and sawtooth: flutter with variable block. Irregular and three P morphologies: M A T. [pause]
Regular: look at R P. Short R P means typical A V N R T or A V R T. Long R P means atrial tach, atypical A V N R T, or P J R T. [pause]
If the rate is one-fifty on the nose, hunt for flutter waves in two, three, A V F and V one. They hide in the T waves.`,
      },
      {
        id: "n2",
        title: "Adenosine and the forbidden drug",
        script: `Stable regular narrow: vagal, then adenosine. Diagnostic and often therapeutic for A V N R T. Flutter will not terminate; the sawtooth will show itself. [pause]
W P W in sinus: short P-R, delta, slightly wide Q R S. Orthodromic A V R T is narrow. Antidromic is wide and looks like V T. [pause]
If you remember nothing else: A F plus pre-excitation is irregular, very wide, changing Q R S. Do not give A V nodal blockers. Procainamide or shock.`,
      },
    ],
  },
  vt: {
    framework: [
      { text: "Wide + regular + old infarct → VT" },
      { text: "Unstable? Shock. Do not wait on criteria.", tone: "danger" },
      { text: "Proof: dissociation, fusion, capture" },
      { text: "Long QT + polymorphic → Mg", tone: "warn" },
    ],
    remember: "Assume VT. You may spend points later trying to prove SVT. In the hallway it is VT.",
    path: "Scar reentry after infarct is the common monomorphic VT. Polymorphic with long QT is pause-dependent torsades. Polymorphic with normal QT is ischemia.",
    dx: "Wide, regular, northwest axis, concordance, initial R in aVR favor VT. Torsades twists around the baseline after a long QT sinus beat.",
    tx: "Unstable: shock. Stable monomorphic: amiodarone or procainamide, pads on. Torsades: magnesium 2 g, overdrive, stop the QT drug.",
    drillTags: ["VT", "Torsades"],
    quickTable: {
      headers: ["Finding", "Means"],
      rows: [
        ["Prior MI + WCT", "VT until proven otherwise (>90%)"],
        ["Fusion / capture / dissociation", "Proof of VT"],
        ["Polymorphic + long QT", "Torsades → magnesium"],
        ["Polymorphic + normal QT", "Ischemia → the artery"],
      ],
    },
    lecture: [
      {
        id: "v1",
        title: "The prior",
        script: `Wide, regular, and a history of infarct is ventricular tachycardia until proven otherwise. Probability over ninety percent. Do not start with aberrancy. [pause]
Unstable: shock. That is not a trick. Stable: pads on, then expert-level drugs. If you have time to be clever: A V dissociation, fusion, and capture are proof. Concordance, initial R in A V R, R-over-S in V six favor V T.`,
      },
      {
        id: "v2",
        title: "When it twists",
        script: `Torsades is polymorphic V T with a long Q T on the last sinus beat. Magnesium two grams even if the serum magnesium is called normal. Overdrive if it is pause-dependent. Stop the Q T drug. Potassium over four-five. [pause]
Ischemic polymorphic V T has a normal Q T. Treat the artery, not the electrolyte. V F has no Q R S. Defibrillate.`,
      },
    ],
  },
  stemi: {
    framework: [
      { text: "STE in 2 contiguous leads at the J point?" },
      { text: "Reciprocal change? Specificity up." },
      { text: "Map the wall → name the artery" },
      { text: "Inferior? Record V4R. Posterior? V7–V9", tone: "warn" },
    ],
    remember: "Territory plus reciprocity. Inferior STEMI always gets right-sided leads. Isolated depression V1–V3 is posterior until you have looked behind.",
    path: "Occlusion produces current of injury toward the exploring lead (STE) and away from the opposite wall (reciprocal depression).",
    dx: "Anterior V1–V4 = LAD. Inferior II III aVF = RCA if III>II, LCx if II>III. Lateral I aVL V5–V6. Posterior: ST depression V1–V3, confirm V7–V9.",
    tx: "Activate the lab. Inferior + V4R STE: RV infarct, preload-dependent — nitroglycerin can drop the pressure.",
    drillTags: ["STEMI"],
    quickTable: {
      headers: ["Leads", "Wall", "Usual artery"],
      rows: [
        ["V1–V4", "Anterior / septal", "LAD"],
        ["II, III, aVF", "Inferior", "RCA (III>II) or LCx (II>III)"],
        ["I, aVL, V5–V6", "Lateral", "LCx or diagonal"],
        ["ST dep V1–V3 / V7–V9", "Posterior", "LCx or RCA-PDA"],
        ["V4R", "Right ventricle", "Proximal RCA"],
      ],
    },
    lecture: [
      {
        id: "m1",
        title: "Elevation that counts",
        script: `Two contiguous leads, measured at the J point. V two and V three have sex and age thresholds. Other leads: one millimeter. Reciprocal change raises specificity more than any millimeter argument. [pause]
Map it. Anterior is L A D. Inferior is usually right coronary if three is taller than two. Lateral is circumflex or diagonal. Isolated depression in V one to V three may be posterior. Record V seven to V nine.`,
      },
      {
        id: "m2",
        title: "The extra leads",
        script: `Inferior STEMI: always record right-sided leads. V four R elevation is right ventricular infarct. That ventricle is preload-dependent. Nitroglycerin can drop the pressure. Fluids, then the lab. [pause]
This is high yield. The ECG names a wall. The wall names an artery. The artery names a next step.`,
      },
    ],
  },
  equivalents: {
    framework: [
      { text: "Pain-free deep T in V2–V3, R intact? Wellens" },
      { text: "J-point down into fat T? De Winter" },
      { text: "aVR STE + widespread depression? LM or demand" },
      { text: "Do not stress these. Catheterize.", tone: "danger" },
    ],
    remember: "Wellens and de Winter are occlusion equivalents. The ST segment does not have to be a tombstone.",
    path: "A critical proximal LAD that is open for the moment (Wellens) or occluded without classic STE (de Winter). aVR STE can be left main — or GI bleed.",
    dx: "Wellens: biphasic or deep inverted T, V2–V3, preserved R, little STE, pain-free. De Winter: upsloping J depression into hyperacute T, ± aVR STE.",
    tx: "Urgent angiography. Not a treadmill. Hyperacute T waves are fat, not tented — tented is potassium.",
    drillTags: ["Equivalents", "STEMI"],
    quickTable: {
      headers: ["Pattern", "Look", "Next step"],
      rows: [
        ["Wellens", "Deep/biphasic T V2–V3, pain-free", "Angio. Do not stress."],
        ["De Winter", "J-point depression, tall T", "Anterior occlusion equivalent"],
        ["aVR STE + diffuse STD", "LM / prox LAD or demand ischemia", "Treat the patient, not the lead"],
        ["Hyperacute T", "Fat, broad", "Occlusion vs hyperK (tented, narrow)"],
      ],
    },
    lecture: [
      {
        id: "e1",
        title: "Wellens",
        script: `Pain-free patient. Preserved R waves. Little ST elevation. Deep symmetric T inversions or biphasic T in V two and V three. That is Wellens. Critical proximal L A D, open for the moment. [pause]
If you remember nothing else: do not put this patient on a treadmill. Catheterize.`,
      },
      {
        id: "e2",
        title: "De Winter and aVR",
        script: `Upsloping ST depression at the J point in the precordials that takes off into tall symmetric T waves, plus mild elevation in A V R. De Winter. Anterior occlusion equivalent. Activate the lab the same as STEMI. [pause]
ST elevation in A V R with widespread depression can be left main, or it can be a G I bleed. The ECG does not grant automatic left-main status. The patient does. Hyperacute T waves are fat and broad, not tented. Tented is potassium.`,
      },
    ],
  },
  chamber: {
    framework: [
      { text: "Voltage criteria first" },
      { text: "Strain present? Specificity up.", tone: "ok" },
      { text: "Low voltage + thick walls? Infiltrative" },
      { text: "Right strain: sinus tach is still the PE ECG" },
    ],
    remember: "Voltage without strain in a young athlete is often a normal heart. Strain is the specificity upgrade. Sinus tachycardia is the PE ECG — not S1Q3T3.",
    path: "Mass or pressure overload increases voltage and, later, repolarization (strain). Infiltrative disease adds mass without voltage.",
    dx: "Sokolow, Cornell, aVL ≥11 mm. Strain: ST depression and asymmetric T inversion in I, aVL, V5–V6. RVH: R/S V1 >1, right axis.",
    tx: "Voltage plus strain in hypertension is true LVH until echo. S1Q3T3 is a strain pattern, not a PE rule-in.",
    drillTags: ["LVH", "PE"],
    quickTable: {
      headers: ["Criterion", "Cut"],
      rows: [
        ["Sokolow–Lyon", "S V1 + R V5/V6 ≥ 35 mm"],
        ["Cornell", "R aVL + S V3 > 28 men / 20 women"],
        ["aVL", "R ≥ 11 mm"],
        ["RVH", "R/S V1 >1 + right axis + right strain"],
      ],
    },
    lecture: [
      {
        id: "c1",
        title: "Voltage, then strain",
        script: `Sokolow. Cornell. A V L eleven millimeters. Those are the board voltage criteria. Strain is ST depression and T inversion in the lateral leads, discordant to a tall R. Strain raises the probability of true mass. [pause]
Voltage without strain in a young athlete is often a normal heart. Low voltage plus thick walls is infiltrative disease, not no L V H.`,
      },
      {
        id: "c2",
        title: "The right heart",
        script: `R over S in V one greater than one, right axis, strain in V one to V three. That is right ventricular hypertrophy. [pause]
S one Q three T three is neither sensitive nor specific for pulmonary embolism. It is a strain pattern. The pulmonary embolism ECG is sinus tachycardia. Remember that for the boards.`,
      },
    ],
  },
  metabolic: {
    framework: [
      { text: "Peaked T / wide QRS? HyperK → calcium", tone: "danger" },
      { text: "Flat T / U wave? HypoK" },
      { text: "Short QT? HyperCa. Long QT? HypoCa / drugs" },
      { text: "Wide + tall R aVR + tach? TCA → bicarb", tone: "warn" },
    ],
    remember: "Treat the ECG, not the lab delay. Wide QRS in hyperK gets calcium first. TCA gets bicarbonate. Torsades gets magnesium.",
    path: "Potassium sets membrane excitability. Calcium shortens or lengthens the ST segment. Sodium-channel block (TCA) slows phase zero — wide QRS, RAD, R in aVR.",
    dx: "HyperK: peaked T, flat P, long PR, wide QRS, sine. HypoK: ST depression, U waves. Digoxin effect: scooped ST. Toxicity: bidirectional VT, atrial tach with block.",
    tx: "HyperK with wide QRS: calcium, then shifters. TCA: sodium bicarb. Hypothermia: rewarm, Osborn waves, VF risk.",
    drillTags: ["Electrolytes", "Drugs"],
    quickTable: {
      headers: ["Pattern", "Think", "First move"],
      rows: [
        ["Peaked T → sine", "HyperK", "Calcium if QRS wide"],
        ["U waves, flat T", "HypoK", "K and Mg"],
        ["Wide, RAD, R in aVR", "TCA", "Bicarbonate"],
        ["Scooped ST", "Digoxin effect", "Toxicity ≠ effect"],
        ["J wave + brady", "Hypothermia", "Rewarm"],
      ],
    },
    lecture: [
      {
        id: "k1",
        title: "Potassium",
        script: `Hyperkalemia is a sequence. Peaked narrow T. Flattened P. Long P-R. Wide Q R S. Sine wave. Asystole. Treat the ECG, not the lab delay. Calcium to stabilize the membrane if the Q R S is wide. Then shifters. [pause]
Hypokalemia: ST depression, flattened T, prominent U, apparent long Q T that is really Q U. Risk of polymorphic V T. Replete potassium and magnesium.`,
      },
      {
        id: "k2",
        title: "Pills and cold",
        script: `Digoxin effect: scooped ST, short Q T. Digoxin toxicity: atrial tach with block, bidirectional V T, severe bradycardia. Those are not the same sentence. [pause]
T C A: sinus tach, right axis, wide Q R S, tall R in A V R. Sodium bicarbonate. Hypothermia: bradycardia, long Q T, Osborn J waves, shiver artifact, V F on rewarming. Warm the patient.`,
      },
    ],
  },
  inherited: {
    framework: [
      { text: "Coved STE V1–V2 + T inversion? Type 1 Brugada", tone: "danger" },
      { text: "QTc >500 + syncope / family? Channelopathy" },
      { text: "Diffuse STE + PR depression, no reciprocal? Pericarditis" },
      { text: "Reciprocal wall? STEMI, not pericarditis", tone: "warn" },
    ],
    remember: "Type 1 Brugada is the only Brugada pattern that is diagnostic in isolation. Reciprocal ST depression is STEMI, not pericarditis.",
    path: "Sodium-channel loss (Brugada), potassium-channel or sodium-channel long QT, and diffuse inflammatory current (pericarditis) write different ST and T signatures.",
    dx: "Type 1: coved STE ≥2 mm V1–V2 with T inversion. LQT1 broad T / swim. LQT2 notched T / startle. LQT3 long ST / sleep. Pericarditis: diffuse STE, PR depression.",
    tx: "Fever unmasks Brugada — treat the fever. Acquired long QT is more common than congenital: stop the drug, replete K/Mg. Reciprocal change → lab, not NSAIDs.",
    drillTags: ["Inherited", "Pericarditis"],
    quickTable: {
      headers: ["Pattern", "Do not confuse with"],
      rows: [
        ["Type 1 Brugada", "High V1/V2 placement, RBBB + early repol"],
        ["Congenital long QT", "Acquired (drugs + hypoK) — far more common"],
        ["Pericarditis", "STEMI (reciprocal wall)"],
        ["Early repol", "Pericarditis (STE/T ratio, PR depression)"],
      ],
    },
    lecture: [
      {
        id: "i1",
        title: "Brugada and long QT",
        script: `Type one Brugada: coved ST elevation of two millimeters in V one V two with T inversion. That is the only pattern diagnostic in isolation. High leads increase yield. Fever unmasks it. [pause]
Long Q T: over four-eighty to five hundred with syncope or family history is a channelopathy until you have a better story. L Q T one: broad T, swim. Two: notched T, startle. Three: long isoelectric ST, sleep. Acquired long Q T is far more common on boards than congenital.`,
      },
      {
        id: "i2",
        title: "Pericarditis versus STEMI",
        script: `Pericarditis: diffuse ST elevation, P-R depression, P-R elevation in A V R. No territorial reciprocal depression except A V R and V one. [pause]
If you remember nothing else: reciprocal depression in a coronary wall is STEMI, not pericarditis. Do not send a STEMI to anti-inflammatories.`,
      },
    ],
  },
  pacing: {
    framework: [
      { text: "Spike → P? Atrial. Spike → wide QRS? Ventricular" },
      { text: "Spike, no chamber? Failure to capture", tone: "warn" },
      { text: "Spikes on native beats? Undersensing" },
      { text: "Inverted I + upright aVR: check V leads", tone: "ok" },
    ],
    remember: "RV apical pacing looks like LBBB with a left/superior axis. Arm reversal keeps precordial progression. Dextrocardia loses it. The computer is a consultant, not a diagnosis.",
    path: "A paced ventricle depolarizes from the lead tip. RV apex: LBBB-like, inferior QS. Failure modes are capture, sense, or output.",
    dx: "Capture fail: spike, no depolarization. Sense fail: spikes in native QRS/T. Output fail: missing spikes (oversensing).",
    tx: "Unstable failure to capture: transcutaneous pacing / magnet / isoproterenol depending on the box. Arm reversal: swap the leads, do not diagnose dextrocardia.",
    drillTags: ["Pacing", "Pitfalls"],
    quickTable: {
      headers: ["Problem", "See", "Versus"],
      rows: [
        ["Failure to capture", "Spike, no QRS/P", "Dead battery vs high threshold"],
        ["Undersensing", "Spikes on native beats", "R-on-T risk"],
        ["Oversensing", "No spike when needed", "Output failure"],
        ["Arm reversal", "I inverted, aVR up, V leads normal", "Dextrocardia: V leads die too"],
      ],
    },
    lecture: [
      {
        id: "x1",
        title: "Read the spike",
        script: `Atrial spike then a P. Ventricular spike then a wide Q R S, usually left-bundle morphology for a right-ventricular apical lead, negative in the inferior leads. Biventricular pacing may be narrower. [pause]
Failure to capture: spike, no chamber. Failure to sense: spikes in the wrong place, possibly on the T. Failure to output: no spike when you expect one. That is oversensing.`,
      },
      {
        id: "x2",
        title: "Classic traps",
        script: `Limb-lead reversal: lead one inverted, A V R upright, R-wave progression in the V leads preserved. Dextrocardia loses the precordial R waves. [pause]
V one and V two placed too high: r S r-prime and T inversion that mimic Brugada. Parkinson tremor versus flutter: tremor is four to six hertz and spares V one. [pause]
The computer overcalls infarction in left bundle and undercalls Wellens. On the tracing that opened this course, the computer was right. Still do the steps.`,
      },
    ],
  },
  "mi-map": {
    framework: [
      { text: "STE in 2 contiguous leads? Map the wall." },
      { text: "STD V1–V3? Posterior until V7–V9", tone: "warn" },
      { text: "Inferior + V1 STE? RV. Fluids, not nitro.", tone: "danger" },
      { text: "Q + persistent STE, no reciprocal? Aneurysm" },
    ],
    remember: "Isolated depression in V1–V3 is a posterior occlusion until you have looked behind the heart. Persistent STE with Q waves and no reciprocal wall is aneurysm, not a new STEMI.",
    path: "Occlusion writes STE toward the exploring lead and reciprocal depression opposite. A completed infarct leaves Q waves. A thinned aneurysm keeps STE without an opposite wall.",
    dx: "Lateral: I aVL. Posterior: STD + tall R V1–V3. RV: inferior STE III>II plus V1 STE. NSTEMI: horizontal STD or T inversion, ECG may be normal.",
    tx: "Activate for STEMI and equivalents. Record extra leads. Nitroglycerin is forbidden in RV infarct. Aneurysm does not go to the lab for the STE alone.",
    drillTags: ["STEMI", "Equivalents"],
    quickTable: {
      headers: ["Wall", "Leads", "Usual artery"],
      rows: [
        ["Anterior", "V1–V4", "LAD"],
        ["Inferior", "II, III, aVF", "RCA if III>II"],
        ["RV", "V1 / V4R + inferior", "Proximal RCA"],
        ["Lateral", "I, aVL, V5–V6", "LCx / diagonal"],
        ["Posterior", "STD V1–V3; V7–V9", "LCx or RCA-PDA"],
        ["Aneurysm", "Q + chronic STE", "Old LAD"],
      ],
    },
    lecture: [
      {
        id: "mm1",
        title: "The map",
        script: `Twenty twenty-five A C C A H A acute coronary syndrome guideline. ST elevation at the J point in two contiguous leads. V two V three have sex and age cutoffs. Everything else: one millimeter. [pause]
Isolated depression in V one to V three is posterior until you record V seven to V nine. Inferior elevation with three taller than two and elevation in V one is right ventricular infarct. That ventricle lives on preload. Nitroglycerin can drop the pressure.`,
      },
      {
        id: "mm2",
        title: "Old versus new",
        script: `Q waves without ST elevation: the infarct already happened. Q waves plus persistent elevation and no reciprocal wall: aneurysm. Do not activate the lab for chronic STE alone. [pause]
NSTEMI may have a normal ECG. Horizontal depression or T inversion is the usual. Dynamic change on serial tracings is the high-yield finding. Hyperacute T waves are fat and broad. Tented and narrow is potassium.`,
      },
    ],
  },
  myocardium: {
    framework: [
      { text: "Young + prodrome + no reciprocal? Myocarditis" },
      { text: "CHB under 60? Sarcoid until proven otherwise", tone: "warn" },
      { text: "Low voltage + thick walls? Amyloid", tone: "ok" },
      { text: "Giant T + giant voltage? HCM, not Wellens" },
    ],
    remember: "Not every ST elevation is a coronary. Myocarditis, takotsubo, HCM, and pericarditis all fake occlusion. Unexplained complete heart block in a young adult is sarcoid until you have looked.",
    path: "Inflammation (myocarditis, sarcoid), infiltration (amyloid), disarray (HCM), fibrofatty replacement (ARVC), and catecholamine stunning (takotsubo) all write ST and T changes without a ruptured plaque.",
    dx: "Myocarditis: diffuse STE, sinus tach. Sarcoid: high-grade block ± RBBB/VT. Amyloid: tiny limb QRS, pseudoinfarct Q. ARVC: TWI V1–V3, epsilon. Apical HCM: giant negative T, huge R.",
    tx: "Clean coronaries plus a story: MRI. Unexplained CHB: sarcoid PET/MRI. Voltage-echo mismatch: amyloid workup. Do not stress Wellens; do not cath every giant T in a hypertrophic ventricle.",
    drillTags: ["Inherited", "Pericarditis", "LVH"],
    quickTable: {
      headers: ["Disease", "ECG fingerprint", "Next step"],
      rows: [
        ["Myocarditis", "Diffuse STE, no reciprocal", "Cath if STEMI-like, then MRI"],
        ["Sarcoid", "CHB, RBBB, VT, anterior Q", "MRI / FDG-PET"],
        ["Amyloid", "Low voltage + thick walls", "Light chain + PYP/MRI"],
        ["ARVC", "TWI V1–V3, epsilon, PVCs", "MRI, family, ICD if high risk"],
        ["Apical HCM", "Giant T, huge voltage", "Echo / MRI. Not Wellens."],
        ["Takotsubo", "Deep T, long QTc, beyond one wall", "Cath to exclude occlusion"],
      ],
    },
    lecture: [
      {
        id: "my1",
        title: "Inflammation and infiltrate",
        script: `Myocarditis. Young patient. Viral prodrome. ST elevation that will not pick a coronary territory. No reciprocal wall. Troponin up. Coronaries clean. Magnetic resonance makes the diagnosis. [pause]
If the same myocarditis story comes with complete heart block, think sarcoid, Lyme, or checkpoint-inhibitor myocarditis. Cardiac sarcoid on boards is unexplained high-grade A V block in a young or middle-aged adult. [pause]
Amyloid is a mismatch. Tiny Q R S in the limb leads, thick walls on echo. Pseudoinfarct Q waves. Long P-R. Atrial fibrillation. Do not call it an old inferior infarct without an echo.`,
      },
      {
        id: "my2",
        title: "HCM, ARVC, takotsubo",
        script: `Apical hypertrophic cardiomyopathy: giant negative T waves in V three to V six and enormous voltage. That is not Wellens. Wellens has ordinary voltage and a pain story. [pause]
A R V C: T inversion through V three, epsilon wave after the Q R S in V one V two, premature ventricular complexes. Athlete T inversion usually stops at V two. [pause]
Takotsubo: deep T waves or modest elevation beyond a single wall, long Q T C, open coronaries, apical ballooning. If you remember nothing else: not every tombstone is a plaque.`,
      },
    ],
  },
  special: {
    framework: [
      { text: "I inverted + aVR up: check the V leads" },
      { text: "V leads die? Dextrocardia. V leads live? Arm reversal" },
      { text: "Low voltage + swing? Tamponade. Get the echo.", tone: "danger" },
      { text: "Concave STE, J notch, young? Early repol", tone: "ok" },
    ],
    remember: "Arm reversal keeps precordial R-wave progression. Dextrocardia loses it. Electrical alternans is specific for a large effusion, not sensitive. Reciprocal depression is still STEMI, not early repol.",
    path: "Dextrocardia reverses the left-right vector. ASD volume-loads the right heart (rsR' + RAD). Ebstein atrializes the RV (huge P, RBBB, accessory pathway). Fluid around the heart dampens and swings voltage.",
    dx: "ASD: incomplete RBBB and right axis. Ebstein: Himalayan P, long PR, RBBB. Tamponade: sinus tach, low voltage, alternans. Early repol: concave STE, notched J, tall T.",
    tx: "Dextrocardia: do not diagnose anterior MI. Tamponade: echo and fluid, not an ECG drug. Early repol: leave it alone if the story is a young patient with a J notch and no reciprocal wall.",
    drillTags: ["Pitfalls", "Pericarditis", "PE"],
    quickTable: {
      headers: ["Pattern", "See", "Versus"],
      rows: [
        ["Dextrocardia", "I inverted, V leads die", "Arm reversal: V leads live"],
        ["ASD", "rsR' V1 + RAD", "RBBB + RVH"],
        ["Ebstein", "Huge P, long PR, RBBB", "Ordinary RAE"],
        ["Tamponade", "Low voltage, alternans, tach", "Amyloid low voltage (no swing)"],
        ["Early repol", "J notch, concave STE, tall T", "STEMI (reciprocal, convex)"],
      ],
    },
    lecture: [
      {
        id: "sp1",
        title: "Congenital fingerprints",
        script: `Inverted P Q R S in lead one, upright A V R. Now look at the V leads. If R-wave progression is preserved, someone swapped the arm leads. If the R waves die from V one to V six, that is dextrocardia. [pause]
Atrial septal defect: incomplete right bundle, r s R-prime in V one, and right axis. Ebstein: Himalayan P waves, long P-R, right bundle, and an accessory pathway more often than chance.`,
      },
      {
        id: "sp2",
        title: "Fluid and J points",
        script: `Tamponade: sinus tachycardia, low voltage, electrical alternans. The Q R S swings beat to beat. Alternans is specific, not sensitive. The next test is echo. [pause]
Early repolarization: concave ST elevation, notched J point, tall T, usually a young person. The S T to T ratio in V six under zero-point-two-five favors early repol over pericarditis. Reciprocal depression is still a STEMI. Do not send a reciprocal wall to the bench.`,
      },
    ],
  },
};

export function getTeach(id: string) {
  return TEACH[id] ?? TEACH_EXTRA[id] ?? TEACH_SCAN[id] ?? TEACH_ANATOMY[id];
}

export function lessonFromModule(id: string): Lesson | undefined {
  const mod = MODULES.find((m) => m.id === id);
  const teach = getTeach(id);
  if (!mod || !teach) return undefined;
  return {
    id: mod.id,
    title: mod.title,
    dek: teach.remember,
    minutes: mod.minutes,
    tracingId: mod.tracingId,
    nextHref: `/modules/${mod.id}`,
    nextLabel: "Open the notes",
    chapters: teach.lecture,
  };
}
