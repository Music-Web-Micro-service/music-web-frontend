import HeadphonesIcon from "@mui/icons-material/Headphones";
import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TrackTable, { Track } from "../components/TrackTable";

import "../styles/Playlist.css";


// @Depracted
type Song = {
  id: number;
  title: string;
  artist: string;
  duration: string;
};

type PlaylistDetails = {
  id: number;
  name: string;
  description: string;
  avatar: string;
  tracks: Track[];
  creator: string;
  totalDuration: number;
};

// TODO: This is only used for placeholder
const defaultPlaylistDetails: PlaylistDetails = {
  id: 0,
  name: "Playlist Name",
  description: "Playlist Description",
  avatar: "",
  tracks: [],
  creator: "Creator Name",
  totalDuration: 0,
};

function pluralize(count: number, unit: string) {
  return `${count} ${unit}${count == 0 ? "" : "s"}`;
}

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts = [
    hours ? `${hours} hr` : null,
    minutes ? `${minutes} min` : null,
    `${remainingSeconds} sec`,
  ];

  return parts.filter(Boolean).join(" ");
}

const Playlist: React.FC = () => {
  const location = useLocation();
  const [playlistDetails, setPlaylistDetails] = useState<PlaylistDetails>(defaultPlaylistDetails);

  const query = new URLSearchParams(location.search);
  const playlistNameSlug = query.get("list");

  useEffect(() => {
    const fetchPlaylistDetails = async (nameSlug: string | null) => {
      if (nameSlug) {
        const playlistName = decodeURIComponent(nameSlug.replace(/-/g, " "));
        const response = await fetch(`/api/playlists?name=${encodeURIComponent(playlistName)}`);
        const data = await response.json();
        setPlaylistDetails(data);
      }
    };

    fetchPlaylistDetails(playlistNameSlug);
  }, [playlistNameSlug]);

  return (
    <Box className="playlist-page" sx={{width: "100%", bgcolor: "background.paper"}}>
      <Box className="playlist-header">
        <Avatar
          variant="square"
          alt={playlistDetails.name}
          src={playlistDetails.avatar}
          sx={{width: 200, height: 200, borderRadius: "3%"}}
        >
          <HeadphonesIcon style={{fontSize: "70px"}} />
        </Avatar>
        <Box className="playlist-info">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            {playlistDetails.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {playlistDetails.description}
          </Typography>
          <br />
          <br />
          <Typography variant="subtitle1" color="text.secondary">
            Created by {playlistDetails.creator}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {pluralize(playlistDetails.tracks.length, "track")} •{" "}
            {formatDuration(playlistDetails.totalDuration)}
          </Typography>
        </Box>
      </Box>

      <Box className="playlist-details">
        <TrackTable tracks={playlistDetails.tracks} />
      </Box>
    </Box>
  );
};

export default Playlist;
