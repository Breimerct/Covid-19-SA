export interface ICovidData {
  cases: number
  deaths: number
  recovered: number
  active: number
  tests: number
  updated: number
  flag: string
  countryInfo: {
    flag: string
  }
}
