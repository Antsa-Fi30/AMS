import { Box, IconButton } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Searchbar from "./Searchbar";

const Header = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: 1,
        px: 5,
        py: 1.3,
      }}
    >
      {/* Champ de recherche */}
      <Searchbar />
      {/* Bouton notification */}
      <IconButton color="primary">
        <NotificationsOutlinedIcon />
      </IconButton>
    </Box>
  );
};

export default Header;
