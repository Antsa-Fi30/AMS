import { Stack, Button } from "@mui/material";
import DispoForms from "./DispoForms";
import ConfirmDeleteAll from "./ConfirmDeleteAll";

const ActionButtons = () => {
  return (
    <Stack spacing={1}>
      <DispoForms />
      <Button color="warning" variant="contained">
        Modifier les creneaux
      </Button>
      <ConfirmDeleteAll />
    </Stack>
  );
};

export default ActionButtons;
