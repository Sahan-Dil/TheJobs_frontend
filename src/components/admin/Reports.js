import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
  Divider,
  Container,
} from "@mui/material";
import "chart.js/auto";
import { useLocation } from "react-router-dom";
import { Doughnut, Bar } from "react-chartjs-2";
import axios from "axios";

function Reports() {
  const location = useLocation();
  const [userCount, setUserCount] = useState(0);
  const [consultantCount, setConsultantCount] = useState(0);
  const [appointmentsByCountry, setAppointmentsByCountry] = useState({});
  const [appointmentsByCategory, setAppointmentsByCategory] = useState({});
  const [totalAssignmentCount, setTotalAssignmentCount] = useState(0);
  const [appointmentsByConsultant, setAppointmentsByConsultant] = useState({});

  const userList = location.state.userList;
  console.log(userList);

  useEffect(() => {
    // Get user and consultant counts
    getUsers();
    getConsultants();

    // Fetch appointment data for each consultant
    fetchAppointmentsForConsultants();
  }, []);

  const apiUrl = "http://localhost:8080/auth/users";

  const getUsers = () => {
    axios
      .get(apiUrl, {
        params: { role: "user" },
      })
      .then((response) => {
        setUserCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching user list", error);
      });
  };

  const getConsultants = () => {
    axios
      .get(apiUrl, {
        params: { role: "consultant" },
      })
      .then((response) => {
        setConsultantCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching consultant list", error);
      });
  };
  const token = JSON.parse(localStorage.getItem("token"));
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.token}`,
  };

  const fetchAppointmentsForConsultants = () => {
    const consultantIds = userList.map((user) => user.userId);
    const appointmentsPromises = consultantIds.map((consultantId) =>
      axios.get(
        `http://localhost:8080/schedule/getByConsultant/${consultantId}`,
        { headers }
      )
    );
    const appointmentsByCountryData = {}; // To store appointment counts by country
    const appointmentsByCategoryData = {}; // To store appointment counts by country
    const appointmentsByConsultantData = {}; // To store appointment counts by consultant
    let totalAssignmentCount = 0;

    Promise.all(appointmentsPromises)
      .then((responses) => {
        // Process appointment data and calculate counts by country and consultant

        responses.forEach((response, index) => {
          const consultantId = consultantIds[index];
          const consultant = userList.find(
            (user) => user.userId === consultantId
          ); //--------
          const appointments = response.data;

          // Calculate counts by country
          const category = consultant.category;
          if (category) {
            if (!appointmentsByCategoryData[category]) {
              appointmentsByCategoryData[category] = 0;
            }
            appointmentsByCategoryData[category] += appointments.length;
          }

          // Calculate counts by country
          const country = consultant.country;
          if (country) {
            if (!appointmentsByCountryData[country]) {
              appointmentsByCountryData[country] = 0;
            }
            appointmentsByCountryData[country] += appointments.length;
          }

          // Calculate counts by consultant
          const consultantName = userList.find(
            (user) => user.userId === consultantId
          ).personName;

          appointmentsByConsultantData[consultantName] = appointments.length;
          totalAssignmentCount += appointments.length;
        });

        setAppointmentsByCountry(appointmentsByCountryData);
        setAppointmentsByCategory(appointmentsByCategoryData);
        setAppointmentsByConsultant(appointmentsByConsultantData);
        setTotalAssignmentCount(totalAssignmentCount);
      })
      .catch((error) => {
        console.error("Error fetching appointments for consultants", error);
      });
  };

  const pieChartData = {
    labels: Object.keys(appointmentsByCountry),
    datasets: [
      {
        data: Object.values(appointmentsByCountry),
        backgroundColor: ["#3BB273", "#44A8D4", "#2E5EAA"],
      },
    ],
  };
  const pieChartDataCat = {
    labels: Object.keys(appointmentsByCategory),
    datasets: [
      {
        data: Object.values(appointmentsByCategory),
        backgroundColor: ["#cdef35", " #e5bf24", " #0ecfc9"],
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(appointmentsByConsultant),
    datasets: [
      {
        label: "Appointment Count",
        data: Object.values(appointmentsByConsultant),
        backgroundColor: [
          "#cdef35",
          "#44A8D4",
          "#0ecfc9",
          "#3BB273",
          "#e5bf24",
          "#2E5EAA",
        ],
      },
    ],
  };

  return (
    <Container maxWidth="lg">
      <Box
        border={1}
        borderColor="primary.main"
        borderRadius={2}
        p={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="90%"
        margin="100px auto"
      >
        <Typography variant="h5" gutterBottom>
          Reports Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Consultant Count
                </Typography>
                <Typography variant="h4" component="div" color="primary">
                  {consultantCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  User Count
                </Typography>
                <Typography variant="h4" component="div" color="secondary">
                  {userCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Total Users Count
                </Typography>
                <Typography variant="h4" component="div">
                  {userCount + consultantCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper>
              <Box p={2}>
                <Typography variant="h6" gutterBottom>
                  Appointments by Country
                </Typography>
                <Divider />
                <Box
                  mt={2}
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "50vh",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Doughnut data={pieChartData} />
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <Paper>
              <Box p={2}>
                <Typography variant="h6" gutterBottom>
                  Appointment Count by Consultant
                </Typography>
                <Divider />
                <Box mt={2} style={{ height: "50vh" }}>
                  <Bar data={barChartData} />
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <Card
              style={{
                display: "flex",
                width: "100%",
                height: "50vh",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div">
                  Total Scheduled appointments
                </Typography>
                <Typography
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  variant="h6"
                  component="div"
                >
                  {totalAssignmentCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper>
              <Box p={2}>
                <Typography variant="h6" gutterBottom>
                  Appointments by Category
                </Typography>
                <Divider />
                <Box
                  mt={2}
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "50vh",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Doughnut data={pieChartDataCat} />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Reports;
