'use client';

import * as React from 'react';
import { createContext, Primitive } from '@your-lib/core';
import { useControllableState, useComposedRefs } from '@your-lib/hooks';
import { composeEventHandlers } from '@your-lib/utils';

export interface HsvaColor {
  h: number;
  s: number;
  v: number;
  a: number;
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function hsvToRgb({ h, s, v }: HsvaColor) {
  const c = v * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r = 0,
    g = 0,
    b = 0;
  if (hp >= 0 && hp < 1) [r, g, b] = [c, x, 0];
  else if (hp < 2) [r, g, b] = [x, c, 0];
  else if (hp < 3) [r, g, b] = [0, c, x];
  else if (hp < 4) [r, g, b] = [0, x, c];
  else if (hp < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const m = v - c;
  return { r: r + m, g: g + m, b: b + m };
}

export function hsvaToHex(hsva: HsvaColor): string {
  const { r, g, b } = hsvToRgb(hsva);
  return (
    '#' +
    [r, g, b]
      .map((c) => Math.round(c * 255).toString(16).padStart(2, '0'))
      .join('')
  );
}

interface ColorPickerContextValue {
  value: HsvaColor;
  onValueChange: (v: HsvaColor) => void;
  disabled?: boolean;
}

const [ColorPickerProvider, useColorPickerContext] =
  createContext<ColorPickerContextValue>('ColorPicker');

export interface ColorPickerRootProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'defaultValue'> {
  asChild?: boolean;
  value?: HsvaColor;
  defaultValue?: HsvaColor;
  onValueChange?: (v: HsvaColor) => void;
  disabled?: boolean;
}

const Root = React.forwardRef<HTMLDivElement, ColorPickerRootProps>(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue = { h: 0, s: 1, v: 1, a: 1 },
      onValueChange,
      disabled,
      ...rest
    } = props;
    const [value = defaultValue, setValue] = useControllableState<HsvaColor>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });
    return (
      <ColorPickerProvider value={value} onValueChange={(v) => setValue(v)} disabled={disabled}>
        <Primitive.div role="group" {...rest} ref={forwardedRef} />
      </ColorPickerProvider>
    );
  },
);
Root.displayName = 'ColorPicker.Root';

const Area = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, forwardedRef) => {
    const ctx = useColorPickerContext('ColorPicker.Area');
    const ref = React.useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(forwardedRef, ref);
    const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const s = clamp01((event.clientX - rect.left) / rect.width);
      const v = 1 - clamp01((event.clientY - rect.top) / rect.height);
      ctx.onValueChange({ ...ctx.value, s, v });
    };
    return (
      <Primitive.div
        role="application"
        aria-label="Color area"
        tabIndex={0}
        {...props}
        ref={composedRef}
        style={{
          position: 'relative',
          background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${ctx.value.h}deg 100% 50%))`,
          touchAction: 'none',
          ...props.style,
        }}
        onPointerDown={composeEventHandlers(props.onPointerDown, (event) => {
          (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
          handleMove(event);
        })}
        onPointerMove={composeEventHandlers(props.onPointerMove, (event) => {
          if ((event.currentTarget as HTMLElement).hasPointerCapture(event.pointerId)) {
            handleMove(event);
          }
        })}
        onPointerUp={composeEventHandlers(props.onPointerUp, (event) =>
          (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId),
        )}
        onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
          const step = event.shiftKey ? 0.1 : 0.01;
          if (event.key === 'ArrowLeft')
            ctx.onValueChange({ ...ctx.value, s: clamp01(ctx.value.s - step) });
          else if (event.key === 'ArrowRight')
            ctx.onValueChange({ ...ctx.value, s: clamp01(ctx.value.s + step) });
          else if (event.key === 'ArrowUp')
            ctx.onValueChange({ ...ctx.value, v: clamp01(ctx.value.v + step) });
          else if (event.key === 'ArrowDown')
            ctx.onValueChange({ ...ctx.value, v: clamp01(ctx.value.v - step) });
        })}
      />
    );
  },
);
Area.displayName = 'ColorPicker.Area';

const AreaThumb = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
  (props, forwardedRef) => {
    const ctx = useColorPickerContext('ColorPicker.AreaThumb');
    return (
      <Primitive.span
        aria-hidden
        {...props}
        ref={forwardedRef}
        style={{
          position: 'absolute',
          left: `${ctx.value.s * 100}%`,
          top: `${(1 - ctx.value.v) * 100}%`,
          transform: 'translate(-50%, -50%)',
          ...props.style,
        }}
      />
    );
  },
);
AreaThumb.displayName = 'ColorPicker.AreaThumb';

interface ChannelSliderProps extends React.ComponentPropsWithoutRef<'div'> {
  channel: 'h' | 'a';
}

const ChannelSlider = React.forwardRef<HTMLDivElement, ChannelSliderProps>(
  (props, forwardedRef) => {
    const { channel, ...rest } = props;
    const ctx = useColorPickerContext('ColorPicker.ChannelSlider');
    const ref = React.useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(forwardedRef, ref);
    const max = channel === 'h' ? 360 : 1;
    const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const pct = clamp01((event.clientX - rect.left) / rect.width);
      ctx.onValueChange({ ...ctx.value, [channel]: pct * max });
    };
    const background =
      channel === 'h'
        ? 'linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)'
        : `linear-gradient(to right, transparent, hsl(${ctx.value.h}deg 100% 50%))`;
    return (
      <Primitive.div
        role="slider"
        aria-label={channel === 'h' ? 'Hue' : 'Alpha'}
        aria-valuenow={ctx.value[channel]}
        aria-valuemin={0}
        aria-valuemax={max}
        tabIndex={0}
        {...rest}
        ref={composedRef}
        style={{ position: 'relative', background, touchAction: 'none', ...rest.style }}
        onPointerDown={composeEventHandlers(rest.onPointerDown, (event) => {
          (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
          handleMove(event);
        })}
        onPointerMove={composeEventHandlers(rest.onPointerMove, (event) => {
          if ((event.currentTarget as HTMLElement).hasPointerCapture(event.pointerId)) {
            handleMove(event);
          }
        })}
        onPointerUp={composeEventHandlers(rest.onPointerUp, (event) =>
          (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId),
        )}
      />
    );
  },
);
ChannelSlider.displayName = 'ColorPicker.ChannelSlider';

const Swatch = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, forwardedRef) => {
    const ctx = useColorPickerContext('ColorPicker.Swatch');
    const hex = hsvaToHex(ctx.value);
    return (
      <Primitive.div
        {...props}
        ref={forwardedRef}
        style={{
          background: hex,
          opacity: ctx.value.a,
          ...props.style,
        }}
      />
    );
  },
);
Swatch.displayName = 'ColorPicker.Swatch';

export { Root, Area, AreaThumb, ChannelSlider, Swatch };
