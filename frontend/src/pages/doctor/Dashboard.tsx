import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import Stats from "../../components/doctor/home/Stats";
import MiniCalendar from "../../components/doctor/home/MiniCalendar";
import NextAppointment from "../../components/doctor/home/NextAppointment";
// import GraphicStats from "../../components/doctor/home/GraphicStats";
import Story from "../../components/doctor/home/Story";

const Dashboard = () => {
  // const [appointments, setAppointment] = useState([]);
  return (
    <div>
      <Box>
        <Stats />
      </Box>

      <Box my={10}>
        <Grid container spacing={2} columns={16}>
          <Grid size={8}>
            <Stack spacing={2}>
              <Card sx={{ background: "background.paper" }} elevation={2}>
                <CardContent>
                  <NextAppointment />
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid size={8}>
            <Stack spacing={2}>
              <Card elevation={2}>
                <CardContent>
                  <MiniCalendar />
                </CardContent>
              </Card>
              {/* <Card elevation={2}>
                <CardContent>
                  <GraphicStats />
                </CardContent>
              </Card> */}
            </Stack>
          </Grid>
        </Grid>
        <Card sx={{ marginY: 2 }} elevation={2}>
          <CardContent>
            <Story />
          </CardContent>
        </Card>
        <Typography>Copyright Befiana</Typography>
      </Box>
    </div>
  );
};

export default Dashboard;
