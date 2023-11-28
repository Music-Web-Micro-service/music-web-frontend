import {Box, Typography} from "@mui/material";
import React from "react";
import { Track } from "../../components/TrackTable";

let mokedata = () => {
  let list = [];
  for (let i = 0; i < 100; i++) {
    list.push(
      <Box sx={blockStyle}>
        <Typography variant="h6" fontWeight={700} textAlign={"center"}>
          asds
        </Typography>
      </Box>,
    );
  }
  return list;
};
let blockStyle: React.CSSProperties = {
  width: 195,
  height: 1,
  backgroundColor: "rgb(0,0,0,.1)",
  borderRadius: 3,
  flexShrink: 0,
  marginRight: 2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};
let blocksContainnerStyle: React.CSSProperties = {
  width: "100%",
  height: "150px",
  display: "flex",
  flexDirection: "row",
  overflowX: "scroll",
};
let categoryStyle: React.CSSProperties = {
  width: "100%",
  marginBottom: "40px",
  height: "30%",
};
let tracks: Track[] = [
  {
    trackId: 1,
    title: "123",
    musicResourceId: 1,
    musicUrl: "string",
    imageUrl: "string",
    artistId: 1,
    artistName: "2",
    duration: 2,
  },
];
export const HomeSection: React.FC = () => {
  return (
    <Box sx={{width: "100%"}}>
      <Box sx={categoryStyle}>
        <Typography variant="h5" fontWeight={700} marginBottom={"20px"}>
          Themes
        </Typography>
        <Box sx={blocksContainnerStyle}>{mokedata()}</Box>
      </Box>
      <Box sx={categoryStyle}>
        <Typography variant="h5" fontWeight={700} marginBottom={"20px"}>
          Generes
        </Typography>
        <Box sx={blocksContainnerStyle}>{mokedata()}</Box>
      </Box>
      <Box sx={categoryStyle}>
        <Typography variant="h5" fontWeight={700} marginBottom={"20px"}>
          Trending
        </Typography>
        {/* 这里的px到时候需要改 */}
        <Box
          sx={{
            width: 1,
            height: 200,
            backgroundColor: "rgb(0,0,0,.1)",
            borderRadius: "10px 10px 0px 0px",
          }}
        >
          
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
            }}
          >
            123
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
