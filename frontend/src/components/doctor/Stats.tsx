import { Card, CardContent, Typography, Stack, Box } from "@mui/material";

import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Stats = () => {
  const summary = [
    {
      label: "Pending",
      value: 8,
      color: "#ff9800",
      icon: <PendingActionsIcon fontSize="large" />,
      lightGradient: "linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)",
      darkGradient:
        "linear-gradient(135deg, rgba(255,154,0,0.18) 0%, rgba(255,142,0,0.06) 100%)",
    },
    {
      label: "Accepted",
      value: 8,
      color: "#4caf50",
      icon: <CheckCircleIcon fontSize="large" />,
      lightGradient: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)",
      darkGradient:
        "linear-gradient(135deg, rgba(76,175,80,0.16) 0%, rgba(76,175,80,0.04) 100%)",
    },
    {
      label: "Rejected",
      value: 8,
      color: "#f44336",
      icon: <CancelIcon fontSize="large" />,
      lightGradient: "linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)",
      darkGradient:
        "linear-gradient(135deg, rgba(244,67,54,0.16) 0%, rgba(244,67,54,0.04) 100%)",
    },
  ];
  return (
    <div className="m-auto">
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Box>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 2, md: 2 }}
          >
            {summary.map((item) => (
              <Card
                key={item.label}
                sx={(theme) => ({
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  background:
                    theme.palette.mode === "dark"
                      ? item.darkGradient
                      : item.lightGradient,
                  borderRadius: 3,
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 6px 24px rgba(2,6,23,0.6)"
                      : "0 4px 12px rgba(0,0,0,0.06)",
                  transition: "transform 0.24s ease, box-shadow 0.24s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 12px 40px rgba(2,6,23,0.7)"
                        : "0 10px 30px rgba(0,0,0,0.12)",
                  },
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.92)"
                      : "#0f1724",
                  p: { xs: 1, md: 1.5 },
                })}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    padding={2}
                    sx={{ gap: 2 }}
                  >
                    <Box sx={{ color: item.color }}>{item.icon}</Box>
                    <Box>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        fontSize={20}
                        sx={{ color: item.color }}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ mt: 0.5 }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      </Box>
    </div>
  );
};

export default Stats;
