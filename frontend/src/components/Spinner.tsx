import React from 'react'

export default function Spinner({ size = 36, color = '#2563eb' }: { size?: number; color?: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg className="spinner-svg" width={size} height={size} viewBox="0 0 50 50" aria-hidden>
        <defs>
          <linearGradient id="spinnerGrad" x1="0%" x2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <circle cx="25" cy="25" r="20" stroke="url(#spinnerGrad)" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="31.4 31.4" filter="url(#glow)">
          <animateTransform attributeName="transform" type="rotate" values="0 25 25;360 25 25" dur="0.9s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}
