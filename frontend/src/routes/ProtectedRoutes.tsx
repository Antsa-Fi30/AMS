import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const access = localStorage.getItem("access");

  if (access) {
    return <Navigate to={"/doctor"} replace />;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
