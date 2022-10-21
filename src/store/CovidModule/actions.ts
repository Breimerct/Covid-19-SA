import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { CovidStateInterface } from './state'
import { httpClient } from 'boot/axios'
import { Loading, Notify } from 'quasar'
import { ICovidData } from 'src/store/CovidModule/moduleInterfaces'
import southAmerica from '../../assets/flags/south_america.png'
import Util from 'src/helpers/Util'

const actions: ActionTree<CovidStateInterface, StateInterface> = {
  async fetchCountryData ({ commit, dispatch }, payload: string): Promise<void> {
    try {
      const endpoint = payload === 'south america' ? 'continents' : 'countries'
      Loading.show()
      const { data } = await httpClient.get<ICovidData>(`/${endpoint}/${payload}`)
      commit('setCovidData', {
        ...data,
        flag: (data.countryInfo?.flag || southAmerica)
      })
      if (!payload.includes('south')) {
        dispatch('fetchVaccineData', payload)
      }
    } catch (e: any) {
      console.error(e.response.data?.message || e)
    } finally {
      Loading.hide()
    }
  },

  async fetchTestChartData ({ commit }): Promise<void> {
    try {
      Loading.show()
      const countries = Util.countriesItems.map(country => country.value)
      countries.shift()
      const { data } = await httpClient.get<ICovidData[]>(`/countries/${countries.join(',')}`)
      commit('setTestChartData', [
        {
          name: 'Pruebas',
          data: data.map(val => val.tests)
        }
      ])
    } catch (e: any) {
      console.error(e.response.data?.message || e)
    } finally {
      Loading.hide()
    }
  },

  async fetchVaccineData ({ state, commit }, country: string): Promise<void> {
    const _country = Util.countriesItems.filter(value => (value.value === country))
    try {
      Loading.show()
      const { data } = await httpClient.get(`/vaccine/coverage/countries/${country}/`, {
        params: {
          lastdays: 30
        }
      })
      const timelineArray = Object.keys((data.timeline))
      commit('setCovidData', {
        ...state.covidData,
        vaccine: data.timeline[timelineArray[(timelineArray.length - 1)]]
      })
    } catch (e: any) {
      console.error(e.response.data?.message || e)
      if (e.response.status === 404) {
        Notify.create({
          type: 'info',
          message: `${_country[0].label} no contiene datos de vacunas`
        })
      }
    } finally {
      Loading.hide()
    }
  }
}

export default actions
