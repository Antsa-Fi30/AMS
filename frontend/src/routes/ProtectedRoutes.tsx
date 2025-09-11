import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const access = localStorage.getItem("access");

  if (access) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
