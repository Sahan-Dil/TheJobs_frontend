import axios from "axios";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function UserRegForm({ role, token }) {
  const navigate = useNavigate();
  let apiUrl;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDone = async (event) => {
    const input = {
      personName: formData.name,
      phone: formData.phone,
      username: formData.email,
      password: "password",
    };
    console.log("input:", input);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    if (role === "consultant") {
      apiUrl = "http://localhost:8080/admin/registerConsultant";
    } else if (role === "user") {
      apiUrl = "http://localhost:8080/auth/register";
    }
    try {
      axios
        .post(apiUrl, input, { headers })
        .then((response) => {
          console.log("API Response:", response.data);
          // Perform further actions based on the response
        })
        .catch((error) => {
          console.error("API Error:", error.message);
          // Handle the error appropriately
        });
      setFormData({
        name: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      // Handle error
      console.error("Error during registration:", error);
    }
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        maxWidth: "90%",
        margin: "auto",
        // marginTop: "100px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Add New / update Existing
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="name"
            name="name"
            label="Full Name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone Number"
            fullWidth
            variant="outlined"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleDone} fullWidth variant="contained">
            Done
          </Button>
        </Grid>
        <div style={{ margin: "20px" }}></div>
      </Grid>
    </Paper>
  );
}
