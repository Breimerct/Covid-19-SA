import { MutationTree } from 'vuex'
import { CovidStateInterface } from './state'
import {
  IChartHistoricalData,
  ICovidData,
  ITestChartSeries
} from 'src/store/CovidModule/moduleInterfaces'
import { ICountriesOptions } from 'src/models/models'

const mutation: MutationTree<CovidStateInterface> = {
  setCovidData (state, payload: ICovidData): void {
    state.covidData = payload
  },

  setTestChartData (state, payload: ITestChartSeries[]): void {
    state.testChartData = payload
  },

  setCountrySelected (state, payload: ICountriesOptions): void {
    state.countrySelected = payload
  },

  setHistoricalData (state, payload: IChartHistoricalData): void {
    state.historicalData = payload
  }
}

export default mutation
