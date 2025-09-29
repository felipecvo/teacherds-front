import type { Course } from "../types/course";
import apiClient from "./client";

export async function getCourses(): Promise<Course[]> {
  const response = await apiClient.get<Course[]>(`/courses`);

  return response.data;
}
