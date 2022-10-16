import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { CovidStateInterface } from './state'
import { httpClient } from 'boot/axios'
import { Loading } from 'quasar'
import { ICovidData } from 'src/store/CovidModule/moduleInterfaces'
import southAmerica from '../../assets/flags/south_america.png'
import Util from 'src/helpers/Util'

const actions: ActionTree<CovidStateInterface, StateInterface> = {
  async fetchCountryData ({ commit }, payload: string): Promise<void> {
    try {
      const endpoint = payload === 'south america' ? 'continents' : 'countries'
      Loading.show()
      const { data } = await httpClient.get<ICovidData>(`/${endpoint}/${payload}`)
      commit('setCovidData', {
        ...data,
        flag: (data.countryInfo?.flag || southAmerica)
      })
    } catch (e) {
      console.log('Error', e)
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
    } catch (e) {
      console.log('Error', e)
    } finally {
      Loading.hide()
    }
  }
}

export default actions
