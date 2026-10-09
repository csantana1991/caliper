import type { Module } from "./types";

function M(partial: Module): Module {
  return partial;
}

export const EXTRA_MODULES: Module[] = [
  M({
    id: "echo-windows",
    n: "16",
    track: "echo",
    title: "Echo windows",
    dek: "PLAX, PSAX, apical 4/2/3, subcostal, suprasternal — what each view is for.",
    minutes: 12,
    echoId: "echo-normal-a4c",
    sections: [
      {
        id: "views",
        title: "The five windows",
        blocks: [
          { type: "remember", text: "Every board echo question names a window. If you cannot say which view you are in, you cannot name the lesion." },
          {
            type: "table",
            headers: ["View", "You are looking at", "Boards use"],
            rows: [
              ["PLAX", "LV, AV, MV, LA, RVOT", "AS, AR, SAM, effusion, vegetation"],
              ["PSAX", "LV short axis, RV", "WMA map, D-sign of RV pressure"],
              ["A4C", "All four chambers, MV, TV", "MR, TR, ASD, function, apex"],
              ["A2C / A3C", "Anterior/inferior; AV long", "Walls, AR jet, SAM"],
              ["Subcostal", "IAS, IVC", "ASD, tamponade, RAP estimate"],
            ],
          },
          { type: "echo", id: "echo-normal-a4c", caption: "Normal A4C. Apex at the top. LV on the left of the sector in this schematic." },
          { type: "echo", id: "echo-normal-plax", caption: "Normal PLAX. RVOT nearest the probe, then IVS, LV, PW, descending aorta behind LA." },
        ],
      },
    ],
    quiz: [
      {
        id: "ew-q1",
        prompt: "Best window to show a secundum ASD?",
        echoId: "echo-asd",
        ask: "dx",
        choices: ["PLAX only", "Subcostal / A4C of the septum", "Suprasternal", "PSAX of the apex"],
        answer: 1,
        explain: "IAS is en face in subcostal; A4C shows dropout. PLAX does not show the IAS well.",
        topic: "Echo",
      },
    ],
  }),
  M({
    id: "echo-function",
    n: "17",
    track: "echo",
    title: "Systole, walls, diastole",
    dek: "EF, 17-segment map, and the diastolic algorithm.",
    minutes: 14,
    echoId: "echo-hfref",
    sections: [
      {
        id: "ef",
        title: "Pump and walls",
        blocks: [
          { type: "hy", text: "Visual EF is a starting point. Simpsons biplane is the number. Global longitudinal strain < −16% is subclinical dysfunction (chemo, amyloid)." },
          { type: "echo", id: "echo-hfref", caption: "Dilated LV, global hypokinesis, functional MR. This is HFrEF." },
          { type: "echo", id: "echo-anterior-akinesis", caption: "Apical/septal akinesis. That is an LAD territory until you have a better story." },
          {
            type: "table",
            headers: ["Finding", "Territory"],
            rows: [
              ["Anterior / septal / apex", "LAD"],
              ["Inferior", "RCA (usually)"],
              ["Lateral", "LCx"],
              ["Global", "Cardiomyopathy, not a single plaque"],
            ],
          },
        ],
      },
      {
        id: "dd",
        title: "Diastolic function in one algorithm",
        blocks: [
          {
            type: "ul",
            items: [
              "Start with mitral E/A, e', E/e', TR velocity, LA volume.",
              "E/A ≤ 0.8 and E ≤ 50: grade I (impaired relaxation).",
              "E/A ≥ 2: grade III (restrictive) — high filling pressure.",
              "In between: use E/e' >14, TR >2.8 m/s, LAVI >34 to call elevated pressure.",
            ],
          },
          { type: "trap", text: "Do not grade diastole in AF, mitral stenosis, or a rapid heart rate without saying so. The algorithm assumes sinus and no MS." },
        ],
      },
    ],
    quiz: [
      {
        id: "ef-q1",
        prompt: "Apical ballooning with spared base after a stressor. EF 30%. Coronaries open.",
        echoId: "echo-takotsubo",
        ask: "dx",
        choices: ["Anterior STEMI", "Takotsubo", "HCM", "Amyloid"],
        answer: 1,
        explain: "Apical ballooning, open arteries, trigger = takotsubo.",
        topic: "Echo",
      },
    ],
  }),
  M({
    id: "echo-valves",
    n: "18",
    track: "echo",
    title: "Valves on echo",
    dek: "AS, AR, MS, MR — severity and the next procedure.",
    minutes: 16,
    echoId: "echo-as-severe",
    sections: [
      {
        id: "left",
        title: "Left-sided valves",
        blocks: [
          {
            type: "table",
            headers: ["Lesion", "Severe when", "Next"],
            rows: [
              ["AS", "Vmax ≥4 m/s, mean ≥40, AVA ≤1.0 (≤0.6 indexed)", "TAVR vs SAVR by age/risk/anatomy"],
              ["AR", "VC >6 mm, EROA ≥0.3, regurg fraction ≥50%", "Surgery if symptomatic or LVEF ≤55%"],
              ["MS", "MVA ≤1.5, PHT ≥150, mean gradient high", "PMBC if favorable, else MVR"],
              ["Primary MR", "EROA ≥0.4, regurg volume ≥60", "Repair if possible (degenerative)"],
              ["Secondary MR", "EROA ≥0.2 still matters", "GDMT first; TEER if COAPT criteria"],
            ],
          },
          { type: "echo", id: "echo-as-severe", caption: "Thick, barely opening aortic cusps. LV is hypertrophied and small." },
          { type: "echo", id: "echo-mr-severe", caption: "Wide MR jet into a large LA. Grade the EROA, not the color alone." },
          { type: "echo", id: "echo-ms", caption: "Doming rheumatic mitral leaflets. LA is large. Gradient lives in diastole." },
          { type: "echo", id: "echo-ar", caption: "AR jet into a dilated LV. Chronic AR grows the ventricle before symptoms." },
          { type: "hy", text: "Low-flow low-gradient AS: AVA ≤1.0, Vmax <4, SVI ≤35. Dobutamine echo (classic LF) or calcium score (paradoxical LF/HG with HFpEF)." },
        ],
      },
    ],
    quiz: [
      {
        id: "ev-q1",
        prompt: "Asymptomatic AS, Vmax 4.3 m/s, EF 62%. Next?",
        echoId: "echo-as-severe",
        ask: "next",
        choices: ["Immediate TAVR", "Exercise testing / close follow-up", "Balloon valvuloplasty", "Start milrinone"],
        answer: 1,
        explain: "Severe asymptomatic AS: watch or exercise-test. Intervene for symptoms, EF drop, or very severe + low risk.",
        topic: "Valves",
      },
    ],
  }),
  M({
    id: "echo-cm",
    n: "19",
    track: "echo",
    title: "Cardiomyopathy on echo",
    dek: "HCM, amyloid, takotsubo, myocarditis, ARVC.",
    minutes: 14,
    echoId: "echo-hcm",
    sections: [
      {
        id: "cm",
        title: "Thick, thin, ballooned",
        blocks: [
          { type: "echo", id: "echo-hcm", caption: "ASH plus SAM. The septum kisses the mitral leaflet in the LVOT." },
          { type: "echo", id: "echo-amyloid", caption: "Small, thick, biatrial, low stroke volume. Strain: apical sparing." },
          { type: "echo", id: "echo-takotsubo", caption: "Apex balloons, base squeezes. Not a single coronary." },
          {
            type: "table",
            headers: ["CM", "Echo", "Do not confuse with"],
            rows: [
              ["HCM", "ASH ≥15 mm, SAM, dagger Doppler", "Athlete (wall <13–15, cavity large)"],
              ["Amyloid", "Thick + small + low voltage on ECG", "Hypertensive LVH"],
              ["Takotsubo", "Apical balloon, open coronaries", "LAD infarct (wraps the apex too — still cath)"],
              ["ARVC", "RV dilated, akinetic RV free wall", "Athlete RV"],
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "ec-q1",
        prompt: "Thick septum, SAM, dagger-shaped LVOT Doppler. First drug?",
        echoId: "echo-hcm",
        ask: "next",
        choices: ["Dobutamine", "Beta-blocker", "Nitroprusside", "Digoxin"],
        answer: 1,
        explain: "Obstructive HCM: beta-blocker (or non-DHP CCB). Avoid vasodilators and inotropes.",
        topic: "HCM",
      },
    ],
  }),
  M({
    id: "echo-peri-shunt",
    n: "20",
    track: "echo",
    title: "Pericardium, infection, shunts",
    dek: "Tamponade, vegetation, ASD/VSD.",
    minutes: 12,
    echoId: "echo-tamponade",
    sections: [
      {
        id: "p",
        title: "Fluid, bugs, holes",
        blocks: [
          { type: "echo", id: "echo-tamponade", caption: "Large effusion. RVOT collapse in diastole is tamponade physiology." },
          { type: "echo", id: "echo-veg-mv", caption: "Oscillating mass on the mitral leaflet. Treat as endocarditis until proven otherwise." },
          { type: "echo", id: "echo-asd", caption: "IAS dropout. Right heart volume load." },
          { type: "echo", id: "echo-vsd", caption: "Muscular VSD. The jet is left-to-right until Eisenmenger reverses it." },
          { type: "echo", id: "echo-ph", caption: "D-sign: the septum flattens in systole from RV pressure overload." },
          { type: "remember", text: "Tamponade is clinical. Echo shows the fluid and the collapse. Equalization on cath is confirmatory, not the first test." },
        ],
      },
    ],
    quiz: [
      {
        id: "ep-q1",
        prompt: "Fever, new MR, oscillating mass on the mitral valve. Next?",
        echoId: "echo-veg-mv",
        ask: "next",
        choices: ["Discharge on NSAIDs", "Blood cultures then antibiotics", "Immediate TAVR", "Stress echo"],
        answer: 1,
        explain: "Duke: cultures before antibiotics when possible, then treat. TEE if TTE negative and suspicion high.",
        topic: "Endocarditis",
      },
    ],
  }),
  M({
    id: "angio-anatomy",
    n: "21",
    track: "angio",
    title: "Coronary anatomy and views",
    dek: "LM, LAD, LCx, RCA, and the camera angles that unmask them.",
    minutes: 12,
    angioId: "angio-lca-normal",
    sections: [
      {
        id: "a",
        title: "The tree",
        blocks: [
          {
            type: "table",
            headers: ["View", "Best for"],
            rows: [
              ["RAO cranial", "LAD, diagonals"],
              ["LAO caudal (spider)", "LM bifurcation, LCx"],
              ["RAO caudal", "LCx, OM"],
              ["LAO / RAO of RCA", "RCA, crux, PDA"],
            ],
          },
          { type: "angio", id: "angio-lca-normal", caption: "Left coronary, no stenosis. TIMI 3." },
          { type: "angio", id: "angio-rca-normal", caption: "Right coronary to the crux." },
          { type: "hy", text: "Dominance is who makes the PDA. ~85% right-dominant. It changes the inferior-wall culprit." },
        ],
      },
    ],
    quiz: [
      {
        id: "aa-q1",
        prompt: "Anterior STEMI. Which vessel is the usual culprit?",
        angioId: "angio-lad-prox",
        ask: "dx",
        choices: ["RCA", "Proximal LAD", "PDA", "OM1"],
        answer: 1,
        explain: "Anterior wall is LAD.",
        topic: "Angio",
      },
    ],
  }),
  M({
    id: "angio-culprit",
    n: "22",
    track: "angio",
    title: "Culprits and high-risk anatomy",
    dek: "STEMI vessels, left main, 3VD, and who goes to surgery.",
    minutes: 14,
    angioId: "angio-lad-prox",
    sections: [
      {
        id: "c",
        title: "Who goes where",
        blocks: [
          { type: "angio", id: "angio-lad-prox", caption: "Proximal LAD 99%. Anterior STEMI. Primary PCI." },
          { type: "angio", id: "angio-rca-ostial", caption: "RCA occlusion. Inferior STEMI. Watch the RV and bradycardia." },
          { type: "angio", id: "angio-lcx", caption: "LCx disease. Lateral/posterior. Easy to miss on the ECG." },
          { type: "angio", id: "angio-lm", caption: "Distal left main. Heart-team anatomy, not a casual stent." },
          { type: "angio", id: "angio-3vd", caption: "Three-vessel disease. SYNTAX and diabetes push toward CABG." },
          {
            type: "next",
            text: "STEMI: door-to-balloon. Shock + LM or 3VD: PCI of the culprit, then complete later or CABG if anatomy fits. Stable 3VD/diabetes: CABG reduces events.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "ac-q1",
        prompt: "Diabetes, 3VD, stable angina, SYNTAX high. Preferred revascularization?",
        angioId: "angio-3vd",
        ask: "next",
        choices: ["Medical therapy only", "PCI of the easiest lesion", "CABG", "Thrombolysis"],
        answer: 2,
        explain: "FREEDOM / SYNTAX: CABG for diabetic 3VD.",
        topic: "Angio",
      },
    ],
  }),
  M({
    id: "hemo-lab",
    n: "23",
    track: "angio",
    title: "Hemodynamics",
    dek: "AS gradient, MS, tamponade equalization, constriction discordance, HOCM.",
    minutes: 14,
    hemoId: "hemo-as",
    sections: [
      {
        id: "h",
        title: "The tracings",
        blocks: [
          { type: "hemo", id: "hemo-as", caption: "LV 210, aorta 108. Severe AS." },
          { type: "hemo", id: "hemo-ms", caption: "LA stays above LV in diastole. Mitral stenosis." },
          { type: "hemo", id: "hemo-tamponade", caption: "Diastolic equalization. Tamponade." },
          { type: "hemo", id: "hemo-constriction", caption: "LV/RV discordance. Constriction, not restriction." },
          { type: "hemo", id: "hemo-hocm", caption: "Post-PVC: LV up, aortic pulse down. Brockenbrough." },
          { type: "hemo", id: "hemo-mr", caption: "Giant V waves. Severe MR lives in systole." },
          { type: "hemo", id: "hemo-ph", caption: "PA 78/32. Next number is PCWP so you do not start a vasodilator on group 2." },
          {
            type: "table",
            headers: ["Pattern", "Hallmark"],
            rows: [
              ["AS", "LV ≫ AO systolic"],
              ["MS", "LA ≫ LV diastolic"],
              ["Tamponade", "Equalization, absent y"],
              ["Constriction", "Discordance + square root"],
              ["Restriction", "Concordance"],
              ["HOCM", "Dynamic gradient, Brockenbrough"],
              ["Severe MR", "Giant V waves"],
              ["PH", "PA mean >20; PCWP sorts group 1 vs 2"],
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "hh-q1",
        prompt: "Post-PVC beat: LV systolic rises, aortic pulse pressure falls. Diagnosis?",
        hemoId: "hemo-hocm",
        ask: "dx",
        choices: ["Fixed AS", "HOCM", "MR only", "Tamponade"],
        answer: 1,
        explain: "Brockenbrough–Braunwald–Morrow sign of dynamic obstruction.",
        topic: "Hemodynamics",
      },
    ],
  }),
  M({
    id: "hf-gdmt",
    n: "24",
    track: "clinical",
    title: "Heart failure",
    dek: "HFrEF GDMT, HFpEF, congestion, and when to implant.",
    minutes: 16,
    echoId: "echo-hfref",
    sections: [
      {
        id: "hf",
        title: "Four pillars, then devices",
        blocks: [
          { type: "remember", text: "HFrEF: ARNI (or ACE/ARB), evidence-based beta-blocker, MRA, SGLT2. Start them all. Do not wait for 'one at a time' unless the blood pressure forces you to." },
          {
            type: "table",
            headers: ["Situation", "Add"],
            rows: [
              ["NYHA II–III, GDMT, EF ≤35%, QRS ≥150 LBBB", "CRT-D"],
              ["EF ≤35%, NYHA II–III, ≥40 days post MI", "ICD for primary prevention"],
              ["HFpEF", "SGLT2, treat congestion and the cause (HTN, AF, CAD)"],
              ["Cold and wet", "Inotrope / MCS — this is shock, not a diuretic-only problem"],
            ],
          },
          { type: "hy", text: "ARNI needs 36 h off an ACE. Do not combine ACE + ARB + MRA without watching K. Hydralazine/nitrate still matters in self-identified Black patients on GDMT." },
        ],
      },
    ],
    quiz: [
      {
        id: "hf-q1",
        prompt: "HFrEF 28%, NYHA II, eGFR 62, K 4.2. Which is not one of the four pillars?",
        ask: "next",
        choices: ["ARNI", "Carvedilol", "Spironolactone", "Amlodipine"],
        answer: 3,
        explain: "Amlodipine is not GDMT for HFrEF. SGLT2 is the fourth pillar.",
        topic: "Heart failure",
      },
    ],
  }),
  M({
    id: "shock",
    n: "25",
    track: "clinical",
    title: "Shock and MCS",
    dek: "SCAI stages, pressors, IABP, Impella, VA-ECMO.",
    minutes: 12,
    echoId: "echo-hfref",
    sections: [
      {
        id: "s",
        title: "Cold, wet, now",
        blocks: [
          { type: "ul", items: [
            "SCAI A–E. C is classic cardiogenic shock (hypoperfusion).",
            "Norepinephrine first for pressure. Dobutamine or milrinone for a cold pump if pressure allows.",
            "IABP: afterload down, coronary diastolic up — weak as standalone shock therapy (IABP-SHOCK II).",
            "Impella: unloads LV. Watch hemolysis and limb ischemia.",
            "VA-ECMO: flow and gas exchange. The LV may still distend — often needs an unload.",
          ]},
          { type: "trap", text: "Mechanical complication of MI (VSD, papillary rupture) is a surgical / structural emergency. An Impella does not fix a torn papillary muscle." },
        ],
      },
    ],
    quiz: [
      {
        id: "sh-q1",
        prompt: "Day 3 anterior MI, new harsh murmur, shock. First structural diagnosis to exclude?",
        ask: "dx",
        choices: ["Tamponade only", "VSR or papillary rupture", "HOCM", "Aortic dissection only"],
        answer: 1,
        explain: "Post-MI VSR or acute MR from papillary rupture. Echo now. Surgery.",
        topic: "Shock",
      },
    ],
  }),
  M({
    id: "prevention",
    n: "26",
    track: "clinical",
    title: "Prevention and chronic CAD",
    dek: "Lipids, diabetes, antiplatelets, and who gets a stent when stable.",
    minutes: 12,
    angioId: "angio-3vd",
    sections: [
      {
        id: "p",
        title: "The boring drugs that win",
        blocks: [
          { type: "hy", text: "High-intensity statin for clinical ASCVD. Add ezetimibe, then PCSK9, if LDL stays above goal. 2025 ACS: high-intensity statin in-hospital." },
          { type: "ul", items: [
            "DAPT after PCI: typically 6–12 months, shorter if high bleed risk, longer if high ischemic risk.",
            "Stable CAD + FFR >0.80: medical therapy (FAME / ISCHEMIA).",
            "SGLT2 and GLP-1 reduce events in diabetes with ASCVD, independent of the A1c theater.",
            "BP target ~130/80 in most with CAD.",
          ]},
        ],
      },
    ],
    quiz: [
      {
        id: "pr-q1",
        prompt: "Stable angina, FFR 0.86 in a moderate LAD stenosis. Next?",
        angioId: "angio-lad-prox",
        ask: "next",
        choices: ["Stent now", "Optimal medical therapy", "CABG", "Lytic"],
        answer: 1,
        explain: "FFR >0.80 is medically treated. ISCHEMIA: routine PCI does not prevent death in stable CAD.",
        topic: "Prevention",
      },
    ],
  }),
  M({
    id: "aorta-vascular",
    n: "27",
    track: "clinical",
    title: "Aorta and vascular",
    dek: "Type A/B dissection, aneurysm thresholds, PAD, carotid.",
    minutes: 14,
    tracingId: "stemi-inferior",
    sections: [
      {
        id: "v",
        title: "Tubes that rupture",
        blocks: [
          { type: "remember", text: "Type A (involves the ascending): OR now. Type B: medical unless malperfusion, rupture, or refractory pain — then TEVAR." },
          {
            type: "table",
            headers: ["Lesion", "Threshold / move"],
            rows: [
              ["Ascending aneurysm", "Surgery ~5.5 cm; 5.0 if BAV/growth/family; smaller in heritable"],
              ["AAA", "Repair ≥5.5 cm men, ≥5.0 women, or growth >0.5/6 mo"],
              ["PAD claudication", "Exercise + high-intensity statin + antiplatelet; revasc if lifestyle-limiting"],
              ["Carotid stenosis", "CEA/CAS for symptomatic ≥70% (selected 50–69%); asymptomatic is nuanced"],
            ],
          },
          { type: "trap", text: "Chest pain plus a new AR murmur plus unequal pulses is type A until CTA/TEE says no. Do not anticoagulate as ACS first." },
        ],
      },
    ],
    quiz: [
      {
        id: "ao-q1",
        prompt: "Tearing chest pain, 40 mmHg arm BP difference, new AR. Next imaging if unstable in the OR?",
        ask: "next",
        choices: ["Treadmill", "TEE in the OR / CTA if stable", "Coronary calcium score", "V/Q scan"],
        answer: 1,
        explain: "Type A: get them to surgery. TEE if too unstable for CTA.",
        topic: "Aorta",
      },
    ],
  }),
  M({
    id: "htn-ph",
    n: "28",
    track: "clinical",
    title: "Hypertension and pulmonary hypertension",
    dek: "Emergency vs urgency, secondary HTN, WHO PH groups.",
    minutes: 12,
    echoId: "echo-ph",
    sections: [
      {
        id: "h",
        title: "Two circulations",
        blocks: [
          { type: "p", text: "Hypertensive emergency: severe BP plus end-organ damage (encephalopathy, ACS, pulmonary edema, dissection, AKI, eclampsia). Drop MAP ~25% in the first hour with an IV agent — not a huge nifedipine dump." },
          { type: "echo", id: "echo-ph", caption: "D-sign. The RV is pressurizing the septum." },
          {
            type: "table",
            headers: ["WHO group", "Think", "Treat the"],
            rows: [
              ["1 PAH", "Idiopathic, connective tissue, CHD", "Pulmonary vasodilators"],
              ["2", "Left heart", "The left heart — vasodilators can drown them"],
              ["3", "Lung / hypoxia", "O2 and the lung"],
              ["4 CTEPH", "Chronic PE", "Anticoagulate; PEA surgery if operable"],
              ["5", "Multifactorial", "The cause"],
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "ph-q1",
        prompt: "HFpEF, PASP 55 on echo, PCWP 22 on cath. PH group?",
        ask: "dx",
        choices: ["1 PAH", "2 left-heart", "3 lung", "4 CTEPH"],
        answer: 1,
        explain: "Post-capillary PH is group 2. Do not start epoprostenol.",
        topic: "PH",
      },
    ],
  }),
  M({
    id: "af-clinical",
    n: "29",
    track: "clinical",
    title: "AF, stroke, devices",
    dek: "Anticoagulation, rate vs rhythm, ablation, CIEDs.",
    minutes: 12,
    tracingId: "afib",
    sections: [
      {
        id: "af",
        title: "The three decisions",
        blocks: [
          { type: "ul", items: [
            "Stroke: CHA2DS2-VASc. Anticoagulate ≥2 (men) / ≥3 (women). DOAC over warfarin unless mechanical valve or mitral stenosis.",
            "Rate: rest <80 if strict; <110 if lenient and EF preserved.",
            "Rhythm: EAST-AFNET 4 — early rhythm control in selected. Ablation first-line in HFrEF with AF (CASTLE-AF / RAFT-AF signal).",
          ]},
          { type: "hy", text: "Do not anticoagulate MAT. Do not cardiovert AF >48 h without TEE or 3 weeks of OAC unless unstable." },
        ],
      },
    ],
    quiz: [
      {
        id: "af-q1",
        prompt: "68-year-old woman with HTN and AF. CHA2DS2-VASc is 3. Anticoagulate?",
        ask: "next",
        choices: ["Aspirin only", "DOAC", "No antithrombotic", "Triple therapy forever"],
        answer: 1,
        explain: "Score 3 in a woman = OAC.",
        topic: "AF",
      },
    ],
  }),
  M({
    id: "achd-preg-onc",
    n: "30",
    track: "clinical",
    title: "ACHD, pregnancy, cardio-oncology",
    dek: "Fontan, Eisenmenger, peripartum, anthracyclines.",
    minutes: 14,
    echoId: "echo-asd",
    sections: [
      {
        id: "a",
        title: "Special populations",
        blocks: [
          {
            type: "table",
            headers: ["Topic", "Board move"],
            rows: [
              ["ASD with Qp/Qs ≥1.5 and RV volume load", "Close if PVR not Eisenmenger"],
              ["Eisenmenger", "Do not close the shunt; pulmonary vasodilators; avoid pregnancy"],
              ["Fontan", "Atrial arrhythmias, liver, thrombosis — expert ACHD"],
              ["mWHO IV pregnancy (Eisenmenger, severe MS, EF <30, aortopathy huge)", "Advise against pregnancy"],
              ["Anthracycline", "Echo/GLS surveillance; hold if EF drops; dexrazoxane in selected"],
              ["Iodine contrast + ICIs", "Myocarditis can present as CHB — that is a crash"],
            ],
          },
          { type: "remember", text: "The highest-yield ACHD ECG you already own: ASD = rsR' + RAD. The highest-yield pregnancy valve: severe MS decompensates in the second trimester." },
        ],
      },
    ],
    quiz: [
      {
        id: "achd-q1",
        prompt: "Cyanotic adult, unrepaired VSD, PR 0.7 systemic. Close the VSD?",
        ask: "next",
        choices: ["Yes, percutaneous now", "No — Eisenmenger physiology", "Only if Qp/Qs >2", "Balloon the pulmonary valve first always"],
        answer: 1,
        explain: "Shunt closure in Eisenmenger kills the pop-off. Treat PAH, not the hole.",
        topic: "ACHD",
      },
    ],
  }),
  M({
    id: "peri-op",
    n: "31",
    track: "clinical",
    title: "Perioperative and guidelines wrap",
    dek: "RCRI, when to wait after stent, and the last high-yield pile.",
    minutes: 10,
    tracingId: "brady-1avb",
    sections: [
      {
        id: "p",
        title: "Before the OR",
        blocks: [
          { type: "ul", items: [
            "RCRI: high-risk surgery, CAD, HF, CVA, creatinine >2, insulin. ≥2 is elevated risk.",
            "Do not routine-stress intermediate-risk patients who can climb 4 METs.",
            "BMS: delay elective surgery 1 month. DES: 6 months (3 if urgent and DAPT risk is real).",
            "Continue beta-blocker if already on it. Do not start one the night before (POISE).",
            "The tracing that started this course still does not get a pacemaker for surgery.",
          ]},
        ],
      },
    ],
    quiz: [
      {
        id: "po-q1",
        prompt: "Elective hip, DES 8 weeks ago, on DAPT, 4 METs. Surgery timing?",
        ask: "next",
        choices: ["Operate tomorrow off DAPT", "Delay to ~6 months if truly elective", "Bridge with lytic", "Place an ICD first"],
        answer: 1,
        explain: "Elective surgery after DES: wait 6 months when you can.",
        topic: "Perioperative",
      },
    ],
  }),
];
