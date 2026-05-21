'use client';

import * as React from 'react';
import { createContext, Primitive, Presence } from '@aura-ui/core';
import { useControllableState, useId, useComposedRefs } from '@aura-ui/hooks';
import { composeEventHandlers } from '@aura-ui/utils';
import type {
  CollapsibleRootProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
} from './collapsible.types';

interface CollapsibleContextValue {
  contentId: string;
  disabled?: boolean;
  open: boolean;
  onOpenToggle: () => void;
}

const [CollapsibleProvider, useCollapsibleContext] =
  createContext<CollapsibleContextValue>('Collapsible');

/* ─── Root ─────────────────────────────────────────────────────────── */

const Root = React.forwardRef<HTMLDivElement, CollapsibleRootProps>(
  (props, forwardedRef) => {
    const {
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      disabled,
      ...rootProps
    } = props;

    const [open = false, setOpen] = useControllableState<boolean>({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });

    return (
      <CollapsibleProvider
        contentId={useId('collapsible-content')}
        disabled={disabled}
        open={open}
        onOpenToggle={React.useCallback(() => setOpen((p) => !p), [setOpen])}
      >
        <Primitive.div
          data-state={open ? 'open' : 'closed'}
          data-disabled={disabled ? '' : undefined}
          {...rootProps}
          ref={forwardedRef}
        />
      </CollapsibleProvider>
    );
  },
);
Root.displayName = 'Collapsible.Root';

/* ─── Trigger ──────────────────────────────────────────────────────── */

const Trigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  (props, forwardedRef) => {
    const ctx = useCollapsibleContext('Collapsible.Trigger');
    return (
      <Primitive.button
        type="button"
        aria-controls={ctx.contentId}
        aria-expanded={ctx.open}
        data-state={ctx.open ? 'open' : 'closed'}
        data-disabled={ctx.disabled ? '' : undefined}
        disabled={ctx.disabled}
        {...props}
        ref={forwardedRef}
        onClick={composeEventHandlers(props.onClick, ctx.onOpenToggle)}
      />
    );
  },
);
Trigger.displayName = 'Collapsible.Trigger';

/* ─── Content ──────────────────────────────────────────────────────── */

const Content = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  (props, forwardedRef) => {
    const { forceMount, children, ...contentProps } = props;
    const ctx = useCollapsibleContext('Collapsible.Content');
    return (
      <Presence present={forceMount || ctx.open}>
        <ContentImpl {...contentProps} ref={forwardedRef}>
          {children}
        </ContentImpl>
      </Presence>
    );
  },
);
Content.displayName = 'Collapsible.Content';

const ContentImpl = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  (props, forwardedRef) => {
    const { children, style, ...rest } = props;
    const ctx = useCollapsibleContext('Collapsible.ContentImpl');
    const [isOpen, setIsOpen] = React.useState(ctx.open);
    const ref = React.useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(forwardedRef, ref);
    const heightRef = React.useRef(0);
    const widthRef = React.useRef(0);
    const isPresent = ctx.open;
    const isMountAnimationPreventedRef = React.useRef(isPresent);
    const originalStylesRef = React.useRef<Record<string, string>>(undefined as never);

    React.useEffect(() => {
      const raf = requestAnimationFrame(() => {
        isMountAnimationPreventedRef.current = false;
      });
      return () => cancelAnimationFrame(raf);
    }, []);

    React.useLayoutEffect(() => {
      const node = ref.current;
      if (!node) return;
      originalStylesRef.current = originalStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName,
      };
      // Block animation on mount so initial render doesn't animate
      node.style.transitionDuration = '0s';
      node.style.animationName = 'none';

      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
      widthRef.current = rect.width;

      if (!isMountAnimationPreventedRef.current) {
        node.style.transitionDuration = originalStylesRef.current.transitionDuration ?? '';
        node.style.animationName = originalStylesRef.current.animationName ?? '';
      }
      setIsOpen(isPresent);
    }, [ctx.open, isPresent]);

    return (
      <Primitive.div
        data-state={ctx.open ? 'open' : 'closed'}
        data-disabled={ctx.disabled ? '' : undefined}
        id={ctx.contentId}
        hidden={!isOpen}
        {...rest}
        ref={composedRef}
        style={{
          ['--aura-ui-collapsible-content-height' as string]: heightRef.current
            ? `${heightRef.current}px`
            : undefined,
          ['--aura-ui-collapsible-content-width' as string]: widthRef.current
            ? `${widthRef.current}px`
            : undefined,
          ...style,
        }}
      >
        {isOpen && children}
      </Primitive.div>
    );
  },
);
ContentImpl.displayName = 'Collapsible.ContentImpl';

export { Root, Trigger, Content };
