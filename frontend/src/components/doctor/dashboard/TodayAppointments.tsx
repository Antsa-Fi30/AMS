import {
  Box,
  Typography,
  Chip,
  Avatar,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
} from "@mui/material";
import { AccessTime, Phone, Block } from "@mui/icons-material";
import {
  useGetAppointmentsQuery,
  type Appointments,
} from "../../../services/AppointmentServices";
import ConfirmFinishedDialog from "./ConfirmFinishedDialog";
import DetailsDialog from "../../common/DetailsDialog";
import EmptyData from "../../common/EmptyData";
// import { getStatusColor } from "../../../utils/getColor";

import { formatDateForBackend } from "../../../utils/Formats";
import { useState } from "react";

export const TodayAppointments = () => {
  const { data, isLoading } = useGetAppointmentsQuery();
  const [disable, setDisable] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(5);

  const today = new Date();

  // ---- FILTRER LES RDV DU JOUR ----//
  const appointments =
    data?.results
      .filter((apt) => {
        return (
          apt.status === "confirmed" &&
          !apt.finished &&
          apt.date === formatDateForBackend(today)
        );
      })
      .sort((a, b) => {
        // Tri du controle selon time
        if (a.type === "follow_up" && b.type === "follow_up") {
          if (a.time !== null && b.time !== null) {
            a.time.localeCompare(b.time);
          }
        }

        // Tri des consultations par requested_at asc
        if (a.type === "first") {
          return (
            new Date(a.requested_at).getTime() -
            new Date(b.requested_at).getTime()
          );
        }

        return 0;
      }) ?? [];

  const handleCall = (apt: Appointments) => {
    alert(`${apt.patient_name} , viens ici`);
    setDisable(true);
  };

  setTimeout(() => {
    setSeconds((seconds) => seconds - 1);
  }, 3000);

  return (
    <Box>
      {/* HEADER */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <AccessTime color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight="bold">
          File d’attente du jour
        </Typography>
      </Box>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            height: 494,
            overflowY: "auto",
            pr: 1,
            "&::-webkit-scrollbar": { width: 6 },
            "&::-webkit-scrollbar-thumb": {
              background: "#cbd5e1",
              borderRadius: 3,
            },
          }}
        >
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <Card
                key={appointment.id}
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                }}
              >
                <CardContent sx={{ pb: 1 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      {appointment.patient_name.charAt(0)}
                    </Avatar>

                    <Box sx={{ flexGrow: 1, pb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {appointment.patient_name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {appointment.code}
                      </Typography>
                    </Box>

                    <Chip
                      label={
                        appointment.type === "first"
                          ? "Consultation"
                          : "Contrôle"
                      }
                      color={appointment.type === "first" ? "info" : "warning"}
                      size="small"
                    />
                  </Stack>

                  {/* Heure */}
                  <Typography variant="body2" sx={{ mt: 1, py: 1 }}>
                    Heure :
                    {appointment.type === "follow_up"
                      ? appointment.time
                      : "Appel selon file d’attente"}
                  </Typography>
                </CardContent>

                {/* ACTION BUTTONS */}
                <CardActions
                  sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
                >
                  {index === 0 && (
                    <>
                      <Button
                        startIcon={<Phone />}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleCall(appointment)}
                        disabled={disable}
                      >
                        {disable ? `00:0${seconds}` : `Appeler`}
                      </Button>
                      <Button
                        startIcon={<Block />}
                        variant="outlined"
                        color="error"
                        size="small"
                      >
                        Absent
                      </Button>
                      <ConfirmFinishedDialog appointment={appointment} />
                    </>
                  )}

                  <DetailsDialog target={appointment} />
                </CardActions>
              </Card>
            ))
          ) : (
            <EmptyData
              title="Aucun rendez-vous pour aujourd’hui"
              hint="Les rendez-vous confirmés apparaissent ici."
            />
          )}
        </Box>
      )}
    </Box>
  );
};
