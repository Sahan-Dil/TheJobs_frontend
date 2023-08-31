import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function AddConsultancy() {
  const navigate = useNavigate();
  const [weekdaysStart, setWeekdaysStart] = useState(8);
  const [weekdaysEnd, setWeekdaysEnd] = useState(17);
  const [weekendsStart, setWeekendsStart] = useState(9);
  const [weekendsEnd, setWeekendsEnd] = useState(14);

  const handleBack = () => {
    navigate(-1); // Go back in the stack of visited pages
  };
  const handleDone = () => {
    // update db
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
            id="country"
            name="country"
            label="Country of Consulting"
            fullWidth
            variant="outlined"
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
            variant="outlined" // Use outlined variant for a box-like appearance
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
                  <Grid item xs={3}>
                    <TextField
                      type="number"
                      variant="outlined"
                      value={weekdaysStart}
                      InputProps={{
                        inputProps: { min: 0, max: 23 },
                      }}
                      onChange={(event) => setWeekdaysStart(event.target.value)}
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
                  <Grid item xs={3}>
                    <TextField
                      type="number"
                      variant="outlined"
                      value={weekdaysEnd}
                      InputProps={{
                        inputProps: { min: 0, max: 23 },
                      }}
                      onChange={(event) => setWeekdaysEnd(event.target.value)}
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
                  <Grid item xs={3}>
                    <TextField
                      type="number"
                      variant="outlined"
                      value={weekendsStart}
                      InputProps={{
                        inputProps: { min: 0, max: 23 },
                      }}
                      onChange={(event) => setWeekendsStart(event.target.value)}
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
                  <Grid item xs={3}>
                    <TextField
                      type="number"
                      variant="outlined"
                      value={weekendsEnd}
                      InputProps={{
                        inputProps: { min: 0, max: 23 },
                      }}
                      onChange={(event) => setWeekendsEnd(event.target.value)}
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
