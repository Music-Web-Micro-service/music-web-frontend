import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import DownloadHistory from "./pages/DownloadHistory";
import NewPlaylist from "./pages/NewPlaylist";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Nav />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/download-history" element={<DownloadHistory />} />
            <Route path="/new-playlist" element={<NewPlaylist />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
