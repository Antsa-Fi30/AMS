import { Button, IconButton, Stack, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import Searchbar from "../templates/Searchbar";

const Header = () => {
  return (
    <div>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h3" fontWeight={700}>
          Appointment tickets
          <IconButton>
            <RefreshIcon />
          </IconButton>
        </Typography>
        <Stack direction={"row"} spacing={5}>
          <Searchbar />
          <Button variant="contained">Export to csv</Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default Header;
