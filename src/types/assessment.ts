export interface Assessment {
  id: number;
  code: string;
  type: "individual" | "group";
  githubClassRoomAssignmentId: string;
  rubricId: number;
  classroomId: number;
  title: string;
  description: string;
}

export type NewAssessment = Omit<Assessment, "id">;
