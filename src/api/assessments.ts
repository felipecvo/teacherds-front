import apiClient from "./client";

export const getRecentAssessments = async () => {
  const response = await apiClient.get("/assessments/recent");
  return response.data;
};

export const getAssessment = async (id: string) => {
  const response = await apiClient.get(`/assessments/${id}`);
  return response.data;
};
