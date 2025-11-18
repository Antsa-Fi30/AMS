import type { Appointments } from "../services/AppointmentServices";

export function getAppointmentPermissions(lastApt: Appointments | null) {
  if (!lastApt) {
    return {
      canConsult: true,
      canFollow: false,
      canCreate: true,
    };
  }

  if (!lastApt.finished) {
    return {
      canConsult: false,
      canFollow: false,
      canCreate: false,
    };
  }

  if (lastApt.type === "first" && lastApt.finished) {
    return {
      canConsult: true,
      canFollow: true,
      canCreate: true,
    };
  }

  if (lastApt.type === "follow_up" && lastApt.finished) {
    return {
      canConsult: true,
      canFollow: true,
      canCreate: true,
    };
  }

  return {
    canConsult: true,
    canFollow: false,
    canCreate: true,
  };
}
