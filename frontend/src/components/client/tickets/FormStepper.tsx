import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Divider,
  Stack,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { TypeRDV } from "../../../constants/Symptoms";
import {
  GetDoctorDispos,
  type DisponibilityResults,
} from "../../../services/DisponibilityServices";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import EmptyData from "../../common/EmptyData";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { formatDateForBackend } from "../../../utils/Formats";
import { type Appointments } from "../../../services/AppointmentServices";

type AnswerType = {
  date: string | null;
  typeApt: string;
  disponibility: number | null;
};

type Props = {
  typeApt: string;
  setTypeApt: (value: string) => void;
  date: Date | null;
  setDate: (value: Date | null) => void;
  disponibility: number | null;
  setDisponibility: (value: number) => void;
  onSubmit: (answers: AnswerType) => void;
  lastApt: Appointments;
  setLastApt: (value: Appointments | null) => void;
};

const FormStepper: React.FC<Props> = ({
  lastApt,
  setLastApt,
  typeApt,
  setTypeApt,
  date,
  setDate,
  disponibility,
  setDisponibility,
  onSubmit,
}) => {
  const steps = ["Type de rendez-vous", "Créneaux à réserver", "Confirmation"];
  const [activeStep, setActiveStep] = useState(0);
  const [dispoData, setDispoData] = useState<DisponibilityResults[]>([]);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchDispos = async () => {
      try {
        const data = await GetDoctorDispos(2);
        setDispoData(data);
      } catch (error) {
        showSnackbar(
          error.data?.details || "Erreur lors du chargement",
          "error"
        );
      }
    };

    fetchDispos();
  }, []);

  useEffect(() => {
    if (activeStep === 0) {
      setDate(null);
      setDisponibility(0);
    }
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      onSubmit({
        date: typeApt === "first" ? formatDateForBackend(date) : null,
        typeApt,
        disponibility: typeApt === "first" ? disponibility : null,
      });

      setActiveStep(0);
      setLastApt(null);
    } else {
      setActiveStep((prev) => prev + 1);
      if (typeApt && typeApt !== "first") {
        setActiveStep((prev) => prev + 2 - 1);
      }
    }
  };

  const handleBack = () => {
    if (typeApt && typeApt !== "first") {
      setActiveStep((prev) => prev - 2);
    } else {
      setActiveStep((prev) => prev - 1);
    }
  };

  const selectedDispo = dispoData.find((d) => d.id === disponibility);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ width: "100%", p: 1 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 3 }}>
          {activeStep === 0 && (
            <Box>
              <ToggleButtonGroup
                value={typeApt}
                exclusive
                onChange={(e, val) => setTypeApt(val)}
                aria-label="type de rendez-vous"
                color="primary"
                sx={{ flexWrap: "wrap", gap: 1 }}
              >
                {TypeRDV.map((item, index) => (
                  <ToggleButton
                    key={index}
                    value={item.value}
                    disabled={
                      lastApt?.code === "" && item.value === "follow_up"
                    }
                  >
                    {item.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          )}

          {typeApt === "first" && activeStep === 1 && (
            <Stack spacing={2} margin="auto" width="50%">
              <Stack alignItems="center" spacing={1}>
                <Typography>Choisir un créneau :</Typography>
                <ToggleButtonGroup
                  value={disponibility}
                  exclusive
                  onChange={(e, val) => setDisponibility(val)}
                  aria-label="disponibilités"
                  color="primary"
                  sx={{ flexWrap: "wrap", gap: 1 }}
                >
                  {dispoData.length > 0 ? (
                    dispoData.map((item) => (
                      <ToggleButton key={item.id} value={item.id}>
                        {`${item.start_time} → ${item.end_time}`}
                      </ToggleButton>
                    ))
                  ) : (
                    <Box>
                      <EmptyData
                        title="Aucune disponibilité trouvée"
                        hint="Les disponibilités du docteur apparaîtront ici."
                      />
                    </Box>
                  )}
                </ToggleButtonGroup>
              </Stack>
              <Divider flexItem sx={{ borderStyle: "dashed" }} />
              <DatePicker
                label="Choisir la date"
                value={date}
                onChange={setDate}
                disablePast
                format="dd/MM/yyyy"
              />
            </Stack>
          )}

          {activeStep === 2 && (
            <Card variant="outlined" sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Résumé de votre demande
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography>
                  <strong>Type du rendez-vous :</strong>{" "}
                  {typeApt
                    ? typeApt === "first"
                      ? "Consultation"
                      : "Contrôle"
                    : "Aucun"}
                </Typography>
                {typeApt === "first" && (
                  <Typography>
                    <strong>Créneau choisi :</strong>{" "}
                    {selectedDispo
                      ? `${selectedDispo.start_time} → ${selectedDispo.end_time}`
                      : "Aucun"}
                  </Typography>
                )}
                <Typography>
                  <strong>Docteur :</strong>{" "}
                  {typeApt === "first"
                    ? selectedDispo?.doctor_name || "Aucun"
                    : lastApt?.doctor_name || "Aucun"}
                </Typography>

                <Typography>
                  <strong>Téléphone :</strong>{" "}
                  {typeApt === "first"
                    ? selectedDispo?.doctor_phone || "Aucun"
                    : lastApt?.doctor_phone || "Aucun"}
                </Typography>

                <Divider sx={{ borderStyle: "dashed", mt: 2 }} />
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "text.secondary" }}
                >
                  Ce ticket sera transmis à votre médecin.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Retour
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={
              (activeStep === 0 && typeApt === "") ||
              (activeStep === 1 &&
                typeApt === "first" &&
                (!disponibility || !date))
            }
            startIcon={activeStep === steps.length - 1 ? <CheckCircle /> : null}
          >
            {activeStep === steps.length - 1 ? "Envoyer" : "Suivant"}
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default FormStepper;
