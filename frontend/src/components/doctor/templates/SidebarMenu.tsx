import { useLocation, Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, path: "/doctor/home" },
  { text: "Tickets", icon: <AnalyticsRoundedIcon />, path: "/doctor/tickets" },
  { text: "Clients", icon: <PeopleRoundedIcon />, path: "/doctor/clients" },
];

const SidebarMenu = () => {
  const location = useLocation();

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={index} sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={item.path}
                disableRipple
                selected={isActive}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                    boxShadow: (theme) =>
                      `0 4px 12px ${theme.palette.primary.main}80`,
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  },
                  "& .MuiListItemIcon-root": {
                    color: isActive ? "white" : "text.secondary",
                    transition: "all 0.2s ease",
                  },
                  "&.Mui-selected .MuiListItemIcon-root": {
                    color: "white",
                    transform: "scale(1.1)",
                  },
                  "& .MuiListItemText-primary": {
                    fontWeight: isActive ? 600 : 400,
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
};

export default SidebarMenu;
