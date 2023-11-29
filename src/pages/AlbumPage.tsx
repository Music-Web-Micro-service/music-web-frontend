import {Box, IconButton} from "@mui/material";
import TrackTable from "../components/TrackTable";
import "../styles/AlbumPage.css";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import {useEffect, useState} from "react";
import {getAlbumById} from "../apis/AlbumApis";
import {getArtistById} from "../apis/ArtistApis";
import {getImageById} from "../apis/MeidaApis";
import {fetchMusicRelateFiles} from "../apis/MeidaApis";
import {BiographiesList} from "../messages/Datas/ArtistData";
import {ArtistData} from "../messages/Datas/ArtistData";
import {Genre} from "../messages/Datas/AlbumData";
import {Track} from "../messages/Datas/AlbumData";
import {AlbumData} from "../messages/Datas/AlbumData";
import {TrackTableData} from "../messages/Datas/TrackTableData";
import React, { CSSProperties } from "react";

type ArtistImageData = {
  imageUrl: string;
};

type ImageData = {
  imageUrl: string;
};

type albumPageProps = {
  albumId: number;
};

const MAX_LENGTH = 40;

export default function AlbumPage(props: albumPageProps) {
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);
  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [hasFetchedArtistData, setHasFetchedArtistData] = useState(false);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [artistImageData, setArtistImageData] = useState<ImageData  | null>(null);
  const [trackTableData, setTrackTableData] = useState<TrackTableData[]>([]);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // set album data
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

  // get album image data
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

  // get artist data
  useEffect(() => {
    const fetchArtistData = async () => {
      if (albumData?.artistId) {
        try {
          const artistData = await getArtistById(albumData.artistId);
          setArtistData(artistData);
          setHasFetchedArtistData(true);
  
          // Fetch the artist's image if the artistData includes an imageId
          if (artistData.imageId) {
            const imageData = await getImageById(artistData.imageId);
            setArtistImageData(imageData); // You need to define this state variable
          }
        } catch (error) {
          console.error("There was an error fetching the artist data!", error);
        }
      }
    };
  
    fetchArtistData();
  }, [albumData]);

  // get tracks data
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
  
  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderDescription = (description: string) => {
    if (description.length <= MAX_LENGTH) {
      return description;
    }

    return showFullDescription ? description : `${description.substring(0, MAX_LENGTH)}...`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    return `${year}-${month}`;
  };

  const getTotalDuration = () => {
    const totalSeconds = albumData?.tracks.reduce((total, track) => total + track.duration, 0) || 0;
    return formatDuration(totalSeconds);
  };
  
  const formatDuration = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getUniqueGenres = () => {
    if (!albumData) return [];
    const allGenres = albumData.tracks.flatMap(track => track.genres);
    const uniqueGenres = Array.from(new Set(allGenres.map(genre => genre.name)));
    return uniqueGenres;
  };
  

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
          {/* <div className="album-description">{albumData.description}</div> */}
          <Box className="album-description">
            {renderDescription(albumData?.description || "")}
            {albumData?.description && albumData.description.length > MAX_LENGTH && (
              <Button onClick={handleToggleDescription}>
                {showFullDescription ? "Show Less" : "Show All"}
              </Button>
            )}
          </Box>

          <div className="album-information">
            {/* {artistImageData && (
              <img src={artistImageData.imageUrl} alt={artistData?.artistName} className="artist-image" />
            )}
            <div className="album-artist-name">
              {artistData?.artistName || "Artist name loading..."}
            </div> */}

            <Box className="artist-info">
              {artistImageData && (
                <img src={artistImageData.imageUrl} alt={artistData?.artistName} className="artist-image" />
              )}
              <div className="album-artist-name">
                {artistData?.artistName || "Artist name loading..."}
              </div>
            </Box>

            <div className="album-count">tracks: {albumData.tracks.length}</div>
            <div className="album-createTime">
              create time: {formatDate(albumData.createdAt)}
            </div>
            <div className="album-count-duration">
              total duration: {getTotalDuration()}
            </div>
          </div>

          <Box className="album-tags">
            Tags: 
            {getUniqueGenres().map((genre, index) => (
              <div key={index} className="album-tag">
                {genre}
              </div>
            ))}
          </Box>

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
