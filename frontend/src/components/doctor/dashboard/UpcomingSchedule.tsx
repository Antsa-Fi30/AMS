import { Box, Typography, List, ListItem, Avatar } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import { type Schedule } from "../../../pages/doctor/Dashboard";
import EmptyData from "../../common/EmptyData";

interface UpcomingScheduleProps {
  schedule: Schedule[];
}

export const UpcomingSchedule: React.FC<UpcomingScheduleProps> = ({
  schedule,
}) => {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <CalendarMonth color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight="bold">
          Planning à venir
        </Typography>
      </Box>

      <List
        sx={{
          p: 0,
          height: 258,
          maxHeight: 258,
          overflowY: "auto",
          scrollPadding: 0,
          scrollbarGutter: "stable",
        }}
      >
        {schedule.length > 0 ? (
          schedule.map((day, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                py: 2,
                px: 0,
                borderBottom:
                  index < schedule.length - 1 ? "1px solid" : "none",
                borderColor: "divider",
              }}
            >
              <Avatar sx={{ mr: 2, bgcolor: "primary.light" }}>
                {day.date_display.split(" ")[1]}
              </Avatar>

              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  {day.date_display}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {day.day_type} RDV
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  RDV : {day.rdv_count}
                </Typography>
              </Box>
            </ListItem>
          ))
        ) : (
          <>
            <EmptyData
              title="No futur appointment"
              hint="The ticket confirmed will appear here"
            />
          </>
        )}
      </List>
    </Box>
  );
};
