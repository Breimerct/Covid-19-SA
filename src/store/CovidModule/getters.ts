import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { CovidStateInterface } from './state'
import { ICovidData, ITestChartSeries } from 'src/store/CovidModule/moduleInterfaces'

const getters: GetterTree<CovidStateInterface, StateInterface> = {
  getCovidData: (state): ICovidData | null => (state.covidData),

  getTestChartData: (state): ITestChartSeries[] | null => (state.testChartData)
}

export default getters
