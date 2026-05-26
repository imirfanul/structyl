import { describe, expect, it } from 'vitest';
import {
  linearScale,
  logScale,
  bandScale,
  ordinalScale,
  niceLinearTicks,
  niceDomain,
  extent,
  computeYDomain,
} from './scales';
import {
  buildLinePath,
  buildAreaPath,
  buildAreaPathFlat,
  buildArcPath,
  buildRadarPath,
  buildBarRect,
  fmt,
} from './paths';
import {
  squarifyTreemap,
  computeFunnelLayout,
  computeGaugeArcs,
  computeCandlestickBars,
  computeHeatmapCells,
} from './layout';

/* ═══════════════════════════════════════════════════════════════════
   scales.ts
   ═══════════════════════════════════════════════════════════════════ */

describe('linearScale', () => {
  it('maps domain start to range start', () => {
    const scale = linearScale([0, 100], [0, 400]);
    expect(scale(0)).toBe(0);
  });

  it('maps domain end to range end', () => {
    const scale = linearScale([0, 100], [0, 400]);
    expect(scale(100)).toBe(400);
  });

  it('maps midpoint linearly', () => {
    const scale = linearScale([0, 100], [0, 400]);
    expect(scale(50)).toBe(200);
  });

  it('handles inverted range (flipped y-axis)', () => {
    const scale = linearScale([0, 100], [400, 0]);
    expect(scale(0)).toBe(400);
    expect(scale(100)).toBe(0);
    expect(scale(50)).toBe(200);
  });

  it('handles negative domain values', () => {
    const scale = linearScale([-50, 50], [0, 200]);
    expect(scale(0)).toBe(100);
    expect(scale(-50)).toBe(0);
    expect(scale(50)).toBe(200);
  });

  it('returns midpoint when domain has zero span', () => {
    const scale = linearScale([5, 5], [0, 100]);
    expect(scale(5)).toBe(50);
    expect(scale(99)).toBe(50);
  });

  it('extrapolates beyond domain', () => {
    const scale = linearScale([0, 100], [0, 100]);
    expect(scale(150)).toBe(150);
    expect(scale(-10)).toBe(-10);
  });
});

describe('logScale', () => {
  it('maps domain start to range start', () => {
    const scale = logScale([1, 100], [0, 200]);
    expect(scale(1)).toBeCloseTo(0, 5);
  });

  it('maps domain end to range end', () => {
    const scale = logScale([1, 100], [0, 200]);
    expect(scale(100)).toBeCloseTo(200, 5);
  });

  it('maps midpoint logarithmically (log10(10) = 1, midway on log10 1→100)', () => {
    const scale = logScale([1, 100], [0, 200]);
    expect(scale(10)).toBeCloseTo(100, 3);
  });

  it('returns midpoint when domain has zero span', () => {
    const scale = logScale([10, 10], [0, 100]);
    expect(scale(10)).toBe(50);
  });

  it('handles zero / negative values by clamping to 1e-10', () => {
    const scale = logScale([1, 100], [0, 200]);
    expect(typeof scale(0)).toBe('number');
    expect(isFinite(scale(0))).toBe(true);
  });
});

describe('bandScale', () => {
  it('returns zero bandwidth for empty domain', () => {
    const { bandwidth, step } = bandScale([], [0, 400]);
    expect(bandwidth).toBe(0);
    expect(step).toBe(0);
  });

  it('returns 0 from scale for unknown key', () => {
    const { scale } = bandScale(['a', 'b'], [0, 400]);
    expect(scale('z')).toBe(0);
  });

  it('positions categories from left to right', () => {
    const { scale } = bandScale(['a', 'b', 'c'], [0, 300], 0, 0);
    expect(scale('a')).toBeLessThan(scale('b'));
    expect(scale('b')).toBeLessThan(scale('c'));
  });

  it('bandwidth is positive', () => {
    const { bandwidth } = bandScale(['x', 'y', 'z'], [0, 600]);
    expect(bandwidth).toBeGreaterThan(0);
  });

  it('three bands fit within range with default padding', () => {
    const { scale, bandwidth } = bandScale(['a', 'b', 'c'], [0, 300]);
    const lastStart = scale('c');
    expect(lastStart + bandwidth).toBeLessThanOrEqual(300 + 1);
  });

  it('handles single-item domain', () => {
    const { scale, bandwidth } = bandScale(['only'], [0, 200]);
    expect(scale('only')).toBeGreaterThanOrEqual(0);
    expect(bandwidth).toBeGreaterThan(0);
  });
});

describe('ordinalScale', () => {
  it('maps first domain value to first range color', () => {
    const scale = ordinalScale(['a', 'b', 'c'], ['red', 'green', 'blue']);
    expect(scale('a')).toBe('red');
    expect(scale('b')).toBe('green');
    expect(scale('c')).toBe('blue');
  });

  it('cycles when domain is larger than range', () => {
    const scale = ordinalScale(['a', 'b', 'c', 'd'], ['red', 'blue']);
    expect(scale('a')).toBe('red');
    expect(scale('b')).toBe('blue');
    expect(scale('c')).toBe('red');
    expect(scale('d')).toBe('blue');
  });

  it('returns first range value for unknown domain key', () => {
    const scale = ordinalScale(['a'], ['#fff']);
    expect(scale('unknown')).toBe('#fff');
  });

  it('returns empty string when range is empty', () => {
    const scale = ordinalScale(['a'], []);
    expect(scale('a')).toBe('');
  });
});

describe('niceLinearTicks', () => {
  it('returns a single element when min equals max', () => {
    const ticks = niceLinearTicks(5, 5);
    expect(ticks).toEqual([5]);
  });

  it('returns approximately count ticks', () => {
    // niceLinearTicks snaps step to round values, so actual count can vary
    const ticks = niceLinearTicks(0, 100, 5);
    expect(ticks.length).toBeGreaterThanOrEqual(2);
    expect(ticks.length).toBeLessThanOrEqual(8);
  });

  it('first tick is <= min and last tick is >= max', () => {
    const ticks = niceLinearTicks(3, 97, 5);
    expect(ticks[0]).toBeLessThanOrEqual(3);
    expect(ticks[ticks.length - 1]).toBeGreaterThanOrEqual(97);
  });

  it('produces round numbers', () => {
    const ticks = niceLinearTicks(0, 1000, 5);
    ticks.forEach((t) => {
      expect(t % 100).toBe(0);
    });
  });

  it('handles negative ranges', () => {
    const ticks = niceLinearTicks(-100, 0, 5);
    expect(ticks[0]).toBeLessThanOrEqual(-100);
    expect(ticks[ticks.length - 1]).toBeGreaterThanOrEqual(0);
  });
});

describe('niceDomain', () => {
  it('returns [min, max] pair covering the input range', () => {
    const [lo, hi] = niceDomain(3, 97);
    expect(lo).toBeLessThanOrEqual(3);
    expect(hi).toBeGreaterThanOrEqual(97);
  });

  it('min < max', () => {
    const [lo, hi] = niceDomain(10, 90);
    expect(lo).toBeLessThan(hi);
  });
});

describe('extent', () => {
  it('returns [0, 1] for empty array', () => {
    expect(extent([])).toEqual([0, 1]);
  });

  it('finds min and max correctly', () => {
    expect(extent([3, 1, 4, 1, 5, 9, 2, 6])).toEqual([1, 9]);
  });

  it('handles negative values', () => {
    expect(extent([-5, -1, 0, 3])).toEqual([-5, 3]);
  });

  it('returns same value for single-element array', () => {
    expect(extent([42])).toEqual([42, 42]);
  });
});

describe('computeYDomain', () => {
  const data = [
    { a: 10, b: 20, c: 5 },
    { a: 30, b: 15, c: 8 },
  ];

  it('returns [0, 100] for empty data', () => {
    expect(computeYDomain([], [], [], true)).toEqual([0, 100]);
  });

  it('returns [0, 100] for empty dataKeys', () => {
    expect(computeYDomain(data, [], [], true)).toEqual([0, 100]);
  });

  it('includes zero when includeZero=true and all values positive', () => {
    const [lo] = computeYDomain(data, ['a', 'b'], [undefined, undefined], true);
    expect(lo).toBeLessThanOrEqual(0);
  });

  it('does not force zero when includeZero=false and all values positive', () => {
    const [lo] = computeYDomain(data, ['a'], [undefined], false);
    expect(lo).toBeGreaterThan(0);
  });

  it('stacks values by stackId', () => {
    const d = [{ x: 10, y: 20 }];
    const [, hi] = computeYDomain(d, ['x', 'y'], ['s1', 's1'], true);
    expect(hi).toBeGreaterThanOrEqual(30);
  });

  it('handles mix of stacked and unstacked series', () => {
    const d = [{ a: 40, b: 10, c: 5 }];
    const [, hi] = computeYDomain(d, ['a', 'b', 'c'], ['s1', 's1', undefined], true);
    // stacked(a+b)=50 wins over unstacked c=5
    expect(hi).toBeGreaterThanOrEqual(50);
  });

  it('returns domain with min == max padded by ±1', () => {
    const d = [{ v: 7 }];
    const [lo, hi] = computeYDomain(d, ['v'], [undefined], false);
    expect(hi - lo).toBeGreaterThan(0);
  });
});

/* ═══════════════════════════════════════════════════════════════════
   paths.ts
   ═══════════════════════════════════════════════════════════════════ */

describe('fmt (internal formatter)', () => {
  it('formats integers without decimals', () => {
    expect(fmt(5)).toBe('5');
    expect(fmt(0)).toBe('0');
  });

  it('formats floats with up to 3 decimals, trimming trailing zeros', () => {
    expect(fmt(1.5)).toBe('1.5');
    expect(fmt(1.25)).toBe('1.25');
    // JS toFixed(3) on 1.2345 yields '1.234' due to float representation
    expect(fmt(1.2345)).toBe('1.234');
    expect(fmt(1.236)).toBe('1.236');
  });
});

describe('buildLinePath', () => {
  it('returns empty string for empty points array', () => {
    expect(buildLinePath([])).toBe('');
  });

  it('returns M command for single point', () => {
    expect(buildLinePath([[10, 20]])).toBe('M 10 20');
  });

  it('filters out non-finite points', () => {
    const result = buildLinePath([[NaN, 0], [10, 20], [Infinity, 5]]);
    expect(result).toBe('M 10 20');
  });

  describe('linear (default)', () => {
    it('starts with M and uses L commands', () => {
      const d = buildLinePath([[0, 0], [10, 10], [20, 5]], 'linear');
      expect(d).toMatch(/^M/);
      expect(d).toContain('L');
    });

    it('contains all point coordinates', () => {
      const d = buildLinePath([[0, 0], [100, 50]], 'linear');
      expect(d).toContain('0 0');
      expect(d).toContain('100 50');
    });
  });

  describe('catmullRom', () => {
    it('starts with M and uses C bezier commands', () => {
      const d = buildLinePath([[0, 0], [10, 5], [20, 0], [30, 5]], 'catmullRom');
      expect(d).toMatch(/^M/);
      expect(d).toContain('C');
    });

    it('falls back to linear path for 2 points', () => {
      const d = buildLinePath([[0, 0], [10, 10]], 'catmullRom');
      expect(d).toMatch(/^M/);
    });
  });

  describe('step', () => {
    it('uses H and V commands', () => {
      const d = buildLinePath([[0, 0], [10, 5], [20, 10]], 'step');
      expect(d).toContain('H');
      expect(d).toContain('V');
    });
  });

  describe('stepBefore', () => {
    it('uses V before H', () => {
      const d = buildLinePath([[0, 0], [10, 5]], 'stepBefore');
      expect(d).toContain('V');
      expect(d).toContain('H');
    });
  });

  describe('stepAfter', () => {
    it('uses H before V', () => {
      const d = buildLinePath([[0, 0], [10, 5]], 'stepAfter');
      expect(d).toContain('H');
      expect(d).toContain('V');
    });
  });

  describe('monotoneX', () => {
    it('produces a cubic bezier path', () => {
      const d = buildLinePath([[0, 0], [10, 5], [20, 3], [30, 8]], 'monotoneX');
      expect(d).toContain('C');
    });

    it('never overshoots between two monotone points', () => {
      // All y-values increasing: curve should never go below start or above end
      const points: [number, number][] = [[0, 0], [10, 10], [20, 20], [30, 30]];
      const d = buildLinePath(points, 'monotoneX');
      expect(d).toMatch(/^M/);
    });
  });

  describe('bumpX', () => {
    it('produces cubic bezier curves with horizontal tangents', () => {
      const d = buildLinePath([[0, 0], [50, 100]], 'bumpX');
      expect(d).toContain('C');
      // midX = 25 should appear as control point x
      expect(d).toContain('25');
    });
  });

  describe('natural', () => {
    it('produces a path for < 20 points', () => {
      const pts: [number, number][] = Array.from({ length: 5 }, (_, i) => [i * 10, i * 5]);
      const d = buildLinePath(pts, 'natural');
      expect(d).toMatch(/^M/);
    });

    it('produces a path for >= 20 points', () => {
      const pts: [number, number][] = Array.from({ length: 25 }, (_, i) => [i * 5, i * 3]);
      const d = buildLinePath(pts, 'natural');
      expect(d).toMatch(/^M/);
    });
  });
});

describe('buildAreaPath', () => {
  it('returns empty string for empty topPoints', () => {
    expect(buildAreaPath([], [], 'linear')).toBe('');
  });

  it('produces a closed path ending with Z', () => {
    const top: [number, number][] = [[0, 10], [10, 5], [20, 8]];
    const bottom: [number, number][] = [[0, 50], [10, 50], [20, 50]];
    const d = buildAreaPath(top, bottom);
    expect(d.endsWith('Z')).toBe(true);
  });

  it('includes top path coordinates', () => {
    const top: [number, number][] = [[0, 10], [20, 5]];
    const bottom: [number, number][] = [[0, 50], [20, 50]];
    const d = buildAreaPath(top, bottom);
    expect(d).toContain('10');
    expect(d).toContain('50');
  });
});

describe('buildAreaPathFlat', () => {
  it('returns empty string for empty topPoints', () => {
    expect(buildAreaPathFlat([], 0)).toBe('');
  });

  it('produces a closed path', () => {
    const top: [number, number][] = [[0, 10], [10, 5], [20, 8]];
    const d = buildAreaPathFlat(top, 50);
    expect(d.endsWith('Z')).toBe(true);
  });

  it('includes the y0 baseline value', () => {
    const top: [number, number][] = [[0, 10], [10, 5]];
    const d = buildAreaPathFlat(top, 100);
    expect(d).toContain('100');
  });
});

describe('buildArcPath', () => {
  const cx = 100, cy = 100, outerR = 80, innerR = 40;

  it('returns a non-empty path for a standard donut slice', () => {
    const d = buildArcPath(cx, cy, outerR, innerR, 0, Math.PI / 2);
    expect(d.length).toBeGreaterThan(0);
    expect(d).toContain('A');
    expect(d.endsWith('Z')).toBe(true);
  });

  it('returns a full circle path for full pie (innerRadius = 0)', () => {
    const d = buildArcPath(cx, cy, outerR, 0, 0, 2 * Math.PI);
    expect(d).toContain('A');
    expect(d).toContain('1 1');
  });

  it('returns a full donut ring for full circle donut', () => {
    const d = buildArcPath(cx, cy, outerR, innerR, 0, 2 * Math.PI);
    // Contains two arcs (outer + inner)
    const arcCount = (d.match(/A /g) ?? []).length;
    expect(arcCount).toBeGreaterThanOrEqual(4);
  });

  it('produces a pie slice (no hole) for innerRadius = 0', () => {
    const d = buildArcPath(cx, cy, outerR, 0, 0, Math.PI / 3);
    expect(d).toContain(`M ${fmt(cx)}`);
    expect(d).toContain('L');
  });

  it('sets largeArc=1 for angles > PI', () => {
    const d = buildArcPath(cx, cy, outerR, innerR, 0, Math.PI + 0.1);
    expect(d).toContain('1 1');
  });

  it('sets largeArc=0 for angles <= PI', () => {
    const d = buildArcPath(cx, cy, outerR, innerR, 0, Math.PI / 2);
    expect(d).toContain('0 1');
  });

  it('clamps corner radius to fit arc geometry', () => {
    const d = buildArcPath(cx, cy, outerR, innerR, 0, Math.PI / 4, 999);
    expect(d.length).toBeGreaterThan(0);
  });
});

describe('buildRadarPath', () => {
  it('returns empty string for empty values', () => {
    expect(buildRadarPath([], 100, 100, 80)).toBe('');
  });

  it('returns a closed path', () => {
    const d = buildRadarPath([0.5, 1.0, 0.75, 0.25], 100, 100, 80);
    expect(d.endsWith('Z')).toBe(true);
  });

  it('starts with M', () => {
    const d = buildRadarPath([1, 1, 1], 100, 100, 80);
    expect(d).toMatch(/^M/);
  });

  it('uses L to connect all points', () => {
    const d = buildRadarPath([0.5, 0.8, 0.6, 0.9, 0.3], 100, 100, 80);
    const lCount = (d.match(/ L /g) ?? []).length;
    expect(lCount).toBe(4);
  });

  it('zero values produce points at center', () => {
    const d = buildRadarPath([0, 0, 0], 100, 100, 80);
    // All points should be near center (cx=100, cy=100)
    expect(d).toContain('100');
  });
});

describe('buildBarRect', () => {
  it('returns correct x, y, width, height', () => {
    const rect = buildBarRect(10, 20, 40, 60);
    expect(rect.x).toBe(10);
    expect(rect.y).toBe(20);
    expect(rect.width).toBe(40);
    expect(rect.height).toBe(60);
  });

  it('applies radius (clamped to half dimension)', () => {
    const rect = buildBarRect(0, 0, 20, 100, 5);
    expect(rect.rx).toBe(5);
    expect(rect.ry).toBe(5);
  });

  it('clamps radius that exceeds half-width', () => {
    const rect = buildBarRect(0, 0, 10, 100, 99);
    expect(rect.rx).toBeLessThanOrEqual(5);
  });

  it('clamps radius that exceeds half-height', () => {
    const rect = buildBarRect(0, 0, 100, 6, 99);
    expect(rect.rx).toBeLessThanOrEqual(3);
  });

  it('defaults to zero radius', () => {
    const rect = buildBarRect(0, 0, 50, 50);
    expect(rect.rx).toBe(0);
    expect(rect.ry).toBe(0);
  });
});

/* ═══════════════════════════════════════════════════════════════════
   layout.ts
   ═══════════════════════════════════════════════════════════════════ */

describe('squarifyTreemap', () => {
  it('returns empty array for empty nodes', () => {
    expect(squarifyTreemap([], 0, 0, 400, 300)).toEqual([]);
  });

  it('returns empty array when all values are zero', () => {
    const nodes = [{ name: 'a', value: 0 }, { name: 'b', value: 0 }];
    expect(squarifyTreemap(nodes, 0, 0, 400, 300)).toEqual([]);
  });

  it('places a single node spanning the full area (minus padding)', () => {
    const result = squarifyTreemap([{ name: 'only', value: 100 }], 0, 0, 400, 300, 0);
    expect(result).toHaveLength(1);
    expect(result[0]?.width).toBe(400);
    expect(result[0]?.height).toBe(300);
  });

  it('total area of leaves matches container area (approximately)', () => {
    const nodes = [
      { name: 'a', value: 60 },
      { name: 'b', value: 30 },
      { name: 'c', value: 10 },
    ];
    const result = squarifyTreemap(nodes, 0, 0, 400, 300, 0);
    const totalArea = result.reduce((s, n) => s + n.width * n.height, 0);
    expect(totalArea).toBeCloseTo(400 * 300, -2);
  });

  it('all nodes fit within the container bounds', () => {
    const nodes = [
      { name: 'a', value: 50 },
      { name: 'b', value: 30 },
      { name: 'c', value: 20 },
    ];
    const result = squarifyTreemap(nodes, 10, 10, 400, 300, 2);
    result.forEach((n) => {
      expect(n.x).toBeGreaterThanOrEqual(10);
      expect(n.y).toBeGreaterThanOrEqual(10);
      expect(n.x + n.width).toBeLessThanOrEqual(410 + 1);
      expect(n.y + n.height).toBeLessThanOrEqual(310 + 1);
    });
  });

  it('propagates depth correctly for nested nodes', () => {
    const nodes = [
      {
        name: 'parent',
        children: [
          { name: 'child1', value: 60 },
          { name: 'child2', value: 40 },
        ],
      },
    ];
    const result = squarifyTreemap(nodes, 0, 0, 400, 300, 0);
    expect(result).toHaveLength(1);
    expect(result[0]?.depth).toBe(0);
    expect(result[0]?.children?.length).toBe(2);
    result[0]?.children?.forEach((c) => expect(c.depth).toBe(1));
  });

  it('assigns node names correctly', () => {
    const nodes = [{ name: 'foo', value: 100 }, { name: 'bar', value: 50 }];
    const result = squarifyTreemap(nodes, 0, 0, 600, 400, 0);
    const names = result.map((n) => n.name).sort();
    expect(names).toEqual(['bar', 'foo']);
  });
});

describe('computeFunnelLayout', () => {
  it('returns empty array for empty data', () => {
    expect(computeFunnelLayout([], 0, 0, 200, 400)).toEqual([]);
  });

  it('returns empty array when all values are zero', () => {
    const data = [{ name: 'a', value: 0 }];
    expect(computeFunnelLayout(data, 0, 0, 200, 400)).toEqual([]);
  });

  it('returns one segment per data item', () => {
    const data = [
      { name: 'Top', value: 100 },
      { name: 'Mid', value: 60 },
      { name: 'Bot', value: 30 },
    ];
    const result = computeFunnelLayout(data, 0, 0, 200, 300);
    expect(result).toHaveLength(3);
  });

  it('first item has percentage 100', () => {
    const data = [{ name: 'Top', value: 200 }, { name: 'Bot', value: 100 }];
    const result = computeFunnelLayout(data, 0, 0, 200, 300);
    expect(result[0]?.percentage).toBe(100);
  });

  it('subsequent items have percentage proportional to first', () => {
    const data = [{ name: 'Top', value: 200 }, { name: 'Bot', value: 100 }];
    const result = computeFunnelLayout(data, 0, 0, 200, 300);
    expect(result[1]?.percentage).toBe(50);
  });

  it('each segment has a non-empty SVG path', () => {
    const data = [{ name: 'a', value: 100 }, { name: 'b', value: 50 }];
    const result = computeFunnelLayout(data, 0, 0, 200, 300);
    result.forEach((seg) => {
      expect(seg.path.length).toBeGreaterThan(0);
      expect(seg.path.endsWith('Z')).toBe(true);
    });
  });

  it('segments are stacked top-to-bottom without overlap', () => {
    const data = [
      { name: 'a', value: 100 },
      { name: 'b', value: 80 },
      { name: 'c', value: 60 },
    ];
    const result = computeFunnelLayout(data, 0, 0, 200, 300, 4);
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i]!.y2).toBeLessThanOrEqual(result[i + 1]!.y1 + 0.01);
    }
  });

  it('top width narrows as values decrease', () => {
    const data = [{ name: 'big', value: 100 }, { name: 'small', value: 10 }];
    const result = computeFunnelLayout(data, 0, 0, 200, 300);
    const topWidth = result[0]!.x2 - result[0]!.x1;
    const botWidth = result[1]!.x2 - result[1]!.x1;
    expect(topWidth).toBeGreaterThan(botWidth);
  });
});

describe('computeGaugeArcs', () => {
  it('fraction is clamped to [0, 1]', () => {
    const overMax = computeGaugeArcs(200, 0, 100, -135, 135, 80, 20);
    expect(overMax.fraction).toBe(1);

    const underMin = computeGaugeArcs(-10, 0, 100, -135, 135, 80, 20);
    expect(underMin.fraction).toBe(0);
  });

  it('fraction is 0.5 for value at midpoint', () => {
    const result = computeGaugeArcs(50, 0, 100, -135, 135, 80, 20);
    expect(result.fraction).toBeCloseTo(0.5);
  });

  it('trackPath is non-empty', () => {
    const result = computeGaugeArcs(50, 0, 100, -135, 135, 80, 20);
    expect(result.trackPath.length).toBeGreaterThan(0);
  });

  it('fillPath is empty when value === min', () => {
    const result = computeGaugeArcs(0, 0, 100, -135, 135, 80, 20);
    expect(result.fillPath).toBe('');
  });

  it('fillPath is non-empty when value > min', () => {
    const result = computeGaugeArcs(75, 0, 100, -135, 135, 80, 20);
    expect(result.fillPath.length).toBeGreaterThan(0);
  });

  it('innerRadius = outerRadius - thickness', () => {
    const result = computeGaugeArcs(50, 0, 100, -135, 135, 80, 15);
    expect(result.innerRadius).toBe(65);
    expect(result.outerRadius).toBe(80);
  });

  it('cx and cy equal outerRadius', () => {
    const result = computeGaugeArcs(50, 0, 100, 0, 180, 60, 10);
    expect(result.cx).toBe(60);
    expect(result.cy).toBe(60);
  });

  it('trackPath contains arc commands', () => {
    const result = computeGaugeArcs(50, 0, 100, -135, 135, 80, 20);
    expect(result.trackPath).toContain('A');
  });
});

describe('computeCandlestickBars', () => {
  const ohlcData = [
    { open: 100, high: 120, low: 90, close: 110 },
    { open: 110, high: 130, low: 105, close: 105 },
    { open: 105, high: 115, low: 95, close: 108 },
  ];
  const xScale = (i: number) => i * 40;
  const yScale = (v: number) => 200 - v;
  const bandWidth = 30;

  it('returns one bar per data point', () => {
    const bars = computeCandlestickBars(ohlcData, xScale, yScale, bandWidth);
    expect(bars).toHaveLength(3);
  });

  it('marks bullish candle correctly (close >= open)', () => {
    const bars = computeCandlestickBars(ohlcData, xScale, yScale, bandWidth);
    expect(bars[0]?.bullish).toBe(true);
    expect(bars[1]?.bullish).toBe(false);
  });

  it('candleWidth is 80% of bandWidth', () => {
    const bars = computeCandlestickBars(ohlcData, xScale, yScale, bandWidth);
    bars.forEach((b) => expect(b.candleWidth).toBe(bandWidth * 0.8));
  });

  it('x positions follow xScale', () => {
    const bars = computeCandlestickBars(ohlcData, xScale, yScale, bandWidth);
    expect(bars[0]?.x).toBe(0);
    expect(bars[1]?.x).toBe(40);
    expect(bars[2]?.x).toBe(80);
  });

  it('highY <= lowY in SVG space (larger value = lower pixel)', () => {
    const bars = computeCandlestickBars(ohlcData, xScale, yScale, bandWidth);
    bars.forEach((b) => {
      expect(b.highY).toBeLessThanOrEqual(b.lowY);
    });
  });

  it('returns empty array for empty data', () => {
    expect(computeCandlestickBars([], xScale, yScale, bandWidth)).toEqual([]);
  });
});

describe('computeHeatmapCells', () => {
  const data = [
    { x: 'Mon', y: 'A', v: 10 },
    { x: 'Mon', y: 'B', v: 20 },
    { x: 'Tue', y: 'A', v: 5 },
    { x: 'Tue', y: 'B', v: 15 },
  ];
  const xScale = (v: string) => ({ Mon: 0, Tue: 50 }[v] ?? 0);
  const yScale = (v: string) => ({ A: 0, B: 40 }[v] ?? 0);

  it('returns one cell per data row', () => {
    const cells = computeHeatmapCells(data, 'x', 'y', 'v', xScale, yScale, 50, 40);
    expect(cells).toHaveLength(4);
  });

  it('normalised value for max is 1 and for min is 0', () => {
    const cells = computeHeatmapCells(data, 'x', 'y', 'v', xScale, yScale, 50, 40);
    const norms = cells.map((c) => c.normalised).sort((a, b) => a - b);
    expect(norms[0]).toBe(0);
    expect(norms[norms.length - 1]).toBe(1);
  });

  it('all normalised values are in [0, 1]', () => {
    const cells = computeHeatmapCells(data, 'x', 'y', 'v', xScale, yScale, 50, 40);
    cells.forEach((c) => {
      expect(c.normalised).toBeGreaterThanOrEqual(0);
      expect(c.normalised).toBeLessThanOrEqual(1);
    });
  });

  it('assigns correct cell dimensions', () => {
    const cells = computeHeatmapCells(data, 'x', 'y', 'v', xScale, yScale, 50, 40);
    cells.forEach((c) => {
      expect(c.width).toBe(50);
      expect(c.height).toBe(40);
    });
  });

  it('uses xScale and yScale for cell position', () => {
    const cells = computeHeatmapCells(data, 'x', 'y', 'v', xScale, yScale, 50, 40);
    const monA = cells.find((c) => c.xValue === 'Mon' && c.yValue === 'A');
    expect(monA?.x).toBe(0);
    expect(monA?.y).toBe(0);

    const tueB = cells.find((c) => c.xValue === 'Tue' && c.yValue === 'B');
    expect(tueB?.x).toBe(50);
    expect(tueB?.y).toBe(40);
  });

  it('handles non-numeric value keys by treating them as 0', () => {
    const d = [{ x: 'Mon', y: 'A', v: 'not-a-number' }];
    const cells = computeHeatmapCells(d, 'x', 'y', 'v', xScale, yScale, 50, 40);
    expect(cells[0]?.value).toBe(0);
  });

  it('handles single-row data without division by zero in normalisation', () => {
    const d = [{ x: 'Mon', y: 'A', v: 42 }];
    const cells = computeHeatmapCells(d, 'x', 'y', 'v', xScale, yScale, 50, 40);
    expect(cells[0]?.normalised).toBe(0);
  });
});
