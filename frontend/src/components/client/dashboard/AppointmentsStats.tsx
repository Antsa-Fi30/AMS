import { Card, CardContent, Box, Typography, Skeleton } from "@mui/material";
import { CheckCircle, Schedule, Cancel } from "@mui/icons-material";
import { useGetAppointmentsQuery } from "../../../services/AppointmentServices";

export const AppointmentsStats = () => {
  const { data, isLoading } = useGetAppointmentsQuery();

  const pending = data?.results.filter((a) => a.status === "pending").length;
  const confirmed = data?.results.filter(
    (a) => a.status === "confirmed" && a.finished
  ).length;
  const refused = data?.results.filter(
    (a) => (a.status === "rejected" || a.status === "canceled") && a.finished
  ).length;

  const stats = [
    {
      icon: <CheckCircle />,
      label: "RDV honorés",
      value: confirmed,
      color: "success",
    },
    {
      icon: <Schedule />,
      label: "RDV à venir",
      value: pending,
      color: "warning",
    },
    {
      icon: <Cancel />,
      label: "RDV annulés",
      value: refused,
      color: "error",
    },
  ];

  return (
    <Card elevation={2} sx={{ height: "100%", borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Statistiques
        </Typography>

        {isLoading ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 2,
                }}
              />
            ))}
          </Box>
        ) : (
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
                  <Typography variant="h4" fontWeight="bold">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.primary ">
                    {stat.label}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
