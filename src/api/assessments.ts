import type { NewAssessment } from "../types/assessment";
import type { StudentGrade } from "../types/grade";
import apiClient from "./client";

export const getRecentAssessments = async () => {
  const response = await apiClient.get("/assessments/recent");
  return response.data;
};

export const getAssessment = async (id: string) => {
  const response = await apiClient.get(`/assessments/${id}`);
  return response.data;
};

export const getAssessmentGrades = async (id: number | string) => {
  const response = await apiClient.get<StudentGrade[]>(
    `/assessments/${id}/grades`
  );
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

export async function finishGrading(assessmentId: number) {
  const response = await apiClient.put(`/assessments/${assessmentId}/graded`);
  return response.data;
}

export async function closeAssessment(assessmentId: number) {
  const response = await apiClient.put(`/assessments/${assessmentId}/close`);
  return response.data;
}
