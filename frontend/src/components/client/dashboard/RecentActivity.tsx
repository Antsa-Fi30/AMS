import {
  Card,
  CardContent,
  Box,
  Typography,
  List,
  ListItem,
  Chip,
} from "@mui/material";
import { History } from "@mui/icons-material";
import EmptyData from "../../common/EmptyData";

export const RecentActivity = () => {
  const activities = [
    // {
    //   type: "confirmation",
    //   message: "RDV confirmé avec Dr. Rakoto",
    //   date: "Il y a 2h",
    //   color: "success",
    // },
    // {
    //   type: "rappel",
    //   message: "Rappel: RDV demain à 14:30",
    //   date: "Il y a 1 jour",
    //   color: "info",
    // },
    // {
    //   type: "annulation",
    //   message: "RDV annulé avec Dr. Ranaivo",
    //   date: "Il y a 3 jours",
    //   color: "error",
    // },
  ];

  return (
    <Card elevation={2} sx={{ height: "100%", borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <History color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Activité récente
          </Typography>
        </Box>

        {activities.length > 0 ? (
          <List sx={{ p: 0 }}>
            {activities.map((activity, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  py: 2,
                  px: 0,
                  borderBottom:
                    index < activities.length - 1 ? "1px solid" : "none",
                  borderColor: "divider",
                }}
              >
                <Chip
                  label={activity.type}
                  color={activity.color}
                  size="small"
                  sx={{ mr: 2, minWidth: 80 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight="medium">
                    {activity.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {activity.date}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <EmptyData
            title="Pas de notification pour le moment"
            hint="Les annonces, retour des status de tickets affichent ici"
          />
        )}
      </CardContent>
    </Card>
  );
};
