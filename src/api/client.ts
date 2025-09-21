import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { getToken } from "../services/tokenService";

const client = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "your_api_token_here",
  },
});

client.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default client;
