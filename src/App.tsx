import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "@emotion/react";
import DownloadHistory from "./pages/home-page/download-history-section/DownloadHistory";
import Favorite from "./pages/home-page/favorite-section/Favorite";
import theme from "./themes/theme";

import HomePage from "./pages/home-page";
import { HomeSection } from "./pages/home-page/home-section";
import SignUpPage from "./pages/signup-page";

import "./App.css";
import Playlist from "./pages/home-page/playlist-section/Playlist";



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
            <Route path="/new-playlist" element={<Playlist />} />
          </Route>
        </Routes>
  
      </BrowserRouter>
    </ThemeProvider>

  //     <!--     <TrackProvider>
  //   <ThemeProvider theme={theme}>
  //     <Router>
  //       <Box className="app-container" display={"flex"} flexDirection={"row"} width={1}>
  //         <Nav />
  //         <Box display={"flex"} flexDirection={"column"} width={1}>
  //           <HomeTabs></HomeTabs>
  //           <Box className="main-content">
  //             <Routes>
  //               <Route path="/" element={<Home />} />
  //               <Route path="/favorite" element={<Favorite />} />
  //               <Route path="/download-history" element={<DownloadHistory />} />
  //               <Route path="/playlist" element={<Playlist />} />
  //             </Routes>
  //           </Box>
  //         </Box>
  //       </Box>
  //     </Router>
  //     <MusicBarComponent />
  //   </ThemeProvider>
  // </TrackProvider> -->

  );
};



export default App;
