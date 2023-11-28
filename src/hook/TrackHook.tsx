import React, {createContext, useContext, useState} from "react";
import {TrackContext} from "./TrackContext";

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

export function useTrack(): TrackContextType {
  const context = useContext(TrackContext);
  if (!context) {
    throw new Error("useTrack must be used within a TrackProvider");
  }
  return context;
}
