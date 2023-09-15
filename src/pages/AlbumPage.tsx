import {Box, IconButton} from "@mui/material";
import TrackTable from "../components/TrackTable";
import "../styles/AlbumPage.css";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";

const url = "/short-adventurous-intro-1-117090.mp3";

const sampleTracks = [
  {
    trackId: 1,
    title: "Song 1",
    musicResourceId: 101,
    musicUrl: url,
    imageUrl: "url_to_image1.jpg",
    artistId: 11,
    artistName: "Artist 1",
    duration: 210,
  },
  {
    trackId: 2,
    title: "Song 2",
    musicResourceId: 102,
    musicUrl: "url_to_song2.mp3",
    imageUrl: "url_to_image2.jpg",
    artistId: 12,
    artistName: "Artist 2",
    duration: 190,
  },
];

export default function AlbumPage() {
  return (
    <Box className="album-content">
      <Box className="album-top-section">
        <Box className="album-image"></Box>
        <Box className="album-info">
          <div className="album-title">Title</div>
          <div className="album-description">Description</div>
          <div className="album-information">
            <div className="album-artist-avatar">artsit</div>
            <div className="album-artist-name">artsit name</div>
            <div className="album-count">tracks: </div>
            <div className="album-createTime">createTime</div>
            <div className="album-count-duration">Durations</div>
          </div>
          <div className="album-tag">Tag</div>
        </Box>
      </Box>
      <Box className="album-action">
        <div className="album-like-button">
          <IconButton>
            <FavoriteBorderIcon sx={{color: "#9747FF", ml: 1, fontSize: "40px"}} />
          </IconButton>
        </div>
        <div className="album-share-button">
          <IconButton>
            <ShareOutlinedIcon sx={{color: "#9747FF", ml: 1, fontSize: "40px"}} />
          </IconButton>
        </div>
        <div className="album-addToList-button">
          <IconButton>
            <CreateNewFolderOutlinedIcon sx={{color: "#9747FF", ml: 1, fontSize: "40px"}} />
          </IconButton>
        </div>
      </Box>
      <Box className="album-track-table">
        <TrackTable tracks={sampleTracks} />
      </Box>
    </Box>
  );
}
