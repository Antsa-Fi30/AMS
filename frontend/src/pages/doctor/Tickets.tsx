import { useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  // Chip,
} from "@mui/material";
import {
  PendingActions,
  // CheckCircle,
  // Cancel,
  // Schedule,
} from "@mui/icons-material";
import { useGetAppointmentsQuery } from "../../services/AppointmentServices";
import Appointments from "../../components/common/Appointments";

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

      <Appointments />
    </Container>
  );
};

export default TicketDashboard;
