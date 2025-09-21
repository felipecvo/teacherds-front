import { useNavigate, useRouteError } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

const ErrorPage = () => {
  const { error } = useRouteError();
  const navigate = useNavigate();

  if (error?.status === 401) {
    navigate("/login");
  }

  console.error("ERROR PAGE", error);

  return <div>ErrorPage</div>;
};
export default ErrorPage;
