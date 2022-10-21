import { ICovidData, ITestChartSeries } from 'src/store/CovidModule/moduleInterfaces'
import { ICountrySelected } from 'src/models/models'

export interface CovidStateInterface {
  covidData: ICovidData | null
  testChartData: ITestChartSeries[] | null
  countrySelected: ICountrySelected
}

const state = (): CovidStateInterface => ({
  covidData: null,
  testChartData: null,
  countrySelected: {
    label: 'Sur America',
    value: 'south america'
  }
})

export default state
