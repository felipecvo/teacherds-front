export interface Course {
  id: number;
  name: string;
  code: string;
  description: string;
}

export type NewCourse = Omit<Course, "id">;

export interface CourseRelation {
  course: Pick<Course, "id">;
}
