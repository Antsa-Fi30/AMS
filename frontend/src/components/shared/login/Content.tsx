import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded"; 
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded"; 
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";


const appointmentFeatures = [
  {
    icon: <EventAvailableRoundedIcon color="primary" />,
    title: "24/7 Booking Availability",
    description:
      "Allow patients to book, modify, or cancel appointments anytime, day or night, reducing administrative load.",
  },
  {
    icon: <ScheduleRoundedIcon color="primary" />,
    title: "Real-Time Schedule Management",
    description:
      "Easily visualize and adjust doctors' schedules. Block out slots for emergencies, meetings, or time off instantly.",
  },
  {
    icon: <NotificationsActiveRoundedIcon color="primary" />,
    title: "Automated Reminders",
    description:
      "Drastically reduce 'no-shows' with automated SMS reminders sent to patients 24 hours prior to their visit.",
  },
  {
    icon: <LockOpenRoundedIcon color="primary" />,
    title: "Secure Patient Access",
    description:
      "Patients can securely access their appointment history and manage personal details through a dedicated portal.",
  },
];

export default function AppointmentSystemFeaturesCompact() {
  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignSelf: "center",
        gap: 4, 
        maxWidth: 450, 
        p: { xs: 2, sm: 4 },

      }}
    >
      <Box sx={{ textAlign: "left" }}> 
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Welcome to MediPlan
        </Typography>
        <Typography variant="body1" component="p" color="text.secondary">
          Streamlining Your Medical Practice Scheduling
        </Typography>
      </Box>
      
      {/* Affichage des fonctionnalités - Revert au style Stack simple */}
      {appointmentFeatures.map((item, index) => (
        <Stack
          key={index}
          direction="row"
          sx={{ 
            gap: 2,
  
          }}
        >
          <Box sx={{ pt: 0.5 }}>{item.icon}</Box>
          <div>
            <Typography
              gutterBottom
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}