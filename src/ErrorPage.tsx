import { useNavigate, useRouteError } from "react-router-dom";

type RouteError = {
  error: { status?: number; message?: string };
};

const ErrorPage = () => {
  const { error } = useRouteError() as RouteError;
  const navigate = useNavigate();

  if (error && error.status === 401) {
    navigate("/login");
  }

  console.error("ERROR PAGE", error);

  return <div>ErrorPage</div>;
};
export default ErrorPage;
