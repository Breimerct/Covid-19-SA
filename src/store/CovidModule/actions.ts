import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { CovidStateInterface } from './state'
import { httpClient } from 'boot/axios'
import { Loading } from 'quasar'
import { ICovidData, IHistoricalData } from 'src/store/CovidModule/moduleInterfaces'
import Util from 'src/helpers/Util'
import { i18n } from 'boot/i18n'

const actions: ActionTree<CovidStateInterface, StateInterface> = {
  async fetchCountryData ({ commit }, payload: string): Promise<void> {
    try {
      const endpoint = payload === 'south america' ? 'continents' : 'countries'
      Loading.show()
      const { data } = await httpClient.get<ICovidData>(`/${endpoint}/${payload}`)
      commit('setCovidData', data)
    } catch (e: any) {
      console.error(e.response.data?.message || e)
    } finally {
      Loading.hide()
    }
  },

  async fetchTestChartData ({ commit }): Promise<void> {
    try {
      Loading.show()
      const countries = Util.getCountryItems()
        .filter(country => country.value !== 'south america')
        .map(country => country.value)
        .join(',')
      const { data } = await httpClient.get<ICovidData[]>(`/countries/${countries}`)
      commit('setTestChartData', [{
        name: i18n.t('categories.tests'),
        data: data.map(val => val.tests)
      }])
    } catch (e: any) {
      console.error(e.response.data?.message || e)
    } finally {
      Loading.hide()
    }
  },

  async fetchVaccineData ({
    state,
    commit
  }, country: string): Promise<void> {
    try {
      Loading.show()
      const { data } = await httpClient.get(`/vaccine/coverage/countries/${country}/`, {
        params: {
          lastdays: 30
        }
      })
      const timelineArray = Object.keys((data.timeline))
      const historicalData: any[] = []
      timelineArray.forEach(value => {
        historicalData.push([new Date(value).getTime(), data.timeline[value]])
      })
      commit('setCovidData', {
        ...state.covidData,
        vaccine: data.timeline[timelineArray[(timelineArray.length - 1)]]
      })
      commit('setHistoricalData', {
        vaccines: [{
          name: i18n.t('categories.vaccinated'),
          data: historicalData,
          color: '#3f51b5'
        }]
      })
    } catch (e: any) {
      console.error(e.response.data?.message || e)
    } finally {
      Loading.hide()
    }
  },

  async fetchCategoriesHistoricalData ({ state, commit }, payload: string) {
    try {
      Loading.show()
      const { data } = await httpClient.get<IHistoricalData>(`/historical/${payload}/`, {
        params: {
          lastdays: 30
        }
      })
      Util.getFormatChartData(data.timeline, 'cases')
      commit('setHistoricalData', {
        ...state.historicalData,
        cases: Util.getFormatChartData(data.timeline, 'cases'),
        deaths: Util.getFormatChartData(data.timeline, 'deaths'),
        recovered: Util.getFormatChartData(data.timeline, 'recovered')
      })
    } catch (e: any) {
      console.error(e.response.data?.message || e)
    } finally {
      Loading.hide()
    }
  }
}

export default actions
