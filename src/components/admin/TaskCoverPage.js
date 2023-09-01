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

const TaskCoverPage = ({ imageUrl, title, description }) => {
  const navigate = useNavigate();
  let token = JSON.parse(localStorage.getItem("token")); // Retrieve the token from local storage

  const handleGoButtonClick = () => {
    if (title === "User Management") {
      navigate("/admin/usermanagement", {
        state: {
          jwtToken: token.token,
        },
      });
    } else if (title === "Shedules") {
      navigate("/admin", {
        state: {
          jwtToken: token.token,
        },
      });
    }
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
            src={imageUrl} // Use the imageUrl prop here
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
                {title} {/* Use the title prop here */}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description} {/* Use the description prop here */}
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

export default TaskCoverPage;
