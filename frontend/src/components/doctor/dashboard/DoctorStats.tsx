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
import { useMemo } from "react";

export const DoctorStats = () => {
  const { data, isLoading, isFetching } = useGetDoctorStatsQuery();

  const stats = useMemo(
    () => [
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
    ],
    [data]
  );

  if (isLoading && !data) {
    return (
      <Grid container spacing={3} justifyContent={"center"}>
        {[1, 2, 3].map((i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Skeleton variant="rounded" width={210} height={60} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} justifyContent={"center"}>
      {stats.map((stat, index) => (
        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
          <Card
            sx={{
              borderRadius: 3,
              height: "100%",
              opacity: isFetching ? 0.7 : 1,
            }}
          >
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
        </Grid>
      ))}
    </Grid>
  );
};
