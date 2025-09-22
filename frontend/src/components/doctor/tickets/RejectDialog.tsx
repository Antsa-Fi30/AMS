import React from "react";
import GenericDialog from "../../common/GenericDialog";
import { Button, DialogContentText, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
interface RejectDialogProps {
  client: string;
}

const RejectDialog: React.FC<RejectDialogProps> = ({ client }) => {
  return (
    <>
      <GenericDialog
        title={`${client} 's appointment ticket`}
        renderTrigger={(open) => (
          <IconButton aria-label="decline" size="small" onClick={open}>
            <Close />
          </IconButton>
        )}
        actions={(close) => (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              console.log("Rejected");
              close();
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
