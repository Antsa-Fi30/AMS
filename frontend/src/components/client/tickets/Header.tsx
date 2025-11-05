import React, { type SetStateAction } from "react";
import {
  Box,
  Stack,
  // TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import AppointmentCreator from "./AppointmentCreator";

interface HeaderClientsProps {
  state: string;
  client?: boolean;
  set: React.Dispatch<SetStateAction<string>>;
}

const Header: React.FC<HeaderClientsProps> = ({ state, set, client }) => {
  const handleFilter = (
    _: React.MouseEvent<HTMLElement>,
    newFilter: string
  ) => {
    if (newFilter !== null) {
      set(newFilter);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={3}
    >
      {/* Barre d’actions */}
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Recherche */}
        {/* <TextField size="small" placeholder="Rechercher..." /> */}

        {/* Filtres */}
        <ToggleButtonGroup
          value={state}
          exclusive
          onChange={handleFilter}
          size="small"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="pending">⏳ Pending</ToggleButton>
          <ToggleButton value="confirmed">✅ Accepted</ToggleButton>
          <ToggleButton value="rejected">❌ Rejected</ToggleButton>
          <ToggleButton value="canceled">💥 Canceled</ToggleButton>
        </ToggleButtonGroup>

        {/* Action */}
        {client && <AppointmentCreator />}
      </Stack>
    </Box>
  );
};

export default Header;
