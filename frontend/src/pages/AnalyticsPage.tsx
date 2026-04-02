import React from 'react'
import Navbar from '../components/layout/Navbar'
import { Link } from 'react-router-dom'

const cards = [
  {
    title: 'Feature usage',
    text: 'See which features are getting the most engagement in the selected date range.',
  },
  {
    title: 'Daily trend',
    text: 'Review click volume over time and spot spikes, dips, and empty days quickly.',
  },
  {
    title: 'Segment filters',
    text: 'Slice the data by age group and gender to compare audience behavior.',
  },
]

export default function AnalyticsPage() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="page-hero">
          <div>
            <div className="page-kicker">Analytics</div>
            <h2 style={{ marginBottom: 8 }}>What the dashboard measures</h2>
            <p className="muted" style={{ marginTop: 0 }}>
              This page explains the analytics view and points you back to the live charts.
            </p>
          </div>
          <Link to="/" className="btn">Open Dashboard</Link>
        </div>

        <div className="page-grid">
          {cards.map((card) => (
            <article key={card.title} className="small-card page-card">
              <h3 style={{ marginTop: 0 }}>{card.title}</h3>
              <p className="muted" style={{ marginBottom: 0, lineHeight: 1.7 }}>
                {card.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
