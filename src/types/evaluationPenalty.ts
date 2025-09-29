export interface EvaluationPenalty {
  id?: number;
  penalty: { id: number };
  evaluation: { id: number };
  points: number;
  feedback: string;
}
