import React from "react";
import GenericDialog from "../../common/GenericDialog";
import {
  Box,
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
  type Appointments,
  useUpdateAppointmentsMutation,
} from "../../../services/AppointmentServices";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import {
  combineDateAndTime,
  DisableSpecificTime,
  formatDateForBackend,
  formatTimeToLocalString,
} from "../../../utils/Formats";

interface AcceptDialogProps {
  appointment: Appointments;
}

const AcceptDialog: React.FC<AcceptDialogProps> = ({ appointment }) => {
  const [date, setDate] = React.useState<Date | null>(null);
  const [time, setTime] = React.useState<Date | null>(null);
  const { showSnackbar } = useSnackbar();

  const [updateAppointments, { isLoading }] = useUpdateAppointmentsMutation();

  const handleConfirm = async (close: () => void) => {
    try {
      if (appointment.type === "follow_up") {
        if (!date || !time) {
          alert("Veuillez choisir une date et une heure.");
          return;
        }

        const finalDate = combineDateAndTime(date, time);

        const updatedData = {
          ...appointment,
          date: formatDateForBackend(finalDate),
          time: formatTimeToLocalString(finalDate),
          status: "confirmed",
        };

        await updateAppointments(updatedData).unwrap();

        showSnackbar("Appointment updated successfully!", "success");
      } else {
        const updatedDataFirstApt = {
          ...appointment,
          status: "confirmed",
        };
        await updateAppointments(updatedDataFirstApt).unwrap();
        showSnackbar("Appointment updated successfully!", "success");
      }
    } catch (err) {
      console.error(err);
      showSnackbar("Something went wrong, check console", "error");
    } finally {
      setTime(null);
      setDate(null);
      close();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {appointment.type === "first" ? (
        <>
          <GenericDialog
            title={`${appointment.patient_name} 's appointment ticket`}
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
                disabled={isLoading}
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
            <Box textAlign={"center"} p={1}>
              <DialogContentText>
                Voulez-vous vraiment confirmer cette consultation
              </DialogContentText>
            </Box>
          </GenericDialog>
        </>
      ) : (
        <>
          <GenericDialog
            title={`${appointment.patient_name} 's appointment ticket`}
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
            <Box textAlign={"center"} p={1}>
              <DialogContentText>
                Define the date and the time for the meetings down below
              </DialogContentText>
              <Stack
                spacing={2}
                justifyContent={"center"}
                alignItems="center"
                margin={"auto"}
              >
                <Stack spacing={3} sx={{ pt: 2 }}>
                  <DatePicker
                    label="Choisir la date"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    disablePast
                    format="dd/MM/yyyy"
                  />
                  <TimePicker
                    label="Choisir l'heure"
                    value={time}
                    format="HH:mm"
                    onChange={(newValue) => setTime(newValue)}
                    ampm={false}
                    disablePast={DisableSpecificTime(date)}
                  />
                </Stack>
              </Stack>
            </Box>
          </GenericDialog>
        </>
      )}
    </LocalizationProvider>
  );
};

export default AcceptDialog;
