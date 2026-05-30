import React from 'react';

export interface SubtitleStyle {
  fontSize: number;
  fontFamily: string;
  textColor: string;
  backgroundColor: string;
  backgroundOpacity: number;
  position: 'bottom' | 'top';
}

interface SubtitleDisplayProps {
  text: string;
  style: SubtitleStyle;
}

const toHex2 = (n: number) => Math.round(n).toString(16).padStart(2, '0');

export const SubtitleDisplay: React.FC<SubtitleDisplayProps> = ({ text, style }) => {
  if (!text) return null;

  const bgColor = `${style.backgroundColor}${toHex2(style.backgroundOpacity * 255)}`;
  const positionClass = style.position === 'bottom' ? 'bottom-[88px]' : 'top-4';

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 max-w-[90%] px-3 py-1.5 rounded-lg text-center pointer-events-none z-20 leading-[1.4] break-words ${positionClass}`}
      style={{
        fontSize: style.fontSize,
        fontFamily: style.fontFamily,
        color: style.textColor,
        backgroundColor: bgColor,
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
      }}
    >
      {text.split('\n').map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
};

SubtitleDisplay.displayName = 'SubtitleDisplay';
