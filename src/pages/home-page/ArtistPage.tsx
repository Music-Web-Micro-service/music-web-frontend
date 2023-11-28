import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Box, IconButton } from "@mui/material";
import TrackTable from "../../components/TrackTable";
import "../styles/ArtistPage.css";

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

export default function ArtistPage() {
  return (
    <Box className="artist-content">
      <Box className="artist-top-section">
        <Box className="artist-image"></Box>
        <Box className="artist-info">
          <div className="artist-title">Title</div>
          <div className="artist-description">Description</div>
        </Box>
      </Box>
      <Box className="artist-action">
        <div className="artist-like-button">
          <IconButton>
            <FavoriteBorderIcon sx={{color: "#9747FF", ml: 1, fontSize: "40px"}} />
          </IconButton>
        </div>
        <div className="artist-share-button">
          <IconButton>
            <ShareOutlinedIcon sx={{color: "#9747FF", ml: 1, fontSize: "40px"}} />
          </IconButton>
        </div>
        <div className="artist-addToList-button">
          <IconButton>
            <CreateNewFolderOutlinedIcon sx={{color: "#9747FF", ml: 1, fontSize: "40px"}} />
          </IconButton>
        </div>
      </Box>
      <Box className="artist-track-table">
        <TrackTable tracks={sampleTracks} />
      </Box>
    </Box>
  );
}
