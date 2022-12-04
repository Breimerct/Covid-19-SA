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
      :label="$t('selectCountry')"
    >
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
          <q-item-section avatar>
            <q-img :src="scope.opt.flag"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ scope.opt.label | capitalize }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>

      <template v-slot:prepend>
        <q-icon name="place" color="primary"/>
      </template>
    </q-select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ICountriesOptions } from '../models/models'
import { mapActions, mapMutations } from 'vuex'
import util from 'src/helpers/Util'

export default defineComponent({
  name: 'CountrySearch',

  data: (): {
    countrySelected: ICountriesOptions
  } => ({
    countrySelected: util.getSouthAmerica()
  }),

  computed: {
    countryItems (): ICountriesOptions[] {
      return Object.values<ICountriesOptions>(util.getCountryItems())
    }
  },

  watch: {
    countrySelected (value: ICountriesOptions): void {
      this.$refs.countrySearchSelect.blur()
      this.setHistoricalData(null)
      this.setCountrySelected(value)
      this.fetchCountryData(value.value)
      this.handleValidationFetchData(value.value)
      localStorage.setItem('country', value.value)
    }
  },

  methods: {
    ...mapActions('covidModule', [
      'fetchCountryData',
      'fetchVaccineData',
      'fetchCategoriesHistoricalData'
    ]),

    ...mapMutations('covidModule', ['setCountrySelected', 'setHistoricalData']),

    handleValidationFetchData (country: string): void {
      if (
        !country.includes('french') &&
        !country.includes('south')
      ) {
        this.fetchVaccineData(country)
      }
      if (
        !country.includes('french') &&
        !country.includes('south') &&
        !country.includes('falkland')
      ) {
        this.fetchCategoriesHistoricalData(country)
      }
    },

    getCountryByLocalStorage () {
      const storeCountry = localStorage.getItem('country')

      if (storeCountry) {
        this.countrySelected = util.getOneCountry(storeCountry)
      }
    }
  },

  mounted () {
    this.getCountryByLocalStorage()
    this.fetchCountryData(this.countrySelected.value)
  }
})
</script>

<style scoped lang="scss">
</style>
