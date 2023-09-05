// src/components/LandingPage.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getToken, isTokenExpired } from "../utils/Auth";
import api from "../utils/api";
import image1 from "../img/image1.png";
import image2 from "../img/image2.png";
import image3 from "../img/image3.png";
import image4 from "../img/image4.png";
import RandomImage from "./RandomImage";
import ConsultancyCoverpage from "./consultant/ConsultancyCoverpage";
import LandingPagePart1 from "./LandingPagePart1";
import LandingPagePart2 from "./LandingPagePart2";
import LandingPagePart3 from "./LandingPagePart3";

function LandingPage() {
  const [userRole, setUserRole] = useState(null);
  const images = [image1, image2, image3, image4];
  const interval = 5000; // Change image every 5 seconds

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
      <RandomImage images={images} interval={interval} />
      <LandingPagePart3 />
      <LandingPagePart2 />
      <LandingPagePart1 />

      <h1>Welcome to My App!</h1>
      <p>This is the landing page.</p>
    </div>
  );
}

export default LandingPage;
