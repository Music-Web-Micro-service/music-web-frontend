import axios from "axios";
import {ImageData} from "../messages/Datas/ImageData";

type MusicRelateResponse = {
  musicFileId: number;
  musicUrl: string;
  imageUrl: string;
};

const apiClient = axios.create({
  baseURL: "http://localhost:8088/",
  timeout: 1000,
});

export function downloadMusic(musicResourceId: number) {
  // First, fetch the download URL from your backend
  fetch(`http://localhost:8088/MusicResource/get/download/file/${musicResourceId}`)
    .then((response) => response.text()) // <-- Change this line to handle the response as text
    .then((musicResourceUrl) => {
      if (!musicResourceUrl) {
        throw new Error("Music URL not found");
      }

      console.log(`${musicResourceUrl}`);
      // Then, use the fetched URL to initiate the download
      const a = document.createElement("a");
      a.href = musicResourceUrl;
      a.download = ""; // This will make the browser use the file's original name. You can also specify a name here if you wish.
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    })
    .catch((error) => console.error("Music download error:", error));
}

export const getImageById = async (imageId: number): Promise<ImageData> => {
  try {
    const response = await apiClient.get(`imageMedia/get/file/${imageId}`, {
      responseType: "text",
    });
    return {imageUrl: response.data};
  } catch (error) {
    console.error("error when fetch image data", error);
    throw error;
  }
};

export const fetchMusicRelateFiles = async (
  musicResourceIds: number[],
  imageIds: number[],
): Promise<MusicRelateResponse[]> => {
  try {
    const params = new URLSearchParams();

    musicResourceIds.forEach((id) => params.append("musicResourceIds", id.toString()));
    imageIds.forEach((id) => params.append("imageIds", id.toString()));

    const response = await apiClient.get("MusicResource/get/files", {params});
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
