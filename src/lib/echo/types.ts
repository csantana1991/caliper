export type EchoView = "a4c" | "plax" | "psax";
export type WallMotion = "normal" | "hypo" | "akinetic" | "aneurysm";
export type Grade = 0 | 1 | 2 | 3 | 4;

export type EchoStudy = {
  id: string;
  label: string;
  view: EchoView;
  ef: number;
  lvSize?: "normal" | "dilated" | "small";
  septum?: "normal" | "ash" | "infiltrate";
  walls?: Partial<Record<"septum" | "apex" | "lateral" | "inferior" | "anterior", WallMotion>>;
  mr?: Grade;
  ar?: Grade;
  as?: Grade;
  ms?: Grade;
  tr?: Grade;
  effusion?: "none" | "small" | "large";
  rvStrain?: boolean;
  sam?: boolean;
  vegetation?: "mv" | "av" | null;
  shunt?: "asd" | "vsd" | null;
  laSize?: "normal" | "large";
};
