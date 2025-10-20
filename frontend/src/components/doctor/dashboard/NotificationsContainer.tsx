import { type JSX } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import {
  WarningAmber,
  ErrorOutline,
  CheckCircleOutline,
  InfoOutlined,
  Notifications,
} from "@mui/icons-material";
import { motion } from "framer-motion";

type AlertType = "info" | "warning" | "error" | "success";

interface AlertItem {
  type: AlertType;
  title: string;
  message: string;
}

const mockAlerts: AlertItem[] = [
  {
    type: "info",
    title: "Confirmation manquante",
    message: "2 patients n’ont pas encore confirmé leur présence.",
  },
  {
    type: "warning",
    title: "Annulation récente",
    message: "1 patient a annulé son rendez-vous ce matin.",
  },
  {
    type: "error",
    title: "Rendez-vous expiré",
    message: "1 rendez-vous a expiré sans mise à jour du statut.",
  },
];

const iconForType: Record<AlertType, JSX.Element> = {
  info: <InfoOutlined fontSize="small" />,
  warning: <WarningAmber fontSize="small" />,
  error: <ErrorOutline fontSize="small" />,
  success: <CheckCircleOutline fontSize="small" />,
};

const NotificationsContainer = () => {
  return (
    <Card
      sx={{
        maxHeight: 220,
        height: 220,
        overflowY: "scroll",
        borderRadius: "16px",
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          px: 1,
          py: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "white",
        }}
      >
        <Stack spacing={1} direction={"row"} alignItems={"center"}>
          <Notifications color="primary" />
          <Typography variant="body2" color="primary">
            Notifications
          </Typography>
        </Stack>
        <Typography variant="body2" color="white">
          <Chip label={`${mockAlerts.length}`} color="primary" />
        </Typography>
      </Box>
      <CardContent sx={{ p: 1 }}>
        {mockAlerts.length === 0 ? (
          <Typography color="text.secondary">
            Aucune alerte pour le moment 🎉
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {mockAlerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Alert
                  severity={alert.type}
                  icon={iconForType[alert.type]}
                  sx={{
                    borderRadius: 2,
                    boxShadow: 1,
                    "& .MuiAlert-icon": {
                      fontSize: 20,
                    },
                  }}
                >
                  <AlertTitle>{alert.title}</AlertTitle>
                  {alert.message}
                </Alert>
              </motion.div>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationsContainer;
