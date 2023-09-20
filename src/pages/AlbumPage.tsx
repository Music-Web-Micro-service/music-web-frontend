import {Box, IconButton} from "@mui/material";
import TrackTable from "../components/TrackTable";
import "../styles/AlbumPage.css";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import axios from "axios";
import {useEffect, useState} from "react";
import {getAlbumById} from "../apis/AlbumApis";
import {getArtistById} from "../apis/ArtistApis";
import {getImageById} from "../apis/MeidaApis";
import {fetchMusicRelateFiles} from "../apis/MeidaApis";

const url = "/short-adventurous-intro-1-117090.mp3";

type BiographiesList = {
  bioId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type ArtistData = {
  artistId: number;
  userId: number;
  artistName: string;
  biographiesList: BiographiesList[];
  createdAt: string;
  updateAt: string;
};

interface Genre {
  genre_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Track {
  trackId: number;
  lyric: string | null;
  genres: Genre[];
  title: string;
  artistId: number;
  duration: number;
  imageId: number | null;
  videoId: number | null;
  musicFileId: number | null;
  trackStatus: string | null;
  createdAt: string;
  updatedAt: string;
  band: boolean;
}

interface AlbumData {
  albumId: number;
  tracks: Track[];
  title: string;
  description: string;
  artistId: number;
  imageId: number | null;
  releaseDate: string | null;
  createdAt: string;
  updatedAt: string;
  band: boolean;
}

type TrackTableData = {
  trackId: number;
  title: string;
  musicResourceId: number;
  musicUrl: string;
  imageUrl: string;
  artistId: number;
  artistName: string;
  duration: number;
};

interface ImageData {
  imageUrl: string;
}

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

type albumPageProps = {
  albumId: number;
};

export default function AlbumPage(props: albumPageProps) {
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);
  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [hasFetchedArtistData, setHasFetchedArtistData] = useState(false);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [trackTableData, setTrackTableData] = useState<TrackTableData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAlbumById(props.albumId);
        setAlbumData(data);
      } catch (error) {
        console.error("There was an error fetching the album data!", error);
      }
    };

    fetchData();
  }, [props.albumId]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (albumData?.imageId) {
          const data = await getImageById(albumData.imageId);
          setImageData(data);
        }
      } catch (error) {
        console.error("There was an error fetching the image data!", error);
      }
    };

    fetchImage();
  }, [albumData]);

  useEffect(() => {
    const fetchArtistData = async () => {
      if (albumData?.artistId && !hasFetchedArtistData) {
        try {
          const data = await getArtistById(albumData.artistId);
          setArtistData(data);
          setHasFetchedArtistData(true);
        } catch (error) {
          console.error("There was an error fetching the artist data!", error);
        }
      }
    };

    fetchArtistData();
  }, [albumData]);

  useEffect(() => {
    const fetchTrackData = async () => {
      try {
        if (albumData?.tracks && artistData) {
          console.log(albumData);
          const musicResourceIds = albumData.tracks
            .map((track) => track.musicFileId)
            .filter((id) => id !== null && id !== 0) as number[];
          const imageIds = albumData.tracks
            .map((track) => track.imageId)
            .filter((id) => id !== null && id !== 0) as number[];

          const trackData = await fetchMusicRelateFiles(musicResourceIds, imageIds);
          // Assuming trackData is an array of objects, each containing the data for a track
          const updatedTracks: TrackTableData[] = albumData.tracks.map((track) => {
            const relatedData = trackData.find((data) => data.musicFileId === track.musicFileId);
            return {
              trackId: track.trackId,
              title: track.title,
              musicResourceId: track.musicFileId as number, // Assuming musicFileId will always have a value. You might want to provide a fallback value here.
              musicUrl: relatedData?.musicUrl || "", // Provide fallback values for fields that might be undefined
              imageUrl: relatedData?.imageUrl || "",
              artistId: track.artistId,
              artistName: artistData.artistName,
              duration: track.duration,
            };
          });
          setTrackTableData(updatedTracks);
        }
      } catch (error) {
        console.error("There was an error fetching the track data!", error);
      }
    };

    fetchTrackData();
  }, [artistData]);

  if (!albumData) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="album-content">
      <Box className="album-top-section">
        <Box className="album-image">
          {imageData ? (
            <img src={imageData.imageUrl} alt="Album Art" />
          ) : (
            <div>Loading Image...</div>
          )}
        </Box>
        <Box className="album-info">
          <div className="album-title">{albumData.title}</div>
          <div className="album-description">{albumData.description}</div>
          <div className="album-information">
            <div className="album-artist-name">
              {artistData?.artistName || "Artist name loading..."}
            </div>
            <div className="album-count">tracks: {albumData.tracks.length}</div>
            <div className="album-createTime">createTime: {albumData.createdAt}</div>
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
        <TrackTable tracks={trackTableData} />
      </Box>
    </Box>
  );
}
