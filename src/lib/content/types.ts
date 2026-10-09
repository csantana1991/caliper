export type Track = "ecg" | "echo" | "angio" | "scan" | "clinical";

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "pearl"; text: string }
  | { type: "trap"; text: string }
  | { type: "hy"; text: string }
  | { type: "remember"; text: string }
  | { type: "next"; text: string }
  | { type: "formula"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "tracing"; id: string; caption?: string }
  | { type: "echo"; id: string; caption?: string }
  | { type: "angio"; id: string; caption?: string }
  | { type: "hemo"; id: string; caption?: string }
  | { type: "nuclear"; id: string; caption?: string }
  | { type: "cmr"; id: string; caption?: string }
  | { type: "anatomy"; caption?: string };

export type Question = {
  id: string;
  prompt: string;
  tracingId?: string;
  echoId?: string;
  angioId?: string;
  hemoId?: string;
  nuclearId?: string;
  cmrId?: string;
  lead?: "II" | "V1" | "V2" | "V3";
  choices: string[];
  answer: number;
  explain: string;
  topic: string;
  pearls?: string[];
  ask?: "dx" | "next" | "mech";
};

export type Module = {
  id: string;
  n: string;
  title: string;
  dek: string;
  minutes: number;
  track?: Track;
  tracingId?: string;
  echoId?: string;
  angioId?: string;
  hemoId?: string;
  nuclearId?: string;
  cmrId?: string;
  sections: { id: string; title: string; blocks: Block[] }[];
  quiz: Question[];
};

export type CaseItem = {
  id: string;
  n: number;
  title: string;
  difficulty: "warm" | "boards" | "hot";
  stem: string;
  ageSex: string;
  setting: string;
  track?: Track;
  tracingId?: string;
  echoId?: string;
  angioId?: string;
  hemoId?: string;
  nuclearId?: string;
  cmrId?: string;
  vitals?: string;
  questions: Question[];
  diagnosis: string;
  computerRead?: string;
  debrief: string[];
  nextStep?: string;
};

export type Flashcard = {
  id: string;
  front: string;
  back: string;
  tag: string;
};

export type LessonChapter = {
  id: string;
  title: string;
  script: string;
};

export type Lesson = {
  id: string;
  title: string;
  dek: string;
  minutes: number;
  tracingId?: string;
  nextHref: string;
  nextLabel: string;
  chapters: LessonChapter[];
};

export type FrameworkNode = {
  text: string;
  tone?: "ink" | "ok" | "warn" | "danger";
};

export type Teach = {
  framework: FrameworkNode[];
  remember: string;
  path: string;
  dx: string;
  tx: string;
  quickTable: { headers: string[]; rows: string[][] };
  drillTags: string[];
  lecture: { id: string; title: string; script: string }[];
};
