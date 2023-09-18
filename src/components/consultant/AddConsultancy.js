import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAlert } from "../../AlertContext";

export default function AddConsultancy() {
  const showAlert = useAlert();

  const navigate = useNavigate();
  const location = useLocation();
  const receivedProps = location.state;
  console.log("receivedProps", JSON.parse(receivedProps.availability));

  const [formData, setFormData] = useState({
    name: receivedProps.personName,
    phone: receivedProps.phone,
    email: receivedProps.username,
    gender: receivedProps.gender ? receivedProps.gender : "Male",
    category: receivedProps.category ? receivedProps.category : "IT",
    country: receivedProps.country ? receivedProps.country : "",
    description: receivedProps.description ? receivedProps.description : "",
    weekdaysStart: receivedProps.availability
      ? JSON.parse(receivedProps.availability).weekdaysStart
      : 8,
    weekdaysEnd: receivedProps.availability
      ? JSON.parse(receivedProps.availability).weekdaysEnd
      : 17,
    weekendsStart: receivedProps.availability
      ? JSON.parse(receivedProps.availability).weekendsStart
      : 9,
    weekendsEnd: receivedProps.availability
      ? JSON.parse(receivedProps.availability).weekendsEnd
      : 14,
  });

  console.log(receivedProps);

  const handleBack = () => {
    navigate(-1); // Go back in the stack of visited pages
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDone = () => {
    const availabilityData = {
      weekdaysStart: formData.weekdaysStart,
      weekdaysEnd: formData.weekdaysEnd,
      weekendsStart: formData.weekendsStart,
      weekendsEnd: formData.weekendsEnd,
    };
    const input = {
      name: formData.name,
      country: formData.country,
      gender: formData.gender,
      category: formData.category,
      description: formData.description,
      phone: formData.phone,
      email: formData.email,
      availability: JSON.stringify(availabilityData),
      userId: receivedProps.userId,
    };
    console.log("availability input:", input);

    if (receivedProps.consultancyId) {
      const apiUrl = `http://localhost:8080/consultant/updateConsultancy/${receivedProps.consultancyId}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${receivedProps.jwtToken}`,
      };

      axios
        .put(apiUrl, input, { headers }) // Use axios.put for updating
        .then((response) => {
          showAlert({
            msg: "Updated consultant details successfully...",
            seviarity: "success",
          });
          console.log("API Response:", response.data);

          // Perform further actions based on the response
        })
        .catch((error) => {
          showAlert({
            msg: "update failed. Please try again.",
            seviarity: "warning",
          });
          console.error("API Error:", error.message);
          // Handle the error appropriately
        });
    } else {
      const apiUrl = "http://localhost:8080/consultant/createConsultancy"; //API URL

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${receivedProps.jwtToken}`,
      };

      axios
        .post(apiUrl, input, { headers })
        .then((response) => {
          showAlert({
            msg: "Updated consultant details successfully...",
            seviarity: "success",
          });
          console.log("API Response:", response.data);
          // Perform further actions based on the response
        })
        .catch((error) => {
          showAlert({
            msg: "update failed. Please try again.",
            seviarity: "warning",
          });
          console.error("API Error:", error.message);
          // Handle the error appropriately
        });
    }
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <div style={{ marginTop: "20px" }}></div>

      <Typography variant="h6" gutterBottom>
        Add Your Consultant Details...
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone Number"
            fullWidth
            variant="outlined"
            value={formData.phone}
            onChange={handleInputChange}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
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
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="gender"
            name="gender"
            label="Gender"
            select
            fullWidth
            variant="outlined"
            value={formData.gender}
            onChange={handleInputChange}
            SelectProps={{
              native: true,
            }}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="category"
            name="category"
            label="Job Category"
            select
            fullWidth
            variant="outlined"
            value={formData.category}
            onChange={handleInputChange}
            SelectProps={{
              native: true,
            }}
          >
            <option value="IT">IT</option>
            <option value="Business">Business</option>
            <option value="Labour">Labour</option>
            <option value="Engineering">Engineering</option>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="country"
            name="country"
            label="Country of Consulting"
            fullWidth
            variant="outlined"
            value={formData.country}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            multiline
            rows={6} // Adjust the number of rows as needed
            fullWidth
            variant="outlined"
            value={formData.description}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          {""}
          <Typography>Availability*</Typography>
        </Grid>
        {/* availability weekdays */}
        <Grid item xs={12}>
          <Box border={1} p={2} borderRadius={2}>
            <Grid item xs={12}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography>Week Days:</Typography>
              </div>
            </Grid>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Grid item xs={6}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Grid item xs={6}>
                    {" "}
                    <Typography>Start Time:</Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      type="number"
                      variant="outlined"
                      name="weekdaysStart"
                      value={formData.weekdaysStart}
                      InputProps={{
                        inputProps: { min: 0, max: 23 },
                      }}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>:00</Typography>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Grid item xs={6}>
                    {" "}
                    <Typography>End Time:</Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      type="number"
                      variant="outlined"
                      name="weekdaysEnd"
                      value={formData.weekdaysEnd}
                      InputProps={{
                        inputProps: { min: 0, max: 23 },
                      }}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>:00</Typography>
                  </Grid>
                </div>
              </Grid>
            </div>
          </Box>
        </Grid>
        {/* availability weekends */}
        <Grid item xs={12}>
          <Box border={1} p={2} borderRadius={2}>
            <Grid item xs={12}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography>Week Ends:</Typography>
              </div>
            </Grid>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Grid item xs={6}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Grid item xs={6}>
                    {" "}
                    <Typography>Start Time:</Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      type="number"
                      variant="outlined"
                      name="weekendsStart"
                      value={formData.weekendsStart}
                      InputProps={{
                        inputProps: { min: 0, max: 23 },
                      }}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>:00</Typography>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Grid item xs={6}>
                    {" "}
                    <Typography>End Time:</Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      type="number"
                      variant="outlined"
                      name="weekendsEnd"
                      value={formData.weekendsEnd}
                      InputProps={{
                        inputProps: { min: 0, max: 23 },
                      }}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>:00</Typography>
                  </Grid>
                </div>
              </Grid>
            </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" onClick={handleBack}>
            back
          </Button>
        </Grid>{" "}
        <Grid item xs={6}>
          <Button fullWidth variant="contained" onClick={handleDone}>
            Done
          </Button>
        </Grid>
        <div style={{ margin: "20px" }}></div>
      </Grid>
    </Paper>
  );
}

// "consultancyId": 102,
// "name": "ABC Consultancy",
// "country": "UK",
// "gender": "Male",
// "description": "Description of the consultancy",
// "phone": "1234567890",
// "email": "abc@example.com",
// "availability": "{\n    \"weekend\": {\n      \"start\": \"09:00\",\n      \"end\": \"12:00\"\n    },\n    \"weekdays\": {\n      \"start\": \"08:00\",\n      \"end\": \"17:00\"\n    }\n  }",
// "userId": 2
