import React from "react";
import GenericDialog from "../common/GenericDialog";
import {
  Button,
  CircularProgress,
  DialogContentText,
  FormControl,
  FormLabel,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import {
  useUpdateAppointmentsMutation,
  type AppointmentType,
} from "../../services/AppointmentServices";
import { useSnackbar } from "../../contexts/SnackbarContext";

interface RejectDialogProps {
  appointment: AppointmentType;
  client?: boolean;
}

const RejectDialog: React.FC<RejectDialogProps> = ({ appointment, client }) => {
  const [notes, setNotes] = React.useState<string>("");
  const { showSnackbar } = useSnackbar();
  const [updateAppointments, { isLoading, error }] =
    useUpdateAppointmentsMutation();

  const handleConfirm = async (close: () => void, id: number) => {
    try {
      if (!client) {
        await updateAppointments({
          id,
          status: "rejected",
          finished: true,
          notes,
        }).unwrap();
      } else {
        await updateAppointments({
          id,
          status: "canceled",
          finished: true,
        }).unwrap();
      }

      showSnackbar("Appointment updated successfully!", "success");
    } catch (err) {
      console.error(err);
      showSnackbar(error?.data.detail, "error");
    } finally {
      close();
    }
  };
  return (
    <>
      <GenericDialog
        title={`${appointment.patient_name} 's appointment ticket`}
        renderTrigger={(open) => (
          <Tooltip title="Reject appointment">
            <IconButton aria-label="decline" size="small" onClick={open}>
              <Close />
            </IconButton>
          </Tooltip>
        )}
        actions={(close) => (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleConfirm(close, appointment.id)}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <CircularProgress size={18} sx={{ mr: 1 }} />
                Rejecting...
              </>
            ) : (
              "Reject"
            )}
          </Button>
        )}
      >
        <DialogContentText id="alert-dialog-slide-description">
          You really want to reject this appointment?
        </DialogContentText>
        {client ? (
          <Typography>
            <strong>{`Dr ${appointment.doctor_name}`}</strong> will be notified
            about this appointment cancelled by SMS
          </Typography>
        ) : (
          <DialogContentText id="alert-dialog-slide-description">
            {`${appointment.patient_name}`} will be notified about the rejection
            by SMS
          </DialogContentText>
        )}
        {!client && (
          <>
            <FormControl fullWidth>
              <FormLabel htmlFor="notes">
                Do you want to notice this reject?
              </FormLabel>

              <TextField
                id="notes"
                name="notes"
                type="text"
                multiline
                required
                placeholder="Type here..."
                fullWidth
                color="primary"
                variant="standard"
                value={notes}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => setNotes(e.target.value)}
              />
            </FormControl>
          </>
        )}
      </GenericDialog>
    </>
  );
};

export default RejectDialog;
