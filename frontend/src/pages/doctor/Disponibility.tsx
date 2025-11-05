import { Card, Typography, Stack, Button } from "@mui/material";
import DispoTable from "../../components/doctor/disponibility/DispoTable";
import DispoForms from "../../components/doctor/disponibility/DispoForms";
import ConfirmDeleteAll from "../../components/doctor/disponibility/ConfirmDeleteAll";
import { useState } from "react";
const Disponibility = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <Stack padding={5} spacing={2}>
      <Typography variant="h3" fontWeight={"Bold"}>
        Votre créneaux horaires
      </Typography>
      <Card elevation={3}>
        <Stack spacing={1}>
          <DispoForms />
          {isEdit ? (
            <Button
              color="success"
              variant="contained"
              onClick={() => setIsEdit(!isEdit)}
            >
              Terminer la modification
            </Button>
          ) : (
            <Button
              color="warning"
              variant="contained"
              onClick={() => setIsEdit(!isEdit)}
            >
              Modifier les creneaux
            </Button>
          )}
          <ConfirmDeleteAll />
        </Stack>
      </Card>
      <Card>
        <DispoTable edit={isEdit} />
      </Card>
    </Stack>
  );
};

export default Disponibility;
