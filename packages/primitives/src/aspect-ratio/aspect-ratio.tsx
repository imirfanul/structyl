'use client';

import * as React from 'react';

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ratio is width / height, e.g. 16/9 -> 16/9 */
  ratio?: number;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>((props, ref) => {
  const { ratio = 1, style, children, ...rest } = props;
  const paddingTop = `${(1 / ratio) * 100}%`;

  return (
    <div ref={ref} {...rest} style={{ position: 'relative', width: '100%', ...style }}>
      <div aria-hidden style={{ width: '100%', paddingTop }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>{children}</div>
    </div>
  );
});
AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
