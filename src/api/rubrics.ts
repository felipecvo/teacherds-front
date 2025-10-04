import type { NewRubric, Rubric } from "../types/rubric";
import apiClient from "./client";

export async function getRubrics(): Promise<Rubric[]> {
  const response = await apiClient.get<Rubric[]>(`/rubrics`);

  return response.data;
}

export async function postRubric(params: NewRubric): Promise<Rubric> {
  const response = await apiClient.post<Rubric>(`/rubrics`, params);

  return response.data;
}
