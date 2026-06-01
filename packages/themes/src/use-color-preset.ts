import { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from './use-theme';
import {
  COLOR_PRESETS,
  applyColorPreset,
  clearColorPreset,
  type ColorPreset,
} from './color-presets';

const DEFAULT_STORAGE_KEY = 'structyl-color-preset';

/* ── Types ─────────────────────────────────────────────────────────────────── */

export interface UseColorPresetOptions {
  /**
   * Custom presets to add on top of the 10 built-ins.
   * Built-ins always come first in `presets`.
   *
   * @example
   * const brandPreset = createColorPreset('brand', 'Brand Blue', '#1a6cf0');
   * const { setPreset } = useColorPreset({ extraPresets: [brandPreset] });
   */
  extraPresets?: ColorPreset[];

  /**
   * localStorage key used to persist the active preset across page loads.
   * Override if you need multiple independent pickers on the same origin.
   *
   * @default 'structyl-color-preset'
   */
  storageKey?: string;

  /**
   * Preset id to activate on first load when nothing is stored yet. Pass e.g.
   * `'structyl'` to make the brand accent the default-selected preset. Once the
   * user picks (or clears) a preset, that stored choice takes over.
   *
   * @default undefined (no preset active — uses the ThemeProvider base theme)
   */
  defaultPresetId?: string;
}

export interface UseColorPresetReturn {
  /** All available presets: built-ins first, then any `extraPresets`. */
  presets: ColorPreset[];
  /** ID of the currently active preset, or `null` when using the default theme. */
  activeId: string | null;
  /** Full preset object for the active ID, or `null`. */
  activePreset: ColorPreset | null;
  /**
   * Activate a preset by its `id` and `hex` color.
   * Applies CSS variables immediately and persists to localStorage.
   */
  setPreset: (id: string, hex: string) => void;
  /**
   * Clear the active preset, restoring the ThemeProvider's base theme colors.
   * Also removes the stored value from localStorage.
   */
  clearPreset: () => void;
}

/* ── Hook ───────────────────────────────────────────────────────────────────── */

/**
 * Manages an accent-color preset on top of the active structyl theme.
 *
 * Must be used inside a `<ThemeProvider>`. Persists the selection to
 * localStorage and re-applies it whenever the base theme or color-mode
 * changes (because ThemeProvider resets `--color-primary` on change).
 *
 * @example
 * function AccentPicker() {
 *   const { presets, activeId, setPreset, clearPreset } = useColorPreset();
 *   return (
 *     <>
 *       {presets.map(p => (
 *         <button key={p.id} onClick={() => setPreset(p.id, p.hex)}
 *           style={{ background: p.hex }}>
 *           {p.name}
 *         </button>
 *       ))}
 *       {activeId && <button onClick={clearPreset}>Reset</button>}
 *     </>
 *   );
 * }
 *
 * @example Adding custom presets
 * const brandPreset = createColorPreset('brand', 'Company Blue', '#1a6cf0');
 * const { presets } = useColorPreset({ extraPresets: [brandPreset] });
 */
export function useColorPreset(options: UseColorPresetOptions = {}): UseColorPresetReturn {
  const { extraPresets = [], storageKey = DEFAULT_STORAGE_KEY, defaultPresetId } = options;

  // Subscribe to the theme context — also enforces that this hook is used
  // inside a <ThemeProvider> (useTheme throws otherwise).
  useTheme();

  const allPresets: ColorPreset[] = [...(COLOR_PRESETS as unknown as ColorPreset[]), ...extraPresets];

  // Default to `defaultPresetId` (when it's a real preset) on first load, until
  // a stored selection is hydrated from localStorage below.
  const [activeId, setActiveId] = useState<string | null>(
    defaultPresetId && allPresets.some((p) => p.id === defaultPresetId) ? defaultPresetId : null,
  );

  // Hex of the active preset, mirrored into a ref so the mount-only
  // MutationObserver below always sees the current selection.
  const activeHex = allPresets.find(p => p.id === activeId)?.hex ?? null;
  const activeHexRef = useRef<string | null>(activeHex);
  activeHexRef.current = activeHex;

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && allPresets.some(p => p.id === stored)) {
        setActiveId(stored);
      }
    } catch {
      // localStorage unavailable (e.g. private browsing with strict settings)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  // Apply when the selection changes (covers localStorage hydration; setPreset
  // also applies directly for instant feedback).
  useEffect(() => {
    if (activeHex) applyColorPreset(activeHex);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  // ThemeProvider rewrites the base --color-* vars in its OWN effect which,
  // being the parent, runs AFTER this child hook's effects on every theme/mode
  // switch — clobbering the accent override (this is why the preset was "lost"
  // after toggling light/dark). Rather than depend on effect ordering, watch the
  // data-theme / data-mode attributes ThemeProvider sets on <html> and re-apply
  // the accent when they change: the MutationObserver callback runs as a
  // microtask after ThemeProvider's synchronous token write, so the accent wins
  // with no flash before paint.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      if (activeHexRef.current) applyColorPreset(activeHexRef.current);
    });
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme', 'data-mode'] });
    return () => observer.disconnect();
  }, []);

  const setPreset = useCallback((id: string, hex: string) => {
    setActiveId(id);
    applyColorPreset(hex);
    try { localStorage.setItem(storageKey, id); } catch { /* ignore */ }
  }, [storageKey]);

  const clearPreset = useCallback(() => {
    setActiveId(null);
    clearColorPreset();
    try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
  }, [storageKey]);

  const activePreset = allPresets.find(p => p.id === activeId) ?? null;

  return { presets: allPresets, activeId, activePreset, setPreset, clearPreset };
}
