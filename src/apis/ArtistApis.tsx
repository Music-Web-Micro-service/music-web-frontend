import axios from "axios";
import {BiographiesList} from "../messages/Datas/ArtistData";
import {ArtistData} from "../messages/Datas/ArtistData";

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
