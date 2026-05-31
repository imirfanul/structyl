'use client';

import * as React from 'react';
import { createContext } from '@structyl/core';
import type {
  CartesianContextValue,
  ChartAreaProps,
  ChartBarProps,
  ChartBoxplotProps,
  ChartBubbleProps,
  ChartCandlestickProps,
  ChartChordProps,
  ChartDimensions,
  ChartFunnelProps,
  ChartGanttProps,
  ChartGaugeContainerProps,
  ChartGaugePointerProps,
  ChartGaugeProps,
  ChartGaugeReferenceArcProps,
  ChartGaugeValueArcProps,
  ChartGridProps,
  ChartHeatmapProps,
  ChartHistogramProps,
  ChartLegendProps,
  ChartLinearGaugeProps,
  ChartLineProps,
  ChartMargin,
  ChartPieCenterLabelProps,
  ChartPieProps,
  ChartPieRootProps,
  ChartPolarAngleAxisProps,
  ChartPolarGridProps,
  ChartRadarProps,
  ChartRadarRootProps,
  ChartRadialBarProps,
  ChartRadialBarRootProps,
  ChartRadialLineProps,
  ChartRadialLineRootProps,
  ChartRangeAreaProps,
  ChartRangeBarProps,
  ChartReferenceAreaProps,
  ChartReferenceLineProps,
  ChartRootProps,
  ChartSankeyProps,
  ChartScatterProps,
  ChartSparkLineProps,
  ChartSunburstProps,
  ChartTooltipProps,
  ChartTreemapProps,
  ChartWaterfallProps,
  ChartXAxisProps,
  ChartYAxisProps,
  ChartPyramidProps,
  GaugeContextValue,
  HighlightScope,
  MarkShape,
  PieContextValue,
  RadarContextValue,
  SankeyNode,
  ScatterMarkerShape,
  SunburstNode,
  TooltipState,
} from './chart.types';
import type { TreemapLayoutNode } from './layout';
import {
  bandScale,
  computeYDomain,
  linearScale,
  niceLinearTicks,
} from './scales';
import { buildArcPath, buildAreaPathFlat, buildAreaPath, buildLinePath, buildRadarPath, fmt } from './paths';
import {
  computeCandlestickBars,
  computeFunnelLayout,
  computeGaugeArcs,
  computeHeatmapCells,
  squarifyTreemap,
} from './layout';

/* ─── Color palette ─────────────────────────────────────────────────── */

const DEFAULT_PALETTE = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--chart-6, 200 70% 50%))',
  'hsl(var(--chart-7, 60 80% 50%))',
  'hsl(var(--chart-8, 300 65% 55%))',
];

// A11y pattern fills for colorblind mode
const A11Y_PATTERNS = [
  'url(#chart-pattern-0)',
  'url(#chart-pattern-1)',
  'url(#chart-pattern-2)',
  'url(#chart-pattern-3)',
  'url(#chart-pattern-4)',
];

const DEFAULT_MARGIN: ChartMargin = { top: 10, right: 10, bottom: 30, left: 40 };

/* ─── Cartesian context ─────────────────────────────────────────────── */

const [CartesianProvider, useCartesianContext] =
  createContext<CartesianContextValue>('Chart');

/* ─── Pie context ───────────────────────────────────────────────────── */

const [PieProvider, usePieContext] = createContext<PieContextValue>('ChartPie');

/* ─── Radar context ─────────────────────────────────────────────────── */

const [RadarProvider, useRadarContext] = createContext<RadarContextValue>('ChartRadar');

/* ─── Gauge composition context ─────────────────────────────────────── */

const [GaugeProvider, useGaugeContext] = createContext<GaugeContextValue>('ChartGaugeContainer');

/* ─── Shared tooltip + legend context (works across all root types) ──── */

export interface LegendEntryData {
  name: string;
  color: string;
  dataKey: string;
}

interface SharedTooltipCtxValue {
  tooltip: TooltipState;
  setTooltip: (state: TooltipState) => void;
  legendEntries: LegendEntryData[];
}

const [SharedTooltipProvider, useSharedTooltip] =
  createContext<SharedTooltipCtxValue>('Chart');

/* ─── Helper: collect legend entries from cartesian series children ───── */

function collectPieLegendEntries(
  rows: Record<string, unknown>[],
  children: React.ReactNode,
): LegendEntryData[] {
  const entries: LegendEntryData[] = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    const dn = (child.type as { displayName?: string })?.displayName ?? '';
    if (dn === 'Chart.Pie') {
      const p = child.props as ChartPieProps;
      const pieColors = p.colors ?? DEFAULT_PALETTE;
      rows.forEach((d, i) => {
        const nameKey = p.nameKey ?? 'name';
        const name = String(d[nameKey] ?? i);
        entries.push({
          name,
          color: pieColors[i % pieColors.length] ?? 'hsl(var(--chart-1))',
          dataKey: p.dataKey,
        });
      });
    }
  });
  return entries;
}

function collectRadarLegendEntries(children: React.ReactNode): LegendEntryData[] {
  const entries: LegendEntryData[] = [];
  let idx = 0;
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    const dn = (child.type as { displayName?: string })?.displayName ?? '';
    if (dn === 'Chart.Radar') {
      const p = child.props as { name?: string; dataKey?: string; color?: string };
      const label = p.name ?? p.dataKey ?? '';
      if (label) {
        entries.push({
          name: label,
          color: p.color ?? DEFAULT_PALETTE[idx % DEFAULT_PALETTE.length] ?? 'hsl(var(--chart-1))',
          dataKey: p.dataKey ?? '',
        });
      }
      idx++;
    }
  });
  return entries;
}

/* ─── Tooltip state ─────────────────────────────────────────────────── */

const TOOLTIP_HIDDEN: TooltipState = { visible: false, x: 0, y: 0, payload: [], label: '' };

/* ─── Helper: split children into SVG vs HTML overlay ───────────────── */

const OVERLAY_DISPLAY_NAMES = new Set(['Chart.Tooltip', 'Chart.Legend']);

function splitChildren(children: React.ReactNode): {
  svgChildren: React.ReactNode[];
  overlayChildren: React.ReactNode[];
} {
  const svgChildren: React.ReactNode[] = [];
  const overlayChildren: React.ReactNode[] = [];
  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement(child) &&
      OVERLAY_DISPLAY_NAMES.has(
        (child.type as { displayName?: string })?.displayName ?? '',
      )
    ) {
      overlayChildren.push(child);
    } else {
      svgChildren.push(child);
    }
  });
  return { svgChildren, overlayChildren };
}

const CARTESIAN_SERIES_NAMES = new Set([
  'Chart.Bar', 'Chart.Line', 'Chart.Area', 'Chart.Scatter',
  'Chart.Bubble', 'Chart.RangeBar', 'Chart.RangeArea',
]);

/* ─── Root ──────────────────────────────────────────────────────────── */

/**
 * Root container for cartesian charts (Bar, Line, Area, Scatter, Bubble).
 * Sets up scales, context, and the SVG viewport.
 */
const Root = React.forwardRef<HTMLDivElement, ChartRootProps>(
  (
    {
      data,
      width: widthProp,
      height: heightProp = 300,
      margin: marginProp,
      className,
      accessibilityLabel = 'Chart',
      accessibilityMode = false,
      children,
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const composedRef = useMergedRef(ref, containerRef);

    const [containerWidth, setContainerWidth] = React.useState(widthProp ?? 600);

    // ResizeObserver for responsive mode
    React.useEffect(() => {
      if (widthProp !== undefined) return;
      const el = containerRef.current;
      if (!el) return;

      const ro = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          setContainerWidth(entry.contentRect.width);
        }
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, [widthProp]);

    const width = widthProp ?? containerWidth;
    const height = heightProp;

    const margin: ChartMargin = { ...DEFAULT_MARGIN, ...marginProp };
    const innerWidth = Math.max(0, width - margin.left - margin.right);
    const innerHeight = Math.max(0, height - margin.top - margin.bottom);

    const dimensions: ChartDimensions = {
      width,
      height,
      margin,
      innerWidth,
      innerHeight,
    };

    // Single children scan: extracts all derived values in one pass.
    const {
      seriesInfo,
      allSeriesKeys,
      xDataKey,
      yDomainProp,
      legendEntries: legendEntriesFromScan,
      legendPosition,
    } = React.useMemo(() => {
      const info: { dataKey: string; stackId?: string; type: string }[] = [];
      const keys: string[] = [];
      const entries: LegendEntryData[] = [];
      let xdk = '';
      let yDomProp: [number | 'auto', number | 'auto'] | undefined;
      let legPos: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
      let seriesIdx = 0;

      React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;
        const p = child.props as Record<string, unknown>;
        const dn = (child.type as { displayName?: string })?.displayName ?? '';

        if (dn === 'Chart.XAxis') {
          xdk = typeof p['dataKey'] === 'string' ? p['dataKey'] : '';
        } else if (dn === 'Chart.YAxis') {
          yDomProp = p['domain'] as [number | 'auto', number | 'auto'] | undefined;
        } else if (dn === 'Chart.Legend') {
          legPos = (p['position'] as 'top' | 'bottom' | 'left' | 'right') ?? 'bottom';
        }

        // Palette index key for all series types
        if (CARTESIAN_SERIES_NAMES.has(dn) || dn === 'Chart.RangeBar' || dn === 'Chart.RangeArea') {
          const key = typeof p['dataKey'] === 'string' ? p['dataKey']
            : typeof p['name'] === 'string' ? p['name']
            : typeof p['xKey'] === 'string' ? String(p['xKey'])
            : typeof p['lowKey'] === 'string' ? String(p['lowKey'])
            : `series-${keys.length}`;
          keys.push(key);

          // Legend entry for cartesian series
          const label = (typeof p['name'] === 'string' ? p['name'] : null)
            ?? (typeof p['dataKey'] === 'string' ? p['dataKey'] : null)
            ?? '';
          if (label) {
            entries.push({
              name: label,
              color: (typeof p['color'] === 'string' ? p['color'] : null)
                ?? DEFAULT_PALETTE[seriesIdx % DEFAULT_PALETTE.length]
                ?? 'hsl(var(--chart-1))',
              dataKey: typeof p['dataKey'] === 'string' ? p['dataKey'] : key,
            });
            seriesIdx++;
          }
        }

        // dataKey-only for yDomain computation
        if (typeof p['dataKey'] === 'string') {
          info.push({
            dataKey: p['dataKey'] as string,
            stackId: p['stackId'] as string | undefined,
            type: dn,
          });
        }
      });

      return {
        seriesInfo: info,
        allSeriesKeys: keys,
        xDataKey: xdk,
        yDomainProp: yDomProp,
        legendEntries: entries,
        legendPosition: legPos as 'top' | 'bottom' | 'left' | 'right',
      };
    }, [children]);

    const rows = data as Record<string, unknown>[];
    const xValues = xDataKey
      ? rows.map((d) => d[xDataKey])
      : rows.map((_, i) => String(i));

    const isBand = xValues.length > 0 && typeof xValues[0] === 'string';

    const { xScale, xDomain, bandWidth } = React.useMemo(() => {
      if (isBand) {
        const domain = xValues.map(String);
        const bs = bandScale(domain, [0, innerWidth]);
        return {
          xScale: (value: unknown) => bs.scale(String(value)) + bs.bandwidth / 2,
          xDomain: domain as unknown[],
          bandWidth: bs.bandwidth,
        };
      } else {
        const numericX = xValues.map(Number).filter(isFinite);
        const minX = numericX.length ? Math.min(...numericX) : 0;
        const maxX = numericX.length ? Math.max(...numericX) : 1;
        const ls = linearScale([minX, maxX], [0, innerWidth]);
        return {
          xScale: (value: unknown) => ls(Number(value)),
          xDomain: [minX, maxX] as unknown[],
          bandWidth: 0,
        };
      }
    }, [isBand, xValues, innerWidth]);

    const yDomain = React.useMemo((): [number, number] => {
      if (yDomainProp) {
        const [d0, d1] = yDomainProp;
        const dataKeys = seriesInfo.map((s) => s.dataKey);
        const stackIds = seriesInfo.map((s) => s.stackId);
        const auto = computeYDomain(rows, dataKeys, stackIds);
        return [d0 === 'auto' ? auto[0] : d0, d1 === 'auto' ? auto[1] : d1];
      }
      const dataKeys = seriesInfo.map((s) => s.dataKey);
      const stackIds = seriesInfo.map((s) => s.stackId);
      return computeYDomain(rows, dataKeys, stackIds);
    }, [rows, seriesInfo, yDomainProp]);

    const yScale = React.useMemo(
      () => linearScale(yDomain, [innerHeight, 0]),
      [yDomain, innerHeight],
    );

    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const [tooltip, setTooltip] = React.useState<TooltipState>(TOOLTIP_HIDDEN);

    // Stable series index: look up key position in allSeriesKeys.
    // Pure and idempotent — safe to call on every render, no mutable counter needed.
    const registerSeries = React.useCallback((key: string): number => {
      const idx = allSeriesKeys.indexOf(key);
      return idx >= 0 ? idx : 0;
    }, [allSeriesKeys]);

    const contextValue: CartesianContextValue = {
      data: data as Record<string, unknown>[],
      dimensions,
      xScale,
      yScale,
      yDomain,
      xDomain,
      xDataKey,
      isBand,
      bandWidth,
      palette: DEFAULT_PALETTE,
      activeIndex,
      setActiveIndex,
      tooltip,
      setTooltip,
      seriesCount: allSeriesKeys.length,
      registerSeries,
      accessibilityMode,
    };

    const { svgChildren, overlayChildren } = splitChildren(children);
    const isRow = legendPosition === 'left' || legendPosition === 'right';

    return (
      <SharedTooltipProvider tooltip={tooltip} setTooltip={setTooltip} legendEntries={legendEntriesFromScan}>
        <CartesianProvider {...contextValue}>
          <div
            ref={composedRef}
            className={className}
            style={{
              position: 'relative',
              width: widthProp ? width : '100%',
              display: 'flex',
              flexDirection: isRow ? 'row' : 'column',
              alignItems: isRow ? 'center' : 'stretch',
            }}
          >
            {accessibilityMode && <A11yPatternDefs />}
            <svg
              role="img"
              aria-label={accessibilityLabel}
              width={width}
              height={height}
              style={{ overflow: 'visible', display: 'block', flexShrink: 0 }}
            >
              <title>{accessibilityLabel}</title>
              <g transform={`translate(${margin.left},${margin.top})`}>{svgChildren}</g>
            </svg>
            {overlayChildren}
          </div>
        </CartesianProvider>
      </SharedTooltipProvider>
    );
  },
);
Root.displayName = 'Chart.Root';

/* ─── A11y pattern defs ─────────────────────────────────────────────── */

function A11yPatternDefs() {
  return (
    <svg width={0} height={0} style={{ position: 'absolute' }}>
      <defs>
        <pattern id="chart-pattern-0" width="4" height="4" patternUnits="userSpaceOnUse">
          <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <pattern id="chart-pattern-1" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="none" />
          <circle cx="2" cy="2" r="1" fill="currentColor" />
        </pattern>
        <pattern id="chart-pattern-2" width="4" height="4" patternUnits="userSpaceOnUse">
          <path d="M0,2 H4 M2,0 V4" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <pattern id="chart-pattern-3" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M0,8 L8,0" stroke="currentColor" strokeWidth="1.5" />
        </pattern>
        <pattern id="chart-pattern-4" width="4" height="8" patternUnits="userSpaceOnUse">
          <rect width="2" height="8" fill="currentColor" />
        </pattern>
      </defs>
    </svg>
  );
}

/* ─── Grid ──────────────────────────────────────────────────────────── */

const Grid = React.forwardRef<SVGGElement, ChartGridProps>(
  (
    {
      horizontal = true,
      vertical = false,
      strokeDasharray = '3 3',
      className,
    },
    ref,
  ) => {
    const ctx = useCartesianContext('Chart.Grid');
    const { dimensions, yDomain, xDomain, isBand, xScale } = ctx;
    const { innerWidth, innerHeight } = dimensions;

    const yTicks = niceLinearTicks(yDomain[0], yDomain[1], 5);

    return (
      <g ref={ref} aria-hidden="true" className={className}>
        {horizontal &&
          yTicks.map((tick) => {
            const y = linearScale(yDomain, [innerHeight, 0])(tick);
            return (
              <line
                key={tick}
                x1={0}
                y1={y}
                x2={innerWidth}
                y2={y}
                stroke="currentColor"
                strokeOpacity={0.1}
                strokeDasharray={strokeDasharray}
              />
            );
          })}
        {vertical &&
          (isBand ? (xDomain as string[]) : []).map((d) => {
            const x = xScale(d);
            return (
              <line
                key={String(d)}
                x1={x}
                y1={0}
                x2={x}
                y2={innerHeight}
                stroke="currentColor"
                strokeOpacity={0.1}
                strokeDasharray={strokeDasharray}
              />
            );
          })}
      </g>
    );
  },
);
Grid.displayName = 'Chart.Grid';

/* ─── XAxis ─────────────────────────────────────────────────────────── */

const XAxis = React.forwardRef<SVGGElement, ChartXAxisProps>(
  (
    {
      dataKey: _dataKey,
      label,
      tickCount = 5,
      tickFormatter,
      hideLine = false,
      hideTicks = false,
      className,
    },
    ref,
  ) => {
    const ctx = useCartesianContext('Chart.XAxis');
    const { dimensions, xDomain, isBand, xScale } = ctx;
    const { innerWidth, innerHeight } = dimensions;

    const ticks: unknown[] = isBand ? (xDomain as string[]) : (xDomain as [number, number]);

    const displayTicks = isBand
      ? (ticks as string[])
      : niceLinearTicks(
          (ticks as [number, number])[0],
          (ticks as [number, number])[1],
          tickCount,
        );

    const formatTick = (v: unknown): string => {
      if (tickFormatter) return tickFormatter(v);
      return String(v);
    };

    return (
      <g ref={ref} transform={`translate(0, ${innerHeight})`} className={className}>
        {!hideLine && (
          <line x1={0} y1={0} x2={innerWidth} y2={0} stroke="currentColor" strokeOpacity={0.3} />
        )}
        {!hideTicks &&
          displayTicks.map((tick, i) => {
            const x = xScale(tick);
            return (
              <g key={i} transform={`translate(${x}, 0)`}>
                <line y1={0} y2={4} stroke="currentColor" strokeOpacity={0.5} />
                <text
                  y={16}
                  textAnchor="middle"
                  fontSize={11}
                  fill="currentColor"
                  fillOpacity={0.65}
                >
                  {formatTick(tick)}
                </text>
              </g>
            );
          })}
        {label && (
          <text
            x={innerWidth / 2}
            y={28}
            textAnchor="middle"
            fontSize={12}
            fill="currentColor"
            fillOpacity={0.8}
          >
            {label}
          </text>
        )}
      </g>
    );
  },
);
XAxis.displayName = 'Chart.XAxis';

/* ─── YAxis ─────────────────────────────────────────────────────────── */

const YAxis = React.forwardRef<SVGGElement, ChartYAxisProps>(
  (
    {
      label,
      tickCount = 5,
      tickFormatter,
      hideLine = false,
      hideTicks = false,
      className,
    },
    ref,
  ) => {
    const ctx = useCartesianContext('Chart.YAxis');
    const { yDomain, dimensions } = ctx;
    const { innerHeight } = dimensions;

    const ticks = niceLinearTicks(yDomain[0], yDomain[1], tickCount);

    const formatTick = (v: number): string => {
      if (tickFormatter) return tickFormatter(v);
      // Auto-abbreviate large numbers
      if (Math.abs(v) >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
      if (Math.abs(v) >= 1_000) return `${(v / 1_000).toFixed(1)}k`;
      return String(v);
    };

    const yScale = linearScale(yDomain, [innerHeight, 0]);

    return (
      <g ref={ref} className={className}>
        {!hideLine && (
          <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="currentColor" strokeOpacity={0.3} />
        )}
        {!hideTicks &&
          ticks.map((tick) => {
            const y = yScale(tick);
            return (
              <g key={tick} transform={`translate(0, ${y})`}>
                <line x1={-4} y1={0} x2={0} y2={0} stroke="currentColor" strokeOpacity={0.5} />
                <text
                  x={-8}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize={11}
                  fill="currentColor"
                  fillOpacity={0.65}
                >
                  {formatTick(tick)}
                </text>
              </g>
            );
          })}
        {label && (
          <text
            transform={`translate(-32, ${innerHeight / 2}) rotate(-90)`}
            textAnchor="middle"
            fontSize={12}
            fill="currentColor"
            fillOpacity={0.8}
          >
            {label}
          </text>
        )}
      </g>
    );
  },
);
YAxis.displayName = 'Chart.YAxis';

/* ─── Mark shape renderer ────────────────────────────────────────────── */

function renderMarkShape(
  shape: MarkShape | ScatterMarkerShape,
  cx: number,
  cy: number,
  r: number,
  color: string,
  strokeColor: string,
  key: number,
  extraProps?: React.SVGProps<SVGElement>,
): React.ReactNode {
  const common = {
    fill: color,
    stroke: strokeColor,
    strokeWidth: 1.5,
    ...extraProps,
  };

  switch (shape) {
    case 'square':
      return (
        <rect
          key={key}
          x={cx - r}
          y={cy - r}
          width={r * 2}
          height={r * 2}
          {...(common as React.SVGProps<SVGRectElement>)}
        />
      );
    case 'diamond':
      return (
        <polygon
          key={key}
          points={`${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`}
          {...(common as React.SVGProps<SVGPolygonElement>)}
        />
      );
    case 'cross':
      return (
        <g key={key} role="img" {...(extraProps as React.SVGProps<SVGGElement>)}>
          <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke={color} strokeWidth={2} />
          <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke={color} strokeWidth={2} />
        </g>
      );
    case 'star':
      // Simplified as diamond for geometric clarity
      return (
        <polygon
          key={key}
          points={`${cx},${cy - r} ${cx + r * 0.4},${cy - r * 0.4} ${cx + r},${cy} ${cx + r * 0.4},${cy + r * 0.4} ${cx},${cy + r} ${cx - r * 0.4},${cy + r * 0.4} ${cx - r},${cy} ${cx - r * 0.4},${cy - r * 0.4}`}
          {...(common as React.SVGProps<SVGPolygonElement>)}
        />
      );
    case 'triangle':
      return (
        <polygon
          key={key}
          points={`${cx},${cy - r} ${cx + r},${cy + r} ${cx - r},${cy + r}`}
          {...(common as React.SVGProps<SVGPolygonElement>)}
        />
      );
    case 'circle':
    default:
      return (
        <circle
          key={key}
          cx={cx}
          cy={cy}
          r={r}
          {...(common as React.SVGProps<SVGCircleElement>)}
        />
      );
  }
}

/* ─── Highlight opacity helper ───────────────────────────────────────── */

function resolveOpacity(
  seriesIndex: number,
  itemIndex: number,
  activeSeriesIndex: number | null,
  activeItemIndex: number | null,
  highlightScope?: HighlightScope,
): number {
  if (!highlightScope || activeItemIndex === null) return 1;
  const { highlight = 'none', fade = 'none' } = highlightScope;

  const isActiveSeries = seriesIndex === activeSeriesIndex;
  const isActiveItem = activeItemIndex === itemIndex;

  if (highlight === 'item') {
    if (isActiveItem) return 1;
    if (fade === 'global') return 0.4;
    if (fade === 'series' && isActiveSeries) return 0.4;
    return 0.4;
  }

  if (highlight === 'series') {
    if (isActiveSeries) return 1;
    if (fade === 'global' || fade === 'series') return 0.4;
    return 0.4;
  }

  return 1;
}

/* ─── Bar ───────────────────────────────────────────────────────────── */

const Bar = React.forwardRef<SVGGElement, ChartBarProps>(
  (
    {
      dataKey,
      color,
      name,
      stackId: _stackId,
      orientation = 'vertical',
      radius = 4,
      showLabel = false,
      labelPosition = 'outside',
      labelFormatter,
      highlightScope,
      onClick,
      className,
    },
    ref,
  ) => {
    const ctx = useCartesianContext('Chart.Bar');
    const {
      data,
      dimensions,
      xScale,
      yScale,
      yDomain,
      xDataKey,
      isBand,
      bandWidth,
      palette,
      activeIndex,
      setActiveIndex,
      setTooltip,
      accessibilityMode,
    } = ctx;
    const { innerHeight, innerWidth } = dimensions;

    const seriesIndex = ctx.registerSeries(dataKey);
    const resolvedColor = color ?? palette[seriesIndex % palette.length] ?? palette[0] ?? 'hsl(var(--chart-1))';
    const fill = accessibilityMode
      ? A11Y_PATTERNS[seriesIndex % A11Y_PATTERNS.length]
      : resolvedColor;

    // ── Horizontal orientation ──────────────────────────────────────────
    if (orientation === 'horizontal') {
      const xValueScale = linearScale(yDomain, [0, innerWidth]);
      const x0 = xValueScale(0);

      return (
        <g ref={ref} className={className} aria-label={name ?? dataKey}>
          {data.map((row, i) => {
            const value = row[dataKey];
            if (typeof value !== 'number') return null;

            const xVal = isBand ? row[xDataKey] : i;
            // Map band horizontal position proportionally to vertical space
            const xBandCenter = xScale(xVal);
            const yCenter = innerWidth > 0 ? (xBandCenter / innerWidth) * innerHeight : i * 40;
            const barH = isBand
              ? Math.max(1, (bandWidth / innerWidth) * innerHeight)
              : Math.max(2, 20);
            const barX = Math.min(x0, xValueScale(value));
            const barW = Math.max(1, Math.abs(xValueScale(value) - x0));
            const barY = yCenter - barH / 2;
            const r = Math.min(radius, barH / 2, barW / 2);

            const isActive = activeIndex === i;
            const baseOpacity = isActive || activeIndex === null ? 1 : 0.6;
            const hlOpacity = resolveOpacity(seriesIndex, i, null, activeIndex, highlightScope);
            const finalOpacity = highlightScope ? hlOpacity : baseOpacity;

            const labelText = showLabel
              ? labelFormatter ? labelFormatter(value) : String(value)
              : null;
            const labelX =
              labelPosition === 'center' || labelPosition === 'inside'
                ? barX + barW / 2
                : barX + barW + 5;

            return (
              <g key={i}>
                <rect
                  x={barX}
                  y={barY}
                  width={barW}
                  height={Math.max(1, barH)}
                  rx={r}
                  ry={r}
                  fill={fill}
                  fillOpacity={finalOpacity}
                  style={{ transition: 'fill-opacity 150ms ease' }}
                  onMouseEnter={(e) => {
                    setActiveIndex(i);
                    const svgEl = (e.currentTarget as SVGRectElement).closest('svg');
                    const svgRect = svgEl?.getBoundingClientRect();
                    const elRect = (e.currentTarget as SVGRectElement).getBoundingClientRect();
                    if (svgRect) {
                      setTooltip({
                        visible: true,
                        x: elRect.right - svgRect.left,
                        y: elRect.top - svgRect.top + elRect.height / 2,
                        payload: [{ name: name ?? dataKey, value, color: resolvedColor, dataKey }],
                        label: String(isBand ? row[xDataKey] : i),
                      });
                    }
                  }}
                  onMouseLeave={() => { setActiveIndex(null); setTooltip(TOOLTIP_HIDDEN); }}
                  onClick={() => onClick?.(row, i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(row, i); } }}
                  role={onClick ? 'button' : undefined}
                  tabIndex={onClick ? 0 : undefined}
                  aria-label={`${name ?? dataKey}: ${value}`}
                />
                {showLabel && labelText !== null && (
                  <text
                    x={labelX}
                    y={yCenter}
                    textAnchor={labelPosition === 'center' || labelPosition === 'inside' ? 'middle' : 'start'}
                    dominantBaseline="middle"
                    fontSize={11}
                    fill="currentColor"
                    fillOpacity={0.9}
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {labelText}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      );
    }

    // ── Vertical orientation (default) ──────────────────────────────────
    const y0 = yScale(0);

    return (
      <g ref={ref} className={className} aria-label={name ?? dataKey}>
        {data.map((row, i) => {
          const value = row[dataKey];
          if (typeof value !== 'number') return null;

          const xVal = isBand ? row[xDataKey] : i;
          const xCenter = xScale(xVal);
          const barW = isBand ? Math.max(1, bandWidth) : Math.max(2, bandWidth || 20);
          const yTop = yScale(value);
          const barH = Math.abs(y0 - yTop);
          const barY = value >= 0 ? yTop : y0;

          const isActive = activeIndex === i;
          const r = Math.min(radius, barH / 2, barW / 2);

          const baseOpacity = isActive || activeIndex === null ? 1 : 0.6;
          const hlOpacity = resolveOpacity(seriesIndex, i, null, activeIndex, highlightScope);
          const finalOpacity = highlightScope ? hlOpacity : baseOpacity;

          const labelText = showLabel
            ? labelFormatter
              ? labelFormatter(value)
              : String(value)
            : null;

          // Label y position
          const labelY =
            labelPosition === 'outside'
              ? barY - 5
              : labelPosition === 'center' || labelPosition === 'inside'
                ? barY + barH / 2
                : barY - 5;

          return (
            <g key={i}>
              <rect
                x={xCenter - barW / 2}
                y={barY}
                width={barW}
                height={Math.max(1, barH)}
                rx={r}
                ry={r}
                fill={fill}
                fillOpacity={finalOpacity}
                style={{ transition: 'fill-opacity 150ms ease, y 300ms ease, height 300ms ease' }}
                onMouseEnter={(e) => {
                  setActiveIndex(i);
                  const rect = (e.currentTarget as SVGRectElement)
                    .closest('svg')
                    ?.getBoundingClientRect();
                  const svgRect = (e.currentTarget as SVGRectElement).getBoundingClientRect();
                  if (rect) {
                    setTooltip({
                      visible: true,
                      x: svgRect.left - rect.left + svgRect.width / 2,
                      y: svgRect.top - rect.top,
                      payload: [{ name: name ?? dataKey, value, color: resolvedColor, dataKey }],
                      label: String(isBand ? row[xDataKey] : i),
                    });
                  }
                }}
                onMouseLeave={() => {
                  setActiveIndex(null);
                  setTooltip(TOOLTIP_HIDDEN);
                }}
                onClick={() => onClick?.(row, i)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(row, i); } }}
                role={onClick ? 'button' : undefined}
                tabIndex={onClick ? 0 : undefined}
                aria-label={`${name ?? dataKey}: ${value}`}
              />
              {showLabel && labelText !== null && (
                <text
                  x={xCenter}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline={
                    labelPosition === 'center' || labelPosition === 'inside'
                      ? 'middle'
                      : 'auto'
                  }
                  fontSize={11}
                  fill="currentColor"
                  fillOpacity={0.9}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {labelText}
                </text>
              )}
            </g>
          );
        })}
      </g>
    );
  },
);
Bar.displayName = 'Chart.Bar';

/* ─── Line ──────────────────────────────────────────────────────────── */

const Line = React.forwardRef<SVGGElement, ChartLineProps>(
  (
    {
      dataKey,
      color,
      name,
      curve = 'catmullRom',
      dot: dotProp = true,
      showDot,
      dotRadius = 4,
      markShape = 'circle',
      connectNulls = false,
      strokeWidth = 2,
      strokeDasharray,
      highlightScope,
      onClick,
      className,
    },
    ref,
  ) => {
    const ctx = useCartesianContext('Chart.Line');
    const {
      data,
      xScale,
      yScale,
      xDataKey,
      isBand,
      palette,
      activeIndex,
      setActiveIndex,
      setTooltip,
    } = ctx;

    const seriesIndex = ctx.registerSeries(dataKey);
    const resolvedColor = color ?? palette[seriesIndex % palette.length] ?? palette[0] ?? 'hsl(var(--chart-1))';
    // Accept either `dot` or `showDot` — both toggle dot rendering
    const dot = showDot !== undefined ? showDot : dotProp;

    // Build points — may include nulls if connectNulls=false
    const rawPoints = data.map((row, i) => {
      const value = row[dataKey];
      if (typeof value !== 'number') return null;
      const x = xScale(isBand ? row[xDataKey] : i);
      return { x, y: yScale(value), dataIndex: i, value } as { x: number; y: number; dataIndex: number; value: number };
    });

    // For path building: if connectNulls, filter out nulls; otherwise segment at nulls
    const pathD = connectNulls
      ? buildLinePath(
          rawPoints.filter((p): p is NonNullable<typeof p> => p !== null).map((p) => [p.x, p.y]),
          curve,
        )
      : rawPoints.reduce((acc, point, idx) => {
          if (point === null) {
            return acc; // gap — the path will have a visible break if we start a new M
          }
          const prev = rawPoints[idx - 1];
          if (prev === null || idx === 0) {
            return acc + ` M ${point.x.toFixed(3)} ${point.y.toFixed(3)}`;
          }
          return acc + ` L ${point.x.toFixed(3)} ${point.y.toFixed(3)}`;
        }, '');

    const validPoints = rawPoints.filter((p): p is NonNullable<typeof p> => p !== null);

    // Nothing to render if all values are null
    if (validPoints.length === 0) return null;

    // highlightScope: fade the whole series line when another item is active
    const lineOpacity = highlightScope && activeIndex !== null
      ? resolveOpacity(seriesIndex, seriesIndex, seriesIndex, activeIndex, highlightScope)
      : 1;

    return (
      <g ref={ref} className={className} aria-label={name ?? dataKey}>
        <path
          d={pathD}
          fill="none"
          stroke={resolvedColor}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeOpacity={lineOpacity}
          style={{ transition: 'd 300ms ease, stroke-opacity 150ms ease' }}
        />
        {dot &&
          validPoints.map((pt, idx) => {
            const { x: px, y: py, dataIndex: i, value } = pt;
            const isActive = activeIndex === i;
            const r = isActive ? dotRadius + 2 : dotRadius;
            const dotOpacity = highlightScope && activeIndex !== null
              ? resolveOpacity(seriesIndex, i, seriesIndex, activeIndex, highlightScope)
              : 1;

            const shapeEl = renderMarkShape(
              markShape,
              px,
              py,
              r,
              resolvedColor,
              'white',
              idx,
              {
                style: { transition: 'r 150ms ease', opacity: dotOpacity },
                onMouseEnter: (e: React.MouseEvent<SVGElement>) => {
                  setActiveIndex(i);
                  const svgEl = (e.currentTarget as SVGElement).closest('svg');
                  const svgRect = svgEl?.getBoundingClientRect();
                  const elRect = (e.currentTarget as SVGElement).getBoundingClientRect();
                  if (svgRect) {
                    setTooltip({
                      visible: true,
                      x: elRect.left - svgRect.left + elRect.width / 2,
                      y: elRect.top - svgRect.top,
                      payload: [
                        {
                          name: name ?? dataKey,
                          value,
                          color: resolvedColor,
                          dataKey,
                        },
                      ],
                      label: String(isBand ? data[i]?.[xDataKey] : i),
                    });
                  }
                },
                onMouseLeave: () => {
                  setActiveIndex(null);
                  setTooltip(TOOLTIP_HIDDEN);
                },
                onClick: () => data[i] && onClick?.(data[i], i),
                onKeyDown: (e: React.KeyboardEvent<SVGElement>) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (data[i]) onClick?.(data[i], i); } },
                role: onClick ? 'button' : undefined,
                tabIndex: onClick ? 0 : undefined,
                'aria-label': `${name ?? dataKey}: ${value}`,
              } as React.SVGProps<SVGElement>,
            );

            return shapeEl;
          })}
      </g>
    );
  },
);
Line.displayName = 'Chart.Line';

/* ─── Area ──────────────────────────────────────────────────────────── */

const Area = React.forwardRef<SVGGElement, ChartAreaProps>(
  (
    {
      dataKey,
      color,
      name,
      curve = 'catmullRom',
      fillOpacity = 0.3,
      stackId: _stackId,
      strokeWidth = 2,
      baseline,
      connectNulls: _connectNulls = false,
      highlightScope,
      fillByValue = false,
      className,
    },
    ref,
  ) => {
    const ctx = useCartesianContext('Chart.Area');
    const {
      data,
      xScale,
      yScale,
      xDataKey,
      isBand,
      palette,
      dimensions,
      activeIndex,
    } = ctx;

    const seriesIndex = ctx.registerSeries(dataKey);
    const resolvedColor = color ?? palette[seriesIndex % palette.length] ?? palette[0] ?? 'hsl(var(--chart-1))';
    const { innerHeight } = dimensions;

    const rawPoints = data.map((row, i) => {
      const value = row[dataKey];
      if (typeof value !== 'number') return null;
      const x = xScale(isBand ? row[xDataKey] : i);
      return [x, yScale(value)] as [number, number];
    });

    const points: [number, number][] = rawPoints.filter((p): p is [number, number] => p !== null);

    if (points.length === 0) return null;

    const pathD = buildLinePath(points, curve);

    // Resolve baseline y pixel value
    const baselineY =
      baseline !== undefined && baseline !== 'auto' && typeof baseline === 'number'
        ? yScale(baseline)
        : innerHeight;

    const areaD = buildAreaPathFlat(points, baselineY, curve);

    // Unique gradient ID per series
    const gradientId = `area-gradient-${seriesIndex}`;
    const zeroY = yScale(0);

    const aboveColor = resolvedColor;
    const belowColor = palette[2] ?? 'hsl(var(--chart-3))';

    const areaOpacity = highlightScope && activeIndex !== null
      ? resolveOpacity(seriesIndex, seriesIndex, seriesIndex, activeIndex, highlightScope)
      : 1;

    return (
      <g ref={ref} className={className} aria-label={name ?? dataKey} style={{ opacity: areaOpacity, transition: 'opacity 150ms ease' }}>
        {fillByValue && (
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset={`${(zeroY / innerHeight) * 100}%`} stopColor={aboveColor} stopOpacity={fillOpacity} />
              <stop offset={`${(zeroY / innerHeight) * 100}%`} stopColor={belowColor} stopOpacity={fillOpacity} />
            </linearGradient>
          </defs>
        )}
        <path
          d={areaD}
          fill={fillByValue ? `url(#${gradientId})` : resolvedColor}
          fillOpacity={fillByValue ? 1 : fillOpacity}
          style={{ transition: 'd 300ms ease' }}
        />
        <path
          d={pathD}
          fill="none"
          stroke={resolvedColor}
          strokeWidth={strokeWidth}
          style={{ transition: 'd 300ms ease' }}
        />
      </g>
    );
  },
);
Area.displayName = 'Chart.Area';

/* ─── Scatter ───────────────────────────────────────────────────────── */

const Scatter = React.forwardRef<SVGGElement, ChartScatterProps>(
  (
    {
      xKey,
      yKey,
      name,
      color,
      radius = 5,
      markerShape = 'circle',
      highlightScope,
      onClick,
      className,
    },
    ref,
  ) => {
    const ctx = useCartesianContext('Chart.Scatter');
    const {
      data,
      xScale,
      yScale,
      palette,
      activeIndex,
      setActiveIndex,
      setTooltip,
    } = ctx;

    const seriesIndex = ctx.registerSeries(name ?? xKey);
    const resolvedColor = color ?? palette[seriesIndex % palette.length] ?? palette[0] ?? 'hsl(var(--chart-1))';

    return (
      <g ref={ref} className={className} aria-label={name ?? `${xKey} vs ${yKey}`}>
        {data.map((row, i) => {
          const xVal = row[xKey];
          const yVal = row[yKey];
          if (typeof xVal !== 'number' || typeof yVal !== 'number') return null;

          const cx = xScale(xVal);
          const cy = yScale(yVal);
          const isActive = activeIndex === i;
          const r = isActive ? radius + 2 : radius;
          const ptOpacity = highlightScope && activeIndex !== null
            ? resolveOpacity(seriesIndex, i, seriesIndex, activeIndex, highlightScope) * 0.8
            : (isActive || activeIndex === null ? 0.9 : 0.6);

          return renderMarkShape(
            markerShape,
            cx,
            cy,
            r,
            resolvedColor,
            resolvedColor,
            i,
            {
              fillOpacity: ptOpacity,
              strokeWidth: 1,
              style: { transition: 'r 150ms ease, fill-opacity 150ms ease' },
              onMouseEnter: (e: React.MouseEvent<SVGElement>) => {
                setActiveIndex(i);
                const svgEl = (e.currentTarget as SVGElement).closest('svg');
                const svgRect = svgEl?.getBoundingClientRect();
                const elRect = (e.currentTarget as SVGElement).getBoundingClientRect();
                if (svgRect) {
                  setTooltip({
                    visible: true,
                    x: elRect.left - svgRect.left + elRect.width / 2,
                    y: elRect.top - svgRect.top,
                    payload: [
                      { name: xKey, value: xVal, color: resolvedColor, dataKey: xKey },
                      { name: yKey, value: yVal, color: resolvedColor, dataKey: yKey },
                    ],
                    label: String(i),
                  });
                }
              },
              onMouseLeave: () => {
                setActiveIndex(null);
                setTooltip(TOOLTIP_HIDDEN);
              },
              onClick: () => onClick?.(row, i),
              onKeyDown: (e: React.KeyboardEvent<SVGElement>) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(row, i); } },
              role: onClick ? 'button' : undefined,
              tabIndex: onClick ? 0 : undefined,
              'aria-label': `${xKey}: ${xVal}, ${yKey}: ${yVal}`,
            } as React.SVGProps<SVGElement>,
          );
        })}
      </g>
    );
  },
);
Scatter.displayName = 'Chart.Scatter';

/* ─── Bubble ─────────────────────────────────────────────────────────── */

const Bubble = React.forwardRef<SVGGElement, ChartBubbleProps>(
  (
    {
      xKey,
      yKey,
      sizeKey,
      name,
      color,
      minRadius = 4,
      maxRadius = 40,
      onClick,
      className,
    },
    ref,
  ) => {
    const ctx = useCartesianContext('Chart.Bubble');
    const {
      data,
      xScale,
      yScale,
      palette,
      activeIndex,
      setActiveIndex,
      setTooltip,
    } = ctx;

    const seriesIndex = ctx.registerSeries(name ?? xKey);
    const resolvedColor = color ?? palette[seriesIndex % palette.length] ?? palette[0] ?? 'hsl(var(--chart-1))';

    const sizeValues = data.map((d) => {
      const v = d[sizeKey];
      return typeof v === 'number' ? v : 0;
    });
    const minSize = Math.min(...sizeValues);
    const maxSize = Math.max(...sizeValues);
    const sizeRange = maxSize - minSize || 1;

    const sizeScale = (value: number) =>
      minRadius + ((value - minSize) / sizeRange) * (maxRadius - minRadius);

    return (
      <g ref={ref} className={className} aria-label={name ?? `${xKey} vs ${yKey}`}>
        {data.map((row, i) => {
          const xVal = row[xKey];
          const yVal = row[yKey];
          const sizeVal = row[sizeKey];
          if (
            typeof xVal !== 'number' ||
            typeof yVal !== 'number' ||
            typeof sizeVal !== 'number'
          )
            return null;

          const cx = xScale(xVal);
          const cy = yScale(yVal);
          const r = sizeScale(sizeVal);
          const isActive = activeIndex === i;

          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={isActive ? r + 3 : r}
              fill={resolvedColor}
              fillOpacity={0.6}
              stroke={resolvedColor}
              strokeWidth={1.5}
              style={{ transition: 'r 150ms ease' }}
              onMouseEnter={(e) => {
                setActiveIndex(i);
                const svgEl = (e.currentTarget as SVGCircleElement).closest('svg');
                const svgRect = svgEl?.getBoundingClientRect();
                const circleRect = (e.currentTarget as SVGCircleElement).getBoundingClientRect();
                if (svgRect) {
                  setTooltip({
                    visible: true,
                    x: circleRect.left - svgRect.left,
                    y: circleRect.top - svgRect.top,
                    payload: [
                      { name: xKey, value: xVal, color: resolvedColor, dataKey: xKey },
                      { name: yKey, value: yVal, color: resolvedColor, dataKey: yKey },
                      { name: sizeKey, value: sizeVal, color: resolvedColor, dataKey: sizeKey },
                    ],
                    label: String(i),
                  });
                }
              }}
              onMouseLeave={() => {
                setActiveIndex(null);
                setTooltip(TOOLTIP_HIDDEN);
              }}
              onClick={() => onClick?.(row, i)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(row, i); } }}
              role={onClick ? 'button' : undefined}
              tabIndex={onClick ? 0 : undefined}
              aria-label={`${xKey}: ${xVal}, ${yKey}: ${yVal}, size: ${sizeVal}`}
            />
          );
        })}
      </g>
    );
  },
);
Bubble.displayName = 'Chart.Bubble';

/* ─── Tooltip (cartesian) ───────────────────────────────────────────── */

const Tooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  (
    {
      content,
      className,
      background,
      border,
      borderRadius = 8,
      boxShadow = '0 4px 12px rgba(0,0,0,0.15)',
      fontSize = 12,
    },
    ref,
  ) => {
    const ctx = useSharedTooltip('Chart.Tooltip');
    const { tooltip } = ctx;
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted || !tooltip.visible) {
      return (
        <div
          ref={ref}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {tooltip.label && `${tooltip.label}: ${tooltip.payload.map((p) => `${p.name} ${p.value}`).join(', ')}`}
        </div>
      );
    }

    const style: React.CSSProperties = {
      position: 'absolute',
      left: tooltip.x,
      top: tooltip.y,
      transform: 'translate(-50%, calc(-100% - 8px))',
      pointerEvents: 'none',
      zIndex: 50,
    };

    if (content) {
      return (
        <div ref={ref} style={style} className={className}>
          {content(tooltip)}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        style={style}
        className={className}
      >
        <div
          style={{
            background: background ?? 'hsl(var(--background, 0 0% 100%))',
            border: `1px solid ${border ?? 'hsl(var(--border, 220 13% 91%))'}`,
            borderRadius,
            padding: '8px 12px',
            boxShadow,
            fontSize,
            minWidth: 120,
          }}
        >
          {tooltip.label && (
            <div style={{ fontWeight: 600, marginBottom: 4, opacity: 0.8 }}>
              {tooltip.label}
            </div>
          )}
          {tooltip.payload.map((entry, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: entry.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ opacity: 0.7 }}>{entry.name}:</span>
              <span style={{ fontWeight: 500 }}>
                {typeof entry.value === 'number'
                  ? entry.value.toLocaleString()
                  : entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
Tooltip.displayName = 'Chart.Tooltip';

/* ─── Legend (cartesian) ────────────────────────────────────────────── */

const Legend = React.forwardRef<HTMLDivElement, ChartLegendProps>(
  (
    {
      position = 'bottom',
      content,
      renderEntry,
      iconType = 'square',
      iconSize = 12,
      className,
    },
    ref,
  ) => {
    const ctx = useSharedTooltip('Chart.Legend');
    const entries = ctx.legendEntries;

    const icon = (color: string) => {
      if (iconType === 'circle') {
        return (
          <span
            style={{
              display: 'inline-block',
              width: iconSize,
              height: iconSize,
              borderRadius: '50%',
              background: color,
              flexShrink: 0,
            }}
          />
        );
      }
      if (iconType === 'line') {
        return (
          <span
            style={{
              display: 'inline-block',
              width: iconSize * 1.5,
              height: 3,
              borderRadius: 2,
              background: color,
              flexShrink: 0,
            }}
          />
        );
      }
      return (
        <span
          style={{
            display: 'inline-block',
            width: iconSize,
            height: iconSize,
            borderRadius: 3,
            background: color,
            flexShrink: 0,
          }}
        />
      );
    };

    // order drives flex position: top/left renders before SVG, bottom/right after
    const order = position === 'top' || position === 'left' ? -1 : 1;
    const isVertical = position === 'left' || position === 'right';

    if (content) {
      return (
        <div ref={ref} className={className} style={{ order }} aria-label="Chart legend">
          {content(entries)}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: 'flex',
          flexDirection: isVertical ? 'column' : 'row',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'center',
          padding: isVertical ? '0 8px' : '8px 0',
          order,
        }}
        aria-label="Chart legend"
      >
        {entries.map((entry, i) =>
          renderEntry ? (
            <React.Fragment key={i}>{renderEntry(entry, i)}</React.Fragment>
          ) : (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              {icon(entry.color)}
              <span>{entry.name}</span>
            </div>
          ),
        )}
      </div>
    );
  },
);
Legend.displayName = 'Chart.Legend';

/* ─── PieRoot ───────────────────────────────────────────────────────── */

const PieRoot = React.forwardRef<HTMLDivElement, ChartPieRootProps>(
  (
    {
      data,
      width = 400,
      height = 400,
      className,
      accessibilityLabel = 'Pie chart',
      children,
    },
    ref,
  ) => {
    const cx = width / 2;
    const cy = height / 2;
    const [tooltip, setTooltip] = React.useState<TooltipState>(TOOLTIP_HIDDEN);

    const contextValue: PieContextValue = {
      data: data as Record<string, unknown>[],
      cx,
      cy,
      palette: DEFAULT_PALETTE,
      tooltip,
      setTooltip,
    };

    const rows = data as Record<string, unknown>[];
    const { svgChildren, overlayChildren } = splitChildren(children);
    const legendEntries = collectPieLegendEntries(rows, children);

    const legendPosition = ((): 'top' | 'bottom' | 'left' | 'right' => {
      let pos: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) &&
          (child.type as { displayName?: string })?.displayName === 'Chart.Legend') {
          pos = (child.props as ChartLegendProps).position ?? 'bottom';
        }
      });
      return pos;
    })();
    const isRow = legendPosition === 'left' || legendPosition === 'right';

    return (
      <SharedTooltipProvider tooltip={tooltip} setTooltip={setTooltip} legendEntries={legendEntries}>
        <PieProvider {...contextValue}>
          <div
            ref={ref}
            className={className}
            style={{
              position: 'relative',
              display: 'inline-flex',
              flexDirection: isRow ? 'row' : 'column',
              alignItems: isRow ? 'center' : 'center',
            }}
          >
            <svg
              role="img"
              aria-label={accessibilityLabel}
              width={width}
              height={height}
              style={{ display: 'block', flexShrink: 0 }}
            >
              <title>{accessibilityLabel}</title>
              {svgChildren}
            </svg>
            {overlayChildren}
          </div>
        </PieProvider>
      </SharedTooltipProvider>
    );
  },
);
PieRoot.displayName = 'Chart.PieRoot';

/* ─── Pie ───────────────────────────────────────────────────────────── */

const Pie = React.forwardRef<SVGGElement, ChartPieProps>(
  (
    {
      dataKey,
      nameKey = 'name',
      innerRadius = 0,
      outerRadius,
      padAngle = 0,
      cornerRadius = 0,
      colors,
      startAngle: startAngleProp = -90,
      endAngle: endAngleProp = 270,
      arcLabel,
      arcLabelMinAngle = 5,
      onClick,
      className,
    },
    ref,
  ) => {
    const ctx = usePieContext('Chart.Pie');
    const { data, cx, cy, palette, setTooltip } = ctx;

    const resolvedColors = colors ?? palette;

    const total = data.reduce((s, d) => {
      const v = d[dataKey];
      return s + (typeof v === 'number' ? v : 0);
    }, 0);

    const radius = outerRadius ?? Math.min(cx, cy) * 0.85;
    const padRad = (padAngle * Math.PI) / 180;
    const [hovered, setHovered] = React.useState<number | null>(null);

    // Convert degrees to radians; distribute slices over [startAngle, endAngle]
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const arcStartRad = toRad(startAngleProp);
    const arcSpanRad = toRad(endAngleProp - startAngleProp);

    let currentAngle = arcStartRad;

    const slices = data.map((d, i) => {
      const value = typeof d[dataKey] === 'number' ? (d[dataKey] as number) : 0;
      const sliceAngle = total > 0 ? (value / total) * arcSpanRad : 0;
      const sliceStart = currentAngle + padRad / 2;
      const sliceEnd = currentAngle + sliceAngle - padRad / 2;
      currentAngle += sliceAngle;

      const nameVal = d[nameKey];
      const sliceName = typeof nameVal === 'string' || typeof nameVal === 'number' ? String(nameVal) : `Slice ${i}`;
      const sliceColor = resolvedColors[i % resolvedColors.length] ?? palette[0] ?? 'hsl(var(--chart-1))';
      const sliceAngleDeg = Math.abs(sliceAngle * (180 / Math.PI));

      return { startAngle: sliceStart, endAngle: sliceEnd, value, name: sliceName, color: sliceColor, index: i, d, sliceAngleDeg };
    });

    return (
      <g ref={ref} className={className}>
        {slices.map((slice) => {
          const isHovered = hovered === slice.index;
          const expandedRadius = isHovered ? radius + 6 : radius;
          const expandedInner = isHovered && innerRadius > 0 ? innerRadius - 2 : innerRadius;

          const pathD = buildArcPath(
            cx,
            cy,
            expandedRadius,
            expandedInner,
            slice.startAngle,
            slice.endAngle,
            cornerRadius,
          );

          // Arc label
          let arcLabelEl: React.ReactNode = null;
          if (arcLabel && slice.sliceAngleDeg >= arcLabelMinAngle) {
            const midAngle = (slice.startAngle + slice.endAngle) / 2;
            const labelRadius = innerRadius > 0 ? (innerRadius + radius) / 2 : radius * 0.6;
            const lx = Math.round((cx + labelRadius * Math.sin(midAngle)) * 1e4) / 1e4;
            const ly = Math.round((cy - labelRadius * Math.cos(midAngle)) * 1e4) / 1e4;

            let labelText: string;
            if (typeof arcLabel === 'function') {
              labelText = arcLabel({ name: slice.name, value: slice.value, total });
            } else if (arcLabel === 'percentage') {
              labelText = `${Math.round((slice.value / total) * 100)}%`;
            } else {
              labelText = String(slice.value);
            }

            arcLabelEl = (
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={11}
                fill="white"
                fillOpacity={0.9}
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {labelText}
              </text>
            );
          }

          return (
            <g key={slice.index}>
              <path
                d={pathD}
                fill={slice.color}
                style={{ transition: 'd 200ms ease, transform 200ms ease' }}
                onMouseEnter={(e) => {
                  setHovered(slice.index);
                  const svgEl = (e.currentTarget as SVGPathElement).closest('svg');
                  const svgRect = svgEl?.getBoundingClientRect();
                  const pathRect = (e.currentTarget as SVGPathElement).getBoundingClientRect();
                  if (svgRect) {
                    setTooltip({
                      visible: true,
                      x: pathRect.left - svgRect.left + pathRect.width / 2,
                      y: pathRect.top - svgRect.top + pathRect.height / 2,
                      payload: [
                        { name: slice.name, value: slice.value, color: slice.color, dataKey },
                      ],
                      label: slice.name,
                    });
                  }
                }}
                onMouseLeave={() => {
                  setHovered(null);
                  setTooltip(TOOLTIP_HIDDEN);
                }}
                onClick={() => onClick?.(slice.d, slice.index)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(slice.d, slice.index); } }}
                role={onClick ? 'button' : undefined}
                tabIndex={onClick ? 0 : undefined}
                aria-label={`${slice.name}: ${slice.value}`}
              />
              {arcLabelEl}
            </g>
          );
        })}
      </g>
    );
  },
);
Pie.displayName = 'Chart.Pie';

/* ─── RadarRoot ─────────────────────────────────────────────────────── */

const RadarRoot = React.forwardRef<HTMLDivElement, ChartRadarRootProps>(
  (
    {
      data,
      width = 400,
      height = 400,
      className,
      accessibilityLabel = 'Radar chart',
      children,
    },
    ref,
  ) => {
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(cx, cy) * 0.8;

    const rows = data as Record<string, unknown>[];

    // Collect angle keys from PolarAngleAxis child
    const angleKeys: string[] = [];
    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement(child) &&
        (child.type as { displayName?: string })?.displayName === 'Chart.PolarAngleAxis'
      ) {
        const dKey = (child.props as ChartPolarAngleAxisProps).dataKey;
        if (dKey) {
          // Use data to get unique values of this key as axis labels
          rows.forEach((d) => {
            const val = d[dKey];
            if (typeof val === 'string' && !angleKeys.includes(val)) {
              angleKeys.push(val);
            }
          });
        }
      }
    });

    const contextValue: RadarContextValue = {
      data: rows,
      cx,
      cy,
      radius,
      angleKeys,
      palette: DEFAULT_PALETTE,
    };

    const [tooltip, setTooltip] = React.useState<TooltipState>(TOOLTIP_HIDDEN);
    const { svgChildren, overlayChildren } = splitChildren(children);
    const legendEntries = collectRadarLegendEntries(children);

    const legendPosition = ((): 'top' | 'bottom' | 'left' | 'right' => {
      let pos: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) &&
          (child.type as { displayName?: string })?.displayName === 'Chart.Legend') {
          pos = (child.props as ChartLegendProps).position ?? 'bottom';
        }
      });
      return pos;
    })();
    const isRow = legendPosition === 'left' || legendPosition === 'right';

    return (
      <SharedTooltipProvider tooltip={tooltip} setTooltip={setTooltip} legendEntries={legendEntries}>
        <RadarProvider {...contextValue}>
          <div
            ref={ref}
            className={className}
            style={{
              position: 'relative',
              display: 'inline-flex',
              flexDirection: isRow ? 'row' : 'column',
              alignItems: 'center',
            }}
          >
            <svg
              role="img"
              aria-label={accessibilityLabel}
              width={width}
              height={height}
              style={{ display: 'block', flexShrink: 0 }}
            >
              <title>{accessibilityLabel}</title>
              {svgChildren}
            </svg>
            {overlayChildren}
          </div>
        </RadarProvider>
      </SharedTooltipProvider>
    );
  },
);
RadarRoot.displayName = 'Chart.RadarRoot';

/* ─── PolarGrid ─────────────────────────────────────────────────────── */

const PolarGrid = React.forwardRef<SVGGElement, ChartPolarGridProps>(
  ({ rings = 5, shape = 'sharp', className }, ref) => {
    const ctx = useRadarContext('Chart.PolarGrid');
    const { cx, cy, radius, angleKeys } = ctx;

    const angleStep = (2 * Math.PI) / Math.max(angleKeys.length, 3);
    const spokeCount = Math.max(angleKeys.length, 3);

    return (
      <g ref={ref} className={className} aria-hidden="true">
        {/* Rings */}
        {Array.from({ length: rings }, (_, i) => {
          const r = (radius / rings) * (i + 1);

          if (shape === 'circular') {
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.15}
                strokeWidth={1}
              />
            );
          }

          // Polygon ring
          const points = Array.from({ length: spokeCount }, (__, j) => {
            const angle = j * angleStep - Math.PI / 2;
            return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
          });
          const d = points.map((p, j) => `${j === 0 ? 'M' : 'L'} ${fmt(p[0] ?? 0)} ${fmt(p[1] ?? 0)}`).join(' ') + ' Z';
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.15}
              strokeWidth={1}
            />
          );
        })}
        {/* Spokes */}
        {Array.from({ length: spokeCount }, (_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={cx + radius * Math.cos(angle)}
              y2={cy + radius * Math.sin(angle)}
              stroke="currentColor"
              strokeOpacity={0.15}
              strokeWidth={1}
            />
          );
        })}
      </g>
    );
  },
);
PolarGrid.displayName = 'Chart.PolarGrid';

/* ─── PolarAngleAxis ────────────────────────────────────────────────── */

const PolarAngleAxis = React.forwardRef<SVGGElement, ChartPolarAngleAxisProps>(
  ({ dataKey: _dataKey, className }, ref) => {
    const ctx = useRadarContext('Chart.PolarAngleAxis');
    const { cx, cy, radius, angleKeys } = ctx;

    const angleStep = (2 * Math.PI) / Math.max(angleKeys.length, 1);

    return (
      <g ref={ref} className={className}>
        {angleKeys.map((key, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelRadius = radius + 18;
          const x = Math.round((cx + labelRadius * Math.cos(angle)) * 1e4) / 1e4;
          const y = Math.round((cy + labelRadius * Math.sin(angle)) * 1e4) / 1e4;

          return (
            <text
              key={key}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={11}
              fill="currentColor"
              fillOpacity={0.7}
            >
              {key}
            </text>
          );
        })}
      </g>
    );
  },
);
PolarAngleAxis.displayName = 'Chart.PolarAngleAxis';

/* ─── Radar series ──────────────────────────────────────────────────── */

const Radar = React.forwardRef<SVGGElement, ChartRadarProps>(
  ({ dataKey, color, name, fillOpacity = 0.25, fillArea = true, showMark: showMarkProp = true, dot: dotAlias, className }, ref) => {
    const showMark = dotAlias !== undefined ? dotAlias : showMarkProp;
    const ctx = useRadarContext('Chart.Radar');
    const { data, cx, cy, radius, angleKeys, palette } = ctx;

    // Each entry in data has one row per axis
    // We map angleKeys to their values in data
    const values = angleKeys.map((key) => {
      const row = data.find((d) => {
        // Try to find a row where the subject/label column matches this key
        const firstKey = Object.keys(d)[0];
        return firstKey !== undefined && d[firstKey] === key;
      });
      if (!row) return 0;
      const val = row[dataKey];
      return typeof val === 'number' ? val : 0;
    });

    // Normalise to [0, 1]
    const maxVal = Math.max(...values, 1);
    const normalised = values.map((v) => v / maxVal);

    const seriesColor = color ?? palette[0] ?? 'hsl(var(--chart-1))';
    const pathD = buildRadarPath(normalised, cx, cy, radius);

    return (
      <g ref={ref} className={className} aria-label={name ?? dataKey}>
        <path
          d={pathD}
          fill={seriesColor}
          fillOpacity={fillArea ? fillOpacity : 0}
          stroke={seriesColor}
          strokeWidth={2}
        />
        {showMark && normalised.map((norm, i) => {
          const angle = (i * (2 * Math.PI)) / normalised.length - Math.PI / 2;
          const px = cx + radius * norm * Math.cos(angle);
          const py = cy + radius * norm * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={px}
              cy={py}
              r={3}
              fill={seriesColor}
              aria-label={`${angleKeys[i]}: ${values[i]}`}
            />
          );
        })}
      </g>
    );
  },
);
Radar.displayName = 'Chart.Radar';

/* ─── Standalone: Heatmap ───────────────────────────────────────────── */

const Heatmap = React.forwardRef<HTMLDivElement, ChartHeatmapProps>(
  (
    {
      data,
      xKey,
      yKey,
      valueKey,
      colorRange = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'],
      width = 500,
      height = 300,
      margin: marginProp,
      className,
      accessibilityLabel = 'Heatmap',
    },
    ref,
  ) => {
    const margin: ChartMargin = { ...DEFAULT_MARGIN, ...marginProp };
    const innerWidth = Math.max(0, width - margin.left - margin.right);
    const innerHeight = Math.max(0, height - margin.top - margin.bottom);

    const rows = data as Record<string, unknown>[];
    const xValues = [...new Set(rows.map((d) => String(d[xKey] ?? '')))];
    const yValues = [...new Set(rows.map((d) => String(d[yKey] ?? '')))];

    const xBand = bandScale(xValues, [0, innerWidth], 0.05, 0.05);
    const yBand = bandScale(yValues, [0, innerHeight], 0.05, 0.05);

    const cells = computeHeatmapCells(
      rows,
      xKey,
      yKey,
      valueKey,
      xBand.scale,
      yBand.scale,
      xBand.bandwidth,
      yBand.bandwidth,
    );

    // Simple linear interpolation between two CSS colors
    // We use opacity as a proxy since we can't parse CSS vars at runtime
    const cellFill = (_norm: number): string => {
      // Use opacity variation on the first color
      return colorRange[0];
    };

    const cellOpacity = (norm: number): number => 0.1 + norm * 0.9;

    return (
      <div ref={ref} className={className} style={{ display: 'inline-block' }}>
        <svg
          role="img"
          aria-label={accessibilityLabel}
          width={width}
          height={height}
          style={{ display: 'block' }}
        >
          <title>{accessibilityLabel}</title>
          <g transform={`translate(${margin.left},${margin.top})`}>
            {/* X axis labels */}
            {xValues.map((v) => (
              <text
                key={v}
                x={xBand.scale(v) + xBand.bandwidth / 2}
                y={innerHeight + 16}
                textAnchor="middle"
                fontSize={10}
                fill="currentColor"
                fillOpacity={0.6}
              >
                {v}
              </text>
            ))}
            {/* Y axis labels */}
            {yValues.map((v) => (
              <text
                key={v}
                x={-8}
                y={yBand.scale(v) + yBand.bandwidth / 2}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={10}
                fill="currentColor"
                fillOpacity={0.6}
              >
                {v}
              </text>
            ))}
            {/* Cells */}
            {cells.map((cell, i) => (
              <rect
                key={i}
                x={cell.x}
                y={cell.y}
                width={cell.width}
                height={cell.height}
                rx={2}
                fill={cellFill(cell.normalised)}
                fillOpacity={cellOpacity(cell.normalised)}
                aria-label={`${cell.xValue}, ${cell.yValue}: ${cell.value}`}
              />
            ))}
          </g>
        </svg>
      </div>
    );
  },
);
Heatmap.displayName = 'Chart.Heatmap';

/* ─── Standalone: Treemap ───────────────────────────────────────────── */

const Treemap = React.forwardRef<HTMLDivElement, ChartTreemapProps>(
  (
    {
      data,
      width = 600,
      height = 400,
      padding = 4,
      colors,
      className,
      accessibilityLabel = 'Treemap',
      onNodeClick,
    },
    ref,
  ) => {
    const palette = colors ?? DEFAULT_PALETTE;
    const nodes = squarifyTreemap(data, 0, 0, width, height, padding);

    const renderNode = (node: TreemapLayoutNode, depth: number): React.ReactNode => {
      const fill = node.color ?? palette[depth % palette.length] ?? palette[0] ?? 'hsl(var(--chart-1))';

      return (
        <g key={`${node.name}-${node.x}-${node.y}`}>
          <rect
            x={node.x}
            y={node.y}
            width={node.width}
            height={node.height}
            fill={fill}
            fillOpacity={0.85 - depth * 0.15}
            rx={4}
            stroke="white"
            strokeWidth={2}
            onClick={() => onNodeClick?.(node)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNodeClick?.(node); } }}
            role={onNodeClick ? 'button' : undefined}
            tabIndex={onNodeClick ? 0 : undefined}
            aria-label={`${node.name}: ${node.value}`}
            style={{ cursor: onNodeClick ? 'pointer' : 'default' }}
          />
          {node.width > 40 && node.height > 24 && (
            <text
              x={node.x + node.width / 2}
              y={node.y + node.height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={Math.min(14, node.width / 5, node.height / 3)}
              fill="white"
              fillOpacity={0.9}
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {node.name}
            </text>
          )}
          {node.children?.map((child) => renderNode(child, depth + 1))}
        </g>
      );
    };

    return (
      <div ref={ref} className={className} style={{ display: 'inline-block' }}>
        <svg
          role="img"
          aria-label={accessibilityLabel}
          width={width}
          height={height}
          style={{ display: 'block' }}
        >
          <title>{accessibilityLabel}</title>
          {nodes.map((node) => renderNode(node, 0))}
        </svg>
      </div>
    );
  },
);
Treemap.displayName = 'Chart.Treemap';

/* ─── Standalone: Funnel ────────────────────────────────────────────── */

/**
 * Build a funnel section SVG path with optional curve type.
 */
function buildFunnelSectionPath(
  x1: number,
  x2: number,
  x3: number,
  x4: number,
  y1: number,
  y2: number,
  curve: 'linear' | 'linear-sharp' | 'bump' | 'step',
): string {
  if (curve === 'bump') {
    const yMid = (y1 + y2) / 2;
    return [
      `M ${fmt(x1)} ${fmt(y1)}`,
      `C ${fmt(x1)} ${fmt(yMid)}, ${fmt(x4)} ${fmt(yMid)}, ${fmt(x4)} ${fmt(y2)}`,
      `L ${fmt(x3)} ${fmt(y2)}`,
      `C ${fmt(x3)} ${fmt(yMid)}, ${fmt(x2)} ${fmt(yMid)}, ${fmt(x2)} ${fmt(y1)}`,
      'Z',
    ].join(' ');
  }

  if (curve === 'step') {
    const yMid = (y1 + y2) / 2;
    return [
      `M ${fmt(x1)} ${fmt(y1)}`,
      `L ${fmt(x2)} ${fmt(y1)}`,
      `L ${fmt(x2)} ${fmt(yMid)}`,
      `L ${fmt(x3)} ${fmt(yMid)}`,
      `L ${fmt(x3)} ${fmt(y2)}`,
      `L ${fmt(x4)} ${fmt(y2)}`,
      `L ${fmt(x4)} ${fmt(yMid)}`,
      `L ${fmt(x1)} ${fmt(yMid)}`,
      'Z',
    ].join(' ');
  }

  // linear / linear-sharp (straight trapezoid)
  return [
    `M ${fmt(x1)} ${fmt(y1)}`,
    `L ${fmt(x2)} ${fmt(y1)}`,
    `L ${fmt(x3)} ${fmt(y2)}`,
    `L ${fmt(x4)} ${fmt(y2)}`,
    'Z',
  ].join(' ');
}

const Funnel = React.forwardRef<HTMLDivElement, ChartFunnelProps>(
  (
    {
      data,
      width = 400,
      height = 300,
      labelPosition: _labelPosition = 'center',
      variant = 'filled',
      curve = 'linear',
      gap = 0,
      className,
      accessibilityLabel = 'Funnel chart',
      onSegmentClick,
    },
    ref,
  ) => {
    const margin: ChartMargin = { top: 10, right: 80, bottom: 10, left: 80 };
    const innerWidth = Math.max(0, width - margin.left - margin.right);
    const innerHeight = Math.max(0, height - margin.top - margin.bottom);

    // Use a gap-aware layout
    const segments = computeFunnelLayout(data, margin.left, margin.top, innerWidth, innerHeight, Math.max(gap, 0));

    return (
      <div ref={ref} className={className} style={{ display: 'inline-block' }}>
        <svg
          role="img"
          aria-label={accessibilityLabel}
          width={width}
          height={height}
          style={{ display: 'block' }}
        >
          <title>{accessibilityLabel}</title>
          {segments.map((seg, i) => {
            const resolvedColor = seg.color ?? DEFAULT_PALETTE[i % DEFAULT_PALETTE.length] ?? DEFAULT_PALETTE[0] ?? 'hsl(var(--chart-1))';
            const segCx = (seg.x1 + seg.x2) / 2;
            const segCy = (seg.y1 + seg.y2) / 2;

            const customPath = buildFunnelSectionPath(
              seg.x1, seg.x2, seg.x3, seg.x4, seg.y1, seg.y2, curve,
            );

            const isOutlined = variant === 'outlined';

            return (
              <g key={i}>
                <path
                  d={customPath}
                  fill={isOutlined ? 'transparent' : resolvedColor}
                  fillOpacity={isOutlined ? 0 : 0.85}
                  stroke={resolvedColor}
                  strokeWidth={isOutlined ? 2 : 0}
                  onClick={() => onSegmentClick?.(data[i]!, i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSegmentClick?.(data[i]!, i); } }}
                  role={onSegmentClick ? 'button' : undefined}
                  tabIndex={onSegmentClick ? 0 : undefined}
                  aria-label={`${seg.name}: ${seg.value}`}
                  style={{ cursor: onSegmentClick ? 'pointer' : 'default', transition: 'fill-opacity 150ms' }}
                />
                {/* Center label */}
                <text
                  x={segCx}
                  y={segCy - 6}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={13}
                  fontWeight={600}
                  fill={isOutlined ? resolvedColor : 'white'}
                  style={{ pointerEvents: 'none' }}
                >
                  {seg.name}
                </text>
                <text
                  x={segCx}
                  y={segCy + 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={11}
                  fill={isOutlined ? resolvedColor : 'white'}
                  fillOpacity={0.85}
                  style={{ pointerEvents: 'none' }}
                >
                  {seg.value.toLocaleString()} ({seg.percentage.toFixed(1)}%)
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  },
);
Funnel.displayName = 'Chart.Funnel';

/* ─── Standalone: Gauge ─────────────────────────────────────────────── */

const Gauge = React.forwardRef<HTMLDivElement, ChartGaugeProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      startAngle = -135,
      endAngle = 135,
      thickness = 20,
      colorStops,
      showLabel = true,
      label,
      width = 200,
      height = 150,
      className,
      accessibilityLabel,
    },
    ref,
  ) => {
    const outerRadius = Math.min(width, height * 1.3) / 2 - 4;
    const gaugeData = computeGaugeArcs(
      value,
      min,
      max,
      startAngle,
      endAngle,
      outerRadius,
      thickness,
    );

    const fraction = gaugeData.fraction;

    // Determine fill color from colorStops
    let fillColor = DEFAULT_PALETTE[0];
    if (colorStops && colorStops.length > 0) {
      const pct = fraction * 100;
      let chosen = colorStops[0]?.[1] ?? fillColor;
      for (const [stopPct, stopColor] of colorStops) {
        if (pct >= stopPct) chosen = stopColor;
      }
      fillColor = chosen;
    }

    const cx = width / 2;
    const cy = height * 0.65;

    // Recompute with centered cx/cy
    const trackPath = computeGaugeArcs(value, min, max, startAngle, endAngle, outerRadius, thickness).trackPath;
    const fillPath = computeGaugeArcs(value, min, max, startAngle, endAngle, outerRadius, thickness).fillPath;

    const labelText = (() => {
      if (!showLabel) return null;
      if (typeof label === 'function') return label(value, min, max);
      if (typeof label === 'string') return label;
      return value.toLocaleString();
    })();

    const a11yLabel = accessibilityLabel ?? `Gauge: ${value} out of ${max}`;

    return (
      <div ref={ref} className={className} style={{ display: 'inline-block' }}>
        <svg
          role="img"
          aria-label={a11yLabel}
          width={width}
          height={height}
          style={{ display: 'block' }}
        >
          <title>{a11yLabel}</title>
          <g transform={`translate(${cx - outerRadius}, ${cy - outerRadius})`}>
            {/* Track */}
            <path
              d={trackPath}
              fill="currentColor"
              fillOpacity={0.1}
            />
            {/* Fill */}
            {fillPath && (
              <path
                d={fillPath}
                fill={fillColor}
                style={{ transition: 'd 400ms ease' }}
              />
            )}
          </g>
          {/* Center label */}
          {showLabel && labelText && (
            <text
              x={cx}
              y={cy + 4}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={Math.max(14, outerRadius / 3)}
              fontWeight={700}
              fill="currentColor"
            >
              {labelText}
            </text>
          )}
          {/* Min/max labels */}
          <text
            x={cx - outerRadius + thickness / 2}
            y={cy + 16}
            textAnchor="middle"
            fontSize={10}
            fill="currentColor"
            fillOpacity={0.5}
          >
            {min}
          </text>
          <text
            x={cx + outerRadius - thickness / 2}
            y={cy + 16}
            textAnchor="middle"
            fontSize={10}
            fill="currentColor"
            fillOpacity={0.5}
          >
            {max}
          </text>
        </svg>
      </div>
    );
  },
);
Gauge.displayName = 'Chart.Gauge';

/* ─── GaugeContainer / GaugeValueArc / GaugeReferenceArc ────────────── */

/**
 * Headless gauge wrapper that provides a GaugeContext to child arc components.
 * Renders an SVG centered with the given width/height.
 */
const GaugeContainer = React.forwardRef<HTMLDivElement, ChartGaugeContainerProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      startAngle = -135,
      endAngle = 135,
      width = 200,
      height = 200,
      thickness = 20,
      className,
      accessibilityLabel,
      children,
    },
    ref,
  ) => {
    const cx = width / 2;
    const cy = height / 2;
    const outerRadius = Math.min(cx, cy) - 4;
    const innerRadius = outerRadius - thickness;
    const fraction = Math.min(1, Math.max(0, (value - min) / (max - min)));

    const a11yLabel = accessibilityLabel ?? `Gauge: ${value} out of ${max}`;

    const contextValue: GaugeContextValue = {
      value,
      min,
      max,
      startAngle,
      endAngle,
      cx,
      cy,
      outerRadius,
      innerRadius,
      fraction,
    };

    return (
      <GaugeProvider {...contextValue}>
        <div ref={ref} className={className} style={{ display: 'inline-block' }}>
          <svg
            role="img"
            aria-label={a11yLabel}
            width={width}
            height={height}
            style={{ display: 'block' }}
          >
            <title>{a11yLabel}</title>
            {children}
          </svg>
        </div>
      </GaugeProvider>
    );
  },
);
GaugeContainer.displayName = 'Chart.GaugeContainer';

/**
 * The colored value arc inside a GaugeContainer.
 * Reads value/angle context from GaugeContainer.
 */
const GaugeValueArc = React.forwardRef<SVGPathElement, ChartGaugeValueArcProps>(
  ({ color, colorStops, className }, ref) => {
    const ctx = useGaugeContext('Chart.GaugeValueArc');
    const { cx, cy, outerRadius, innerRadius, fraction, startAngle, endAngle } = ctx;

    let fillColor = color ?? DEFAULT_PALETTE[0] ?? 'hsl(var(--chart-1))';
    if (colorStops && colorStops.length > 0) {
      const pct = fraction * 100;
      let chosen = colorStops[0]?.[1] ?? fillColor;
      for (const [stopPct, stopColor] of colorStops) {
        if (pct >= stopPct) chosen = stopColor;
      }
      fillColor = chosen;
    }

    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const startRad = toRad(startAngle);
    const endRad = toRad(endAngle);
    const fillEndRad = startRad + (endRad - startRad) * fraction;

    if (fraction <= 0) return null;

    const fillPath = buildGaugeContainerArcPath(cx, cy, outerRadius, innerRadius, startRad, fillEndRad);

    return (
      <path
        ref={ref}
        d={fillPath}
        fill={fillColor}
        className={className}
        style={{ transition: 'd 400ms ease' }}
      />
    );
  },
);
GaugeValueArc.displayName = 'Chart.GaugeValueArc';

/**
 * The gray background track arc inside a GaugeContainer.
 */
const GaugeReferenceArc = React.forwardRef<SVGPathElement, ChartGaugeReferenceArcProps>(
  ({ color, className }, ref) => {
    const ctx = useGaugeContext('Chart.GaugeReferenceArc');
    const { cx, cy, outerRadius, innerRadius, startAngle, endAngle } = ctx;

    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const startRad = toRad(startAngle);
    const endRad = toRad(endAngle);

    const trackPath = buildGaugeContainerArcPath(cx, cy, outerRadius, innerRadius, startRad, endRad);

    return (
      <path
        ref={ref}
        d={trackPath}
        fill={color ?? 'currentColor'}
        fillOpacity={color ? 1 : 0.1}
        className={className}
      />
    );
  },
);
GaugeReferenceArc.displayName = 'Chart.GaugeReferenceArc';

/**
 * Internal helper: build a donut arc for the GaugeContainer composition components.
 * Uses the same "clockwise from top" angle convention as computeGaugeArcs.
 */
function buildGaugeContainerArcPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startRad: number,
  endRad: number,
): string {
  // Convert "clockwise from top" to SVG convention (0 = right)
  const toSvg = (r: number) => r - Math.PI / 2;
  const s = toSvg(startRad);
  const e = toSvg(endRad);
  const sweep = Math.abs(endRad - startRad);
  const largeArc = sweep > Math.PI ? 1 : 0;

  const ox1 = cx + outerR * Math.cos(s);
  const oy1 = cy + outerR * Math.sin(s);
  const ox2 = cx + outerR * Math.cos(e);
  const oy2 = cy + outerR * Math.sin(e);
  const ix1 = cx + innerR * Math.cos(e);
  const iy1 = cy + innerR * Math.sin(e);
  const ix2 = cx + innerR * Math.cos(s);
  const iy2 = cy + innerR * Math.sin(s);

  return [
    `M ${fmt(ox1)} ${fmt(oy1)}`,
    `A ${fmt(outerR)} ${fmt(outerR)} 0 ${largeArc} 1 ${fmt(ox2)} ${fmt(oy2)}`,
    `L ${fmt(ix1)} ${fmt(iy1)}`,
    `A ${fmt(innerR)} ${fmt(innerR)} 0 ${largeArc} 0 ${fmt(ix2)} ${fmt(iy2)}`,
    'Z',
  ].join(' ');
}

/* ─── Standalone: Candlestick ───────────────────────────────────────── */

const CandlestickChart = React.forwardRef<HTMLDivElement, ChartCandlestickProps>(
  (
    {
      data,
      width = 600,
      height = 300,
      margin: marginProp,
      bullColor = 'hsl(var(--chart-2, 160 60% 45%))',
      bearColor = 'hsl(var(--chart-5, 340 75% 55%))',
      className,
      accessibilityLabel = 'Candlestick chart',
    },
    ref,
  ) => {
    const margin: ChartMargin = { ...DEFAULT_MARGIN, ...marginProp };
    const innerWidth = Math.max(0, width - margin.left - margin.right);
    const innerHeight = Math.max(0, height - margin.top - margin.bottom);

    // Y domain from all prices
    const allPrices = data.flatMap((d) => [d.open, d.high, d.low, d.close]);
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    const yScale = linearScale(
      [minPrice - (maxPrice - minPrice) * 0.05, maxPrice + (maxPrice - minPrice) * 0.05],
      [innerHeight, 0],
    );

    const n = data.length;
    const step = innerWidth / Math.max(n, 1);
    const candleWidth = step * 0.7;
    const xScale = (i: number) => step * i + step / 2;

    const bars = computeCandlestickBars(
      data,
      xScale,
      yScale,
      candleWidth,
    );

    // Y axis ticks
    const yTicks = niceLinearTicks(minPrice, maxPrice, 5);

    return (
      <div ref={ref} className={className} style={{ display: 'inline-block' }}>
        <svg
          role="img"
          aria-label={accessibilityLabel}
          width={width}
          height={height}
          style={{ display: 'block' }}
        >
          <title>{accessibilityLabel}</title>
          <g transform={`translate(${margin.left},${margin.top})`}>
            {/* Grid lines */}
            {yTicks.map((tick) => {
              const y = yScale(tick);
              return (
                <line
                  key={tick}
                  x1={0}
                  y1={y}
                  x2={innerWidth}
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity={0.1}
                  strokeDasharray="3 3"
                />
              );
            })}
            {/* Y Axis */}
            {yTicks.map((tick) => {
              const y = yScale(tick);
              return (
                <text
                  key={tick}
                  x={-8}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize={10}
                  fill="currentColor"
                  fillOpacity={0.6}
                >
                  {tick.toFixed(2)}
                </text>
              );
            })}
            {/* Candles */}
            {bars.map((bar, i) => {
              const color = bar.bullish ? bullColor : bearColor;
              const bodyY = Math.min(bar.openY, bar.closeY);
              const bodyH = Math.max(1, Math.abs(bar.openY - bar.closeY));
              const xCenter = bar.x;

              return (
                <g key={i} aria-label={`${data[i]?.date ?? i}: O${data[i]?.open} H${data[i]?.high} L${data[i]?.low} C${data[i]?.close}`}>
                  {/* Wick */}
                  <line
                    x1={xCenter}
                    y1={bar.highY}
                    x2={xCenter}
                    y2={bar.lowY}
                    stroke={color}
                    strokeWidth={1}
                  />
                  {/* Body */}
                  <rect
                    x={xCenter - bar.candleWidth / 2}
                    y={bodyY}
                    width={bar.candleWidth}
                    height={bodyH}
                    fill={color}
                    rx={1}
                  />
                </g>
              );
            })}
            {/* X axis labels */}
            {data.map((d, i) => (
              <text
                key={i}
                x={xScale(i)}
                y={innerHeight + 16}
                textAnchor="middle"
                fontSize={10}
                fill="currentColor"
                fillOpacity={0.5}
              >
                {String(d.date)}
              </text>
            ))}
          </g>
        </svg>
      </div>
    );
  },
);
CandlestickChart.displayName = 'Chart.Candlestick';

/* ─── SparkLine ─────────────────────────────────────────────────────── */

/**
 * Compact inline sparkline chart (no axes, no tooltip).
 * Renders a tiny SVG line or bar chart from a plain number array.
 */
const SparkLine = React.forwardRef<SVGSVGElement, ChartSparkLineProps>(
  (
    {
      data,
      type = 'line',
      width = 120,
      height = 40,
      color = 'hsl(var(--chart-1))',
      strokeWidth = 1.5,
      area = true,
      showTooltip = false,
      showHighlight = false,
      yMin,
      yMax,
      className,
    },
    ref,
  ) => {
    const [hoverState, setHoverState] = React.useState<{
      index: number;
      x: number;
      y: number;
      value: number;
    } | null>(null);

    if (data.length === 0) {
      return <svg ref={ref} width={width} height={height} className={className} />;
    }

    const minVal = yMin !== undefined ? yMin : Math.min(...data);
    const maxVal = yMax !== undefined ? yMax : Math.max(...data);
    const range = maxVal - minVal || 1;

    const pad = 2;
    const innerW = width - pad * 2;
    const innerH = height - pad * 2;

    const toX = (i: number) => pad + (i / Math.max(data.length - 1, 1)) * innerW;
    const toY = (v: number) => pad + (1 - (v - minVal) / range) * innerH;

    if (type === 'bar') {
      const barWidth = Math.max(1, innerW / data.length - 1);
      return (
        <svg
          ref={ref}
          width={width}
          height={height}
          className={className}
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          {data.map((v, i) => {
            const barH = Math.max(1, ((v - minVal) / range) * innerH);
            const x = pad + (i / data.length) * innerW;
            const y = pad + innerH - barH;
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                fill={color}
                fillOpacity={0.8}
                rx={1}
              />
            );
          })}
        </svg>
      );
    }

    // Line sparkline
    const points = data.map((v, i) => `${fmt(toX(i))},${fmt(toY(v))}`).join(' ');
    const areaPoints = [
      `${fmt(toX(0))},${fmt(pad + innerH)}`,
      ...data.map((v, i) => `${fmt(toX(i))},${fmt(toY(v))}`),
      `${fmt(toX(data.length - 1))},${fmt(pad + innerH)}`,
    ].join(' ');

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
      if (!showTooltip && !showHighlight) return;
      const svgRect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - svgRect.left;
      // Find nearest data point
      let nearestIdx = 0;
      let minDist = Infinity;
      for (let i = 0; i < data.length; i++) {
        const px = toX(i);
        const d = Math.abs(px - mouseX);
        if (d < minDist) {
          minDist = d;
          nearestIdx = i;
        }
      }
      const val = data[nearestIdx];
      if (val !== undefined) {
        setHoverState({
          index: nearestIdx,
          x: toX(nearestIdx),
          y: toY(val),
          value: val,
        });
      }
    };

    const handleMouseLeave = () => setHoverState(null);

    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        className={className}
        aria-hidden="true"
        style={{ display: 'block', position: 'relative' }}
        onMouseMove={(showTooltip || showHighlight) ? handleMouseMove : undefined}
        onMouseLeave={(showTooltip || showHighlight) ? handleMouseLeave : undefined}
      >
        {area && (
          <polygon points={areaPoints} fill={color} fillOpacity={0.15} />
        )}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Highlight dot */}
        {showHighlight && hoverState && (
          <circle
            cx={hoverState.x}
            cy={hoverState.y}
            r={3}
            fill={color}
            stroke="white"
            strokeWidth={1.5}
          />
        )}
        {/* Simple tooltip label */}
        {showTooltip && hoverState && (
          <g>
            <rect
              x={Math.min(hoverState.x - 18, width - 40)}
              y={Math.max(hoverState.y - 22, 2)}
              width={36}
              height={16}
              rx={3}
              fill="currentColor"
              fillOpacity={0.75}
            />
            <text
              x={Math.min(hoverState.x, width - 22)}
              y={Math.max(hoverState.y - 10, 14)}
              textAnchor="middle"
              fontSize={9}
              fill="white"
              style={{ pointerEvents: 'none' }}
            >
              {hoverState.value}
            </text>
          </g>
        )}
      </svg>
    );
  },
);
SparkLine.displayName = 'Chart.SparkLine';

/* ─── RangeBar ──────────────────────────────────────────────────────── */

/**
 * Floating bar series — renders bars from yScale(low) to yScale(high).
 * Must be used inside Chart.Root.
 */
const RangeBar = React.forwardRef<SVGGElement, ChartRangeBarProps>(
  (
    {
      lowKey,
      highKey,
      color,
      name,
      radius = 3,
      className,
    },
    ref,
  ) => {
    const ctx = useCartesianContext('Chart.RangeBar');
    const {
      data,
      dimensions,
      xScale,
      yScale,
      xDataKey,
      isBand,
      bandWidth,
      palette,
    } = ctx;
    const { innerHeight: _innerHeight } = dimensions;

    const seriesIndex = ctx.registerSeries(name ?? lowKey);
    const resolvedColor =
      color ?? palette[seriesIndex % palette.length] ?? palette[0] ?? 'hsl(var(--chart-1))';

    return (
      <g ref={ref} className={className} aria-label={name ?? `${lowKey}–${highKey}`}>
        {data.map((row, i) => {
          const low = row[lowKey];
          const high = row[highKey];
          if (typeof low !== 'number' || typeof high !== 'number') return null;

          const xVal = isBand ? row[xDataKey] : i;
          const xCenter = xScale(xVal);
          const barW = isBand ? Math.max(1, bandWidth * 0.7) : Math.max(2, (bandWidth || 20) * 0.7);
          const yTop = yScale(Math.max(low, high));
          const yBottom = yScale(Math.min(low, high));
          const barH = Math.max(1, yBottom - yTop);
          const r = Math.min(radius, barH / 2, barW / 2);

          return (
            <rect
              key={i}
              x={xCenter - barW / 2}
              y={yTop}
              width={barW}
              height={barH}
              rx={r}
              ry={r}
              fill={resolvedColor}
              fillOpacity={0.8}
              aria-label={`${name ?? `${lowKey}–${highKey}`}: ${low}–${high}`}
            />
          );
        })}
      </g>
    );
  },
);
RangeBar.displayName = 'Chart.RangeBar';

/* ─── ReferenceLine ─────────────────────────────────────────────────── */

/**
 * Horizontal or vertical reference line drawn across the plot area.
 * Must be used inside Chart.Root.
 */
const ReferenceLine = React.forwardRef<SVGGElement, ChartReferenceLineProps>(
  (
    {
      y: yValue,
      x: xValue,
      label,
      stroke = 'hsl(var(--chart-5, 340 75% 55%))',
      strokeDasharray = '4 4',
      className,
    },
    ref,
  ) => {
    const ctx = useCartesianContext('Chart.ReferenceLine');
    const { dimensions, yScale, xScale } = ctx;
    const { innerWidth, innerHeight } = dimensions;

    if (yValue !== undefined) {
      const y = yScale(yValue);
      return (
        <g ref={ref} className={className} aria-label={label ? `Reference: ${label}` : 'Reference line'}>
          <line
            x1={0}
            y1={y}
            x2={innerWidth}
            y2={y}
            stroke={stroke}
            strokeWidth={1.5}
            strokeDasharray={strokeDasharray}
          />
          {label && (
            <text
              x={innerWidth}
              y={y - 4}
              textAnchor="end"
              fontSize={11}
              fill={stroke}
              fillOpacity={0.85}
            >
              {label}
            </text>
          )}
        </g>
      );
    }

    if (xValue !== undefined) {
      const x = xScale(xValue);
      return (
        <g ref={ref} className={className} aria-label={label ? `Reference: ${label}` : 'Reference line'}>
          <line
            x1={x}
            y1={0}
            x2={x}
            y2={innerHeight}
            stroke={stroke}
            strokeWidth={1.5}
            strokeDasharray={strokeDasharray}
          />
          {label && (
            <text
              x={x + 4}
              y={8}
              textAnchor="start"
              fontSize={11}
              fill={stroke}
              fillOpacity={0.85}
            >
              {label}
            </text>
          )}
        </g>
      );
    }

    return null;
  },
);
ReferenceLine.displayName = 'Chart.ReferenceLine';

/* ─── ReferenceArea ─────────────────────────────────────────────────── */

/**
 * Shaded rectangular region drawn on the plot area.
 * Must be used inside Chart.Root.
 */
const ReferenceArea = React.forwardRef<SVGGElement, ChartReferenceAreaProps>(
  (
    {
      y1: y1Prop,
      y2: y2Prop,
      x1: x1Prop,
      x2: x2Prop,
      fill = 'hsl(var(--chart-1))',
      fillOpacity = 0.15,
      className,
    },
    ref,
  ) => {
    const ctx = useCartesianContext('Chart.ReferenceArea');
    const { dimensions, yScale, xScale } = ctx;
    const { innerWidth, innerHeight } = dimensions;

    const x1 = x1Prop !== undefined ? xScale(x1Prop) : 0;
    const x2 = x2Prop !== undefined ? xScale(x2Prop) : innerWidth;
    const y1 = y1Prop !== undefined ? yScale(y1Prop) : 0;
    const y2 = y2Prop !== undefined ? yScale(y2Prop) : innerHeight;

    const rectX = Math.min(x1, x2);
    const rectY = Math.min(y1, y2);
    const rectW = Math.abs(x2 - x1);
    const rectH = Math.abs(y2 - y1);

    return (
      <g ref={ref} className={className} aria-hidden="true">
        <rect
          x={rectX}
          y={rectY}
          width={rectW}
          height={rectH}
          fill={fill}
          fillOpacity={fillOpacity}
        />
      </g>
    );
  },
);
ReferenceArea.displayName = 'Chart.ReferenceArea';

/* ─── RadialBar context ─────────────────────────────────────────────── */

interface RadialBarContextValue {
  data: Record<string, unknown>[];
  cx: number;
  cy: number;
  maxRadius: number;
  palette: string[];
  gap: number;
}

const [RadialBarProvider, useRadialBarContext] =
  createContext<RadialBarContextValue>('ChartRadialBar');

/* ─── RadialBarRoot ─────────────────────────────────────────────────── */

/**
 * Root container for radial bar (polar bar) charts.
 */
const RadialBarRoot = React.forwardRef<HTMLDivElement, ChartRadialBarRootProps>(
  (
    {
      data,
      width = 400,
      height = 400,
      gap = 4,
      className,
      accessibilityLabel = 'Radial bar chart',
      children,
    },
    ref,
  ) => {
    const cx = width / 2;
    const cy = height / 2;
    const maxRadius = Math.min(cx, cy) * 0.95;

    return (
      <RadialBarProvider
        data={data as Record<string, unknown>[]}
        cx={cx}
        cy={cy}
        maxRadius={maxRadius}
        palette={DEFAULT_PALETTE}
        gap={gap}
      >
        <div ref={ref} className={className} style={{ display: 'inline-block' }}>
          <svg
            role="img"
            aria-label={accessibilityLabel}
            width={width}
            height={height}
            style={{ display: 'block' }}
          >
            <title>{accessibilityLabel}</title>
            {children}
          </svg>
        </div>
      </RadialBarProvider>
    );
  },
);
RadialBarRoot.displayName = 'Chart.RadialBarRoot';

/* ─── RadialBar ─────────────────────────────────────────────────────── */

/**
 * Radial bar series — each data row gets one arc at a different radius level.
 * Must be used inside Chart.RadialBarRoot.
 */
const RadialBar = React.forwardRef<SVGGElement, ChartRadialBarProps>(
  (
    {
      dataKey,
      nameKey = 'name',
      colors,
      innerRadius: innerRadiusFraction = 0.2,
      outerRadius: outerRadiusFraction = 0.9,
      layout = 'vertical',
      className,
    },
    ref,
  ) => {
    const ctx = useRadialBarContext('Chart.RadialBar');
    const { data, cx, cy, maxRadius, palette, gap } = ctx;

    const resolvedColors = colors ?? palette;

    if (data.length === 0) return null;

    const values = data.map((row) => {
      const v = row[dataKey];
      return typeof v === 'number' ? v : 0;
    });
    const maxValue = Math.max(...values, 1);

    const outerR = maxRadius * outerRadiusFraction;
    const innerR = maxRadius * innerRadiusFraction;
    const totalThickness = outerR - innerR;
    const trackThickness = Math.max(1, (totalThickness - gap * (data.length - 1)) / data.length);
    const barThickness = trackThickness;

    // Full arc: -90deg (top) to 270deg (full circle) → in radians: -π/2 to 3π/2
    const startAngle = -Math.PI / 2;
    const fullAngle = 2 * Math.PI;

    return (
      <g ref={ref} className={className}>
        {data.map((row, i) => {
          const value = values[i] ?? 0;
          const fraction = value / maxValue;
          const trackOuterR = outerR - i * (trackThickness + gap);
          const trackInnerR = trackOuterR - barThickness;
          const fillColor =
            resolvedColors[i % resolvedColors.length] ??
            resolvedColors[0] ??
            'hsl(var(--chart-1))';
          const label = String(row[nameKey] ?? i);

          let trackPath: string;
          let fillPath: string;

          if (layout === 'horizontal') {
            // Horizontal layout: angle sweeps from start by fraction of full circle
            const fullEnd = startAngle + fullAngle - 0.001;
            const fillEnd = startAngle + fullAngle * fraction;
            trackPath = buildRadialArcPath(cx, cy, trackOuterR, trackInnerR, startAngle, fullEnd);
            fillPath = fraction > 0 ? buildRadialArcPath(cx, cy, trackOuterR, trackInnerR, startAngle, fillEnd) : '';
          } else {
            // Vertical layout (default): radius encodes value — all bars same angle, but different radius
            // Track: full circle
            const fullEnd = startAngle + fullAngle - 0.001;
            const scaledOuterR = trackInnerR + barThickness * fraction;
            trackPath = buildRadialArcPath(cx, cy, trackOuterR, trackInnerR, startAngle, fullEnd);
            fillPath = fraction > 0 ? buildRadialArcPath(cx, cy, scaledOuterR, trackInnerR, startAngle, fullEnd) : '';
          }

          return (
            <g key={i} aria-label={`${label}: ${value}`}>
              {/* Track */}
              <path
                d={trackPath}
                fill="currentColor"
                fillOpacity={0.07}
              />
              {/* Fill */}
              {fillPath && (
                <path
                  d={fillPath}
                  fill={fillColor}
                  fillOpacity={0.85}
                  style={{ transition: 'd 400ms ease' }}
                />
              )}
              {/* Label */}
              {trackOuterR > 20 && (
                <text
                  x={cx}
                  y={cy - (trackOuterR + trackInnerR) / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={10}
                  fill="currentColor"
                  fillOpacity={0.6}
                  style={{ pointerEvents: 'none' }}
                >
                  {label}
                </text>
              )}
            </g>
          );
        })}
      </g>
    );
  },
);
RadialBar.displayName = 'Chart.RadialBar';

/**
 * Build a donut arc SVG path from startAngle to endAngle.
 * Angles are in radians, measured from SVG convention (right = 0).
 */
function buildRadialArcPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startRad: number,
  endRad: number,
): string {
  const sweep = endRad - startRad;
  const largeArc = Math.abs(sweep) > Math.PI ? 1 : 0;
  const sweepDir = sweep > 0 ? 1 : 0;

  const ox1 = cx + outerR * Math.cos(startRad);
  const oy1 = cy + outerR * Math.sin(startRad);
  const ox2 = cx + outerR * Math.cos(endRad);
  const oy2 = cy + outerR * Math.sin(endRad);
  const ix1 = cx + innerR * Math.cos(endRad);
  const iy1 = cy + innerR * Math.sin(endRad);
  const ix2 = cx + innerR * Math.cos(startRad);
  const iy2 = cy + innerR * Math.sin(startRad);

  return [
    `M ${fmt(ox1)} ${fmt(oy1)}`,
    `A ${fmt(outerR)} ${fmt(outerR)} 0 ${largeArc} ${sweepDir} ${fmt(ox2)} ${fmt(oy2)}`,
    `L ${fmt(ix1)} ${fmt(iy1)}`,
    `A ${fmt(innerR)} ${fmt(innerR)} 0 ${largeArc} ${sweepDir === 1 ? 0 : 1} ${fmt(ix2)} ${fmt(iy2)}`,
    'Z',
  ].join(' ');
}

/* ─── Standalone: Waterfall ─────────────────────────────────────────── */

/**
 * Waterfall chart — bars start where the previous bar ended.
 * Positive values go up, negative go down. Connector lines link bars.
 */
const Waterfall = React.forwardRef<HTMLDivElement, ChartWaterfallProps>(
  (
    {
      data,
      width = 500,
      height = 300,
      margin: marginProp,
      className,
      accessibilityLabel = 'Waterfall chart',
    },
    ref,
  ) => {
    const margin: ChartMargin = { top: 20, right: 20, bottom: 40, left: 50, ...marginProp };
    const innerWidth = Math.max(0, width - margin.left - margin.right);
    const innerHeight = Math.max(0, height - margin.top - margin.bottom);

    if (data.length === 0) {
      return <div ref={ref} className={className} />;
    }

    // Compute running totals
    const bars: {
      name: string;
      value: number;
      start: number;
      end: number;
      color?: string;
    }[] = [];

    let running = 0;
    for (const item of data) {
      const start = running;
      const end = running + item.value;
      bars.push({ name: item.name, value: item.value, start, end, color: item.color });
      running = end;
    }

    // Y domain
    const allY = bars.flatMap((b) => [b.start, b.end]);
    const yMin = Math.min(0, ...allY);
    const yMax = Math.max(0, ...allY);
    const yPad = (yMax - yMin) * 0.1 || 1;
    const yDomain: [number, number] = [yMin - yPad, yMax + yPad];

    const xScale = bandScale(
      data.map((d) => d.name),
      [0, innerWidth],
    );
    const yScale = linearScale(yDomain, [innerHeight, 0]);
    const y0 = yScale(0);

    const barW = xScale.bandwidth * 0.7;

    return (
      <div ref={ref} className={className} style={{ display: 'inline-block' }}>
        <svg
          role="img"
          aria-label={accessibilityLabel}
          width={width}
          height={height}
          style={{ display: 'block' }}
        >
          <title>{accessibilityLabel}</title>
          <g transform={`translate(${margin.left},${margin.top})`}>
            {/* Zero line */}
            <line
              x1={0}
              y1={y0}
              x2={innerWidth}
              y2={y0}
              stroke="currentColor"
              strokeOpacity={0.25}
            />
            {/* Bars */}
            {bars.map((bar, i) => {
              const xPos = xScale.scale(bar.name) + (xScale.bandwidth - barW) / 2;
              const yTop = yScale(Math.max(bar.start, bar.end));
              const yBottom = yScale(Math.min(bar.start, bar.end));
              const barH = Math.max(1, yBottom - yTop);
              const isPositive = bar.value >= 0;
              const defaultColor = isPositive
                ? DEFAULT_PALETTE[1] ?? 'hsl(var(--chart-2))'
                : DEFAULT_PALETTE[4] ?? 'hsl(var(--chart-5))';
              const fill = bar.color ?? defaultColor;

              // Connector line to next bar
              const nextBar = bars[i + 1];
              const connectorY = yScale(bar.end);

              return (
                <g key={i}>
                  <rect
                    x={xPos}
                    y={yTop}
                    width={barW}
                    height={barH}
                    fill={fill}
                    fillOpacity={0.85}
                    rx={3}
                    aria-label={`${bar.name}: ${bar.value >= 0 ? '+' : ''}${bar.value}`}
                  />
                  {/* Value label */}
                  <text
                    x={xPos + barW / 2}
                    y={yTop - 4}
                    textAnchor="middle"
                    fontSize={11}
                    fill="currentColor"
                    fillOpacity={0.75}
                  >
                    {bar.value >= 0 ? '+' : ''}{bar.value}
                  </text>
                  {/* Connector */}
                  {nextBar && (
                    <line
                      x1={xPos + barW}
                      y1={connectorY}
                      x2={xScale.scale(nextBar.name) + (xScale.bandwidth - barW) / 2}
                      y2={connectorY}
                      stroke="currentColor"
                      strokeOpacity={0.35}
                      strokeDasharray="3 3"
                      strokeWidth={1}
                    />
                  )}
                  {/* X label */}
                  <text
                    x={xPos + barW / 2}
                    y={innerHeight + 16}
                    textAnchor="middle"
                    fontSize={11}
                    fill="currentColor"
                    fillOpacity={0.65}
                  >
                    {bar.name}
                  </text>
                </g>
              );
            })}
            {/* Y axis ticks */}
            {niceLinearTicks(yDomain[0], yDomain[1], 5).map((tick) => {
              const y = yScale(tick);
              return (
                <g key={tick} transform={`translate(0, ${y})`}>
                  <line x1={-4} y1={0} x2={0} y2={0} stroke="currentColor" strokeOpacity={0.4} />
                  <text
                    x={-8}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize={10}
                    fill="currentColor"
                    fillOpacity={0.6}
                  >
                    {tick >= 1000 ? `${(tick / 1000).toFixed(1)}k` : tick}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    );
  },
);
Waterfall.displayName = 'Chart.Waterfall';

/* ─── Standalone: Sankey ────────────────────────────────────────────── */

interface SankeyLayoutNode extends SankeyNode {
  layer: number;
  x: number;
  y: number;
  nodeHeight: number;
  totalIn: number;
  totalOut: number;
  inOffset: number;
  outOffset: number;
}

/**
 * Basic Sankey diagram — nodes + bezier curved links proportional to value.
 */
const Sankey = React.forwardRef<HTMLDivElement, ChartSankeyProps>(
  (
    {
      nodes,
      links,
      width = 600,
      height = 400,
      nodePadding = 8,
      nodeWidth = 24,
      nodeAlignment = 'justify',
      showLinkValues = false,
      className,
      accessibilityLabel = 'Sankey diagram',
    },
    ref,
  ) => {
    // BFS to compute layers
    const nodeMap = new Map<string, SankeyLayoutNode>();
    for (const n of nodes) {
      nodeMap.set(n.id, {
        ...n,
        layer: -1,
        x: 0,
        y: 0,
        nodeHeight: 0,
        totalIn: 0,
        totalOut: 0,
        inOffset: 0,
        outOffset: 0,
      });
    }

    // Accumulate link values
    for (const link of links) {
      const src = nodeMap.get(link.source);
      const tgt = nodeMap.get(link.target);
      if (src) src.totalOut += link.value;
      if (tgt) tgt.totalIn += link.value;
    }

    // BFS forward layer assignment (min distance from source)
    const targets = new Set(links.map((l) => l.target));
    const sources = nodes.filter((n) => !targets.has(n.id)).map((n) => n.id);

    const queue: string[] = [...sources];
    for (const id of queue) {
      const node = nodeMap.get(id);
      if (!node) continue;
      if (node.layer === -1) node.layer = 0;
      for (const link of links) {
        if (link.source === id) {
          const tgt = nodeMap.get(link.target);
          if (tgt) {
            tgt.layer = Math.max(tgt.layer, node.layer + 1);
            if (!queue.includes(link.target)) queue.push(link.target);
          }
        }
      }
    }

    // Group by layer
    const layers = new Map<number, SankeyLayoutNode[]>();
    for (const node of nodeMap.values()) {
      const l = node.layer < 0 ? 0 : node.layer;
      node.layer = l;
      if (!layers.has(l)) layers.set(l, []);
      layers.get(l)!.push(node);
    }

    const maxLayer = Math.max(...Array.from(layers.keys()));
    const _numLayers = maxLayer + 1;
    const sankeyMargin = { top: 10, right: 10, bottom: 10, left: 10 };
    const innerW = width - sankeyMargin.left - sankeyMargin.right;
    const innerH = height - sankeyMargin.top - sankeyMargin.bottom;

    // Apply nodeAlignment: 'left' = min BFS layer (already done), 'right' = max dist from sink,
    // 'justify' = source left, sink right (default behavior), 'center' = center intermediates
    if (nodeAlignment === 'right') {
      // Reverse BFS: compute max distance from sinks
      const sinkIds = new Set(
        Array.from(nodeMap.keys()).filter((id) => !links.some((l) => l.source === id)),
      );
      // Reset layers and recompute from sinks backwards
      for (const node of nodeMap.values()) node.layer = -1;
      const rqueue = Array.from(sinkIds);
      for (const id of rqueue) {
        const node = nodeMap.get(id);
        if (!node) continue;
        if (node.layer === -1) node.layer = 0;
        for (const link of links) {
          if (link.target === id) {
            const src = nodeMap.get(link.source);
            if (src) {
              src.layer = Math.max(src.layer, node.layer + 1);
              if (!rqueue.includes(link.source)) rqueue.push(link.source);
            }
          }
        }
      }
      // Flip: layer = maxLayer - layer
      const newMax = Math.max(...Array.from(nodeMap.values()).map((n) => n.layer), 0);
      for (const node of nodeMap.values()) node.layer = newMax - node.layer;
    } else if (nodeAlignment === 'center') {
      // Center: average of min forward and max backward distance
      const fwdLayer = new Map<string, number>();
      for (const [id, node] of nodeMap) fwdLayer.set(id, node.layer);
      // Just keep existing BFS layers as is; center intermediates won't move sources/sinks
    }
    // 'left' is already the default BFS assignment (min distance)
    // 'justify': sources at 0, sinks at maxLayer (default BFS already does this)

    // Rebuild layers map after alignment adjustments
    layers.clear();
    for (const node of nodeMap.values()) {
      const l = node.layer < 0 ? 0 : node.layer;
      node.layer = l;
      if (!layers.has(l)) layers.set(l, []);
      layers.get(l)!.push(node);
    }

    const newMaxLayer = Math.max(...Array.from(layers.keys()));
    const newNumLayers = newMaxLayer + 1;

    // X positions per layer
    const layerX = (layer: number) =>
      sankeyMargin.left + (newNumLayers <= 1 ? 0 : (layer / (newNumLayers - 1)) * (innerW - nodeWidth));

    // Total value for scaling
    const totalValue = Math.max(
      1,
      ...Array.from(layers.values()).map((layerNodes) =>
        layerNodes.reduce((s, n) => s + Math.max(n.totalIn, n.totalOut), 0),
      ),
    );

    // Compute node heights and y positions
    for (const [, layerNodes] of layers) {
      const totalHeight =
        layerNodes.reduce((s, n) => s + Math.max(n.totalIn, n.totalOut, 1), 0) /
        totalValue *
        innerH;
      const availH = Math.min(innerH, totalHeight + nodePadding * (layerNodes.length - 1));
      const scale = availH / (totalHeight + nodePadding * (layerNodes.length - 1)) || 1;

      let yOffset = sankeyMargin.top;
      for (const node of layerNodes) {
        node.x = layerX(node.layer);
        node.nodeHeight = Math.max(
          8,
          (Math.max(node.totalIn, node.totalOut, 1) / totalValue) * innerH * scale,
        );
        node.y = yOffset;
        yOffset += node.nodeHeight + nodePadding;
        node.inOffset = 0;
        node.outOffset = 0;
      }
    }

    // Build link paths
    const linkPaths: { path: string; color: string; opacity: number; value: number; key: string; midX: number; midY: number }[] = [];

    for (const link of links) {
      const src = nodeMap.get(link.source);
      const tgt = nodeMap.get(link.target);
      if (!src || !tgt) continue;

      const totalVal = Math.max(
        1,
        Math.max(src.totalOut, src.totalIn, 1),
      );
      const linkThickness = Math.max(
        2,
        (link.value / totalVal) * src.nodeHeight,
      );

      const x1 = src.x + nodeWidth;
      const y1 = src.y + src.outOffset + linkThickness / 2;
      src.outOffset += linkThickness;

      const x2 = tgt.x;
      const y2 = tgt.y + tgt.inOffset + linkThickness / 2;
      tgt.inOffset += linkThickness;

      const cpx = (x1 + x2) / 2;

      const path = [
        `M ${fmt(x1)} ${fmt(y1 - linkThickness / 2)}`,
        `C ${fmt(cpx)} ${fmt(y1 - linkThickness / 2)}, ${fmt(cpx)} ${fmt(y2 - linkThickness / 2)}, ${fmt(x2)} ${fmt(y2 - linkThickness / 2)}`,
        `L ${fmt(x2)} ${fmt(y2 + linkThickness / 2)}`,
        `C ${fmt(cpx)} ${fmt(y2 + linkThickness / 2)}, ${fmt(cpx)} ${fmt(y1 + linkThickness / 2)}, ${fmt(x1)} ${fmt(y1 + linkThickness / 2)}`,
        'Z',
      ].join(' ');

      linkPaths.push({
        path,
        color: src.color ?? DEFAULT_PALETTE[Array.from(nodeMap.keys()).indexOf(link.source) % DEFAULT_PALETTE.length] ?? 'hsl(var(--chart-1))',
        opacity: 0.35,
        value: link.value,
        key: `${link.source}-${link.target}`,
        midX: cpx,
        midY: (y1 + y2) / 2,
      });
    }

    return (
      <div ref={ref} className={className} style={{ display: 'inline-block' }}>
        <svg
          role="img"
          aria-label={accessibilityLabel}
          width={width}
          height={height}
          style={{ display: 'block' }}
        >
          <title>{accessibilityLabel}</title>
          {/* Links */}
          {linkPaths.map((lp) => (
            <g key={lp.key}>
              <path
                d={lp.path}
                fill={lp.color}
                fillOpacity={lp.opacity}
                stroke="none"
              />
              {showLinkValues && (
                <text
                  x={lp.midX}
                  y={lp.midY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={10}
                  fill="currentColor"
                  fillOpacity={0.75}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {lp.value}
                </text>
              )}
            </g>
          ))}
          {/* Nodes */}
          {Array.from(nodeMap.values()).map((node, i) => {
            const fill =
              node.color ??
              DEFAULT_PALETTE[i % DEFAULT_PALETTE.length] ??
              'hsl(var(--chart-1))';
            return (
              <g key={node.id} aria-label={node.id}>
                <rect
                  x={node.x}
                  y={node.y}
                  width={nodeWidth}
                  height={node.nodeHeight}
                  fill={fill}
                  rx={3}
                />
                <text
                  x={node.x < width / 2 ? node.x + nodeWidth + 4 : node.x - 4}
                  y={node.y + node.nodeHeight / 2}
                  textAnchor={node.x < width / 2 ? 'start' : 'end'}
                  dominantBaseline="middle"
                  fontSize={11}
                  fill="currentColor"
                  fillOpacity={0.8}
                >
                  {node.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  },
);
Sankey.displayName = 'Chart.Sankey';

/* ─── Standalone: Pyramid ───────────────────────────────────────────── */

/**
 * Pyramid chart — like Funnel but widest at bottom (rows reversed).
 * Shares the same funnel layout algorithm with reversed data order.
 */
const Pyramid = React.forwardRef<HTMLDivElement, ChartPyramidProps>(
  (
    {
      data,
      width = 400,
      height = 300,
      labelPosition: _labelPosition = 'center',
      className,
      accessibilityLabel = 'Pyramid chart',
      onSegmentClick,
    },
    ref,
  ) => {
    const margin: ChartMargin = { top: 10, right: 80, bottom: 10, left: 80 };
    const innerWidth = Math.max(0, width - margin.left - margin.right);
    const innerHeight = Math.max(0, height - margin.top - margin.bottom);

    // Reverse data so widest (largest) is at bottom
    const reversed = [...data].reverse();
    const segments = computeFunnelLayout(reversed, margin.left, margin.top, innerWidth, innerHeight, 4);

    return (
      <div ref={ref} className={className} style={{ display: 'inline-block' }}>
        <svg
          role="img"
          aria-label={accessibilityLabel}
          width={width}
          height={height}
          style={{ display: 'block' }}
        >
          <title>{accessibilityLabel}</title>
          {segments.map((seg, i) => {
            const originalIndex = data.length - 1 - i;
            const originalEntry = data[originalIndex];
            const fill =
              seg.color ??
              DEFAULT_PALETTE[i % DEFAULT_PALETTE.length] ??
              DEFAULT_PALETTE[0];
            const cx = (seg.x1 + seg.x2) / 2;
            const cy = (seg.y1 + seg.y2) / 2;

            return (
              <g key={i}>
                <path
                  d={seg.path}
                  fill={fill ?? DEFAULT_PALETTE[0]}
                  fillOpacity={0.85}
                  onClick={() => originalEntry && onSegmentClick?.(originalEntry, originalIndex)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (originalEntry) onSegmentClick?.(originalEntry, originalIndex); } }}
                  role={onSegmentClick ? 'button' : undefined}
                  tabIndex={onSegmentClick ? 0 : undefined}
                  aria-label={`${seg.name}: ${seg.value}`}
                  style={{ cursor: onSegmentClick ? 'pointer' : 'default', transition: 'fill-opacity 150ms' }}
                />
                <text
                  x={cx}
                  y={cy - 6}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={13}
                  fontWeight={600}
                  fill="white"
                  style={{ pointerEvents: 'none' }}
                >
                  {seg.name}
                </text>
                <text
                  x={cx}
                  y={cy + 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={11}
                  fill="white"
                  fillOpacity={0.85}
                  style={{ pointerEvents: 'none' }}
                >
                  {seg.value.toLocaleString()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  },
);
Pyramid.displayName = 'Chart.Pyramid';

/* ─── Standalone: Gantt ─────────────────────────────────────────────── */

/**
 * Gantt chart — horizontal bars on a numeric time axis.
 * Each task gets its own row.
 */
const Gantt = React.forwardRef<HTMLDivElement, ChartGanttProps>(
  (
    {
      tasks,
      width = 600,
      height = 300,
      margin: marginProp,
      className,
      accessibilityLabel = 'Gantt chart',
    },
    ref,
  ) => {
    const margin: ChartMargin = { top: 10, right: 20, bottom: 30, left: 120, ...marginProp };
    const innerWidth = Math.max(0, width - margin.left - margin.right);
    const innerHeight = Math.max(0, height - margin.top - margin.bottom);

    if (tasks.length === 0) {
      return <div ref={ref} className={className} />;
    }

    const timeMin = Math.min(...tasks.map((t) => t.start));
    const timeMax = Math.max(...tasks.map((t) => t.end));
    const timePad = (timeMax - timeMin) * 0.02 || 1;
    const timeDomain: [number, number] = [timeMin - timePad, timeMax + timePad];

    const xScale = linearScale(timeDomain, [0, innerWidth]);
    const rowHeight = Math.max(12, innerHeight / tasks.length - 4);
    const barPad = Math.min(4, rowHeight * 0.15);

    const timeTicks = niceLinearTicks(timeDomain[0], timeDomain[1], 6);

    return (
      <div ref={ref} className={className} style={{ display: 'inline-block' }}>
        <svg
          role="img"
          aria-label={accessibilityLabel}
          width={width}
          height={height}
          style={{ display: 'block' }}
        >
          <title>{accessibilityLabel}</title>
          <g transform={`translate(${margin.left},${margin.top})`}>
            {/* Vertical grid lines */}
            {timeTicks.map((tick) => (
              <line
                key={tick}
                x1={xScale(tick)}
                y1={0}
                x2={xScale(tick)}
                y2={innerHeight}
                stroke="currentColor"
                strokeOpacity={0.1}
                strokeDasharray="3 3"
              />
            ))}
            {/* Task bars */}
            {tasks.map((task, i) => {
              const y = i * (rowHeight + barPad);
              const x = xScale(task.start);
              const barW = Math.max(2, xScale(task.end) - xScale(task.start));
              const fill =
                task.color ??
                DEFAULT_PALETTE[i % DEFAULT_PALETTE.length] ??
                DEFAULT_PALETTE[0] ??
                'hsl(var(--chart-1))';

              return (
                <g key={task.id} aria-label={`${task.name}: ${task.start}–${task.end}`}>
                  {/* Row label */}
                  <text
                    x={-8}
                    y={y + rowHeight / 2}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize={11}
                    fill="currentColor"
                    fillOpacity={0.75}
                  >
                    {task.name}
                  </text>
                  {/* Bar */}
                  <rect
                    x={x}
                    y={y}
                    width={barW}
                    height={rowHeight}
                    fill={fill}
                    fillOpacity={0.85}
                    rx={3}
                  />
                  {/* Inline label if bar is wide enough */}
                  {barW > 40 && (
                    <text
                      x={x + barW / 2}
                      y={y + rowHeight / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={10}
                      fill="white"
                      fillOpacity={0.9}
                      style={{ pointerEvents: 'none' }}
                    >
                      {task.name}
                    </text>
                  )}
                </g>
              );
            })}
            {/* X axis */}
            <g transform={`translate(0, ${innerHeight})`}>
              <line x1={0} y1={0} x2={innerWidth} y2={0} stroke="currentColor" strokeOpacity={0.3} />
              {timeTicks.map((tick) => (
                <g key={tick} transform={`translate(${xScale(tick)}, 0)`}>
                  <line y1={0} y2={4} stroke="currentColor" strokeOpacity={0.5} />
                  <text
                    y={16}
                    textAnchor="middle"
                    fontSize={10}
                    fill="currentColor"
                    fillOpacity={0.6}
                  >
                    {tick}
                  </text>
                </g>
              ))}
            </g>
          </g>
        </svg>
      </div>
    );
  },
);
Gantt.displayName = 'Chart.Gantt';

/* ─── RadialLine context ────────────────────────────────────────────── */

interface RadialLineContextValue {
  data: Record<string, unknown>[];
  cx: number;
  cy: number;
  radius: number;
  nameKeys: string[];
  palette: string[];
}

const [RadialLineProvider, useRadialLineContext] =
  createContext<RadialLineContextValue>('ChartRadialLine');

/* ─── RadialLineRoot ────────────────────────────────────────────────── */

const RadialLineRoot = React.forwardRef<HTMLDivElement, ChartRadialLineRootProps>(
  (
    {
      data,
      width = 400,
      height = 400,
      className,
      accessibilityLabel = 'Radial line chart',
      children,
    },
    ref,
  ) => {
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(cx, cy) * 0.8;
    const rows = data as Record<string, unknown>[];

    // Derive nameKey from the RadialLine child prop (default 'name')
    let nameKey = 'name';
    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement(child) &&
        (child.type as { displayName?: string })?.displayName === 'Chart.RadialLine'
      ) {
        const nk = (child.props as ChartRadialLineProps).nameKey;
        if (nk) nameKey = nk;
      }
    });

    const nameKeys: string[] = [];
    rows.forEach((d) => {
      const val = d[nameKey];
      const key = typeof val === 'string' || typeof val === 'number' ? String(val) : null;
      if (key !== null && !nameKeys.includes(key)) nameKeys.push(key);
    });

    const [tooltip, setTooltip] = React.useState<TooltipState>(TOOLTIP_HIDDEN);
    const { svgChildren, overlayChildren } = splitChildren(children);
    const legendEntries = collectRadarLegendEntries(children);

    const legendPosition = ((): 'top' | 'bottom' | 'left' | 'right' => {
      let pos: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) &&
          (child.type as { displayName?: string })?.displayName === 'Chart.Legend') {
          pos = (child.props as ChartLegendProps).position ?? 'bottom';
        }
      });
      return pos;
    })();
    const isRow = legendPosition === 'left' || legendPosition === 'right';

    return (
      <SharedTooltipProvider tooltip={tooltip} setTooltip={setTooltip} legendEntries={legendEntries}>
        <RadialLineProvider
          data={rows}
          cx={cx}
          cy={cy}
          radius={radius}
          nameKeys={nameKeys}
          palette={DEFAULT_PALETTE}
        >
          <div
            ref={ref}
            className={className}
            style={{
              position: 'relative',
              display: 'inline-flex',
              flexDirection: isRow ? 'row' : 'column',
              alignItems: 'center',
            }}
          >
            <svg
              role="img"
              aria-label={accessibilityLabel}
              width={width}
              height={height}
              style={{ display: 'block', flexShrink: 0 }}
            >
              <title>{accessibilityLabel}</title>
              {svgChildren}
            </svg>
            {overlayChildren}
          </div>
        </RadialLineProvider>
      </SharedTooltipProvider>
    );
  },
);
RadialLineRoot.displayName = 'Chart.RadialLineRoot';

/* ─── RadialLine ────────────────────────────────────────────────────── */

const RadialLine = React.forwardRef<SVGGElement, ChartRadialLineProps>(
  (
    {
      dataKey,
      nameKey = 'name',
      color,
      curve = 'linear',
      closePath = true,
      area = false,
      fillOpacity = 0.2,
      dot = false,
      dotRadius = 3,
      strokeWidth = 2,
      className,
    },
    ref,
  ) => {
    const ctx = useRadialLineContext('Chart.RadialLine');
    const { data, cx, cy, radius, nameKeys, palette } = ctx;

    const resolvedColor = color ?? palette[0] ?? 'hsl(var(--chart-1))';

    const n = nameKeys.length;
    if (n === 0) return null;

    // Max value for normalization
    const values = nameKeys.map((key) => {
      const row = data.find((d) => String(d[nameKey]) === key);
      if (!row) return 0;
      const val = row[dataKey];
      return typeof val === 'number' ? val : 0;
    });
    const maxValue = Math.max(...values, 1);

    // Convert to polar points
    const polarPoints: [number, number][] = values.map((val, i) => {
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      const r = radius * (val / maxValue);
      return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
    });

    // Build line path — use curve interpolation for non-linear curves
    let pathD = '';
    if (polarPoints.length > 0) {
      if (curve === 'linear') {
        const first = polarPoints[0]!;
        pathD = `M ${fmt(first[0])} ${fmt(first[1])}`;
        for (let i = 1; i < polarPoints.length; i++) {
          const p = polarPoints[i]!;
          pathD += ` L ${fmt(p[0])} ${fmt(p[1])}`;
        }
        if (closePath) pathD += ' Z';
      } else {
        pathD = buildLinePath(polarPoints, curve);
        if (closePath && polarPoints.length > 0) pathD += ' Z';
      }
    }

    // Build area path (back through center)
    let areaD = '';
    if (area && polarPoints.length > 0) {
      areaD = `M ${cx} ${cy}`;
      for (const p of polarPoints) {
        areaD += ` L ${fmt(p[0])} ${fmt(p[1])}`;
      }
      areaD += ' Z';
    }

    return (
      <g ref={ref} className={className} aria-label={dataKey}>
        {area && areaD && (
          <path
            d={areaD}
            fill={resolvedColor}
            fillOpacity={fillOpacity}
          />
        )}
        <path
          d={pathD}
          fill="none"
          stroke={resolvedColor}
          strokeWidth={strokeWidth}
        />
        {dot &&
          polarPoints.map((p, i) => (
            <circle
              key={i}
              cx={p[0]}
              cy={p[1]}
              r={dotRadius}
              fill={resolvedColor}
              stroke="white"
              strokeWidth={1}
              aria-label={`${nameKeys[i]}: ${values[i]}`}
            />
          ))}
      </g>
    );
  },
);
RadialLine.displayName = 'Chart.RadialLine';

/* ─── Standalone: Histogram ─────────────────────────────────────────── */

const Histogram = React.forwardRef<HTMLDivElement, ChartHistogramProps>(
  (
    {
      data,
      bins: binCount = 10,
      color = 'hsl(var(--chart-1))',
      width = 500,
      height = 300,
      margin: marginProp,
      showGrid = true,
      className,
      accessibilityLabel = 'Histogram',
    },
    ref,
  ) => {
    const margin: ChartMargin = { top: 10, right: 20, bottom: 40, left: 50, ...marginProp };
    const innerWidth = Math.max(0, width - margin.left - margin.right);
    const innerHeight = Math.max(0, height - margin.top - margin.bottom);

    if (data.length === 0) {
      return <div ref={ref} className={className} />;
    }

    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);
    const binWidth = (maxVal - minVal) / binCount || 1;

    // Compute bins
    const binCounts: number[] = new Array(binCount).fill(0);
    for (const v of data) {
      const idx = Math.min(binCount - 1, Math.floor((v - minVal) / binWidth));
      binCounts[idx] = (binCounts[idx] ?? 0) + 1;
    }

    const maxCount = Math.max(...binCounts, 1);
    const yScale = linearScale([0, maxCount], [innerHeight, 0]);

    const barW = innerWidth / binCount;
    const yTicks = niceLinearTicks(0, maxCount, 5);

    return (
      <div ref={ref} className={className} style={{ display: 'inline-block' }}>
        <svg
          role="img"
          aria-label={accessibilityLabel}
          width={width}
          height={height}
          style={{ display: 'block' }}
        >
          <title>{accessibilityLabel}</title>
          <g transform={`translate(${margin.left},${margin.top})`}>
            {/* Grid */}
            {showGrid && yTicks.map((tick) => {
              const y = yScale(tick);
              return (
                <line
                  key={tick}
                  x1={0}
                  y1={y}
                  x2={innerWidth}
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity={0.1}
                  strokeDasharray="3 3"
                />
              );
            })}
            {/* Bars */}
            {binCounts.map((count, i) => {
              const x = i * barW;
              const barH = Math.max(0, innerHeight - yScale(count));
              const midpoint = minVal + (i + 0.5) * binWidth;

              return (
                <g key={i}>
                  <rect
                    x={x + 0.5}
                    y={yScale(count)}
                    width={Math.max(0, barW - 1)}
                    height={barH}
                    fill={color}
                    fillOpacity={0.8}
                    aria-label={`${midpoint.toFixed(1)}: ${count}`}
                  />
                </g>
              );
            })}
            {/* X axis */}
            <g transform={`translate(0, ${innerHeight})`}>
              <line x1={0} y1={0} x2={innerWidth} y2={0} stroke="currentColor" strokeOpacity={0.3} />
              {Array.from({ length: binCount + 1 }, (_, i) => {
                const val = minVal + i * binWidth;
                const x = (i / binCount) * innerWidth;
                return (
                  <g key={i} transform={`translate(${x}, 0)`}>
                    <line y1={0} y2={4} stroke="currentColor" strokeOpacity={0.5} />
                    {i % Math.max(1, Math.floor(binCount / 5)) === 0 && (
                      <text
                        y={16}
                        textAnchor="middle"
                        fontSize={10}
                        fill="currentColor"
                        fillOpacity={0.6}
                      >
                        {val.toFixed(1)}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
            {/* Y axis */}
            {yTicks.map((tick) => {
              const y = yScale(tick);
              return (
                <g key={tick} transform={`translate(0, ${y})`}>
                  <line x1={-4} y1={0} x2={0} y2={0} stroke="currentColor" strokeOpacity={0.5} />
                  <text
                    x={-8}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize={10}
                    fill="currentColor"
                    fillOpacity={0.6}
                  >
                    {tick}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    );
  },
);
Histogram.displayName = 'Chart.Histogram';

/* ─── Standalone: Boxplot ───────────────────────────────────────────── */

const Boxplot = React.forwardRef<HTMLDivElement, ChartBoxplotProps>(
  (
    {
      data,
      width = 500,
      height = 300,
      margin: marginProp,
      orientation = 'vertical',
      className,
      accessibilityLabel = 'Box plot',
    },
    ref,
  ) => {
    const margin: ChartMargin = { top: 20, right: 20, bottom: 40, left: 50, ...marginProp };
    const innerWidth = Math.max(0, width - margin.left - margin.right);
    const innerHeight = Math.max(0, height - margin.top - margin.bottom);

    if (data.length === 0) {
      return <div ref={ref} className={className} />;
    }

    const allVals = data.flatMap((d) => [d.min, d.q1, d.median, d.q3, d.max, ...(d.outliers ?? [])]);
    const yMin = Math.min(...allVals);
    const yMax = Math.max(...allVals);
    const yPad = (yMax - yMin) * 0.1 || 1;
    const yDomain: [number, number] = [yMin - yPad, yMax + yPad];

    const names = data.map((d) => d.name);

    const isHorizontal = orientation === 'horizontal';

    // Shared value scale
    const valueTicks = niceLinearTicks(yDomain[0], yDomain[1], 5);

    if (isHorizontal) {
      // Horizontal: categories on Y, values on X
      const yBand = bandScale(names, [0, innerHeight], 0.2, 0.2);
      const xValueScale = linearScale(yDomain, [0, innerWidth]);

      return (
        <div ref={ref} className={className} style={{ display: 'inline-block' }}>
          <svg role="img" aria-label={accessibilityLabel} width={width} height={height} style={{ display: 'block' }}>
            <title>{accessibilityLabel}</title>
            <g transform={`translate(${margin.left},${margin.top})`}>
              {/* X value axis */}
              {valueTicks.map((tick) => {
                const x = xValueScale(tick);
                return (
                  <g key={tick} transform={`translate(${x}, 0)`}>
                    <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="currentColor" strokeOpacity={0.08} />
                    <text x={0} y={innerHeight + 14} textAnchor="middle" fontSize={10} fill="currentColor" fillOpacity={0.6}>{tick}</text>
                  </g>
                );
              })}
              {/* Boxes */}
              {data.map((entry, i) => {
                const yCenter = yBand.scale(entry.name) + yBand.bandwidth / 2;
                const boxH = yBand.bandwidth * 0.6;
                const fillColor = entry.color ?? DEFAULT_PALETTE[i % DEFAULT_PALETTE.length] ?? 'hsl(var(--chart-1))';

                const xQ1 = xValueScale(entry.q1);
                const xQ3 = xValueScale(entry.q3);
                const xMedian = xValueScale(entry.median);
                const xMin_ = xValueScale(entry.min);
                const xMax_ = xValueScale(entry.max);

                return (
                  <g key={entry.name} aria-label={`${entry.name}: Q1=${entry.q1} Median=${entry.median} Q3=${entry.q3}`}>
                    <line x1={xMin_} y1={yCenter} x2={xQ1} y2={yCenter} stroke={fillColor} strokeWidth={1.5} strokeDasharray="4 2" />
                    <line x1={xMin_} y1={yCenter - boxH / 4} x2={xMin_} y2={yCenter + boxH / 4} stroke={fillColor} strokeWidth={1.5} />
                    <rect x={xQ1} y={yCenter - boxH / 2} width={Math.max(1, xQ3 - xQ1)} height={boxH} fill={fillColor} fillOpacity={0.3} stroke={fillColor} strokeWidth={1.5} />
                    <line x1={xMedian} y1={yCenter - boxH / 2} x2={xMedian} y2={yCenter + boxH / 2} stroke={fillColor} strokeWidth={2} />
                    <line x1={xQ3} y1={yCenter} x2={xMax_} y2={yCenter} stroke={fillColor} strokeWidth={1.5} strokeDasharray="4 2" />
                    <line x1={xMax_} y1={yCenter - boxH / 4} x2={xMax_} y2={yCenter + boxH / 4} stroke={fillColor} strokeWidth={1.5} />
                    {entry.outliers?.map((ov, oi) => (
                      <circle key={oi} cx={xValueScale(ov)} cy={yCenter} r={3} fill={fillColor} fillOpacity={0.6} stroke={fillColor} strokeWidth={1} />
                    ))}
                  </g>
                );
              })}
              {/* Y category axis */}
              <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="currentColor" strokeOpacity={0.3} />
              {names.map((name) => (
                <text key={name} x={-8} y={yBand.scale(name) + yBand.bandwidth / 2} textAnchor="end" dominantBaseline="middle" fontSize={11} fill="currentColor" fillOpacity={0.7}>{name}</text>
              ))}
            </g>
          </svg>
        </div>
      );
    }

    // ── Vertical (default) ──────────────────────────────────────────────
    const xBand = bandScale(names, [0, innerWidth], 0.2, 0.2);
    const yScale = linearScale(yDomain, [innerHeight, 0]);

    return (
      <div ref={ref} className={className} style={{ display: 'inline-block' }}>
        <svg
          role="img"
          aria-label={accessibilityLabel}
          width={width}
          height={height}
          style={{ display: 'block' }}
        >
          <title>{accessibilityLabel}</title>
          <g transform={`translate(${margin.left},${margin.top})`}>
            {/* Y axis */}
            {valueTicks.map((tick) => {
              const y = yScale(tick);
              return (
                <g key={tick} transform={`translate(0, ${y})`}>
                  <line x1={-4} y1={0} x2={innerWidth} y2={0} stroke="currentColor" strokeOpacity={0.08} />
                  <text
                    x={-8}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize={10}
                    fill="currentColor"
                    fillOpacity={0.6}
                  >
                    {tick}
                  </text>
                </g>
              );
            })}
            {/* Boxes */}
            {data.map((entry, i) => {
              const xCenter = xBand.scale(entry.name) + xBand.bandwidth / 2;
              const boxW = xBand.bandwidth * 0.6;
              const fillColor =
                entry.color ??
                DEFAULT_PALETTE[i % DEFAULT_PALETTE.length] ??
                'hsl(var(--chart-1))';

              const yQ1 = yScale(entry.q1);
              const yQ3 = yScale(entry.q3);
              const yMedian = yScale(entry.median);
              const yMin_ = yScale(entry.min);
              const yMax_ = yScale(entry.max);

              return (
                <g key={entry.name} aria-label={`${entry.name}: Q1=${entry.q1} Median=${entry.median} Q3=${entry.q3}`}>
                  {/* Whisker: min to Q1 */}
                  <line
                    x1={xCenter}
                    y1={yMin_}
                    x2={xCenter}
                    y2={yQ1}
                    stroke={fillColor}
                    strokeWidth={1.5}
                    strokeDasharray="4 2"
                  />
                  {/* Min cap */}
                  <line
                    x1={xCenter - boxW / 4}
                    y1={yMin_}
                    x2={xCenter + boxW / 4}
                    y2={yMin_}
                    stroke={fillColor}
                    strokeWidth={1.5}
                  />
                  {/* Box Q1–Q3 */}
                  <rect
                    x={xCenter - boxW / 2}
                    y={yQ3}
                    width={boxW}
                    height={Math.max(1, yQ1 - yQ3)}
                    fill={fillColor}
                    fillOpacity={0.3}
                    stroke={fillColor}
                    strokeWidth={1.5}
                  />
                  {/* Median line */}
                  <line
                    x1={xCenter - boxW / 2}
                    y1={yMedian}
                    x2={xCenter + boxW / 2}
                    y2={yMedian}
                    stroke={fillColor}
                    strokeWidth={2}
                  />
                  {/* Whisker: Q3 to max */}
                  <line
                    x1={xCenter}
                    y1={yQ3}
                    x2={xCenter}
                    y2={yMax_}
                    stroke={fillColor}
                    strokeWidth={1.5}
                    strokeDasharray="4 2"
                  />
                  {/* Max cap */}
                  <line
                    x1={xCenter - boxW / 4}
                    y1={yMax_}
                    x2={xCenter + boxW / 4}
                    y2={yMax_}
                    stroke={fillColor}
                    strokeWidth={1.5}
                  />
                  {/* Outliers */}
                  {entry.outliers?.map((ov, oi) => (
                    <circle
                      key={oi}
                      cx={xCenter}
                      cy={yScale(ov)}
                      r={3}
                      fill={fillColor}
                      fillOpacity={0.6}
                      stroke={fillColor}
                      strokeWidth={1}
                    />
                  ))}
                </g>
              );
            })}
            {/* X axis */}
            <g transform={`translate(0, ${innerHeight})`}>
              <line x1={0} y1={0} x2={innerWidth} y2={0} stroke="currentColor" strokeOpacity={0.3} />
              {names.map((name) => (
                <text
                  key={name}
                  x={xBand.scale(name) + xBand.bandwidth / 2}
                  y={18}
                  textAnchor="middle"
                  fontSize={11}
                  fill="currentColor"
                  fillOpacity={0.7}
                >
                  {name}
                </text>
              ))}
            </g>
          </g>
        </svg>
      </div>
    );
  },
);
Boxplot.displayName = 'Chart.Boxplot';

/* ─── Standalone: Sunburst ──────────────────────────────────────────── */

function sunburstTotalValue(node: SunburstNode): number {
  if (node.children && node.children.length > 0) {
    return node.children.reduce((s, c) => s + sunburstTotalValue(c), 0);
  }
  return node.value ?? 0;
}

interface SunburstLayoutNode {
  node: SunburstNode;
  startAngle: number;
  endAngle: number;
  depth: number;
  totalValue: number;
}

function layoutSunburst(
  node: SunburstNode,
  startAngle: number,
  endAngle: number,
  depth: number,
  result: SunburstLayoutNode[],
): void {
  result.push({ node, startAngle, endAngle, depth, totalValue: sunburstTotalValue(node) });
  if (!node.children || node.children.length === 0) return;
  const span = endAngle - startAngle;
  const total = node.children.reduce((s, c) => s + sunburstTotalValue(c), 0) || 1;
  let current = startAngle;
  for (const child of node.children) {
    const childVal = sunburstTotalValue(child);
    const childEnd = current + (childVal / total) * span;
    layoutSunburst(child, current, childEnd, depth + 1, result);
    current = childEnd;
  }
}

function maxDepth(node: SunburstNode, d = 0): number {
  if (!node.children || node.children.length === 0) return d;
  return Math.max(...node.children.map((c) => maxDepth(c, d + 1)));
}

const Sunburst = React.forwardRef<HTMLDivElement, ChartSunburstProps>(
  (
    {
      data,
      width = 400,
      height = 400,
      innerRadius = 0,
      className,
      accessibilityLabel = 'Sunburst chart',
      onNodeClick,
    },
    ref,
  ) => {
    const cx = width / 2;
    const cy = height / 2;
    const outerRadius = Math.min(cx, cy) * 0.95;

    const layoutNodes: SunburstLayoutNode[] = [];
    layoutSunburst(data, 0, 2 * Math.PI, 0, layoutNodes);
    const maxD = maxDepth(data);
    const ringThickness = maxD > 0 ? (outerRadius - innerRadius) / (maxD + 1) : outerRadius - innerRadius;

    return (
      <div ref={ref} className={className} style={{ display: 'inline-block' }}>
        <svg
          role="img"
          aria-label={accessibilityLabel}
          width={width}
          height={height}
          style={{ display: 'block' }}
        >
          <title>{accessibilityLabel}</title>
          {layoutNodes.map((item, i) => {
            const nodeOuterR = innerRadius + (item.depth + 1) * ringThickness;
            const nodeInnerR = innerRadius + item.depth * ringThickness;
            const fill =
              item.node.color ??
              DEFAULT_PALETTE[i % DEFAULT_PALETTE.length] ??
              'hsl(var(--chart-1))';

            // Skip root node if it's just a container
            if (item.depth === 0 && (!item.node.children || item.node.children.length === 0)) {
              return null;
            }

            const arcD = buildArcPath(
              cx,
              cy,
              nodeOuterR,
              nodeInnerR,
              item.startAngle,
              item.endAngle,
            );

            const midAngle = (item.startAngle + item.endAngle) / 2;
            const labelR = (nodeInnerR + nodeOuterR) / 2;
            const lx = Math.round((cx + labelR * Math.sin(midAngle)) * 1e4) / 1e4;
            const ly = Math.round((cy - labelR * Math.cos(midAngle)) * 1e4) / 1e4;
            const arcSpan = item.endAngle - item.startAngle;
            const showLabel = arcSpan > 0.25 && ringThickness > 14;

            return (
              <g key={i} aria-label={`${item.node.name}: ${item.totalValue}`}>
                <path
                  d={arcD}
                  fill={fill}
                  fillOpacity={0.85 - item.depth * 0.1}
                  stroke="white"
                  strokeWidth={1}
                  onClick={() => onNodeClick?.(item.node)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNodeClick?.(item.node); } }}
                  role={onNodeClick ? 'button' : undefined}
                  tabIndex={onNodeClick ? 0 : undefined}
                  style={{ cursor: onNodeClick ? 'pointer' : 'default' }}
                />
                {showLabel && (
                  <text
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={Math.min(11, ringThickness * 0.5)}
                    fill="white"
                    fillOpacity={0.9}
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {item.node.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    );
  },
);
Sunburst.displayName = 'Chart.Sunburst';

/* ─── Standalone: Chord ─────────────────────────────────────────────── */

const Chord = React.forwardRef<HTMLDivElement, ChartChordProps>(
  (
    {
      data,
      labels,
      colors,
      width = 500,
      height = 500,
      padAngle = 0.05,
      className,
      accessibilityLabel = 'Chord diagram',
    },
    ref,
  ) => {
    const cx = width / 2;
    const cy = height / 2;
    const outerRadius = Math.min(cx, cy) * 0.9;
    const innerRadius = outerRadius * 0.85;

    const n = Math.min(data.length, labels.length);
    if (n === 0) {
      return <div ref={ref} className={className} />;
    }

    const palette = colors ?? DEFAULT_PALETTE;

    // Row sums for arc sizes
    const rowSums = data.slice(0, n).map((row) =>
      row.slice(0, n).reduce((s, v) => s + (v ?? 0), 0),
    );
    const totalSum = rowSums.reduce((s, v) => s + v, 0) || 1;

    // Compute group arcs
    const totalPad = padAngle * n;
    const remaining = 2 * Math.PI - totalPad;

    interface GroupArc {
      startAngle: number;
      endAngle: number;
      color: string;
      label: string;
    }

    const groupArcs: GroupArc[] = [];
    let currentAngle = -Math.PI / 2;
    for (let i = 0; i < n; i++) {
      const arcSpan = (rowSums[i]! / totalSum) * remaining;
      groupArcs.push({
        startAngle: currentAngle,
        endAngle: currentAngle + arcSpan,
        color: palette[i % palette.length] ?? 'hsl(var(--chart-1))',
        label: labels[i] ?? '',
      });
      currentAngle += arcSpan + padAngle;
    }

    // Compute chords
    interface ChordPath {
      path: string;
      color: string;
    }
    const chordPaths: ChordPath[] = [];

    // Track sub-angle offsets for each group
    const sourceAngleOffsets = groupArcs.map((g) => g.startAngle);
    const targetAngleOffsets = groupArcs.map((g) => g.startAngle);

    for (let i = 0; i < n; i++) {
      for (let j = i; j < n; j++) {
        const val = (data[i]?.[j] ?? 0) + (i !== j ? (data[j]?.[i] ?? 0) : 0);
        if (val === 0) continue;

        const group = groupArcs[i]!;
        const groupJ = groupArcs[j]!;

        const iSpan = group.endAngle - group.startAngle;
        const jSpan = groupJ.endAngle - groupJ.startAngle;

        const iChordSpan = (val / totalSum) * remaining * (iSpan / remaining) || 0.001;
        const jChordSpan = (val / totalSum) * remaining * (jSpan / remaining) || 0.001;

        const sourceAngleStart = sourceAngleOffsets[i]!;
        const sourceAngleEnd = sourceAngleStart + Math.min(iChordSpan, iSpan - (sourceAngleStart - group.startAngle));
        sourceAngleOffsets[i] = sourceAngleEnd;

        const targetAngleStart = targetAngleOffsets[j]!;
        const targetAngleEnd = targetAngleStart + Math.min(jChordSpan, jSpan - (targetAngleStart - groupJ.startAngle));
        targetAngleOffsets[j] = targetAngleEnd;

        // Chord as bezier paths connecting inner arcs
        const toXY = (angle: number, r: number): [number, number] => [
          cx + r * Math.cos(angle - Math.PI / 2),
          cy + r * Math.sin(angle - Math.PI / 2),
        ];

        const [srcStartX, srcStartY] = toXY(sourceAngleStart, innerRadius);
        const [srcEndX, srcEndY] = toXY(sourceAngleEnd, innerRadius);
        const [tgtStartX, tgtStartY] = toXY(targetAngleStart, innerRadius);
        const [tgtEndX, tgtEndY] = toXY(targetAngleEnd, innerRadius);

        // Use chart center (cx, cy) as bezier control point for the chord curves
        const sourceLargeArc = Math.abs(sourceAngleEnd - sourceAngleStart) > Math.PI ? 1 : 0;
        const targetLargeArc = Math.abs(targetAngleEnd - targetAngleStart) > Math.PI ? 1 : 0;

        const path = [
          `M ${fmt(srcStartX)} ${fmt(srcStartY)}`,
          `A ${fmt(innerRadius)} ${fmt(innerRadius)} 0 ${sourceLargeArc} 1 ${fmt(srcEndX)} ${fmt(srcEndY)}`,
          `Q ${fmt(cx)} ${fmt(cy)} ${fmt(tgtEndX)} ${fmt(tgtEndY)}`,
          `A ${fmt(innerRadius)} ${fmt(innerRadius)} 0 ${targetLargeArc} 0 ${fmt(tgtStartX)} ${fmt(tgtStartY)}`,
          `Q ${fmt(cx)} ${fmt(cy)} ${fmt(srcStartX)} ${fmt(srcStartY)}`,
          'Z',
        ].join(' ');

        chordPaths.push({ path, color: group.color });
      }
    }

    return (
      <div ref={ref} className={className} style={{ display: 'inline-block' }}>
        <svg
          role="img"
          aria-label={accessibilityLabel}
          width={width}
          height={height}
          style={{ display: 'block' }}
        >
          <title>{accessibilityLabel}</title>
          {/* Chords */}
          {chordPaths.map((chord, i) => (
            <path
              key={i}
              d={chord.path}
              fill={chord.color}
              fillOpacity={0.35}
              stroke="none"
            />
          ))}
          {/* Group arcs */}
          {groupArcs.map((group, i) => {
            const arcD = buildArcPath(cx, cy, outerRadius, innerRadius, group.startAngle, group.endAngle);
            const midAngle = (group.startAngle + group.endAngle) / 2;
            const lx = cx + (outerRadius + 12) * Math.sin(midAngle);
            const ly = cy - (outerRadius + 12) * Math.cos(midAngle);

            return (
              <g key={i} aria-label={group.label}>
                <path
                  d={arcD}
                  fill={group.color}
                  fillOpacity={0.85}
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={11}
                  fill="currentColor"
                  fillOpacity={0.8}
                >
                  {group.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  },
);
Chord.displayName = 'Chart.Chord';

/* ─── RangeArea ─────────────────────────────────────────────────────── */

const RangeArea = React.forwardRef<SVGGElement, ChartRangeAreaProps>(
  (
    {
      lowKey,
      highKey,
      color,
      name,
      fillOpacity = 0.3,
      curve = 'catmullRom',
      className,
    },
    ref,
  ) => {
    const ctx = useCartesianContext('Chart.RangeArea');
    const {
      data,
      xScale,
      yScale,
      xDataKey,
      isBand,
      palette,
    } = ctx;

    const seriesIndex = ctx.registerSeries(name ?? lowKey);
    const resolvedColor = color ?? palette[seriesIndex % palette.length] ?? palette[0] ?? 'hsl(var(--chart-1))';

    const highPoints: [number, number][] = [];
    const lowPoints: [number, number][] = [];

    data.forEach((row, i) => {
      const high = row[highKey];
      const low = row[lowKey];
      if (typeof high !== 'number' || typeof low !== 'number') return;
      const x = xScale(isBand ? row[xDataKey] : i);
      highPoints.push([x, yScale(high)]);
      lowPoints.push([x, yScale(low)]);
    });

    if (highPoints.length === 0) return null;

    const areaD = buildAreaPath(highPoints, lowPoints, curve);

    return (
      <g ref={ref} className={className} aria-label={name ?? `${highKey}–${lowKey}`}>
        <path
          d={areaD}
          fill={resolvedColor}
          fillOpacity={fillOpacity}
          style={{ transition: 'd 300ms ease' }}
        />
      </g>
    );
  },
);
RangeArea.displayName = 'Chart.RangeArea';

/* ─── Standalone: LinearGauge ───────────────────────────────────────── */

const LinearGauge = React.forwardRef<HTMLDivElement, ChartLinearGaugeProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      width = 300,
      height = 40,
      thickness = 16,
      colorStops,
      showLabel = true,
      label,
      cornerRadius = 8,
      className,
      accessibilityLabel,
    },
    ref,
  ) => {
    const fraction = Math.min(1, Math.max(0, (value - min) / (max - min)));
    const labelPad = showLabel ? 52 : 8;
    const trackX = 8;
    const trackY = (height - thickness) / 2;
    const innerWidth = width - trackX * 2 - labelPad;
    const fillWidth = fraction * innerWidth;

    let fillColor = DEFAULT_PALETTE[0] ?? 'hsl(var(--chart-1))';
    if (colorStops && colorStops.length > 0) {
      const pct = fraction * 100;
      let chosen = colorStops[0]?.[1] ?? fillColor;
      for (const [stopPct, stopColor] of colorStops) {
        if (pct >= stopPct) chosen = stopColor;
      }
      fillColor = chosen;
    }

    const labelText = (() => {
      if (!showLabel) return null;
      if (typeof label === 'function') return label(value, min, max);
      if (typeof label === 'string') return label;
      return `${Math.round(fraction * 100)}%`;
    })();

    const a11yLabel = accessibilityLabel ?? `Gauge: ${value} of ${max}`;

    return (
      <div ref={ref} className={className} style={{ display: 'inline-block' }}>
        <svg
          role="progressbar"
          aria-label={a11yLabel}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          width={width}
          height={height}
          style={{ display: 'block' }}
        >
          <title>{a11yLabel}</title>
          {/* Track */}
          <rect
            x={trackX}
            y={trackY}
            width={innerWidth}
            height={thickness}
            rx={cornerRadius}
            fill="currentColor"
            fillOpacity={0.1}
          />
          {/* Fill */}
          {fillWidth > 0 && (
            <rect
              x={trackX}
              y={trackY}
              width={fillWidth}
              height={thickness}
              rx={cornerRadius}
              fill={fillColor}
              style={{ transition: 'width 400ms ease' }}
            />
          )}
          {/* Label */}
          {showLabel && labelText && (
            <text
              x={trackX + innerWidth + 8}
              y={height / 2}
              dominantBaseline="middle"
              fontSize={12}
              fontWeight={600}
              fill="currentColor"
              fillOpacity={0.85}
            >
              {labelText}
            </text>
          )}
        </svg>
      </div>
    );
  },
);
LinearGauge.displayName = 'Chart.LinearGauge';

/* ─── PieCenterLabel ────────────────────────────────────────────────── */

const PieCenterLabel = React.forwardRef<SVGGElement, ChartPieCenterLabelProps>(
  ({ children, className }, ref) => {
    const ctx = usePieContext('Chart.PieCenterLabel');
    const { cx, cy } = ctx;

    if (typeof children === 'string' || typeof children === 'number') {
      return (
        <g ref={ref} className={className}>
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={16}
            fontWeight={600}
            fill="currentColor"
          >
            {children}
          </text>
        </g>
      );
    }

    return (
      <g ref={ref} className={className}>
        <foreignObject
          x={cx - 50}
          y={cy - 25}
          width={100}
          height={50}
          style={{ overflow: 'visible' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              textAlign: 'center',
            }}
          >
            {children}
          </div>
        </foreignObject>
      </g>
    );
  },
);
PieCenterLabel.displayName = 'Chart.PieCenterLabel';

/* ─── GaugePointer ──────────────────────────────────────────────────── */

const GaugePointer = React.forwardRef<SVGGElement, ChartGaugePointerProps>(
  (
    {
      color = 'currentColor',
      length: lengthFraction = 0.7,
      width: baseWidth = 6,
      className,
    },
    ref,
  ) => {
    const ctx = useGaugeContext('Chart.GaugePointer');
    const { cx, cy, outerRadius, fraction, startAngle, endAngle } = ctx;

    // Compute current angle (clockwise from top)
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const startRad = toRad(startAngle);
    const endRad = toRad(endAngle);
    const currentRad = startRad + (endRad - startRad) * fraction;

    // Convert "clockwise from top" to SVG
    const angle = currentRad - Math.PI / 2;

    const needleLength = outerRadius * lengthFraction;

    // Needle tip
    const tipX = cx + needleLength * Math.cos(angle);
    const tipY = cy + needleLength * Math.sin(angle);

    // Needle base (perpendicular offsets)
    const perpAngle = angle + Math.PI / 2;
    const halfBase = baseWidth / 2;
    const bx1 = cx + halfBase * Math.cos(perpAngle);
    const by1 = cy + halfBase * Math.sin(perpAngle);
    const bx2 = cx - halfBase * Math.cos(perpAngle);
    const by2 = cy - halfBase * Math.sin(perpAngle);

    return (
      <g ref={ref} className={className}>
        {/* Needle triangle */}
        <polygon
          points={`${fmt(bx1)},${fmt(by1)} ${fmt(bx2)},${fmt(by2)} ${fmt(tipX)},${fmt(tipY)}`}
          fill={color}
          style={{ transition: 'points 400ms ease' }}
        />
        {/* Center pivot circle */}
        <circle
          cx={cx}
          cy={cy}
          r={baseWidth}
          fill={color}
        />
      </g>
    );
  },
);
GaugePointer.displayName = 'Chart.GaugePointer';

/* ─── Shared ref merge helper ───────────────────────────────────────── */

function useMergedRef<T>(
  ...refs: (React.Ref<T> | undefined | null)[]
): React.RefCallback<T> {
  return React.useCallback(
    (node: T) => {
      refs.forEach((ref) => {
        if (!ref) return;
        if (typeof ref === 'function') {
          ref(node);
        } else {
          (ref as React.MutableRefObject<T>).current = node;
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  );
}

/* ─── Exports ───────────────────────────────────────────────────────── */

export {
  Root,
  Grid,
  XAxis,
  YAxis,
  Bar,
  Line,
  Area,
  Scatter,
  Bubble,
  Tooltip,
  Legend,
  PieRoot,
  Pie,
  PieCenterLabel,
  RadarRoot,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Heatmap,
  Treemap,
  Funnel,
  Gauge,
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  GaugePointer,
  CandlestickChart as Candlestick,
  SparkLine,
  RangeBar,
  RangeArea,
  ReferenceLine,
  ReferenceArea,
  RadialBarRoot,
  RadialBar,
  RadialLineRoot,
  RadialLine,
  Waterfall,
  Sankey,
  Pyramid,
  Gantt,
  Histogram,
  Boxplot,
  Sunburst,
  Chord,
  LinearGauge,
};
