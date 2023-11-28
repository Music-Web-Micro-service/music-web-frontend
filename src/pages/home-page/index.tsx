import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Nav from "../../Nav";
import HomeTabs from "./tabs";


export default function HomePage() {
  return (
    <Box className="app-container" display={"flex"} flexDirection={"row"} width={1}>
      <Nav />
      <Box display={"flex"} flexDirection={"column"} sx={{width: window.innerWidth - 250}}>
        <HomeTabs></HomeTabs>
        <Box className="main-content">
          {/* Outlet makes render route */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
