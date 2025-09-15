import {
  Avatar,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import {
  ManageHistory,
  EventBusy,
  AccessTime,
  CalendarToday,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Composants stylisés

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  textTransform: "none",
  fontWeight: 600,
  padding: "10px 20px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: "12px",
  backgroundColor: "rgba(25, 118, 210, 0.1)",
  marginRight: "12px",
}));

const UpcomingAppointment = () => {
  return (
    <Card sx={{ maxWidth: 480, width: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        {/* En-tête avec badge "Upcoming" */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Chip
            label="Upcoming Appointment"
            color="primary"
            size="small"
            sx={{
              borderRadius: "8px",
              fontWeight: 600,
              background: "linear-gradient(45deg, #2196F3, #21CBF3)",
            }}
          />
          <Typography variant="body2" color="text.secondary">
            #APPT-12345
          </Typography>
        </Box>

        {/* Informations du docteur */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            alt="Dr. Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{
              width: 70,
              height: 70,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              border: "3px solid white",
            }}
          />
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" fontWeight="600">
              Dr. Remy Sharp
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dental Surgeon
            </Typography>
          </Box>
        </Box>

        {/* Détails du rendez-vous */}
        <Box
          sx={{
            borderRadius: "12px",
            p: 2,
            mb: 3,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <IconWrapper>
              <CalendarToday color="primary" fontSize="small" />
            </IconWrapper>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Date
              </Typography>
              <Typography variant="body1" fontWeight="500">
                February 22, 2024
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <IconWrapper>
              <AccessTime color="primary" fontSize="small" />
            </IconWrapper>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Time
              </Typography>
              <Typography variant="body1" fontWeight="500">
                05:00 AM - 05:45 AM
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconWrapper>
              <EventBusy color="primary" fontSize="small" />
            </IconWrapper>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Reason:
              </Typography>
              <Typography variant="body1" fontWeight="500">
                Dentition - Routine Checkup
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Actions */}
        <Stack direction={"row"} spacing={2} justifyContent="center">
          <StyledButton
            variant="contained"
            color="warning"
            startIcon={<ManageHistory />}
          >
            Reschedule
          </StyledButton>
          <StyledButton
            variant="outlined"
            color="error"
            startIcon={<EventBusy />}
            sx={{
              border: "2px solid",
              "&:hover": {
                border: "2px solid",
              },
            }}
          >
            Cancel
          </StyledButton>
        </Stack>

        {/* Note */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 2, display: "block", textAlign: "center" }}
        >
          You can reschedule or cancel up to 24 hours before your appointment.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointment;
