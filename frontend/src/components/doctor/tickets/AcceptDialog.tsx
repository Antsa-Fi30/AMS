import React from "react";
import GenericDialog from "../../common/GenericDialog";
import {
  Button,
  CircularProgress,
  DialogContentText,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { Check, Done } from "@mui/icons-material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  type AppointmentType,
  useUpdateAppointmentsMutation,
} from "../../../services/AppointmentServices";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import {
  combineDateAndTime,
  formatDateToLocalString,
  formatTimeToLocalString,
} from "../../../utils/Formats";

interface AcceptDialogProps {
  appointment: AppointmentType;
  client: string;
  id: number;
}

const AcceptDialog: React.FC<AcceptDialogProps> = ({ client, appointment }) => {
  const [date, setDate] = React.useState<Date | null>(null);
  const [expireDate, setExpireDate] = React.useState<Date | null>(null);
  const [time, setTime] = React.useState<Date | null>(null);
  const { showSnackbar } = useSnackbar();

  const [updateAppointments, { isLoading, error }] =
    useUpdateAppointmentsMutation();

  const handleConfirm = async (close: () => void) => {
    try {
      if (!date || !time) {
        alert("Veuillez choisir une date et une heure.");
        return;
      }

      const finalDate = combineDateAndTime(date, time);

      const updatedData = {
        ...appointment,
        date: formatDateToLocalString(finalDate),
        time: formatTimeToLocalString(finalDate),
        expire: expireDate ? formatDateToLocalString(expireDate) : null,
        status: "confirmed",
      };

      await updateAppointments(updatedData).unwrap();

      showSnackbar("Appointment updated successfully!", "success");
    } catch (err) {
      console.error(err);
      showSnackbar(error?.data.detail, "error");
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
            disabled={!date || !time || isLoading}
          >
            {isLoading ? (
              <>
                <CircularProgress color="primary" size="30px" /> <Check />
              </>
            ) : (
              "Confirm"
            )}
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
              format="HH:mm"
              onChange={(newValue) => setTime(newValue)}
              ampm={false}
            />

            <DatePicker
              label="Choisir l'expiration du ticket"
              value={expireDate}
              onChange={(newValue) => setExpireDate(newValue)}
            />
          </Stack>
        </Stack>
      </GenericDialog>
    </LocalizationProvider>
  );
};

export default AcceptDialog;
