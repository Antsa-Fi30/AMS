import { Grid, Container } from "@mui/material";
import { WelcomeHeader } from "../../components/client/dashboard/WelcomeHeader";
import { NextAppointment } from "../../components/client/dashboard/NextAppointment";
import { QuickActions } from "../../components/client/dashboard/QuickActions";
import { AppointmentsStats } from "../../components/client/dashboard/AppointmentsStats";
import { RecentActivity } from "../../components/client/dashboard/RecentActivity";
import { HealthTips } from "../../components/client/dashboard/HealthTips";

const DashboardCli = () => {
  return (
    <Container sx={{ py: 4 }}>
      {/* En-tête de bienvenue */}
      <WelcomeHeader />

      <Grid container spacing={3} sx={{ mt: 0 }}>
        {/* Prochain rendez-vous - Grande carte principale */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <NextAppointment />
        </Grid>

        {/* Actions rapides */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <QuickActions />
        </Grid>

        {/* Statistiques des rendez-vous */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AppointmentsStats />
        </Grid>

        {/* Activité récente */}
        <Grid size={{ xs: 12, md: 6, lg: 5 }}>
          <HealthTips />
        </Grid>

        {/* Conseils santé */}
        <Grid size={{ xs: 12, lg: 3 }}>
          <RecentActivity />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardCli;
