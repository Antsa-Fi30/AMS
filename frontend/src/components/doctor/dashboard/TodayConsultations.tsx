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
  useGetAllAppointmentsQuery,
  type Appointments,
} from "../../../services/AppointmentServices";
import ConfirmFinishedDialog from "./ConfirmFinishedDialog";
import DetailsDialog from "../../common/DetailsDialog";
import EmptyData from "../../common/EmptyData";
import { formatDateForBackend } from "../../../utils/Formats";
import { useState, useEffect } from "react"; // Ajout de useEffect
import { useTranslation } from "react-i18next";

const TodayConsultations = () => {
  const { data, isLoading } = useGetAllAppointmentsQuery();
  const [disabledButtons, setDisabledButtons] = useState<{
    [key: string]: boolean;
  }>({});
  const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({});
  const { t } = useTranslation();
  const today = new Date();

  const appointments =
    data
      ?.filter((apt) => {
        return (
          apt.status === "confirmed" &&
          !apt.finished &&
          apt.date === formatDateForBackend(today)
        );
      })
      .sort((a, b) => {
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

    // Désactiver le bouton pour cet appointment spécifique
    setDisabledButtons((prev) => ({
      ...prev,
      [apt.id]: true,
    }));

    // Démarrer le compte à rebours pour cet appointment
    setCountdowns((prev) => ({
      ...prev,
      [apt.id]: 7,
    }));
  };

  // Gérer les comptes à rebours
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns((prev) => {
        const updated = { ...prev };
        let hasChanges = false;

        for (const aptId in updated) {
          if (updated[aptId] > 0) {
            updated[aptId]--;
            hasChanges = true;

            // Quand on arrive à 0, réactiver le bouton
            if (updated[aptId] === 0) {
              setDisabledButtons((prevDisabled) => ({
                ...prevDisabled,
                [aptId]: false,
              }));
            }
          }
        }

        // Supprimer les countdowns à 0
        const filtered = Object.fromEntries(
          Object.entries(updated).filter(([, seconds]) => seconds > 0)
        );

        return hasChanges ? filtered : prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    return `00:${seconds.toString().padStart(2, "0")}`;
  };

  const nowMinutes = today.getHours() * 60 + today.getMinutes();

  const toMinutes = (t: string | null): number | null => {
    if (t !== null) {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    }
    return null;
  };

  const consulationsToday = appointments.filter((a) => {
    const start = toMinutes(a.start_time);
    const end = toMinutes(a.end_time);

    if (start == null || end == null) return false;

    return nowMinutes >= start && nowMinutes <= end;
  });

  const isInsideAnySlot = appointments.some((a) => {
    const start = toMinutes(a.start_time);
    const end = toMinutes(a.end_time);

    if (start == null || end == null) return false;

    return nowMinutes >= start && nowMinutes <= end;
  });

  if (!isInsideAnySlot) {
    return <EmptyData title={t("home.noQueue")} hint={t("home.hintNoQueue")} />;
  }

  return (
    <Box>
      {/* HEADER */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <AccessTime color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight="bold">
          File d'attente de consultations du jour
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
          {isInsideAnySlot ? (
            consulationsToday.map((appointment, index) => (
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
                      : "Appel selon file d'attente"}
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
                        disabled={disabledButtons[appointment.id] || false}
                      >
                        {disabledButtons[appointment.id]
                          ? formatTime(countdowns[appointment.id] || 0)
                          : "Appeler"}
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
              title="Aucun rendez-vous pour le moment"
              hint="Les rendez-vous confirmés apparaissent ici."
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default TodayConsultations;
