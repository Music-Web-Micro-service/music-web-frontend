import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GetAppIcon from "@mui/icons-material/GetApp";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { useCallback, useEffect, useRef, useState } from "react";
import { downloadMusic } from "../apis/MeidaApis";
import { useTrack } from "../hook/TrackHook";
import "../styles/PlayTrack.css";
import "../styles/TrackWaveform.css";
import { Waveform } from "./Waveform";

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
  const audio = useRef(new Audio(props.musicUrl));
  const [isPlaying, setIsPlaying] = useState(false);
  const MusicUrl = props.musicUrl;
  const MusicResourceId = props.musicResourceId;
  const [duration, setDuration] = useState(0);
  const {setCurrentTrack, play, pause} = useTrack();
  const positionDisplayRef = useRef<HTMLSpanElement | null>(null);

  const handlePlayClick = useCallback(() => {
    setCurrentTrack(MusicResourceId, MusicUrl, props.title, props.artist);
    setIsPlaying(true);
    play();
  }, [MusicResourceId, MusicUrl, props.title, props.artist, play]);

  const handlePauseClick = useCallback(() => {
    setIsPlaying(false);
    pause();
  }, [pause]);

  const handleSeek = useCallback(
    (time: number) => {
      if (audio.current) {
        audio.current.currentTime = time;
        console.log("Jumping to:", time, "seconds");
      }
    },
    [audio],
  );

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

  useEffect(() => {
    if (isPlaying) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audio.current.src = props.musicUrl;
  }, [props.musicUrl]);

  const theme = createTheme({
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: "#F1F1F1",
          },
        },
      },
    },
  });

  return (
    <div className="playtrack-hover">
      <div className="PlayTrack">
        <ThemeProvider theme={theme}>
          <Toolbar sx={{bgcolor: "#F1F1F1"}}>
            <div className="MusicInfo">
              <div className="SongImage">
                <Button
                  className="PauseButton"
                  onClick={isPlaying ? handlePauseClick : handlePlayClick}
                >
                  {isPlaying ? (
                    <PauseCircleFilledIcon sx={{color: "#000000", fontSize: "50px"}} />
                  ) : (
                    <PlayCircleFilledWhiteIcon sx={{color: "#000000", fontSize: "50px"}} />
                  )}
                </Button>
              </div>

              <div className="TextInfo">
                <div className="SongName">{props.title}</div>

                <div className="ArtistName">{props.artist}</div>
              </div>
            </div>

            <Waveform
              onSeek={handleSeek}
              playing={isPlaying}
              url={MusicUrl}
              volume={0}
              onDurationChange={handleDurationChange}
              curComponent={"PlayTrack"}
              //onPositionChange={handlePositionChange}
            />

            <div className="DurationTime">
              {/* <TinyText sx={{ color: '#000000', fontSize: "10px" }}>{formatDuration(position)}</TinyText>
                        <TinyText sx={{ color: '#000000', fontSize: "10px" }}>{formatDuration(duration)}</TinyText> */}
              <TinyText ref={positionDisplayRef} sx={{color: "#000000", fontSize: "10px"}}>
                {formatDuration(0)}
              </TinyText>
              <TinyText sx={{color: "#000000", fontSize: "10px"}}>
                {formatDuration(duration)}
              </TinyText>
              {/* <TinyText ref={durationDisplayRef} sx={{ color: '#000000', fontSize: "10px" }}>
                            {formatDuration(0)}  
                        </TinyText> */}
            </div>

            <div className="MusicAction">
              <IconButton onClick={() => downloadMusic(MusicResourceId)}>
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
            </div>
          </Toolbar>
        </ThemeProvider>
      </div>
    </div>
  );
}
