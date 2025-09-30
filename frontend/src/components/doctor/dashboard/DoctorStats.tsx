import { Grid, Card, CardContent, Box, Typography } from "@mui/material";
import { Groups, Schedule, CheckCircle, Emergency } from "@mui/icons-material";

export const DoctorStats = () => {
  const stats = [
    { 
      icon: <Groups color="primary" sx={{ fontSize: 40 }} />, 
      label: "Patients aujourd'hui", 
      value: "12", 
      change: "+2 vs hier",
      color: "primary" 
    },
    { 
      icon: <Schedule color="secondary" sx={{ fontSize: 40 }} />, 
      label: "RDV programmés", 
      value: "8", 
      change: "Prochain: 14:30",
      color: "secondary" 
    },
    { 
      icon: <CheckCircle color="success" sx={{ fontSize: 40 }} />, 
      label: "Consultations terminées", 
      value: "4", 
      change: "Dernière: 12:15",
      color: "success" 
    },
    { 
      icon: <Emergency color="error" sx={{ fontSize: 40 }} />, 
      label: "Urgences", 
      value: "1", 
      change: "En attente",
      color: "error" 
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ mr: 2 }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color={`${stat.color}.main`}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {stat.change}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};