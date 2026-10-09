export type VesselId = "lm" | "lad" | "diag" | "lcx" | "om" | "rca" | "pda" | "pla";

export type AngioStudy = {
  id: string;
  label: string;
  tree: "lca" | "rca";
  view: string;
  lesions: { vessel: VesselId; pct: number }[];
  timi?: 0 | 1 | 2 | 3;
  note?: string;
};
