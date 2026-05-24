import * as React from 'react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'info';
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ children, variant = 'default', ...props }, ref) => (
    <div ref={ref} role="alert" data-variant={variant} {...props}>
      {children}
    </div>
  ),
);

Alert.displayName = 'Alert';

export { Alert };
