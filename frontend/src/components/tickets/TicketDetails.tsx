import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Avatar,
  Chip,
  Button,
  //   Divider,
  Grid,
} from "@mui/material";
import {
  Check,
  Close,
  CalendarMonth,
  AccessTime,
  //   Person,
} from "@mui/icons-material";

export const TicketDetails = ({
  open,
  onClose,
  ticket,
  onConfirm,
  onReject,
}) => {
  if (!ticket) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Détails du ticket #{ticket.id}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          {/* Informations patient */}
          <Grid size={12}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ mr: 2, width: 60, height: 60 }}>
                {ticket.avatar}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {ticket.patient}
                </Typography>
                <Typography color="text.secondary">{ticket.email}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <CalendarMonth color="action" sx={{ mr: 1 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Date demandée
                </Typography>
                <Typography fontWeight="medium">
                  {ticket.requestedDate}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <AccessTime color="action" sx={{ mr: 1 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Heure demandée
                </Typography>
                <Typography fontWeight="medium">
                  {ticket.requestedTime}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={12}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Type de consultation
              </Typography>
              <Typography fontWeight="medium">{ticket.type}</Typography>
            </Box>
          </Grid>

          <Grid size={6}>
            <Chip
              label={`Priorité: ${ticket.priority}`}
              color={
                ticket.priority === "Élevée"
                  ? "error"
                  : ticket.priority === "Normale"
                  ? "warning"
                  : "success"
              }
            />
          </Grid>

          <Grid size={6}>
            <Chip
              label={
                ticket.status === "pending"
                  ? "En attente"
                  : ticket.status === "confirmed"
                  ? "Confirmé"
                  : "Refusé"
              }
              color={
                ticket.status === "pending"
                  ? "warning"
                  : ticket.status === "confirmed"
                  ? "success"
                  : "error"
              }
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button startIcon={<Close />} onClick={onClose} color="inherit">
          Fermer
        </Button>
        {ticket.status === "pending" && (
          <>
            <Button
              startIcon={<Close />}
              onClick={() => onReject(ticket.id)}
              color="error"
              variant="outlined"
            >
              Refuser
            </Button>
            <Button
              startIcon={<Check />}
              onClick={() => onConfirm(ticket.id)}
              color="success"
              variant="contained"
            >
              Confirmer
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
