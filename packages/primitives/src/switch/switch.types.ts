import type * as React from 'react';

export interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'value'> {
  /** Controlled checked state */
  checked?: boolean;
  /** Initial checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Called when the checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** When true, the switch is disabled */
  disabled?: boolean;
  /** When true, indicates the switch is required */
  required?: boolean;
  /** Form name attribute */
  name?: string;
  /** Form value when checked (default: 'on') */
  value?: string;
  /** Render as child (Slot pattern) */
  asChild?: boolean;
}
