import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Skeleton,
} from "@mui/material";
import { Groups, Schedule, CheckCircle } from "@mui/icons-material";
import { useGetDoctorStatsQuery } from "../../../services/AppointmentServices";

export const DoctorStats = () => {
  const { data, isLoading } = useGetDoctorStatsQuery();
  console.log(data);

  const stats = [
    {
      icon: <Groups color="primary" sx={{ fontSize: 40 }} />,
      label: "Patients aujourd'hui",
      value: data?.patients ?? 0,

      color: "primary",
    },
    {
      icon: <Schedule color="secondary" sx={{ fontSize: 40 }} />,
      label: "RDV programmés",
      value: data?.scheduled ?? 0,

      color: "secondary",
    },
    {
      icon: <CheckCircle color="success" sx={{ fontSize: 40 }} />,
      label: "Consultations terminées",
      value: data?.finished ?? 0,

      color: "success",
    },
  ];

  return (
    <Grid container spacing={3} justifyContent={"center"}>
      {stats.map((stat, index) => (
        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
          {isLoading ? (
            <>
              <Skeleton variant="rounded" width={210} height={60} />
            </>
          ) : (
            <Card sx={{ borderRadius: 3, height: "100%" }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box sx={{ mr: 2 }}>{stat.icon}</Box>
                  <Box>
                    <Typography
                      variant="h4"
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
          )}
        </Grid>
      ))}
    </Grid>
  );
};
