export interface StudentGrade {
  id: number;
  registrationNumber: string;
  studentName: string;
  finalScore: number | null;
  feedbackDraft: string | null;
}

export interface FinalGrade extends StudentGrade {
  criterions: string[];
}
