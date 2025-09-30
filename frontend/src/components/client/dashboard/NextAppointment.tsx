import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Chip,
  Avatar,
} from "@mui/material";
import {
  CalendarMonth,
  AccessTime,
  LocationOn,
  Person,
} from "@mui/icons-material";

export const NextAppointment = () => {
  const nextAppointment = {
    doctor: "Dr. Marie Rakoto",
    specialty: "Dentiste",
    date: "Aujourd'hui",
    time: "14:30 - 15:30",
    address: "123 Avenue de la Santé, Tananarive",
    status: "confirmé",
  };

  return (
    <Card elevation={2} sx={{ height: "100%", borderRadius: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <CalendarMonth color="primary" sx={{ mr: 1, fontSize: 28 }} />
          <Typography variant="h5" fontWeight="bold">
            Votre prochain rendez-vous
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main" }}>
            DR
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mr: 2 }}>
                {nextAppointment.doctor}
              </Typography>
              <Chip
                label={nextAppointment.status}
                color="success"
                size="small"
              />
            </Box>

            <Typography color="text.secondary" sx={{ mb: 3 }}>
              {nextAppointment.specialty}
            </Typography>

            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccessTime color="action" sx={{ mr: 1 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Heure
                  </Typography>
                  <Typography fontWeight="medium">
                    {nextAppointment.time}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CalendarMonth color="action" sx={{ mr: 1 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Date
                  </Typography>
                  <Typography fontWeight="medium">
                    {nextAppointment.date}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gridColumn: "1 / -1",
                }}
              >
                <LocationOn color="action" sx={{ mr: 1 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Adresse
                  </Typography>
                  <Typography fontWeight="medium">
                    {nextAppointment.address}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button variant="contained" color="primary">
                Voir les détails
              </Button>
              <Button variant="outlined" color="secondary">
                Annuler le RDV
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
