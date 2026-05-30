export interface SubtitleCue {
  start: number;
  end: number;
  text: string;
}

export interface SubtitleTrack {
  label: string;
  language: string;
  src: string;
  kind?: 'subtitles' | 'captions';
}

const toSeconds = (h: string, m: string, s: string, ms: string): number =>
  parseInt(h, 10) * 3600 + parseInt(m, 10) * 60 + parseInt(s, 10) + parseInt(ms, 10) / 1000;

export const parseSRT = (content: string): SubtitleCue[] => {
  const cues: SubtitleCue[] = [];
  const SRT_TIME = /(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/;

  for (const block of content.trim().split(/\n\s*\n/)) {
    const lines = block.split('\n');
    if (lines.length < 3) continue;
    const timeLine = lines[1];
    if (!timeLine) continue;
    const m = timeLine.match(SRT_TIME);
    if (!m || m.length < 9) continue;

    const start = toSeconds(m[1] ?? '0', m[2] ?? '0', m[3] ?? '0', m[4] ?? '0');
    const end   = toSeconds(m[5] ?? '0', m[6] ?? '0', m[7] ?? '0', m[8] ?? '0');
    const text = lines.slice(2).join('\n').trim();
    cues.push({ start, end, text });
  }

  return cues;
};

export const parseVTT = (content: string): SubtitleCue[] => {
  const cues: SubtitleCue[] = [];
  const VTT_TIME = /(\d{2}):(\d{2}):(\d{2})\.(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})\.(\d{3})/;
  const lines = content.split('\n');
  let i = 0;

  while (i < lines.length && !lines[i]?.includes('-->')) i++;

  while (i < lines.length) {
    const line = lines[i]?.trim() ?? '';
    const m = line.match(VTT_TIME);

    if (m && m.length >= 9) {
      const start = toSeconds(m[1] ?? '0', m[2] ?? '0', m[3] ?? '0', m[4] ?? '0');
      const end   = toSeconds(m[5] ?? '0', m[6] ?? '0', m[7] ?? '0', m[8] ?? '0');

      const textLines: string[] = [];
      i++;
      while (i < lines.length && lines[i]?.trim() !== '') {
        const l = lines[i];
        if (l !== undefined) textLines.push(l.trim());
        i++;
      }
      cues.push({ start, end, text: textLines.join('\n') });
    }

    i++;
  }

  return cues;
};

export const loadSubtitleFile = async (url: string): Promise<SubtitleCue[]> => {
  try {
    const response = await fetch(url);
    const content = await response.text();

    if (content.includes('WEBVTT') || url.endsWith('.vtt')) return parseVTT(content);
    if (url.endsWith('.srt')) return parseSRT(content);
    if (content.includes('-->')) return content.includes(',') ? parseSRT(content) : parseVTT(content);
    return [];
  } catch {
    return [];
  }
};

export const findActiveCue = (cues: SubtitleCue[], currentTime: number): SubtitleCue | null =>
  cues.find((c) => currentTime >= c.start && currentTime <= c.end) ?? null;
