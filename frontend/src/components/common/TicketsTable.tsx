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
  Stack,
  Pagination,
  IconButton,
  CircularProgress,
} from "@mui/material";

import { useGetAppointmentsQuery } from "../../services/AppointmentServices";
import AcceptDialog from "../doctor/tickets/AcceptDialog";
import RejectDialog from "../common/RejectDialog";
import DetailsDialog from "./DetailsDialog";
import { Cancel, Check, Sync } from "@mui/icons-material";
import EmptyData from "./EmptyData";
import { useMemo, memo, useEffect, useState } from "react";
import { getStatusColor } from "../../utils/getColor";
import { formatDateToLocalString } from "../../utils/Formats";

// import { useSnackbar } from "../../contexts/SnackbarContext";

interface TicketsTableProps {
  client?: boolean;
  filter?: string;
}

const TicketsTableComponent: React.FC<TicketsTableProps> = ({
  client,
  filter,
}) => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, refetch } = useGetAppointmentsQuery(page);
  // const { showSnackbar } = useSnackbar();

  const displayedData = useMemo(() => data?.results || [], [data?.results]);

  const heinData = (filter: string | undefined) => {
    let dataFilter = [];
    switch (filter) {
      case "pending":
        dataFilter = displayedData.filter(
          (tickets) => tickets.status === filter
        );
        return dataFilter;
      case "confirmed":
        dataFilter = displayedData.filter(
          (tickets) => tickets.status === filter
        );
        return dataFilter;
      case "rejected":
        dataFilter = displayedData.filter(
          (tickets) => tickets.status === filter
        );
        return dataFilter;
      case "canceled":
        dataFilter = displayedData.filter(
          (tickets) => tickets.status === filter
        );
        return dataFilter;
      default:
        dataFilter = displayedData;
        return dataFilter;
    }
  };

  const filteredData = heinData(filter);

  // Pagination
  useEffect(() => {
    setPage(1);
  }, [filter]);

  const totalPages = useMemo(() => {
    if (!data?.count) return 1;
    return Math.ceil(data.count / 5); // 10 éléments par page (basé sur votre API)
  }, [data?.count]);

  // Gérer le changement de page
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (isLoading) {
    return (
      <Box sx={{ mt: 2 }}>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={40} sx={{ mb: 1 }} />
        ))}
      </Box>
    );
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
          <IconButton onClick={() => refetch()} disabled={isLoading}>
            {isLoading ? <CircularProgress /> : <Sync />}
          </IconButton>
          {filteredData?.length !== 0 && (
            <Chip
              label={`${
                data?.results.filter((t) => t.status === "pending").length
              } en attente`}
              color="warning"
              variant="outlined"
            />
          )}
        </Box>

        {filteredData?.length === 0 ? (
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
                  <TableCell>Numero</TableCell>
                  <TableCell>{client ? "Doctor" : "Patient"}</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Creneau</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Finished</TableCell>
                  {!client ? (
                    <TableCell align="center">Actions</TableCell>
                  ) : (
                    <TableCell align="center">Voir details</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData?.map((ticket) => (
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
                      <Typography variant="body2">{ticket.code}</Typography>
                    </TableCell>
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
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {ticket.date
                            ? formatDateToLocalString(ticket.date)
                            : "N/A"}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {ticket.time ? ticket.time : "N/A"}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={
                          ticket.type === "first" ? "Consultation" : "Contrôle"
                        }
                        color={
                          ticket.type === "first" ? "primary" : "secondary"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {ticket.disponibility
                            ? `${ticket.start_time} → ${ticket.end_time}`
                            : "N/A"}
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
                            : ticket.status === "rejected"
                            ? "Refusé"
                            : "Canceled"
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
        {/* Pagination */}
        {totalPages > 1 && (
          <Stack spacing={2} sx={{ mt: 3, alignItems: "center" }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Stack>
        )}
      </Box>
    </div>
  );
};

export const TicketsTable = memo(TicketsTableComponent);
export default TicketsTable;
