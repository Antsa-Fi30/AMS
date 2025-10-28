import { Stack, Typography, Chip, Box, Divider, Card } from "@mui/material";
import { AccessTime, Whatshot, Healing } from "@mui/icons-material";
import type { DescriptionType } from "../../services/AppointmentServices";

interface DescriptionDetailsProps {
  target?: DescriptionType | null;
}

const DescriptionDetails: React.FC<DescriptionDetailsProps> = ({ target }) => {
  const { symptoms = [], severity, duration, detectedBy } = target || {};

  return (
    <Card
      elevation={1}
      sx={{
        bgcolor: "background.paper",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <Stack spacing={2}>
        {/* Description libre */}
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontStyle: target ? "normal" : "italic",
              color: target ? "text.primary" : "text.disabled",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {target ? "Nom_du_maladie" : "Aucune description fournie."}
          </Typography>
        </Box>

        <Divider flexItem sx={{ borderStyle: "dashed" }} />

        {/* Détails structurés */}
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          {duration && (
            <Chip
              icon={<AccessTime fontSize="small" />}
              label={`Durée : ${duration}`}
              variant="outlined"
              color="primary"
              sx={{ fontWeight: 500 }}
            />
          )}

          {severity && (
            <Chip
              icon={<Whatshot fontSize="small" />}
              label={`Gravité : ${severity}`}
              variant="outlined"
              color={
                severity === "severe"
                  ? "error"
                  : severity === "moderate"
                  ? "warning"
                  : "success"
              }
              sx={{ fontWeight: 500 }}
            />
          )}

          {detectedBy && (
            <Chip
              icon={<Healing fontSize="small" />}
              label={`Détecté par : ${detectedBy}`}
              variant="outlined"
              color="info"
              sx={{ fontWeight: 500 }}
            />
          )}
        </Stack>

        {/* Symptômes */}
        {symptoms.length > 0 && (
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Symptômes observés :
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {symptoms.map((s, i) => (
                <Chip key={i} label={s} color="warning" variant="outlined" />
              ))}
            </Stack>
          </Box>
        )}
      </Stack>
    </Card>
  );
};
export default DescriptionDetails;
