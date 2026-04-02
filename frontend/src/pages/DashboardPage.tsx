import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import FilterPanel from '../components/filters/FilterPanel'
import FeatureBarChart from '../components/charts/FeatureBarChart'
import FeatureTrendLineChart from '../components/charts/FeatureTrendLineChart'
import useCookiesFilters from '../hooks/useCookiesFilters'
import { getAnalytics } from '../api/analyticsApi'
import { getLocalDateInputValue } from '../utils/date'
import type { BarDataItem, LineDataItem } from '../types/analytics'

export default function DashboardPage() {
  const [filters, setFilters] = useCookiesFilters()
  const [barData, setBarData] = useState<BarDataItem[]>([])
  const [lineData, setLineData] = useState<LineDataItem[]>([])
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const requestIdRef = useRef(0)
  const today = getLocalDateInputValue()

  const emptyBarMessage =
    filters.startDate === today && filters.endDate === today
      ? 'There is no analytics data recorded for today yet. Adjust the date range to see older activity.'
      : 'No analytics data matches the current filters.'

  const dateLabel =
    filters.startDate && filters.endDate
      ? filters.startDate === filters.endDate
        ? filters.startDate
        : `${filters.startDate} to ${filters.endDate}`
      : 'All dates'
  const totalClicks = barData.reduce((sum, item) => sum + item.count, 0)
  const topFeature = barData[0]?.featureName || 'None yet'

  const load = async (featureName?: string | null) => {
    const requestId = ++requestIdRef.current
    setLoading(true)
    setError(null)
    try {
      const res = await getAnalytics({
        startDate: filters.startDate,
        endDate: filters.endDate,
        ageGroup: filters.ageGroup,
        gender: filters.gender,
        featureName,
      })
      if (requestId !== requestIdRef.current) return
      setBarData((res.data.barData || []) as BarDataItem[])
      setLineData((res.data.lineData || []) as LineDataItem[])
    } catch (e) {
      if (requestId !== requestIdRef.current) return
      console.error(e)
      setBarData([])
      setLineData([])
      setError('We could not load the dashboard right now. Please try again.')
    } finally {
      if (requestId === requestIdRef.current) setLoading(false)
    }
  }

  useEffect(() => { load(selectedFeature) }, [filters, selectedFeature])

  useEffect(() => {
    if (!selectedFeature) return
    const stillVisible = barData.some((item) => item.featureName === selectedFeature)
    if (!stillVisible) setSelectedFeature(null)
  }, [barData, selectedFeature])

  const onBarClick = (featureName: string) => {
    setSelectedFeature(featureName)
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div style={{marginBottom:24}}>
          <h2 style={{marginBottom:8}}>Dashboard</h2>
          <p className="muted" style={{marginTop:0}}>Track and analyze product features</p>
        </div>

        <div className="filters-card">
          <FilterPanel filters={filters} setFilters={setFilters as any} />
        </div>

        {error && <div className="error error--auth" style={{ marginBottom: 18 }}>{error}</div>}

        <div className="dashboard-metrics">
          <div className="dashboard-metric">
            <span>Total clicks</span>
            <strong>{totalClicks.toLocaleString()}</strong>
          </div>
          <div className="dashboard-metric">
            <span>Top feature</span>
            <strong>{topFeature}</strong>
          </div>
          <div className="dashboard-metric">
            <span>Daily clicks</span>
            <strong>{lineData.reduce((sum, item) => sum + item.count, 0).toLocaleString()}</strong>
          </div>
        </div>

        {loading ? (
          <div className="chart-card" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>Loading insights...</div>
          </div>
        ) : (
          <div className="dashboard-graphs">
            <div className="chart-card">
              <div className="chart-header">
                <h3 style={{margin:0}}>Feature Usage</h3>
                <span className="muted">{dateLabel}</span>
              </div>
              <FeatureBarChart data={barData} onBarClick={onBarClick} emptyMessage={emptyBarMessage} />
            </div>
            <div className="chart-card">
              <FeatureTrendLineChart
                data={lineData}
                emptyMessage={
                  filters.startDate === today && filters.endDate === today
                    ? 'No clicks have been recorded for today yet.'
                    : 'No daily activity matches the current filters.'
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
