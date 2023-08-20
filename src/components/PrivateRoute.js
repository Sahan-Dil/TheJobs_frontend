// src/components/PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated, isTokenExpired, getToken } from "../utils/Auth";
import api from "../utils/api";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const userRole = roles && roles.length > 0 ? roles[0] : null;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated()) {
          return <Navigate to="/login" />;
        }

        const token = getToken();
        const tokenExpired = isTokenExpired(token);

        if (tokenExpired) {
          return <Navigate to="/login" />;
        }

        if (userRole) {
          const checkUserRole = async () => {
            try {
              await api.get(`/${userRole}/me`);
              return <Component {...props} />;
            } catch (error) {
              return <Navigate to="/" />;
            }
          };

          return checkUserRole();
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
