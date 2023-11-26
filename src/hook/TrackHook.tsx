import React, { createContext, useContext, useState } from "react";
import { TrackContext } from "./TrackContext";
import WaveSurfer from "wavesurfer.js";

type TrackContextType = {
  currentTrackId: number;
  currentMusicUrl: string;
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


export function useTrack(): TrackContextType {
  const context = useContext(TrackContext);
  if (!context) {
    throw new Error("useTrack must be used within a TrackProvider");
  }
  return context;
}


