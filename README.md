# Interactive Product Analytics Dashboard

A full-stack product analytics dashboard with JWT auth, cookie-based filter persistence, tracked interactions, and Recharts visualizations backed by Prisma.

## What’s Included

- Backend API with authentication, tracking, and analytics aggregation
- Frontend login/register flow and protected dashboard
- Cookie persistence for the dashboard filters
- Bar chart for feature usage
- Line chart for click trends
- Seed script with dummy users and feature clicks
- Responsive UI with polished loading and empty states

## Tech Stack

- Frontend: React, TypeScript, Vite, Recharts, Axios
- Backend: Node.js, Express, TypeScript, Prisma, JWT, bcryptjs
- Database: SQLite for local development

## Challenge Criteria Coverage

### Backend

- `POST /register` and `POST /login` are implemented in [backend/src/modules/auth/auth.routes.ts](/home/lenovo/Desktop/Projects/product-analytics-dashboard/backend/src/modules/auth/auth.routes.ts)
- `POST /track` is implemented in [backend/src/modules/tracking/tracking.routes.ts](/home/lenovo/Desktop/Projects/product-analytics-dashboard/backend/src/modules/tracking/tracking.routes.ts)
- `GET /analytics` is implemented in [backend/src/modules/analytics/analytics.routes.ts](/home/lenovo/Desktop/Projects/product-analytics-dashboard/backend/src/modules/analytics/analytics.routes.ts)
- User and FeatureClick models live in [backend/prisma/schema.prisma](/home/lenovo/Desktop/Projects/product-analytics-dashboard/backend/prisma/schema.prisma)
- Passwords are hashed with bcrypt before storage
- JWT is used for protected endpoints
- Aggregations are computed by feature and by day, filtered by date range, age group, and gender

### Frontend

- Login screen is implemented in [frontend/src/pages/LoginPage.tsx](/home/lenovo/Desktop/Projects/product-analytics-dashboard/frontend/src/pages/LoginPage.tsx)
- Filters persist in cookies via [frontend/src/hooks/useCookiesFilters.ts](/home/lenovo/Desktop/Projects/product-analytics-dashboard/frontend/src/hooks/useCookiesFilters.ts)
- Dashboard is implemented in [frontend/src/pages/DashboardPage.tsx](/home/lenovo/Desktop/Projects/product-analytics-dashboard/frontend/src/pages/DashboardPage.tsx)
- Feature usage chart is implemented in [frontend/src/components/charts/FeatureBarChart.tsx](/home/lenovo/Desktop/Projects/product-analytics-dashboard/frontend/src/components/charts/FeatureBarChart.tsx)
- Daily trend chart is implemented in [frontend/src/components/charts/FeatureTrendLineChart.tsx](/home/lenovo/Desktop/Projects/product-analytics-dashboard/frontend/src/components/charts/FeatureTrendLineChart.tsx)
- Auth state is synchronized across components in [frontend/src/hooks/useAuth.tsx](/home/lenovo/Desktop/Projects/product-analytics-dashboard/frontend/src/hooks/useAuth.tsx)

### Tracking Twist

- Filter changes call `POST /track`
- Bar clicks call `POST /track`
- The charts visualize tracked usage data itself, so the dashboard feeds back into its own analytics

### Seed Data

- Seed script: [backend/prisma/seed.ts](/home/lenovo/Desktop/Projects/product-analytics-dashboard/backend/prisma/seed.ts)
- The seed creates multiple users and many feature click events across random dates
- This ensures the dashboard is not empty on first open

## Local Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npm run prisma:seed
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL` if the frontend is not running against `http://localhost:4000/api`.

## Environment Variables

### Backend

- `DATABASE_URL`
- `JWT_SECRET`
- `PORT`

### Frontend

- `VITE_API_URL`

## Seed Instructions

The project already includes a Prisma seed script:

```bash
cd backend
npm run prisma:seed
```

If you want a fresh local database, run:

```bash
cd backend
npx prisma db push
npm run prisma:seed
```

## Architecture Notes

- The frontend stores auth tokens in `localStorage` and sends them through an Axios request interceptor
- Filter selections are persisted in cookies so they survive refreshes
- The backend aggregates clicks with Prisma queries and returns ready-to-render chart data
- The dashboard has intentional empty states so a date range with no events does not look broken

## Visual Behavior

- The dashboard is responsive
- The bar chart uses a horizontal layout for readability
- The line chart shows daily click trends
- Empty states and loading states are styled to match the rest of the UI

## Scaling Essay

If this dashboard needed to handle 1 million write events per minute, I would split the write path from the read path. The frontend would send interaction events to a durable queue or streaming system first, then background consumers would batch-write to the database or an analytics store. I would also move analytics reads to pre-aggregated tables, hourly rollups, or a columnar warehouse so `GET /analytics` does not scan raw events. At that scale I would likely keep PostgreSQL for transactional user data, but use Redis, Kafka, ClickHouse, BigQuery, or a similar analytics pipeline for event ingestion and aggregation.

## Deployment

This repository is ready for deployment, but a live public URL is not included in the local codebase. Typical options:

- Backend: Render or Railway
- Frontend: Vercel or Netlify

## Demo Credentials

- Username: `user2`
- Password: `password`

## Notes

- SQLite is acceptable for local development, but data will reset when the database file is recreated
- PostgreSQL is preferred for deployment
