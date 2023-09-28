export type BiographiesList = {
  bioId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type ArtistData = {
  artistId: number;
  userId: number;
  artistName: string;
  biographiesList: BiographiesList[];
  createdAt: string;
  updateAt: string;
};
