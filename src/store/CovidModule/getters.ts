import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { CovidStateInterface } from './state'
import { IChartHistoricalData, ICovidData, ITestChartSeries } from 'src/store/CovidModule/moduleInterfaces'
import { ICountriesOptions } from 'src/models/models'

const getters: GetterTree<CovidStateInterface, StateInterface> = {
  getCovidData: (state): ICovidData | null => (state.covidData),

  getTestChartData: (state): ITestChartSeries[] | null => (state.testChartData),

  getCountrySelected: (state): ICountriesOptions => (state.countrySelected),

  getHistoricalData: (state): IChartHistoricalData | null => (state.historicalData)
}

export default getters
