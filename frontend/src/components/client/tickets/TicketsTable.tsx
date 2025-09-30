import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
} from "@mui/material";
import { Cancel, RemoveRedEye } from "@mui/icons-material";

const TicketsTable = () => {
  const rows = [
    {
      id: 1,
      doctor: "Dr. Rakoto",
      reason: "Dental Checkup",
      date: "12/10/2025",
      time: "14:30",
      status: "confirmed",
    },
    {
      id: 2,
      doctor: "Dr. Ranaivo",
      reason: "Consultation",
      date: "20/10/2025",
      time: "09:00",
      status: "pending",
    },
    {
      id: 3,
      doctor: "Dr. Andry",
      reason: "Follow-up",
      date: "25/09/2025",
      time: "11:00",
      status: "rejected",
    },
  ];

  const statusColor = {
    confirmed: "success",
    pending: "warning",
    rejected: "error",
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Doctor</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.doctor}</TableCell>
                  <TableCell>{row.reason}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={statusColor[row.status]}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" size="small">
                      <RemoveRedEye />
                    </IconButton>
                    {row.status === "pending" && (
                      <IconButton color="error" size="small">
                        <Cancel />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default TicketsTable;
