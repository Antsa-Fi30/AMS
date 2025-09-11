import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/shared/Login";
import Register from "./pages/shared/Register";
import DoctorLayout from "./layouts/DoctorLayout";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Dashboard from "./pages/doctor/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="doctor" element={<DoctorLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Dashboard />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
