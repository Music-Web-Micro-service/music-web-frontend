import React, { createContext, useContext, useState } from "react";
import WaveSurfer from "wavesurfer.js";

type TrackContextType = {
  currentTrackId: number;
  currentMusicUrl: string;
  currentImageUrl: string;
  currentMusicResourceId: number;
  setCurrentTrack: (trackid: number, musicResourceId: number, musicUrl: string, title: string, artist: string, currentImageUrl: string) => void;
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
  volume: number;
  title: string;
  artist: string;
  wavesurfer: WaveSurfer | null;
  setWaveSurfer: (ws: WaveSurfer | null) => void;
};

export const TrackContext = createContext<TrackContextType | undefined>(undefined);

type TrackProviderProps = {
  children: React.ReactNode;
};

export const TrackProvider: React.FC<TrackProviderProps> = ({ children }) => {
  const [currentTrackId, setCurrentTrackId] = useState<number>(-1);
  const [currentMusicResourceId, setCurrentMusicResourceId] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [currentMusicUrl, setCurrentMusicUrl] = useState<string>("");
  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const setCurrentTrack = (trackid: number, musicResourceId: number, musicUrl: string, title: string, artist: string, currentImageUrl: string) => {
    setCurrentTrackId(trackid);
    setCurrentMusicResourceId(musicResourceId);
    setCurrentMusicUrl(musicUrl);
    setTitle(title);
    setArtist(artist);
    setCurrentImageUrl(currentImageUrl);
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  return (
    <TrackContext.Provider value={{ 
      currentTrackId, 
      currentMusicUrl, 
      currentImageUrl,
      currentMusicResourceId,
      setCurrentTrack, 
      play, 
      pause, 
      isPlaying, 
      volume, 
      title, 
      artist, 
      wavesurfer, 
      setWaveSurfer: setWavesurfer
    }}>
      {children}
    </TrackContext.Provider>
  );
};
