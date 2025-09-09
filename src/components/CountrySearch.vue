<template>
  <div>
    <q-select
      outlined
      rounded
      use-input
      hide-selected
      ref="countrySearchSelect"
      v-model="countrySelected"
      :options="countryItems"
      :label="t('selectCountry')"
      option-label="label"
      option-value="value"
    >
      <template v-slot:option="scope">
        <q-item 
          v-bind="scope.itemProps"
        >
          <q-item-section avatar>
            <q-img :src="scope.opt.flag" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ capitalize(scope.opt.label) }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>

      <template v-slot:prepend>
        <q-icon name="place" color="primary" />
      </template>
    </q-select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCovidStore } from 'stores/covid'
import { ICountriesOptions } from '../models/models'
import util from 'src/helpers/Util'
// import { analytics, logEvent } from 'boot/firebase'
import { capitalize } from 'src/helpers/formatters'

export default defineComponent({
  name: 'CountrySearch',

  setup() {
    const { t } = useI18n()
    const covidStore = useCovidStore()
    
    const countrySearchSelect = ref<any>(null)
    const countrySelected = ref<ICountriesOptions>(util.getSouthAmerica())

    const countryItems = computed((): ICountriesOptions[] => {
      return Object.values<ICountriesOptions>(util.getCountryItems())
    })

    function handleValidationFetchData(country: string): void {
      if (!country.includes('french') && !country.includes('south')) {
        covidStore.fetchVaccineData(country)
      }
      if (!country.includes('french') && !country.includes('south') && !country.includes('falkland')) {
        covidStore.fetchCategoriesHistoricalData(country)
      }
    }

    function getCountryByLocalStorage() {
      const storeCountry = localStorage.getItem('country')

      if (storeCountry) {
        countrySelected.value = util.getOneCountry(storeCountry)
      }
    }

    // Watch for country selection changes
    watch(countrySelected, (value: ICountriesOptions) => {
      if (countrySearchSelect.value) {
        countrySearchSelect.value.blur()
      }
      
      covidStore.setHistoricalData(null)
      covidStore.setCountrySelected(value)
      covidStore.fetchCountryData(value.value)
      handleValidationFetchData(value.value)
      localStorage.setItem('country', value.value)

      // Log analytics event only if analytics is available
      // if (analytics) {
      //   logEvent(analytics, 'select_item', {
      //     name: value.value
      //   })
      // }
    })

    onMounted(() => {
      getCountryByLocalStorage()
      covidStore.fetchCountryData(countrySelected.value.value)
    })

    return {
      countrySearchSelect,
      countrySelected,
      countryItems,
      capitalize,
      t
    }
  }
})
</script>

<style scoped lang="scss"></style>
