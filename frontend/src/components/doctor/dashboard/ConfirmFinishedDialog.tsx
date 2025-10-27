import React from "react";
import GenericDialog from "../../common/GenericDialog";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  CheckBoxRounded,
  CheckCircleOutline,
  Close,
} from "@mui/icons-material";
import {
  useUpdateAppointmentsMutation,
  useGetAppointmentsQuery,
  type AppointmentType,
} from "../../../services/AppointmentServices";
import { useSnackbar } from "../../../contexts/SnackbarContext";

interface ConfirmFinishedDialogProps {
  appointment: AppointmentType;
}

const ConfirmFinishedDialog: React.FC<ConfirmFinishedDialogProps> = ({
  appointment,
}) => {
  const [updateAppointments, { isLoading, error }] =
    useUpdateAppointmentsMutation();
  const { refetch } = useGetAppointmentsQuery();
  const { showSnackbar } = useSnackbar();

  const handleConfirm = async (close: () => void, id: number) => {
    try {
      await updateAppointments({
        id,
        finished: true,
      }).unwrap();
      refetch();

      showSnackbar("Appointment updated successfully!", "success");
    } catch (err) {
      console.error(err);
      showSnackbar(error?.data.detail, "error");
    } finally {
      close();
    }
  };

  return (
    <GenericDialog
      title={`${appointment.patient_name} 's appointment ticket`}
      renderTrigger={(open) => (
        <Tooltip title="Mark finished">
          <IconButton aria-label="decline" size="small" onClick={open}>
            <CheckCircleOutline color="primary" />
          </IconButton>
        </Tooltip>
      )}
      actions={(close) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleConfirm(close, appointment.id)}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <CircularProgress size={18} sx={{ mr: 1 }} />
            </>
          ) : (
            "Accept"
          )}
        </Button>
      )}
    >
      <Box>
        <Typography>Is this appointment really finished?</Typography>
        <Typography>this ticket will be deleted</Typography>
      </Box>
    </GenericDialog>
  );
};

export default ConfirmFinishedDialog;
