import GenericDialog from "../../common/GenericDialog";
import {
  Box,
  Button,
  CircularProgress,
  DialogContentText,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { formatTimeToLocalString } from "../../../utils/Formats";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import {
  useAddDispoMutation,
  useGetDisposQuery,
  type DisponibilityResults,
} from "../../../services/DisponibilityServices";
import { Check } from "@mui/icons-material";

const isOverlapping = (
  newStart: Date,
  newEnd: Date,
  existingSlots: DisponibilityResults[]
) => {
  return existingSlots.some((slot) => {
    const slotStart = new Date(slot.start_time);
    const slotEnd = new Date(slot.end_time);
    return newStart < slotEnd && newEnd > slotStart;
  });
};

const DispoForms = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const { showSnackbar } = useSnackbar();

  const [addDispo, { isLoading }] = useAddDispoMutation();
  const { data } = useGetDisposQuery();

  const handleConfirm = async (close: () => void) => {
    try {
      const user = sessionStorage.getItem("user");
      const parsedUser = user ? JSON.parse(user) : [];

      if (!startTime || !endTime) {
        alert("Veuillez choisir une date et une heure.");
        return;
      }

      if (endTime <= startTime) {
        showSnackbar(
          "L'heure de fin doit être après l'heure de début",
          "error"
        );
      }

      if (isOverlapping(startTime, endTime, data?.results ?? [])) {
        showSnackbar("Ce créneau existe déjà ou chevauche un autre !", "error");
      }

      const disponibility = {
        start_time: formatTimeToLocalString(startTime),
        end_time: formatTimeToLocalString(endTime),
        doctor: parsedUser.id,
      };

      await addDispo(disponibility).unwrap();

      showSnackbar("Appointment updated successfully!", "success");
    } catch (err) {
      console.error(err);
      showSnackbar("Something went wrong, check console", "error");
    } finally {
      setStartTime(null);
      setEndTime(null);
      close();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <GenericDialog
        title={`Create`}
        renderTrigger={(open) => (
          <Button color="primary" variant="contained" onClick={open}>
            Creer un creneaux de disponibilité;
          </Button>
        )}
        actions={(close) => (
          <Button
            variant="contained"
            color="success"
            onClick={() => handleConfirm(close)}
            disabled={!startTime || !endTime || isLoading}
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
        <Stack textAlign={"center"} alignItems="center" p={2}>
          <DialogContentText>
            Define the date and the time for the meetings down below
          </DialogContentText>
          <Box width={400} maxWidth={400}>
            <Stack justifyContent={"center"} spacing={3} sx={{ pt: 2 }}>
              <TimePicker
                label="Choisir l'heure de début"
                value={startTime}
                format="HH:mm"
                onChange={(newValue) => setStartTime(newValue)}
                ampm={false}
              />
              <TimePicker
                label="Choisir l'heure de fin"
                value={endTime}
                format="HH:mm"
                onChange={(newValue) => setEndTime(newValue)}
                ampm={false}
                minTime={startTime ?? undefined}
              />
            </Stack>
          </Box>
        </Stack>
      </GenericDialog>
    </LocalizationProvider>
  );
};

export default DispoForms;
