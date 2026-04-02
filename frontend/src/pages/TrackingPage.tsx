import React from 'react'
import Navbar from '../components/layout/Navbar'
import { Link } from 'react-router-dom'

const items = [
  'Filter changes send a POST /track request.',
  'Bar clicks send a POST /track request.',
  'The backend stores each event with the logged-in user and a timestamp.',
]

export default function TrackingPage() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="page-hero">
          <div>
            <div className="page-kicker">Tracking</div>
            <h2 style={{ marginBottom: 8 }}>How interactions are recorded</h2>
            <p className="muted" style={{ marginTop: 0 }}>
              Every important interaction is tracked and sent back into the analytics pipeline.
            </p>
          </div>
          <Link to="/" className="btn">Back to Dashboard</Link>
        </div>

        <div className="small-card page-card">
          <h3 style={{ marginTop: 0 }}>Tracked events</h3>
          <ul className="feature-list feature-list--plain">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
