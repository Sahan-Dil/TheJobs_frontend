import React from "react";
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
import { Doughnut, Bar } from "react-chartjs-2";

function Reports() {
  const pieChartData = {
    labels: ["UK", "Australia", "England"],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ["#3BB273", "#44A8D4", "#2E5EAA"],
      },
    ],
  };

  const barChartData = {
    labels: ["Sahan", "Dilshan", "Saman", "Ria", "Julia", "Kanaka"],
    datasets: [
      {
        label: "Appointment Count",
        data: [4, 6, 2, 7, 4, 2],
        backgroundColor: [
          "#3BB273",
          "#44A8D4",
          "#2E5EAA",
          "#3BB273",
          "#44A8D4",
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
                  6
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
                  13
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
                  19
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
        </Grid>
      </Box>
    </Container>
  );
}

export default Reports;
