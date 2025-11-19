import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Container,
} from "@mui/material";
import { WelcomeHeaderDoctor } from "../../components/doctor/dashboard/WelcomeHeaderDoctor";
import { DoctorStats } from "../../components/doctor/dashboard/DoctorStats";
import TodayControl from "../../components/doctor/dashboard/TodayControl";
import TodayConsultations from "../../components/doctor/dashboard/TodayConsultations";
import { UpcomingSchedule } from "../../components/doctor/dashboard/UpcomingSchedule";
import { futurAppointment } from "../../services/AppointmentServices";
import { useSnackbar } from "../../contexts/SnackbarContext";
import NotificationsContainer from "../../components/doctor/dashboard/NotificationsContainer";
// import Conseils from "../../components/doctor/dashboard/Conseils";

export type Schedule = {
  date_display: string;
  day_number: number;
  day_type: string;
  rdv_count: number;
};

const Dashboard = () => {
  const [futurData, setFuturData] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchFutur = async () => {
      try {
        const data = await futurAppointment();
        setFuturData(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        showSnackbar(message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFutur();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <WelcomeHeaderDoctor />

      <Box mb={4}>
        <DoctorStats />
      </Box>

      <Card elevation={2} sx={{ borderRadius: 3, my: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <TodayControl />
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <TodayConsultations />
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={2}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <UpcomingSchedule schedule={futurData} isLoading={isLoading} />
              </CardContent>
            </Card>

            <NotificationsContainer />
          </Stack>
        </Grid>
      </Grid>
      {/* <Card elevation={2} sx={{ borderRadius: 3, my: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Conseils />
        </CardContent>
      </Card> */}

      <Typography textAlign="center" color="text.secondary" sx={{ mt: 4 }}>
        © 2025 Befiana
      </Typography>
    </Container>
  );
};

export default Dashboard;
