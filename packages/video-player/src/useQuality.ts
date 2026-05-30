import { useState, useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import Hls from 'hls.js';

export interface QualityLevel {
  height: number;
  width: number;
  bitrate: number;
  label: string;
}

export const useQuality = (videoRef: RefObject<HTMLVideoElement | null>, src: string) => {
  const [qualities, setQualities] = useState<QualityLevel[]>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(-1);
  const [isHls, setIsHls] = useState(false);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const isHlsSource = src.endsWith('.m3u8');
    setIsHls(isHlsSource);

    if (isHlsSource && Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setQualities(
          hls.levels.map((level) => ({
            height: level.height,
            width: level.width,
            bitrate: level.bitrate,
            label: `${level.height}p`,
          }))
        );
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => setCurrentQuality(data.level));

      return () => {
        hls.destroy();
        hlsRef.current = null;
      };
    } else if (isHlsSource && video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS (Safari)
      setQualities((prev) => (prev.length === 1 && prev[0]?.label === 'Auto' ? prev : [{ height: 0, width: 0, bitrate: 0, label: 'Auto' }]));
      return undefined;
    } else {
      // Regular MP4/WebM — clear qualities list without creating a new array if already empty
      setQualities((prev) => (prev.length === 0 ? prev : []));
      return undefined;
    }
  }, [src, videoRef]);

  const changeQuality = (level: number) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = level;
      setCurrentQuality(level);
    }
  };

  return { qualities, currentQuality, changeQuality, isHls };
};
