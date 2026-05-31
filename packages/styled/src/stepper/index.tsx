'use client';

import * as React from 'react';
import { Check } from '@structyl/icons';
import { cn } from '@structyl/utils';

type StepStatus = 'complete' | 'current' | 'upcoming';
export type StepperColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

interface StepperContextValue {
  activeStep: number;
  orientation: 'horizontal' | 'vertical';
  color: StepperColor;
}

const StepperContext = React.createContext<StepperContextValue>({
  activeStep: 0,
  orientation: 'horizontal',
  color: 'primary',
});

// ── Per-color classes ─────────────────────────────────────────────────────────

const colorClasses: Record<StepperColor, {
  completeBg: string;
  completeBorder: string;
  completeText: string;
  currentBorder: string;
  currentText: string;
}> = {
  primary:   { completeBg: 'bg-primary',     completeBorder: 'border-primary',     completeText: 'text-primary-foreground',     currentBorder: 'border-primary',     currentText: 'text-primary' },
  secondary: { completeBg: 'bg-secondary',   completeBorder: 'border-secondary',   completeText: 'text-secondary-foreground',   currentBorder: 'border-secondary',   currentText: 'text-secondary-dark' },
  error:     { completeBg: 'bg-destructive', completeBorder: 'border-destructive', completeText: 'text-destructive-foreground', currentBorder: 'border-destructive', currentText: 'text-destructive' },
  warning:   { completeBg: 'bg-warning',     completeBorder: 'border-warning',     completeText: 'text-warning-foreground',     currentBorder: 'border-warning',     currentText: 'text-warning' },
  info:      { completeBg: 'bg-info',        completeBorder: 'border-info',        completeText: 'text-info-foreground',        currentBorder: 'border-info',        currentText: 'text-info' },
  success:   { completeBg: 'bg-success',     completeBorder: 'border-success',     completeText: 'text-success-foreground',     currentBorder: 'border-success',     currentText: 'text-success' },
};

// ── Root ──────────────────────────────────────────────────────────────────────

interface StepperRootProps extends React.HTMLAttributes<HTMLDivElement> {
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  color?: StepperColor;
}

const Root = React.forwardRef<HTMLDivElement, StepperRootProps>(
  ({ activeStep, orientation = 'horizontal', color = 'primary', className, children, ...props }, ref) => (
    <StepperContext.Provider value={{ activeStep, orientation, color }}>
      <div
        ref={ref}
        role="group"
        aria-label="progress"
        data-orientation={orientation}
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-row items-center gap-2' : 'flex-col gap-2',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </StepperContext.Provider>
  ),
);
Root.displayName = 'Stepper.Root';

// ── Step ──────────────────────────────────────────────────────────────────────

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ index, className, children, ...props }, ref) => {
    const ctx = React.useContext(StepperContext);
    const status: StepStatus =
      index < ctx.activeStep ? 'complete' : index === ctx.activeStep ? 'current' : 'upcoming';
    return (
      <div
        ref={ref}
        data-state={status}
        aria-current={status === 'current' ? 'step' : undefined}
        className={cn('flex items-center gap-2', className)}
        {...props}
      >
        {children ?? <Indicator index={index} status={status} />}
      </div>
    );
  },
);
Step.displayName = 'Stepper.Step';

// ── Indicator ─────────────────────────────────────────────────────────────────

const Indicator: React.FC<{ index: number; status: StepStatus }> = ({ index, status }) => {
  const { color } = React.useContext(StepperContext);
  const c = colorClasses[color];
  return (
    <span
      data-state={status}
      className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-medium',
        status === 'complete' && [c.completeBg, c.completeBorder, c.completeText],
        status === 'current'  && [c.currentBorder, c.currentText],
        status === 'upcoming' && 'border-border text-muted-foreground',
      )}
    >
      {status === 'complete' ? <Check className="h-4 w-4" /> : index + 1}
    </span>
  );
};

// ── Title / Description / Separator ──────────────────────────────────────────

const Title = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn('text-sm font-medium', className)} {...props} />
  ),
);
Title.displayName = 'Stepper.Title';

const Description = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn('text-xs text-muted-foreground', className)} {...props} />
  ),
);
Description.displayName = 'Stepper.Description';

const Separator: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  const { orientation } = React.useContext(StepperContext);
  return (
    <div
      aria-hidden="true"
      data-orientation={orientation}
      className={cn(
        'bg-border',
        orientation === 'horizontal' ? 'h-px flex-1' : 'h-6 w-px',
        className,
      )}
      {...props}
    />
  );
};
Separator.displayName = 'Stepper.Separator';

export { Root, Step, Title, Description, Separator };
