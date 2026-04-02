import { useState, useEffect } from 'react'
import { Filters } from '../types/analytics'
import { getCookie, removeCookie, setCookie } from '../utils/cookies'
import { getLocalDateInputValue } from '../utils/date'

const COOKIE_KEYS = { startDate: 'startDate', endDate: 'endDate', ageGroup: 'ageGroup', gender: 'gender' }

export default function useCookiesFilters() {
  const today = getLocalDateInputValue()
  const [filters, setFilters] = useState<Filters>({
    startDate: getCookie(COOKIE_KEYS.startDate) || today,
    endDate: getCookie(COOKIE_KEYS.endDate) || today,
    ageGroup: (getCookie(COOKIE_KEYS.ageGroup) as any) || 'all',
    gender: (getCookie(COOKIE_KEYS.gender) as any) || 'all'
  })

  useEffect(() => {
    if (filters.startDate) setCookie(COOKIE_KEYS.startDate, filters.startDate)
    else removeCookie(COOKIE_KEYS.startDate)

    if (filters.endDate) setCookie(COOKIE_KEYS.endDate, filters.endDate)
    else removeCookie(COOKIE_KEYS.endDate)

    setCookie(COOKIE_KEYS.ageGroup, filters.ageGroup)
    setCookie(COOKIE_KEYS.gender, filters.gender)
  }, [filters])

  return [filters, setFilters] as const
}
