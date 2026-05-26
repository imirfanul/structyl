import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chart } from '@aura-ui/styled';

/* ─── Shared mock data ──────────────────────────────────────────────── */

const monthlyData = [
  { month: 'Jan', revenue: 4200, cost: 2800, profit: 1400 },
  { month: 'Feb', revenue: 5800, cost: 3100, profit: 2700 },
  { month: 'Mar', revenue: 3900, cost: 2600, profit: 1300 },
  { month: 'Apr', revenue: 7100, cost: 4200, profit: 2900 },
  { month: 'May', revenue: 6400, cost: 3800, profit: 2600 },
  { month: 'Jun', revenue: 8300, cost: 4900, profit: 3400 },
  { month: 'Jul', revenue: 9100, cost: 5400, profit: 3700 },
  { month: 'Aug', revenue: 7600, cost: 4600, profit: 3000 },
];

const multiLineData = [
  { month: 'Jan', alice: 82, bob: 60, carol: 70 },
  { month: 'Feb', alice: 75, bob: 68, carol: 78 },
  { month: 'Mar', alice: 88, bob: 72, carol: 65 },
  { month: 'Apr', alice: 91, bob: 80, carol: 84 },
  { month: 'May', alice: 79, bob: 75, carol: 90 },
  { month: 'Jun', alice: 95, bob: 88, carol: 83 },
];

const pieData = [
  { category: 'Direct',   value: 3200 },
  { category: 'Organic',  value: 2100 },
  { category: 'Referral', value: 1400 },
  { category: 'Social',   value: 980 },
  { category: 'Email',    value: 620 },
];

const scatterData = [
  { x: 10, y: 20 }, { x: 25, y: 40 }, { x: 18, y: 15 }, { x: 35, y: 55 },
  { x: 42, y: 30 }, { x: 50, y: 65 }, { x: 28, y: 48 }, { x: 15, y: 35 },
  { x: 60, y: 72 }, { x: 45, y: 58 }, { x: 32, y: 25 }, { x: 55, y: 80 },
];

const bubbleData = [
  { x: 10, y: 20, z: 8 }, { x: 25, y: 40, z: 15 }, { x: 18, y: 15, z: 5 },
  { x: 35, y: 55, z: 22 }, { x: 42, y: 30, z: 10 }, { x: 50, y: 65, z: 30 },
  { x: 28, y: 48, z: 18 }, { x: 60, y: 72, z: 25 },
];

const radarData = [
  { subject: 'Speed',     alice: 80, bob: 60 },
  { subject: 'Strength',  alice: 60, bob: 90 },
  { subject: 'Endurance', alice: 70, bob: 75 },
  { subject: 'Agility',   alice: 85, bob: 55 },
  { subject: 'Skill',     alice: 90, bob: 70 },
];

const heatData: Array<{ day: string; hour: string; count: number }> = (() => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const hours = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm'];
  const rows: Array<{ day: string; hour: string; count: number }> = [];
  days.forEach((day, di) => {
    hours.forEach((hour, hi) => {
      rows.push({ day, hour, count: Math.round(5 + Math.abs(Math.sin(di * 3 + hi) * 45)) });
    });
  });
  return rows;
})();

const treemapData = [
  {
    name: 'Equities',
    value: 4200,
    children: [
      { name: 'Tech',    value: 1800 },
      { name: 'Health',  value: 1100 },
      { name: 'Finance', value: 1300 },
    ],
  },
  {
    name: 'Fixed Income',
    value: 2800,
    children: [
      { name: 'Govt', value: 1600 },
      { name: 'Corp', value: 1200 },
    ],
  },
  { name: 'Real Estate', value: 1400 },
  { name: 'Commodities', value: 800 },
  { name: 'Cash',        value: 400 },
];

const funnelData = [
  { name: 'Visitors',  value: 10000 },
  { name: 'Leads',     value: 6500 },
  { name: 'Prospects', value: 3800 },
  { name: 'Customers', value: 1200 },
];

const candlestickData = [
  { date: 'Mon', open: 100, high: 115, low: 95,  close: 112 },
  { date: 'Tue', open: 112, high: 120, low: 108, close: 106 },
  { date: 'Wed', open: 106, high: 118, low: 100, close: 115 },
  { date: 'Thu', open: 115, high: 122, low: 110, close: 118 },
  { date: 'Fri', open: 118, high: 125, low: 113, close: 121 },
  { date: 'Mon', open: 121, high: 128, low: 115, close: 117 },
  { date: 'Tue', open: 117, high: 122, low: 110, close: 111 },
  { date: 'Wed', open: 111, high: 119, low: 108, close: 116 },
];

/* ─── Bar chart ─────────────────────────────────────────────────────── */

const barMeta: Meta = {
  title: 'Charts/Bar',
  tags: ['autodocs'],
};
export default barMeta;

export const BarBasic: StoryObj = {
  name: 'Basic bar chart',
  render: () => (
    <Chart.Root data={monthlyData} height={300}>
      <Chart.Grid />
      <Chart.XAxis dataKey="month" />
      <Chart.YAxis />
      <Chart.Bar dataKey="revenue" name="Revenue" />
      <Chart.Tooltip />
      <Chart.Legend />
    </Chart.Root>
  ),
};

export const BarMultiSeries: StoryObj = {
  name: 'Multi-series (Bar + Line)',
  render: () => (
    <Chart.Root data={monthlyData} height={300}>
      <Chart.Grid />
      <Chart.XAxis dataKey="month" />
      <Chart.YAxis />
      <Chart.Bar dataKey="revenue" name="Revenue" />
      <Chart.Bar dataKey="cost" name="Cost" />
      <Chart.Line dataKey="profit" name="Profit" curve="catmullRom" />
      <Chart.Tooltip />
      <Chart.Legend />
    </Chart.Root>
  ),
};

export const BarStacked: StoryObj = {
  name: 'Stacked bars',
  render: () => (
    <Chart.Root data={monthlyData} height={300}>
      <Chart.Grid />
      <Chart.XAxis dataKey="month" />
      <Chart.YAxis />
      <Chart.Bar dataKey="revenue" name="Revenue" stackId="a" />
      <Chart.Bar dataKey="cost" name="Cost" stackId="a" />
      <Chart.Tooltip />
      <Chart.Legend />
    </Chart.Root>
  ),
};

export const BarHorizontal: StoryObj = {
  name: 'Horizontal bar chart',
  render: () => (
    <Chart.Root data={monthlyData} height={300}>
      <Chart.Grid />
      <Chart.XAxis dataKey="month" />
      <Chart.YAxis />
      <Chart.Bar dataKey="revenue" name="Revenue" orientation="horizontal" />
      <Chart.Tooltip />
      <Chart.Legend />
    </Chart.Root>
  ),
};

export const BarAccessibilityMode: StoryObj = {
  name: 'Colorblind-safe (accessibilityMode)',
  render: () => (
    <Chart.Root
      data={monthlyData}
      height={300}
      accessibilityLabel="Monthly revenue and cost comparison"
      accessibilityMode
    >
      <Chart.Grid />
      <Chart.XAxis dataKey="month" />
      <Chart.YAxis />
      <Chart.Bar dataKey="revenue" name="Revenue" />
      <Chart.Bar dataKey="cost" name="Cost" />
      <Chart.Tooltip />
      <Chart.Legend />
    </Chart.Root>
  ),
};

/* ─── Line chart ────────────────────────────────────────────────────── */

export const LineMultiSeries: StoryObj = {
  name: 'Line — multi-series',
  render: () => (
    <Chart.Root data={multiLineData} height={300}>
      <Chart.Grid />
      <Chart.XAxis dataKey="month" />
      <Chart.YAxis />
      <Chart.Line dataKey="alice" name="Alice" curve="catmullRom" />
      <Chart.Line dataKey="bob"   name="Bob"   curve="catmullRom" color="hsl(var(--chart-2))" />
      <Chart.Line dataKey="carol" name="Carol" curve="catmullRom" color="hsl(var(--chart-3))" />
      <Chart.Tooltip />
      <Chart.Legend />
    </Chart.Root>
  ),
};

export const LineStepped: StoryObj = {
  name: 'Line — step curve',
  render: () => (
    <Chart.Root data={monthlyData} height={300}>
      <Chart.Grid />
      <Chart.XAxis dataKey="month" />
      <Chart.YAxis />
      <Chart.Line dataKey="revenue" name="Revenue" curve="step" dot={false} strokeWidth={2} />
      <Chart.Tooltip />
    </Chart.Root>
  ),
};

/* ─── Area chart ────────────────────────────────────────────────────── */

export const AreaStacked: StoryObj = {
  name: 'Area — stacked',
  render: () => (
    <Chart.Root data={monthlyData} height={300}>
      <Chart.Grid />
      <Chart.XAxis dataKey="month" />
      <Chart.YAxis />
      <Chart.Area dataKey="revenue" name="Revenue" fillOpacity={0.25} stackId="a" />
      <Chart.Area dataKey="cost"    name="Cost"    fillOpacity={0.2}  stackId="a" />
      <Chart.Tooltip />
      <Chart.Legend />
    </Chart.Root>
  ),
};

export const AreaSingle: StoryObj = {
  name: 'Area — single series',
  render: () => (
    <Chart.Root data={monthlyData} height={300}>
      <Chart.Grid />
      <Chart.XAxis dataKey="month" />
      <Chart.YAxis />
      <Chart.Area dataKey="profit" name="Profit" fillOpacity={0.3} curve="catmullRom" />
      <Chart.Tooltip />
    </Chart.Root>
  ),
};

/* ─── Pie / Donut ───────────────────────────────────────────────────── */

export const PieDonut: StoryObj = {
  name: 'Pie — donut',
  render: () => (
    <div className="flex justify-center">
      <Chart.PieRoot data={pieData} width={360} height={360}>
        <Chart.Pie dataKey="value" nameKey="category" innerRadius={80} padAngle={0.02} cornerRadius={4} />
        <Chart.Tooltip />
        <Chart.Legend />
      </Chart.PieRoot>
    </div>
  ),
};

export const PieFull: StoryObj = {
  name: 'Pie — full circle',
  render: () => (
    <div className="flex justify-center">
      <Chart.PieRoot data={pieData} width={360} height={360}>
        <Chart.Pie dataKey="value" nameKey="category" />
        <Chart.Tooltip />
        <Chart.Legend />
      </Chart.PieRoot>
    </div>
  ),
};

/* ─── Scatter ───────────────────────────────────────────────────────── */

export const ScatterBasic: StoryObj = {
  name: 'Scatter plot',
  render: () => (
    <Chart.Root data={scatterData} height={300}>
      <Chart.Grid />
      <Chart.XAxis dataKey="x" />
      <Chart.YAxis />
      <Chart.Scatter xKey="x" yKey="y" name="Products" />
      <Chart.Tooltip />
      <Chart.Legend />
    </Chart.Root>
  ),
};

export const BubbleBasic: StoryObj = {
  name: 'Bubble chart',
  render: () => (
    <Chart.Root data={bubbleData} height={300}>
      <Chart.Grid />
      <Chart.XAxis dataKey="x" />
      <Chart.YAxis />
      <Chart.Bubble xKey="x" yKey="y" sizeKey="z" name="Products" />
      <Chart.Tooltip />
      <Chart.Legend />
    </Chart.Root>
  ),
};

/* ─── Radar ─────────────────────────────────────────────────────────── */

export const RadarMultiSeries: StoryObj = {
  name: 'Radar — multi-series',
  render: () => (
    <div className="flex justify-center">
      <Chart.RadarRoot data={radarData} width={360} height={360}>
        <Chart.PolarGrid />
        <Chart.PolarAngleAxis dataKey="subject" />
        <Chart.Radar dataKey="alice" name="Alice" fillOpacity={0.25} />
        <Chart.Radar dataKey="bob"   name="Bob"   color="hsl(var(--chart-2))" fillOpacity={0.2} />
        <Chart.Legend />
      </Chart.RadarRoot>
    </div>
  ),
};

export const RadarSingle: StoryObj = {
  name: 'Radar — single series',
  render: () => (
    <div className="flex justify-center">
      <Chart.RadarRoot data={radarData} width={320} height={320}>
        <Chart.PolarGrid />
        <Chart.PolarAngleAxis dataKey="subject" />
        <Chart.Radar dataKey="alice" name="Alice" fillOpacity={0.3} />
      </Chart.RadarRoot>
    </div>
  ),
};

/* ─── Heatmap ───────────────────────────────────────────────────────── */

export const HeatmapActivity: StoryObj = {
  name: 'Heatmap — activity grid',
  render: () => (
    <div className="overflow-x-auto">
      <Chart.Heatmap
        data={heatData}
        xKey="day"
        yKey="hour"
        valueKey="count"
        width={500}
        height={280}
      />
    </div>
  ),
};

/* ─── Treemap ───────────────────────────────────────────────────────── */

export const TreemapPortfolio: StoryObj = {
  name: 'Treemap — portfolio',
  render: () => (
    <div className="overflow-x-auto">
      <Chart.Treemap data={treemapData} width={560} height={360} />
    </div>
  ),
};

/* ─── Funnel ────────────────────────────────────────────────────────── */

export const FunnelSales: StoryObj = {
  name: 'Funnel — sales pipeline',
  render: () => (
    <div className="flex justify-center">
      <Chart.Funnel data={funnelData} width={420} height={320} />
    </div>
  ),
};

/* ─── Gauge ─────────────────────────────────────────────────────────── */

export const GaugeSingle: StoryObj = {
  name: 'Gauge — single',
  render: () => (
    <div className="flex justify-center">
      <Chart.Gauge value={72} min={0} max={100} width={240} height={180} label="CPU Load" />
    </div>
  ),
};

export const GaugeDashboard: StoryObj = {
  name: 'Gauge — dashboard panel',
  render: () => (
    <div className="flex flex-wrap items-end justify-center gap-4">
      <Chart.Gauge value={72} min={0} max={100} width={200} height={150} label="CPU Load" />
      <Chart.Gauge value={45} min={0} max={100} width={200} height={150} label="Memory" />
      <Chart.Gauge value={88} min={0} max={100} width={200} height={150} label="Disk I/O" />
    </div>
  ),
};

/* ─── Candlestick ───────────────────────────────────────────────────── */

export const CandlestickStock: StoryObj = {
  name: 'Candlestick — OHLC',
  render: () => (
    <div className="overflow-x-auto">
      <Chart.Candlestick
        data={candlestickData}
        width={620}
        height={320}
        bullColor="hsl(var(--chart-2))"
        bearColor="hsl(var(--chart-5))"
      />
    </div>
  ),
};

/* ─── SparkLine ─────────────────────────────────────────────────────── */

const sparkLineData = [12, 45, 28, 60, 35, 72, 48, 55, 40, 68];

export const SparkLineLine: StoryObj = {
  name: 'SparkLine — line',
  render: () => (
    <div className="flex items-center gap-6 p-4">
      <span className="text-sm font-medium">Revenue trend</span>
      <Chart.SparkLine data={sparkLineData} type="line" width={120} height={40} />
    </div>
  ),
};

export const SparkLineBar: StoryObj = {
  name: 'SparkLine — bar',
  render: () => (
    <div className="flex items-center gap-6 p-4">
      <span className="text-sm font-medium">Weekly visits</span>
      <Chart.SparkLine
        data={sparkLineData}
        type="bar"
        width={120}
        height={40}
        color="hsl(var(--chart-2))"
      />
    </div>
  ),
};

export const SparkLineInline: StoryObj = {
  name: 'SparkLine — inline table cells',
  render: () => (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b">
          <th className="py-2 pr-4 text-left">Metric</th>
          <th className="py-2 pr-4 text-right">Current</th>
          <th className="py-2 text-left">Trend</th>
        </tr>
      </thead>
      <tbody>
        {[
          { label: 'Revenue',  value: '$68k', data: [12, 45, 28, 60, 35, 72, 48, 55, 40, 68] },
          { label: 'Sessions', value: '12.4k', data: [30, 22, 45, 38, 50, 42, 60, 55, 48, 65] },
          { label: 'Bounce',   value: '38%',  data: [55, 48, 52, 45, 50, 38, 42, 35, 40, 38] },
        ].map(row => (
          <tr key={row.label} className="border-b">
            <td className="py-2 pr-4 font-medium">{row.label}</td>
            <td className="py-2 pr-4 text-right">{row.value}</td>
            <td className="py-2">
              <Chart.SparkLine data={row.data} type="line" width={100} height={32} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

/* ─── RangeBar ──────────────────────────────────────────────────────── */

const rangeBarData = [
  { month: 'Jan', low: 10, high: 30 },
  { month: 'Feb', low: 15, high: 45 },
  { month: 'Mar', low: 8,  high: 35 },
  { month: 'Apr', low: 20, high: 55 },
  { month: 'May', low: 18, high: 50 },
  { month: 'Jun', low: 25, high: 65 },
];

export const RangeBarBasic: StoryObj = {
  name: 'RangeBar — temperature range',
  render: () => (
    <Chart.Root data={rangeBarData} height={300}>
      <Chart.Grid />
      <Chart.XAxis dataKey="month" />
      <Chart.YAxis />
      <Chart.RangeBar lowKey="low" highKey="high" name="Temp range (°C)" color="hsl(var(--chart-1))" />
      <Chart.Tooltip />
      <Chart.Legend />
    </Chart.Root>
  ),
};

/* ─── ReferenceLine ─────────────────────────────────────────────────── */

export const ReferenceLineTarget: StoryObj = {
  name: 'ReferenceLine — target line',
  render: () => (
    <Chart.Root data={monthlyData} height={300}>
      <Chart.Grid />
      <Chart.XAxis dataKey="month" />
      <Chart.YAxis />
      <Chart.Bar dataKey="revenue" name="Revenue" />
      <Chart.ReferenceLine y={6000} label="Target" stroke="hsl(var(--chart-3))" />
      <Chart.Tooltip />
      <Chart.Legend />
    </Chart.Root>
  ),
};

/* ─── ReferenceArea ─────────────────────────────────────────────────── */

export const ReferenceAreaBand: StoryObj = {
  name: 'ReferenceArea — target band',
  render: () => (
    <Chart.Root data={monthlyData} height={300}>
      <Chart.Grid />
      <Chart.XAxis dataKey="month" />
      <Chart.YAxis />
      <Chart.Bar dataKey="revenue" name="Revenue" />
      <Chart.ReferenceArea y1={5000} y2={7000} fill="#22c55e" fillOpacity={0.1} />
      <Chart.ReferenceLine y={5000} label="Min target" stroke="#22c55e" strokeDasharray="4 2" />
      <Chart.ReferenceLine y={7000} label="Max target" stroke="#22c55e" strokeDasharray="4 2" />
      <Chart.Tooltip />
      <Chart.Legend />
    </Chart.Root>
  ),
};

/* ─── RadialBarRoot + RadialBar ─────────────────────────────────────── */

const radialBarData = [
  { name: 'Task A', completion: 85 },
  { name: 'Task B', completion: 62 },
  { name: 'Task C', completion: 41 },
  { name: 'Task D', completion: 78 },
];

export const RadialBarBasic: StoryObj = {
  name: 'RadialBar — completion rings',
  render: () => (
    <div className="flex justify-center">
      <Chart.RadialBarRoot data={radialBarData} width={360} height={360}>
        <Chart.RadialBar dataKey="completion" nameKey="name" />
      </Chart.RadialBarRoot>
    </div>
  ),
};

/* ─── Waterfall ─────────────────────────────────────────────────────── */

const waterfallData = [
  { name: 'Q1 Start',  value: 120 },
  { name: 'Sales',     value: 45  },
  { name: 'Returns',   value: -18 },
  { name: 'Marketing', value: -25 },
  { name: 'Savings',   value: 15  },
  { name: 'Q2 End',    value: 0   },
];

export const WaterfallBasic: StoryObj = {
  name: 'Waterfall — quarterly P&L',
  render: () => (
    <div className="overflow-x-auto">
      <Chart.Waterfall data={waterfallData} width={560} height={320} />
    </div>
  ),
};

/* ─── Sankey ────────────────────────────────────────────────────────── */

const sankeyNodes = [
  { id: 'A' },
  { id: 'B' },
  { id: 'C' },
  { id: 'D' },
  { id: 'E' },
];

const sankeyLinks = [
  { source: 'A', target: 'B', value: 30 },
  { source: 'A', target: 'C', value: 20 },
  { source: 'B', target: 'D', value: 25 },
  { source: 'C', target: 'D', value: 15 },
  { source: 'B', target: 'E', value: 5  },
  { source: 'C', target: 'E', value: 5  },
];

export const SankeyBasic: StoryObj = {
  name: 'Sankey — flow diagram',
  render: () => (
    <div className="overflow-x-auto">
      <Chart.Sankey nodes={sankeyNodes} links={sankeyLinks} width={560} height={320} />
    </div>
  ),
};

/* ─── Pyramid ───────────────────────────────────────────────────────── */

const pyramidData = [
  { name: 'Awareness', value: 10000 },
  { name: 'Interest',  value: 6500  },
  { name: 'Decision',  value: 3200  },
  { name: 'Action',    value: 1800  },
];

export const PyramidMarketing: StoryObj = {
  name: 'Pyramid — marketing funnel (inverted)',
  render: () => (
    <div className="flex justify-center">
      <Chart.Pyramid data={pyramidData} width={420} height={320} />
    </div>
  ),
};

/* ─── Gantt ─────────────────────────────────────────────────────────── */

const ganttTasks = [
  { id: '1', name: 'Design',      start: 0,  end: 5  },
  { id: '2', name: 'Development', start: 3,  end: 12 },
  { id: '3', name: 'Testing',     start: 10, end: 15 },
  { id: '4', name: 'Launch',      start: 14, end: 16 },
];

export const GanttBasic: StoryObj = {
  name: 'Gantt — project timeline',
  render: () => (
    <div className="overflow-x-auto">
      <Chart.Gantt tasks={ganttTasks} width={620} height={240} />
    </div>
  ),
};

export const GanttGrouped: StoryObj = {
  name: 'Gantt — grouped tasks',
  render: () => (
    <div className="overflow-x-auto">
      <Chart.Gantt
        tasks={[
          { id: '1', name: 'Research',    start: 0,  end: 4,  group: 'Phase 1' },
          { id: '2', name: 'Wireframes',  start: 2,  end: 6,  group: 'Phase 1' },
          { id: '3', name: 'Frontend',    start: 5,  end: 12, group: 'Phase 2' },
          { id: '4', name: 'Backend',     start: 5,  end: 13, group: 'Phase 2' },
          { id: '5', name: 'QA',          start: 11, end: 15, group: 'Phase 3' },
          { id: '6', name: 'Deploy',      start: 14, end: 16, group: 'Phase 3' },
        ]}
        width={620}
        height={280}
      />
    </div>
  ),
};

/* ─── Boxplot ────────────────────────────────────────────────────────── */

export const BoxplotBasic: StoryObj = {
  name: 'Boxplot — quarterly sales',
  render: () => (
    <div className="overflow-x-auto">
      <Chart.Boxplot
        data={[
          { name: 'Q1 Sales', min: 12, q1: 28, median: 42, q3: 58, max: 74 },
          { name: 'Q2 Sales', min: 18, q1: 35, median: 50, q3: 65, max: 80 },
          { name: 'Q3 Sales', min: 25, q1: 40, median: 55, q3: 70, max: 88 },
          { name: 'Q4 Sales', min: 30, q1: 48, median: 62, q3: 78, max: 95 },
        ]}
        width={560}
        height={320}
      />
    </div>
  ),
};

/* ─── Histogram ─────────────────────────────────────────────────────── */

const histogramData = [
  14, 22, 8, 45, 31, 67, 52, 19, 73, 38, 61, 27, 84, 43, 16,
  55, 29, 71, 48, 63, 36, 90, 24, 57, 82, 41, 68, 13, 77, 34,
  60, 49, 23, 86, 39, 54, 18, 72, 46, 65, 32, 79, 27, 58, 43,
  91, 37, 62, 21, 47,
];

export const HistogramBasic: StoryObj = {
  name: 'Histogram — value distribution',
  render: () => (
    <div className="overflow-x-auto">
      <Chart.Histogram data={histogramData} bins={8} width={560} height={320} showGrid />
    </div>
  ),
};

/* ─── Chord ─────────────────────────────────────────────────────────── */

export const ChordBasic: StoryObj = {
  name: 'Chord — group flows',
  render: () => (
    <div className="flex justify-center">
      <Chart.Chord
        data={[
          [0,  12, 8,  5 ],
          [12, 0,  15, 3 ],
          [8,  15, 0,  10],
          [5,  3,  10, 0 ],
        ]}
        labels={['A', 'B', 'C', 'D']}
        width={420}
        height={420}
      />
    </div>
  ),
};

/* ─── Sunburst ───────────────────────────────────────────────────────── */

export const SunburstBasic: StoryObj = {
  name: 'Sunburst — hierarchical data',
  render: () => (
    <div className="flex justify-center">
      <Chart.Sunburst
        data={{
          name: 'Root',
          children: [
            {
              name: 'Tech',
              children: [
                { name: 'Frontend', value: 800 },
                { name: 'Backend',  value: 1200 },
                { name: 'DevOps',   value: 600 },
              ],
            },
            {
              name: 'Sales',
              children: [
                { name: 'Direct',   value: 1500 },
                { name: 'Partners', value: 900 },
              ],
            },
            {
              name: 'Marketing',
              children: [
                { name: 'Digital', value: 700 },
                { name: 'Events',  value: 400 },
              ],
            },
          ],
        }}
        width={400}
        height={400}
      />
    </div>
  ),
};

/* ─── LinearGauge ────────────────────────────────────────────────────── */

export const LinearGaugeBasic: StoryObj = {
  name: 'LinearGauge — simple',
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <Chart.LinearGauge value={72} showLabel />
    </div>
  ),
};

export const LinearGaugeColorStops: StoryObj = {
  name: 'LinearGauge — traffic light color stops',
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <Chart.LinearGauge
        value={25}
        showLabel
        colorStops={[[33, '#ef4444'], [66, '#f59e0b'], [100, '#22c55e']]}
        label="Low (25%)"
      />
      <Chart.LinearGauge
        value={55}
        showLabel
        colorStops={[[33, '#ef4444'], [66, '#f59e0b'], [100, '#22c55e']]}
        label="Mid (55%)"
      />
      <Chart.LinearGauge
        value={85}
        showLabel
        colorStops={[[33, '#ef4444'], [66, '#f59e0b'], [100, '#22c55e']]}
        label="High (85%)"
      />
    </div>
  ),
};

/* ─── RadialLine ─────────────────────────────────────────────────────── */

const radialLineMonthData = [
  { month: 'Jan', value: 42 },
  { month: 'Feb', value: 58 },
  { month: 'Mar', value: 35 },
  { month: 'Apr', value: 71 },
  { month: 'May', value: 64 },
  { month: 'Jun', value: 83 },
  { month: 'Jul', value: 91 },
  { month: 'Aug', value: 76 },
  { month: 'Sep', value: 55 },
  { month: 'Oct', value: 68 },
  { month: 'Nov', value: 49 },
  { month: 'Dec', value: 60 },
];

export const RadialLineBasic: StoryObj = {
  name: 'RadialLine — monthly data',
  render: () => (
    <div className="flex justify-center">
      <Chart.RadialLineRoot data={radialLineMonthData} width={380} height={380}>
        <Chart.RadialLine dataKey="value" nameKey="month" dot />
      </Chart.RadialLineRoot>
    </div>
  ),
};

export const RadialLineClosedArea: StoryObj = {
  name: 'RadialLine — closed path with area fill',
  render: () => (
    <div className="flex justify-center">
      <Chart.RadialLineRoot data={radialLineMonthData} width={380} height={380}>
        <Chart.RadialLine
          dataKey="value"
          nameKey="month"
          closePath
          area
          fillOpacity={0.25}
        />
      </Chart.RadialLineRoot>
    </div>
  ),
};

/* ─── RangeArea ──────────────────────────────────────────────────────── */

const rangeAreaTempData = [
  { month: 'Jan', low: 2,  high: 8  },
  { month: 'Feb', low: 4,  high: 11 },
  { month: 'Mar', low: 8,  high: 16 },
  { month: 'Apr', low: 12, high: 21 },
  { month: 'May', low: 16, high: 26 },
  { month: 'Jun', low: 20, high: 30 },
  { month: 'Jul', low: 22, high: 32 },
  { month: 'Aug', low: 21, high: 31 },
  { month: 'Sep', low: 17, high: 26 },
  { month: 'Oct', low: 12, high: 20 },
  { month: 'Nov', low: 7,  high: 13 },
  { month: 'Dec', low: 3,  high: 9  },
];

export const RangeAreaBasic: StoryObj = {
  name: 'RangeArea — temperature band',
  render: () => (
    <Chart.Root data={rangeAreaTempData} height={300}>
      <Chart.Grid />
      <Chart.XAxis dataKey="month" />
      <Chart.YAxis />
      <Chart.RangeArea lowKey="low" highKey="high" name="Temperature (°C)" color="hsl(var(--chart-1))" />
      <Chart.Tooltip />
      <Chart.Legend />
    </Chart.Root>
  ),
};

/* ─── GaugeContainer composition ────────────────────────────────────── */

export const GaugeComposition: StoryObj = {
  name: 'GaugeContainer — composed gauge',
  render: () => (
    <div className="flex justify-center">
      <Chart.GaugeContainer value={65} min={0} max={100} width={240} height={200} accessibilityLabel="Score: 65 of 100">
        <Chart.GaugeReferenceArc />
        <Chart.GaugeValueArc color="hsl(var(--chart-1))" />
        <Chart.GaugePointer />
      </Chart.GaugeContainer>
    </div>
  ),
};

/* ─── Pie variants ───────────────────────────────────────────────────── */

export const PieSemiCircle: StoryObj = {
  name: 'Pie — semi-circle',
  render: () => (
    <div className="flex justify-center">
      <Chart.PieRoot data={pieData} width={360} height={220}>
        <Chart.Pie
          dataKey="value"
          nameKey="category"
          startAngle={-90}
          endAngle={90}
        />
        <Chart.Tooltip />
      </Chart.PieRoot>
    </div>
  ),
};

export const PieWithArcLabel: StoryObj = {
  name: 'Pie — arc percentage labels',
  render: () => (
    <div className="flex justify-center">
      <Chart.PieRoot data={pieData} width={360} height={360}>
        <Chart.Pie
          dataKey="value"
          nameKey="category"
          arcLabel="percentage"
          arcLabelMinAngle={10}
        />
        <Chart.Tooltip />
      </Chart.PieRoot>
    </div>
  ),
};

export const PieWithCenterLabel: StoryObj = {
  name: 'Pie — donut with center label',
  render: () => (
    <div className="flex justify-center">
      <Chart.PieRoot data={pieData} width={360} height={360}>
        <Chart.Pie
          dataKey="value"
          nameKey="category"
          innerRadius={80}
          padAngle={0.02}
          cornerRadius={4}
        />
        <Chart.PieCenterLabel>
          <div className="text-center">
            <div className="text-2xl font-bold">8,300</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </Chart.PieCenterLabel>
        <Chart.Tooltip />
        <Chart.Legend />
      </Chart.PieRoot>
    </div>
  ),
};

/* ─── Bar with labels ────────────────────────────────────────────────── */

export const BarWithLabels: StoryObj = {
  name: 'Bar — with outside labels',
  render: () => (
    <Chart.Root data={monthlyData} height={340}>
      <Chart.Grid />
      <Chart.XAxis dataKey="month" />
      <Chart.YAxis />
      <Chart.Bar dataKey="revenue" name="Revenue" showLabel labelPosition="outside" />
      <Chart.Tooltip />
      <Chart.Legend />
    </Chart.Root>
  ),
};

/* ─── Line connect nulls ─────────────────────────────────────────────── */

export const LineConnectNulls: StoryObj = {
  name: 'Line — connect nulls',
  render: () => (
    <Chart.Root
      data={[
        { month: 'Jan', value: 42 },
        { month: 'Feb', value: 58 },
        { month: 'Mar', value: null },
        { month: 'Apr', value: 71 },
        { month: 'May', value: null },
        { month: 'Jun', value: 83 },
        { month: 'Jul', value: 91 },
        { month: 'Aug', value: 76 },
      ] as object[]}
      height={300}
    >
      <Chart.Grid />
      <Chart.XAxis dataKey="month" />
      <Chart.YAxis />
      <Chart.Line dataKey="value" name="Value" curve="catmullRom" connectNulls />
      <Chart.Tooltip />
    </Chart.Root>
  ),
};

/* ─── Area fill by value ─────────────────────────────────────────────── */

export const AreaFillByValue: StoryObj = {
  name: 'Area — fill by value (positive/negative)',
  render: () => (
    <Chart.Root
      data={[
        { month: 'Jan', delta: 12  },
        { month: 'Feb', delta: -5  },
        { month: 'Mar', delta: 18  },
        { month: 'Apr', delta: -12 },
        { month: 'May', delta: 25  },
        { month: 'Jun', delta: -8  },
        { month: 'Jul', delta: 30  },
        { month: 'Aug', delta: -3  },
      ]}
      height={300}
    >
      <Chart.Grid />
      <Chart.XAxis dataKey="month" />
      <Chart.YAxis />
      <Chart.Area dataKey="delta" name="Delta" fillByValue fillOpacity={0.4} />
      <Chart.Tooltip />
    </Chart.Root>
  ),
};

/* ─── Funnel variants ────────────────────────────────────────────────── */

export const FunnelVariants: StoryObj = {
  name: 'Funnel — outlined and bump variants',
  render: () => (
    <div className="flex flex-wrap justify-center gap-8">
      <div>
        <p className="mb-2 text-center text-sm font-medium">Outlined</p>
        <Chart.Funnel data={funnelData} width={320} height={260} variant="outlined" />
      </div>
      <div>
        <p className="mb-2 text-center text-sm font-medium">Bump curve</p>
        <Chart.Funnel data={funnelData} width={320} height={260} curve="bump" />
      </div>
    </div>
  ),
};

/* ─── Radar fill area ────────────────────────────────────────────────── */

export const RadarFillArea: StoryObj = {
  name: 'Radar — filled area',
  render: () => (
    <div className="flex justify-center">
      <Chart.RadarRoot data={radarData} width={360} height={360}>
        <Chart.PolarGrid />
        <Chart.PolarAngleAxis dataKey="subject" />
        <Chart.Radar dataKey="alice" name="Alice" fillArea fillOpacity={0.35} />
        <Chart.Radar dataKey="bob" name="Bob" color="hsl(var(--chart-2))" fillArea fillOpacity={0.25} />
        <Chart.Legend />
      </Chart.RadarRoot>
    </div>
  ),
};

/* ─── Sankey aligned ─────────────────────────────────────────────────── */

export const SankeyAligned: StoryObj = {
  name: 'Sankey — left-aligned with link values',
  render: () => (
    <div className="overflow-x-auto">
      <Chart.Sankey
        nodes={sankeyNodes}
        links={sankeyLinks}
        width={560}
        height={320}
        nodeAlignment="left"
        showLinkValues
      />
    </div>
  ),
};

/* ─── SparkLine with domain ──────────────────────────────────────────── */

export const SparklineWithDomain: StoryObj = {
  name: 'SparkLine — fixed domain',
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex items-center gap-4">
        <span className="w-32 text-sm font-medium">Fixed 0–100</span>
        <Chart.SparkLine data={sparkLineData} type="line" width={120} height={40} yMin={0} yMax={100} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-32 text-sm font-medium">Auto domain</span>
        <Chart.SparkLine data={sparkLineData} type="line" width={120} height={40} />
      </div>
    </div>
  ),
};
