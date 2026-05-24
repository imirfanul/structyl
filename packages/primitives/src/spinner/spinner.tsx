import * as React from 'react';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizeClass = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-6 w-6' : 'h-4 w-4';

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={[sizeClass, className].filter(Boolean).join(' ')}
        {...props}
      />
    );
  },
);

Spinner.displayName = 'Spinner';

export { Spinner };
