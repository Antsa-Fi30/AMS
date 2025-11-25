import React, { useEffect, useState, type SetStateAction } from "react";
import {
  Box,
  Stack,
  // TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import AppointmentCreator from "./AppointmentCreator";
import {
  lastAppointment,
  type Appointments,
} from "../../../services/AppointmentServices";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import { useTranslation } from "react-i18next";

interface HeaderClientsProps {
  state: string;
  client?: boolean;
  set: React.Dispatch<SetStateAction<string>>;
}

const Header: React.FC<HeaderClientsProps> = ({ state, set, client }) => {
  const { showSnackbar } = useSnackbar();
  const [lastApt, setLastApt] = useState<Appointments | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchLastAppointment = async () => {
      try {
        const data = await lastAppointment();
        setLastApt(data);
      } catch (error) {
        console.error(error);
        showSnackbar("Aucun rendez-vous précédent trouvé.", "info");
        setLastApt(null);
      }
    };

    fetchLastAppointment();
  }, []);

  const handleFilter = (
    _: React.MouseEvent<HTMLElement>,
    newFilter: string
  ) => {
    if (newFilter !== null) {
      set(newFilter);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={3}
    >
      {/* Barre d’actions */}
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Recherche */}
        {/* <TextField size="small" placeholder="Rechercher..." /> */}

        {/* Filtres */}
        <ToggleButtonGroup
          value={state}
          exclusive
          onChange={handleFilter}
          size="small"
        >
          <ToggleButton value="all">{t("tickets.btn1")}</ToggleButton>
          <ToggleButton value="pending">⏳ {t("tickets.btn2")}</ToggleButton>
          <ToggleButton value="confirmed">✅ {t("tickets.btn3")}</ToggleButton>
          <ToggleButton value="rejected">❌ {t("tickets.btn4")}</ToggleButton>
          <ToggleButton value="canceled">💥 {t("tickets.btn5")}</ToggleButton>
        </ToggleButtonGroup>

        {/* Action */}
        {client && (
          <AppointmentCreator
            lastApt={lastApt ? lastApt : ({} as Appointments)}
            setLastApt={setLastApt}
          />
        )}
      </Stack>
    </Box>
  );
};

export default Header;
