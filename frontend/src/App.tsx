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
import ProfilCli from "./pages/client/ProfileCli";
import { useDispatch } from "react-redux";
import { initializeAuth } from "./redux/AuthSlice";
import Calendar from "./pages/doctor/AppointmentCalendar";
import Profil from "./pages/doctor/Profil";
import Settings from "./pages/doctor/Settings";
import SettingsCli from "./pages/client/SettingsCli";

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
            <Route path="profil" element={<Profil />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="patient" element={<PatientLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<DashboardCli />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="profil" element={<ProfilCli />} />
            <Route path="settings" element={<SettingsCli />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
