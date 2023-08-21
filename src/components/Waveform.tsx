import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

type WaveformProps = {
    onSeek: (time: number) => void;
    playing: boolean;
    url: string;
    volume: number;
    onDurationChange: (duration: number) => void;
    onPositionChange: (position: number) => void;
};

const useWavesurfer = (containerRef: any, url: string) => {
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ws = WaveSurfer.create({
            container: containerRef.current,
            waveColor: '#D9D9D9',
            progressColor: '#383351',
            normalize: false,
            height: 40,
            url: url
        });

        setWavesurfer(ws);
        ws.load(url);
        return () => {
            ws.destroy();
        };
    }, [containerRef]);

    return wavesurfer;
}

export const Waveform: React.FC<WaveformProps> = ({ onSeek, playing, url, volume, onDurationChange, onPositionChange }) => {
    const waveformRef = useRef<HTMLDivElement | null>(null);
    const wavesurfer = useWavesurfer(waveformRef, url);

    useEffect(() => {

        if (!wavesurfer) return;

        if (wavesurfer) {
            (wavesurfer as any).on('error', function (e: any) {
                console.error(e);
            });
        }

        console.log('wavesurfer render');

        wavesurfer.setVolume(volume);

        // Notify PlayMusicBar of the total duration once audio is loaded
        wavesurfer.on('ready', () => {
            onDurationChange(wavesurfer.getDuration());
        });

        // Notify PlayMusicBar of the current playback position during playback
        wavesurfer.on('audioprocess', () => {
            onPositionChange(wavesurfer.getCurrentTime());
        });


        // Handle user clicking on the waveform to jump to a specific position
        const handleClick = (event: MouseEvent) => {
            const bbox = (event.target as HTMLElement).getBoundingClientRect();
            const progress = (event.clientX - bbox.left) / bbox.width;
            const clickedPositionInSeconds = progress * wavesurfer.getDuration();
            onSeek(clickedPositionInSeconds);
        };
        waveformRef.current?.addEventListener('click', handleClick);

        // Sync playback state
        if (playing) {
            wavesurfer.play();
        } else {
            wavesurfer.pause();
        }

        return () => {
            console.log('wavesurfer unmount');
            waveformRef.current?.removeEventListener('click', handleClick);
        };

    }, [wavesurfer, playing, onSeek, volume]);

    return <div className="waveform" ref={waveformRef}></div>;
};

