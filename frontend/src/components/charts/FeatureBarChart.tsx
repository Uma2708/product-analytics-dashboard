import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from 'recharts'

type Props = {
  data: { featureName: string; count: number }[]
  onBarClick?: (featureName: string) => void
  emptyMessage?: string
}

const tooltipStyle = {
  background: 'rgba(8, 11, 25, 0.96)',
  border: '1px solid rgba(249, 115, 22, 0.24)',
  borderRadius: 14,
  boxShadow: '0 18px 40px rgba(2, 6, 23, 0.45)',
  color: '#e6eef8',
  padding: '10px 12px',
}

function formatCount(value: unknown) {
  return typeof value === 'number' ? value.toLocaleString() : value
}

export default function FeatureBarChart({ data, onBarClick, emptyMessage }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className="chart-empty-state">
        <div className="chart-empty-state__title">No chart data yet</div>
        <div className="chart-empty-state__copy">
          {emptyMessage || 'Nothing has been recorded for the current filters yet.'}
        </div>
      </div>
    )
  }

  return (
    <div className="chart-viewport">
      <ResponsiveContainer>
        <BarChart layout="vertical" data={data} margin={{ top: 8, right: 18, left: 18, bottom: 8 }}>
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb923c" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#ea580c" stopOpacity={0.78} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="4 8" vertical={false} />
          <XAxis
            type="number"
            stroke="rgba(230, 238, 248, 0.55)"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={formatCount}
          />
          <YAxis
            type="category"
            dataKey="featureName"
            width={120}
            stroke="rgba(230, 238, 248, 0.55)"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval={0}
          />
          <Tooltip
            cursor={{ fill: 'rgba(249, 115, 22, 0.08)' }}
            contentStyle={tooltipStyle}
            labelStyle={{ color: '#fdd4b3', fontWeight: 700, marginBottom: 4 }}
            formatter={(value) => [formatCount(value), 'Clicks']}
          />
          <Bar
            dataKey="count"
            fill="url(#barGrad)"
            radius={[0, 12, 12, 0]}
            onClick={(e: any) => onBarClick && onBarClick(e.featureName)}
            cursor="pointer"
            maxBarSize={22}
            activeBar={{ fill: '#fdba74' }}
          >
            <LabelList
              dataKey="count"
              position="right"
              offset={10}
              style={{ fill: 'rgba(230, 238, 248, 0.9)', fontSize: 12, fontWeight: 700 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
