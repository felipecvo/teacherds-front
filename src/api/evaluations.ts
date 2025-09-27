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

export async function saveEvaluation(id: number | string, payload: any) {
  const response = await apiClient.patch(`/evaluations/${id}`, payload);
  return response.data;
}
