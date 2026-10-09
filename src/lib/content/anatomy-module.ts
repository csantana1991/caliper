import type { Module, Teach } from "./types";

export const ANATOMY_MODULE: Module = {
  id: "cardiac-anatomy",
  n: "00",
  track: "angio",
  title: "Cardiac anatomy",
  dek: "Chambers, flow, coronaries, and the conduction path — then the clip.",
  minutes: 12,
  sections: [
    {
      id: "film",
      title: "Watch, then name",
      blocks: [
        { type: "anatomy" },
        {
          type: "remember",
          text: "Right heart goes to the lungs. Left heart goes to the body. The patient’s right is on your left in an anterior view.",
        },
        {
          type: "table",
          headers: ["Structure", "Job", "Board trap"],
          rows: [
            ["RA → TV → RV → PA", "Deoxygenated blood to the lungs", "The RV is the anterior chamber, not the left"],
            ["LA → MV → LV → aorta", "Oxygenated blood to the body", "The apex points to the patient’s left"],
            ["LAD", "Anterior wall, septum, apex", "Anterior STEMI is this artery"],
            ["LCx", "Lateral wall", "Posterior MI when it is the culprit you missed"],
            ["RCA", "Inferior wall in ~85%, and the RV", "III > II plus V1 elevation is proximal RCA"],
            ["SA node", "SVC–RA junction", "Sinus rhythm starts here"],
            ["AV node → His", "Only normal path from atria to ventricles", "Block here is a place, not a vibe"],
          ],
        },
      ],
    },
    {
      id: "flow",
      title: "One circuit",
      blocks: [
        {
          type: "p",
          text: "Body → vena cava → right atrium → tricuspid → right ventricle → pulmonary artery → lungs → pulmonary veins → left atrium → mitral → left ventricle → aorta → body. The pulmonary artery is the only artery that carries venous blood. The pulmonary veins are the only veins that carry arterial blood.",
        },
        {
          type: "hy",
          text: "Dominance is who gives off the PDA. Right-dominant (~85%) means the RCA supplies the inferior wall. Left-dominant means the circumflex does. That changes the inferior culprit.",
        },
        {
          type: "trap",
          text: "Do not call the front artery the RCA. The LAD runs in the anterior interventricular groove. The RCA runs in the right atrioventricular groove.",
        },
      ],
    },
  ],
  quiz: [
    {
      id: "ca-q1",
      prompt: "Which chamber pumps blood to the lungs?",
      ask: "dx",
      choices: ["Left atrium", "Left ventricle", "Right ventricle", "Right atrium"],
      answer: 2,
      explain: "RV → pulmonary artery → lungs. The right atrium only receives.",
      topic: "Anatomy",
    },
    {
      id: "ca-q2",
      prompt: "Anterior wall, septum, and apex. Usual artery?",
      ask: "dx",
      choices: ["RCA", "LAD", "PDA from a left-dominant LCx only", "Acute marginal"],
      answer: 1,
      explain: "LAD in the anterior interventricular groove.",
      topic: "Anatomy",
    },
    {
      id: "ca-q3",
      prompt: "The sinus node sits at the",
      ask: "dx",
      choices: ["Apex", "SVC–RA junction", "Left ventricular outflow", "Coronary sinus os only"],
      answer: 1,
      explain: "SA node at the SVC–RA junction. The AV node is at the septal floor of the right atrium.",
      topic: "Anatomy",
    },
  ],
};

export const TEACH_ANATOMY: Record<string, Teach> = {
  "cardiac-anatomy": {
    framework: [
      { text: "Right heart → lungs" },
      { text: "Left heart → body" },
      { text: "LAD front, RCA bottom, LCx side", tone: "warn" },
      { text: "SA node, then AV node, then His", tone: "ok" },
    ],
    remember: "Patient’s right is on your left. Right ventricle faces you. Apex points to the patient’s left.",
    path: "Two pumps in series. Lungs sit between them.",
    dx: "Name the chamber, then the artery, then the node. Walls belong to arteries.",
    tx: "Anterior ischemia is LAD. Inferior in a right-dominant heart is RCA. Block is a level: node or His.",
    drillTags: ["Anatomy", "Angio", "AV block"],
    quickTable: {
      headers: ["Name", "Where"],
      rows: [
        ["RV", "To the lungs"],
        ["LV", "To the body"],
        ["LAD", "Front, septum, apex"],
        ["RCA", "Inferior if right-dominant"],
      ],
    },
    lecture: [
      {
        id: "an0",
        title: "Two pumps",
        script: `Watch the clip, then put names on it. The blue side is the right heart. Blood from the body enters the right atrium, crosses the tricuspid valve, and the right ventricle sends it to the lungs through the pulmonary artery. [pause] The red side is the left heart. Pulmonary veins enter the left atrium, blood crosses the mitral valve, and the left ventricle sends it out the aorta. The pulmonary artery is the only artery carrying venous blood.`,
      },
      {
        id: "an1",
        title: "Arteries and wires",
        script: `In an anterior view the patient’s right is on your left. The left anterior descending artery runs down the front groove: anterior wall, septum, apex. The circumflex runs in the left groove: lateral wall. The right coronary runs the right groove and, in most people, the bottom of the heart. [pause] The sinus node sits where the superior vena cava meets the right atrium. The only normal road from atria to ventricles is the A V node, then the bundle of His, then the bundles. If you remember nothing else: right heart to the lungs, left heart to the body, L A D in front.`,
      },
    ],
  },
};
