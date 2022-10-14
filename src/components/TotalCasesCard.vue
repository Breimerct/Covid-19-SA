<template>
  <q-card class="custom-card text-white bg-cyan-6 q-pa-sm non-selectable" style="--icon: '\F13B6';" v-if="getCovidData">
    <q-item>
      <q-item-section avatar>
        <q-avatar size="80px" square>
          <q-img :src="getCovidData.flag" contain/>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>Ùltima actualizaciòn de los datos</q-item-label>
        <q-item-label class="text-white" caption>
          {{ getCovidData.update | formatDate }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator/>
    <q-card-section class="q-my-none">
      <div class="text-h6 text-weight-light text-weight-light">
        Total de casos confirmados
      </div>
    </q-card-section>
    <q-card-section class="q-py-none">
      <div class="row">
        <div class="col-4">
          <q-icon
            name="mdi-check-bold"
            color="greenn"
            size="40px"
          ></q-icon>
        </div>
        <div class="col-8 text-right">
          <div class="text-h4">
            <p class="q-ma-none">
              {{ (getCovidData.cases || 0) | formatNumber }}
            </p>
          </div>
          <div class="text-italic">
            {{ `incremento+ ${getCovidData.todayCases}` }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ICovidData } from '../store/CovidModule/moduleInterfaces'
import mixinFilters from '../mixins/filterMixin'

export default defineComponent({
  name: 'TotalCasesCard',

  mixins: [mixinFilters],

  computed: {
    getCovidData (): ICovidData | any {
      return this.$store.getters['covidModule/getCovidData']
    }
  }
})
</script>

<style scoped lang="scss">
</style>
