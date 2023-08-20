// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { setToken } from "../utils/Auth";
import api from "../utils/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("URL_TO_LOGIN_API", {
        username,
        password,
      });
      const token = response.data.token;
      setToken(token);

      // Check user role using API calls
      try {
        await api.get("/user/me");
        // Redirect to user dashboard
      } catch (userError) {
        try {
          await api.get("/admin/me");
          // Redirect to admin dashboard
        } catch (adminError) {
          // Handle error, possibly show an error message
        }
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        {/* Input fields */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
