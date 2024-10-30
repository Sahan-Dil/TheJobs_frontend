import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAlert } from "../../AlertContext";

const WelcomeMsg = () => {
  const showAlert = useAlert();

  const [msg, setMsg] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.token}`,
  };

  useEffect(() => {
    // Fetch initial message from the API when the component mounts
    fetch("http://localhost:8080/common/getwelcomemsg", {
      headers: headers, // Include headers in the request
    })
      .then((response) => response.json())
      .then((data) => {
        setMsg(data.message);
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
      });
  }, []);

  const handleButtonClick = () => {
    // Make an API call to update the message when the button is clicked
    fetch("http://localhost:8080/common/createwelcomemsg", {
      method: "POST", // Adjust the HTTP method as needed
      headers: headers, // Include headers in the request
      body: JSON.stringify({ message: msg }), // Send the current message as JSON data
    })
      .then((response) => response.json())
      .then((data) => {
        setMsg(data.message);
        showAlert({
          msg: "Updated welcome msg...",
          seviarity: "success",
        });
      })
      .catch((error) => {
        console.error("Error updating message:", error);
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={10}>
        <p>Update Welcome message...</p>
      </Grid>
      <Grid item xs={12} md={10}>
        <TextField
          required
          id="message"
          name="message"
          fullWidth
          variant="outlined"
          value={msg}
          multiline
          maxRows={2}
          onChange={(e) => setMsg(e.target.value)} // Update the message in state as it's edited
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleButtonClick} // Handle the button click event
        >
          Done
        </Button>
      </Grid>
    </Grid>
  );
};

export default WelcomeMsg;
