import {PlayArrow} from "@mui/icons-material";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GetAppIcon from "@mui/icons-material/GetApp";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import {Avatar, Box, IconButton, Typography} from "@mui/material";
import {deepOrange} from "@mui/material/colors";
import albumImage from "assets/MockAlbumImage.webp";
import {Waveform} from "components/Waveform";
import React from "react";
const Favorite: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography marginBottom={"10px"} fontSize={30} fontWeight={700}>
        My Favoriate
      </Typography>
      <Box sx={{display: "flex", justifyContent: "flex-start", marginBottom: "30px"}}>
        <Box
          className={"imageMusicLuncher"}
          sx={{
            width: "200px",
            height: "200px",
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: "10px",
            display: "flex",
            position: "relative",
          }}
        >
          <img
            src={albumImage}
            alt="album-img"
            style={{
              position: "absolute",
              width: "inherit",
              height: "inherit",
              borderRadius: "inherit",
            }}
          />
          <IconButton
            sx={{backgroundColor: "white", position: "absolute", left: "70%", top: "70%"}}
            size="large"
          >
            <PlayArrow />
          </IconButton>
        </Box>
        <Box sx={{display: "flex", flexDirection: "column", marginLeft: "10px"}}>
          <Box height={"90%"} />
          <Box sx={{display: "flex", height: "10%"}}>
            <Typography fontSize={15}>Tag:</Typography>
            <Box
              sx={{
                backgroundColor: "rgba(0,0,0,0.1)",
                height: "inherit",
                display: "inline-flex",
                alignItems: "center",
                borderRadius: "8px",
                marginLeft: "5px",
                padding: "8px",
              }}
            >
              <Typography fontSize={12} textAlign={"center"}>
                Hip
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "rgba(0,0,0,0.1)",
                height: "inherit",
                display: "inline-flex",
                alignItems: "center",
                borderRadius: "8px",
                marginLeft: "5px",
                padding: "8px",
              }}
            >
              <Typography fontSize={12} textAlign={"center"}>
                Sports
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <TrackList>
        <Track></Track>
      </TrackList>
    </Box>
  );
};
const DEFAULT_AUDIO_URL =
  "https://api.twilio.com//2010-04-01/Accounts/AC25aa00521bfac6d667f13fec086072df/Recordings/RE6d44bc34911342ce03d6ad290b66580c.mp3";

type TrackListProps = {
  children?: React.ReactNode;
};
let TrackList: React.FC<TrackListProps> = ({children}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 0.9,
        backgroundColor: "rgba(0,0,0,0.1)",
        borderRadius: "5px",
      }}
    >
      {children}
    </Box>
  );
};
type TrackProps = {
  imageUrl?: string;
  artistName?: string;
  songName?: string;
  audioUrl?: string;
};
let Track: React.FC<TrackProps> = ({
  imageUrl = "JC",
  artistName = "Jackson Chen",
  songName = "Hani Hani",
  audioUrl = DEFAULT_AUDIO_URL,
}) => {
  const showAvatar = imageUrl == "JC" ? "" : imageUrl;
  return (
    <Box sx={{display: "flex", padding: "25px"}}>
      <Box sx={{display: "inherit"}}>
        <Box sx={{display: "inherit", alignItems: "center", justifyContent: "center"}}>
          <Avatar src={showAvatar} sx={{bgcolor: deepOrange[500], width: "40px", height: "40px"}}>
            {showAvatar}
          </Avatar>
        </Box>
        <Box
          sx={{
            display: "inherit",
            flexDirection: "column",
            marginLeft: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography fontSize={13} fontWeight={700}>
            {songName}
          </Typography>
          <Typography fontSize={11} fontWeight={400}>
            {artistName}
          </Typography>
        </Box>
      </Box>
      <Waveform
        curComponent="PlayTrack"
        playing={false}
        url={audioUrl}
        volume={0.5}
        resetPosition={false}
        onDurationChange={() => console.log("a")}
        onSeek={() => console.log("b")}
      />
      <Box className="MusicAction">
        <IconButton onClick={() => {}}>
          <GetAppIcon sx={{color: "#9747FF", ml: 1, fontSize: "17px"}} />
        </IconButton>

        <IconButton>
          <CreateNewFolderOutlinedIcon sx={{color: "#9747FF", ml: 1, fontSize: "17px"}} />
        </IconButton>

        <IconButton>
          <FavoriteBorderIcon sx={{color: "#9747FF", ml: 1, fontSize: "17px"}} />
        </IconButton>

        <IconButton>
          <ShareOutlinedIcon sx={{color: "#9747FF", ml: 1, fontSize: "17px"}} />
        </IconButton>
      </Box>
    </Box>
  );
};
export default Favorite;
export {Track, TrackList};
