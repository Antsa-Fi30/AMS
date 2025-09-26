import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Sidebar from "../components/client/templates/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/client/templates/Header";

const PatientLayout = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
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
          <Box sx={{ mb: 3 }}>
            <Header />
          </Box>
          <Stack spacing={5} sx={{ p: 2 }}>
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </>
  );
};
export default PatientLayout;
