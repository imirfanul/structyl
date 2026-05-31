import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'structyl — The React UI library with structure.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const AuroraOrb = ({ s = 320 }: { s?: number }) => (
  <div style={{ width: s, height: s, display: 'flex' }}>
    <svg viewBox="0 0 512 512" width={s} height={s} fill="none">
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
  </div>
);

const pills = [
  { label: 'Date & time picker', aurora: true },
  { label: 'Date range picker', aurora: true },
  { label: 'Advanced data table', aurora: true },
  { label: 'Theming', aurora: false },
  { label: 'Hooks', aurora: false },
];

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0C1628 0%, #070B18 100%)',
          fontFamily: 'system-ui, sans-serif',
          padding: '0 72px',
          position: 'relative',
        }}
      >
        {/* Ambient glow — top-left */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '-80px',
            width: '560px',
            height: '560px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(35,199,214,0.12) 0%, transparent 65%)',
          }}
        />

        {/* Ambient glow — bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-60px',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(110,139,255,0.10) 0%, transparent 65%)',
          }}
        />

        {/* Left — orb + wordmark */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '420px',
            flexShrink: 0,
            gap: '20px',
          }}
        >
          <AuroraOrb s={320} />

          <div style={{ display: 'flex', fontSize: '44px', fontWeight: 700, letterSpacing: '-1px' }}>
            <span style={{ color: '#EEF3FA' }}>struct</span>
            <span style={{ color: '#4DF6C9' }}>yl</span>
          </div>
        </div>

        {/* Vertical divider */}
        <div
          style={{
            width: '1px',
            height: '360px',
            background: 'rgba(255,255,255,0.07)',
            flexShrink: 0,
            marginLeft: '16px',
          }}
        />

        {/* Right — copy */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            paddingLeft: '68px',
            gap: '28px',
          }}
        >
          {/* Accent bar */}
          <div style={{ width: '52px', height: '4px', background: '#4DF6C9', borderRadius: '2px' }} />

          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', lineHeight: 1.1 }}>
            <span
              style={{
                fontSize: '64px',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-2px',
                lineHeight: 1.1,
              }}
            >
              The React UI
              {'\n'}library with
            </span>
            <span
              style={{
                fontSize: '64px',
                fontWeight: 800,
                color: '#4DF6C9',
                letterSpacing: '-2px',
                lineHeight: 1.15,
              }}
            >
              structure.
            </span>
          </div>

          {/* Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {pills.map(({ label, aurora }) => (
              <div
                key={label}
                style={{
                  padding: '8px 20px',
                  borderRadius: '999px',
                  border: aurora ? '1.5px solid rgba(77,246,201,0.55)' : '1.5px solid rgba(255,255,255,0.18)',
                  color: aurora ? '#4DF6C9' : '#8C9BB8',
                  background: aurora ? 'rgba(77,246,201,0.06)' : 'transparent',
                  fontSize: '17px',
                  fontWeight: 600,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
