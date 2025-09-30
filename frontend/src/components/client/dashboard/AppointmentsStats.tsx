import { Card, CardContent, Box, Typography } from "@mui/material";
import { CheckCircle, Schedule, Cancel } from "@mui/icons-material";

export const AppointmentsStats = () => {
  const stats = [
    {
      icon: <CheckCircle color="success" />,
      label: "RDV honorés",
      value: "12",
      color: "success",
    },
    {
      icon: <Schedule color="warning" />,
      label: "RDV à venir",
      value: "3",
      color: "warning",
    },
    {
      icon: <Cancel color="error" />,
      label: "RDV annulés",
      value: "2",
      color: "error",
    },
  ];

  return (
    <Card elevation={2} sx={{ height: "100%", borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Statistiques
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          {stats.map((stat, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                borderRadius: 2,
                backgroundColor: `${stat.color}.light`,
                border: `1px solid`,
                borderColor: `${stat.color}.main`,
              }}
            >
              <Box sx={{ mr: 2 }}>{stat.icon}</Box>
              <Box>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color={`${stat.color}.dark`}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
