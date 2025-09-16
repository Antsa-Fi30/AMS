import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";

const MiniCalendar = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar value={date} onChange={(newDate) => setDate(newDate)} />
    </LocalizationProvider>
  );
};
export default MiniCalendar;
