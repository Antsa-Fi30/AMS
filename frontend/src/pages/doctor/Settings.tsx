import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import axiosInstance from "../../services/AxiosInstance";
import { useSnackbar } from "../../contexts/SnackbarContext";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useColorScheme } from "@mui/material/styles";

interface Preferences {
  theme: "light" | "dark";
  language: string;
  notifications: {
    sms: boolean;
    email: boolean;
  };
}

const ThemeChanger: React.FC = () => {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  if (mode !== null) {
    localStorage.setItem("theme", mode);
  }
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
        minHeight: "56px",
      }}
    >
      <FormControl>
        <FormLabel id="demo-theme-toggle">Theme</FormLabel>
        <RadioGroup
          aria-labelledby="demo-theme-toggle"
          name="theme-toggle"
          row
          value={mode}
          onChange={(event) =>
            setMode(event.target.value as "system" | "light" | "dark")
          }
        >
          <FormControlLabel value="system" control={<Radio />} label="System" />
          <FormControlLabel value="light" control={<Radio />} label="Light" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

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
      showSnackbar("Erreur lors de la sauvegarde" + err, "error");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        ⚙️ Paramètres personnels
      </Typography>

      <Box sx={{ mb: 2 }}>
        <ThemeChanger />
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

      <Button
        sx={{ mr: 2 }}
        variant="contained"
        color="error"
        onClick={() => alert("clear")}
      >
        Clear notifications
      </Button>
      <Button variant="contained" onClick={handleSave}>
        Sauvegarder
      </Button>
    </Box>
  );
};

export default Settings;
