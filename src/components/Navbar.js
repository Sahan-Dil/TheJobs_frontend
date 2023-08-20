// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, removeToken } from "../utils/Auth";

function Navbar() {
  const handleLogout = () => {
    removeToken();
    // Redirect to login page
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated() ? (
          <>
            <li>
              <Link to="/user">User Dashboard</Link>
            </li>
            <li>
              <Link to="/admin">Admin Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
