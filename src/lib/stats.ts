import { MODULES } from "./content/modules";
import { CASES } from "./content/cases";
import { QUESTIONS } from "./content/questions";
import { FLASHCARDS } from "./content/flashcards";
import { LESSONS } from "./content/lessons";
import { useProgress } from "./progress";

export function useStats() {
  const p = useProgress();
  const modulesDone = MODULES.filter((m) => {
    const quiz = p.modules[m.id]?.quiz ?? {};
    return m.quiz.every((q) => quiz[q.id]?.correct);
  }).length;
  const casesDone = CASES.filter((c) => p.cases[c.id]?.revealed).length;
  const boardAnswered = Object.keys(p.boards).length;
  const boardCorrect = Object.values(p.boards).filter((x) => x.correct).length;
  const flashKnow = Object.values(p.flash).filter((x) => x === "know").length;
  const examCorrect = Object.values(p.exam.answers).filter((x) => x.correct).length;
  const examN = Object.keys(p.exam.answers).length;
  const lessonsDone = LESSONS.filter((l) => p.lessons?.[l.id]?.done).length;
  const steps = (p.methodDone ? 1 : 0) + lessonsDone + modulesDone + casesDone;
  const total = 1 + LESSONS.length + MODULES.length + CASES.length;
  return {
    modulesDone,
    modulesTotal: MODULES.length,
    casesDone,
    casesTotal: CASES.length,
    boardAnswered,
    boardCorrect,
    boardTotal: QUESTIONS.length,
    flashKnow,
    flashTotal: FLASHCARDS.length,
    examCorrect,
    examN,
    methodDone: p.methodDone,
    lessonsDone,
    pct: Math.round((steps / total) * 100),
  };
}
