import apiClient from "./client";

export const postLogin = async (email: string, password: string) => {
  const response = await apiClient.post("/login", { email, password });
  return response.data;
};
