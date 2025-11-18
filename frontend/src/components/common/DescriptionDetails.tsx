import {
  Stack,
  Typography,
  Chip,
  Box,
  Divider,
  Card,
  Grid,
  Paper,
} from "@mui/material";
import {
  Thermostat,
  MonitorWeight,
  Favorite,
  Medication,
  Healing,
  HealthAndSafety,
} from "@mui/icons-material";
import type { DescriptionsType } from "../../services/AppointmentServices";

interface DescriptionDetailsProps {
  target?: DescriptionsType | null;
}

const DescriptionDetails: React.FC<DescriptionDetailsProps> = ({ target }) => {
  if (!target) {
    return (
      <Card sx={{ p: 2, textAlign: "center", opacity: 0.6 }}>
        <Typography>Aucune donnée de consultation disponible.</Typography>
      </Card>
    );
  }
  const { vitals, medocs = [], notes } = target;

  return (
    <Card
      elevation={1}
      sx={{
        p: 2,
        bgcolor: "background.paper",
        boxShadow: "0 3px 10px rgba(0,0,0,0.06)",
      }}
    >
      <Stack spacing={3}>
        {/* ------------------------------------- */}
        {/*               SIGNES VITAUX           */}
        {/* ------------------------------------- */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Signes vitaux
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Paper
                variant="outlined"
                sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <Thermostat color="error" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Température
                  </Typography>
                  <Typography fontWeight="bold">
                    {vitals.temperature} °C
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                variant="outlined"
                sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <MonitorWeight color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Poids
                  </Typography>
                  <Typography fontWeight="bold">{vitals.weight} kg</Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                variant="outlined"
                sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <Favorite color="error" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Tension artérielle
                  </Typography>
                  <Typography fontWeight="bold">
                    {vitals.blood_pressure}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Divider flexItem sx={{ borderStyle: "dashed" }} />

        {/* ------------------------------------- */}
        {/*           MEDICAMENTS PRESCRITS       */}
        {/* ------------------------------------- */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Médicaments prescrits
          </Typography>

          {medocs.length === 0 ? (
            <Typography color="text.disabled" fontStyle="italic">
              Aucun médicament prescrit.
            </Typography>
          ) : (
            <Stack spacing={2}>
              {medocs.map((m, index) => (
                <Paper
                  key={index}
                  variant="outlined"
                  sx={{ p: 2, borderRadius: 2 }}
                >
                  <Stack spacing={1}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{ mb: 1 }}
                    >
                      <Medication color="primary" />
                      <Typography fontWeight="bold">{m.name}</Typography>
                    </Stack>

                    <Grid container spacing={1}>
                      <Grid item xs={6} md={3}>
                        <Chip
                          label={`Dosage : ${m.dosage}`}
                          variant="outlined"
                          color="primary"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Chip
                          label={`Durée : ${m.duration} j`}
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Chip
                          label={`Fréquence : ${m.frequency} fois/jour`}
                          variant="outlined"
                          color="success"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Chip
                          label={`Prise : ${m.days}`}
                          variant="outlined"
                          color="warning"
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          )}
        </Box>

        <Divider flexItem sx={{ borderStyle: "dashed" }} />

        {/* ------------------------------------- */}
        {/*           NOTES DU MEDECINS       */}
        {/* ------------------------------------- */}
        {notes && (
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Notes
            </Typography>

            <Paper
              variant="outlined"
              sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}
            >
              <HealthAndSafety color="error" />
              <Box>
                <Typography fontWeight="bold">{notes}</Typography>
              </Box>
            </Paper>
          </Box>
        )}
      </Stack>
    </Card>
  );
};

export default DescriptionDetails;
