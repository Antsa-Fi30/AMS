import { Box, Typography } from "@mui/material";
import { MedicalServices } from "@mui/icons-material";

export const WelcomeHeaderDoctor = () => {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Bonjour Docteur"
      : currentHour < 18
      ? "Bon après-midi Docteur"
      : "Bonsoir Docteur";

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
          {greeting}, Dr. Rakoto{" "}
          <MedicalServices sx={{ color: "primary.main", ml: 1 }} />
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Cabinet Dentaire - Votre journée de consultation
        </Typography>
      </Box>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip 
          label="5 patients en attente" 
          color="warning" 
          variant="outlined"
        />
        <Button variant="outlined" startIcon={<Notifications />}>
          Alertes
        </Button>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          DR
        </Avatar>
      </Box> */}
    </Box>
  );
};
