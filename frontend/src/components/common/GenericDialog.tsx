import React from "react";
import Dialog, { type DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { type TransitionProps } from "@mui/material/transitions";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
// ----------------------------------------------------------------------------//
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
        fullScreen={fullScreen}
        slots={{ transition: Transition }}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              width: "100%",
              maxWidth: 800,
              borderRadius: 3,
              bgcolor: "background.paper",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            },
          },
        }}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        {...dialogProps}
      >
        {title && (
          <DialogTitle
            sx={{
              bgcolor: "background.paper",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            {title}
          </DialogTitle>
        )}
        <DialogContent
          sx={{
            bgcolor: "background.paper",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          {children}
        </DialogContent>
        {actions !== undefined ? (
          <>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              {typeof actions === "function" ? actions(handleClose) : actions}
            </DialogActions>
          </>
        ) : (
          <DialogActions
            sx={{
              bgcolor: "background.paper",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default GenericDialog;
