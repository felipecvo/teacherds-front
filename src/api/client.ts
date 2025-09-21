import axios from "axios";
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

export const handleJWTExpiration = (onExpiration: () => void) => {
  console.log("Setting up JWT expiration handler");
  client.interceptors.response.use(
    (res) => res,
    (err) => {
      console.log("Response error:", err, err.response?.status);
      if (err.response?.status === 401) {
        onExpiration();
      }
      return Promise.reject(err);
    }
  );
};

export default client;
