// src/components/LandingPage.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getToken, isTokenExpired } from "../utils/Auth";
import api from "../utils/api";

function LandingPage() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkUserRole = async () => {
      if (isAuthenticated()) {
        const token = getToken();
        const tokenExpired = isTokenExpired(token);

        if (!tokenExpired) {
          try {
            await api.get("/user/me");
            setUserRole("user");
          } catch (error) {
            try {
              await api.get("/admin/me");
              setUserRole("admin");
            } catch (error) {
              setUserRole(null);
            }
          }
        }
      }
    };

    checkUserRole();
  }, []);

  if (userRole === "user") {
    return <Navigate to="/user" />;
  } else if (userRole === "admin") {
    return <Navigate to="/admin" />;
  }

  return (
    <div>
      <h1>Welcome to My App!</h1>
      <p>This is the landing page.</p>
    </div>
  );
}

export default LandingPage;
