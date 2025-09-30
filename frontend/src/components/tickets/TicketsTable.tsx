import { useState } from "react";
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
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreVert, Check, Close, Visibility } from "@mui/icons-material";

export const TicketsTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const tickets = [
    {
      id: "TKT-001",
      patient: "Jean Rabe",
      email: "jean.rabe@example.com",
      type: "Consultation dentaire",
      requestedDate: "15 Nov 2024",
      requestedTime: "14:30",
      priority: "Normal",
      status: "pending",
      avatar: "JR",
    },
    {
      id: "TKT-002",
      patient: "Marie Andry",
      email: "marie.andry@example.com",
      type: "Urgence",
      requestedDate: "15 Nov 2024",
      requestedTime: "15:00",
      priority: "Élevée",
      status: "pending",
      avatar: "MA",
    },
    {
      id: "TKT-003",
      patient: "Paul Razafy",
      email: "paul.razafy@example.com",
      type: "Contrôle annuel",
      requestedDate: "16 Nov 2024",
      requestedTime: "09:00",
      priority: "Normal",
      status: "confirmed",
      avatar: "PR",
    },
    {
      id: "TKT-004",
      patient: "Sophie Rajaona",
      email: "sophie.rajaona@example.com",
      type: "Soin",
      requestedDate: "16 Nov 2024",
      requestedTime: "11:30",
      priority: "Normale",
      status: "rejected",
      avatar: "SR",
    },
  ];

  const handleMenuOpen = (event, ticket) => {
    setAnchorEl(event.currentTarget);
    setSelectedTicket(ticket);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTicket(null);
  };

  const handleConfirm = (ticketId) => {
    console.log("Confirmer le ticket:", ticketId);
    handleMenuClose();
  };

  const handleReject = (ticketId) => {
    console.log("Refuser le ticket:", ticketId);
    handleMenuClose();
  };

  const handleViewDetails = (ticketId) => {
    console.log("Voir détails:", ticketId);
    handleMenuClose();
  };

  const getStatusColor = (status) => {
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Élevée":
        return "error";
      case "Normale":
        return "warning";
      case "Basse":
        return "success";
      default:
        return "default";
    }
  };

  return (
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
            tickets.filter((t) => t.status === "pending").length
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
              <TableCell>Type</TableCell>
              <TableCell>Date demandée</TableCell>
              <TableCell>Priorité</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
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
                    <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                      {ticket.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {ticket.patient}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {ticket.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{ticket.type}</Typography>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {ticket.requestedDate}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {ticket.requestedTime}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={ticket.priority}
                    color={getPriorityColor(ticket.priority)}
                    size="small"
                  />
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
                  {ticket.status === "pending" ? (
                    <Box
                      sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                    >
                      <IconButton
                        color="success"
                        size="small"
                        onClick={() => handleConfirm(ticket.id)}
                      >
                        <Check />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleReject(ticket.id)}
                      >
                        <Close />
                      </IconButton>
                    </Box>
                  ) : (
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={(e) => handleMenuOpen(e, ticket)}
                    >
                      <MoreVert />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Menu contextuel */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleViewDetails(selectedTicket?.id)}>
          <Visibility sx={{ mr: 1 }} fontSize="small" />
          Voir détails
        </MenuItem>
        <MenuItem onClick={() => handleConfirm(selectedTicket?.id)}>
          <Check sx={{ mr: 1 }} fontSize="small" />
          Confirmer
        </MenuItem>
        <MenuItem onClick={() => handleReject(selectedTicket?.id)}>
          <Close sx={{ mr: 1 }} fontSize="small" />
          Refuser
        </MenuItem>
      </Menu>
    </Box>
  );
};
