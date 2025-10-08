import {
  Card,
  CardContent,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { CheckCircle, HourglassEmpty, Cancel } from "@mui/icons-material";

const Notifications = () => {
  return (
    <Card
      elevation={2}
      sx={{
        width: "90%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" fontSize={16} textAlign={"center"} sx={{ p: 2 }}>
        Recent Notifications
      </Typography>
      <Divider />
      <CardContent sx={{ flexGrow: 1 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText
              primary="Your appointment on Oct 12 is confirmed"
              secondary="21 Sept"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <HourglassEmpty color="warning" />
            </ListItemIcon>
            <ListItemText
              primary="Your request for Sept 25 is pending"
              secondary="19 Sept"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Cancel color="error" />
            </ListItemIcon>
            <ListItemText
              primary="Your appointment on Sept 15 was rejected"
              secondary="15 Sept"
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default Notifications;
