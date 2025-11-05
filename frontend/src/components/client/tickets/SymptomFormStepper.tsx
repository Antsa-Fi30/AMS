import React, { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Slider,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import {
  symptomsConstants,
  detectedByConst,
  durationConstants,
} from "../../../constants/Symptoms";

type DescriptionType = {
  symptoms: string[];
  severity: "mild" | "moderate" | "severe";
  duration: string;
  detectedBy: string;
  // key: [any];
};

type Props = {
  onSubmit: (descriptions: DescriptionType) => void;
};

const SymptomFormStepper: React.FC<Props> = ({ onSubmit }) => {
  const steps = ["Symptômes", "Détails", "Détecté par", "Confirmation"];

  const [activeStep, setActiveStep] = useState(0);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [detectedBy, setDetectedBy] = useState<string>("");
  const [severity, setSeverity] = useState<"mild" | "moderate" | "severe">(
    "mild"
  );
  const [duration, setDuration] = useState("1 jour");

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      onSubmit({
        symptoms,
        severity,
        duration,
        detectedBy,
      });
      setActiveStep(0);
      setSymptoms([]);
      setSeverity("mild");
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSymptomChange = (
    event: React.MouseEvent<HTMLElement>,
    newSymptoms: string[]
  ) => {
    event.preventDefault();
    setSymptoms(newSymptoms);
  };

  return (
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
            <Typography variant="subtitle1" gutterBottom>
              Quels symptômes ressentez-vous ?
            </Typography>
            <ToggleButtonGroup
              value={symptoms}
              onChange={handleSymptomChange}
              aria-label="symptômes"
              color="primary"
              sx={{ flexWrap: "wrap", gap: 1 }}
            >
              {symptomsConstants.map((item, index) => (
                <ToggleButton key={index} value={item.value}>
                  {item.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Gravité perçue
            </Typography>
            <Slider
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={3}
              value={severity === "mild" ? 1 : severity === "moderate" ? 2 : 3}
              onChange={(_, value) => {
                setSeverity(
                  value === 1 ? "mild" : value === 2 ? "moderate" : "severe"
                );
              }}
            />

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Depuis combien de temps ?
            </Typography>
            <Select
              fullWidth
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              {durationConstants.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <Select
              fullWidth
              value={detectedBy}
              onChange={(e) => setDetectedBy(e.target.value)}
            >
              {detectedByConst.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}

        {activeStep === 3 && (
          <Card variant="outlined" sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Résumé de votre demande
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography>
                <strong>Symptômes :</strong> {symptoms.join(", ") || "Aucun"}
              </Typography>
              <Typography>
                <strong>Gravité :</strong>{" "}
                {severity === "mild"
                  ? "Légère"
                  : severity === "moderate"
                  ? "Modérée"
                  : "Sévère"}
              </Typography>
              <Typography>
                <strong>Durée :</strong> {duration}
              </Typography>
              <Typography>
                <strong>Detected by :</strong> {detectedBy}
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

      {/* Buttons */}
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
            (activeStep === 0 && symptoms.length === 0) ||
            (activeStep === 1 && !severity) ||
            (activeStep === 2 && !severity)
          }
          startIcon={activeStep === steps.length - 1 ? <CheckCircle /> : null}
        >
          {activeStep === steps.length - 1 ? "Envoyer" : "Suivant"}
        </Button>
      </Box>
    </Box>
  );
};

export default SymptomFormStepper;
