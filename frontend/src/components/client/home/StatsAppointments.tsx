import {
  Card,
  CardContent,
  Divider,
  Typography,
  Grid,
  Stack,
} from "@mui/material";

const StatsAppointments = () => {
  return (
    <>
      <Card
        elevation={2}
        sx={{ maxWidth: 400, height: "100%", margin: "auto" }}
      >
        <Typography variant="h2" fontSize={16} textAlign={"center"}>
          Summary
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <CardContent sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={12}>
            <Grid size={3}>
              <Stack spacing={1}>
                <Typography>Pending</Typography>
                <Typography>Accepted</Typography>
                <Typography>Rejected</Typography>
              </Stack>
            </Grid>
            <Grid alignItems={"center"} size={9}>
              <Stack spacing={1}>
                <Typography>5</Typography>
                <Typography>1</Typography>
                <Typography>0</Typography>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        {/* <Stack sx={{ marginTop: 15 }}>
          <Button variant="contained" color="secondary">
            See all your appointments
          </Button>
        </Stack> */}
      </Card>
    </>
  );
};

export default StatsAppointments;
