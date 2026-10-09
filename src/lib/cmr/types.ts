export type LgePattern =
  | "none"
  | "subendo"
  | "transmural"
  | "midwall"
  | "epi"
  | "global-subendo"
  | "patchy";

export type CmrWall = "ant" | "sept" | "inf" | "lat";

export type CmrStudy = {
  id: string;
  label: string;
  ef: number;
  walls: Partial<Record<CmrWall, LgePattern>>;
  global?: LgePattern;
  cavity?: "normal" | "dilated" | "thick";
  note?: string;
};
