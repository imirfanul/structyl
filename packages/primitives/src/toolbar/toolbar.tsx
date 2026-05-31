'use client';

import * as React from 'react';
import {
  createContext,
  Primitive,
  RovingFocusGroup,
  RovingFocusItem,
  useDirection,
} from '@structyl/core';

interface ToolbarContextValue {
  orientation: 'horizontal' | 'vertical';
  dir: 'ltr' | 'rtl';
  loop: boolean;
}

const [ToolbarProvider, useToolbarContext] = createContext<ToolbarContextValue>('Toolbar');

export interface ToolbarRootProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  orientation?: 'horizontal' | 'vertical';
  dir?: 'ltr' | 'rtl';
  loop?: boolean;
}

const Root = React.forwardRef<HTMLDivElement, ToolbarRootProps>(
  (props, forwardedRef) => {
    const {
      orientation = 'horizontal',
      dir: dirProp,
      loop = true,
      ...rest
    } = props;
    const dir = useDirection(dirProp);
    return (
      <ToolbarProvider orientation={orientation} dir={dir} loop={loop}>
        <RovingFocusGroup
          asChild
          orientation={orientation}
          dir={dir}
          loop={loop}
        >
          <Primitive.div
            role="toolbar"
            aria-orientation={orientation}
            dir={dir}
            {...rest}
            ref={forwardedRef}
          />
        </RovingFocusGroup>
      </ToolbarProvider>
    );
  },
);
Root.displayName = 'Toolbar.Root';

const Button = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<'button'>>(
  (props, forwardedRef) => (
    <RovingFocusItem asChild focusable={!props.disabled}>
      <Primitive.button type="button" {...props} ref={forwardedRef} />
    </RovingFocusItem>
  ),
);
Button.displayName = 'Toolbar.Button';

const Link = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<'a'>>(
  (props, forwardedRef) => (
    <RovingFocusItem asChild focusable>
      <Primitive.a {...props} ref={forwardedRef} />
    </RovingFocusItem>
  ),
);
Link.displayName = 'Toolbar.Link';

const Separator = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, forwardedRef) => {
    const ctx = useToolbarContext('Toolbar.Separator');
    return (
      <Primitive.div
        role="separator"
        aria-orientation={ctx.orientation === 'horizontal' ? 'vertical' : 'horizontal'}
        {...props}
        ref={forwardedRef}
      />
    );
  },
);
Separator.displayName = 'Toolbar.Separator';

export { Root, Button, Link, Separator };
