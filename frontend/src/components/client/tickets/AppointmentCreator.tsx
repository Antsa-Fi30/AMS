import { Button, CircularProgress, Tooltip } from "@mui/material";
import GenericDialog from "../../common/GenericDialog";
import AddIcon from "@mui/icons-material/Add";
import { Send } from "@mui/icons-material";
import { useAddAppointmentMutation } from "../../../services/AppointmentServices";
import { useState } from "react";
import FormStepper from "./FormStepper";
import { formatDateForBackend } from "../../../utils/Formats";
import { useSnackbar } from "../../../contexts/SnackbarContext";

const AppointmentCreator: React.FC = () => {
  const [addAppointment, { isLoading }] = useAddAppointmentMutation();
  const [openDialog, setOpenDialog] = useState(false);
  const [typeApt, setTypeApt] = useState<string>("");
  const [disponibility, setDisponibility] = useState<number>(0);
  const [date, setDate] = useState<Date | null>(null);
  const { showSnackbar } = useSnackbar();

  const handleSubmitStepper = async (answers: {
    typeApt: string;
    disponibility: number | null;
  }) => {
    const user = sessionStorage.getItem("user");
    const patient = user ? JSON.parse(user).id : null;

    try {
      await addAppointment({
        type: answers.typeApt,
        disponibility: answers.disponibility,
        date: typeApt === "first" ? formatDateForBackend(date) : null,
        patient,
        doctor: 2,
      }).unwrap();
      showSnackbar("Appointment created successfully", "success");
      setOpenDialog(false);
    } catch (error) {
      console.error(error);
      showSnackbar("Something went wrong", "error");
      setOpenDialog(false);
    }
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
        onClose={() => {
          setOpenDialog(false);
          setTypeApt("");
          setDisponibility(0);
          setDate(null);
        }}
        title="Create your appointment here"
        renderTrigger={() => (
          <Tooltip title="Accept appointment">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setOpenDialog(true);
                setTypeApt("");
                setDisponibility(0);
                setDate(null);
              }}
            >
              Prendre rendez-vous
            </Button>
          </Tooltip>
        )}
        actions={() => (
          <>
            {isLoading ? (
              <>
                <CircularProgress size={20} sx={{ ml: 1 }} />
              </>
            ) : (
              <>
                <Send color="secondary" />
              </>
            )}
          </>
        )}
      >
        <FormStepper
          typeApt={typeApt}
          setTypeApt={setTypeApt}
          disponibility={disponibility}
          setDisponibility={setDisponibility}
          date={date}
          setDate={setDate}
          onSubmit={handleSubmitStepper}
        />
      </GenericDialog>
    </>
  );
};

export default AppointmentCreator;
