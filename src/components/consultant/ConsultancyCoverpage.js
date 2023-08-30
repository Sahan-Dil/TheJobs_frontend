import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const ConsultancyCoverpage = () => {
  const navigate = useNavigate();

  const handleGoButtonClick = () => {
    navigate("/consultant/consultancy");
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
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
          <Card sx={{ height: "100%", borderRadius: "200px", maxWidth: 345 }}>
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
