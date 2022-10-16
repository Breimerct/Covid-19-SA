import { MutationTree } from 'vuex'
import { CovidStateInterface } from './state'
import { ICovidData, ITestChartSeries } from 'src/store/CovidModule/moduleInterfaces'

const mutation: MutationTree<CovidStateInterface> = {
  setCovidData (state, payload: ICovidData): void {
    state.covidData = payload
  },

  setTestChartData (state, payload: ITestChartSeries[]): void {
    state.testChartData = payload
  }
}

export default mutation
