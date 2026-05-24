'use client';

import * as React from 'react';

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/**
 * Renders a copy of its child element with merged props.
 * Powers the `asChild` pattern across the library.
 */
const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = React.Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);

  if (slottable) {
    // The new element to render is the one passed as a child of `Slottable`
    const newElement = (slottable.props as { children: React.ReactNode }).children;
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (React.Children.count(newElement) > 1) return React.Children.only(null);
        return React.isValidElement(newElement)
          ? (newElement.props as { children: React.ReactNode }).children
          : null;
      }
      return child;
    });

    return (
      <SlotClone {...slotProps} ref={forwardedRef}>
        {React.isValidElement(newElement)
          ? React.cloneElement(newElement, undefined, newChildren)
          : null}
      </SlotClone>
    );
  }

  return (
    <SlotClone {...slotProps} ref={forwardedRef}>
      {children}
    </SlotClone>
  );
});
Slot.displayName = 'Slot';

interface SlotCloneProps {
  children: React.ReactNode;
}

const SlotClone = React.forwardRef<unknown, SlotCloneProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;

  if (React.isValidElement(children)) {
    const childRef = getElementRef(children);
    const ref = forwardedRef ? composeRefs(forwardedRef, childRef) : childRef;
    return React.cloneElement(
      children,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...mergeProps(slotProps, children.props as Record<string, any>), ref } as any,
    );
  }

  return React.Children.count(children) > 1 ? React.Children.only(null) : null;
});
SlotClone.displayName = 'SlotClone';

const Slottable = ({ children }: { children: React.ReactNode }) => <>{children}</>;

function isSlottable(child: React.ReactNode): child is React.ReactElement {
  return React.isValidElement(child) && child.type === Slottable;
}

function mergeProps(
  slotProps: Record<string, unknown>,
  childProps: Record<string, unknown>,
): Record<string, unknown> {
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          (childPropValue as (...a: unknown[]) => unknown)(...args);
          (slotPropValue as (...a: unknown[]) => unknown)(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === 'style') {
      overrideProps[propName] = { ...(slotPropValue as object), ...(childPropValue as object) };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
}

function composeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T) =>
    refs.forEach((ref) => {
      if (typeof ref === 'function') ref(node);
      else if (ref != null) (ref as { current: T }).current = node;
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getElementRef(element: React.ReactElement): React.Ref<any> | undefined {
  // React <=18 in DEV exposes `ref` on `props` behind a warning getter.
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get;
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (element as any).ref;
  }

  // React 19 in DEV exposes `ref` on the element behind a warning getter.
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get;
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (element.props as any).ref;
  }

  // Production, or once React has moved `ref` onto `props`.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (element.props as any).ref || (element as any).ref;
}

export { Slot, Slottable };
export type { SlotProps };
