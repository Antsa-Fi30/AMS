import { useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Stack,
  // Chip,
} from "@mui/material";
import {
  PendingActions,
  // CheckCircle,
  // Cancel,
  // Schedule,
} from "@mui/icons-material";
import TicketsTable from "../../components/common/TicketsTable";
import { TicketStats } from "../../components/doctor/tickets/TicketStats";
import { useGetAppointmentsQuery } from "../../services/AppointmentServices";

const TicketDashboard = () => {
  const { refetch } = useGetAppointmentsQuery(undefined, { skip: true });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000);
    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* En-tête */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <PendingActions color="primary" sx={{ fontSize: 40, mr: 2 }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Gestion des Tickets
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Gérez et confirmez les demandes de rendez-vous
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={1}>
        {/* Statistiques */}
        <Grid size={12}>
          <TicketStats />
        </Grid>

        {/* Actions rapides */}
        <Grid size={{ xs: 12, md: 4 }}></Grid>

        {/* Tableau principal */}
        <Grid size={{ xs: 12, md: 12 }}>
          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={3}>
                {/* <QuickTicketActions /> */}
                <TicketsTable />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TicketDashboard;
