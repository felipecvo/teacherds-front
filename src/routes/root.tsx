import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="p-6">
      <Outlet />
    </div>
  );
};
export default Root;
