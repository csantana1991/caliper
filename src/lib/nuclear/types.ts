export type Uptake = "normal" | "mild" | "severe" | "absent";

/** AHA 17-segment polar map. Index 0 = segment 1 (basal anterior). */
export type NuclearStudy = {
  id: string;
  label: string;
  mode: "stress" | "both";
  stress: Uptake[];
  rest?: Uptake[];
  note?: string;
};
