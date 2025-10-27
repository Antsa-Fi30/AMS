import { Box, Stack } from "@mui/material";
import MenuAvatar from "./MenuAvatar";
// import { OutlinedInput, InputAdornment } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 5,
        py: 1.3,
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      {/* Champ de recherche */}
      {/* <OutlinedInput
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
      /> */}
      <Box></Box>
      {/* Bouton notification */}
      <Stack direction={"row"} spacing={2} alignItems="center">
        <MenuAvatar />
      </Stack>
    </Box>
  );
};

export default Header;
