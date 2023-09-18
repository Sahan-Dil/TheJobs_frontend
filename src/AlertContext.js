// AlertContext.js
import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AlertContext = createContext();

export function useAlert() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);
  const [severity, setSeverity] = useState(null);

  const showAlert = (message) => {
    setAlert(message.msg);
    setSeverity(message.seviarity);
    setTimeout(() => {
      setAlert(null);
      setSeverity(null);
    }, 5000); // Auto-disappear after 5 seconds
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      {alert && (
        <Snackbar
          open={true}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert elevation={6} severity={severity} sx={{ width: "100%" }}>
            {alert}
          </Alert>
        </Snackbar>
      )}{" "}
      {/* Create a Snackbar component */}
    </AlertContext.Provider>
  );
}
