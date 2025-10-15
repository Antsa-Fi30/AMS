import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "../components/doctor/templates/AppNavbar";

import Sidebar from "../components/doctor/templates/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/doctor/templates/Header";

const DoctorLayout = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack spacing={5} sx={{ px: 2, py: 1 }}>
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </>
  );
};
export default DoctorLayout;
