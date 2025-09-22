import {
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useGetAppointmentsQuery } from "../../../redux/appointmentsApi";

const Header = () => {
  const { refetch, isFetching } = useGetAppointmentsQuery();

  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h3" fontWeight={700}>
            Appointment tickets
          </Typography>
          <IconButton onClick={() => refetch()} aria-label="refresh">
            {isFetching ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <RefreshIcon />
            )}
          </IconButton>
        </Stack>

        <Stack direction={"row"} spacing={5}>
          {/* <Searchbar /> */}
          <Button variant="contained">Export to csv</Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default Header;
