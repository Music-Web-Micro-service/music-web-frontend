import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8086/",
  timeout: 1000,
});

// Create a playlist
export const createPlaylist = (userId: number, name: string, description: string) => {
  return apiClient.post("/playlists/create", {
    userId,
    name,
    description,
  });
};

// Add track to playlist
export const addTrackToPlaylist = (playlistId: number, trackId: number) => {
  return apiClient.post("/api/tracks", {
    playlistId,
    trackId,
  });
};

// Get playlist
export const getPlaylist = (playlistId: number) => {
  return apiClient.get(`/playlists/find/${playlistId}`);
};
