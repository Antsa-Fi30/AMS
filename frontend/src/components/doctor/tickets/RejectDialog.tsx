import React from "react";
import GenericDialog from "../../common/GenericDialog";
import {
  Button,
  CircularProgress,
  DialogContentText,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useUpdateAppointmentsMutation } from "../../../services/AppointmentServices";
import { useSnackbar } from "../../../contexts/SnackbarContext";

interface RejectDialogProps {
  client: string;
  id: number;
}

const RejectDialog: React.FC<RejectDialogProps> = ({ client, id }) => {
  const { showSnackbar } = useSnackbar();
  const [updateAppointments, { isLoading, error }] =
    useUpdateAppointmentsMutation();

  const handleConfirm = async (close: () => void, id: number) => {
    try {
      await updateAppointments({ id, status: "rejected" }).unwrap();

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
        title={`${client} 's appointment ticket`}
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
            onClick={() => handleConfirm(close, id)}
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
        <DialogContentText id="alert-dialog-slide-description">
          {`${client}`} will be notified about the rejection by SMS
        </DialogContentText>
      </GenericDialog>
    </>
  );
};

export default RejectDialog;
