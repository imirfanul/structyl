import React from 'react';
import { Tooltip } from '@structyl/styled';
import type { Chapter } from './useChapters';

interface ChapterMarkersProps {
  chapters: Chapter[];
  duration: number;
  currentTime: number;
  onSeek: (time: number) => void;
}

export const ChapterMarkers: React.FC<ChapterMarkersProps> = ({
  chapters, duration, currentTime, onSeek,
}) => {
  if (chapters.length === 0 || duration === 0) return null;

  return (
    <Tooltip.Provider delayDuration={200}>
      {chapters.map((chapter) => {
        const left = (chapter.startTime / duration) * 100;
        const isActive = currentTime >= chapter.startTime && currentTime < chapter.endTime;

        return (
          <Tooltip.Root key={chapter.id}>
            <Tooltip.Trigger asChild>
              <div
                className={`absolute -top-px h-[calc(100%+4px)] border-l-2 pointer-events-auto cursor-pointer transition-colors duration-200 z-[1] ${
                  isActive ? 'border-primary' : 'border-fg/50 hover:border-primary'
                }`}
                style={{ left: `${left}%` }}
                onClick={(e) => { e.stopPropagation(); onSeek(chapter.startTime); }}
              />
            </Tooltip.Trigger>
            <Tooltip.Content side="top" variant="dark">
              {chapter.title}
            </Tooltip.Content>
          </Tooltip.Root>
        );
      })}
    </Tooltip.Provider>
  );
};

ChapterMarkers.displayName = 'ChapterMarkers';
