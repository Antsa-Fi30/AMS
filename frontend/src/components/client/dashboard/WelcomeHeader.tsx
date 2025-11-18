import { Box, Typography, Chip, Skeleton } from "@mui/material";
import { WavingHand } from "@mui/icons-material";
import { useGetAppointmentsQuery } from "../../../services/AppointmentServices";
import { formatDateToLocalString } from "../../../utils/Formats";
//38 29 258 87
export const WelcomeHeader = () => {
  const { data, isLoading } = useGetAppointmentsQuery();
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Bonjour"
      : currentHour < 18
      ? "Bon après-midi"
      : "Bonsoir";
  const user = sessionStorage.getItem("user");
  const name = user ? JSON.parse(user).name : "";

  const nextAppointment = data?.results
    .filter((a) => a.status === "confirmed" && !a.finished)
    ?.sort(
      (a, b) =>
        (a.date ? new Date(a.date).getTime() : 0) -
        (b.date ? new Date(b.date).getTime() : 0)
    )[0];

  const now = new Date();
  const target = nextAppointment?.date ? new Date(nextAppointment.date) : null;
  if (target) {
    target.setHours(0, 0, 0, 0);
  }
  now.setHours(0, 0, 0, 0);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
      }}
    >
      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {greeting}, {name} <WavingHand sx={{ color: "#FFB74D" }} />
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Gérez vos rendez-vous médicaux en toute simplicité
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {nextAppointment && (
          <Chip
            label={`Prochain RDV: ${
              target === now ? "Aujourd'hui" : formatDateToLocalString(target)
            } ${nextAppointment?.type === "".time}`}
            color="primary"
            variant="outlined"
          />
        )}
      </Box>
    </Box>
  );
};
