import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <PrivateRoute
          path="/user"
          element={<UserDashboard />}
          roles={["user"]}
        />
        <PrivateRoute
          path="/admin"
          element={<AdminDashboard />}
          roles={["admin"]}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
