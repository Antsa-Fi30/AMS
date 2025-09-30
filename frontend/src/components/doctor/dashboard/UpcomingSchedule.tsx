import { Box, Typography, List, ListItem, Avatar } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";

export const UpcomingSchedule = () => {
  const schedule = [
    { day: "Demain", date: "15 Nov", appointments: 6, type: "Journée complète" },
    { day: "Vendredi", date: "16 Nov", appointments: 4, type: "Demi-journée" },
    { day: "Lundi", date: "19 Nov", appointments: 8, type: "Journée complète" },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <CalendarMonth color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight="bold">
          Planning à venir
        </Typography>
      </Box>

      <List sx={{ p: 0 }}>
        {schedule.map((day, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              py: 2,
              px: 0,
              borderBottom: index < schedule.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider'
            }}
          >
            <Avatar sx={{ mr: 2, bgcolor: 'primary.light', color: 'primary.main' }}>
              {day.date.split(' ')[0]}
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="medium">
                {day.day} {day.date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {day.appointments} RDV - {day.type}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};