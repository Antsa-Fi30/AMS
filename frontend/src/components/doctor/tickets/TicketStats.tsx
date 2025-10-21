import { useMemo } from "react";
import { useGetAppointmentsQuery } from "../../../services/AppointmentServices";
import {
  Cancel,
  CheckCircle,
  PendingActions,
  // Schedule,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

export const TicketStats = () => {
  const { data = [], isLoading } = useGetAppointmentsQuery();

  const stats = useMemo(() => {
    const pending = data.filter((a) => a.status === "pending").length;
    const confirmed = data.filter((a) => a.status === "confirmed").length;
    const refused = data.filter((a) => a.status === "rejected").length;
    // const today = data.filter((a) => {
    //   const date = new Date(a.date);
    //   const today = new Date();
    //   return date.toDateString() === today.toDateString();
    // }).length;

    return [
      {
        icon: <PendingActions color="warning" sx={{ fontSize: 40 }} />,
        label: "En attente",
        value: pending,
        color: "warning",
      },
      {
        icon: <CheckCircle color="success" sx={{ fontSize: 40 }} />,
        label: "Confirmés",
        value: confirmed,
        color: "success",
      },
      {
        icon: <Cancel color="error" sx={{ fontSize: 40 }} />,
        label: "Refusés",
        value: refused,
        color: "error",
      },
      // {
      //   icon: <Schedule color="info" sx={{ fontSize: 40 }} />,
      //   label: "Aujourd'hui",
      //   value: today,
      //   color: "info",
      // },
    ];
  }, [data]);

  if (isLoading) return <CircularProgress />;

  return (
    <Grid container justifyContent={"center"} spacing={3}>
      {stats.map((stat, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent sx={{ p: 1 }}>
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
