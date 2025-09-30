import { Box, Typography, List, ListItem, Chip, Avatar, IconButton } from "@mui/material";
import { AccessTime, MoreVert, CheckCircle, Cancel } from "@mui/icons-material";

export const TodayAppointments = () => {
  const appointments = [
    { 
      id: 1, 
      patient: "Jean Rabe", 
      time: "14:30 - 15:00", 
      type: "Contrôle", 
      status: "confirmé",
      avatar: "JR" 
    },
    { 
      id: 2, 
      patient: "Marie Andry", 
      time: "15:15 - 15:45", 
      type: "Soin dentaire", 
      status: "confirmé",
      avatar: "MA" 
    },
    { 
      id: 3, 
      patient: "Paul Razafy", 
      time: "16:00 - 16:30", 
      type: "Urgence", 
      status: "en attente",
      avatar: "PR" 
    },
    { 
      id: 4, 
      patient: "Sophie Rajaona", 
      time: "16:45 - 17:15", 
      type: "Consultation", 
      status: "confirmé",
      avatar: "SR" 
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmé': return 'success';
      case 'en attente': return 'warning';
      case 'annulé': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <AccessTime color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight="bold">
          Rendez-vous d'aujourd'hui
        </Typography>
      </Box>

      <List sx={{ p: 0 }}>
        {appointments.map((appointment) => (
          <ListItem
            key={appointment.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              py: 2,
              px: 0,
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:last-child': { borderBottom: 'none' }
            }}
          >
            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
              {appointment.avatar}
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="medium">
                {appointment.patient}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {appointment.type}
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'right', mr: 2 }}>
              <Typography variant="body2" fontWeight="medium">
                {appointment.time}
              </Typography>
              <Chip 
                label={appointment.status} 
                color={getStatusColor(appointment.status)} 
                size="small"
              />
            </Box>

            <IconButton size="small">
              <MoreVert />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};