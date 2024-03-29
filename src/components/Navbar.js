import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, removeToken, getToken } from "../utils/Auth";
import ToggleButton from "@mui/material/ToggleButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import jwtDecode from "jwt-decode";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAlert } from "../AlertContext";

function Navbar({ darkMode, toggleDarkMode }) {
  const { authenticated, role } = isAuthenticated(true);
  const showAlert = useAlert();

  const navigate = useNavigate();
  const handleLogout = () => {
    showAlert({
      msg: "Loging Out. Please wait...",
      seviarity: "warning",
    });
    removeToken();
    navigate("/");
  };

  const appBarStyle = {
    position: "fixed", // Fixed positioning at the top
    backgroundColor: darkMode ? "#f5f5f5" : "#333", // Adjust colors based on dark mode
    boxShadow: "none", // Remove box shadow
    top: "20px", // Add top margin
    width: "90%", // Set width to 90% of the screen
    left: "5%", // Center horizontally
    borderRadius: "15px", // Add rounded corners
    opacity: "0.9", // Make it slightly transparent
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px", // Add padding if needed
  };
  const toggleButtonStyle = {
    color: darkMode ? "black" : "inherit", // Change color based on dark mode
  };

  return (
    <AppBar style={appBarStyle}>
      <Container style={containerStyle}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          color={darkMode ? "black" : "inherit"}
          style={{ textDecoration: "none", fontWeight: "bold" }}
        >
          TheJobs
        </Typography>
        {authenticated ? (
          <>
            {/* user */}
            {role === "USER" && (
              <Link
                to="/user"
                style={{
                  color: darkMode ? "black" : "inherit",
                  marginRight: "16px",
                }}
              >
                Pages
              </Link>
            )}

            {/* admin */}
            {role === "ADMIN" && (
              <Link
                to="/admin"
                style={{
                  color: darkMode ? "black" : "inherit",
                  marginRight: "16px",
                }}
              >
                Pages
              </Link>
            )}

            {/* consultant */}
            {role === "CONSULTANT" && (
              <Link
                to="/consultant"
                style={{
                  color: darkMode ? "black" : "inherit",
                  marginRight: "16px",
                }}
              >
                Pages
              </Link>
            )}

            <button
              onClick={handleLogout}
              style={{
                color: darkMode ? "black" : "inherit",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: darkMode ? "black" : "inherit",
                marginRight: "16px",
              }}
            >
              Sign In
            </Link>

            <Link
              to="/register"
              style={{
                color: darkMode ? "black" : "inherit",
                marginRight: "16px",
              }}
            >
              Register
            </Link>
          </>
        )}
        <ToggleButton
          value="darkMode"
          selected={darkMode}
          onChange={toggleDarkMode}
          style={toggleButtonStyle}
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </ToggleButton>
      </Container>
    </AppBar>
  );
}

export default Navbar;
