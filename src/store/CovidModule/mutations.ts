import { MutationTree } from 'vuex'
import { CovidStateInterface } from './state'
import { ICovidData, ITestChartSeries } from 'src/store/CovidModule/moduleInterfaces'
import { ICountrySelected } from 'src/models/models'

const mutation: MutationTree<CovidStateInterface> = {
  setCovidData (state, payload: ICovidData): void {
    state.covidData = payload
  },

  setTestChartData (state, payload: ITestChartSeries[]): void {
    state.testChartData = payload
  },

  setCountrySelected (state, payload: ICountrySelected): void {
    state.countrySelected = payload
  },

  setHistoricalData (state, payload: any[]): void {
    state.historicalData = payload
  }
}

export default mutation
