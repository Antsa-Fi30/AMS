import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import { LocalHospital, ArrowForward } from "@mui/icons-material";

export const HealthTips = () => {
  const tips = [
    "Buvez au moins 2L d'eau par jour",
    "Faites une pause écran toutes les 2h",
    "Marchez 30 minutes quotidiennement",
  ];

  return (
    <Card sx={{ height: '100%', borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <CardContent sx={{ p: 3, color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <LocalHospital sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Conseils santé
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          {tips.map((tip, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                mb: 2,
                p: 2,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 2,
                backdropFilter: 'blur(10px)'
              }}
            >
              <Typography variant="body2">
                {tip}
              </Typography>
            </Box>
          ))}
        </Box>

        <Button 
          variant="outlined" 
          endIcon={<ArrowForward />}
          sx={{ 
            color: 'white', 
            borderColor: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderColor: 'white'
            }
          }}
        >
          Voir plus
        </Button>
      </CardContent>
    </Card>
  );
};