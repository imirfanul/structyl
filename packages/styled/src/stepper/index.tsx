'use client';

import * as React from 'react';
import { Check } from '@your-lib/icons';
import { cn } from '@your-lib/utils';

type StepStatus = 'complete' | 'current' | 'upcoming';

interface StepperContextValue {
  activeStep: number;
  orientation: 'horizontal' | 'vertical';
}

const StepperContext = React.createContext<StepperContextValue>({
  activeStep: 0,
  orientation: 'horizontal',
});

interface StepperRootProps extends React.HTMLAttributes<HTMLDivElement> {
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
}

const Root = React.forwardRef<HTMLDivElement, StepperRootProps>(
  ({ activeStep, orientation = 'horizontal', className, children, ...props }, ref) => (
    <StepperContext.Provider value={{ activeStep, orientation }}>
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

const Indicator: React.FC<{ index: number; status: StepStatus }> = ({ index, status }) => (
  <span
    data-state={status}
    className={cn(
      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-medium',
      status === 'complete' && 'border-primary bg-primary text-primary-foreground',
      status === 'current' && 'border-primary text-primary',
      status === 'upcoming' && 'border-border text-muted-foreground',
    )}
  >
    {status === 'complete' ? <Check className="h-4 w-4" /> : index + 1}
  </span>
);

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

const Separator: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const ctx = React.useContext(StepperContext);
  return (
    <div
      aria-hidden="true"
      data-orientation={ctx.orientation}
      className={cn(
        'bg-border',
        ctx.orientation === 'horizontal' ? 'h-px flex-1' : 'h-6 w-px',
        className,
      )}
      {...props}
    />
  );
};
Separator.displayName = 'Stepper.Separator';

export { Root, Step, Title, Description, Separator };
