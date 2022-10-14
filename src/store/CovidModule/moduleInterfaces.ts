export interface ICovidData {
  cases?: number
  todayCases?: number
  deaths?: number
  todayDeaths?: number
  recovered?: number
  todayRecovered?: number
  active?: number
  tests?: number
  updated?: number
  flag?: string
  countryInfo?: {
    flag?: string
  }
}
