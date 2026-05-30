import { useState, useCallback } from 'react';

export interface Chapter {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
}

export const useChapters = (initialChapters: Chapter[] = []) => {
  const [chapters] = useState<Chapter[]>(initialChapters);

  const getCurrentChapter = useCallback(
    (currentTime: number): Chapter | null =>
      chapters.find((c) => currentTime >= c.startTime && currentTime < c.endTime) ?? null,
    [chapters]
  );

  const getChapterAtPosition = useCallback(
    (position: number, duration: number): Chapter | null =>
      getCurrentChapter((position / 100) * duration),
    [getCurrentChapter]
  );

  return { chapters, getCurrentChapter, getChapterAtPosition };
};
