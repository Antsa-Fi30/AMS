import { Check } from "@mui/icons-material";
import { Button, CircularProgress, DialogContentText } from "@mui/material";
import { useDeleteAllDispoMutation } from "../../../services/DisponibilityServices";
import { useSnackbar } from "../../../contexts/SnackbarContext";

import GenericDialog from "../../common/GenericDialog";

const ConfirmDeleteAll = () => {
  const [deleteAllDispo, { isLoading: isDeleting }] =
    useDeleteAllDispoMutation();
  const { showSnackbar } = useSnackbar();

  const handleConfirm = async (close: () => void) => {
    try {
      const data = await deleteAllDispo().unwrap();
      console.log(data);
      showSnackbar(
        "Tous les créneaux ont été supprimés ✅ : " + data.detail,
        "success"
      );
    } catch (error) {
      showSnackbar(
        "Erreur lors de la suppression ❌  " + error.data.detail,
        "error"
      );
    } finally {
      close();
    }
  };
  return (
    <GenericDialog
      title={`Delete all appointments`}
      renderTrigger={(open) => (
        <Button
          color="error"
          variant="contained"
          onClick={open}
          disabled={isDeleting}
        >
          Supprimer tous les creneaux
        </Button>
      )}
      actions={(close) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => handleConfirm(close)}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <CircularProgress color="primary" size="30px" /> <Check />
            </>
          ) : (
            "Oui"
          )}
        </Button>
      )}
    >
      <DialogContentText>
        Voulez-vous supprimer tous les creneaux?
      </DialogContentText>
    </GenericDialog>
  );
};

export default ConfirmDeleteAll;
