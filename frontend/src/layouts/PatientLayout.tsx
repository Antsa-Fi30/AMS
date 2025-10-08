import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Sidebar from "../components/client/templates/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/client/templates/Header";

const PatientLayout = () => {
  const headerHeight = 64; // hauteur du header (px)

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      {/* Main content */}
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            : alpha(theme.palette.background.default, 1),
          overflowY: "auto",
          position: "relative",
        })}
      >
        {/* Header fixé en haut */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 71, // largeur du sidebar
            right: 0,
            height: `${headerHeight}px`,
            backgroundColor: "background.paper",
            zIndex: 10,
            boxShadow: 1,
          }}
        >
          <Header />
        </Box>

        {/* Contenu décalé sous le header */}
        <Stack spacing={5} sx={{ p: 3, mt: `${headerHeight}px` }}>
          <Outlet />
        </Stack>
      </Box>
    </Box>
  );
};

export default PatientLayout;
