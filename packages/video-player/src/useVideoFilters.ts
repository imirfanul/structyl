import { useState, useEffect } from 'react';
import type { RefObject } from 'react';

export interface VideoFilters {
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
  blur: number;
  grayscale: number;
}

const DEFAULT_FILTERS: VideoFilters = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  hue: 0,
  blur: 0,
  grayscale: 0,
};

export const useVideoFilters = (videoRef: RefObject<HTMLVideoElement | null>) => {
  const [filters, setFilters] = useState<VideoFilters>(DEFAULT_FILTERS);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.filter = [
      `brightness(${filters.brightness}%)`,
      `contrast(${filters.contrast}%)`,
      `saturate(${filters.saturation}%)`,
      `hue-rotate(${filters.hue}deg)`,
      `blur(${filters.blur}px)`,
      `grayscale(${filters.grayscale}%)`,
    ].join(' ');
  }, [filters, videoRef]);

  const updateFilter = (key: keyof VideoFilters, value: number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return { filters, updateFilter, resetFilters };
};
