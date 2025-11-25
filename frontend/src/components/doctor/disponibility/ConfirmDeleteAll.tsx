import { Check } from "@mui/icons-material";
import { Button, CircularProgress, DialogContentText } from "@mui/material";
import { useDeleteAllDispoMutation } from "../../../services/DisponibilityServices";
import { useSnackbar } from "../../../contexts/SnackbarContext";

import GenericDialog from "../../common/GenericDialog";
import { useTranslation } from "react-i18next";

const ConfirmDeleteAll = () => {
  const [deleteAllDispo, { isLoading: isDeleting }] =
    useDeleteAllDispoMutation();
  const { showSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const handleConfirm = async (close: () => void) => {
    try {
      const data = await deleteAllDispo().unwrap();
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
          {t("disponibility.btn3")}
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
            t("disponibility.btn3_1")
          )}
        </Button>
      )}
    >
      <DialogContentText>{t("disponibility.btn3_2")}</DialogContentText>
    </GenericDialog>
  );
};

export default ConfirmDeleteAll;
