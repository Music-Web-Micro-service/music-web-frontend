import React, {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Nav from "./Nav";
import Favorite from "./pages/Favorite";
import DownloadHistory from "./pages/DownloadHistory";
import NewPlaylist from "./pages/NewPlaylist";
import "./App.css";
import {ThemeProvider} from "@emotion/react";
import theme from "./themes/theme";
import HomeTabs from "./pages/home-page/tabs";
import {Box} from "@mui/material";
import {HomeSection} from "./pages/home-section";

const App: React.FC = () => {
  // handleResize = () => {};
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box className="app-container" display={"flex"} flexDirection={"row"} width={1}>
          <Nav />
          <Box display={"flex"} flexDirection={"column"} sx={{width: window.innerWidth - 250}}>
            <HomeTabs></HomeTabs>
            <Box className="main-content">
              <Routes>
                <Route path="/" element={<HomeSection />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/download-history" element={<DownloadHistory />} />
                <Route path="/new-playlist" element={<NewPlaylist />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
