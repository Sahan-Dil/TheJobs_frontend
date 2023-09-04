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
import axios from "axios";

const CalendarApp = () => {
  const location = useLocation();
  const receivedProps = location.state.user;
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>", receivedProps);

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

    const apiUrl = `http://localhost:8080/schedule/getByConsultant/${receivedProps.userId}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    };
    try {
      axios
        .get(apiUrl, { headers })
        .then((response) => {
          const filteredAppointments = response.data.filter(
            (app) => app.date === selectedDate.toDateString()
          );

          setAppointments(filteredAppointments);

          console.log("Data retrieved successfully:", response.data);
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [selectedDate]);

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
        userName: `Consultant ${token.personName} not available`,
        consultantId: receivedProps.userId,
      };
    } else {
      appointment = {
        userId: token.userId,
        date: selectedDate.toDateString(),
        time: selectedTime,
        userName: token.personName,
        consultantId: receivedProps.userId,
      };
    }
    const apiUrl = "http://localhost:8080/schedule/create";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    };
    try {
      axios
        .post(apiUrl, appointment, { headers })
        .then((response) => {
          console.log("API Response:", response.data);
          setAppointments([...appointments, appointment]);
          // Perform further actions based on the response
        })
        .catch((error) => {
          console.error("API Error:", error.message);
          // Handle the error appropriately
        });
    } catch (e) {
      console.error(e);
    }

    // Send the payload to your backend API using axios
    // You need to implement the backend API endpoint for this
    // Once implemented, replace the console.log with your API call
    console.log("Appointment Payload: ", appointment);

    // Update the appointments state to reflect the newly scheduled appointment

    setIsModalOpen(false);
  };

  const handleDeleteAppointment = (appointment) => {
    console.log("Deleting Appointment: ", appointment);

    const apiUrl = "http://localhost:8080/schedule/delete";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    };
    try {
      axios
        .delete(apiUrl, { data: appointment, headers })
        .then((response) => {
          console.log("API Response:", response.data);
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
        })
        .catch((error) => {
          console.error("API Error:", error.message);
          // Handle the error appropriately
        });
    } catch (e) {
      console.error(e);
    }
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
                  app.consultantId === app.userId
              )
                ? "#FF8A80"
                : appointments.some(
                    (app) =>
                      app.date === selectedDate.toDateString() &&
                      app.time === time
                  )
                ? "#50C878"
                : "gray",
            }}
          >
            <Typography variant="body1">{time}</Typography>
            {appointments.map(
              (app) =>
                app.date === selectedDate.toDateString() &&
                app.time === time && (
                  <Typography key={app.userId} variant="body2">
                    {app.userName}
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
          <Typography variant="subtitle1">
            {receivedProps.userId === token.userId
              ? `Make sure you are not available on ${selectedDate.toDateString()} ${selectedTime}`
              : `Schedule an appointment for one hour on ${selectedDate.toDateString()} ${selectedTime}`}
          </Typography>
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
