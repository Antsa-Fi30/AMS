import { Box, Card, CardContent, Grid, Stack } from "@mui/material";
import Stats from "../../components/doctor/home/Stats";
import { useState } from "react";
import AppointmentTable from "../../components/doctor/home/AppointmentTable";
import MiniCalendar from "../../components/doctor/home/MiniCalendar";
import Notifications from "../../components/doctor/home/Notifications";

const Dashboard = () => {
  const [appointments, setAppointment] = useState([]);
  return (
    <div>
      <Box>
        <Stats />
      </Box>

      <Box my={10}>
        <Grid container spacing={2} columns={16}>
          <Grid size={10}>
            <Stack spacing={2}>
              <Card sx={{ background: "background.paper" }} elevation={2}>
                <CardContent>
                  <AppointmentTable />
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid size={6}>
            <Card elevation={2}>
              <CardContent>
                <MiniCalendar />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
