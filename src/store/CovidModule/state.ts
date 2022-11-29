import { IChartHistoricalData, ICovidData, ITestChartSeries } from 'src/store/CovidModule/moduleInterfaces'
import { ICountriesOptions } from 'src/models/models'
import util from 'src/helpers/Util'

export interface CovidStateInterface {
  covidData: ICovidData | null
  testChartData: ITestChartSeries[] | null
  countrySelected: ICountriesOptions
  historicalData: IChartHistoricalData | null
}

const state = (): CovidStateInterface => ({
  covidData: null,
  testChartData: null,
  countrySelected: util.getSouthAmerica(),
  historicalData: null
})

export default state
