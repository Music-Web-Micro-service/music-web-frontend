import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8063/",
  timeout: 1000,
});

interface Genre {
  genre_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface TrackData {
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

export const getTrackByArtistId = async (artistId: number): Promise<TrackData> => {
  try {
    const response = await apiClient.get("track/search/artist", {params: {artistId}});
    return response.data;
  } catch (error) {
    console.error("error when fetch track data", error);
    throw error;
  }
};
