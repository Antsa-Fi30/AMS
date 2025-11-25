import React, { useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import fr from "date-fns/locale/fr";

const locales = {
  fr: fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
}

const AppointmentCalendar = () => {
  // Exemple de données → tu vas remplacer par tes appointments du backend
  const events: CalendarEvent[] = useMemo(
    () => [
      {
        title: "Consultation - Marie",
        start: new Date(2025, 10, 20, 8, 0),
        end: new Date(2025, 10, 20, 9, 0),
      },
      {
        title: "Contrôle - Paul",
        start: new Date(2025, 10, 20, 10, 0),
        end: new Date(2025, 10, 20, 10, 30),
      },
    ],
    []
  );

  return (
    <div style={{ height: "80vh", padding: 20 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        defaultView="week"
        step={30}
        culture="fr"
        style={{ height: "100%", background: "#0984e3", borderRadius: 8 }}
      />
    </div>
  );
};

export default AppointmentCalendar;
