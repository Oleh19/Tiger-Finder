import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { chartTheme } from '../lib/chartTheme';
import type { ChartWidget } from '../model/types';

export function WidgetChart({ widget }: { widget: ChartWidget }) {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        {widget.type === 'line' ? (
          <LineChart
            data={widget.data}
            margin={{ top: 8, right: 8, bottom: 0, left: -16 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
            <XAxis
              dataKey="name"
              stroke={chartTheme.axis}
              fontSize={12}
              tickLine={false}
            />
            <YAxis stroke={chartTheme.axis} fontSize={12} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={chartTheme.series}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        ) : (
          <BarChart
            data={widget.data}
            margin={{ top: 8, right: 8, bottom: 0, left: -16 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
            <XAxis
              dataKey="name"
              stroke={chartTheme.axis}
              fontSize={12}
              tickLine={false}
            />
            <YAxis stroke={chartTheme.axis} fontSize={12} tickLine={false} />
            <Tooltip />
            <Bar
              dataKey="value"
              fill={chartTheme.series}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
