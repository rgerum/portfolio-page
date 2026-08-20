export type Point = [number, number];
export type PlotRange = [number, number];

export interface PlotEntry {
  type: "line" | "scatter";
  data: Point[];
  color: string;
}
