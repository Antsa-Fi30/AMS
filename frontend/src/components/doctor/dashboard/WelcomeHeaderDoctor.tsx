import { Box, Typography } from "@mui/material";
import { MedicalServices } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export const WelcomeHeaderDoctor = () => {
  const { t } = useTranslation();
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Bonjour Docteur"
      : currentHour < 18
      ? "Bon après-midi Docteur"
      : "Bonsoir Docteur";

  const user = sessionStorage.getItem("user");
  const name = user ? JSON.parse(user).name : "";

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
          {greeting}, Dr {name}
          <MedicalServices sx={{ color: "primary.main", ml: 1 }} />
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {t("home.subgreeting")}
        </Typography>
      </Box>
    </Box>
  );
};
