import { Box, Typography, Chip, Avatar } from "@mui/material";
import { WavingHand } from "@mui/icons-material";

export const WelcomeHeader = () => {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Bonjour"
      : currentHour < 18
      ? "Bon après-midi"
      : "Bonsoir";

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
          {greeting}, Rado <WavingHand sx={{ color: "#FFB74D" }} />
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Gérez vos rendez-vous médicaux en toute simplicité
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip
          label="Prochain RDV: Aujourd'hui 14:30"
          color="primary"
          variant="outlined"
        />
        <Avatar sx={{ bgcolor: "primary.main" }}>RR</Avatar>
      </Box>
    </Box>
  );
};
