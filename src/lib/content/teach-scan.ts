import type { Teach } from "./types";

export const TEACH_SCAN: Record<string, Teach> = {
  "nuclear-mpi": {
    framework: [
      { text: "Name the territory" },
      { text: "Reversible vs fixed" },
      { text: "Viability if the wall is still" },
      { text: "Do not miss balanced 3VD", tone: "danger" },
    ],
    remember: "Reversible is ischemia. Fixed is scar. Rest uptake in a stress hole is hibernating muscle you can still save.",
    path: "The polar map is a coronary tree viewed from the apex. Anterior-septal-apex is L A D. Inferior is right coronary. Lateral is circumflex.",
    dx: "Stress dark, rest bright: ischemia. Both dark: scar. Stress dark, rest or F D G present: viable. Mild global drop plus a bigger cavity: balanced three-vessel disease.",
    tx: "Large ischemia, transient ischemic dilation, or a falling E F: cath. Viable hibernating myocardium: revascularize.",
    drillTags: ["Nuclear", "Angio", "Prevention"],
    quickTable: {
      headers: ["Map", "Meaning"],
      rows: [
        ["Reversible", "Ischemia"],
        ["Fixed", "Scar"],
        ["Mismatch", "Viable / hibernating"],
        ["TID + global drop", "Balanced 3VD"],
      ],
    },
    lecture: [
      {
        id: "nm1",
        title: "The bullseye",
        script: `Nuclear perfusion is a seventeen-segment map. You are looking from the apex. Top is anterior, bottom is inferior, left of the map is septum, right is lateral. [pause] L A D is anterior, septum, and apex. Right coronary is inferior. Circumflex is lateral. If you remember nothing else: name the artery before you name the percent.`,
      },
      {
        id: "nm2",
        title: "Holes that fill",
        script: `A hole on stress that fills at rest is ischemia. A hole that stays is scar. Rest uptake, or F D G uptake, inside a stress hole is hibernating muscle. That wall can still be revascularized. [pause] Balanced three-vessel disease is the lie. Every segment looks the same washed-out gray. The cavity got bigger with stress. The E F fell. Cath them.`,
      },
    ],
  },
  "cmr-lge": {
    framework: [
      { text: "Does scar start at the endocardium?" },
      { text: "Does it follow a coronary?" },
      { text: "If no — name the infiltrate" },
      { text: "MINOCA needs this map", tone: "ok" },
    ],
    remember: "Infarct late gadolinium starts at the endocardium and follows a coronary. Every other white pattern is not a plaque.",
    path: "Gadolinium sits where the extracellular space is large: scar, inflammation, infiltrate. Where it sits is the diagnosis.",
    dx: "Subendo or transmural in a territory: infarct. Epicardial or midwall: myocarditis. Global subendo with bad nulling: amyloid. Patchy insertion: H C M. Basal septum plus heart block: sarcoid.",
    tx: "MINOCA after clean arteries: M R I within days. Amyloid: light chains then P Y P. Sarcoid: F D G PET and a defibrillator conversation.",
    drillTags: ["CMR", "Myocarditis", "Amyloid", "Sarcoid", "HCM"],
    quickTable: {
      headers: ["LGE", "Disease"],
      rows: [
        ["Subendo / transmural", "Infarct"],
        ["Epicardial", "Myocarditis"],
        ["Global subendo", "Amyloid"],
        ["Patchy insertion", "HCM"],
        ["Basal midwall + CHB", "Sarcoid"],
      ],
    },
    lecture: [
      {
        id: "lg1",
        title: "White scar",
        script: `Late gadolinium is white scar on a black-blood picture. If it starts at the endocardium and follows a coronary, that is an infarct. If it sits on the epicardium or in the midwall and ignores the arteries, that is myocarditis. [pause] Global subendocardial enhancement that will not null is amyloid. Patchy scar at the right-ventricular insertion is H C M. Midwall basal septum in a young complete heart block is sarcoid.`,
      },
      {
        id: "lg2",
        title: "MINOCA",
        script: `Troponin up, arteries clean. Do not send them home as demand ischemia. Cardiac M R I splits missed infarct, myocarditis, and takotsubo. Takotsubo usually has no late gadolinium. Myocarditis does. [pause] This is high yield. The scan changes the name of the disease.`,
      },
    ],
  },
  "ct-stress": {
    framework: [
      { text: "Can they walk?" },
      { text: "Can you read the ST segment?" },
      { text: "If no — image" },
      { text: "Never stress an occlusion equivalent", tone: "danger" },
    ],
    remember: "Interpretable ECG and two flights of stairs: a treadmill is still legal. LBBB, paced, Wellens — not a treadmill.",
    path: "Pretest probability picks the test. Anatomy (C T) versus ischemia (stress) versus the lab.",
    dx: "Calcium score is for asymptomatic risk. Coronary C T is a rule-out in low to intermediate probability. F F R from C T under zero-point-eight-zero is a significant lesion. Interarterial anomalous left is a surgical lesion.",
    tx: "Do not stress A C S, symptomatic severe aortic stenosis, or dissection. Adenosine is illegal in high-grade block and active wheeze.",
    drillTags: ["Testing", "Prevention", "Congenital"],
    quickTable: {
      headers: ["Patient", "Test"],
      rows: [
        ["Walks, readable ECG", "Exercise ECG"],
        ["LBBB / paced / WPW", "Vasodilator MPI or PET"],
        ["Low–int. pretest", "CCTA"],
        ["Wellens / de Winter", "Cath, not stress"],
      ],
    },
    lecture: [
      {
        id: "cs1",
        title: "Who to stress",
        script: `If they can walk and you can read the S T segment, an exercise electrocardiogram is still a real test. The Duke treadmill score still exists. [pause] Left bundle, paced rhythm, W P W, digoxin, more than a millimeter of rest S T depression: do not read an exercise tracing. Image them. Vasodilator perfusion if they cannot walk. Dobutamine echo if they cannot vasodilate.`,
      },
      {
        id: "cs2",
        title: "CT and anomalies",
        script: `Coronary calcium is a risk tool for people without chest pain. Coronary C T is a rule-out test. F F R from the C T at or under zero-point-eight-zero is ischemia. [pause] Anomalous left coronary from the right sinus with an interarterial course is a sudden-death lesion. Restrict. Refer. Operate.`,
      },
    ],
  },
  "acs-nste": {
    framework: [
      { text: "Is this an occlusion equivalent?" },
      { text: "Shock, pain, fire: lab now" },
      { text: "High-risk NSTE: 24 hours" },
      { text: "Clean arteries? MINOCA / SCAD", tone: "warn" },
    ],
    remember: "Unstable NSTE is a STEMI clock. Clean arteries with a real infarct is MINOCA — get C M R. Postpartum ACS is S C A D until the pictures say plaque.",
    path: "Aspirin, a P2Y12, anticoagulation, high-intensity statin. Then the lab on a clock that matches the risk.",
    dx: "STEMI and equivalents: now. Shock, refractory pain, instability: now. High-risk NSTE: within a day. Isolated anterior depression: posterior leads.",
    tx: "Stable S C A D with flow: conservative. Do not lay long stents into a flap. MINOCA: hunt spasm, embolus, myocarditis, missed plaque.",
    drillTags: ["ACS", "STEMI", "Prevention"],
    quickTable: {
      headers: ["Situation", "Move"],
      rows: [
        ["Shock / refractory NSTE", "Immediate angio"],
        ["High-risk NSTE", "Within 24 h"],
        ["MINOCA", "CMR ± OCT"],
        ["Stable SCAD TIMI 3", "Conservative"],
      ],
    },
    lecture: [
      {
        id: "an1",
        title: "The clock",
        script: `S T elevation and the equivalents — Wellens, de Winter, posterior depression — go to the lab now. Non-S T elevation with shock, ongoing pain, or a crashing pump also goes now. High-risk non-S T elevation goes within a day. [pause] Aspirin chewed. Ticagrelor or prasugrel if they are going to percutaneous coronary intervention and the bleeding risk allows. High-intensity statin before the sun sets.`,
      },
      {
        id: "an2",
        title: "Clean arteries",
        script: `Troponin up, no stenosis of fifty percent. That is M I N O C A. Cardiac M R I splits myocarditis, missed infarct, and takotsubo. [pause] Week two after delivery, a long smooth narrowing, flow is preserved: spontaneous coronary dissection. Conservative if they are stable. A long stent can propagate the flap.`,
      },
    ],
  },
  "devices-scd": {
    framework: [
      { text: "Unreliable escape? Pace" },
      { text: "Low EF on GDMT? ICD talk" },
      { text: "Wide LBBB? CRT" },
      { text: "Exertional syncope is cardiac", tone: "danger" },
    ],
    remember: "Complete heart block paces. Isolated first-degree with a pulse of forty-eight does not. Exertional syncope in a young athlete is not dehydration first.",
    path: "Devices are for unreliable conduction, for sudden-death risk, and for dyssynchrony. Match the indication to the tracing and the E F.",
    dx: "Mobitz two, high-grade, complete block: pacemaker. E F thirty-five on guideline therapy: defibrillator conversation. L B B B at one-fifty: resynchronization.",
    tx: "Stop sport pending the workup when syncope is exertional or the family tree is dark. H C M risk is syncope, family sudden death, wall thirty, nonsustained V T, and scar burden.",
    drillTags: ["Devices", "AV block", "Syncope", "HCM"],
    quickTable: {
      headers: ["Lesion", "Device"],
      rows: [
        ["CHB / Mobitz II", "PPM"],
        ["EF ≤35 on GDMT", "ICD"],
        ["EF ≤35 + LBBB ≥150", "CRT-D"],
        ["Isolated 1° AVB", "None"],
      ],
    },
    lecture: [
      {
        id: "ds1",
        title: "Who paces",
        script: `Unreliable escape rhythms get a pacemaker. Mobitz two. High-grade. Complete heart block. Alternating bundles. [pause] Isolated first-degree block in a well seventy-nine-year-old is not a class one indication. Hunt the beta-blocker. The tracing that opened this course still does not get a pacemaker.`,
      },
      {
        id: "ds2",
        title: "Who defibrillates",
        script: `E F thirty-five, class two or three, guideline therapy, expected survival over a year: primary-prevention defibrillator, especially after an infarct. Add a left-bundle at one-fifty milliseconds and it becomes resynchronization. [pause] A seventeen-year-old who faints mid-sprint, with a cousin who died swimming, does not get a tilt table first. Electrocardiogram, echo, stop sport.`,
      },
    ],
  },
  "pharm-boards": {
    framework: [
      { text: "Structure first — then class Ic" },
      { text: "DOAC unless metal or MS" },
      { text: "High-intensity statin, then add-on" },
      { text: "Never nodal-block pre-excited AF", tone: "danger" },
    ],
    remember: "Flecainide needs a normal heart. D O A Cs need a native valve. Mechanical mitral wants I N R two-five to three-five. Pre-excited A F wants procainamide or a shock.",
    path: "Every rhythm drug has a room it cannot enter. Scar, heart failure, and accessory pathways are the rooms.",
    dx: "Class Ic is illegal in coronary disease and low E F. Amiodarone is dirty and legal in heart failure. Sotalol and dofetilide need a measured Q T C in a hospital.",
    tx: "Reverse dabigatran with idarucizumab. Reverse a factor X a D O A C with andexanet or P C C. Warfarin bleed: P C C and vitamin K. Q T C over five hundred: stop the drug, potassium and magnesium tonight.",
    drillTags: ["Pharmacology", "WPW", "Prevention", "QT"],
    quickTable: {
      headers: ["Drug", "Forbidden in"],
      rows: [
        ["Flecainide", "CAD, low EF"],
        ["AV-nodal blockers", "Pre-excited AF"],
        ["DOAC", "Mechanical valve, MS"],
        ["Mavacamten", "EF <50%"],
      ],
    },
    lecture: [
      {
        id: "pb1",
        title: "Rhythm drugs",
        script: `Flecainide is a pill in the pocket only if the heart is structurally normal. C A S T taught us that class one-c kills in scar. Amiodarone is ugly and allowed in heart failure. Sotalol and dofetilide need the Q T watched in a hospital. [pause] Adenosine is a diagnostic gift in A V N R T and a disaster in pre-excited atrial fibrillation. That irregular wide tracing gets procainamide or electricity.`,
      },
      {
        id: "pb2",
        title: "Thinners and lipids",
        script: `A D O A C unless there is a mechanical valve or moderate to severe mitral stenosis. Mechanical mitral I N R is two-point-five to three-point-five. Aspirin is not anticoagulation. [pause] Clinical atherosclerosis: high-intensity statin. Then ezetimibe. Then a P C S K nine inhibitor. Icosapent if triglycerides stay high. Niacin does not win.`,
      },
    ],
  },
  "endocarditis-ix": {
    framework: [
      { text: "Cultures, then drugs" },
      { text: "TEE for hardware and root" },
      { text: "HF or abscess: operate" },
      { text: "Prophylaxis is a short list", tone: "ok" },
    ],
    remember: "Vegetation plus heart failure is an operation, not a six-week delay. Prophylaxis is for prosthetic valves, prior infection, and unrepaired cyanotic disease — not a lonely bicuspid.",
    path: "Duke criteria name the infection. Echo names the wreckage. Surgery is for wreckage you cannot medically hold.",
    dx: "Two major, or one major and three minor. Major is typical bugs in two cultures, or a vegetation, abscess, or new dehiscence. A lengthening P R on an aortic valve is a root abscess until proven otherwise.",
    tx: "Highest-risk mouths get amoxicillin. G I and G U procedures do not. Stuck left-sided prosthetic thrombosis in shock is emergency surgery.",
    drillTags: ["Endocarditis", "Valves", "Echo"],
    quickTable: {
      headers: ["Problem", "Move"],
      rows: [
        ["IE + HF", "Operate"],
        ["Abscess / fungus", "Operate"],
        ["Prosthetic + fever", "TEE"],
        ["Isolated BAV + dentist", "No prophylaxis"],
      ],
    },
    lecture: [
      {
        id: "ei1",
        title: "Duke and the knife",
        script: `Blood cultures first, then antibiotics, unless they are dying. Duke still names the disease. [pause] Operate when the valve is wrecked and the lung is wet, when infection is not controlled — abscess, fungus, stubborn bacteremia — or when emboli keep leaving a large vegetation. A lengthening P R with an aortic vegetation is a root abscess.`,
      },
      {
        id: "ei2",
        title: "Hardware",
        script: `Mechanical mitral I N R two-point-five to three-point-five. Do not switch them to a D O A C. Fever plus a prosthetic valve is a transesophageal echo, not a nicer transthoracic tomorrow. [pause] Prophylaxis is a short list: prosthetic valve, prior endocarditis, unrepaired cyanotic disease. A bicuspid aortic valve without those does not get amoxicillin for a filling.`,
      },
    ],
  },
  "trials-stack": {
    framework: [
      { text: "Match the population" },
      { text: "HFrEF: ARNI, SGLT2" },
      { text: "Stable CAD: medicines first" },
      { text: "Diabetic 3VD: CABG", tone: "ok" },
    ],
    remember: "If the stem names a trial, they want the take-home. C O A P T is selected secondary mitral regurgitation on guideline therapy, not every jet.",
    path: "Guideline-directed therapy is a pile of named trials. Learn the one-liners, not the Kaplan-Meier art.",
    dx: "P A R A D I G M: A R N I beats enalapril. D A P A H F and EMPEROR: S G L T two in reduced and preserved E F. I S C H E M I A: routine stents do not prevent death in stable disease. F R E E D O M: bypass in diabetic three-vessel disease.",
    tx: "C O A P T clip on optimized therapy. C A S T L E A F: ablate A F in reduced E F. I A B P shock two: the balloon is not a shock therapy by itself.",
    drillTags: ["Trials", "Heart failure", "Angio", "Prevention"],
    quickTable: {
      headers: ["Trial", "Line"],
      rows: [
        ["PARADIGM-HF", "ARNI > ACE"],
        ["DAPA-HF / EMPEROR", "SGLT2"],
        ["ISCHEMIA", "No death win, stable PCI"],
        ["FREEDOM", "CABG in diabetic 3VD"],
        ["COAPT", "TEER if selected"],
      ],
    },
    lecture: [
      {
        id: "ts1",
        title: "Pump trials",
        script: `P A R A D I G M: an A R N I beat enalapril. D A P A H F and EMPEROR: S G L T two inhibitors work in heart failure whether or not the patient has diabetes, reduced or preserved. [pause] C O A P T: a clip on top of optimized therapy in selected secondary mitral regurgitation. M I T R A F R did not win. Selection is the whole game.`,
      },
      {
        id: "ts2",
        title: "Ischemia and devices",
        script: `I S C H E M I A: routine percutaneous coronary intervention did not prevent death in stable coronary disease. F A M E: fractional flow reserve over zero-point-eight-zero is medicines. F R E E D O M: diabetic three-vessel disease goes to surgery. [pause] C A S T L E A F: ablate atrial fibrillation in reduced E F. I A B P shock two: the balloon pump is not a mortality therapy by itself.`,
      },
    ],
  },
};
