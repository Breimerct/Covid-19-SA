import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { ICommonStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const covidModule: Module<ICommonStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default covidModule
