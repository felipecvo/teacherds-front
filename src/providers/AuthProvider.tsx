import type { PropsWithChildren } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useLocalStorage<string | null>("user", null);
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    setUser(username);
    navigate("/");
  };

  const logout = () => {
    // Implement logout logic
  };

  const value = { user, login, logout, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
