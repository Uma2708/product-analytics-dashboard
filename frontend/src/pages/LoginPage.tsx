import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const nav = useNavigate()
  const { login: doLogin } = useAuth()
  const [submitting, setSubmitting] = useState(false)

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      setSubmitting(true)
      await doLogin(username, password)
      nav('/')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  const signInAsDemo = async () => {
    setError(null)
    setUsername('Uma21')
    setPassword('Uma@12345')

    try {
      setSubmitting(true)
      await doLogin('Uma21', 'Uma@12345')
      nav('/')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Demo login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-orb auth-orb-a" />
      <div className="auth-orb auth-orb-b" />
      <div className="auth-orb auth-orb-c" />

      <div className="auth-wrap auth-wrap--login">
        <section className="auth-panel auth-panel--story">
          <div className="auth-badge">Secure access</div>
          <div className="auth-hero">
            <div className="logo logo--hero">PA</div>
            <div className="auth-copy">
              <h1>Product analytics, rebuilt for focus.</h1>
              <p>
                Log in to explore a cleaner dashboard, smarter filters, and empty states that tell the right story when a day has no data yet.
              </p>
            </div>
          </div>

          <div className="story-card">
            <div className="story-card__label">What you get</div>
            <ul className="feature-list">
              <li>Realtime-style overview cards with crisp, low-noise visuals</li>
              <li>One-click demo access with a real seeded account for quick walkthroughs</li>
              <li>Dashboard-ready filters, charts, and segmentation views that stay readable when empty</li>
            </ul>
          </div>

          <div className="stats-grid">
            <div className="mini-stat">
              <span>Insights</span>
              <strong>24/7</strong>
            </div>
            <div className="mini-stat">
              <span>Setup</span>
              <strong>Fast</strong>
            </div>
            <div className="mini-stat">
              <span>Style</span>
              <strong>Premium</strong>
            </div>
          </div>

          <div className="story-card" style={{ marginTop: 0 }}>
            <div className="story-card__label">Default account</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ color: 'rgba(230,238,248,0.85)', lineHeight: 1.5 }}>
                Username: <strong>Uma21</strong> Password: <strong>Uma@12345</strong>
              </div>
              <button
                type="button"
                className="primary primary--auth"
                onClick={signInAsDemo}
                disabled={submitting}
                style={{ width: '100%' }}
              >
                {submitting ? <Spinner size={18} /> : 'Sign in as demo user'}
              </button>
            </div>
          </div>
        </section>

        <section className="auth-panel auth-panel--form">
          <div className="auth-panel__topline">
            <span className="eyebrow">Welcome back</span>
            <span className="eyebrow eyebrow--soft">Product Analytics Dashboard</span>
          </div>

          <div className="auth-header">
            <h2>Sign in to continue</h2>
            <p>Pick up where you left off and jump straight into your dashboard.</p>
          </div>

          <form onSubmit={handle} className="auth-form">
            <label className="field">
              <span>Username</span>
              <input
                className="input input--auth"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(e.target.value)
                  if (error) setError(null)
                }}
                placeholder="Enter your username"
                autoComplete="username"
              />
            </label>

            <label className="field">
              <span>Password</span>
              <div className="password-row">
                <input
                  className="input input--auth"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value)
                    if (error) setError(null)
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-pressed={showPassword}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            <div className="auth-actions">
              <button type="submit" className="primary primary--auth" disabled={submitting}>
                {submitting ? <Spinner size={18} /> : 'Sign in'}
              </button>
              <button
                type="button"
                className="ghost ghost--auth"
                onClick={() => {
                  setUsername('Uma21')
                  setPassword('Uma@12345')
                  setError(null)
                }}
                disabled={submitting}
              >
                Fill demo credentials
              </button>
            </div>

            {error && <div className="error error--auth">{error}</div>}
          </form>

          <div className="auth-footer">
            <span className="muted">Don't have an account?</span>
            <Link to="/register" className="auth-link">
              Create one
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
