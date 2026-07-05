import type { ChartData } from './widget.schema.js';

const POINT_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] as const;
const MIN_VALUE = 10;
const MAX_VALUE = 100;

function randomValue(): number {
  return MIN_VALUE + Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1));
}

export function generateChartData(): ChartData {
  return POINT_LABELS.map((name) => ({ name, value: randomValue() }));
}
