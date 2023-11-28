import { Box } from "@mui/material";
import React from "react";
import HomeTabs from "./tabs";
import { Outlet, Route, Routes } from "react-router-dom";
import Nav from "../../Nav";


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
