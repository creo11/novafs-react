import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1f4f46",
    },
    secondary: {
      main: "#c8a96a",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "Lato, Arial, sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
  },
});

export default theme;