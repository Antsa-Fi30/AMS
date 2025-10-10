import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { FilterList, Download, Refresh } from "@mui/icons-material";
import { useGetAppointmentsQuery } from "../../../services/AppointmentServices";

const QuickTicketActions = () => {
  const { refetch } = useGetAppointmentsQuery();
  const filters = [
    { label: "Tous les tickets", count: 35 },
    { label: "En attente", count: 8 },
    { label: "Confirmés", count: 24 },
    { label: "Refusés", count: 3 },
  ];

  return (
    <Card elevation={2} sx={{ borderRadius: 3, height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Filtres rapides
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mb: 3 }}>
          {filters.map((filter, index) => (
            <Button
              key={index}
              variant="outlined"
              fullWidth
              sx={{
                justifyContent: "space-between",
                py: 1.5,
                borderRadius: 2,
              }}
            >
              <Typography variant="body2">{filter.label}</Typography>
              <Chip label={filter.count} size="small" color="primary" />
            </Button>
          ))}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<FilterList />}
            fullWidth
            sx={{ borderRadius: 2 }}
          >
            Filtres avancés
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download />}
            fullWidth
            sx={{ borderRadius: 2 }}
          >
            Exporter
          </Button>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            fullWidth
            sx={{ borderRadius: 2 }}
            onClick={() => refetch()}
          >
            Actualiser
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuickTicketActions;
