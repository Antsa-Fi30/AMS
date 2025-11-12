import {
  Box,
  Typography,
  List,
  ListItem,
  Chip,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { useGetAppointmentsQuery } from "../../../services/AppointmentServices";
import ConfirmFinishedDialog from "./ConfirmFinishedDialog";
import {
  formatDateForBackend,
  // formatDateToLocalString,
} from "../../../utils/Formats";
import DetailsDialog from "../../common/DetailsDialog";
import EmptyData from "../../common/EmptyData";
import { getStatusColor } from "../../../utils/getColor";

export const TodayAppointments = () => {
  const { data, isLoading } = useGetAppointmentsQuery();
  console.log(data);
  const today = new Date();
  const currentHour = new Date().getHours();
  const appointments =
    data.results.filter((ticket) => {
      if (ticket.status !== "confirmed" || ticket.finished) return false;
      if (ticket.date !== formatDateForBackend(today)) return false;
      if (!ticket.time) return false;
      const ticketHour = new Date(ticket.date).getHours();
      return currentHour > ticketHour;
    }) ?? [];

  console.log(currentHour);

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
            height: 494,
            maxHeight: 494,
            overflowY: "auto",
            scrollPadding: 0,
            scrollbarGutter: "stable",

            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f8fafc",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#cbd5e1",
              borderRadius: "3px",
              "&:hover": {
                background: "#94a3b8",
              },
            },

            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e1 #f8fafc",
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
                  px: 2,
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
                <DetailsDialog target={appointment} />
                <ConfirmFinishedDialog appointment={appointment} />
              </ListItem>
            ))
          ) : (
            <Box
              sx={{
                height: 494,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EmptyData
                title="Aucun rendez-vous pour aujourd'hui"
                hint="Les rendez-vous confirmés qui ne sont pas terminés sont affichés ici"
              />
            </Box>
          )}
        </List>
      )}
    </Box>
  );
};
