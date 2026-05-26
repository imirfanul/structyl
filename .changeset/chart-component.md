---
'@aura-ui/primitives': minor
'@aura-ui/styled': minor
---

feat: add complete SVG chart library with 12 chart types

Introduces `@aura-ui/primitives` `Chart` namespace and `@aura-ui/styled` `Chart` namespace with a
production-grade, zero-external-dependency SVG chart library.

## Chart types

- **Bar** — vertical bars, supports grouped layout, radius rounding, click handlers
- **Line** — single/multi-series lines with catmullRom, linear, and step curve options; optional dot markers
- **Area** — filled area charts with configurable fill opacity and curve types
- **Scatter** — x/y scatter plots with hover highlighting
- **Bubble** — scatter with a third `sizeKey` dimension that maps to circle radius
- **Pie / Donut** — arc-based pie charts; set `innerRadius > 0` for donut variant; supports `padAngle` and `cornerRadius`
- **Radar / Spider** — multi-axis polar chart with `PolarGrid` and `PolarAngleAxis` sub-components
- **Heatmap** — grid of coloured cells mapped from a `valueKey`; uses band scales for x/y axes
- **Treemap** — squarified treemap layout algorithm supporting nested children
- **Funnel** — tapering trapezoid funnel with percentage labels per stage
- **Gauge** — arc-style gauge with configurable `startAngle`/`endAngle`, `colorStops`, and `thickness`
- **Candlestick / OHLC** — financial chart with open/high/low/close bars and wicks

## Compound component API

Cartesian charts use a `Chart.Root` container that auto-computes x/y domains and provides scales to
child components via React context:

```tsx
<Chart.Root data={data} height={300}>
  <Chart.Grid />
  <Chart.XAxis dataKey="month" />
  <Chart.YAxis />
  <Chart.Bar dataKey="revenue" name="Revenue" />
  <Chart.Line dataKey="profit" name="Profit" />
  <Chart.Tooltip />
</Chart.Root>
```

Pie/Donut charts use `Chart.PieRoot`:

```tsx
<Chart.PieRoot data={data} width={360} height={360}>
  <Chart.Pie dataKey="value" nameKey="category" innerRadius={70} />
  <Chart.Tooltip />
</Chart.PieRoot>
```

Radar charts use `Chart.RadarRoot`:

```tsx
<Chart.RadarRoot data={data} width={400} height={400}>
  <Chart.PolarGrid />
  <Chart.PolarAngleAxis dataKey="subject" />
  <Chart.Radar dataKey="score" />
</Chart.RadarRoot>
```

Standalone charts accept all data as props:

```tsx
<Chart.Treemap data={treeData} width={600} height={400} />
<Chart.Gauge value={72} min={0} max={100} colorStops={[[0,'red'],[50,'orange'],[75,'green']]} />
<Chart.Funnel data={funnelData} width={400} height={300} />
<Chart.Candlestick data={ohlcData} width={700} height={350} />
<Chart.Heatmap data={heatData} xKey="day" yKey="hour" valueKey="count" />
```

## Internal algorithms (no external dependencies)

- Linear, band, log, and ordinal scales
- CatmullRom, linear, step, stepBefore, and stepAfter curve interpolation
- Squarified treemap layout
- Funnel trapezoid layout
- Gauge arc computation
- Candlestick bar layout

## Color system

Uses CSS custom properties `--chart-1` through `--chart-5` (and `--chart-6` through `--chart-8` for
larger palettes). Each series falls back gracefully to `hsl(var(--chart-N))`.

## Accessibility

- `role="img"` with `aria-label` on every SVG
- `<title>` element inside each SVG
- `aria-label` attributes on interactive elements (bars, dots, slices)
- `role="status" aria-live="polite"` screen reader region for tooltip data
- Optional `accessibilityMode` prop adds pattern fills for colorblind accessibility
