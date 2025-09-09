import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import covidModule from './CovidModule/index'
import commonModule from './commonModule/index'
import { Dark } from 'quasar'

export interface StateInterface {
  // State interface
}

export default store(function (/* { ssrContext } */) {
  return createStore<StateInterface>({
    modules: {
      covidModule,
      commonModule
    },
    actions: {
      themeToggle () {
        if (Dark.isActive) {
          Dark.set(false)
        } else {
          Dark.set(true)
        }

        localStorage.setItem('darkMode', JSON.stringify(Dark.isActive))
      }
    },
    strict: !!process.env.DEBUGGING
  })
})
