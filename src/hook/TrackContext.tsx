import React, { createContext, useState } from "react";

type TrackContextType = {
  currentTrackId: number;
  currentMusicUrl: string;
  setCurrentTrack: (id: number, musicUrl: string, title: string, artist: string) => void;
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
  volume: number;
  title: string;
  artist: string;
};

export const TrackContext = createContext<TrackContextType | undefined>(undefined);

type TrackProviderProps = {
  children: React.ReactNode;
};

export const TrackProvider: React.FC<TrackProviderProps> = ({children}) => {
  const [currentTrackId, setCurrentTrackId] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [currentMusicUrl, setcurrentMusicUrl] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const setCurrentTrack = (id: number, musicUrl: string, title: string, artist: string) => {
    setCurrentTrackId(id);
    setcurrentMusicUrl(musicUrl);
    setTitle(title);
    setArtist(artist);
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  return (
    <TrackContext.Provider
      value={{
        currentTrackId,
        currentMusicUrl,
        setCurrentTrack,
        play,
        pause,
        isPlaying,
        volume,
        title,
        artist,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};
