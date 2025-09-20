import type { PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
