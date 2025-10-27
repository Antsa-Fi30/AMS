import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Switch,
  FormControlLabel,
  Avatar,
  Box,
  Container,
  Paper,
} from "@mui/material";
import {
  Edit,
  Notifications,
  Phone,
  Email,
  Person,
  CalendarMonth,
  Security,
} from "@mui/icons-material";

const Profil = () => {
  const user = sessionStorage.getItem("user");

  // Exemple de données utilisateur
  const users = {
    name: "Rado Rakoto",
    email: "rado@example.com",
    phone: "+261 34 12 345 67",
    role: "Client",
    notifications: { email: true, sms: false },
    joinDate: "15 Mars 2024",
  };

  const doctor = user ? JSON.parse(user) : users;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* En-tête du profil */}
        <Grid size={12}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              borderRadius: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "rgba(255,255,255,0.2)",
                  border: "3px solid rgba(255,255,255,0.3)",
                  fontSize: "2rem",
                }}
              >
                {doctor.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {doctor.name}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  {doctor.role}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
                  Membre depuis {doctor.joinDate}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Informations personnelles */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Person color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Informations personnelles
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight="medium"
                    >
                      Nom complet
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      {doctor.name}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight="medium"
                    >
                      Rôle
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      {doctor.role}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Email color="action" sx={{ mr: 1, fontSize: 20 }} />
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight="medium"
                      >
                        Email
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 0.5 }}>
                        {doctor.email}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Phone color="action" sx={{ mr: 1, fontSize: 20 }} />
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight="medium"
                      >
                        Téléphone
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 0.5 }}>
                        {doctor.phone}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Button variant="contained" startIcon={<Edit />} sx={{ mt: 2 }}>
                Modifier les informations
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Paramètres et actions */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Grid container direction="column" spacing={3}>
            {/* Préférences de notification */}
            <Grid size={12}>
              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Notifications color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                      Notifications
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <FormControlLabel
                      control={<Switch color="primary" />}
                      label={
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            Email
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Recevoir les notifications par email
                          </Typography>
                        </Box>
                      }
                      sx={{ width: "100%", m: 0 }}
                    />
                  </Box>

                  <Box>
                    <FormControlLabel
                      control={<Switch color="primary" />}
                      label={
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            SMS
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Recevoir les notifications par SMS
                          </Typography>
                        </Box>
                      }
                      sx={{ width: "100%", m: 0 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Actions rapides */}
            <Grid size={12}>
              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Actions
                  </Typography>

                  <Button
                    variant="outlined"
                    startIcon={<Security />}
                    fullWidth
                    sx={{ mb: 1.5, justifyContent: "flex-start" }}
                  >
                    Changer le mot de passe
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<CalendarMonth />}
                    fullWidth
                    sx={{ justifyContent: "flex-start" }}
                  >
                    Mes rendez-vous
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profil;
