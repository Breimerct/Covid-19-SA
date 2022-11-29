import { store } from 'quasar/wrappers'
import Vuex from 'vuex'
import covidModule from './CovidModule/index'
import commonModule from './commonModule/index'

export interface StateInterface {
  // State interface
}

export default store(function ({ Vue }) {
  Vue.use(Vuex)

  return new Vuex.Store<StateInterface>({
    modules: {
      covidModule,
      commonModule
    },
    strict: !!process.env.DEBUGGING
  })
})
