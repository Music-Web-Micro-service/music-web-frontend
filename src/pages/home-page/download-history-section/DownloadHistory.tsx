import {Box, Typography} from "@mui/material";
import React from "react";
import {Track, TrackList} from "../favorite-section/Favorite";

const DownloadHistory: React.FC = () => {
  return (
    <Box sx={{display: "flex", flexDirection: "column"}}>
      <Typography fontSize={30} fontWeight={700}>
        Download History
      </Typography>
      <TrackList>
        <Track></Track>
        <Track></Track> <Track></Track> <Track></Track> <Track></Track> <Track></Track>
        <Track></Track>
        <Track></Track>
      </TrackList>
    </Box>
  );
};

export default DownloadHistory;
