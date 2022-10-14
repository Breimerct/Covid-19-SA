import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { CovidStateInterface } from './state'
import { ICovidData } from 'src/store/CovidModule/moduleInterfaces'

const getters: GetterTree<CovidStateInterface, StateInterface> = {
  getCovidData (state): ICovidData | null {
    return state.covidData
  }
}

export default getters
