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
import { TodayAppointments } from "../../components/doctor/dashboard/TodayAppointments";
import { UpcomingSchedule } from "../../components/doctor/dashboard/UpcomingSchedule";
import { QuickActionsDoctor } from "../../components/doctor/dashboard/QuickActionsDoctor";
// import { PatientQueue } from "../../components/doctor/dashboard/PatientQueue";
// import { MedicalInsights } from "../../components/doctor/dashboard/MedicalInsights";

const Dashboard = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* En-tête personnalisée pour docteur */}
      <WelcomeHeaderDoctor />

      {/* Statistiques principales */}
      <Box mb={4}>
        <DoctorStats />
      </Box>

      <Grid container spacing={2}>
        {/* Colonne gauche - Agenda et file d'attente */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            {/* RDV du jour */}
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <TodayAppointments />
              </CardContent>
            </Card>
            {/* File d'attente
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <PatientQueue />
              </CardContent>
            </Card> */}
          </Stack>
        </Grid>

        {/* Colonne droite - Actions rapides et insights */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={2}>
            {/* Calendrier et planning */}
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <UpcomingSchedule />
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <QuickActionsDoctor />
              </CardContent>
            </Card>

            {/* Insights médicaux */}
            {/* <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <MedicalInsights />
              </CardContent>
            </Card> */}
          </Stack>
        </Grid>
      </Grid>

      <Typography textAlign="center" color="text.secondary" sx={{ mt: 4 }}>
        © 2024 Befiana - Solution Médicale
      </Typography>
    </Container>
  );
};

export default Dashboard;
