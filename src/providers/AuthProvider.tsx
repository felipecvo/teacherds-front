import { useState, type PropsWithChildren } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { postLogin } from "../api/auth";
import { clearToken, getToken, setToken } from "../services/tokenService";

const initialAuthToken = getToken();

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setTokenState] = useState(initialAuthToken);
  const [user, setUser] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    const data = await postLogin(username, password);
    setToken(data.token);
    setTokenState(data.token);
    setUser(username);
  };

  const logout = () => {
    setToken(null);
    clearToken();
    setUser(null);
  };

  const value = { user, login, logout, isAuthenticated: !!token, token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
