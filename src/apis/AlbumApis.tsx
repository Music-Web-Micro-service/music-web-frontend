import axios from "axios";
import {Genre} from "../messages/Datas/AlbumData";
import {Track} from "../messages/Datas/AlbumData";
import {AlbumData} from "../messages/Datas/AlbumData";

const apiClient = axios.create({
  baseURL: "http://localhost:8063/",
  timeout: 1000,
});

export const getAlbumById = async (albumId: number): Promise<AlbumData> => {
  try {
    const response = await apiClient.get("album/search", {params: {albumId}});
    return response.data;
  } catch (error) {
    console.error("error when fetch album data", error);
    throw error;
  }
};
