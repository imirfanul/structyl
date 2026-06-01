# @structyl/themes

## 1.1.0

### Minor Changes

- Default theme is now `structyl`, and accent presets survive light/dark toggles.
  - **`ThemeProvider` and `ThemeScript` now default to `defaultTheme="structyl"`** (was `"slate"`). Pass `defaultTheme="slate"` explicitly to keep the previous default.
  - **Fix:** `useColorPreset` no longer loses the active accent when switching color mode. The accent is re-applied via a `MutationObserver` on the `data-theme`/`data-mode` attributes — after `ThemeProvider` rewrites the base tokens — instead of relying on React effect ordering, which let the provider clobber the accent on every toggle.
  - **New:** `useColorPreset({ defaultPresetId })` activates a preset on first load when nothing is stored yet (e.g. `defaultPresetId: 'structyl'` to make the brand accent the default selection).

### Patch Changes

- Add package metadata and publish with npm provenance.

  Every package now declares `author` (Mohammed Irfanul Alam Tanveer), `repository` (with monorepo `directory`), `homepage` (https://www.structyl.com), and `bugs`. Releases are now published with npm provenance. No runtime/code changes.
