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
    if (!containerRef.current || !url) return;
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

    // Load the new URL
    wavesurfer.current.load(url);

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

  useEffect(() => {
    if (!wavesurfer) return;
    console.log("Play?" + playing);
    if (playing) {
      wavesurfer.play();
    } else {
      wavesurfer.pause();
    }
  }, [wavesurfer, playing]);
  

  // Event listeners
  useEffect(() => {
    if (!wavesurfer) return;

    wavesurfer.on("ready", () => {
      onDurationChange(wavesurfer.getDuration());
    });

    const handleClick = (event: MouseEvent) => {
      const bbox = (event.target as HTMLElement).getBoundingClientRect();
      const progress = (event.clientX - bbox.left) / bbox.width;
      const clickedPositionInSeconds = progress * wavesurfer.getDuration();

      if (Number.isFinite(clickedPositionInSeconds)) {
        onSeek(clickedPositionInSeconds);
      } else {
        console.error("Invalid clickedPositionInSeconds:", clickedPositionInSeconds);
      }
    };

    waveformRef.current?.addEventListener("click", handleClick);

    return () => {
      waveformRef.current?.removeEventListener("click", handleClick);
    };
  }, [wavesurfer]);

  useEffect(() => {
    if (wavesurfer) {
      console.log("useWavesurfer destroy");
      // wavesurfer.destroy();
      wavesurfer?.load(url);
    }
  }, [url]);

  // Playback and Volume
  useEffect(() => {
    if (!wavesurfer) return;

    if (volume === 0) {
      wavesurfer.setMuted(true);
    } else {
      wavesurfer.setMuted(false);
      wavesurfer.setVolume(volume);
    }

    if (playing) {
      wavesurfer.play();
    } else {
      wavesurfer.pause();
    }
  }, [wavesurfer, playing, volume]);
  
  return <div className="waveform" ref={waveformRef}></div>;
};

export const Waveform = React.memo(WaveformComponent);
