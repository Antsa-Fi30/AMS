import { Box, Typography, List, ListItem, Avatar, Chip, Button } from "@mui/material";
import { Groups, AccessTime } from "@mui/icons-material";

export const PatientQueue = () => {
  const queue = [
    { id: 1, patient: "Alice Randria", waitTime: "5 min", priority: "Normal", avatar: "AR" },
    { id: 2, patient: "Robert Andriana", waitTime: "10 min", priority: "Urgent", avatar: "RA" },
    { id: 3, patient: "Sarah Razafy", waitTime: "15 min", priority: "Normal", avatar: "SR" },
  ];

  const getPriorityColor = (priority) => {
    return priority === 'Urgent' ? 'error' : 'primary';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Groups color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            File d'attente
          </Typography>
        </Box>
        <Chip label={`${queue.length} patients`} color="primary" variant="outlined" />
      </Box>

      <List sx={{ p: 0, mb: 2 }}>
        {queue.map((patient) => (
          <ListItem
            key={patient.id}
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
            <Avatar sx={{ mr: 2, bgcolor: `${getPriorityColor(patient.priority)}.main` }}>
              {patient.avatar}
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="medium">
                {patient.patient}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTime fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {patient.waitTime}
                </Typography>
              </Box>
            </Box>

            <Chip 
              label={patient.priority} 
              color={getPriorityColor(patient.priority)} 
              size="small"
            />
          </ListItem>
        ))}
      </List>

      <Button variant="contained" fullWidth>
        Commencer la consultation
      </Button>
    </Box>
  );
};