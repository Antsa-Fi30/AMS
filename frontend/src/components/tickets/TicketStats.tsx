import { Grid, Card, CardContent, Box, Typography } from "@mui/material";
import {
  PendingActions,
  CheckCircle,
  Cancel,
  Schedule,
} from "@mui/icons-material";

export const TicketStats = () => {
  const stats = [
    {
      icon: <PendingActions color="warning" sx={{ fontSize: 40 }} />,
      label: "En attente",
      value: "8",
      color: "warning",
    },
    {
      icon: <CheckCircle color="success" sx={{ fontSize: 40 }} />,
      label: "Confirmés",
      value: "24",
      color: "success",
    },
    {
      icon: <Cancel color="error" sx={{ fontSize: 40 }} />,
      label: "Refusés",
      value: "3",
      color: "error",
    },
    {
      icon: <Schedule color="info" sx={{ fontSize: 40 }} />,
      label: "Aujourd'hui",
      value: "5",
      color: "info",
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
          <Card sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ mr: 2 }}>{stat.icon}</Box>
                <Box>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={`${stat.color}.main`}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
