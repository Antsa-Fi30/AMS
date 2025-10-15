import { Box, Button, Grid } from "@mui/material";
import {
  Add,
  MedicalServices,
  Description,
  Analytics,
  Timelapse,
} from "@mui/icons-material";

export const QuickActionsDoctor = () => {
  const actions = [
    { icon: <Timelapse />, label: "Historique", color: "primary" },
    { icon: <MedicalServices />, label: "Fiche patient", color: "secondary" },
    { icon: <Description />, label: "Ordonnance", color: "success" },
    { icon: <Analytics />, label: "Rapports", color: "info" },
  ];

  return (
    <Box>
      <Grid container spacing={1}>
        {actions.map((action, index) => (
          <Grid size={6} key={index}>
            <Button
              variant="outlined"
              startIcon={action.icon}
              fullWidth
              sx={{
                flexDirection: "column",
                height: 80,
                borderRadius: 2,
              }}
            >
              {action.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
