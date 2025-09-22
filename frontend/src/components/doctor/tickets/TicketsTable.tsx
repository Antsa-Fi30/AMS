import React, { useState } from "react";
import type { AppointmentType } from "../../../redux/appointmentsApi";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Stack,
  TablePagination,
} from "@mui/material";

import DialogDescriptionComponent from "./DialogDescriptionComponent";
import RejectDialog from "./RejectDialog";
import AcceptDialog from "./AcceptDialog";

interface Column {
  id:
    | "id"
    | "Patient"
    | "Phone"
    | "Reason"
    | "Created"
    | "Status"
    | "Date"
    | "Time";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "Patient", label: "Patient", minWidth: 100 },
  {
    id: "Phone",
    label: "Phone",
    minWidth: 170,
    // align: "right",
    // format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "Reason",
    label: "Reason",
    minWidth: 170,
    // align: "right",
    // format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "Created",
    label: "Created_at",
    minWidth: 170,
    // align: "right",
    // format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "Status",
    label: "Status",
    minWidth: 170,
    // align: "right",
    // format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "Date",
    label: "Date",
    minWidth: 170,
    // align: "right",
    // format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "Time",
    label: "Time",
    minWidth: 170,
    // align: "right",
    // format: (value: number) => value.toFixed(2),
  },
];

interface TicketsTableProps {
  appointments: AppointmentType[];
}

const TicketsTable: React.FC<TicketsTableProps> = ({ appointments }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    if (event) {
      event.preventDefault();
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const hasPending = appointments.some((app) => app.status === "pending");

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          {/* Header */}
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              {hasPending && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>

          {/* Body */}
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.patient_name}</TableCell>
                <TableCell>{appointment.patient_phone}</TableCell>
                <TableCell>{appointment.reason}</TableCell>
                <TableCell>{appointment.requested_at}</TableCell>
                <TableCell>
                  <Chip label={appointment.status} color="warning" />
                </TableCell>
                <TableCell>{appointment.date ?? "—"}</TableCell>
                <TableCell>{appointment.time ?? "—"}</TableCell>

                <TableCell>
                  <Stack direction={"row"} spacing={2}>
                    <DialogDescriptionComponent
                      description={
                        appointment.descriptions || "No descriptions found"
                      }
                      client={appointment.patient_name}
                    />
                    {appointment.status === "pending" && (
                      <>
                        <AcceptDialog client={appointment.patient_name} />
                        <RejectDialog client={appointment.patient_name} />
                      </>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={appointments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TicketsTable;
