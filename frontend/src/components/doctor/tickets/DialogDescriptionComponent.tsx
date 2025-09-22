import DialogContentText from "@mui/material/DialogContentText";
import { IconButton } from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import GenericDialog from "../../common/GenericDialog";

interface DialogComponentProps {
  description: string;
  client: string;
}

const DialogDescriptionComponent: React.FC<DialogComponentProps> = ({
  description,
  client,
}) => {
  return (
    <>
      <GenericDialog
        title={`${client} 's symptoms description`}
        renderTrigger={(open) => (
          <IconButton aria-label="accept" size="small" onClick={open}>
            <RemoveRedEye />
          </IconButton>
        )}
      >
        <DialogContentText id="alert-dialog-slide-description">
          {description}
        </DialogContentText>
      </GenericDialog>
    </>
  );
};

export default DialogDescriptionComponent;
