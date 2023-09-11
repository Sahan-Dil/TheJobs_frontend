import axios from "axios";
import { setToken } from "../utils/Auth";
import api from "../utils/api";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import jwtDecode from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
import { useAlert } from "../AlertContext";

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

export default function Login() {
  const showAlert = useAlert();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username: data.get("email"),
        password: data.get("password"),
      });

      const currentUser = {
        token: response?.data?.jwt,
        personName: response?.data?.user?.personName,
        phone: response?.data?.user?.phone,
        userId: response?.data?.user?.userId,
        username: response?.data?.user?.username,
      };

      if (response.status === 200) {
        console.log("set token obj>>>>>>>>>", JSON.stringify(currentUser));
        setToken(JSON.stringify(currentUser));

        try {
          showAlert({
            msg: "Loging Success. We are happy to see you...",
            seviarity: "success",
          });

          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          };

          fetch("http://localhost:8080/common/getwelcomemsg", {
            headers: headers, // Include headers in the request
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data.message);
              showAlert({
                msg: data.message,
                seviarity: "info",
              });
            })
            .catch((error) => {
              console.error("Error fetching message:", error);
            });

          const decoded = jwtDecode(currentUser.token);
          console.log("decoded", decoded.roles);
          if (decoded.roles === "USER") {
            navigate("/user");
          } else if (decoded.roles === "ADMIN") {
            navigate("/admin");
          } else if (decoded.roles === "CONSULTANT") {
            navigate("/consultant");
          }
        } catch (error) {
          showAlert({
            msg: "Loging failed. Please try again.",
            seviarity: "warning",
          });
          console.log(error?.message);
        }
      } else {
        showAlert({
          msg: "An error occurred. Please try again.",
          seviarity: "error",
        });
        //handle error
      }
    } catch (error) {
      showAlert({
        msg: "An error occurred. Please try again.",
        seviarity: "error",
      });
      // Handle error
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ marginTop: "20px" }}></div>

          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
