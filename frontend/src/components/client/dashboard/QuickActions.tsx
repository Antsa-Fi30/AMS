import { Card, CardContent, Box, Typography } from "@mui/material";
import HistoryDialog from "./HistoryDialog";

export const QuickActions = () => {
  return (
    <Card elevation={2} sx={{ height: "100%", borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Actions rapides
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <HistoryDialog />
        </Box>
      </CardContent>
    </Card>
  );
};
