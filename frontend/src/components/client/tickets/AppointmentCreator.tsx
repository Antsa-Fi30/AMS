import {
  Alert,
  Button,
  CircularProgress,
  Snackbar,
  Tooltip,
} from "@mui/material";
import GenericDialog from "../../common/GenericDialog";
import AddIcon from "@mui/icons-material/Add";
import { Send } from "@mui/icons-material";
import {
  useAddAppointmentMutation,
  type DescriptionType,
} from "../../../services/AppointmentServices";
import { useState } from "react";
import SymptomFormStepper from "./SymptomFormStepper";

const AppointmentCreator: React.FC = () => {
  const [addAppointment, { isLoading }] = useAddAppointmentMutation();
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); // ✅ mini state, juste pour le bouton

  const handleSubmitDescriptions = async (descriptions: DescriptionType) => {
    const user = sessionStorage.getItem("user");
    const patient = user ? JSON.parse(user).id : null;

    await addAppointment({
      reason: undefined, // auto généré côté backend
      descriptions,
      patient,
      doctor: 7,
    }).unwrap();

    setOpenSuccess(true);
    setOpenDialog(false);
  };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const form = event.currentTarget;
  //   const data = new FormData(form);
  //   const reason = data.get("reason")?.toString() ?? undefined;
  //   const user = sessionStorage.getItem("user");
  //   const patient = user ? JSON.parse(user).id : null;

  //   // const descriptionsData = {
  //   //   symptoms: ["headache", "nausea", "tiredness"],
  //   //   severity: "mild",
  //   //   detectedBy: "AI Symptom Analyzer",
  //   // };

  //   try {
  //     await addAppointment({
  //       reason,
  //       // descriptions: [],
  //       patient,
  //       doctor: 7,
  //     }).unwrap();
  //     setOpenSuccess(true);
  //     setOpenDialog(false);
  //     form.reset(); // ✅ réinitialise les champs
  //     setIsFormValid(false); // remet le bouton inactif
  //   } catch (err) {
  //     console.error("Erreur lors de la création :", err);
  //     setOpenError(true);
  //   }
  // };

  return (
    <>
      <GenericDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Create your appointment here"
        renderTrigger={() => (
          <Tooltip title="Accept appointment">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Prendre rendez-vous
            </Button>
          </Tooltip>
        )}
        actions={() => (
          <Button
            form="appointment-form"
            type="submit"
            variant="contained"
            color="success"
            disabled={isLoading || !isFormValid} // ✅ désactivé si formulaire invalide
          >
            {isLoading ? (
              <>
                Sending <CircularProgress size={20} sx={{ ml: 1 }} />
              </>
            ) : (
              <>
                Send <Send sx={{ ml: 1 }} />
              </>
            )}
          </Button>
        )}
      >
        <SymptomFormStepper onSubmit={handleSubmitDescriptions} />
      </GenericDialog>

      {/* Success Snackbar */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => setOpenSuccess(false)}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setOpenSuccess(false)}
          sx={{ width: "100%" }}
        >
          Appointment created successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={() => setOpenError(false)}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setOpenError(false)}
          sx={{ width: "100%" }}
        >
          Failed to create appointment.
        </Alert>
      </Snackbar>
    </>
  );
};

export default AppointmentCreator;
