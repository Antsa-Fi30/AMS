import type { Appointments } from "../services/AppointmentServices";

export function getAppointmentPermissions(lastApt: Appointments | null) {
  if (!lastApt || lastApt.code === "") {
    return {
      canConsult: true,
      canFollow: false,
    };
  }

  if (!lastApt.finished) {
    return {
      canConsult: false,
      canFollow: false,
    };
  }

  if (lastApt.type === "first" && lastApt.finished) {
    return {
      canConsult: true,
      canFollow: true,
    };
  }

  if (lastApt.type === "follow_up" && lastApt.finished) {
    return {
      canConsult: true,
      canFollow: true,
    };
  }

  if (
    lastApt.type === "first" &&
    lastApt.descriptions?.notes === "Contrôle nécessaire"
  ) {
    return {
      canConsult: false,
      canFollow: false,
    };
  }

  return {
    canConsult: true,
    canFollow: false,
  };
}
