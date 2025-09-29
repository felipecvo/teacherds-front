import type { Criterion } from "./criterion";
import type { EvaluationPenalty } from "./evaluationPenalty";
import type { EvaluationScore } from "./evaluationScore";
import type { Penalty } from "./penalty";
import type { Student } from "./student";

export interface Evaluation {
  rubric?: {
    criteria: Criterion[];
    penalties: Penalty[];
  };
  studentGroup?: {
    name: string;
    students: Student[];
  };
  student?: Student;
  scores: EvaluationScore[];
  penalties: EvaluationPenalty[];
  duration?: number;
  feedback?: string;
}
