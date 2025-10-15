import React from "react";
import { Typography, IconButton, Stack, Chip, Divider } from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import GenericDialog from "../../common/GenericDialog";
import type { AppointmentType } from "../../../services/AppointmentServices";

interface DetailsDialogProps {
  target: AppointmentType;
}

const DetailsDialog: React.FC<DetailsDialogProps> = ({ target }) => {
  return (
    <GenericDialog
      title={`${target.patient_name} - Détails du rendez-vous`}
      renderTrigger={(open) => (
        <IconButton aria-label="Voir détails" size="small" onClick={open}>
          <RemoveRedEye />
        </IconButton>
      )}
    >
      <Stack spacing={2} sx={{ pt: 2, px: 1 }}>
        {/* Statut */}
        <Chip
          label={
            target.status === "pending"
              ? "En attente"
              : target.status === "confirmed"
              ? "Confirmé"
              : "Refusé"
          }
          color={
            target.status === "pending"
              ? "warning"
              : target.status === "confirmed"
              ? "success"
              : "error"
          }
          sx={{ width: "fit-content" }}
        />
        <Divider />
        {/* Infos principales */}
        <Stack spacing={1}>
          <Typography variant="h3">Patient:</Typography>
          <Typography variant="body1">{target.patient_name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {target.patient_phone}
          </Typography>
        </Stack>
        <Divider />
        <Stack spacing={1}>
          <Typography variant="h3">Motif</Typography>
          <Typography variant="body1">{target.reason}</Typography>
        </Stack>
        <Divider />
        <Stack spacing={1}>
          <Typography variant="h3">Descriptions </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {target.descriptions || "N/A"}
          </Typography>
        </Stack>
        <Divider />
        {target.status === "rejected" && (
          <>
            <Stack spacing={1}>
              <Typography variant="h3">Notes </Typography>
              <Typography variant="body2" color="text.secondary">
                {target.notes || "N/A"}
              </Typography>
            </Stack>
            <Divider />
          </>
        )}
        <Stack spacing={1} direction={{ xs: "column", sm: "row" }} gap={2}>
          <Stack>
            <Typography variant="h3">Date</Typography>
            <Typography variant="body1">{target.date || "N/A"}</Typography>
          </Stack>
          <Stack>
            <Typography variant="h3">Heure</Typography>
            <Typography variant="body1">{target.time || "N/A"}</Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack spacing={1}>
          <Typography variant="h3">Docteur</Typography>
          <Typography variant="body1">
            {target.doctor_name || "Non assigné"}
          </Typography>
        </Stack>
        <Divider />
        <Stack spacing={1}>
          <Typography variant="h3">Expiration du ticket</Typography>
          <Typography variant="body1">{target.expire || "N/A"}</Typography>
        </Stack>
        <Divider />
        <Stack spacing={1}>
          <Typography variant="h3">Date de création</Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(target.requested_at).toLocaleString()}
          </Typography>
        </Stack>
        <Divider />
        <Stack direction={"row"} alignItems={"center"} spacing={3}>
          <Typography variant="h3">Dernière mise à jour</Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(target.updated_at).toLocaleString()}
          </Typography>
        </Stack>
      </Stack>
    </GenericDialog>
  );
};

export default DetailsDialog;
