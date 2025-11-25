import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { CalendarMonth, AccessTime } from "@mui/icons-material";
import HistoryToggleOffRoundedIcon from "@mui/icons-material/HistoryToggleOffRounded";
import { useGetAppointmentsQuery } from "../../../services/AppointmentServices";
import DetailsDialog from "../../common/DetailsDialog";
import RejectDialog from "../../common/RejectDialog";
import EmptyData from "../../common/EmptyData";
import {
  GetDoctorDispos,
  type DisponibilityResults,
} from "../../../services/DisponibilityServices";
import { useState, useEffect } from "react";

export const NextAppointment = () => {
  const { data, isLoading, isFetching } = useGetAppointmentsQuery();

  const [dispo, setDispo] = useState<DisponibilityResults[]>([]);

  useEffect(() => {
    const fetchDispo = async () => {
      try {
        const response = await GetDoctorDispos(2);
        setDispo(response);
      } catch (error) {
        console.error("Something went wrong" + error);
      }
    };
    fetchDispo();
  }, []);

  const nextAppointment = data?.results
    .filter((a) => a.status === "confirmed" && !a.finished)
    ?.sort(
      (a, b) =>
        (a.date ? new Date(a.date).getTime() : 0) -
        (b.date ? new Date(b.date).getTime() : 0)
    )[0];

  const getDisponibility = (idDispo: number | null) => {
    const selectedDispo = dispo.find((d) => d.id === idDispo);
    return selectedDispo;
  };

  if (isLoading) {
    return <Skeleton sx={{ height: "100%", borderRadius: 3 }} />;
  }

  return (
    <Card elevation={2} sx={{ height: "100%", borderRadius: 3 }}>
      <CardContent sx={{ p: 4 }}>
        {nextAppointment ? (
          <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
            {isFetching ? (
              <CircularProgress />
            ) : (
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mr: 2 }}>
                    Dr {nextAppointment.doctor_name}
                  </Typography>
                  <Chip
                    label={nextAppointment.status}
                    color="success"
                    size="small"
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AccessTime color="action" sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {nextAppointment.type === "first"
                          ? "Creneaux"
                          : "Heure"}
                      </Typography>
                      <Typography fontWeight="medium">
                        {nextAppointment.type === "first"
                          ? `${
                              getDisponibility(nextAppointment.disponibility)
                                ?.start_time
                            } à ${
                              getDisponibility(nextAppointment.disponibility)
                                ?.end_time
                            }`
                          : `${nextAppointment.time}`}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarMonth color="action" sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Date
                      </Typography>
                      <Typography fontWeight="medium">
                        {nextAppointment.date}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gridColumn: "1 / -1",
                    }}
                  >
                    <HistoryToggleOffRoundedIcon
                      color="action"
                      sx={{ mr: 1 }}
                    />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {nextAppointment.type === "first"
                          ? "Consultation"
                          : "Control ou suivi"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                  <DetailsDialog target={nextAppointment} />
                  <RejectDialog appointment={nextAppointment} client />
                </Box>
              </Box>
            )}
          </Box>
        ) : (
          <EmptyData
            title="You don't have any appointment for now"
            hint="Your most recent appointment will appear here"
          />
        )}
      </CardContent>
    </Card>
  );
};
