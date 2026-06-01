import React, { useRef } from 'react';
import {
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  Settings, PictureInPicture, SkipBack, SkipForward,
  Subtitles, List, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { Button, Slider, DropdownMenu } from '@structyl/styled';
import type { Chapter } from './useChapters';
import { ChapterMarkers } from './ChapterMarkers';

interface VideoControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  isFullscreen: boolean;
  isPiP: boolean;
  buffered: number;
  subtitlesEnabled: boolean;
  hasSubtitles: boolean;
  hasPlaylist: boolean;
  chapters: Chapter[];
  settingsPanel?: React.ReactNode;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
  onPlaybackRateChange: (rate: number) => void;
  onFullscreenToggle: () => void;
  onPiPToggle: () => void;
  onSubtitlesToggle: () => void;
  onPlaylistClick: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onThumbnailHover: (show: boolean, time: number, position: number) => void;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
};

export const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying, currentTime, duration, volume, isMuted,
  isFullscreen, isPiP, buffered, subtitlesEnabled, hasSubtitles,
  hasPlaylist, onPlayPause, onSeek, onVolumeChange, onMuteToggle,
  onFullscreenToggle, onPiPToggle, onSubtitlesToggle,
  onPlaylistClick, onNext, onPrevious, chapters, settingsPanel, onThumbnailHover,
}) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const progressRef = useRef<HTMLDivElement>(null);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = progressRef.current?.getBoundingClientRect();
    if (!rect) return;
    onSeek(((e.clientX - rect.left) / rect.width) * duration);
  };

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = progressRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pos = (e.clientX - rect.left) / rect.width;
    onThumbnailHover(true, pos * duration, pos * 100);
  };

  return (
    <div className="bg-black/70 pt-2 pb-2 px-2 md:pb-2.5 md:px-3">
      {/* Progress bar */}
      <div className="mb-2 cursor-pointer py-1">
        <div
          ref={progressRef}
          className="group relative h-1 bg-fg/20 rounded cursor-pointer transition-all duration-150 hover:h-1.5"
          onClick={handleProgressClick}
          onMouseMove={handleProgressHover}
          onMouseLeave={() => onThumbnailHover(false, 0, 0)}
        >
          <ChapterMarkers chapters={chapters} duration={duration} currentTime={currentTime} onSeek={onSeek} />
          <div className="absolute top-0 left-0 h-full bg-fg/35 rounded transition-[width] duration-100" style={{ width: `${buffered}%` }} />
          <div className="absolute top-0 left-0 h-full bg-primary rounded transition-[width] duration-100" style={{ width: `${progress}%` }} />
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-md opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100"
            style={{ left: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls row — wraps instead of clipping on narrow players. flex-wrap
          + space-between set inline so they work even where the consumer's
          Tailwind hasn't generated those utilities. */}
      <div className="flex items-center gap-1" style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {/* Left */}
        <div className="flex items-center gap-0.5" style={{ minWidth: 0, flexWrap: 'wrap' }}>
          {hasPlaylist && (
            <Button variant="ghost" size="icon" onClick={onPrevious} title="Previous" className="text-white/80 hover:text-white hover:bg-white/10">
              <ChevronLeft />
            </Button>
          )}

          <Button variant="ghost" size="icon" onClick={onPlayPause} title={isPlaying ? 'Pause (Space)' : 'Play (Space)'} className="text-white/80 hover:text-white hover:bg-white/10">
            {isPlaying ? <Pause /> : <Play />}
          </Button>

          {hasPlaylist && (
            <Button variant="ghost" size="icon" onClick={onNext} title="Next" className="text-white/80 hover:text-white hover:bg-white/10">
              <ChevronRight />
            </Button>
          )}

          <Button variant="ghost" size="icon" onClick={() => onSeek(Math.max(0, currentTime - 10))} title="Rewind 10s" className="text-white/80 hover:text-white hover:bg-white/10">
            <SkipBack />
          </Button>

          <Button variant="ghost" size="icon" onClick={() => onSeek(Math.min(duration, currentTime + 10))} title="Forward 10s" className="text-white/80 hover:text-white hover:bg-white/10">
            <SkipForward />
          </Button>

          {/* Volume — expand on hover */}
          <div className="flex items-center gap-0.5 group">
            <Button variant="ghost" size="icon" onClick={onMuteToggle} title="Mute (M)" className="text-white/80 hover:text-white hover:bg-white/10">
              {isMuted || volume === 0 ? <VolumeX /> : <Volume2 />}
            </Button>
            <div className="w-0 overflow-hidden opacity-0 transition-[width,opacity] duration-200 flex items-center sm:group-hover:w-[88px] sm:group-hover:opacity-100">
              <Slider
                value={[isMuted ? 0 : Math.round(volume * 100)]}
                onValueChange={(val) => onVolumeChange((val[0] ?? 0) / 100)}
                min={0}
                max={100}
                step={1}
                className="w-20"
              />
            </div>
          </div>

          <span className="text-white/90 text-[11px] md:text-xs font-medium whitespace-nowrap px-1.5 tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-0.5">
          {hasSubtitles && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onSubtitlesToggle}
              title="Subtitles (C)"
              className={subtitlesEnabled ? 'text-primary hover:bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}
            >
              <Subtitles />
            </Button>
          )}

          {hasPlaylist && (
            <Button variant="ghost" size="icon" onClick={onPlaylistClick} title="Playlist" className="text-white/80 hover:text-white hover:bg-white/10">
              <List />
            </Button>
          )}

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="ghost" size="icon" title="Settings" className="text-white/80 hover:text-white hover:bg-white/10 data-[state=open]:text-primary">
                <Settings />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              side="top"
              align="end"
              sideOffset={8}
              className="p-0 w-[min(320px,calc(100vw-1rem))] max-h-[min(70dvh,420px)] overflow-y-auto bg-popover"
            >
              {settingsPanel}
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          <Button
            variant="ghost"
            size="icon"
            onClick={onPiPToggle}
            title="Picture in Picture (P)"
            className={isPiP ? 'text-primary hover:bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}
          >
            <PictureInPicture />
          </Button>

          <Button variant="ghost" size="icon" onClick={onFullscreenToggle} title="Fullscreen (F)" className="text-white/80 hover:text-white hover:bg-white/10">
            {isFullscreen ? <Minimize /> : <Maximize />}
          </Button>
        </div>
      </div>
    </div>
  );
};

VideoControls.displayName = 'VideoControls';
