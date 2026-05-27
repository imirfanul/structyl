'use client';

import * as React from 'react';
import { Primitive, Slot } from '@aura-ui/core';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {
  const { asChild = false, loading = false, loadingText, disabled, children, ...rest } = props;

  const isDisabled = disabled || loading;

  if (asChild) {
    return (
      <Slot
        ref={forwardedRef}
        data-loading={loading ? '' : undefined}
        aria-disabled={loading || undefined}
        {...rest}
      >
        {children}
      </Slot>
    );
  }

  return (
    <Primitive.button
      ref={forwardedRef}
      type="button"
      disabled={isDisabled}
      data-loading={loading ? '' : undefined}
      {...rest}
    >
      {loading && loadingText ? loadingText : children}
    </Primitive.button>
  );
});

Button.displayName = 'Button';

export { Button };
