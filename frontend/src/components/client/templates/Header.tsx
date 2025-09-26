import { Box, IconButton, Stack } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { OutlinedInput, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuAvatar from "./MenuAvatar";

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
      <OutlinedInput
        placeholder="Rechercher..."
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        }
        sx={{
          width: 300,
          borderRadius: 3,
          backgroundColor: "background.default",
        }}
      />
      {/* Bouton notification */}
      <Stack direction={"row"} spacing={2} alignItems="center">
        <IconButton color="primary">
          <NotificationsOutlinedIcon />
        </IconButton>
        <MenuAvatar />
      </Stack>
    </Box>
  );
};

export default Header;
