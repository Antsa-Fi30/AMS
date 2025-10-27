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
  Skeleton,
} from "@mui/material";

import { useGetAppointmentsQuery } from "../../services/AppointmentServices";
import AcceptDialog from "../doctor/tickets/AcceptDialog";
import RejectDialog from "../common/RejectDialog";
import DetailsDialog from "../doctor/tickets/DetailsDialog";
import { Cancel, Check } from "@mui/icons-material";
import EmptyData from "./EmptyData";
import { useMemo, memo } from "react";
import { getStatusColor } from "../../utils/getColor";

interface TicketsTableProps {
  client?: boolean;
}

const TicketsTableComponent: React.FC<TicketsTableProps> = ({ client }) => {
  const { data, isLoading } = useGetAppointmentsQuery(undefined, {
    pollingInterval: undefined,
  });

  const displayedData = useMemo(() => data || [], [data]);

  if (isLoading) {
    return (
      <Box sx={{ mt: 2 }}>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={40} sx={{ mb: 1 }} />
        ))}
      </Box>
    );
  }

  console.log(data);

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
          {displayedData?.length !== 0 && (
            <Chip
              label={`${
                data?.filter((t) => t.status === "pending").length
              } en attente`}
              color="warning"
              variant="outlined"
            />
          )}
        </Box>

        {displayedData?.length === 0 ? (
          <>
            <EmptyData
              title="No ticket for this month"
              hint="Any patient who sent an appointment-demand will appear here"
            />
          </>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{client ? "Doctor" : "Patient"}</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Finished</TableCell>
                  {!client && <TableCell align="center">Actions</TableCell>}
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
                            {client
                              ? `Dr ${ticket.doctor_name}`
                              : ticket.patient_name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {client
                              ? ticket.doctor_phone
                              : ticket.patient_phone}
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
                    <TableCell>
                      {ticket.finished ? (
                        <Check color="success" />
                      ) : (
                        <Cancel color="error" />
                      )}
                    </TableCell>

                    <TableCell align="center">
                      {!client && ticket.status === "pending" && (
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            justifyContent: "center",
                          }}
                        >
                          <AcceptDialog appointment={ticket} />
                          <RejectDialog appointment={ticket} />
                        </Box>
                      )}
                      <DetailsDialog target={ticket} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </div>
  );
};

export const TicketsTable = memo(TicketsTableComponent);
export default TicketsTable;
