import type { Teach } from "./types";

export const TEACH_EXTRA: Record<string, Teach> = {
  "echo-windows": {
    framework: [
      { text: "Name the window first" },
      { text: "Name the chambers" },
      { text: "Then the lesion" },
      { text: "Then the next test", tone: "ok" },
    ],
    remember: "If you cannot name the view, you cannot name the disease.",
    path: "Ultrasound windows are geometric cuts through the heart. Each lesion has a preferred cut.",
    dx: "PLAX for AS/AR/SAM/effusion. A4C for MR/function/apex. PSAX for WMA and D-sign. Subcostal for IAS and IVC.",
    tx: "Bad window → try another, then TEE if endocarditis, dissection, or intraoperative.",
    drillTags: ["Echo"],
    quickTable: {
      headers: ["View", "Job"],
      rows: [
        ["PLAX", "AV, MV, SAM, effusion"],
        ["PSAX", "Walls, D-sign"],
        ["A4C", "MR, function, ASD"],
        ["Subcostal", "IAS, IVC, tamponade"],
      ],
    },
    lecture: [
      { id: "ew1", title: "Windows", script: `Echo is geometry. Parasternal long axis shows the aortic and mitral valves in profile. Short axis maps walls and the D-sign. Apical four-chamber is function, mitral regurgitation, and the apex. Subcostal is the septum and the I V C. [pause] If you remember nothing else: name the window before you name the lesion.` },
      { id: "ew2", title: "TEE", script: `When transthoracic cannot see a vegetation, a dissection flap, or a prosthetic leak, you go transesophageal. That is not a personality test. It is a better window.` },
    ],
  },
  "echo-function": {
    framework: [
      { text: "EF and strain" },
      { text: "Who is hypokinetic?" },
      { text: "Territory or global?" },
      { text: "Then diastole", tone: "ok" },
    ],
    remember: "Global failure is a cardiomyopathy. A wall is a coronary until the cath says no. Apical ballooning with a trigger is takotsubo — still cath.",
    path: "Ischemic walls follow arteries. Cardiomyopathy does not.",
    dx: "Simpsons EF. Strain for subclinical. E/A, e', E/e', TR, LA volume for diastole.",
    tx: "HFrEF GDMT. Territorial WMA: treat as CAD. Restrictive filling is high pressure — diurese and find why.",
    drillTags: ["Echo", "Heart failure"],
    quickTable: {
      headers: ["Wall", "Artery"],
      rows: [
        ["Anterior / apex / septum", "LAD"],
        ["Inferior", "RCA"],
        ["Lateral", "LCx"],
        ["Global", "Cardiomyopathy"],
      ],
    },
    lecture: [
      { id: "ef1", title: "Walls", script: `Seventeen segments. Anterior, septal, apical is L A D. Inferior is usually right coronary. Lateral is circumflex. Global is not a plaque. [pause] Apical ballooning after a funeral, arteries open: takotsubo. You still exclude occlusion.` },
      { id: "ef2", title: "Diastole", script: `E over A, e prime, E over e prime, tricuspid velocity, left atrial volume. E over A of two or more is restrictive filling. Do not grade diastole in atrial fibrillation or mitral stenosis without saying so.` },
    ],
  },
  "echo-valves": {
    framework: [
      { text: "Which valve?" },
      { text: "Stenosis or regurg?" },
      { text: "Severe by numbers?" },
      { text: "Symptoms or EF drop → treat", tone: "warn" },
    ],
    remember: "Severe AS is Vmax 4, mean 40, AVA 1.0. Primary MR is a repair disease. Secondary MR is a GDMT disease first.",
    path: "Pressure overload thickens (AS). Volume overload dilates (AR, MR).",
    dx: "Dimensionless index, PHT, EROA, regurg volume. Low-flow AS needs dobutamine or CT calcium.",
    tx: "TAVR vs SAVR by age and anatomy. Degenerative MR: repair. Rheumatic MS: balloon if the valve allows.",
    drillTags: ["Valves"],
    quickTable: {
      headers: ["Severe", "Number"],
      rows: [
        ["AS", "Vmax ≥4, mean ≥40, AVA ≤1.0"],
        ["Primary MR", "EROA ≥0.4"],
        ["AR", "VC >6 mm, RF ≥50%"],
        ["MS", "MVA ≤1.5"],
      ],
    },
    lecture: [
      { id: "ev1", title: "AS and MR", script: `Severe aortic stenosis: velocity four, mean forty, area one. Low-flow low-gradient is still severe if the valve is calcified and the stroke volume is low. [pause] Primary mitral regurgitation is a surgical repair. Secondary is guideline-directed medical therapy first, then a clip if the C O A P T rules fit.` },
      { id: "ev2", title: "AR and MS", script: `Chronic aortic regurgitation grows the left ventricle before the patient notices. Operate when symptoms appear or the E F sags. Mitral stenosis is rheumatic until you have a better story. Balloon if the valve is favorable.` },
    ],
  },
  "echo-cm": {
    framework: [
      { text: "Thick septum + SAM? HCM" },
      { text: "Thick + low voltage? Amyloid" },
      { text: "Apex balloons? Takotsubo" },
      { text: "Avoid vasodilators in HOCM", tone: "danger" },
    ],
    remember: "HOCM gets a beta-blocker, not nitroglycerin. Amyloid is a mismatch between echo and ECG voltage.",
    path: "Disarray, infiltrate, catecholamine stun.",
    dx: "ASH ≥15 mm, SAM, dagger Doppler. Apical sparing strain in amyloid.",
    tx: "Beta-block, then mavacamten / myectomy / alcohol septal in selected. Tafamidis for ATTR. Cath to exclude occlusion in takotsubo.",
    drillTags: ["HCM", "Amyloid"],
    quickTable: {
      headers: ["CM", "Do not give"],
      rows: [
        ["HOCM", "Vasodilators, inotropes, digoxin"],
        ["Amyloid", "Digoxin / non-DHP CCB casually"],
        ["Takotsubo", "A shrug without a cath"],
      ],
    },
    lecture: [
      { id: "cm1", title: "HCM", script: `Asymmetric septal hypertrophy and systolic anterior motion. The Doppler is a dagger. First drug is a beta-blocker. Do not give nitroglycerin. Do not give dobutamine.` },
      { id: "cm2", title: "Amyloid and balloon", script: `Thick walls, small cavity, tiny voltage on the ECG. That mismatch is amyloid. Takotsubo balloons the apex after a stress. Arteries are open. You still look.` },
    ],
  },
  "echo-peri-shunt": {
    framework: [
      { text: "Effusion + collapse + pulsus? Drain" },
      { text: "Fever + mass on a valve? Cultures" },
      { text: "IAS dropout + RV volume? ASD" },
      { text: "D-sign is pressure, not volume", tone: "warn" },
    ],
    remember: "Tamponade is a clinical diagnosis with an echo that agrees. Vegetation is endocarditis until cultures and a surgeon say otherwise.",
    path: "Fluid kills by filling pressure. Bugs destroy leaflets. Holes volume-load the right heart.",
    dx: "RV diastolic collapse, IVC plump. Oscillating mass. Color through the IAS.",
    tx: "Pericardiocentesis if tamponade. Duke + antibiotics + source control. Close ASD if PVR allows.",
    drillTags: ["Pericardial", "Endocarditis"],
    quickTable: {
      headers: ["Finding", "Move"],
      rows: [
        ["Tamponade", "Drain"],
        ["Vegetation", "Cultures, antibiotics, surgery if indicated"],
        ["ASD with volume load", "Close if not Eisenmenger"],
      ],
    },
    lecture: [
      { id: "ps1", title: "Fluid and bugs", script: `Large effusion and right ventricular collapse: tamponade physiology. The patient is short of breath and hypotensive. Drain it. [pause] Oscillating mass on a valve with fever: blood cultures, then antibiotics. Transesophageal if you need a better look.` },
      { id: "ps2", title: "Holes", script: `Secundum A S D is dropout in the fossa. The right heart is volume loaded. Close it if the lungs are not Eisenmenger. The D-sign on short axis is pressure overload, not a hole.` },
    ],
  },
  "angio-anatomy": {
    framework: [
      { text: "Left or right tree?" },
      { text: "Which camera angle?" },
      { text: "Who makes the PDA?" },
      { text: "TIMI flow", tone: "ok" },
    ],
    remember: "RAO cranial for LAD. Spider (LAO caudal) for left main bifurcation. Dominance is who makes the PDA.",
    path: "Epicardial arteries follow AV and interventricular grooves.",
    dx: "Percent stenosis is a picture. FFR/iFR is physiology.",
    tx: "STEMI opens the culprit. Stable moderate disease needs physiology, not a reflex stent.",
    drillTags: ["Angio"],
    quickTable: {
      headers: ["View", "Shows"],
      rows: [
        ["RAO cranial", "LAD / diagonals"],
        ["LAO caudal", "LM / LCx"],
        ["RCA LAO", "RCA to crux"],
      ],
    },
    lecture: [
      { id: "an1", title: "The tree", script: `Left main splits into L A D and circumflex. The L A D gives diagonals and septals. Circumflex gives obtuse marginals. The right coronary gives the P D A in a right-dominant system, which is most people.` },
      { id: "an2", title: "Cameras", script: `R A O cranial unmasks the L A D. L A O caudal is the spider view of the left main bifurcation. If you cannot see a lesion, change the camera before you invent one.` },
    ],
  },
  "angio-culprit": {
    framework: [
      { text: "STEMI → culprit PCI now" },
      { text: "LM or diabetic 3VD → heart team / CABG" },
      { text: "Stable + FFR >0.80 → medicines", tone: "ok" },
      { text: "Shock: open the culprit, support the rest", tone: "danger" },
    ],
    remember: "Anterior is LAD. Inferior is RCA unless left-dominant. Posterior/lateral is the circumflex you forgot.",
    path: "Plaque rupture plus thrombus. Time is muscle.",
    dx: "TIMI 0 is an occlusion. Left main is a conversation, not a casual stent.",
    tx: "Primary PCI for STEMI. CABG for diabetic 3VD. Complete revascularization later in shock after the culprit.",
    drillTags: ["Angio", "STEMI"],
    quickTable: {
      headers: ["ECG wall", "Culprit"],
      rows: [
        ["Anterior", "LAD"],
        ["Inferior III>II", "RCA"],
        ["Lateral / posterior", "LCx"],
      ],
    },
    lecture: [
      { id: "cu1", title: "Culprits", script: `Anterior ST elevation is the L A D. Inferior with three taller than two is the right coronary. Isolated posterior depression is circumflex until you look. [pause] Left main and diabetic three-vessel disease belong to a heart team. Stable F F R over zero-point-eight-zero belongs to medicines.` },
      { id: "cu2", title: "Shock", script: `In shock, open the culprit. Support the blood pressure. Complete the rest later. An Impella does not fix a ruptured papillary muscle.` },
    ],
  },
  "hemo-lab": {
    framework: [
      { text: "LV ≫ AO? AS" },
      { text: "LA ≫ LV diastole? MS" },
      { text: "Equalization? Tamponade" },
      { text: "Discordance? Constriction", tone: "warn" },
    ],
    remember: "Brockenbrough: after a PVC, LV up, aortic pulse down — HOCM, not fixed AS.",
    path: "Gradients are pressure differences. Equalization is a shared pericardial space.",
    dx: "Pullback, simultaneous LV/AO, RA/RV/PCWP.",
    tx: "AS: AVR/TAVR. Tamponade: drain. Constriction: pericardiectomy. HOCM: not a valve replacement first.",
    drillTags: ["Hemodynamics"],
    quickTable: {
      headers: ["Trace", "Means"],
      rows: [
        ["LV ≫ AO", "AS"],
        ["Equalization", "Tamponade"],
        ["Discordance", "Constriction"],
        ["Brockenbrough", "HOCM"],
      ],
    },
    lecture: [
      { id: "hl1", title: "Gradients", script: `Left ventricle two-ten, aorta one-oh-eight: severe aortic stenosis. Left atrium above the ventricle all diastole: mitral stenosis. [pause] Diastolic equalization of the right atrium, right ventricle, and left ventricle: tamponade.` },
      { id: "hl2", title: "Discordance", script: `Constriction: the ventricles fight. Left and right pressures go opposite with respiration. Restriction: they go together. After a premature beat, if the left ventricular pressure rises and the aortic pulse falls, that is H O C M.` },
    ],
  },
  "hf-gdmt": {
    framework: [
      { text: "ARNI / ACE" },
      { text: "Beta-blocker" },
      { text: "MRA" },
      { text: "SGLT2 — then devices", tone: "ok" },
    ],
    remember: "Four pillars in HFrEF. CRT if LBBB 150 and EF 35. ICD if EF 35 after GDMT.",
    path: "Neurohormonal blockade and unloading save lives. Inotropes do not.",
    dx: "EF, NYHA, QRS, eGFR, K.",
    tx: "Start GDMT. Diurese congestion. Devices when the numbers still qualify.",
    drillTags: ["Heart failure"],
    quickTable: {
      headers: ["Pillar", "Example"],
      rows: [
        ["ARNI", "Sacubitril/valsartan"],
        ["BB", "Carvedilol / bisoprolol / metoprolol succ"],
        ["MRA", "Spironolactone / eplerenone"],
        ["SGLT2", "Dapagliflozin / empagliflozin"],
      ],
    },
    lecture: [
      { id: "hf1", title: "Pillars", script: `Heart failure with reduced E F. Four drugs. An A R N I, a proven beta-blocker, a mineralocorticoid antagonist, and an S G L T two inhibitor. Start them. Do not wait for a perfect moment.` },
      { id: "hf2", title: "Devices", script: `E F thirty-five, class two or three, L B B B at one-fifty milliseconds: C R T. E F thirty-five after guideline therapy: a defibrillator for primary prevention. H F p E F: S G L T two, treat congestion, treat the cause.` },
    ],
  },
  shock: {
    framework: [
      { text: "Hypoperfusion? This is shock" },
      { text: "Norepi for pressure" },
      { text: "Inotrope if cold" },
      { text: "MCS if still dying", tone: "danger" },
    ],
    remember: "A new murmur in shock after MI is VSR or papillary rupture until echo says no.",
    path: "Pump failure, obstruction, or a hole.",
    dx: "Lactate, cool extremities, SCAI stage, echo.",
    tx: "Pressor, inotrope, Impella/ECMO, fix the mechanical complication in the OR.",
    drillTags: ["Shock"],
    quickTable: {
      headers: ["Tool", "Does"],
      rows: [
        ["Norepi", "Pressure"],
        ["Dobutamine", "Inotropy"],
        ["Impella", "Unloads LV"],
        ["VA-ECMO", "Flow + gas"],
      ],
    },
    lecture: [
      { id: "sk1", title: "Shock", script: `Cardiogenic shock is hypoperfusion, not just a low blood pressure. Norepinephrine first. Dobutamine if the pump is cold and the pressure allows. [pause] Day three of an infarct with a new harsh murmur: ventricular septal rupture or a torn papillary muscle. Echo. Surgery.` },
      { id: "sk2", title: "Devices", script: `Balloon pump is weak as sole therapy. Impella unloads. E C M O buys flow and oxygenation but may overfill the left ventricle. None of them replace a surgeon for a mechanical complication.` },
    ],
  },
  prevention: {
    framework: [
      { text: "High-intensity statin" },
      { text: "Add ezetimibe / PCSK9 if needed" },
      { text: "SGLT2 / GLP-1 in DM + ASCVD" },
      { text: "Stable FFR >0.80: no stent", tone: "ok" },
    ],
    remember: "ISCHEMIA: routine PCI does not save lives in stable CAD. Medicines do the boring work.",
    path: "LDL, thrombosis, glucose, blood pressure.",
    dx: "LDL-C, A1c, BP, FFR when the lesion is intermediate.",
    tx: "High-intensity statin in ACS before discharge. DAPT duration is a bleed-versus-ischemia conversation.",
    drillTags: ["Prevention"],
    quickTable: {
      headers: ["Drug", "Who"],
      rows: [
        ["High-intensity statin", "Clinical ASCVD"],
        ["PCSK9", "LDL still high"],
        ["SGLT2 / GLP-1", "DM plus ASCVD"],
      ],
    },
    lecture: [
      { id: "pv1", title: "Lipids", script: `Clinical atherosclerosis: high-intensity statin. If L D L is still high, ezetimibe, then a P C S K nine inhibitor. Start the statin in the hospital after an acute coronary syndrome.` },
      { id: "pv2", title: "Stable CAD", script: `Fractional flow reserve over zero-point-eight-zero: treat with medicines. I S C H E M I A did not show a mortality win for routine stenting in stable disease. Diabetes with atherosclerosis: S G L T two and G L P one.` },
    ],
  },
  "aorta-vascular": {
    framework: [
      { text: "Type A → OR" },
      { text: "Type B → meds unless rupture/malperfusion" },
      { text: "AAA ~5.5 cm" },
      { text: "Chest pain + AR + unequal BP: CTA/TEE", tone: "danger" },
    ],
    remember: "Do not treat type A as ACS. Anticoagulation is how you lose that patient.",
    path: "Media tears. True and false lumens.",
    dx: "CTA if stable. TEE in the OR if dying.",
    tx: "Surgery for A. TEVAR for complicated B. Statin and antiplatelet for PAD.",
    drillTags: ["Aorta"],
    quickTable: {
      headers: ["Lesion", "Move"],
      rows: [
        ["Type A", "OR"],
        ["Type B complicated", "TEVAR"],
        ["AAA 5.5", "Repair"],
      ],
    },
    lecture: [
      { id: "ao1", title: "Dissection", script: `Type A involves the ascending aorta. That is an operation now. Type B is medical unless there is malperfusion, rupture, or pain you cannot stop — then T E V A R. Chest pain, a new aortic regurgitation murmur, and unequal pulses: do not give heparin as if this were a plaque.` },
      { id: "ao2", title: "Aneurysm", script: `Ascending aorta around five-five millimeters, earlier if bicuspid or heritable. Abdominal aneurysm five-five in men, five-oh in women. Peripheral disease: exercise, statin, antiplatelet. Revascularize if they cannot live their life.` },
    ],
  },
  "htn-ph": {
    framework: [
      { text: "Emergency = damage + drop MAP 25%" },
      { text: "Group 2 PH is the left heart" },
      { text: "Group 4 is CTEPH — operable?" },
      { text: "Do not vasodilate group 2", tone: "warn" },
    ],
    remember: "Pulmonary vasodilators drown left-heart PH. CTEPH can be cured with PEA.",
    path: "Afterload on the wrong ventricle.",
    dx: "End-organ damage for HTN emergency. RHC to classify PH.",
    tx: "IV agent for emergency. Treat the group, not the PASP.",
    drillTags: ["PH"],
    quickTable: {
      headers: ["Group", "Treat"],
      rows: [
        ["1 PAH", "Vasodilators"],
        ["2", "Left heart"],
        ["4 CTEPH", "PEA if operable"],
      ],
    },
    lecture: [
      { id: "hp1", title: "HTN", script: `Hypertensive emergency is severe pressure plus organ damage. Drop the mean arterial pressure about twenty-five percent in the first hour with an intravenous agent. Urgency without damage is oral medicines and follow-up, not a hero drip.` },
      { id: "hp2", title: "PH groups", script: `Group two is the left heart. Pulmonary vasodilators will flood those lungs. Group four is chronic thromboembolic disease. Some of them are cured with pulmonary endarterectomy. Right heart catheterization classifies. Echo only estimates.` },
    ],
  },
  "af-clinical": {
    framework: [
      { text: "Anticoagulate by CHA2DS2-VASc" },
      { text: "Rate control" },
      { text: "Rhythm if it helps — especially HFrEF" },
      { text: "DOAC unless valve/MS", tone: "ok" },
    ],
    remember: "Do not anticoagulate MAT. Do not cardiovert stale AF without TEE or 3 weeks of OAC unless they are crashing.",
    path: "Atria remodel. Appendage clots. Rate kills the ventricle.",
    dx: "ECG you already know. Echo for valves and EF.",
    tx: "DOAC. Ablation in HFrEF with AF. Watchman only if OAC is truly impossible.",
    drillTags: ["AF"],
    quickTable: {
      headers: ["Decision", "Rule"],
      rows: [
        ["Stroke", "CHA2DS2-VASc → DOAC"],
        ["Stale AF", "TEE or 3 weeks OAC"],
        ["HFrEF + AF", "Ablation discussion"],
      ],
    },
    lecture: [
      { id: "af1", title: "Stroke", script: `Atrial fibrillation. Anticoagulate by C H A two D S two V A Sc. A D O A C unless there is a mechanical valve or moderate to severe mitral stenosis. Aspirin is not anticoagulation.` },
      { id: "af2", title: "Rhythm", script: `Rate control is still legal. Early rhythm control helps selected patients. In heart failure with reduced E F, ablation is a conversation you should have. Do not shock atrial fibrillation that has been there for days without a transesophageal echo or three weeks of anticoagulation, unless the patient is dying.` },
    ],
  },
  "achd-preg-onc": {
    framework: [
      { text: "Volume-loaded ASD → close if PVR ok" },
      { text: "Eisenmenger → never close" },
      { text: "mWHO IV → advise against pregnancy" },
      { text: "Anthracycline: watch EF/GLS", tone: "warn" },
    ],
    remember: "Severe MS decompensates in the second trimester. Checkpoint-inhibitor myocarditis can present as heart block.",
    path: "Shunts, pulmonary vascular disease, hormones, toxins.",
    dx: "Qp/Qs, PVR, mWHO class, GLS.",
    tx: "Expert ACHD. Hold the offending chemo if EF crashes. Do not close Eisenmenger.",
    drillTags: ["ACHD"],
    quickTable: {
      headers: ["Entity", "Move"],
      rows: [
        ["ASD + volume", "Close"],
        ["Eisenmenger", "Do not close"],
        ["mWHO IV", "Avoid pregnancy"],
      ],
    },
    lecture: [
      { id: "ap1", title: "ACHD", script: `Atrial septal defect with right ventricular volume load and a safe pulmonary vascular resistance: close it. Eisenmenger: the hole is the pop-off. Do not close it. Fontan patients belong in an adult congenital clinic, not a random admission.` },
      { id: "ap2", title: "Pregnancy and toxins", script: `M W H O four — Eisenmenger, severe mitral stenosis, E F under thirty — advise against pregnancy. Anthracyclines: watch strain and E F. Immune checkpoint myocarditis can be complete heart block. That is a crash, not a clinic follow-up.` },
    ],
  },
  "peri-op": {
    framework: [
      { text: "Can they do 4 METs?" },
      { text: "RCRI ≥2 is elevated" },
      { text: "DES: wait 6 months if elective" },
      { text: "Do not start a beta-blocker tonight", tone: "warn" },
    ],
    remember: "The slow long-PR tracing still does not get a pacemaker for hip surgery.",
    path: "Supply-demand mismatch under anesthesia.",
    dx: "RCRI, METs, recent stent date.",
    tx: "Continue home beta-blocker. Delay elective surgery after DES. No routine stress if functional capacity is good.",
    drillTags: ["Perioperative", "Clinical"],
    quickTable: {
      headers: ["Stent", "Elective surgery"],
      rows: [
        ["BMS", "1 month"],
        ["DES", "6 months (3 if it cannot wait)"],
      ],
    },
    lecture: [
      { id: "po1", title: "Risk", script: `Revised cardiac risk index: high-risk surgery, coronary disease, heart failure, stroke, creatinine over two, insulin. Two or more is elevated risk. If they can climb two flights of stairs, do not routine-stress them.` },
      { id: "po2", title: "Stents and the tracing", script: `Bare-metal: wait a month. Drug-eluting: wait six months for elective surgery. Continue the beta-blocker if they already take it. Do not start one the night before. And the tracing that opened this course — sinus bradycardia with first-degree block — still does not get a pacemaker for the operating room.` },
    ],
  },
};
