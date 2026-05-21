'use client';

import * as React from 'react';
import { useComposedRefs } from './_internal';

type PresenceState = 'mounted' | 'unmountSuspended' | 'unmounted';
type PresenceEvent = 'MOUNT' | 'ANIMATION_OUT' | 'ANIMATION_END' | 'UNMOUNT';

const machine: Record<PresenceState, Partial<Record<PresenceEvent, PresenceState>>> = {
  mounted: {
    UNMOUNT: 'unmounted',
    ANIMATION_OUT: 'unmountSuspended',
  },
  unmountSuspended: {
    MOUNT: 'mounted',
    ANIMATION_END: 'unmounted',
  },
  unmounted: {
    MOUNT: 'mounted',
  },
};

/**
 * Drives an animation-aware presence state machine. When `present` flips from
 * true → false the node remains mounted until a CSS animation or transition
 * completes, allowing exit animations to play.
 */
function usePresence(present: boolean) {
  const [node, setNode] = React.useState<HTMLElement | null>(null);
  const stylesRef = React.useRef<CSSStyleDeclaration | null>(null);
  const prevPresentRef = React.useRef(present);
  const prevAnimationNameRef = React.useRef<string>('none');
  const initialState: PresenceState = present ? 'mounted' : 'unmounted';
  const [state, setState] = React.useState<PresenceState>(initialState);

  const send = React.useCallback((event: PresenceEvent) => {
    setState((prev) => {
      const next = machine[prev][event];
      return next ?? prev;
    });
  }, []);

  React.useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === 'mounted' ? currentAnimationName : 'none';
  }, [state]);

  React.useEffect(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;

    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);

      if (present) {
        send('MOUNT');
      } else if (currentAnimationName === 'none' || styles?.display === 'none') {
        send('UNMOUNT');
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send('ANIMATION_OUT');
        } else {
          send('UNMOUNT');
        }
      }

      prevPresentRef.current = present;
    }
  }, [present, send]);

  React.useEffect(() => {
    if (!node) {
      send('ANIMATION_END');
      return;
    }
    const handleAnimationEnd = (event: AnimationEvent | TransitionEvent) => {
      const currentAnimationName = getAnimationName(stylesRef.current);
      const animationName =
        'animationName' in event ? event.animationName : '';
      const isCurrent =
        currentAnimationName.includes(animationName) || animationName === '';
      if (event.target === node && isCurrent) {
        send('ANIMATION_END');
      }
    };
    const handleAnimationStart = (event: AnimationEvent) => {
      if (event.target === node) {
        prevAnimationNameRef.current = getAnimationName(stylesRef.current);
      }
    };
    node.addEventListener('animationstart', handleAnimationStart);
    node.addEventListener('animationcancel', handleAnimationEnd);
    node.addEventListener('animationend', handleAnimationEnd);
    node.addEventListener('transitioncancel', handleAnimationEnd);
    node.addEventListener('transitionend', handleAnimationEnd);
    return () => {
      node.removeEventListener('animationstart', handleAnimationStart);
      node.removeEventListener('animationcancel', handleAnimationEnd);
      node.removeEventListener('animationend', handleAnimationEnd);
      node.removeEventListener('transitioncancel', handleAnimationEnd);
      node.removeEventListener('transitionend', handleAnimationEnd);
    };
  }, [node, send]);

  return {
    isPresent: state !== 'unmounted',
    ref: React.useCallback((el: HTMLElement | null) => {
      stylesRef.current = el ? getComputedStyle(el) : null;
      setNode(el);
    }, []),
  };
}

function getAnimationName(styles: CSSStyleDeclaration | null): string {
  return styles?.animationName || 'none';
}

interface PresenceProps {
  present: boolean;
  children:
    | React.ReactElement
    | ((props: { present: boolean }) => React.ReactElement);
  /** Force the element to stay mounted regardless of `present`. */
  forceMount?: boolean;
}

const Presence: React.FC<PresenceProps> = (props) => {
  const { present, children, forceMount } = props;
  const presence = usePresence(present);
  const isFunctionChild = typeof children === 'function';

  const child = isFunctionChild
    ? children({ present: presence.isPresent })
    : (React.Children.only(children) as React.ReactElement);

  const childRef = getElementRef(child);
  const ref = useComposedRefs(presence.ref, childRef);

  const shouldRender = forceMount || isFunctionChild || presence.isPresent;
  if (!shouldRender) return null;

  return React.cloneElement(child, { ref } as { ref?: React.Ref<HTMLElement> });
};
Presence.displayName = 'Presence';

function getElementRef(
  element: React.ReactElement,
): React.Ref<HTMLElement> | undefined {
  const props = element.props as { ref?: React.Ref<HTMLElement> };
  const ref19 = props?.ref;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref18 = (element as any).ref;
  return (ref19 ?? ref18) as React.Ref<HTMLElement> | undefined;
}

export { Presence, usePresence };
export type { PresenceProps };
