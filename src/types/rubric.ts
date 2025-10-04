import type { Criterion } from "./criterion";
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
