'use client';

import * as React from 'react';
import { ColorPicker as ColorPickerPrimitive } from '@structyl/primitives';
import { cn } from '@structyl/utils';

const Root = React.forwardRef<
  React.ElementRef<typeof ColorPickerPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ColorPickerPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ColorPickerPrimitive.Root ref={ref} className={cn('flex w-64 flex-col gap-3 p-3', className)} {...props} />
));
Root.displayName = 'ColorPicker.Root';

const Area = React.forwardRef<
  React.ElementRef<typeof ColorPickerPrimitive.Area>,
  React.ComponentPropsWithoutRef<typeof ColorPickerPrimitive.Area>
>(({ className, ...props }, ref) => (
  <ColorPickerPrimitive.Area
    ref={ref}
    className={cn('relative h-40 w-full rounded-md border border-border', className)}
    {...props}
  >
    <ColorPickerPrimitive.AreaThumb
      className="h-3 w-3 rounded-full shadow-[0_0_0_2px_white,0_0_0_3px_rgba(0,0,0,0.4)]"
    />
  </ColorPickerPrimitive.Area>
));
Area.displayName = 'ColorPicker.Area';

const HueSlider = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <ColorPickerPrimitive.ChannelSlider
      ref={ref}
      channel="h"
      className={cn('relative h-3 w-full rounded-full', className)}
      {...props}
    />
  ),
);
HueSlider.displayName = 'ColorPicker.HueSlider';

const AlphaSlider = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <ColorPickerPrimitive.ChannelSlider
      ref={ref}
      channel="a"
      className={cn('relative h-3 w-full rounded-full', className)}
      {...props}
    />
  ),
);
AlphaSlider.displayName = 'ColorPicker.AlphaSlider';

const Swatch = React.forwardRef<
  React.ElementRef<typeof ColorPickerPrimitive.Swatch>,
  React.ComponentPropsWithoutRef<typeof ColorPickerPrimitive.Swatch>
>(({ className, ...props }, ref) => (
  <ColorPickerPrimitive.Swatch
    ref={ref}
    className={cn('h-8 w-8 rounded-md border border-border', className)}
    {...props}
  />
));
Swatch.displayName = 'ColorPicker.Swatch';

export { Root, Area, HueSlider, AlphaSlider, Swatch };
