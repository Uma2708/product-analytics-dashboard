import React from 'react'
import { Filters } from '../../types/analytics'
import { trackFeature } from '../../api/trackingApi'

type Props = {
  filters: Filters
  setFilters: (fn: (prev: Filters) => Filters) => void
}

export default function FilterPanel({ filters, setFilters }: Props) {
  const onChange = (k: keyof Filters, v: any) => {
    setFilters((prev) => ({ ...prev, [k]: v }))
    // track the filter change
    const mapping: any = { startDate: 'date_filter', endDate: 'date_filter', ageGroup: 'age_filter', gender: 'gender_filter' }
    const feature = mapping[k]
    if (feature) trackFeature(feature).catch(() => {})
  }

  return (
    <div className="filters-grid">
      <div className="filter-group">
        <label className="inline">Start Date</label>
        <div className="date-shell">
          <input className="input input--date" type="date" value={filters.startDate || ''} onChange={(e) => onChange('startDate', e.target.value || null)} />
          <span className="date-shell__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
              <path d="M8 3v4M16 3v4M3 9h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>
      <div className="filter-group">
        <label className="inline">End Date</label>
        <div className="date-shell">
          <input className="input input--date" type="date" value={filters.endDate || ''} onChange={(e) => onChange('endDate', e.target.value || null)} />
          <span className="date-shell__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
              <path d="M8 3v4M16 3v4M3 9h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>
      <div className="filter-group">
        <label className="inline">Age Group</label>
        <div className="select-shell">
          <select className="input input--select" value={filters.ageGroup} onChange={(e) => onChange('ageGroup', e.target.value)}>
            <option value="all">All</option>
            <option value="<18">{'<18'}</option>
            <option value="18-40">18-40</option>
            <option value=">40">{'>40'}</option>
          </select>
          <span className="select-shell__icon" aria-hidden="true">▾</span>
        </div>
      </div>
      <div className="filter-group">
        <label className="inline">Gender</label>
        <div className="select-shell">
          <select className="input input--select" value={filters.gender} onChange={(e) => onChange('gender', e.target.value)}>
            <option value="all">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <span className="select-shell__icon" aria-hidden="true">▾</span>
        </div>
      </div>
    </div>
  )
}
