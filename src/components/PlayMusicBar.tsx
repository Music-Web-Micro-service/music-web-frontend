import React, { useEffect, useRef, useState } from "react";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import GetAppIcon from "@mui/icons-material/GetApp";
import { Slider, Stack, Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { VolumeUp } from "@mui/icons-material";
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
import "../styles/PlayMusicBar.css";
import "../styles/MusicBarWaveform.css";

export default function PlayMusicBar() {
  const { play, pause, isPlaying, currentMusicUrl, currentTrackId, title, artist, currentImageUrl } =
    useTrack();
  const audio = useRef(new Audio());

  const [isDisabled, setIsDisabled] = useState(true);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(30);
  const positionDisplayRef = useRef<HTMLSpanElement | null>(null);

  const [resetWaveformPosition, setResetWaveformPosition] = useState(false);

  const handleSeek = (time: number) => {
    if (audio) {
      audio.current.currentTime = time;
    }
  };

  function formatDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
  };


  const handleChange = (event: Event, newValue: number | number[]) => {
    const newVolume = Array.isArray(newValue) ? newValue[0] : newValue;
    setVolume(newVolume);
  };

  const handlePlayClick = () => {
    play();
    audio.current.volume = 0;
    audio.current.play();
  };

  const handlePauseClick = () => {
    pause();
    audio.current.pause();
  };

  useEffect(() => {
    if (!currentMusicUrl) {
      return;
    }

    console.log("play music bar now url: " + currentMusicUrl);
    // Create or re-create the audio object
    const newAudio = new Audio(currentMusicUrl);
    audio.current = newAudio;
    setIsDisabled(currentMusicUrl === "");

    const handleTimeUpdate = () => {
      console.log("Time updated:", audio.current.currentTime);
      if (positionDisplayRef.current && audio.current) {
        positionDisplayRef.current.textContent = formatDuration(audio.current.currentTime);
      }
    };

    // Attach the event listener to the new audio object
    newAudio.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      newAudio.removeEventListener("timeupdate", handleTimeUpdate);
      newAudio.pause();
      newAudio.currentTime = 0;
    };

  }, [currentMusicUrl]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      console.log("Time updated:", audio.current.currentTime);
      if (positionDisplayRef.current && audio.current) {
        positionDisplayRef.current.textContent = formatDuration(audio.current.currentTime);
      }
    };
    audio.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      handlePlayClick();
    } else {
      handlePauseClick();
    }
  }, [isPlaying]);

  const TinyText = styled(Typography)({
    fontSize: "1.0rem",
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
  });

  const theme = createTheme({
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: "#FFF",
          },
        },
      },
    },
  });

  return (
    <div className="PlayMusicBar">
      <ThemeProvider theme={theme}>
        <Toolbar sx={{ bgcolor: "#FFF" }}>
          <div className="PlaysButtons">
            <IconButton className="SkipPrev" disabled={isDisabled}>
              <SkipPreviousIcon sx={{ color: isDisabled ? "#CCCCCC" : "#000000", fontSize: "20px" }} />
            </IconButton>

            <Button
              className="PauseButton"
              onClick={isPlaying ? handlePauseClick : handlePlayClick}
              disabled={isDisabled}
            >
              {isPlaying ? (
                <PauseCircleFilledIcon sx={{ color: isDisabled ? "#CCCCCC" : "#000000", fontSize: "50px" }} />
              ) : (
                <PlayCircleFilledWhiteIcon sx={{ color: isDisabled ? "#CCCCCC" : "#000000", fontSize: "50px" }} />
              )}
            </Button>

            <IconButton className="SkipNext" disabled={isDisabled}>
              <SkipNextIcon sx={{ color: isDisabled ? "#CCCCCC" : "#000000", fontSize: "20px" }} />
            </IconButton>
          </div>

          <div className="MusicInfo">
            <div className="SongImage">
              <img src={currentImageUrl} alt={title} style={{ borderRadius: "10px", width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            <div className="TextInfo">
              <div className="SongName">{title}</div>

              <div className="ArtistName">{artist}</div>
            </div>
          </div>

          <Waveform
            onSeek={handleSeek}
            playing={isPlaying}
            url={currentMusicUrl}
            volume={volume / 100}
            onDurationChange={handleDurationChange}
            curComponent={"PlayMusicBar"}
            resetPosition={resetWaveformPosition}
          //onPositionChange={handlePositionChange}
          />

          <div className="DurationTime">
            <TinyText ref={positionDisplayRef} sx={{ color: "#000000", fontSize: "10px" }}>
              {formatDuration(0)}
            </TinyText>
            <TinyText sx={{ color: "#000000", fontSize: "10px" }}>
              {formatDuration(duration)}
            </TinyText>
          </div>

          <div className="VolumeControl">
            <Box sx={{ width: 200, ml: 1 }}>
              <Stack spacing={2} direction="row" alignItems="center">
                <VolumeUp sx={{ color: "#9747FF", fontSize: "17px" }} />
                <Slider
                  aria-label="Volume"
                  sx={{ color: "#9747FF", fontSize: "17px" }}
                  value={volume}
                  onChange={handleChange}
                />
              </Stack>
            </Box>
          </div>

          <div className="MusicAction">
            <IconButton onClick={() => downloadMusic(currentTrackId)}>
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
    </div>
  );
}
