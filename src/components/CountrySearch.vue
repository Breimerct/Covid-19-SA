<template>
  <div>
    <q-select
      outlined
      rounded
      v-model="countrySelected"
      :options="countriesItems"
      label="Selecciona un páis"
    >
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
          <q-item-section avatar>
            <q-img :src="scope.opt.img" />
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
import { ICountriesOptions, ICountrySelected } from '../models/models'
import Util from 'src/helpers/Util'
import { mapActions } from 'vuex'
export default defineComponent({
  name: 'CountrySearch',

  data: (): {
    countrySelected: ICountrySelected
    countriesItems: ICountriesOptions[]
  } => ({
    countrySelected: {
      label: 'Sur America',
      value: 'south america'
    },
    countriesItems: Util.countriesItems
  }),

  watch: {
    countrySelected (value: ICountrySelected): void {
      this.fetchCountryData(value.value)
    }
  },

  methods: {
    ...mapActions('covidModule', ['fetchCountryData'])
  },

  mounted () {
    this.fetchCountryData(this.countrySelected.value)
  }
})
</script>

<style scoped lang="scss">

</style>
