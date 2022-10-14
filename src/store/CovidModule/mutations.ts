import { MutationTree } from 'vuex'
import { CovidStateInterface } from './state'
import { ICovidData } from 'src/store/CovidModule/moduleInterfaces'

const mutation: MutationTree<CovidStateInterface> = {
  setCovidData (state, payload: ICovidData) {
    state.covidData = payload
  }
}

export default mutation
