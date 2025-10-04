import type { Rubric } from "../types/rubric";
import apiClient from "./client";

export async function getRubrics(): Promise<Rubric[]> {
  const response = await apiClient.get<Rubric[]>(`/rubrics`);

  return response.data;
}
