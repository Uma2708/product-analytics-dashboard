import api from './axios'

export const trackFeature = (feature_name: string) => api.post('/track', { feature_name })
