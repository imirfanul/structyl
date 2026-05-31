'use client';

import { useState, useEffect, useRef } from 'react';
import {
  COLOR_PRESETS,
  applyColorPreset,
  clearColorPreset,
  useColorPreset,
  type ColorPresetId,
} from '@structyl/themes';

// Re-export so existing imports from this module keep working
export { COLOR_PRESETS, applyColorPreset, clearColorPreset };
export type { ColorPresetId };
// Legacy alias used in page.tsx
export type PresetId = ColorPresetId;

/* ── ThemePresetPicker ─────────────────────────────────────────────────────── */
export function ThemePresetPicker() {
  const { presets, activeId, activePreset, setPreset, clearPreset } = useColorPreset();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const select = (id: string, hex: string) => {
    setPreset(id, hex);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(v => !v)}
        title="Color preset"
        aria-label="Choose color preset"
        aria-expanded={open}
        className="flex h-8 items-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 px-2 text-xs text-muted-foreground transition-colors hover:border-border hover:bg-muted/60 hover:text-fg"
      >
        {/* swatch */}
        <span
          className="size-3 rounded-full ring-1 ring-black/10"
          style={{ background: activePreset?.hex ?? 'conic-gradient(#e11d48,#f97316,#16a34a,#0284c7,#7c3aed,#e11d48)' }}
        />
        <span className="hidden sm:inline">{activePreset?.name ?? 'Theme'}</span>
        <svg className="h-3 w-3 opacity-50" viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Popover */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-border/60 bg-bg p-3 shadow-xl shadow-black/20">
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Accent preset
          </p>
          <div className="grid grid-cols-5 gap-2">
            {presets.map(({ id, name, hex }) => {
              const isActive = activeId === id;
              return (
                <button
                  key={id}
                  onClick={() => select(id, hex)}
                  title={name}
                  aria-label={name}
                  className="group flex flex-col items-center gap-1 rounded-lg p-1.5 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span
                    className="flex size-7 items-center justify-center rounded-full ring-offset-1 ring-offset-bg transition-all"
                    style={{
                      background: hex,
                      boxShadow: isActive ? `0 0 0 2px white, 0 0 0 3.5px ${hex}` : undefined,
                      transform:  isActive ? 'scale(1.15)' : undefined,
                    }}
                  />
                  <span className="text-[9px] font-medium leading-none text-muted-foreground group-hover:text-fg">
                    {name}
                  </span>
                </button>
              );
            })}
          </div>
          {activeId && (
            <button
              onClick={() => { clearPreset(); setOpen(false); }}
              className="mt-2.5 w-full rounded-lg border border-border/50 py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-border hover:text-fg"
            >
              Reset to default
            </button>
          )}
        </div>
      )}
    </div>
  );
}
