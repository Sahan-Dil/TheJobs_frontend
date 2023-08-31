import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConsultancyCoverpage = () => {
  const navigate = useNavigate();
  let token = JSON.parse(localStorage.getItem("token")); // Retrieve the token from local storage
  let consutancyData = null;

  useEffect(() => {
    if (token) {
      const apiUrl = "http://localhost:8080/consultant/getConsultancy/2"; // API endpoint

      // Make the API call using Axios
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        })
        .then((response) => {
          consutancyData = response.data;
          console.log("Consultancy Data:", response.data);
        })
        .catch((error) => {
          console.error("API Error:", error);
          // Handle the error appropriately
        });
    }
    console.log("token:", token);
  }, [token]);

  const handleGoButtonClick = () => {
    navigate("/consultant/consultancy", {
      state: {
        jwtToken: token.token,
        personName: token.personName,
        phone: token.phone,
        userId: token.userId,
        username: token.username,
        consultancyId: consutancyData ? consutancyData.consultancyId : null,
        country: consutancyData ? consutancyData.country : null,
        gender: consutancyData ? consutancyData.gender : null,
        description: consutancyData ? consutancyData.description : null,
        availability: consutancyData ? consutancyData.availability : null,
      },
    });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        {/* Left side - Image */}
        <Grid item xs={12} md={6} lg={8}>
          <img
            src="https://source.unsplash.com/random?wallpapers"
            alt="Consultancy Image"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </Grid>

        {/* Right side - Card */}
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card sx={{ height: "auto", borderRadius: "200px", maxWidth: 345 }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100%",
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                Add/ Edit consultant details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You can add your consultant details in here... it defines your
                specific country and your available time slots as well...
              </Typography>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button size="small" onClick={handleGoButtonClick}>
                  GO
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConsultancyCoverpage;
