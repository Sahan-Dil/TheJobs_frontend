import React, { useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function UserRegForm({ role, token }) {
  const navigate = useNavigate();
  const emailForm = useRef();
  let apiUrl;
  const emaiMsg = "welcome to theJobs.use followings for login to -TheJobs-";

  // Define the initial form values
  const initialValues = {
    name: "",
    email: "",
    phone: "",
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Invalid phone number format (10 digits only)")
      .required("Phone number is required"),
  });

  // Define the Formik instance
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const input = {
        personName: values.name,
        phone: values.phone,
        username: values.email,
        password: "password",
      };

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
        const response = await axios.post(apiUrl, input, { headers });
        console.log("API Response:", response.data);

        // Perform further actions based on the response
        emailjs
          .sendForm(
            "service_vd2ls7b",
            "template_55fax15",
            emailForm.current,
            "BsMEAINPLaChPqWdq"
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );
        window.location.reload();

        // Reset the form after successful submission
        formik.resetForm();
      } catch (error) {
        console.error("API Error:", error.message);
        // Handle the error appropriately
      }
    },
  });

  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        maxWidth: "90%",
        margin: "auto",
      }}
    >
      {/* Hidden form for emailjs */}
      <form ref={emailForm} style={{ display: "none" }}>
        <input value={formik.values.name} type="text" name="user_name" />
        <input type="email" value={"theJobs.com"} name="user_email" />
        <textarea value={emaiMsg} name="message" />
      </form>
      <Typography variant="h6" gutterBottom>
        Add New / update Existing
      </Typography>
      <form onSubmit={formik.handleSubmit}>
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
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
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
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Done
            </Button>
          </Grid>
          <div style={{ margin: "20px" }}></div>
        </Grid>
      </form>
    </Paper>
  );
}
