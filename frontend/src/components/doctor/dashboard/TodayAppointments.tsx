import {
  Box,
  Typography,
  List,
  ListItem,
  Chip,
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { AccessTime, Cancel } from "@mui/icons-material";
import { useGetAppointmentsQuery } from "../../../services/AppointmentServices";

export const TodayAppointments = () => {
  const { data, isLoading } = useGetAppointmentsQuery();
  const appointments =
    data?.filter((ticket) => ticket.status === "confirmed") ?? [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <AccessTime color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight="bold">
          Rendez-vous d'aujourd'hui
        </Typography>
      </Box>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <List
          sx={{
            p: 0,
            height: 500,
            maxHeight: 500,
            overflowY: "auto",
            scrollPadding: 0,
            scrollbarGutter: "stable",
          }}
        >
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <ListItem
                key={appointment.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  py: 2,
                  px: 0,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  "&:last-child": { borderBottom: "none" },
                }}
              >
                <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
                  {appointment.patient_name.charAt(0)}
                </Avatar>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {appointment.patient_name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {appointment.reason}
                  </Typography>
                </Box>

                <Box sx={{ textAlign: "right", mr: 2 }}>
                  <Typography variant="body2" fontWeight="medium">
                    {appointment.time}
                  </Typography>
                  <Chip
                    label={appointment.status}
                    color={getStatusColor(appointment.status)}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>

                <IconButton size="small">
                  <Cancel color="error" />
                </IconButton>
              </ListItem>
            ))
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 485,
                  color: "text.secondary",
                  py: 3,
                }}
              >
                <AccessTime sx={{ fontSize: 60, color: "grey.400", mb: 1 }} />
                <Typography variant="subtitle1" fontWeight="medium">
                  Aucun rendez-vous aujourd’hui
                </Typography>
                <Typography variant="body2">
                  Les rendez-vous confirmés s’afficheront ici.
                </Typography>
              </Box>
            </>
          )}
        </List>
      )}
    </Box>
  );
};
