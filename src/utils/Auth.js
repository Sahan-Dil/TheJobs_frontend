// src/utils/auth.js
import jwtDecode from "jwt-decode";

export const getToken = () => localStorage.getItem("token");

export const setToken = (token) => localStorage.setItem("token", token);

export const removeToken = () => localStorage.removeItem("token");

export const isAuthenticated = (includeRole = false) => {
  const token = getToken();

  if (token) {
    try {
      if (includeRole) {
        const decoded = jwtDecode(token);
        return {
          authenticated: true,
          role: decoded.roles,
        };
      }
      return { authenticated: true };
    } catch (e) {
      console.error(e);
      localStorage.removeItem("token");
      return { authenticated: false };
    }
  }
  localStorage.removeItem("token");
  return { authenticated: false };
};

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (error) {
    return true;
  }
};
