import type { Classroom, NewClassroom } from "../types/classroom";
import apiClient from "./client";

export async function getClassrooms(): Promise<Classroom[]> {
  const response = await apiClient.get<Classroom[]>(`/classrooms`);

  return response.data;
}

export async function getClassroomById(
  id: string | number
): Promise<Classroom> {
  const response = await apiClient.get<Classroom>(`/classrooms/${id}`);
  return response.data;
}

export async function postClassroom(params: NewClassroom) {
  const response = await apiClient.post("/classrooms", params);

  return response.data;
}
