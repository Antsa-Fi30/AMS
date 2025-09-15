import { Box } from "@mui/material";
import Stats from "../../components/doctor/Stats";
import UpcomingList from "../../components/doctor/UpcomingList";

const Dashboard = () => {
  return (
    <div>
      <Stats />
      <Box mt={5}>
        <UpcomingList />
      </Box>
    </div>
  );
};

export default Dashboard;
