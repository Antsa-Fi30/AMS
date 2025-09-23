import React from "react";
import GenericDialog from "../../common/GenericDialog";
import {
  Button,
  DialogContentText,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { Done } from "@mui/icons-material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  updateAppointment,
  type AppointmentType,
} from "../../../services/AppointmentServices";

interface AcceptDialogProps {
  appointment: AppointmentType;
  client: string;
  id: number;
}

const AcceptDialog: React.FC<AcceptDialogProps> = ({
  client,
  id,
  appointment,
}) => {
  const [date, setDate] = React.useState<Date | null>(null);
  const [time, setTime] = React.useState<Date | null>(null);

  const handleConfirm = async (close: () => void) => {
    try {
      if (!date || !time) {
        alert("Veuillez choisir une date et une heure.");
        return;
      }

      const finalDate = new Date(date);
      finalDate.setHours(time.getHours());
      finalDate.setMinutes(time.getMinutes());

      console.log("✅ Rendez-vous accepté pour :", finalDate.toISOString());

      await updateAppointment(id, {
        ...appointment,
        date: finalDate.toISOString().split("T")[0],
        time: finalDate.toISOString().split("T")[1],
        status: "confirmed",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setTime(null);
      setDate(null);
      close();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <GenericDialog
        title={`${client} 's appointment ticket`}
        renderTrigger={(open) => (
          <Tooltip title="Accept appointment">
            <IconButton aria-label="decline" size="small" onClick={open}>
              <Done />
            </IconButton>
          </Tooltip>
        )}
        actions={(close) => (
          <Button
            variant="contained"
            color="success"
            onClick={() => handleConfirm(close)}
            disabled={!date || !time}
          >
            Accept
          </Button>
        )}
      >
        <DialogContentText>
          Define the date and the time for the meetings down below
        </DialogContentText>
        <Stack spacing={2}>
          <Stack spacing={3} sx={{ pt: 2 }}>
            <DatePicker
              label="Choisir la date"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
            <TimePicker
              label="Choisir l'heure"
              value={time}
              onChange={(newValue) => setTime(newValue)}
            />
          </Stack>
        </Stack>
      </GenericDialog>
    </LocalizationProvider>
  );
};

export default AcceptDialog;
