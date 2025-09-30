import {
  Container,
  Grid,
  Card,
  CardContent,
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
import { TicketsTable } from "../../components/tickets/TicketsTable";
import { TicketStats } from "../../components/tickets/TicketStats";
import { QuickTicketActions } from "../../components/tickets/QuickTicketActions";

const TicketDashboard = () => {
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

      <Grid container spacing={3}>
        {/* Statistiques */}
        <Grid size={12}>
          <TicketStats />
        </Grid>

        {/* Actions rapides */}
        <Grid size={{ xs: 12, md: 4 }}>
          <QuickTicketActions />
        </Grid>

        {/* Tableau principal */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <TicketsTable />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TicketDashboard;
