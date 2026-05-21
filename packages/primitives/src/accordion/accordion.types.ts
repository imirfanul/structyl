import type * as React from 'react';

interface CommonRootProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  asChild?: boolean;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  dir?: 'ltr' | 'rtl';
}

export interface AccordionSingleProps extends CommonRootProps {
  type: 'single';
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
}

export interface AccordionMultipleProps extends CommonRootProps {
  type: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type AccordionRootProps = AccordionSingleProps | AccordionMultipleProps;

export interface AccordionItemProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  value: string;
  disabled?: boolean;
}

export interface AccordionHeaderProps extends React.ComponentPropsWithoutRef<'h3'> {
  asChild?: boolean;
}

export interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

export interface AccordionContentProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  forceMount?: boolean;
}
