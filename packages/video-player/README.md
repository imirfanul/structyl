# @structyl/video-player

A full-featured, accessible React video player with HLS streaming, subtitles, playlists, and chapters.

![npm](https://img.shields.io/npm/v/@structyl/video-player)
![license](https://img.shields.io/npm/l/@structyl/video-player)

`@structyl/video-player` is a single-component, drop-in React video player built on the native `<video>` element and [hls.js](https://github.com/video-dev/hls.js). It adds adaptive HLS streaming, SRT/VTT subtitles, playlists, chapter markers, live video filters, picture-in-picture, and complete keyboard control — styled with the structyl Tailwind theme tokens. It is intended for product teams who need a capable, themable player without wiring up the media stack by hand.

## Installation

```bash
pnpm add @structyl/video-player
```

```bash
npm install @structyl/video-player
```

```bash
yarn add @structyl/video-player
```

> `react`, `react-dom`, and `tailwindcss` are peer dependencies. The player renders with structyl theme tokens (`bg`, `fg`, `primary`), so use it within an app configured with `@structyl/styled` / a structyl theme.

## Usage

```tsx
import { VideoPlayer } from '@structyl/video-player';
import type { SubtitleTrack, Chapter, PlaylistItem } from '@structyl/video-player';

const subtitles: SubtitleTrack[] = [
  { label: 'English', language: 'en', src: '/subs/en.vtt' },
  { label: 'Español', language: 'es', src: '/subs/es.srt' },
];

const chapters: Chapter[] = [
  { id: '1', title: 'Intro', startTime: 0, endTime: 30 },
  { id: '2', title: 'Demo', startTime: 30, endTime: 120 },
];

const playlist: PlaylistItem[] = [
  { id: '1', title: 'Episode 1', src: '/videos/ep1.m3u8', poster: '/posters/ep1.jpg' },
  { id: '2', title: 'Episode 2', src: '/videos/ep2.mp4', poster: '/posters/ep2.jpg' },
];

export function Player() {
  return (
    <VideoPlayer
      src="/videos/stream.m3u8"
      poster="/posters/stream.jpg"
      subtitles={subtitles}
      chapters={chapters}
      playlist={playlist}
      onTimeUpdate={(time) => console.log('current time', time)}
      onEnded={() => console.log('playback finished')}
    />
  );
}
```

Plain MP4/WebM works with just a `src`:

```tsx
<VideoPlayer src="/videos/clip.mp4" />
```

YouTube URLs are detected automatically and rendered through an embedded player.

## Features

- **Adaptive HLS streaming** — `.m3u8` sources play through hls.js, with native HLS fallback on Safari.
- **Quality selection** — HLS renditions are surfaced as selectable quality levels.
- **Subtitles & captions** — load SRT and VTT tracks, switch languages, upload local files, and customize font, color, background opacity, and position.
- **Playlists** — multi-item playback with next/previous, shuffle, and `none` / `one` / `all` repeat modes.
- **Chapters** — chapter markers rendered on the timeline with title lookup.
- **Live video filters** — adjust brightness, contrast, saturation, hue, blur, and grayscale in real time.
- **Picture-in-picture & fullscreen** — toggle both from the controls or keyboard.
- **Thumbnail scrubbing** — hover the timeline to preview frames.
- **Full keyboard control** — space/`k` play, arrows seek and adjust volume, `m` mute, `f` fullscreen, `p` PiP, `c` captions, `,`/`.` frame step.
- **Playback callbacks** — `onPlay`, `onPause`, `onEnded`, `onTimeUpdate`, and `onVolumeChange`.
- **Auto-hiding controls** and structyl-themed styling out of the box.

## API

### `VideoPlayer`

The single exported component. Props:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | — | Video source URL. Supports MP4/WebM, HLS (`.m3u8`), and YouTube links. **Required.** |
| `poster` | `string` | — | Poster image shown before playback. |
| `autoPlay` | `boolean` | `false` | Start playback automatically. |
| `loop` | `boolean` | `false` | Loop the current video. |
| `muted` | `boolean` | `false` | Start muted. |
| `className` | `string` | `''` | Extra classes merged onto the player container. |
| `subtitles` | `SubtitleTrack[]` | `[]` | Subtitle/caption tracks to load. |
| `playlist` | `PlaylistItem[]` | `[]` | Items for multi-video playback. |
| `chapters` | `Chapter[]` | `[]` | Chapter markers for the timeline. |
| `onPlay` | `() => void` | — | Fired when playback starts. |
| `onPause` | `() => void` | — | Fired when playback pauses. |
| `onEnded` | `() => void` | — | Fired when the current video ends. |
| `onTimeUpdate` | `(currentTime: number) => void` | — | Fired as the playback position changes. |
| `onVolumeChange` | `(volume: number) => void` | — | Fired when the volume changes. |

### Exported types

| Type | Shape |
| --- | --- |
| `VideoPlayerProps` | Props for `<VideoPlayer />` (above). |
| `SubtitleTrack` | `{ label, language, src, kind? }` |
| `SubtitleCue` | `{ start, end, text }` |
| `SubtitleStyle` | `{ fontSize, fontFamily, textColor, backgroundColor, backgroundOpacity, position }` |
| `PlaylistItem` | `{ id, title, src, poster?, duration? }` |
| `Chapter` | `{ id, title, startTime, endTime }` |
| `QualityLevel` | `{ height, width, bitrate, label }` |
| `VideoFilters` | `{ brightness, contrast, saturation, hue, blur, grayscale }` |

## Part of structyl

This package is part of [structyl](https://github.com/imirfanul/structyl) — the React UI library with structure. Full documentation lives at [structyl.dev](https://structyl.dev).

## License

MIT
