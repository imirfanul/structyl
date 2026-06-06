'use client';

import * as React from 'react';
import { cn } from '@structyl/utils';

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Scroll direction. Defaults to horizontal. */
  vertical?: boolean;
  /** Reverse the scroll direction. */
  reverse?: boolean;
  /** Pause the animation while hovered. */
  pauseOnHover?: boolean;
  /** Animation duration (any CSS time value). Defaults to `30s`. */
  duration?: string;
  /** Gap between the repeated content. Defaults to `1rem`. */
  gap?: string;
  /** How many times to repeat the children for a seamless loop. Defaults to 2. */
  repeat?: number;
}

/**
 * A CSS-only scrolling strip for logos, testimonials, or announcements.
 * Children are repeated to create a seamless loop. Respects `prefers-reduced-motion`
 * (the animation is disabled for users who request reduced motion).
 */
const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      className,
      vertical = false,
      reverse = false,
      pauseOnHover = false,
      duration = '30s',
      gap = '1rem',
      repeat = 2,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const animationClass = vertical ? 'animate-marquee-vertical' : 'animate-marquee';
    return (
      <div
        ref={ref}
        className={cn(
          'group flex overflow-hidden',
          vertical ? 'flex-col' : 'flex-row',
          'motion-reduce:overflow-auto',
          className,
        )}
        style={
          {
            '--marquee-duration': duration,
            '--marquee-gap': gap,
            gap,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {Array.from({ length: Math.max(1, repeat) }).map((_, i) => (
          <div
            key={i}
            aria-hidden={i > 0}
            className={cn(
              'flex shrink-0 justify-around',
              vertical ? 'flex-col' : 'flex-row',
              animationClass,
              reverse && '[animation-direction:reverse]',
              pauseOnHover && 'group-hover:[animation-play-state:paused]',
              'motion-reduce:animate-none',
            )}
            style={{ gap }}
          >
            {children}
          </div>
        ))}
      </div>
    );
  },
);
Marquee.displayName = 'Marquee';

export { Marquee };
