import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const base = 'inline-flex items-center rounded-full px-2 py-0.5 text-sm font-medium';
    const style =
      variant === 'outline'
        ? 'bg-transparent border border-input'
        : 'bg-primary text-primary-foreground';

    return (
      <span ref={ref} className={[base, style, className].filter(Boolean).join(' ')} {...props}>
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';

export { Badge };
