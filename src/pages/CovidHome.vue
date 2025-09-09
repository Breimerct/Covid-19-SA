<template>
  <q-page class="flex justify-center q-pa-md">
    <div class="main-column q-mt-sm">
      <div class="row">
        <div class="col-12">
          <country-search />
        </div>
      </div>
      <div class="row q-mt-xs q-col-gutter-md">
        <div class="col-12">
          <total-cases-card @show-chart="handleShowChart" />
        </div>
        <div class="col-6" v-for="(category, index) in getCategories" :key="index">
          <covid-card v-bind="category" :index="index" @show-chart="handleShowChart" />
        </div>
        <div class="col-12" v-if="getCovidData?.country && getCountrySelected.value !== 'french guiana'">
          <vaccine-card @show-chart="handleShowChart" />
        </div>
        <div class="col-12" v-if="!getCovidData?.country">
          <test-chart />
        </div>
      </div>
    </div>

    <dialog-historical-chart 
      v-model:show="dialogChart.show"
      :title="dialogChart.title"
      :category-card="dialogChart.categoryCard"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCovidStore } from 'stores/covid'
import { ICategory } from 'src/models/models'
import DialogHistoricalChart from 'components/DialogHistoricalChart.vue'
import VaccineCard from 'components/VaccineCard.vue'
import TestChart from 'components/chart/TestChart.vue'
import CovidCard from 'components/CovidCard.vue'
import TotalCasesCard from 'components/TotalCasesCard.vue'
import CountrySearch from 'components/CountrySearch.vue'

export default defineComponent({
  name: 'CovidHome',

  components: {
    DialogHistoricalChart,
    VaccineCard,
    TestChart,
    CovidCard,
    TotalCasesCard,
    CountrySearch
  },

  setup() {
    const { t, locale } = useI18n()
    const covidStore = useCovidStore()

    const dialogChart = ref({
      show: false,
      title: '',
      categoryCard: ''
    })

    const getCategories = computed((): ICategory[] => {
      const covidData = covidStore.getCovidData
      return [
        {
          category: 'test',
          title: t('categories.tests'),
          icon: 'F0668',
          total: covidData?.tests || 0,
          color: 'amber-8',
          today: 0
        },
        {
          category: 'recovered',
          title: t('categories.recovered'),
          icon: 'F08D0',
          total: covidData?.recovered || 0,
          color: 'green',
          today: covidData?.todayRecovered || 0
        },
        {
          category: 'active',
          title: t('categories.actives'),
          icon: 'F0849',
          total: covidData?.active || 0,
          color: 'blue-7',
          today: 0
        },
        {
          category: 'deaths',
          title: t('categories.deceased'),
          icon: 'F0B7F',
          total: covidData?.deaths || 0,
          color: 'red',
          today: covidData?.todayDeaths || 0
        }
      ]
    })

    function handleShowChart(data: { show: boolean; title: string; categoryCard: string }) {
      dialogChart.value = data
    }

    // Watch for locale changes
    watch(locale, () => {
      const countrySelected = covidStore.getCountrySelected

      if (countrySelected.value.includes('south')) {
        covidStore.fetchTestChartData()
      }

      if (!countrySelected.value.includes('french') && !countrySelected.value.includes('south')) {
        covidStore.fetchVaccineData(countrySelected.value)
      }

      if (
        !countrySelected.value.includes('french') &&
        !countrySelected.value.includes('south') &&
        !countrySelected.value.includes('falkland')
      ) {
        covidStore.fetchCategoriesHistoricalData(countrySelected.value)
      }
    })

    return {
      getCategories,
      getCovidData: covidStore.getCovidData,
      getCountrySelected: covidStore.getCountrySelected,
      dialogChart,
      handleShowChart
    }
  }
})
</script>

<style lang="scss" scoped>
.main-column {
  width: 60%;
  height: 100%;
}

@media (max-width: $breakpoint-sm-max) {
  .main-column {
    width: 100%;
    height: 100%;
  }
}
</style>
