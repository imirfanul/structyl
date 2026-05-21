'use client';

import * as React from 'react';
import { Primitive } from '@your-lib/core';
import type { AspectRatioProps } from './aspect-ratio.types';

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  (props, forwardedRef) => {
    const { ratio = 1 / 1, style, ...rest } = props;
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: `${100 / ratio}%`,
        }}
        data-your-lib-aspect-ratio-wrapper=""
      >
        <Primitive.div
          {...rest}
          ref={forwardedRef}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            ...style,
          }}
        />
      </div>
    );
  },
);
AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
