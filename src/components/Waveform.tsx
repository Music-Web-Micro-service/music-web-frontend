import React, {useEffect, useRef, useState} from "react";
import WaveSurfer from "wavesurfer.js";
import "../styles/MusicBarWaveform.css";

type WaveformProps = {
  onSeek: (time: number) => void;
  playing: boolean;
  url: string;
  volume: number;
  curComponent: string;
  onDurationChange: (duration: number) => void;
};

const useWavesurfer = (containerRef: any, url: string) => {
  const wavesurfer = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    console.log("useWavesurfer " + url);
    // Create WaveSurfer instance if it doesn't exist
    if (!wavesurfer.current) {
      console.log("wavesurfer init ");
      wavesurfer.current = WaveSurfer.create({
        container: containerRef.current,
        waveColor: "#D9D9D9",
        progressColor: "#383351",
        normalize: false,
        height: 40,
      });
    }

    const loadTrack = async (urlToLoad: string) => {
      if (urlToLoad !== "" && wavesurfer.current) {
        try {
          await wavesurfer.current.load(urlToLoad);
        } catch (error) {
          console.error("Error loading track:", error);
        }
      }
    };

    loadTrack(url);

    return () => {
      // Only destroy when unmounting the component
      if (wavesurfer.current) {
        console.log("wavesurfer destroy " + url);
        // wavesurfer.current.destroy();
      }
    };
  }, [containerRef, url]); // Re-run effect when URL changes

  return wavesurfer.current;
};


const WaveformComponent: React.FC<WaveformProps> = ({
  onSeek,
  playing,
  url,
  volume,
  curComponent,
  onDurationChange,
}) => {
  const backgroundColor = curComponent === "PlayTrack" ? "#F1F1F1" : "#FFF";
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useWavesurfer(waveformRef, url);

  // Handle WaveSurfer readiness and initiate playback if needed
  useEffect(() => {
    if (!wavesurfer) return;
  
    const handleReady = () => {
      onDurationChange(wavesurfer.getDuration());
      if (playing) {
        console.log("Auto-starting playback");
        wavesurfer.play();
      }
    };
  
    wavesurfer.on("ready", handleReady);

    return () => {
      wavesurfer.un("ready", handleReady);
    };
  }, [wavesurfer, playing, onDurationChange]);
  
  // Load the waveform
  useEffect(() => {
    if (!wavesurfer) return;
    
    console.log("Loading new URL into WaveSurfer:", url);
    wavesurfer.load(url);
  }, [wavesurfer, url]);

  // Handle play/pause and volume changes
  useEffect(() => {
    if (!wavesurfer || !url || url == "") {
      console.log("WaveSurfer not ready for playback control");
      return;
    }

    // Handle volume
    if (volume === 0) {
      wavesurfer.setMuted(true);
    } else {
      wavesurfer.setVolume(volume);
      wavesurfer.setMuted(false);
    }

    // Handle play/pause
    if (playing) {
      console.log("Playing WaveSurfer");
      wavesurfer.play().catch((e) => { console.log(e);});
    } else {
      console.log("Pausing WaveSurfer");
      wavesurfer.pause();
    }
  }, [wavesurfer, playing, volume]);

  
  return <div className="waveform" ref={waveformRef}></div>;
};

export const Waveform = React.memo(WaveformComponent);
