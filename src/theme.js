import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#607d8b", // Blue Gray
    },
    secondary: {
      main: "#f57c00", // Deep Orange
    },
    background: {
      default: "#f5f5f5", // Light Gray
      paper: "#ffffff", // White
    },
    text: {
      primary: "#333", // Dark Gray
      secondary: "#555", // Lighter Gray
    },
  },
  typography: {
    // Customize your typography here
    fontFamily: "'Roboto', sans-serif",
  },
  // Customize other theme properties here
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#64b5f6", // Blue
    },
    secondary: {
      main: "#ff9800", // Orange
    },
    background: {
      default: "#303030", // Dark Gray
      paper: "#424242", // Slightly Lighter Gray
    },
    text: {
      primary: "#f5f5f5", // Light Gray
      secondary: "#bbb", // Darker Gray
    },
  },
  typography: {
    // Customize your typography here
    fontFamily: "'Roboto', sans-serif",
  },
  // Customize other theme properties here
});

export { lightTheme, darkTheme };
