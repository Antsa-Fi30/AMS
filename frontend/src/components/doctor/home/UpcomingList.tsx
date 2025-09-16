import React from "react";
import {
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import UpcomingAppointment from "./UpcomingAppointment";

const UpcomingList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Sample data for appointments
  const appointments = [
    {
      id: 1,
      name: "Dr. Remy Sharp",
      date: "22/02/2024, 05:00 AM",
      service: "Dentition",
    },
    {
      id: 2,
      name: "Dr. John Smith",
      date: "23/02/2024, 10:30 AM",
      service: "Cleaning",
    },
    {
      id: 3,
      name: "Dr. Sarah Johnson",
      date: "24/02/2024, 02:15 PM",
      service: "Checkup",
    },
    {
      id: 4,
      name: "Dr. Michael Brown",
      date: "25/02/2024, 09:00 AM",
      service: "Filling",
    },
    {
      id: 5,
      name: "Dr. Emily Davis",
      date: "26/02/2024, 11:45 AM",
      service: "Extraction",
    },
    {
      id: 6,
      name: "Dr. Robert Wilson",
      date: "27/02/2024, 03:30 PM",
      service: "Crown",
    },
    {
      id: 7,
      name: "Dr. Jennifer Lee",
      date: "28/02/2024, 01:00 PM",
      service: "Root Canal",
    },
    {
      id: 8,
      name: "Dr. David Miller",
      date: "29/02/2024, 04:20 PM",
      service: "Whitening",
    },
  ];

  const scroll = (direction: string) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 500;
      if (direction === "left") {
        scrollContainerRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollContainerRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <Box sx={{ margin: 5, position: "relative" }}>
      {/* Navigation Arrows */}
      <IconButton
        onClick={() => scroll("left")}
        sx={{
          position: "absolute",
          left: -20,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          backgroundColor: "background.paper",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          "&:hover": {
            backgroundColor: "background.100",
          },
          display: { xs: "none", md: "flex" },
        }}
      >
        <ChevronLeft />
      </IconButton>

      <IconButton
        onClick={() => scroll("right")}
        sx={{
          position: "absolute",
          right: -20,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          backgroundColor: "background.paper",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          "&:hover": {
            backgroundColor: "background.100",
          },
          display: { xs: "none", md: "flex" },
        }}
      >
        <ChevronRight />
      </IconButton>

      {/* Scrollable Container */}
      <Box
        ref={scrollContainerRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 3,
          padding: "10px 5px",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            height: 8,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "grey.100",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "grey.400",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "grey.600",
          },
        }}
      >
        {appointments.map((appointment) => (
          <Box
            key={appointment.id}
            sx={{
              minWidth: { xs: "85%", sm: "45%", md: "30%", lg: "23%" },
              flexShrink: 0,
            }}
          >
            <UpcomingAppointment {...appointment} />
          </Box>
        ))}
      </Box>

      {/* Mobile indicators */}
      {isMobile && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Swipe to view more appointments
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default UpcomingList;
