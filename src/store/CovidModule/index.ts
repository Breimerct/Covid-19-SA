import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { CovidStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const covidModule: Module<CovidStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default covidModule
