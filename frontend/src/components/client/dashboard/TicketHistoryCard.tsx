import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { CalendarMonth, AccessTime, EditNote } from "@mui/icons-material";
import { useGetAppointmentsQuery } from "../../../services/AppointmentServices";
import EmptyData from "../../common/EmptyData";
import { getStatusColor } from "../../../utils/getColor";
import DetailsDialog from "../../common/DetailsDialog";

const TicketHistoryCard = () => {
  const { data, isLoading, isFetching } = useGetAppointmentsQuery();

  const appointments = data?.results
    .filter((a) => a.finished)
    ?.sort(
      (a, b) =>
        (a.date ? new Date(a.date).getTime() : 0) -
        (b.date ? new Date(b.date).getTime() : 0)
    );

  if (isLoading) {
    return <Skeleton sx={{ height: "100%", borderRadius: 3 }} />;
  }

  return (
    <>
      {appointments && appointments?.length > 0 ? (
        appointments?.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              alignItems: "flex-start",
            }}
          >
            {isFetching ? (
              <CircularProgress />
            ) : (
              <Card
                elevation={2}
                sx={{ width: "100%", borderRadius: 3, my: 3 }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ flex: 1 }} key={item.id}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6" fontWeight="bold" sx={{ mr: 2 }}>
                        Dr {item.doctor_name}
                      </Typography>
                      <Chip
                        label={item.status}
                        color={getStatusColor(item.status)}
                        size="small"
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccessTime color="action" sx={{ mr: 1 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Heure
                          </Typography>
                          <Typography fontWeight="medium">
                            {item.time}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CalendarMonth color="action" sx={{ mr: 1 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Date
                          </Typography>
                          <Typography fontWeight="medium">
                            {item.date}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gridColumn: "1 / -1",
                        }}
                      >
                        <EditNote color="action" sx={{ mr: 1 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Reason
                          </Typography>
                          <Typography fontWeight="medium">
                            {item.code}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
                <DetailsDialog target={item} />
              </Card>
            )}
          </Box>
        ))
      ) : (
        <EmptyData
          title="You don't have any appointment for now"
          hint="Your most recent appointment will appear here"
        />
      )}
    </>
  );
};

export default TicketHistoryCard;
