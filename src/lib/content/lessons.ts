import type { Lesson, LessonChapter } from "./types";
import { lessonFromModule } from "./teach";

export type { Lesson, LessonChapter };

export const LESSONS: Lesson[] = [
  {
    id: "before",
    title: "Before the unknown",
    dek: "A spoken walk through the tracing that started this course — sinus bradycardia with first-degree AV block.",
    minutes: 11,
    tracingId: "brady-1avb",
    nextHref: "/cases/c01",
    nextLabel: "Now read the unknown",
    chapters: [
      {
        id: "open",
        title: "Before you name it",
        script: `This is the lecture you hear before you sit the unknown. [pause]
The tracing on the screen is a seventy-nine-year-old woman from pre-op. Heart rate forty-eight. Blood pressure is fine. She is not dizzy. The machine has already printed a sentence on the right margin. [pause]
Do not obey it yet. Boards do not reward gestalt. They reward a sequence you can defend out loud. Paper. Rate. Rhythm. Axis. Intervals. Chamber. Ischemia. Then one sentence a consultant could sign. [pause]
The computer is often right about intervals and often wrong about ischemia. Today it will turn out to be right. That is not a reason to skip the steps. Trust is earned per tracing, not per vendor. [pause]
Look at the grid first. Twenty-five millimeters a second. Ten millimeters a millivolt. If those are wrong, every number after this is theater.`,
      },
      {
        id: "rate",
        title: "Rate",
        script: `Rate before rhythm. [pause]
At twenty-five millimeters a second, each large box is two hundred milliseconds. For a regular tracing, three hundred divided by the large boxes between R waves. Three hundred, one-fifty, one hundred, seventy-five, sixty, fifty, forty-three. [pause]
Here the R-to-R is about twelve hundred and fifty milliseconds. Sixty thousand divided by twelve forty-eight is forty-eight beats a minute. The printed rate and the boxes agree. If they ever fight, believe the boxes. [pause]
Bradycardia is not a diagnosis. It is a rate. Sinus bradycardia, junctional escape, and complete heart block can share a pulse of forty-eight and share nothing else. The P-wave map decides, not the number on the monitor. [pause]
She is forty-eight and regular. Now we ask who is driving.`,
      },
      {
        id: "rhythm",
        title: "Rhythm",
        script: `Are there P waves? Yes. Upright in lead two, inverted in A V R. That is a sinus P. [pause]
Is every P married to a QRS, and every QRS to a P? Yes. One P, one QRS, always. The P-R does not creep. Nothing drops. This is not Wenckebach. This is not Mobitz two. This is not complete block. Complete block is two clocks. You would count an atrial rate and a slower ventricular rate that refuse to hold hands. [pause]
Is it junctional? Junctional escape has no sinus P in front of the QRS, or a retrograde P glued to the back. This P stands in front, sinus-shaped, every time. [pause]
So the rhythm name is sinus bradycardia. Slow, sinus, 1 to 1. We have not finished. There is a clause.`,
      },
      {
        id: "pr",
        title: "The long P-R",
        script: `Intervals. [pause]
The P-R is two hundred and thirty-two milliseconds. Normal is one-twenty to two hundred. Above two hundred, with every P still conducting, is first-degree A V block. [pause]
Hear the grammar. First-degree is not a rhythm. It is a clause you attach to a rhythm. You do not say first-degree A V block and sit down. You say sinus bradycardia with first-degree A V block. Two findings. One sentence. [pause]
The QRS is eighty-four milliseconds. Narrow. So the delay is almost certainly in the A V node, not the His-Purkinje system. A wide QRS with a long P-R makes you think below the node. This one is quiet. [pause]
Q T is four hundred and seventeen. Q T c is about three hundred and seventy. That is not long. You will not talk about torsades on this paper. [pause]
Causes of a long P-R in a seventy-nine-year-old: high vagal tone, a beta blocker, diltiazem or verapamil, digoxin, amiodarone, an aging node, inferior ischemia, Lyme in the right season. The tracing cannot name the pill. The chart can.`,
      },
      {
        id: "rest",
        title: "Otherwise normal",
        script: `Axis is plus thirty-seven. Lead one positive, A V F positive. Normal. [pause]
No tall R and deep S that would make you say left ventricular hypertrophy. No strain. R-wave progression is ordinary. ST segments are not elevated in a territory and not depressed in a reciprocal. T waves are not Wellens, not de Winter, not tented from potassium. [pause]
That is what the machine meant by otherwise normal. For once, agree. [pause]
What this is not, because the boards will offer you the trap. It is not complete heart block. The P and the QRS are married. It is not Mobitz two. Nothing drops. It is not a junctional escape. There is a sinus P in front. It is not a pacing indication. Isolated first-degree A V block with a narrow QRS and no symptoms does not get a generator. [pause]
A marked P-R over three hundred milliseconds that causes cannon waves is the rare exception. Two hundred and thirty-two is not that tracing.`,
      },
      {
        id: "sentence",
        title: "The sentence",
        script: `Say it in one breath. [pause]
Sinus bradycardia at forty-eight, with first-degree A V block, P-R two hundred and thirty-two milliseconds. Normal QRS, normal axis, normal repolarization. No acute ischemia. [pause]
If you cannot say it in one breath, you are not done looking. [pause]
Then the question the paper cannot answer. What is she taking. Is this her rate at home. Does she sleep. Has the node been ischemic. You review the medication list. You do not call the electrophysiologist for this strip alone. You do not cancel the operation for a P-R of two thirty-two. [pause]
That is the whole unknown. When the lecture ends, open case one, hide this sentence, and do the steps yourself. The computer was right. You should be able to be right without it.`,
      },
    ],
  },
  {
    id: "method",
    title: "The eight steps",
    dek: "The sequence you use on every board ECG, including the slow one with a long P-R.",
    minutes: 8,
    tracingId: "brady-1avb",
    nextHref: "/method",
    nextLabel: "Open the method notes",
    chapters: [
      {
        id: "m1",
        title: "Paper, rate, rhythm",
        script: `Every board ECG is a document. Confirm twenty-five millimeters a second, ten millimeters a millivolt, and a real calibration pulse. A high-pass filter at half a hertz can fake ST depression. Lead reversal inverts lead one and stands A V R up. Check V leads to tell reversal from dextrocardia. [pause]
Rate: three hundred over large boxes if regular. QRS count in ten seconds times six if irregular. Bradycardia is a rate, not a name. [pause]
Rhythm: P waves first. Sinus P, upright in one, two, and A V F. Every P married to a QRS? P-R constant? Regular, regularly irregular, or irregularly irregular? Name sinus, then atrial, then junctional, then ventricular, then add the conduction clause.`,
      },
      {
        id: "m2",
        title: "Axis and intervals",
        script: `Lead one and A V F are enough. Both positive: normal. One positive, A V F negative: look at lead two. If two is still positive, the axis is still normal. If two is negative, that is left axis. One negative and A V F positive is right axis. Both negative is extreme. [pause]
P-R one-twenty to two hundred. Short with a delta is pre-excitation. Long with 1 to 1 is first-degree. QRS under one-twenty is narrow. At one-twenty and typical morphology you are in bundle territory. Q T c over five hundred is a torsades number. Measure in lead two or V five. Report Q T and Q T c.`,
      },
      {
        id: "m3",
        title: "Chamber and ischemia",
        script: `Voltage, then strain. Sokolow. Cornell. Strain is ST depression and T inversion in the lateral leads, discordant to a tall R. Voltage without strain in a young athlete is often a normal heart. [pause]
Ischemia is territory plus reciprocity. Anterior V two to V four is L A D. Inferior two, three, A V F is usually the right coronary, especially if three is taller than two. Isolated depression in V one to V three may be posterior. Record V seven to V nine. [pause]
Equivalents: Wellens, de Winter, concordant ST elevation in left bundle. Hyperacute T waves are fat, not tented. Tented is potassium until you prove otherwise.`,
      },
      {
        id: "m4",
        title: "One sentence",
        script: `Write the ECG the way the boards want it. Rate, rhythm, conduction, then the lesion. [pause]
Example. Sinus bradycardia at forty-eight with first-degree A V block. Normal QRS, axis, and repolarization. No acute ischemia. [pause]
Then ask what the tracing cannot answer. Pills, sleep, ischemia, Lyme, the athlete who is only slow at night. The paper is the start of the note, not the end. If the sentence will not fit in one breath, look again.`,
      },
    ],
  },
];

export function getLesson(id: string) {
  return LESSONS.find((l) => l.id === id) ?? lessonFromModule(id);
}
