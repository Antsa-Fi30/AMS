import React from "react";
import GenericDialog from "../../common/GenericDialog";
import { Button, DialogContentText, IconButton, Tooltip } from "@mui/material";
import { Close } from "@mui/icons-material";

interface RejectDialogProps {
  client: string;
  id: number;
}

const RejectDialog: React.FC<RejectDialogProps> = ({ client, id }) => {
  const handleConfirm = async (close: () => void, id: number) => {
    try {
      console.log("❌ Rendez-vous rejeté pour l'ID :", id);
    } catch (err) {
      console.error(err);
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
            onClick={() => {
              handleConfirm(close, id);
            }}
          >
            Reject
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
