export type AgeGroup = 'all' | '<18' | '18-40' | '>40'
export type Gender = 'all' | 'Male' | 'Female' | 'Other'

export type Filters = {
  startDate: string | null
  endDate: string | null
  ageGroup: AgeGroup
  gender: Gender
}

export type BarDataItem = { featureName: string; count: number }
export type LineDataItem = { day: string; count: number }
