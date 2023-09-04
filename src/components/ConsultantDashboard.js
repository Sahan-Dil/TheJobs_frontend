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
import TaskCoverPage from "./TaskCoverPage";
import img02 from "../img/ing02.png";

function ConsultantDashboard() {
  const description2 =
    "description for Shedules ...............................................";
  const title2 = "Shedules";
  const imageUrl = "https://source.unsplash.com/random?wallpapers";

  return (
    <div>
      <div
        style={{
          marginTop: "65px",
        }}
      >
        {" "}
      </div>
      <ConsultancyCoverpage />
      <TaskCoverPage
        imageUrl={img02}
        title={title2}
        description={description2}
        role="consultant"
      />
    </div>
  );
}

export default ConsultantDashboard;
