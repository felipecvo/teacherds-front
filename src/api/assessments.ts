import type { NewAssessment } from "../types/assessment";
import apiClient from "./client";

export const getRecentAssessments = async () => {
  const response = await apiClient.get("/assessments/recent");
  return response.data;
};

export const getAssessment = async (id: string) => {
  const response = await apiClient.get(`/assessments/${id}`);
  return response.data;
};

export const postAssessment = async (params: NewAssessment) => {
  const response = await apiClient.post("/assessments", params);
  return response.data;
};

export async function startGrading(assessmentId: number) {
  const response = await apiClient.post(
    `/assessments/${assessmentId}/evaluations`
  );
  return response.data;
}
