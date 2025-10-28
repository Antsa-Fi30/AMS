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
import GenericDialog from "./GenericDialog";
import type { AppointmentType } from "../../services/AppointmentServices";
import DescriptionDetails from "./DescriptionDetails";
import { formatDateToLocalString } from "../../utils/Formats";

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
                : target.status === "rejected"
                ? "Refusé"
                : "Canceled"
            }
            color={
              target.status === "pending"
                ? "warning"
                : target.status === "confirmed"
                ? "success"
                : target.status === "rejected"
                ? "error"
                : "secondary"
            }
            sx={{ width: "fit-content" }}
          />
          {target.finished && (
            <Chip
              label={"Finished"}
              color={"primary"}
              sx={{ width: "fit-content" }}
            />
          )}
        </Stack>

        <Divider flexItem sx={{ borderStyle: "dashed" }} />

        {/* Détails structurés */}
        <Stack spacing={1} direction={{ xs: "column", sm: "row" }} gap={2}>
          <Stack spacing={5} direction="row" alignItems={"center"}>
            <Stack spacing={1} direction="row" alignItems={"center"}>
              <Tooltip title={"Date du rendez-vous"}>
                <CalendarMonth />
              </Tooltip>
              <Typography variant="body1">
                {formatDateToLocalString(target.date) || "N/A"}
              </Typography>
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
              <Typography variant="body1">
                {formatDateToLocalString(target.expire) || "N/A"}
              </Typography>
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
