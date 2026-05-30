import React, { useEffect, useRef, useState } from 'react';

interface ThumbnailPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  time: number;
  position: number;
  duration: number;
}

const formatTime = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

export const ThumbnailPreview: React.FC<ThumbnailPreviewProps> = ({
  videoRef, time, position,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captureRef = useRef<HTMLVideoElement | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canvasRef.current) return;

    if (!captureRef.current) {
      captureRef.current = document.createElement('video');
      captureRef.current.src = video.src;
      captureRef.current.crossOrigin = 'anonymous';
      captureRef.current.muted = true;
    }

    const captureVideo = captureRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    captureVideo.currentTime = time;

    const handleSeeked = () => {
      try {
        canvas.width = 160;
        canvas.height = 90;
        ctx.drawImage(captureVideo, 0, 0, 160, 90);
        setThumbnail(canvas.toDataURL());
      } catch {
        // Canvas tainted by cross-origin video without CORS headers — show time only
      }
    };

    captureVideo.addEventListener('seeked', handleSeeked);
    return () => captureVideo.removeEventListener('seeked', handleSeeked);
  }, [time, videoRef]);

  return (
    <div className="absolute bottom-[calc(100%+8px)] -translate-x-1/2 bg-card border border-border rounded-lg overflow-hidden shadow-lg z-[1001] pointer-events-none" style={{ left: `${position}%` }}>
      <canvas ref={canvasRef} className="hidden" />
      {thumbnail
        ? <img src={thumbnail} alt="Preview" className="w-[160px] h-auto block" />
        : <div className="w-[160px] h-[90px] flex items-center justify-center bg-muted text-[11px] text-muted-foreground">Loading…</div>
      }
      <div className="text-[11px] text-fg px-2 py-[3px] text-center bg-muted">{formatTime(time)}</div>
    </div>
  );
};

ThumbnailPreview.displayName = 'ThumbnailPreview';
