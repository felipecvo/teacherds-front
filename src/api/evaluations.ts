import apiClient from "./client";

export async function getEvaluations(assessmentId: string) {
  const response = await apiClient.get(
    `/assessments/${assessmentId}/evaluations`
  );

  return response.data;
}

export async function getEvaluation(id: number | string) {
  const response = await apiClient.get(`/evaluations/${id}`);
  return response.data;
}
