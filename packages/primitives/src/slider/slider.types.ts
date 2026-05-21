import type * as React from 'react';

export interface SliderRootProps extends Omit<React.ComponentPropsWithoutRef<'span'>, 'defaultValue' | 'value' | 'onChange'> {
  asChild?: boolean;
  name?: string;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  dir?: 'ltr' | 'rtl';
  min?: number;
  max?: number;
  step?: number;
  /** Smallest gap between thumbs in multi-thumb sliders. */
  minStepsBetweenThumbs?: number;
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
  inverted?: boolean;
}

export interface SliderTrackProps extends React.ComponentPropsWithoutRef<'span'> {
  asChild?: boolean;
}

export interface SliderRangeProps extends React.ComponentPropsWithoutRef<'span'> {
  asChild?: boolean;
}

export interface SliderThumbProps extends React.ComponentPropsWithoutRef<'span'> {
  asChild?: boolean;
}
