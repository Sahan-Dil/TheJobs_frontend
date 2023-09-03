import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const CalendarApp = () => {
  const location = useLocation();
  const receivedProps = location.state.user;
  const token = JSON.parse(localStorage.getItem("token"));

  const data = JSON.parse(receivedProps.availability);
  const weekdaysStart = data.weekdaysStart;
  const weekdaysEnd = data.weekdaysEnd;
  const weekendsStart = data.weekendsStart;
  const weekendsEnd = data.weekendsEnd;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availability, setAvailability] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch scheduled appointments from the API and set them to the 'appointments' state
    // Replace this with your actual API endpoint when you implement the backend
    // For now, use dummy data
    const dummyAppointments = [
      {
        userId: 52,
        date: "Sun Sep 03 2023",
        time: "11:00",
        name: "John Doe",
        consultantId: 52,
      },
      {
        userId: 1,
        date: "Sun Sep 03 2023",
        time: "09:00",
        name: "John Doe",
        consultantId: 55,
      },
      // Add more dummy appointments as needed
    ];
    const filteredAppointments = dummyAppointments.filter(
      (app) => app.date === selectedDate.toDateString()
    );

    setAppointments(filteredAppointments);
  }, []);

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

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTime(null);
  };

  const handleConfirmAppointment = () => {
    let appointment;
    if (token.userId === receivedProps.userId) {
      appointment = {
        userId: token.userId,
        date: selectedDate.toDateString(),
        time: selectedTime,
        name: `Consultant ${token.personName} not available`,
        consultantId: receivedProps.userId,
      };
    } else {
      appointment = {
        userId: token.userId,
        date: selectedDate.toDateString(),
        time: selectedTime,
        name: token.personName,
        consultantId: receivedProps.userId,
      };
    }

    // Send the payload to your backend API using axios
    // You need to implement the backend API endpoint for this
    // Once implemented, replace the console.log with your API call
    console.log("Appointment Payload: ", appointment);

    // Update the appointments state to reflect the newly scheduled appointment
    setAppointments([...appointments, appointment]);

    setIsModalOpen(false);
  };

  const handleDeleteAppointment = (appointment) => {
    // Send a request to your backend API to delete the appointment
    // Replace this with your actual API endpoint when you implement the backend
    // Once implemented, replace the console.log with your API call
    console.log("Deleting Appointment: ", appointment);

    // Remove the appointment from the state
    const updatedAppointments = appointments.filter(
      (app) =>
        !(
          app.userId === appointment.userId &&
          app.date === appointment.date &&
          app.time === appointment.time
        )
    );
    setAppointments(updatedAppointments);
  };

  const timeSlots = [];
  const workingHours = {
    start: weekdaysStart,
    end: weekdaysEnd,
  };

  for (let hour = workingHours.start; hour <= workingHours.end; hour++) {
    for (let minute = 0; minute < 60; minute += 60) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      timeSlots.push(time);
    }
  }

  if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
    timeSlots.length = 0;
    for (let hour = weekendsStart; hour <= weekendsEnd; hour++) {
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
      <Grid item xs={12} container alignItems="center">
        <IconButton onClick={handlePreviousDay}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h5">{selectedDate.toDateString()}</Typography>
        <IconButton onClick={handleNextDay}>
          <ChevronRight />
        </IconButton>
      </Grid>

      {timeSlots.map((time) => (
        <Grid item xs={3} key={time}>
          <Paper
            elevation={2}
            onClick={() => {
              const appointment = appointments.find(
                (app) =>
                  app.date === selectedDate.toDateString() &&
                  app.time === time &&
                  app.userId === token.userId
              );
              const othersAppointment = appointments.find(
                (app) =>
                  app.date === selectedDate.toDateString() &&
                  app.time === time &&
                  app.userId !== token.userId
              );

              if (appointment) {
                const confirmDelete = window.confirm(
                  "Do you want to delete this appointment?"
                );
                if (confirmDelete) {
                  handleDeleteAppointment(appointment);
                }
              } else if (othersAppointment) {
                return;
              } else {
                handleScheduleAppointment(time);
              }
            }}
            style={{
              cursor: "pointer",
              padding: "10px",
              height: "100%",
              backgroundColor: appointments.some(
                (app) =>
                  app.date === selectedDate.toDateString() &&
                  app.time === time &&
                  app.consultantId === token.userId
              )
                ? "red"
                : appointments.some(
                    (app) =>
                      app.date === selectedDate.toDateString() &&
                      app.time === time
                  )
                ? "green"
                : "gray",
            }}
          >
            <Typography variant="body1">{time}</Typography>
            {appointments.map(
              (app) =>
                app.date === selectedDate.toDateString() &&
                app.time === time && (
                  <Typography key={app.userId} variant="body2">
                    {app.name}
                  </Typography>
                )
            )}
          </Paper>
        </Grid>
      ))}

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Paper
          style={{ padding: "20px", width: "300px", margin: "100px auto" }}
        >
          <Typography variant="h6">Schedule Appointment</Typography>
          <Typography variant="subtitle1">{`Schedule an appointment for one hour on ${selectedDate.toDateString()} ${selectedTime}`}</Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={handleConfirmAppointment}
          >
            Confirm Appointment
          </Button>
        </Paper>
      </Modal>
    </Grid>
  );
};

export default CalendarApp;
