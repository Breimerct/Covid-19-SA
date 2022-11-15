export interface ICovidData {
  cases?: number
  todayCases?: number
  deaths?: number
  todayDeaths?: number
  recovered?: number
  todayRecovered?: number
  active?: number
  tests?: number
  vaccine?: number
  updated?: number
  flag?: string
  country?: string,
  countryInfo?: {
    flag?: string
  }
}

export interface ITestChartSeries {
  name: string,
  data: number[]
}

export interface IHistoricalData {
  country?: string,
  timeline?: {
    cases?: any,
    deaths?: any,
    recovered?: any
  }
}

export interface ICategories {
  name: string
  data: Array<number[]>
  color: string
}

export interface IChartHistoricalData {
  vaccines: ICategories[]
  cases: ICategories[]
  deaths: ICategories[]
  recovered: ICategories[]
}
