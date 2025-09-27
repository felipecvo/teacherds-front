import type { CriterionLevel } from "./criterionLevel";

export interface Criterion {
  id: number;
  name: string;
  description: string;
  points: number;
  levels: CriterionLevel[];
}
