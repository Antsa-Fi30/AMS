import { Card, CardContent, Box } from "@mui/material";
import HistoryDialog from "./HistoryDialog";
import AppointmentCreator from "../tickets/AppointmentCreator";
import { useEffect, useState } from "react";
import {
  lastAppointment,
  type Appointments,
} from "../../../services/AppointmentServices";
import { useSnackbar } from "../../../contexts/SnackbarContext";

export const QuickActions = () => {
  const [lastApt, setLastApt] = useState<Appointments | null>(null);
  const { showSnackbar } = useSnackbar();
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
  return (
    <Card elevation={2} sx={{ height: "100%", borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <HistoryDialog />
          <AppointmentCreator
            lastApt={lastApt ? lastApt : ({} as Appointments)}
            setLastApt={setLastApt}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
