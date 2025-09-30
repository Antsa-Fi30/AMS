import {
  Card,
  CardContent,
  Divider,
  Typography,
  Grid,
  Stack,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";

const CardAppointment = () => {
  return (
    <>
      <Card
        elevation={2}
        sx={{ maxWidth: 400, height: "100%", margin: "auto" }}
      >
        <Typography variant="h2" fontSize={16} textAlign={"center"}>
          Your next appointment
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <CardContent>
          <Grid container spacing={2} columns={12}>
            <Grid size={3}>
              <Stack spacing={1}>
                <Typography>Doctor</Typography>
                <Typography>Reason</Typography>
                <Typography>Date</Typography>
                <Typography>Time</Typography>
                <Typography>Description</Typography>
              </Stack>
            </Grid>
            <Grid alignItems={"center"} size={9}>
              <Stack spacing={1}>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Avatar sx={{ width: 32, height: 32 }}>R</Avatar>
                  <Typography>Rakoto</Typography>
                </Stack>
                <Typography>Dental Checkup</Typography>
                <Typography>12/05/204</Typography>
                <Typography>12:30</Typography>
                <Typography>
                  <IconButton aria-label="accept" size="small">
                    <RemoveRedEye />
                  </IconButton>
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Stack sx={{ marginTop: 5 }}>
            <Button variant="contained" color="error">
              Cancel
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default CardAppointment;
