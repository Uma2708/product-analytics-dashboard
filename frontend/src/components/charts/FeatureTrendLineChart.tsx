import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceDot,
} from 'recharts'

type Props = {
  data: { day: string; count: number }[]
  emptyMessage?: string
}

const tooltipStyle = {
  background: 'rgba(8, 11, 25, 0.96)',
  border: '1px solid rgba(249, 115, 22, 0.22)',
  borderRadius: 10,
  boxShadow: '0 18px 40px rgba(2, 6, 23, 0.45)',
  color: '#e6eef8',
  padding: '10px 12px',
}

function formatCount(value: unknown) {
  return typeof value === 'number' ? value.toLocaleString() : value
}

function formatDay(value: string) {
  const date = new Date(`${value}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    timeZone: 'UTC',
  }).format(date)
}

export default function FeatureTrendLineChart({ data, emptyMessage }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className="chart-empty-state">
        <div className="chart-empty-state__title">No daily chart data yet</div>
        <div className="chart-empty-state__copy">
          {emptyMessage || 'Try a wider date range or different filters.'}
        </div>
      </div>
    )
  }

  const peak = data.reduce((best, item) => (item.count > best.count ? item : best), data[0])
  const latest = data[data.length - 1]

  return (
    <div className="chart-viewport chart-viewport--light chart-viewport--daily">
      <div className="chart-viewport__header">
        <div>
          <div className="chart-viewport__eyebrow">Trend overview</div>
          <div className="chart-viewport__title">Clicks Daily</div>
        </div>
        <div className="chart-viewport__meta">
          <span>Peak {peak.count}</span>
          <span>Latest {latest.count}</span>
        </div>
      </div>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 8, right: 18, left: 6, bottom: 18 }}>
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb923c" stopOpacity={0.32} />
              <stop offset="100%" stopColor="#fb923c" stopOpacity={0.04} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(249,115,22,0.1)" strokeDasharray="4 8" vertical={false} />
          <XAxis
            dataKey="day"
            stroke="rgba(230,238,248,0.55)"
            tickLine={false}
            axisLine={{ stroke: 'rgba(249,115,22,0.18)' }}
            tickMargin={12}
            interval="preserveStartEnd"
            minTickGap={10}
            tick={({ x, y, payload }) => (
              <text x={x} y={y + 16} fill="rgba(230,238,248,0.72)" textAnchor="middle" fontSize={11}>
                {formatDay(String(payload.value))}
              </text>
            )}
          />
          <YAxis
            domain={[0, 'dataMax + 3']}
            ticks={[0, 5, 10, 15, 20, 25]}
            stroke="rgba(230,238,248,0.55)"
            tickLine={false}
            axisLine={{ stroke: 'rgba(249,115,22,0.18)' }}
            tickMargin={6}
            width={44}
            tickFormatter={formatCount}
          />
          <Tooltip
            cursor={{ stroke: 'rgba(249,115,22,0.18)', strokeWidth: 1 }}
            contentStyle={tooltipStyle}
            labelStyle={{ color: '#fdd4b3', fontWeight: 700, marginBottom: 4 }}
            formatter={(value) => [formatCount(value), 'Clicks']}
            labelFormatter={(label) => `Day: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="url(#lineGrad)"
            strokeWidth={2.2}
            fill="url(#areaGrad)"
            dot={false}
            activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2, fill: '#fb923c' }}
          />
          {latest && <ReferenceDot x={latest.day} y={latest.count} r={3.5} fill="#fb923c" stroke="#ffffff" strokeWidth={1.5} />}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
