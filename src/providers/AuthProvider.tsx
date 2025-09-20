import type { PropsWithChildren } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const login = async (username: string, password: string) => {
    // Implement login logic
  };

  const logout = () => {
    // Implement logout logic
  };

  return (
    <AuthContext.Provider
      value={{ user: null, login, logout, isAuthenticated: false }}
    >
      {children}
    </AuthContext.Provider>
  );
};
