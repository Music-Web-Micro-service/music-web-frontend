import React, {useState} from "react";
import {BrowserRouter as Router, Route, Routes, BrowserRouter} from "react-router-dom";
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
import SignUpPage from "./pages/signup-page";
import HomePage from "./pages/home-page";

const App: React.FC = () => {
  // handleResize = () => {};
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<HomePage />} >
            <Route path="/" index element={<HomeSection />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/download-history" element={<DownloadHistory />} />
            <Route path="/new-playlist" element={<NewPlaylist />} />
          </Route>
        </Routes>
  
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
