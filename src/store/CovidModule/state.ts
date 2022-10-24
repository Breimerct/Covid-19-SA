import { ICovidData, ITestChartSeries } from 'src/store/CovidModule/moduleInterfaces'
import { ICountrySelected } from 'src/models/models'

export interface CovidStateInterface {
  covidData: ICovidData | null
  testChartData: ITestChartSeries[] | null
  countrySelected: ICountrySelected,
  historicalData: any[] | null
}

const state = (): CovidStateInterface => ({
  covidData: null,
  testChartData: null,
  countrySelected: {
    label: 'Sur America',
    value: 'south america'
  },
  historicalData: null
})

export default state
