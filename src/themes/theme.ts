import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#804CFF",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
});
export default theme;
