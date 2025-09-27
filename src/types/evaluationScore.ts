export interface EvaluationScore {
  id?: number;
  criterion: { id: number };
  criterionLevel: { id: number };
  evaluation: { id: number };
  points: number;
  feedbackDraft: string;
  feedbackRefined: string;
  feedbackFinal: string;
}
