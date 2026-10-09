import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AnswerRecord = {
  choice: number;
  correct: boolean;
  at: number;
};

type ProgressState = {
  methodDone: boolean;
  lessons: Record<string, { chapter: number; done: boolean }>;
  modules: Record<string, { section: number; quiz: Record<string, AnswerRecord> }>;
  cases: Record<string, { answers: Record<string, AnswerRecord>; revealed: boolean }>;
  boards: Record<string, AnswerRecord>;
  flash: Record<string, "know" | "again">;
  exam: { startedAt?: number; answers: Record<string, AnswerRecord>; submitted?: boolean };
  setMethodDone: () => void;
  markLesson: (id: string, chapter: number, done: boolean) => void;
  markModuleSection: (id: string, section: number) => void;
  answerModuleQuiz: (moduleId: string, qid: string, rec: AnswerRecord) => void;
  answerCase: (caseId: string, qid: string, rec: AnswerRecord) => void;
  revealCase: (caseId: string) => void;
  answerBoard: (qid: string, rec: AnswerRecord) => void;
  markFlash: (id: string, state: "know" | "again") => void;
  resetFlash: () => void;
  startExam: () => void;
  answerExam: (qid: string, rec: AnswerRecord) => void;
  submitExam: () => void;
  resetExam: () => void;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      methodDone: false,
      lessons: {},
      modules: {},
      cases: {},
      boards: {},
      flash: {},
      exam: { answers: {} },
      setMethodDone: () => set({ methodDone: true }),
      markLesson: (id, chapter, done) =>
        set((s) => {
          const prev = s.lessons ?? {};
          return {
            lessons: {
              ...prev,
              [id]: { chapter, done: done || Boolean(prev[id]?.done) },
            },
          };
        }),
      markModuleSection: (id, section) =>
        set((s) => ({
          modules: {
            ...s.modules,
            [id]: { section, quiz: s.modules[id]?.quiz ?? {} },
          },
        })),
      answerModuleQuiz: (moduleId, qid, rec) =>
        set((s) => {
          const prev = s.modules[moduleId] ?? { section: 0, quiz: {} };
          return {
            modules: {
              ...s.modules,
              [moduleId]: { ...prev, quiz: { ...prev.quiz, [qid]: rec } },
            },
          };
        }),
      answerCase: (caseId, qid, rec) =>
        set((s) => {
          const prev = s.cases[caseId] ?? { answers: {}, revealed: false };
          return {
            cases: {
              ...s.cases,
              [caseId]: { ...prev, answers: { ...prev.answers, [qid]: rec } },
            },
          };
        }),
      revealCase: (caseId) =>
        set((s) => {
          const prev = s.cases[caseId] ?? { answers: {}, revealed: false };
          return { cases: { ...s.cases, [caseId]: { ...prev, revealed: true } } };
        }),
      answerBoard: (qid, rec) =>
        set((s) => ({ boards: { ...s.boards, [qid]: rec } })),
      markFlash: (id, state) =>
        set((s) => ({ flash: { ...s.flash, [id]: state } })),
      resetFlash: () => set({ flash: {} }),
      startExam: () => set({ exam: { startedAt: Date.now(), answers: {}, submitted: false } }),
      answerExam: (qid, rec) =>
        set((s) => ({ exam: { ...s.exam, answers: { ...s.exam.answers, [qid]: rec } } })),
      submitExam: () => set((s) => ({ exam: { ...s.exam, submitted: true } })),
      resetExam: () => set({ exam: { answers: {} } }),
    }),
    { name: "caliper-progress" },
  ),
);
