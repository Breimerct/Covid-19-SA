import { IChartHistoricalData, ICovidData, ITestChartSeries } from 'src/store/CovidModule/moduleInterfaces'
import { ICountriesOptions } from 'src/models/models'
import Util from 'src/helpers/Util'

export interface CovidStateInterface {
  covidData: ICovidData | null
  testChartData: ITestChartSeries[] | null
  countrySelected: ICountriesOptions,
  historicalData: IChartHistoricalData | null
}

const state = (): CovidStateInterface => ({
  covidData: null,
  testChartData: null,
  countrySelected: Util.countriesItems.filter(country => country.value === 'south america')[0],
  historicalData: null
})

export default state
