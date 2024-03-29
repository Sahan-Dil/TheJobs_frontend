import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/user/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ConsultantDashboard from "components/ConsultantDashboard";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "./theme"; // Import your themes
import AddConsultancy from "components/consultant/AddConsultancy";
import UserManagement from "components/admin/UserManagement";
import CalendarApp from "components/Calendar";
import ConsultantList from "components/user/ConsultantList";
import Footer from "components/footer";
import Reports from "components/admin/Reports";
import { AlertProvider } from "AlertContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AlertProvider>
        <BrowserRouter>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          {/* <div style={{ marginTop: "64px" }}></div> */}
          <Routes>
            <Route exact path={"/"} element={<LandingPage />} />
            <Route exact path={"/home"} element={<LandingPage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/usermanagement" element={<UserManagement />} />
            <Route path="/admin/reports" element={<Reports />} />

            <Route path="/consultant" element={<ConsultantDashboard />} />
            <Route
              path="/consultant/consultancy"
              element={<AddConsultancy />}
            />

            <Route path="/consultant/schedules" element={<CalendarApp />} />
            <Route path="/common/schedules" element={<CalendarApp />} />
            <Route path="/common/consultantList" element={<ConsultantList />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
