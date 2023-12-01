import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "@emotion/react";
import DownloadHistory from "./pages/home-page/download-history-section/DownloadHistory";
import Favorite from "./pages/home-page/favorite-section/Favorite";
import theme from "./themes/theme";

import HomePage from "./pages/home-page";
import { HomeSection } from "./pages/home-page/home-section";
import SignUpPage from "./pages/signup-page";

import "./App.css";
import Playlist from "./pages/home-page/Playlist-section/Playlist";
import { useTrack } from "./hook/TrackHook";
import PlayMusicBar from "./components/PlayMusicBar";
import { TrackProvider } from "./hook/TrackContext";
import AlbumSection from "./pages/home-page/Album-section/AlbumSection";



const App: React.FC = () => {
  // handleResize = () => {};
  const MusicBarComponent = () => {
    const { currentMusicUrl } = useTrack();
    // const [hasPlayed, setHasPlayed] = useState(false);
  
    // // Update hasPlayed state when a track URL is set
    // useEffect(() => {
    //   if (currentMusicUrl) {
    //     setHasPlayed(true);
    //   }
    // }, [currentMusicUrl]);
  
    // Render PlayMusicBar only if a track has been played or is currently playing
    return <>{<PlayMusicBar />}</>;
  };

  return (
    <TrackProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/" element={<HomePage />} >
              <Route path="/" index element={<HomeSection />} />
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/download-history" element={<DownloadHistory/>} />
              <Route path="/new-playlist" element={<Playlist/>} />
            </Route>
          </Routes>
          <MusicBarComponent />
        </BrowserRouter>
      </ThemeProvider>
    </TrackProvider>
  );
  
};



export default App;
