import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const access = localStorage.getItem("access");
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!access || !role) {
    return <Navigate to="/login" />;
  }

  if (role === "doctor" && !location.pathname.startsWith("/doctor")) {
    return <Navigate to="/doctor" replace />;
  } else if (role === "patient" && !location.pathname.startsWith("/patient")) {
    return <Navigate to="/patient" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
