import type * as React from 'react';

interface CommonRootProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  asChild?: boolean;
  disabled?: boolean;
  rovingFocus?: boolean;
  orientation?: 'horizontal' | 'vertical';
  dir?: 'ltr' | 'rtl';
  loop?: boolean;
}

export interface ToggleGroupSingleProps extends CommonRootProps {
  type: 'single';
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export interface ToggleGroupMultipleProps extends CommonRootProps {
  type: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type ToggleGroupRootProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;

export interface ToggleGroupItemProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
  value: string;
  disabled?: boolean;
}
