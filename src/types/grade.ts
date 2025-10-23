export interface StudentGrade {
  id: number;
  registrationNumber: string;
  studentName: string;
  finalScore: number | null;
  feedbackDraft: string | null;
}

export interface FinalGrade {
  id: number;
  assessment: Assessment;
  evaluation: Evaluation;
  finalScore: number;
  feedbackDraft: string;
  feedbackRefined: string;
  feedbackFinal: string;
  createdDate: string;
  updatedDate: string;
}

export interface Assessment {
  id: number;
  code: string;
  title: string;
  description: string;
  type: string;
  githubClassRoomAssignmentId: string;
  rubric: Rubric;
  createdDate: string;
  updatedDate: string;
  status: string;
  openAt: string | null;
  closeAt: string | null;
  dueAt: string | null;
  publishedAt: string | null;
  gradedAt: string | null;
  releasedAt: string | null;
  archivedAt: string | null;
  cancelledAt: string | null;
}

export interface Rubric {
  id: number;
  name: string;
  totalPoints: number;
  description: string;
  notes: string;
  createdDate: string;
  updatedDate: string;
}

export interface Evaluation {
  id: number;
  studentGroup: StudentGroup;
  student: Student | null;
  scores: EvaluationScore[];
  penalties: EvaluationPenalty[];
  duration: number;
  createdDate: string;
  updatedDate: string;
}

export interface StudentGroup {
  id: number;
  name: string;
  students: Student[];
  createdDate: string;
  updatedDate: string;
}

export interface Student {
  id: number;
  name: string;
  registrationNumber: string;
  githubUsername: string;
  status: string;
  createdDate: string;
  updatedDate: string;
}

export interface EvaluationScore {
  id: number;
  criterion: Criterion;
  criterionLevel: CriterionLevel;
  points: number;
  feedbackDraft: string;
  feedbackRefined: string;
  feedbackFinal: string;
  createdDate: string;
  updatedDate: string;
}

export interface Criterion {
  id: number;
  name: string;
  description: string;
  points: number;
  createdDate: string;
  updatedDate: string;
}

export interface CriterionLevel {
  id: number;
  name: string;
  description: string;
  weight: number;
  createdDate: string;
  updatedDate: string;
}

export interface EvaluationPenalty {
  id: number;
  penalty: Penalty;
  points: number;
  createdDate: string;
  updatedDate: string;
}

export interface Penalty {
  name: string;
}
