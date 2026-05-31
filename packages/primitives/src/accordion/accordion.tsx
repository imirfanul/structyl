'use client';

import * as React from 'react';
import {
  createContext,
  Primitive,
  RovingFocusGroup,
  RovingFocusItem,
} from '@aura-ui/core';
import { useControllableState, useId } from '@aura-ui/hooks';
import { composeEventHandlers } from '@aura-ui/utils';
import * as CollapsiblePrimitive from '../collapsible';
import type {
  AccordionRootProps,
  AccordionSingleProps,
  AccordionMultipleProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from './accordion.types';

/* ─── Root ─────────────────────────────────────────────────────────── */

interface AccordionContextValue {
  disabled?: boolean;
  direction?: 'ltr' | 'rtl';
  orientation: 'horizontal' | 'vertical';
}

const [AccordionProvider, useAccordionContext] =
  createContext<AccordionContextValue>('Accordion');

interface AccordionValueContextValue {
  value: string[];
  onItemOpen: (value: string) => void;
  onItemClose: (value: string) => void;
}

const [AccordionValueProvider, useAccordionValueContext] =
  createContext<AccordionValueContextValue>('Accordion');

interface AccordionCollapsibleContextValue {
  collapsible: boolean;
}

const [AccordionCollapsibleProvider, useAccordionCollapsibleContext] =
  createContext<AccordionCollapsibleContextValue>('Accordion');

const Root = React.forwardRef<HTMLDivElement, AccordionRootProps>(
  (props, forwardedRef) => {
    const { type, ...rest } = props;
    if (type === 'single') {
      return <AccordionImplSingle ref={forwardedRef} {...(rest as AccordionSingleProps)} />;
    }
    return <AccordionImplMultiple ref={forwardedRef} {...(rest as AccordionMultipleProps)} />;
  },
) as React.ForwardRefExoticComponent<AccordionRootProps & React.RefAttributes<HTMLDivElement>>;
Root.displayName = 'Accordion.Root';

const AccordionImplSingle = React.forwardRef<HTMLDivElement, Omit<AccordionSingleProps, 'type'>>(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue,
      onValueChange,
      collapsible = false,
      ...rest
    } = props;
    const [value, setValue] = useControllableState<string | undefined>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: (v) => onValueChange?.(v as string),
    });
    return (
      <AccordionValueProvider
        value={value ? [value] : []}
        onItemOpen={(v) => setValue(v)}
        onItemClose={React.useCallback(() => {
          if (collapsible) setValue('');
        }, [collapsible, setValue])}
      >
        <AccordionCollapsibleProvider collapsible={collapsible}>
          <AccordionImpl {...rest} ref={forwardedRef} />
        </AccordionCollapsibleProvider>
      </AccordionValueProvider>
    );
  },
);
AccordionImplSingle.displayName = 'Accordion.ImplSingle';

const AccordionImplMultiple = React.forwardRef<
  HTMLDivElement,
  Omit<AccordionMultipleProps, 'type'>
>((props, forwardedRef) => {
  const {
    value: valueProp,
    defaultValue,
    onValueChange,
    ...rest
  } = props;
  const [value = [], setValue] = useControllableState<string[]>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });
  return (
    <AccordionValueProvider
      value={value}
      onItemOpen={React.useCallback(
        (v) => setValue((prev = []) => [...prev, v]),
        [setValue],
      )}
      onItemClose={React.useCallback(
        (v) => setValue((prev = []) => prev.filter((x) => x !== v)),
        [setValue],
      )}
    >
      <AccordionCollapsibleProvider collapsible>
        <AccordionImpl {...rest} ref={forwardedRef} />
      </AccordionCollapsibleProvider>
    </AccordionValueProvider>
  );
});
AccordionImplMultiple.displayName = 'Accordion.ImplMultiple';

interface AccordionImplProps extends React.ComponentPropsWithoutRef<'div'> {
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  dir?: 'ltr' | 'rtl';
}

const AccordionImpl = React.forwardRef<HTMLDivElement, AccordionImplProps>(
  (props, forwardedRef) => {
    const {
      disabled,
      orientation = 'vertical',
      dir,
      ...rest
    } = props;
    return (
      <AccordionProvider disabled={disabled} direction={dir} orientation={orientation}>
        <RovingFocusGroup
          asChild
          orientation={orientation}
          dir={dir}
          loop
        >
          <Primitive.div
            data-orientation={orientation}
            {...rest}
            ref={forwardedRef}
          />
        </RovingFocusGroup>
      </AccordionProvider>
    );
  },
);
AccordionImpl.displayName = 'Accordion.Impl';

/* ─── Item ──────────────────────────────────────────────────────────── */

interface AccordionItemContextValue {
  open: boolean;
  disabled?: boolean;
  triggerId: string;
}

const [AccordionItemProvider, useAccordionItemContext] =
  createContext<AccordionItemContextValue>('AccordionItem');

const Item = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  (props, forwardedRef) => {
    const { value, disabled, ...rest } = props;
    const accordionCtx = useAccordionContext('Accordion.Item');
    const valueCtx = useAccordionValueContext('Accordion.Item');
    const _collapsibleCtx = useAccordionCollapsibleContext('Accordion.Item');
    const open = (value && valueCtx.value.includes(value)) || false;
    const isDisabled = accordionCtx.disabled || disabled;
    const triggerId = useId('accordion-trigger');

    return (
      <AccordionItemProvider open={open} disabled={isDisabled} triggerId={triggerId}>
        <CollapsiblePrimitive.Root
          data-orientation={accordionCtx.orientation}
          data-state={open ? 'open' : 'closed'}
          {...rest}
          ref={forwardedRef}
          disabled={isDisabled}
          open={open}
          onOpenChange={(next) => {
            if (next) valueCtx.onItemOpen(value);
            else valueCtx.onItemClose(value);
          }}
        />
      </AccordionItemProvider>
    );
  },
);
Item.displayName = 'Accordion.Item';

/* ─── Header ────────────────────────────────────────────────────────── */

const Header = React.forwardRef<HTMLHeadingElement, AccordionHeaderProps>(
  (props, forwardedRef) => {
    const accordionCtx = useAccordionContext('Accordion.Header');
    const itemCtx = useAccordionItemContext('Accordion.Header');
    return (
      <Primitive.h3
        data-orientation={accordionCtx.orientation}
        data-state={itemCtx.open ? 'open' : 'closed'}
        data-disabled={itemCtx.disabled ? '' : undefined}
        {...props}
        ref={forwardedRef}
      />
    );
  },
);
Header.displayName = 'Accordion.Header';

/* ─── Trigger ──────────────────────────────────────────────────────── */

const Trigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  (props, forwardedRef) => {
    const accordionCtx = useAccordionContext('Accordion.Trigger');
    const itemCtx = useAccordionItemContext('Accordion.Trigger');
    const collapsibleCtx = useAccordionCollapsibleContext('Accordion.Trigger');
    return (
      <RovingFocusItem asChild focusable={!itemCtx.disabled}>
        <CollapsiblePrimitive.Trigger
          aria-disabled={(itemCtx.open && !collapsibleCtx.collapsible) || undefined}
          data-orientation={accordionCtx.orientation}
          id={itemCtx.triggerId}
          {...props}
          ref={forwardedRef}
          onClick={composeEventHandlers(props.onClick, (event) => {
            if (itemCtx.open && !collapsibleCtx.collapsible) event.preventDefault();
          })}
        />
      </RovingFocusItem>
    );
  },
);
Trigger.displayName = 'Accordion.Trigger';

/* ─── Content ──────────────────────────────────────────────────────── */

const Content = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  (props, forwardedRef) => {
    const accordionCtx = useAccordionContext('Accordion.Content');
    const itemCtx = useAccordionItemContext('Accordion.Content');
    return (
      <CollapsiblePrimitive.Content
        role="region"
        aria-labelledby={itemCtx.triggerId}
        data-orientation={accordionCtx.orientation}
        {...props}
        ref={forwardedRef}
        style={{
          ['--aura-ui-accordion-content-height' as string]:
            'var(--aura-ui-collapsible-content-height)',
          ['--aura-ui-accordion-content-width' as string]:
            'var(--aura-ui-collapsible-content-width)',
          ...props.style,
        }}
      />
    );
  },
);
Content.displayName = 'Accordion.Content';

export { Root, Item, Header, Trigger, Content };
