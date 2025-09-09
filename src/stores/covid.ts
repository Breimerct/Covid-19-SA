import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { httpClient } from 'boot/axios'
import { Loading } from 'quasar'
import {
  ICovidData,
  IHistoricalData,
  IChartHistoricalData,
  ITestChartSeries
} from 'src/store/CovidModule/moduleInterfaces'
import { ICountriesOptions } from 'src/models/models'
import Util from 'src/helpers/Util'
import { i18n } from 'boot/i18n'

export const useCovidStore = defineStore('covid', () => {
  // State
  const covidData = ref<ICovidData | null>(null)
  const testChartData = ref<ITestChartSeries[] | null>(null)
  const countrySelected = ref<ICountriesOptions>(Util.getSouthAmerica())
  const historicalData = ref<IChartHistoricalData | null>(null)

  // Getters
  const getCovidData = computed(() => covidData.value)
  const getTestChartData = computed(() => testChartData.value)
  const getCountrySelected = computed(() => countrySelected.value)
  const getHistoricalData = computed(() => historicalData.value)

  // Actions
  async function fetchCountryData(payload: string): Promise<void> {
    try {
      const endpoint = payload === 'south america' ? 'continents' : 'countries'
      Loading.show()
      const { data } = await httpClient.get<ICovidData>(`/${endpoint}/${payload}`)
      covidData.value = data
    } catch (e: any) {
      console.error(e.response?.data?.message || e)
    } finally {
      Loading.hide()
    }
  }

  async function fetchTestChartData(): Promise<void> {
    try {
      Loading.show()
      const countries = Util.getCountryItems()
        .filter(country => country.value !== 'south america')
        .map(country => country.value)
        .join(',')
      const { data } = await httpClient.get<ICovidData[]>(`/countries/${countries}`)
      testChartData.value = [
        {
          name: i18n.global.t('categories.tests'),
          data: data.map(val => val.tests)
        }
      ]
    } catch (e: any) {
      console.error(e.response?.data?.message || e)
    } finally {
      Loading.hide()
    }
  }

  async function fetchVaccineData(country: string): Promise<void> {
    try {
      Loading.show()
      const { data } = await httpClient.get(`/vaccine/coverage/countries/${country}/`, {
        params: {
          lastdays: 30
        }
      })
      const timelineArray = Object.keys(data.timeline)
      const vaccineHistoricalData: any[] = []
      timelineArray.forEach(value => {
        vaccineHistoricalData.push([new Date(value).getTime(), data.timeline[value]])
      })

      if (covidData.value) {
        covidData.value = {
          ...covidData.value,
          vaccine: data.timeline[timelineArray[timelineArray.length - 1]]
        }
      }

      historicalData.value = {
        ...historicalData.value,
        vaccines: [
          {
            name: i18n.global.t('categories.vaccinated'),
            data: vaccineHistoricalData,
            color: '#3f51b5'
          }
        ]
      }
    } catch (e: any) {
      console.error(e.response?.data?.message || e)
    } finally {
      Loading.hide()
    }
  }

  async function fetchCategoriesHistoricalData(payload: string) {
    try {
      Loading.show()
      const { data } = await httpClient.get<IHistoricalData>(`/historical/${payload}/`, {
        params: {
          lastdays: 30
        }
      })

      historicalData.value = {
        ...historicalData.value,
        cases: Util.getFormatChartData(data.timeline, 'cases'),
        deaths: Util.getFormatChartData(data.timeline, 'deaths'),
        recovered: Util.getFormatChartData(data.timeline, 'recovered')
      }
    } catch (e: any) {
      console.error(e.response?.data?.message || e)
    } finally {
      Loading.hide()
    }
  }

  function setCountrySelected(country: ICountriesOptions) {
    countrySelected.value = country
  }

  function setCovidData(data: ICovidData) {
    covidData.value = data
  }

  function setTestChartData(data: ITestChartSeries[]) {
    testChartData.value = data
  }

  function setHistoricalData(data: IChartHistoricalData) {
    historicalData.value = data
  }

  return {
    // State
    covidData,
    testChartData,
    countrySelected,
    historicalData,

    // Getters
    getCovidData,
    getTestChartData,
    getCountrySelected,
    getHistoricalData,

    // Actions
    fetchCountryData,
    fetchTestChartData,
    fetchVaccineData,
    fetchCategoriesHistoricalData,
    setCountrySelected,
    setCovidData,
    setTestChartData,
    setHistoricalData
  }
})
