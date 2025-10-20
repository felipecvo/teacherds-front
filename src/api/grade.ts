import type { FinalGrade } from "../types/grade";
import apiClient from "./client";

export async function getGrade(id: string): Promise<FinalGrade> {
  const response = await apiClient.get<FinalGrade>(`/grades/${id}`);

  return response.data;
}
