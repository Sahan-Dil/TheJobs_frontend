import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const CalendarApp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availability, setAvailability] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch availability data from your API and setAvailability
    fetchAvailability();
  }, []);

  const fetchAvailability = () => {
    fetch("your-fetch-api-endpoint")
      .then((response) => response.json())
      .then((data) => setAvailability(data))
      .catch((error) => {
        // Handle error
      });
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleScheduleAppointment = (time) => {
    setSelectedTime(time);
    setIsModalOpen(true);
  };

  const handleToggleUnavailability = async (time) => {
    const existingRecord = availability.find(
      (item) =>
        item.date.toDateString() === selectedDate.toDateString() &&
        item.time === time
    );

    if (existingRecord) {
      // Undo unavailability
      await fetch(`your-undo-api-endpoint/${existingRecord.id}`, {
        method: "DELETE",
      });
    } else {
      // Mark as unavailable
      await fetch("your-create-api-endpoint", {
        method: "POST",
        body: JSON.stringify({
          consultant: "John", // Replace with consultant name
          date: selectedDate.toISOString().split("T")[0], // Format date
          time: time,
          status: "unavailable",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    fetchAvailability();
    setIsModalOpen(false);
    setSelectedTime(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTime(null);
  };

  const handleAppointmentSubmit = async () => {
    if (selectedTime) {
      await handleToggleUnavailability(selectedTime);
      setIsModalOpen(false);
      setSelectedTime(null);
    }
  };

  const timeSlots = [];
  const workingHours = {
    start: 8, // 8 AM
    end: 17, // 5 PM
  };

  for (let hour = workingHours.start; hour <= workingHours.end; hour++) {
    for (let minute = 0; minute < 60; minute += 60) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      timeSlots.push(time);
    }
  }

  // Adjust working hours for weekends
  if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
    timeSlots.length = 0;
    for (let hour = 9; hour <= 12; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        timeSlots.push(time);
      }
    }
  }

  return (
    <Grid container spacing={2}>
      {/* Calendar Header */}
      <Grid item xs={12} container alignItems="center">
        <IconButton onClick={handlePreviousDay}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h5">{selectedDate.toDateString()}</Typography>
        <IconButton onClick={handleNextDay}>
          <ChevronRight />
        </IconButton>
      </Grid>

      {/* Render Calendar Cells */}
      {timeSlots.map((time) => (
        <Grid item xs={3} key={time}>
          <Paper
            elevation={2}
            onClick={() => handleScheduleAppointment(time)} // Always open modal on click
            style={{
              cursor: "pointer",
              padding: "10px",
              backgroundColor: availability.some(
                (item) =>
                  item.date.toDateString() === selectedDate.toDateString() &&
                  item.time === time
              )
                ? "#fa8072" // Change color for marked unavailable slots
                : "white",
            }}
          >
            <Typography variant="body1">{time}</Typography>
            {/* Render Availability */}
            {availability.map(
              (available) =>
                available.date.toDateString() === selectedDate.toDateString() &&
                available.time === time && (
                  <Typography key={available.time} variant="body2">
                    Unavailable
                  </Typography>
                )
            )}
          </Paper>
        </Grid>
      ))}

      {/* Appointment Modal */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Paper
          style={{ padding: "20px", width: "300px", margin: "100px auto" }}
        >
          <Typography variant="h6">Mark Unavailable</Typography>
          <Typography variant="subtitle1">{`Marking unavailable for ${selectedDate.toDateString()} ${selectedTime}`}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAppointmentSubmit}
            style={{ marginTop: "10px" }}
          >
            Mark/Unmark Unavailable
          </Button>
        </Paper>
      </Modal>
    </Grid>
  );
};

export default CalendarApp;
