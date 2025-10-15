import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/shared/Login";
import Register from "./pages/shared/Register";
import DoctorLayout from "./layouts/DoctorLayout";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Dashboard from "./pages/doctor/Dashboard";
import DashboardCli from "./pages/client/DashboardCli";
import Tickets from "./pages/doctor/Tickets";
import PatientLayout from "./layouts/PatientLayout";
import Appointments from "./pages/client/Appointments";
import ProfileCli from "./pages/client/ProfileCli";
import { useDispatch } from "react-redux";
import { initializeAuth } from "./redux/AuthSlice";
import Calendar from "./pages/doctor/Calendar";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

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
            <Route path="tickets" element={<Tickets />} />
            <Route path="calendar" element={<Calendar />} />
          </Route>
          <Route path="patient" element={<PatientLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<DashboardCli />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="profile" element={<ProfileCli />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
