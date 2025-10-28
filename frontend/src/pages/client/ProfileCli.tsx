import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Avatar,
  Box,
  Container,
  Paper,
} from "@mui/material";
import {
  Edit,
  Phone,
  Email,
  Person,
  Security,
  Settings,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProfilCli = () => {
  const navigate = useNavigate();
  const patient = sessionStorage.getItem("user");
  const user = patient ? JSON.parse(patient) : {};

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
                {user.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {user.name}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  {user.role}
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
                      {user.name}
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
                        {user.email}
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
                        {user.phone_number}
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
              {/* <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Notifications color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                      Notifications
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <FormControlLabel
                      control={<Switch checked={true} color="primary" />}
                      label={
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            Push
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Recevoir les notifications de
                          </Typography>
                        </Box>
                      }
                      sx={{ width: "100%", m: 0 }}
                    />
                  </Box>

                  <Box>
                    <FormControlLabel
                      control={<Switch checked={false} color="primary" />}
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
              </Card> */}
            </Grid>

            {/* Actions rapides */}
            <Grid size={12}>
              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
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
                    startIcon={<Settings />}
                    fullWidth
                    sx={{ justifyContent: "flex-start" }}
                    onClick={() => navigate("/patient/settings/")}
                  >
                    Settings
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

export default ProfilCli;
