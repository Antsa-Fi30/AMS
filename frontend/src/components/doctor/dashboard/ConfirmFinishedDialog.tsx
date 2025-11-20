import React, { useState } from "react";
import GenericDialog from "../../common/GenericDialog";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
  TextField,
  Grid,
  Stack,
} from "@mui/material";
import { CheckCircleOutline, AddCircle, Delete } from "@mui/icons-material";
import {
  useUpdateAppointmentsMutation,
  useGetAppointmentsQuery,
  type Appointments,
  type JSONValue,
} from "../../../services/AppointmentServices";
import { useSnackbar } from "../../../contexts/SnackbarContext";

interface ConfirmFinishedDialogProps {
  appointment: Appointments;
  followUp?: boolean;
}

interface MedocJSON {
  name: string;
  dosage: string;
  duration: string;
  frequency: string;
  days: string;
  [key: string]: JSONValue;
}

const ConfirmFinishedDialog: React.FC<ConfirmFinishedDialogProps> = ({
  appointment,
  followUp,
}) => {
  const [updateAppointments, { isLoading }] = useUpdateAppointmentsMutation();
  const { refetch } = useGetAppointmentsQuery();
  const { showSnackbar } = useSnackbar();

  // --- FORM STATES ---
  const [temperature, setTemperature] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [medocs, setMedocs] = useState<MedocJSON[]>([
    { name: "", dosage: "", duration: "", frequency: "", days: "" },
  ]);
  const [notes, setNotes] = useState<string>("");

  // Ajouter un médicament
  const addMedoc = () => {
    setMedocs([
      ...medocs,
      { name: "", dosage: "", duration: "", frequency: "", days: "" },
    ]);
  };

  // Modifier un médicament
  const updateMedoc = (index: number, key: keyof MedocJSON, value: string) => {
    const updated = [...medocs];
    updated[index][key] = value;
    setMedocs(updated);
  };

  // Supprimer un médicament
  const deleteMedoc = (index: number) => {
    setMedocs(medocs.filter((_, i) => i !== index));
  };

  // FINAL SUBMIT
  const handleConfirm = async (close: () => void, id: number) => {
    try {
      const payload = {
        id,
        finished: true,
        descriptions: {
          vitals: {
            temperature: Number(temperature),
            weight: Number(weight),
            blood_pressure: Number(bloodPressure),
          },
          medocs: medocs,
          notes: notes,
        },
      };

      await updateAppointments(payload).unwrap();
      refetch();

      showSnackbar("Consultation terminée et sauvegardée.", "success");
      close();
    } catch (err: unknown) {
      console.error(err);
      showSnackbar(
        err?.data?.detail || "Erreur lors de la sauvegarde",
        "error"
      );
    }
  };

  const isFormMedocValid = () => {
    const hasVitals = temperature || weight || bloodPressure;

    const hasValidMedocs = medocs.some(
      (m) =>
        m.name.trim() &&
        m.dosage.trim() &&
        m.duration.trim() &&
        m.frequency.trim()
    );

    return hasVitals || hasValidMedocs;
  };

  return (
    <GenericDialog
      renderTrigger={(open) => (
        <Tooltip title="Marquer comme terminé">
          <IconButton aria-label="finish" size="small" onClick={open}>
            <CheckCircleOutline color="primary" />
          </IconButton>
        </Tooltip>
      )}
      actions={(close) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleConfirm(close, appointment.id)}
          disabled={isLoading || (!followUp && !isFormMedocValid())}
        >
          {isLoading ? (
            <CircularProgress size={18} sx={{ mr: 1 }} />
          ) : (
            "Terminer la consultation"
          )}
        </Button>
      )}
    >
      <Box>
        <Typography fontWeight="bold" mb={2}>
          Informations de fin de consultation
        </Typography>

        {/* --- VITALS --- */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Température (°C)"
              fullWidth
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              type="number"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Poids (kg)"
              fullWidth
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              type="number"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Tension artérielle"
              fullWidth
              placeholder="ex: 13.7"
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
              type="number"
            />
          </Grid>
        </Grid>

        <Typography mt={3} fontWeight="bold">
          Médicaments prescrits
        </Typography>

        {/* --- MEDOCS LIST --- */}
        {medocs.map((m, index) => (
          <Box
            key={index}
            sx={{
              mt: 2,
              p: 2,
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Nom du médicament"
                  fullWidth
                  value={m.name}
                  onChange={(e) => updateMedoc(index, "name", e.target.value)}
                />
              </Grid>

              <Grid size={{ xs: 6, md: 2 }}>
                <TextField
                  label="Dosage"
                  fullWidth
                  value={m.dosage}
                  onChange={(e) => updateMedoc(index, "dosage", e.target.value)}
                />
              </Grid>

              <Grid size={{ xs: 6, md: 2 }}>
                <TextField
                  type="number"
                  label="Durée"
                  fullWidth
                  value={m.duration}
                  onChange={(e) =>
                    updateMedoc(index, "duration", e.target.value)
                  }
                />
              </Grid>

              <Grid size={{ xs: 6, md: 2 }}>
                <TextField
                  type="number"
                  label="Fréquence"
                  fullWidth
                  value={m.frequency}
                  onChange={(e) =>
                    updateMedoc(index, "frequency", e.target.value)
                  }
                />
              </Grid>

              <Grid size={{ xs: 6, md: 2 }}>
                <TextField
                  label="Prise"
                  placeholder="matin, soir..."
                  fullWidth
                  value={m.days}
                  onChange={(e) => updateMedoc(index, "days", e.target.value)}
                />
              </Grid>
            </Grid>

            <Box textAlign="right" mt={1}>
              <Button
                color="error"
                startIcon={<Delete />}
                onClick={() => deleteMedoc(index)}
              >
                Supprimer
              </Button>
            </Box>
          </Box>
        ))}

        <Button sx={{ mt: 2 }} startIcon={<AddCircle />} onClick={addMedoc}>
          Ajouter un médicament
        </Button>
      </Box>
      <Stack mt={1}>
        <TextField
          id="outlined-multiline-flexible"
          label="Notes(optionnal)"
          multiline
          maxRows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </Stack>
    </GenericDialog>
  );
};

export default ConfirmFinishedDialog;
