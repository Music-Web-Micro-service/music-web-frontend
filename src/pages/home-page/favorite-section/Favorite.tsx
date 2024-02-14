import { PlayArrow } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import { inherits } from "util";

const Favorite: React.FC = () => {
  return (<Box sx={{
    display: "flex",
    flexDirection: "column"
  }}>
    <Typography marginBottom={"10px"} fontSize={30} fontWeight={700}>My Favoriate</Typography>
    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
      <Box className={"imageMusicLuncher"} sx={{
        width: "200px", height: "200px", backgroundColor: "rgba(0,0,0,0.1)", borderRadius: "10px",
        display: "flex", position: "relative"
      }}>

        <img src="?" alt="album-img" style={{ position: "absolute" }} />
        <IconButton sx={{ backgroundColor: "white", position: "absolute", left: "70%", top: "70%" }} size="large"><PlayArrow /></IconButton>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "10px" }}>
        <Box height={"90%"} />
        <Box sx={{ display: "flex", height: "10%" }}>
          <Typography fontSize={15}>Tag:</Typography>
          <Box sx={{
            backgroundColor: "rgba(0,0,0,0.1)",
            height: "inherit",
            display: "inline-flex",
            alignItems: "center",
            borderRadius: "8px",
            marginLeft: "5px",
            padding: "8px"
          }}>
            <Typography fontSize={12} textAlign={"center"}>Hip</Typography>
          </Box>
          <Box sx={{
            backgroundColor: "rgba(0,0,0,0.1)",
            height: "inherit",
            display: "inline-flex",
            alignItems: "center",
            borderRadius: "8px",
            marginLeft: "5px",
            padding: "8px"
          }}>
            <Typography fontSize={12} textAlign={"center"}>Sports</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>);
};

export default Favorite;
