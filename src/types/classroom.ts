export interface Classroom {
  id: number;
  name: string;
  semester: string;
  year: number;
  code: string;
  courseId: number;
  courseName: string;
}

export type NewClassroom = Omit<Classroom, "id" | "courseName">;
