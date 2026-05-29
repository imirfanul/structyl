import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: 180, height: 180, display: 'flex' }}>
      <svg viewBox="0 0 512 512" width="180" height="180" fill="none">
        <defs>
          <linearGradient id="sky" x1="40" y1="20" x2="472" y2="492" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#131F36" />
            <stop offset="1" stopColor="#070B18" />
          </linearGradient>
          <linearGradient id="aurora" x1="150" y1="70" x2="360" y2="440" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#4DF6C9" />
            <stop offset="0.42" stopColor="#23C7D6" />
            <stop offset="0.78" stopColor="#6E8BFF" />
            <stop offset="1" stopColor="#A973FF" />
          </linearGradient>
          <radialGradient id="coreLum" cx="0.40" cy="0.36" r="0.72">
            <stop offset="0" stopColor="#ECFFFB" stopOpacity="0.92" />
            <stop offset="0.45" stopColor="#ECFFFB" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bloom" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#33E2D2" stopOpacity="0.45" />
            <stop offset="1" stopColor="#33E2D2" stopOpacity="0" />
          </radialGradient>
          <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <filter id="softglow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <clipPath id="sq">
            <rect width="512" height="512" rx="116" ry="116" />
          </clipPath>
        </defs>
        <g clipPath="url(#sq)">
          <rect width="512" height="512" fill="url(#sky)" />
          <circle cx="256" cy="256" r="168" fill="url(#bloom)" />
          <g filter="url(#glow)" opacity="0.75">
            <circle cx="256" cy="256" r="152" fill="none" stroke="url(#aurora)" strokeWidth="11" />
            <circle cx="256" cy="256" r="200" fill="none" stroke="url(#aurora)" strokeWidth="9" />
          </g>
          <circle cx="256" cy="256" r="152" fill="none" stroke="url(#aurora)" strokeWidth="10" />
          <circle cx="256" cy="256" r="200" fill="none" stroke="url(#aurora)" strokeWidth="8" />
          <circle cx="256" cy="256" r="96" fill="url(#aurora)" filter="url(#softglow)" opacity="0.55" />
          <circle cx="256" cy="256" r="90" fill="url(#aurora)" />
          <circle cx="256" cy="256" r="90" fill="url(#coreLum)" />
        </g>
      </svg>
    </div>,
    { ...size },
  );
}
