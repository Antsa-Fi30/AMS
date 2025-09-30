import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import { Add, CalendarMonth, Person } from "@mui/icons-material";

export const QuickActions = () => {
  const actions = [
    { icon: <Add />, label: "Prendre RDV", color: "primary" },
    { icon: <CalendarMonth />, label: "Mes RDV", color: "secondary" },
    { icon: <Person />, label: "Mes historiques", color: "success" },
  ];

  return (
    <Card elevation={2} sx={{ height: "100%", borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Actions rapides
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outlined"
              startIcon={action.icon}
              color={"info"}
              fullWidth
              sx={{
                justifyContent: "flex-start",
                py: 1.5,
                borderRadius: 2,
              }}
            >
              {action.label}
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
