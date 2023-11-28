import React, {useState} from "react";

import {BrowserRouter as Router, Route, Routes, BrowserRouter} from "react-router-dom";

import Nav from "./Nav";
import Favorite from "./pages/Favorite";
import DownloadHistory from "./pages/DownloadHistory";
import {ThemeProvider} from "@emotion/react";
import theme from "./themes/theme";
import HomeTabs from "./pages/home-page/tabs";
import AlbumPage from "./pages/AlbumPage";
import {Box} from "@mui/material";

import {HomeSection} from "./pages/home-section";
import SignUpPage from "./pages/signup-page";
import HomePage from "./pages/home-page";

import PlayMusicBar from "./components/PlayMusicBar";
import {useTrack} from "./hook/TrackHook";
import {TrackProvider} from "./hook/TrackContext";
import Playlist from "./pages/Playlist";
import "./App.css";



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

        {<!--     <TrackProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Box className="app-container" display={"flex"} flexDirection={"row"} width={1}>
            <Nav />
            <Box display={"flex"} flexDirection={"column"} width={1}>
              <HomeTabs></HomeTabs>
              <Box className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/favorite" element={<Favorite />} />
                  <Route path="/download-history" element={<DownloadHistory />} />
                  <Route path="/playlist" element={<Playlist />} />
                </Routes>
              </Box>
            </Box>
          </Box>
        </Router>
        <MusicBarComponent />
      </ThemeProvider>
    </TrackProvider> -->}

  );
};

const MusicBarComponent = () => {
  const {isPlaying} = useTrack();
  const [hasPlayed] = useState(true);
  return <>{isPlaying ? <PlayMusicBar /> : hasPlayed && <PlayMusicBar />}</>;
};

export default App;
