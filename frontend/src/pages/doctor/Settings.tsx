import React, { useEffect, useState } from "react";
import { Box, Typography, Switch, Button, TextField } from "@mui/material";
import axiosInstance from "../../services/AxiosInstance";
import { useSnackbar } from "../../contexts/SnackbarContext";

interface Preferences {
  theme: "light" | "dark";
  language: string;
  notifications: {
    sms: boolean;
    email: boolean;
  };
}

const Settings = () => {
  const { showSnackbar } = useSnackbar();
  const [preferences, setPreferences] = useState<Preferences>({
    theme: "light",
    language: "fr",
    notifications: { sms: true, email: false },
  });
  const user = sessionStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : [];

  // Charger les paramètres de l'utilisateur
  useEffect(() => {
    axiosInstance.get("user_settings/").then((res) => {
      if (res.data?.preferences) setPreferences(res.data.preferences);
    });
  }, []);

  // Sauvegarde
  const handleSave = async () => {
    try {
      await axiosInstance.patch(`user_settings/${parsedUser.id}/`, {
        preferences,
      });
      showSnackbar("Paramètres sauvegardés !", "success");
    } catch (err) {
      showSnackbar("Erreur lors de la sauvegarde", "error");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        ⚙️ Paramètres personnels
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography>Thème sombre</Typography>
        <Switch
          checked={preferences.theme === "dark"}
          onChange={(e) =>
            setPreferences((p) => ({
              ...p,
              theme: e.target.checked ? "dark" : "light",
            }))
          }
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography>Langue</Typography>
        <TextField
          select
          SelectProps={{ native: true }}
          value={preferences.language}
          onChange={(e) =>
            setPreferences((p) => ({ ...p, language: e.target.value }))
          }
        >
          <option value="fr">Français</option>
          <option value="en">Anglais</option>
        </TextField>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography>Notifications SMS</Typography>
        <Switch
          checked={preferences.notifications.sms}
          onChange={(e) =>
            setPreferences((p) => ({
              ...p,
              notifications: { ...p.notifications, sms: e.target.checked },
            }))
          }
        />
      </Box>

      <Button variant="contained" onClick={handleSave}>
        Sauvegarder
      </Button>
    </Box>
  );
};

export default Settings;
