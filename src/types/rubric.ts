import type { Criterion } from "./criterion";
import type { CriterionLevel } from "./criterionLevel";
import type { Penalty } from "./penalty";

export interface Rubric {
  id: number;
  name: string;
  totalPoints: number;
  description: string;
  notes: string;
  criteria: Criterion[];
  penalties: Penalty[];
}

export type NewRubric = Omit<Rubric, "id" | "criteria" | "penalties"> & {
  criteria: Omit<Criterion, "id" | "levels"> &
    { levels: Omit<CriterionLevel, "id">[] }[];
  penalties: Omit<Penalty, "id">[];
};
