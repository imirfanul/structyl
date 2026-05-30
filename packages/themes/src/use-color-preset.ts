import { useState, useEffect, useCallback } from 'react';
import { useTheme } from './use-theme';
import {
  COLOR_PRESETS,
  applyColorPreset,
  clearColorPreset,
  type ColorPreset,
} from './color-presets';

const DEFAULT_STORAGE_KEY = 'aura-color-preset';

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
   * @default 'aura-color-preset'
   */
  storageKey?: string;
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
 * Manages an accent-color preset on top of the active aura-ui theme.
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
  const { extraPresets = [], storageKey = DEFAULT_STORAGE_KEY } = options;

  const { theme, resolvedMode } = useTheme();
  const [activeId, setActiveId] = useState<string | null>(null);

  const allPresets: ColorPreset[] = [...(COLOR_PRESETS as unknown as ColorPreset[]), ...extraPresets];

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

  // Re-apply CSS vars whenever base theme or color-mode changes (ThemeProvider resets them)
  useEffect(() => {
    if (!activeId) return;
    const preset = allPresets.find(p => p.id === activeId);
    if (preset) applyColorPreset(preset.hex);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, theme, resolvedMode]);

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
