import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Button, Slider } from '@aura-ui/styled';
import type { VideoFilters as VideoFiltersType } from './useVideoFilters';

interface VideoFiltersProps {
  filters: VideoFiltersType;
  onFilterChange: (key: keyof VideoFiltersType, value: number) => void;
  onReset: () => void;
}

const FILTER_CONFIG: Array<{
  key: keyof VideoFiltersType;
  label: string;
  min: number;
  max: number;
  unit: string;
}> = [
  { key: 'brightness', label: 'Brightness', min: 0, max: 200, unit: '%' },
  { key: 'contrast',   label: 'Contrast',   min: 0, max: 200, unit: '%' },
  { key: 'saturation', label: 'Saturation', min: 0, max: 200, unit: '%' },
  { key: 'hue',        label: 'Hue',        min: 0, max: 360, unit: '°' },
  { key: 'blur',       label: 'Blur',       min: 0, max: 10,  unit: 'px' },
  { key: 'grayscale',  label: 'Grayscale',  min: 0, max: 100, unit: '%' },
];

export const VideoFilters: React.FC<VideoFiltersProps> = ({ filters, onFilterChange, onReset }) => (
  <div>
    <div className="flex items-center justify-between mb-3.5">
      <span className="text-xs font-semibold text-fg">Video Filters</span>
      <Button variant="ghost" size="sm" onClick={onReset} leftIcon={<RotateCcw />}>
        Reset
      </Button>
    </div>

    {FILTER_CONFIG.map(({ key, label, min, max, unit }) => (
      <div className="mb-3.5 last:mb-0" key={key}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-muted-foreground">{label}</span>
          <span className="text-[11px] text-fg font-medium">{filters[key]}{unit}</span>
        </div>
        <Slider
          value={[filters[key]]}
          onValueChange={([v]) => onFilterChange(key, v ?? filters[key])}
          min={min}
          max={max}
          step={1}
        />
      </div>
    ))}
  </div>
);

VideoFilters.displayName = 'VideoFilters';
