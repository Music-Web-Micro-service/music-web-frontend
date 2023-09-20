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

export const getAlbumById = async (albumId: number): Promise<AlbumData> => {
  try {
    const response = await apiClient.get("album/search", {params: {albumId}});
    return response.data;
  } catch (error) {
    console.error("error when fetch album data", error);
    throw error;
  }
};
