import { Box, Typography, Button, Grid } from "@mui/material";
import { Add, MedicalServices, Description, Analytics } from "@mui/icons-material";

export const QuickActionsDoctor = () => {
  const actions = [
    { icon: <Add />, label: "Nouveau RDV", color: "primary" },
    { icon: <MedicalServices />, label: "Fiche patient", color: "secondary" },
    { icon: <Description />, label: "Ordonnance", color: "success" },
    { icon: <Analytics />, label: "Rapports", color: "info" },
  ];

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Actions rapides
      </Typography>
      
      <Grid container spacing={1} sx={{ mt: 1 }}>
        {actions.map((action, index) => (
          <Grid size={6} key={index}>
            <Button
              variant="outlined"
              startIcon={action.icon}
              color={action.color}
              fullWidth
              sx={{ 
                flexDirection: 'column',
                height: 80,
                borderRadius: 2
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