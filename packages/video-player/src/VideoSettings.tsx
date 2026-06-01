import React from 'react';
import { Button, Slider, Tabs } from '@structyl/styled';
import type { SubtitleStyle } from './SubtitleDisplay';
import type { SubtitleTrack } from './subtitleParser';
import type { VideoFilters as VideoFiltersType } from './useVideoFilters';
import { VideoFilters } from './VideoFilters';
import { SubtitleUploader } from './SubtitleUploader';
import type { QualityLevel } from './useQuality';

interface VideoSettingsProps {
  playbackRate: number;
  subtitleStyle: SubtitleStyle;
  subtitles: SubtitleTrack[];
  activeSubtitleIndex: number;
  filters: VideoFiltersType;
  qualities: QualityLevel[];
  currentQuality: number;
  onPlaybackRateChange: (rate: number) => void;
  onSubtitleStyleChange: (style: SubtitleStyle) => void;
  onSubtitleTrackChange: (index: number) => void;
  onSubtitleUpload: (file: File) => void;
  onFilterChange: (key: keyof VideoFiltersType, value: number) => void;
  onResetFilters: () => void;
  onQualityChange: (level: number) => void;
}

const PLAYBACK_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export const VideoSettings: React.FC<VideoSettingsProps> = ({
  playbackRate,
  subtitleStyle,
  subtitles,
  activeSubtitleIndex,
  filters,
  qualities,
  currentQuality,
  onPlaybackRateChange,
  onSubtitleStyleChange,
  onSubtitleTrackChange,
  onSubtitleUpload,
  onFilterChange,
  onResetFilters,
  onQualityChange,
}) => {
  const updateSubtitleStyle = (updates: Partial<SubtitleStyle>) => {
    onSubtitleStyleChange({ ...subtitleStyle, ...updates });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="flex items-center px-3 py-2.5 border-b border-border shrink-0">
        <span className="text-[13px] font-semibold text-fg">Settings</span>
      </div>

      {/* Main tabs */}
      <Tabs.Root defaultValue="subtitles" className="flex flex-col flex-1 overflow-hidden">
        <Tabs.List scrollable className="px-3 py-2 flex-shrink-0">
          <Tabs.Trigger value="subtitles">Subtitles</Tabs.Trigger>
          <Tabs.Trigger value="filters">Filters</Tabs.Trigger>
          <Tabs.Trigger value="quality">Quality</Tabs.Trigger>
          <Tabs.Trigger value="playback">Playback</Tabs.Trigger>
        </Tabs.List>

        <div className="flex-1 overflow-y-auto px-3 pt-1 pb-3">
          {/* ── Subtitles ─────────────────────────────────── */}
          <Tabs.Content value="subtitles">
            <Tabs.Root defaultValue="style" variant="pills">
              <Tabs.List className="mb-3">
                <Tabs.Trigger value="style">Style</Tabs.Trigger>
                <Tabs.Trigger value="tracks">Tracks</Tabs.Trigger>
                <Tabs.Trigger value="upload">Upload</Tabs.Trigger>
              </Tabs.List>

              {/* Style */}
              <Tabs.Content value="style">
                <div className="mb-3.5 last:mb-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-muted-foreground">Font Size</span>
                    <span className="text-[11px] text-fg font-medium">{subtitleStyle.fontSize}px</span>
                  </div>
                  <Slider
                    value={[subtitleStyle.fontSize]}
                    onValueChange={([v]) => updateSubtitleStyle({ fontSize: v ?? subtitleStyle.fontSize })}
                    min={14} max={40} step={2}
                  />
                </div>

                <div className="mb-3.5 last:mb-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-muted-foreground">Background Opacity</span>
                    <span className="text-[11px] text-fg font-medium">{Math.round(subtitleStyle.backgroundOpacity * 100)}%</span>
                  </div>
                  <Slider
                    value={[Math.round(subtitleStyle.backgroundOpacity * 100)]}
                    onValueChange={([v]) => updateSubtitleStyle({ backgroundOpacity: (v ?? 0) / 100 })}
                    min={0} max={100} step={5}
                  />
                </div>

                <div className="mb-3.5 last:mb-0">
                  <span className="text-[11px] text-muted-foreground block mb-1.5">Text Color</span>
                  <input
                    type="color"
                    className="w-full h-9 rounded-lg border border-border cursor-pointer bg-transparent p-0.5"
                    value={subtitleStyle.textColor}
                    onChange={(e) => updateSubtitleStyle({ textColor: e.target.value })}
                  />
                </div>

                <div className="mb-3.5 last:mb-0">
                  <span className="text-[11px] text-muted-foreground block mb-1.5">Background Color</span>
                  <input
                    type="color"
                    className="w-full h-9 rounded-lg border border-border cursor-pointer bg-transparent p-0.5"
                    value={subtitleStyle.backgroundColor}
                    onChange={(e) => updateSubtitleStyle({ backgroundColor: e.target.value })}
                  />
                </div>

                <div className="mb-3.5 last:mb-0">
                  <span className="text-[11px] text-muted-foreground block mb-2">Position</span>
                  <div className="flex gap-2">
                    <Button
                      variant={subtitleStyle.position === 'bottom' ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      onClick={() => updateSubtitleStyle({ position: 'bottom' })}
                    >
                      Bottom
                    </Button>
                    <Button
                      variant={subtitleStyle.position === 'top' ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      onClick={() => updateSubtitleStyle({ position: 'top' })}
                    >
                      Top
                    </Button>
                  </div>
                </div>
              </Tabs.Content>

              {/* Tracks */}
              <Tabs.Content value="tracks">
                <Button
                  variant={activeSubtitleIndex === -1 ? 'default' : 'outline'}
                  size="sm"
                  className="w-full justify-start mb-1"
                  onClick={() => onSubtitleTrackChange(-1)}
                >
                  Off
                </Button>
                {subtitles.map((track, i) => (
                  <Button
                    key={track.src}
                    variant={activeSubtitleIndex === i ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-start mb-1"
                    onClick={() => onSubtitleTrackChange(i)}
                  >
                    {track.label} {track.language && `(${track.language})`}
                  </Button>
                ))}
              </Tabs.Content>

              {/* Upload */}
              <Tabs.Content value="upload">
                <SubtitleUploader onSubtitleUpload={onSubtitleUpload} />
              </Tabs.Content>
            </Tabs.Root>
          </Tabs.Content>

          {/* ── Filters ───────────────────────────────────── */}
          <Tabs.Content value="filters">
            <VideoFilters filters={filters} onFilterChange={onFilterChange} onReset={onResetFilters} />
          </Tabs.Content>

          {/* ── Quality ───────────────────────────────────── */}
          <Tabs.Content value="quality">
            <p className="text-xs font-semibold text-fg mb-2.5">Video Quality</p>
            {qualities.length > 0 ? (
              <>
                <Button
                  variant={currentQuality === -1 ? 'default' : 'outline'}
                  size="sm"
                  className="w-full justify-start mb-1"
                  onClick={() => onQualityChange(-1)}
                >
                  Auto
                </Button>
                {qualities.map((q, i) => (
                  <Button
                    key={i}
                    variant={currentQuality === i ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-start mb-1"
                    onClick={() => onQualityChange(i)}
                  >
                    {q.label} ({Math.round(q.bitrate / 1000)}kbps)
                  </Button>
                ))}
              </>
            ) : (
              <p className="text-xs text-muted-foreground">
                Quality selection is only available for HLS/DASH adaptive streaming sources.
              </p>
            )}
          </Tabs.Content>

          {/* ── Playback ──────────────────────────────────── */}
          <Tabs.Content value="playback">
            <p className="text-xs font-semibold text-fg mb-2.5">Playback Speed</p>
            {PLAYBACK_RATES.map((rate) => (
              <Button
                key={rate}
                variant={playbackRate === rate ? 'default' : 'outline'}
                size="sm"
                className="w-full justify-start mb-1"
                onClick={() => onPlaybackRateChange(rate)}
              >
                {rate === 1 ? 'Normal' : `${rate}x`}
              </Button>
            ))}
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
};

VideoSettings.displayName = 'VideoSettings';
