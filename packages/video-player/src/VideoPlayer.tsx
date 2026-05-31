'use client';

import React, { useRef, useState, useEffect } from 'react';
import { VideoControls } from './VideoControls';
import { VideoSettings } from './VideoSettings';
import { useVideoPlayer } from './useVideoPlayer';
import { SubtitleDisplay } from './SubtitleDisplay';
import type { SubtitleStyle } from './SubtitleDisplay';
import { loadSubtitleFile, findActiveCue } from './subtitleParser';
import type { SubtitleTrack, SubtitleCue } from './subtitleParser';
import { useVideoFilters } from './useVideoFilters';
import { usePlaylist } from './usePlaylist';
import type { PlaylistItem } from './usePlaylist';
import { useQuality } from './useQuality';
import { useChapters } from './useChapters';
import type { Chapter } from './useChapters';
import { PlaylistPanel } from './PlaylistPanel';
import { ThumbnailPreview } from './ThumbnailPreview';

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match?.[1] ?? null;
}

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  subtitles?: SubtitleTrack[];
  playlist?: PlaylistItem[];
  chapters?: Chapter[];
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  onVolumeChange?: (volume: number) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  autoPlay = false,
  loop = false,
  muted = false,
  className = '',
  subtitles = [],
  playlist: initialPlaylist = [],
  chapters: initialChapters = [],
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onVolumeChange,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(true);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [thumbnailTime, setThumbnailTime] = useState(0);
  const [thumbnailPosition, setThumbnailPosition] = useState(0);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Subtitle state
  const [subtitleTracks, setSubtitleTracks] = useState<Map<string, SubtitleCue[]>>(new Map());
  const [activeSubtitleIndex, setActiveSubtitleIndex] = useState<number>(-1);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [currentSubtitleText, setCurrentSubtitleText] = useState('');
  const [subtitleStyle, setSubtitleStyle] = useState<SubtitleStyle>({
    fontSize: 20,
    fontFamily: 'Arial, sans-serif',
    textColor: '#ffffff',
    backgroundColor: '#000000',
    backgroundOpacity: 0.75,
    position: 'bottom',
  });
  const [availableSubtitles, setAvailableSubtitles] = useState<SubtitleTrack[]>(subtitles);

  const { filters, updateFilter, resetFilters } = useVideoFilters(videoRef);
  const {
    playlist,
    currentItem,
    playNext,
    playPrevious,
    playIndex,
    toggleShuffle,
    toggleRepeat,
    addToPlaylist: _addToPlaylist,
    removeFromPlaylist,
  } = usePlaylist(
    initialPlaylist.length > 0
      ? initialPlaylist
      : [{ id: '1', title: 'Current Video', src, poster }]
  );

  const currentSrc = currentItem?.src ?? src;
  const { qualities, currentQuality, changeQuality, isHls } = useQuality(videoRef, currentSrc);
  const { chapters } = useChapters(initialChapters);

  const {
    isPlaying, currentTime, duration, volume, isMuted, playbackRate,
    isFullscreen, isPiP, buffered,
    togglePlay, handleSeek, handleVolumeChange, toggleMute,
    changePlaybackRate, toggleFullscreen, togglePiP, skipForward, skipBackward,
  } = useVideoPlayer({
    videoRef,
    containerRef,
    autoPlay,
    muted,
    onPlay,
    onPause,
    onEnded: () => {
      onEnded?.();
      if (playlist.repeat === 'one') {
        videoRef.current?.play();
      } else if (playlist.items.length > 1) {
        playNext();
      }
    },
    onTimeUpdate,
    onVolumeChange,
  });

  // Load subtitle files
  useEffect(() => {
    if (availableSubtitles.length === 0) return;

    const loadSubtitles = async () => {
      const tracks = new Map<string, SubtitleCue[]>();
      for (const track of availableSubtitles) {
        const cues = await loadSubtitleFile(track.src);
        tracks.set(track.src, cues);
      }
      setSubtitleTracks(tracks);
      if (activeSubtitleIndex === -1) {
        setActiveSubtitleIndex(0);
        setSubtitlesEnabled(true);
      }
    };

    loadSubtitles();
  }, [availableSubtitles]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubtitleUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    const newTrack: SubtitleTrack = {
      src: url,
      label: file.name.replace(/\.(srt|vtt)$/, ''),
      language: 'unknown',
    };
    setAvailableSubtitles((prev) => [...prev, newTrack]);
  };

  // Update subtitle text on time change
  useEffect(() => {
    if (!subtitlesEnabled || activeSubtitleIndex === -1 || availableSubtitles.length === 0) {
      setCurrentSubtitleText('');
      return;
    }
    const activeTrack = availableSubtitles[activeSubtitleIndex];
    if (!activeTrack) { setCurrentSubtitleText(''); return; }
    const cues = subtitleTracks.get(activeTrack.src);
    const activeCue = cues ? findActiveCue(cues, currentTime) : null;
    setCurrentSubtitleText(activeCue?.text ?? '');
  }, [currentTime, subtitlesEnabled, activeSubtitleIndex, subtitleTracks, availableSubtitles]);

  // Explicitly reload when src changes — ensures video.networkState never gets stuck at NETWORK_NO_SOURCE
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isHls) return;
    setVideoError(null);
    video.load();
  }, [currentSrc, isHls]);

  // Surface media errors to the UI
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleError = () => {
      const code = video.error?.code;
      if (code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED || code === MediaError.MEDIA_ERR_NETWORK) {
        setVideoError('Video not found or unsupported format.');
      } else if (code) {
        setVideoError('Failed to load video.');
      }
    };
    video.addEventListener('error', handleError);
    return () => video.removeEventListener('error', handleError);
  }, [videoRef]);

  // Trigger play when the playlist item changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentItem || isHls) return undefined;
    if (autoPlay || isPlaying) {
      const onCanPlay = () => { video.play().catch(console.error); };
      video.addEventListener('canplay', onCanPlay, { once: true });
      return () => video.removeEventListener('canplay', onCanPlay);
    }
    return undefined;
  }, [currentItem, isHls]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
      }
    };
    const handleMouseLeave = () => { if (isPlaying) setShowControls(false); };
    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    container?.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      container?.removeEventListener('mousemove', handleMouseMove);
      container?.removeEventListener('mouseleave', handleMouseLeave);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key) {
        case ' ': case 'k': e.preventDefault(); togglePlay(); break;
        case 'ArrowRight': e.preventDefault(); skipForward(); break;
        case 'ArrowLeft': e.preventDefault(); skipBackward(); break;
        case 'ArrowUp': e.preventDefault(); handleVolumeChange(Math.min(volume + 0.1, 1)); break;
        case 'ArrowDown': e.preventDefault(); handleVolumeChange(Math.max(volume - 0.1, 0)); break;
        case 'm': e.preventDefault(); toggleMute(); break;
        case 'f': e.preventDefault(); toggleFullscreen(); break;
        case 'p': e.preventDefault(); togglePiP(); break;
        case 'c': e.preventDefault(); setSubtitlesEnabled((v) => !v); break;
        case ',':
          e.preventDefault();
          if (videoRef.current) videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 1 / 30);
          break;
        case '.':
          e.preventDefault();
          if (videoRef.current) videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 1 / 30);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, skipForward, skipBackward, volume, handleVolumeChange, toggleMute, toggleFullscreen, togglePiP, duration]);

  const youtubeId = extractYouTubeId(currentSrc);
  if (youtubeId) {
    return (
      <div className={`relative w-full aspect-video bg-black overflow-hidden rounded-lg shadow-lg ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${autoPlay ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          title="YouTube video player"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-video bg-bg overflow-hidden rounded-lg shadow-lg font-sans text-sm text-fg select-none ${className}`}
    >
      <video
        ref={videoRef}
        src={!isHls ? currentSrc : undefined}
        poster={poster ?? currentItem?.poster}
        loop={loop}
        onClick={togglePlay}
        className="w-full h-full object-contain block cursor-pointer"
      />

        {subtitlesEnabled && currentSubtitleText && (
          <SubtitleDisplay text={currentSubtitleText} style={subtitleStyle} />
        )}

        {videoError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/90 gap-3">
            <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <span className="text-sm font-medium text-fg">{videoError}</span>
          </div>
        ) : !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-fg/10 cursor-pointer transition-opacity duration-300" onClick={togglePlay}>
            <div className="w-[72px] h-[72px] rounded-full bg-primary/90 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-primary hover:scale-110">
              <svg className="w-9 h-9 text-primary-fg fill-current ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        <div className={`absolute bottom-0 left-0 right-0 transition-opacity duration-300${showControls || !isPlaying ? '' : ' opacity-0 pointer-events-none'}`}>
          <VideoControls
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            isMuted={isMuted}
            playbackRate={playbackRate}
            isFullscreen={isFullscreen}
            isPiP={isPiP}
            buffered={buffered}
            subtitlesEnabled={subtitlesEnabled}
            hasSubtitles={availableSubtitles.length > 0}
            hasPlaylist={playlist.items.length > 1}
            chapters={chapters}
            onPlayPause={togglePlay}
            onSeek={handleSeek}
            onVolumeChange={handleVolumeChange}
            onMuteToggle={toggleMute}
            onPlaybackRateChange={changePlaybackRate}
            onFullscreenToggle={toggleFullscreen}
            onPiPToggle={togglePiP}
            onSubtitlesToggle={() => setSubtitlesEnabled((v) => !v)}
            onPlaylistClick={() => setShowPlaylist((v) => !v)}
            onNext={playNext}
            onPrevious={playPrevious}
            settingsPanel={
              <VideoSettings
                playbackRate={playbackRate}
                subtitleStyle={subtitleStyle}
                subtitles={availableSubtitles}
                activeSubtitleIndex={activeSubtitleIndex}
                filters={filters}
                qualities={qualities}
                currentQuality={currentQuality}
                onPlaybackRateChange={changePlaybackRate}
                onSubtitleStyleChange={setSubtitleStyle}
                onSubtitleTrackChange={setActiveSubtitleIndex}
                onSubtitleUpload={handleSubtitleUpload}
                onFilterChange={updateFilter}
                onResetFilters={resetFilters}
                onQualityChange={changeQuality}
              />
            }
            onThumbnailHover={(show, time, position) => {
              setShowThumbnail(show);
              setThumbnailTime(time);
              setThumbnailPosition(position);
            }}
          />
          {showThumbnail && (
            <ThumbnailPreview
              videoRef={videoRef}
              time={thumbnailTime}
              position={thumbnailPosition}
              duration={duration}
            />
          )}
        </div>

        {showPlaylist && (
          <PlaylistPanel
            items={playlist.items}
            currentIndex={playlist.currentIndex}
            shuffle={playlist.shuffle}
            repeat={playlist.repeat}
            onPlayItem={playIndex}
            onRemoveItem={removeFromPlaylist}
            onToggleShuffle={toggleShuffle}
            onToggleRepeat={toggleRepeat}
            onClose={() => setShowPlaylist(false)}
          />
        )}
    </div>
  );
};

VideoPlayer.displayName = 'VideoPlayer';
