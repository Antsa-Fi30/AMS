import { Box, Typography, List, ListItem, Chip } from "@mui/material";
import { LocalHospital, TrendingUp } from "@mui/icons-material";

export const MedicalInsights = () => {
  const insights = [
    { type: "Statistique", message: "25% de patients en plus cette semaine", trend: "up" },
    { type: "Rappel", message: "2 ordonnances à renouveler", trend: "neutral" },
    { type: "Alert", message: "Stock faible pour anesthésiques", trend: "down" },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <LocalHospital color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight="bold">
          Insights médicaux
        </Typography>
      </Box>

      <List sx={{ p: 0 }}>
        {insights.map((insight, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              py: 1.5,
              px: 0,
              borderBottom: index < insights.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider'
            }}
          >
            <TrendingUp 
              color={insight.trend === 'up' ? 'success' : insight.trend === 'down' ? 'error' : 'warning'} 
              sx={{ mr: 1, mt: 0.5 }} 
            />
            <Box sx={{ flex: 1 }}>
              <Chip 
                label={insight.type} 
                size="small" 
                variant="outlined"
                sx={{ mb: 0.5 }}
              />
              <Typography variant="body2">
                {insight.message}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};