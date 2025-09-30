import { Box, Stack, IconButton, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import { MedicalServices } from "@mui/icons-material";

const menu = [
  { icon: <HomeIcon />, label: "Home", path: "/patient/home" },
  {
    icon: <CalendarMonthIcon />,
    label: "Your appointments",
    path: "/patient/appointments",
  },
  { icon: <PersonIcon />, label: "Your profile", path: "/patient/profile" },
  // { icon: <MedicalServicesIcon />, label: "Doctors", path: "/patient/doctors" },
];

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 72,
        minHeight: "100vh",
        bgcolor: "background.paper",
        borderRight: 1,
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 3,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          mb: 5,
          width: 40,
          height: 40,
          bgcolor: "primary.main",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          color: "white",
          fontSize: 22,
          boxShadow: 2,
        }}
      >
        <MedicalServices />
      </Box>

      {/* Menu icons */}
      <Stack spacing={3} alignItems="center">
        {menu.map((item) => (
          <Tooltip key={item.label} title={item.label} placement="right">
            <IconButton
              component={NavLink}
              to={item.path}
              size="large"
              sx={{
                color: "text.secondary",
                "&.active": {
                  color: "primary.main",
                  bgcolor: "action.hover",
                },
              }}
            >
              {item.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
};

export default Sidebar;
