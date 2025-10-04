import type { GithubAssignment } from "../types/github";
import apiClient from "./client";

export async function getGithubAssignmentsByClassroom(
  id: string | number
): Promise<GithubAssignment[]> {
  const response = await apiClient.get<GithubAssignment[]>(
    `/classrooms/${id}/assignments`
  );
  return response.data;
}
