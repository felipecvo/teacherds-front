import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

const Root = () => {
  return (
    <ProtectedRoute>
      <div className="p-6">
        <Outlet />
      </div>
    </ProtectedRoute>
  );
};
export default Root;
