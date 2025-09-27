import type { Criterion } from "./criterion";
import type { EvaluationScore } from "./evaluationScore";
import type { Student } from "./student";

export interface Evaluation {
  rubric?: {
    criteria: Criterion[];
  };
  studentGroup?: {
    name: string;
    students: Student[];
  };
  student?: Student;
  scores: EvaluationScore[];
  duration?: number;
  feedback?: string;
}
