# @structyl/video-player

## 1.0.3

### Patch Changes

- Updated dependencies [0722e30]
  - @structyl/styled@1.2.0

## 1.0.2

### Patch Changes

- Updated dependencies [507aac8]
  - @structyl/styled@1.1.0

## 1.0.1

### Patch Changes

- Add package metadata and publish with npm provenance.

  Every package now declares `author` (Mohammed Irfanul Alam Tanveer), `repository` (with monorepo `directory`), `homepage` (https://www.structyl.com), and `bugs`. Releases are now published with npm provenance. No runtime/code changes.

- Fix YouTube embeds collapsing to zero height, and make the settings menu responsive.
  - **YouTube/player sizing:** the player relied on the `aspect-video` utility class for its dimensions, but a consuming app's Tailwind only generates classes it finds in its own source — so those utilities were often absent, and the YouTube branch (whose only child is an absolutely-positioned `<iframe>`) collapsed to `height: 0`, rendering nothing. The aspect ratio (and the YouTube background) are now set via inline styles, so the player is correctly sized regardless of the consumer's Tailwind setup.
  - **Settings menu:** the settings panel used a fixed `width: 280px` / `max-height: 420px` and its tab row clipped (e.g. "Playback" was cut off). The panel is now sized responsively (`min(320px, 100vw − 1rem)` wide, `min(70dvh, 420px)` tall) and the tab row scrolls horizontally so every tab stays reachable on small screens.
  - **Control bar:** on narrow players the control row overflowed and clipped the right-hand buttons (settings, picture-in-picture, fullscreen). The row now wraps instead of clipping, so every control stays reachable at any width.

- Updated dependencies
  - @structyl/styled@1.0.1
