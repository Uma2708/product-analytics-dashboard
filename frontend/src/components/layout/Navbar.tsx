import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function Navbar() {
  const nav = useNavigate()
  const { user, logout, hasToken } = useAuth()

  const initials = user?.username ? user.username.split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase() : 'PA'

  return (
    <header className="site-header">
      <div className="nav-inner">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div className="brand">
            <div className="logo-sm">PA</div>
            <div>
              <div>Product Analytics</div>
              <div className="brand-sub">Interactive Dashboard</div>
            </div>
          </div>
        </div>

        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <nav className="nav-links" aria-label="Main navigation">
            <Link to="/">Dashboard</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/tracking">Tracking</Link>
          </nav>

          <div className="nav-actions">
            {(hasToken || user) && (
              <>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <div className="avatar">{initials}</div>
                </div>
                <button
                  className="logout-btn"
                  onClick={() => {
                    logout()
                    nav('/login')
                  }}
                >
                  Logout
                </button>
              </>
            )}
            {!hasToken && !user && <Link to="/login" className="logout-btn">Login</Link>}
          </div>
        </div>
      </div>
    </header>
  )
}
