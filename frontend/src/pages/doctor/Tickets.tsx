import { CircularProgress, Box, Typography } from "@mui/material";
import { useGetAppointmentsQuery } from "../../services/AppointmentServices";
import Header from "../../components/doctor/tickets/Header";
import TicketsTable from "../../components/doctor/tickets/TicketsTable";
const Tickets = () => {
  const { data, error, isLoading } = useGetAppointmentsQuery();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ p: 2 }}>
        Erreur lors du chargement des rendez-vous
      </Typography>
    );
  }

  console.log(data);

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ my: 2 }}>
        <Header />
      </Box>
      <Box>
        <TicketsTable appointments={data ?? []} />
      </Box>
    </Box>
  );
};

export default Tickets;
