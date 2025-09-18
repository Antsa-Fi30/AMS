import { Stack } from "@mui/material";
import Header from "../../components/doctor/tickets/Header";
import TicketsTable from "../../components/doctor/tickets/TicketsTable";

const Tickets = () => {
  return (
    <Stack spacing={2}>
      <Header />
      <TicketsTable />
    </Stack>
  );
};

export default Tickets;
