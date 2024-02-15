import { createTheme } from "@mui/material";
import "@fontsource/manjari";
const theme = createTheme({
  palette: {
    primary: {
      main: "#804CFF",
    },
  },
  typography: {
    fontFamily: ["Manjari", "Montserrat", "sans-serif"].join(","),
  },
});
export default theme;
