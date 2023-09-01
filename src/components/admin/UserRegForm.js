import axios from "axios";
import * as React from "react";
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

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/">
        TheJobs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function UserRegForm() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      personName: data.get("name"),
      username: data.get("email"),
      password: data.get("password"),
      phone: data.get("phone"),
    });

    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        personName: data.get("name"),
        username: data.get("email"),
        password: data.get("password"),
        phone: data.get("phone"),
      });
      console.log("response>>>>>>>>>", response);
      if (response.status === 200) {
        // Registration success, redirect to login page
        navigate("/login");
      } else {
        console.log("Registration failed");
      }
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
        marginTop: "100px",
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
            // value={formData.name}
            // onChange={handleInputChange}
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
            // value={formData.email}
            // onChange={handleInputChange}
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
            // value={formData.phone}
            // onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained">
            Done
          </Button>
        </Grid>
        <div style={{ margin: "20px" }}></div>
      </Grid>
    </Paper>
  );
}
