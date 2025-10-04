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

type NewCriterion = Omit<Criterion, "id" | "levels"> & {
  levels: Omit<CriterionLevel, "id">[];
};

export type NewRubric = Omit<Rubric, "id" | "criteria" | "penalties"> & {
  criteria: NewCriterion[];
  penalties: Omit<Penalty, "id">[];
};
