import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: "patient" | "doctor" | "reason" | "date" | "time" | "status";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
}

const columns: readonly Column[] = [
  { id: "patient", label: "Patient", minWidth: 150 },
  { id: "doctor", label: "Doctor", minWidth: 150 },
  { id: "reason", label: "Reason", minWidth: 200 },
  { id: "date", label: "Date", minWidth: 100 },
  { id: "time", label: "Time", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 120, align: "center" },
];

interface Appointment {
  id: number;
  patient: string;
  doctor: string;
  reason: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "rejected" | "canceled";
}

// Liste de patients et docteurs pour le mock
const patients = [
  "John Doe",
  "Jane Roe",
  "Alice Brown",
  "Bob White",
  "Charlie Green",
  "Diana Black",
  "Eve Silver",
  "Frank Gold",
];
const doctors = ["Dr. Smith", "Dr. Adams", "Dr. Clark", "Dr. Lewis"];
const reasons = [
  "Checkup",
  "Dental Cleaning",
  "Consultation",
  "Follow-up",
  "Vaccination",
  "Therapy",
];

// Génération aléatoire de 25 appointments
const generateMockAppointments = (): Appointment[] => {
  const appointments: Appointment[] = [];
  for (let i = 1; i <= 25; i++) {
    const patient = patients[Math.floor(Math.random() * patients.length)];
    const doctor = doctors[Math.floor(Math.random() * doctors.length)];
    const reason = reasons[Math.floor(Math.random() * reasons.length)];
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 10)); // dans les 10 prochains jours
    const hour = 9 + Math.floor(Math.random() * 8); // entre 9h et 16h
    const minute = Math.random() < 0.5 ? "00" : "30";
    const statusOptions: Appointment["status"][] = [
      "pending",
      "confirmed",
      "rejected",
      "canceled",
    ];
    const status =
      statusOptions[Math.floor(Math.random() * statusOptions.length)];

    appointments.push({
      id: i,
      patient,
      doctor,
      reason,
      date: date.toISOString().split("T")[0],
      time: `${hour}:${minute}`,
      status,
    });
  }
  return appointments;
};

const mockAppointments = generateMockAppointments();

const TicketsTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "orange";
      case "confirmed":
        return "green";
      case "rejected":
        return "red";
      case "canceled":
        return "gray";
      default:
        return "black";
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 370 }}>
        <Table stickyHeader aria-label="appointments table">
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
            </TableRow>
          </TableHead>
          <TableBody>
            {mockAppointments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{
                          color:
                            column.id === "status"
                              ? getStatusColor(value)
                              : "inherit",
                        }}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={mockAppointments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TicketsTable;
