import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  DialogContent,
  Tooltip,
  Typography,
} from "@mui/material";
import { DeleteOutline, History } from "@mui/icons-material";
import GenericDialog from "../../common/GenericDialog";
import TicketHistoryCard from "./TicketHistoryCard";

import {
  deleteAllFinished,
  useGetAppointmentsQuery,
} from "../../../services/AppointmentServices";
import { useSnackbar } from "../../../contexts/SnackbarContext";

const EraseHistory: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();
  const { refetch } = useGetAppointmentsQuery();

  const handleErase = async (close: () => void) => {
    try {
      setIsLoading(true);
      await deleteAllFinished();
      await refetch();
      showSnackbar("Appointment story clean!", "success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      showSnackbar(message, "error");
    } finally {
      setIsLoading(false);
      close();
    }
  };
  return (
    <GenericDialog
      title={`History`}
      renderTrigger={(open) => (
        <Tooltip title={"Effacer le donnee"}>
          <Button
            variant="outlined"
            startIcon={<DeleteOutline />}
            color={"info"}
            onClick={open}
            sx={{
              justifyContent: "flex-start",
              py: 1.5,
              borderRadius: 2,
            }}
          >
            Erase history
          </Button>
        </Tooltip>
      )}
      actions={(close) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleErase(close)}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <CircularProgress size={18} sx={{ mr: 1 }} />
              Cleaning...
            </>
          ) : (
            "Clean"
          )}
        </Button>
      )}
    >
      <DialogContent>
        <Typography>Do you really want to clear the story?</Typography>
      </DialogContent>
    </GenericDialog>
  );
};

const HistoryDialog: React.FC = () => {
  return (
    <GenericDialog
      title={"Confirmation de suppression de tous les tickets finis"}
      renderTrigger={(open) => (
        <Tooltip title={"Historiques"}>
          <Button
            variant="outlined"
            startIcon={<History />}
            color={"info"}
            onClick={open}
            fullWidth
            sx={{
              justifyContent: "flex-start",
              py: 1.5,
              borderRadius: 2,
            }}
          >
            Mes historiques
          </Button>
        </Tooltip>
      )}
      actions={(close) => <EraseHistory />}
    >
      <TicketHistoryCard />
    </GenericDialog>
  );
};

export default HistoryDialog;
