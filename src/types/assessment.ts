import type { Rubric } from "./rubric";

export type AssessmentStatus =
  | "draft"
  | "scheduled"
  | "open"
  | "closed"
  | "under_review"
  | "graded"
  | "released"
  | "archived"
  | "cancelled";

export interface Assessment {
  id: number;
  code: string;
  type: "individual" | "group";
  githubClassRoomAssignmentId: string;
  rubricId: number;
  classroomId: number;
  title: string;
  description: string;
  openAt: string;
  status: AssessmentStatus;
  rubric: Rubric;
}

export type NewAssessment = Omit<
  Assessment,
  "id" | "status" | "openAt" | "rubric"
>;
