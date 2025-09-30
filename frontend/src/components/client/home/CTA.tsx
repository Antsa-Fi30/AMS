import {
  Card,
  CardContent,
  Divider,
  Typography,
  Stack,
  Button,
} from "@mui/material";

const CTA = () => {
  return (
    <Card
      elevation={2}
      sx={{
        width: "90%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" fontSize={16} textAlign={"center"} sx={{ p: 2 }}>
        Quick Actions
      </Typography>
      <Divider />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack spacing={2} width="100%">
          <Button variant="contained" color="primary" fullWidth>
            Book Appointment
          </Button>
          <Button variant="contained" color="secondary" fullWidth>
            See your profil
          </Button>
          <Button variant="text" color="info" fullWidth>
            See All Appointments
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CTA;
