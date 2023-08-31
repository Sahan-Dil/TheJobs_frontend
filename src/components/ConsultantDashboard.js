// src/components/ConsultantDashboard.js
import React from "react";
import AddConsultancy from "./consultant/AddConsultancy";
import Calendar from "./Calendar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ConsultancyCoverpage from "./consultant/ConsultancyCoverpage";

function ConsultantDashboard() {
  return (
    <div>
      <div style={{ margin: "64px" }}></div>
      Consultant Dashboard
      {/* <Calendar /> */}
      <ConsultancyCoverpage />
    </div>
  );
}

export default ConsultantDashboard;
