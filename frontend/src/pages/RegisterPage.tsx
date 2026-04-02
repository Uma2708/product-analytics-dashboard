import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'

export default function RegisterPage(){
  const { register } = useAuth()
  const nav = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState(25)
  const [gender, setGender] = useState('Male')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      await register({ username, password, age, gender })
      nav('/')
    } catch (err: any) { setError(err?.response?.data?.message || 'Register failed') }
    finally { setSubmitting(false) }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-hero">
          <div className="logo">PA</div>
          <h2>Create account</h2>
          <div className="auth-sub">Join Product Analytics and start tracking</div>
        </div>

        <form onSubmit={handle} className="form-row">
          <label className="inline">Username</label>
          <input className="input" value={username} onChange={(e)=>setUsername((e.target as HTMLInputElement).value)} />

          <label className="inline">Password</label>
          <input className="input" type="password" value={password} onChange={(e)=>setPassword((e.target as HTMLInputElement).value)} />

          <label className="inline">Age</label>
          <input className="input" type="number" value={age} onChange={(e)=>setAge(Number((e.target as HTMLInputElement).value))} />

          <label className="inline">Gender</label>
          <select className="input" value={gender} onChange={(e)=>setGender((e.target as HTMLSelectElement).value)}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <button type="submit" className="primary" style={{marginTop:6}}>{submitting ? 'Creating...' : 'Create account'}</button>
          {error && <div className="error">{error}</div>}
        </form>

        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13 }}>
          <span className="muted">Already have an account? </span>
          <Link to="/login" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
        </div>
      </div>
    </div>
  )
}
