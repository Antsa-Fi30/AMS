import React from "react";
import {
  Typography,
  IconButton,
  Stack,
  Chip,
  Divider,
  Tooltip,
  Paper,
} from "@mui/material";
import {
  Person,
  CalendarMonth,
  LockClock,
  RemoveRedEye,
  TimerOffRounded,
  LocalHospital,
  LocalPhone,
} from "@mui/icons-material";
import GenericDialog from "../../common/GenericDialog";
import type { AppointmentType } from "../../../services/AppointmentServices";
import DescriptionDetails from "./DescriptionDetails";

interface DetailsDialogProps {
  target: AppointmentType;
}

const DetailsDialog: React.FC<DetailsDialogProps> = ({ target }) => {
  const requested = new Date(target.requested_at);
  const updated = new Date(target.updated_at);

  // On compare les timestamps à la seconde près
  const isModified = Math.abs(updated.getTime() - requested.getTime()) > 1000;
  return (
    <GenericDialog
      title={`${target.patient_name} - Détails du rendez-vous`}
      renderTrigger={(open) => (
        <Tooltip title={"Descriptions"}>
          <IconButton
            aria-label="Voir détails"
            size="small"
            onClick={open}
            color="secondary"
          >
            <RemoveRedEye />
          </IconButton>
        </Tooltip>
      )}
    >
      {/* <Stack spacing={2} sx={{ pt: 2, px: 1 }}>
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
        <DescriptionDetails target={target.descriptions} />
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
      </Stack> */}
      <Stack
        spacing={2}
        sx={{
          p: 2,
          borderRadius: 3,
          bgcolor: "background.paper",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        {/* Description libre */}
        <Stack direction={"row"} alignItems={"center"} spacing={5}>
          <Typography variant="h5" color="primary">
            {target.reason ? target.reason : "APT-0005"}
          </Typography>
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
        </Stack>

        <Divider flexItem sx={{ borderStyle: "dashed" }} />

        {/* Détails structurés */}
        <Stack spacing={1} direction={{ xs: "column", sm: "row" }} gap={2}>
          <Stack spacing={5} direction="row" alignItems={"center"}>
            <Stack spacing={1} direction="row" alignItems={"center"}>
              <Tooltip title={"Date du rendez-vous"}>
                <CalendarMonth />
              </Tooltip>
              <Typography variant="body1">{target.date || "N/A"}</Typography>
            </Stack>
            <Stack spacing={1} direction="row" alignItems={"center"}>
              <Tooltip title={"Heure du rendez-vous"}>
                <LockClock />
              </Tooltip>
              <Typography variant="body1">{target.time || "N/A"}</Typography>
            </Stack>
            <Stack spacing={1} direction="row" alignItems={"center"}>
              <Tooltip title={"Expiration du ticket du rendez-vous"}>
                <TimerOffRounded />
              </Tooltip>
              <Typography variant="body1">{target.expire || "N/A"}</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Divider flexItem sx={{ borderStyle: "dashed" }} />

        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Stack spacing={5} direction="row" flexWrap="wrap" useFlexGap>
            <Stack direction="row" spacing={0.5} alignItems={"center"}>
              <Person />
              <Typography variant="body1">Patient :</Typography>
            </Stack>
            <Typography variant="body1">{target.patient_name}</Typography>
            <Stack direction="row" spacing={0.5} alignItems={"center"}>
              <LocalPhone sx={{ color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {target.patient_phone}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Divider flexItem sx={{ borderStyle: "dashed" }} />
        <DescriptionDetails target={target.descriptions} />
        <Divider flexItem sx={{ borderStyle: "dashed" }} />

        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Stack spacing={5} direction="row" flexWrap="wrap" useFlexGap>
            <Stack direction="row" spacing={0.5} alignItems={"center"}>
              <LocalHospital />
              <Typography variant="body1">Assigné à :</Typography>
            </Stack>
            <Typography variant="body1">Dr {target.doctor_name}</Typography>
            <Stack direction="row" spacing={0.5} alignItems={"center"}>
              <LocalPhone sx={{ color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {target.doctor_phone}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        {target.status === "rejected" && (
          <>
            <Divider flexItem sx={{ borderStyle: "dashed" }} />
            <Typography variant="body1">Raison de refus </Typography>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  {target.notes || "N/A"}
                </Typography>
              </Stack>
            </Paper>
          </>
        )}
        <Divider flexItem sx={{ borderStyle: "dashed" }} />

        <Stack spacing={3} direction={"row"} alignSelf={"end"}>
          <Typography variant="body2" color="textDisabled">
            crée le:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {requested.toLocaleString()}
          </Typography>
        </Stack>
        {isModified && (
          <Stack direction={"row"} alignSelf={"end"} spacing={3}>
            <Typography variant="body2" color="textDisabled">
              Modifié le:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {updated.toLocaleString()}
            </Typography>
          </Stack>
        )}
      </Stack>
    </GenericDialog>
  );
};

export default DetailsDialog;
