import React from "react";
import Dialog, { type DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { type TransitionProps } from "@mui/material/transitions";
import Button from "@mui/material/Button";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

interface GenericDialogProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  actions?: (close: () => void) => React.ReactNode;
  renderTrigger?: (open: () => void) => React.ReactNode;
  dialogProps?: DialogProps;
  open?: boolean;
  onClose?: () => void;
}

const GenericDialog: React.FC<GenericDialogProps> = ({
  title,
  children,
  actions,
  renderTrigger,
  dialogProps,
  open: controlledOpen,
  onClose: controlledOnClose,
}) => {
  const [open, setOpen] = React.useState(false);
  const isControlled = typeof controlledOpen === "boolean";

  const handleOpen = () => {
    if (!isControlled) setOpen(true);
  };

  const handleClose = () => {
    if (isControlled) {
      controlledOnClose?.();
    } else {
      setOpen(false);
    }
  };

  const visible = isControlled ? controlledOpen! : open;

  return (
    <>
      {renderTrigger && renderTrigger(handleOpen)}

      <Dialog
        open={visible}
        onClose={handleClose}
        slots={{ transition: Transition }}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        {...dialogProps}
      >
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>{children}</DialogContent>
        {actions !== undefined ? (
          <>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              {typeof actions === "function" ? actions(handleClose) : actions}
            </DialogActions>
          </>
        ) : (
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default GenericDialog;
