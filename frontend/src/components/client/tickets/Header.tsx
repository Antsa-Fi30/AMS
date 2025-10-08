import React from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import AppointmentCreator from "./AppointmentCreator";

const Header = () => {
  const [filter, setFilter] = React.useState("all");

  const handleFilter = (
    _: React.MouseEvent<HTMLElement>,
    newFilter: string
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={3}
    >
      {/* Titre */}
      <Typography variant="h5" fontWeight="bold">
        My Appointment
      </Typography>

      {/* Barre d’actions */}
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Recherche */}
        <TextField size="small" placeholder="Rechercher..." />

        {/* Filtres */}
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilter}
          size="small"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="pending">⏳ Pending</ToggleButton>
          <ToggleButton value="confirmed">✅ Accepted</ToggleButton>
          <ToggleButton value="rejected">❌ Rejected</ToggleButton>
        </ToggleButtonGroup>

        {/* Action */}
        <AppointmentCreator />
      </Stack>
    </Box>
  );
};

export default Header;
