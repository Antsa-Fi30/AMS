/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  // Avatar,
  CircularProgress,
} from "@mui/material";

import { useGetAppointmentsQuery } from "../../../services/AppointmentServices";
import AcceptDialog from "./AcceptDialog";
import RejectDialog from "./RejectDialog";
import DetailsDialog from "./DetailsDialog";

const TicketsTable = () => {
  const { data, isLoading, refetch } = useGetAppointmentsQuery(undefined, {
    pollingInterval: 5000, // Rafraîchir les données toutes les 3 secondes
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "confirmed":
        return "success";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  if (isLoading) {
    return <CircularProgress size={24} />;
  }

  return (
    <div>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Liste des tickets
          </Typography>
          <Chip
            label={`${
              data?.filter((t) => t.status === "pending").length
            } en attente`}
            color="warning"
            variant="outlined"
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((ticket) => (
                <TableRow
                  key={ticket.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor:
                      ticket.status === "pending"
                        ? "action.hover"
                        : "transparent",
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {/* <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                        {ticket.avatar}
                      </Avatar> */}
                      <Box>
                        <Typography variant="subtitle2" fontWeight="medium">
                          {ticket.patient_name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {ticket.patient_phone}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{ticket.reason}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {ticket.date ? ticket.date : "N/A"}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        {ticket.time ? ticket.time : "N/A"}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        ticket.status === "pending"
                          ? "En attente"
                          : ticket.status === "confirmed"
                          ? "Confirmé"
                          : "Refusé"
                      }
                      color={getStatusColor(ticket.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {ticket.status === "pending" && (
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        <AcceptDialog
                          id={ticket.id}
                          client={ticket.patient_name}
                          appointment={ticket}
                        />
                        <RejectDialog
                          id={ticket.id}
                          client={ticket.patient_name}
                        />
                      </Box>
                    )}
                    <DetailsDialog target={ticket} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default TicketsTable;
