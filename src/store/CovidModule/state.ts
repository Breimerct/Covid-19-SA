import { ICovidData, ITestChartSeries } from 'src/store/CovidModule/moduleInterfaces'

export interface CovidStateInterface {
  covidData: ICovidData | null
  testChartData: ITestChartSeries[] | null
}

const state = (): CovidStateInterface => ({
  covidData: null,
  testChartData: null
})

export default state
