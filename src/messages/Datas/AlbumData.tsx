export type Genre = {
  genre_id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Track = {
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
};

export type AlbumData = {
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
};
