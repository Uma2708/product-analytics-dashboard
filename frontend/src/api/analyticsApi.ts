import api from './axios'

export const getAnalytics = (params: Record<string, any>) =>
  api.get('/analytics', { params })
