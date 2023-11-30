import React, { useEffect, useRef, useState, useCallback } from "react";
import GetAppIcon from "@mui/icons-material/GetApp";
import { Slider, Stack, Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { Waveform } from "./Waveform";
import { downloadMusic } from "../apis/MeidaApis";
import { useTrack } from "../hook/TrackHook";
import "../styles/PlayTrack.css";
import "../styles/TrackWaveform.css";

type PlayTrackProps = {
    trackId: number;
    musicResourceId: number;
    imageUrl: string;
    title: string;
    artist: string;
    artistId: number;
    musicUrl: string;
    duration: number;
};

export default function PlayTrack(props: PlayTrackProps) {
  const audio = useRef(new Audio());
  const MusicResourceId = props.musicResourceId;
  const [duration, setDuration] = useState(0);
  const { setCurrentTrack, play, pause, currentTrackId, isPlaying } = useTrack();
  const positionDisplayRef = useRef<HTMLSpanElement | null>(null);

  const handlePauseClick = useCallback(() => {
    pause();
  }, [pause]);

  const handlePlayClick = useCallback(() => {
    setCurrentTrack(props.trackId, props.musicResourceId, props.musicUrl, props.title, props.artist, props.imageUrl);
    play();
  }, [play]);

  const handleSeek = useCallback((time: number) => {
    if (audio.current) {
      audio.current.currentTime = time;
    }
  }, [audio]);

  function formatDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
  };

  const TinyText = styled(Typography)({
    fontSize: "1.0rem",
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
  });

  // set audio source
  useEffect(() => {
    audio.current.src = props.musicUrl;
  }, [props.musicUrl]);

  // duration update
  useEffect(() => {
    const handleTimeUpdate = () => {
      if (positionDisplayRef.current && audio.current) {
        positionDisplayRef.current.textContent = formatDuration(audio.current.currentTime);
      }
    };

    audio.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const theme = createTheme({
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: "#F1F1F1"
          }
        }
      }
    }
  });

  return (
    <div className="playtrack-hover">
      <div className="PlayTrack">
        <ThemeProvider theme={theme}>
          <Toolbar sx={{ bgcolor: "#F1F1F1" }}>

            <div className="MusicInfo">
              <div className="SongImage">
                <img src={props.imageUrl} alt={props.title} style={{ borderRadius: "10px", width: "100%", height: "100%", objectFit: "cover" }} />
                <Button className="PauseButton" onClick={isPlaying ? handlePauseClick : handlePlayClick}>
                  {isPlaying ? (
                    <PauseCircleFilledIcon sx={{ color: "#000000", fontSize: "50px" }} />
                  ) : (
                    <PlayCircleFilledWhiteIcon sx={{ color: "#000000", fontSize: "50px" }} />
                  )}
                </Button>
              </div>

              <div className="TextInfo">
                <div className="SongName">
                  {props.title}
                </div>

                <div className="ArtistName">
                  {props.artist}
                </div>
              </div>
            </div>


            <Waveform
              onSeek={handleSeek}
              playing={isPlaying && props.trackId === currentTrackId}
              url={props.musicUrl}
              volume={0}
              onDurationChange={handleDurationChange}
              curComponent={"PlayTrack"}
            />


            <div className="DurationTime">
              <TinyText ref={positionDisplayRef} sx={{ color: "#000000", fontSize: "10px" }}>
                {formatDuration(0)}
              </TinyText>
              <TinyText sx={{ color: "#000000", fontSize: "10px" }}>{formatDuration(duration)}</TinyText>
            </div>


            <div className="MusicAction">
              <IconButton onClick={() => downloadMusic(MusicResourceId)}>
                <GetAppIcon sx={{ color: "#9747FF", ml: 1, fontSize: "17px" }} />
              </IconButton>

              <IconButton>
                <CreateNewFolderOutlinedIcon sx={{ color: "#9747FF", ml: 1, fontSize: "17px" }} />
              </IconButton>

              <IconButton>
                <FavoriteBorderIcon sx={{ color: "#9747FF", ml: 1, fontSize: "17px" }} />
              </IconButton>

              <IconButton>
                <ShareOutlinedIcon sx={{ color: "#9747FF", ml: 1, fontSize: "17px" }} />
              </IconButton>
            </div>

          </Toolbar>
        </ThemeProvider>
      </div >
    </div >
  );
}