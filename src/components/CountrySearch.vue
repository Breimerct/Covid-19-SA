<template>
  <div>
    <q-select
      outlined
      rounded
      use-input
      hide-selected
      ref="countrySearchSelect"
      v-model="countrySelected"
      :options="countriesItems"
      @filter="searchCountry"
      label="Selecciona un páis"
    >
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
          <q-item-section avatar>
            <q-img :src="scope.opt.flag"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ scope.opt.label }}</q-item-label>
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
import Util from 'src/helpers/Util'

const southAmerica = Util.countriesItems.filter(country => country.value === 'south america')[0]

export default defineComponent({
  name: 'CountrySearch',

  data: (): {
    countrySelected: ICountriesOptions
    countriesItems: ICountriesOptions[]
  } => ({
    countrySelected: southAmerica,
    countriesItems: []
  }),

  watch: {
    countrySelected (value: ICountriesOptions): void {
      this.setHistoricalData(null)
      this.setCountrySelected(value)
      this.fetchCountryData(value.value)
      this.$refs.countrySearchSelect.blur()

      if (
        !value.value.includes('french') &&
        !value.value.includes('south')
      ) {
        this.fetchVaccineData(value.value)
      }

      if (
        !value.value.includes('french') &&
        !value.value.includes('south') &&
        !value.value.includes('falkland')
      ) {
        this.fetchCategoriesHistoricalData(value.value)
      }
    }
  },

  methods: {
    ...mapActions('covidModule', [
      'fetchCountryData',
      'fetchVaccineData',
      'fetchCategoriesHistoricalData'
    ]),
    ...mapMutations('covidModule', ['setCountrySelected', 'setHistoricalData']),

    searchCountry (val: string, update: any): void {
      update(() => {
        if (!val) {
          this.countriesItems = Util.countriesItems
        } else {
          const needle = val.toLowerCase()
          this.countriesItems = Util.countriesItems.filter(v => v.label.toLowerCase().includes(needle))
        }
      })
    }
  },

  mounted () {
    this.fetchCountryData(this.countrySelected.value)
  }
})
</script>

<style scoped lang="scss">
</style>
