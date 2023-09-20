import axios from "axios";

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

const apiClient = axios.create({
  baseURL: "http://localhost:8082/",
  timeout: 1000,
});

export const getArtistById = async (artistId: number): Promise<ArtistData> => {
  try {
    const response = await apiClient.get<ArtistData>(`artists/${artistId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching artist data", error);
    throw error;
  }
};
