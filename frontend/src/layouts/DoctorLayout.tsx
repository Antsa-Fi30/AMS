import Header from "../components/doctor/Header";
import { Outlet } from "react-router-dom";

const DoctorLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default DoctorLayout;
