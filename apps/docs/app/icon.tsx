import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: 32, height: 32, display: 'flex' }}>
      <svg viewBox="0 0 512 512" width="32" height="32" fill="none">
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
            <stop offset="0" stopColor="#ECFFFB" stopOpacity="0.95" />
            <stop offset="0.5" stopColor="#ECFFFB" stopOpacity="0" />
          </radialGradient>
          <clipPath id="sq">
            <rect width="512" height="512" rx="116" ry="116" />
          </clipPath>
        </defs>
        <g clipPath="url(#sq)">
          <rect width="512" height="512" fill="url(#sky)" />
          <circle cx="256" cy="256" r="188" fill="none" stroke="url(#aurora)" strokeWidth="18" opacity="0.7" />
          <circle cx="256" cy="256" r="188" fill="none" stroke="url(#aurora)" strokeWidth="16" />
          <circle cx="256" cy="256" r="120" fill="url(#aurora)" opacity="0.5" />
          <circle cx="256" cy="256" r="116" fill="url(#aurora)" />
          <circle cx="256" cy="256" r="116" fill="url(#coreLum)" />
        </g>
      </svg>
    </div>,
    { ...size },
  );
}
