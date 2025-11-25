import { Card, CardContent, Box } from "@mui/material";
import HistoryDialog from "./HistoryDialog";

export const QuickActions = () => {
  return (
    <Card elevation={2} sx={{ height: "100%", borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <HistoryDialog />
        </Box>
      </CardContent>
    </Card>
  );
};
