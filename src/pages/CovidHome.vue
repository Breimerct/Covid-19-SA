<template>
  <q-page class="flex justify-center q-pa-md">
    <div class="main-column q-mt-sm">
      <div class="row">
        <div class="col-12">
          <country-search/>
        </div>
      </div>
      <div class="row q-mt-xs q-col-gutter-md">
        <div class="col-12">
          <total-cases-card/>
        </div>
        <div
          class="col-6"
          v-for="(category, index) in getCategories"
          :key="index"
        >
          <covid-card
            v-bind="category"
            :index="index"
          />
        </div>
        <div
          class="col-12"
          v-if="
          getCovidData?.country &&
          getCountrySelected.value !== 'french guiana'
        "
        >
          <vaccine-card/>
        </div>
        <div
          class="col-12"
          v-if="!getCovidData?.country"
        >
          <test-chart/>
        </div>
      </div>
    </div>

    <dialog-historical-chart/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { ICategory } from 'src/models/models'

export default defineComponent({
  name: 'CovidHome',

  components: {
    DialogHistoricalChart: () => import('components/DialogHistoricalChart.vue'),
    VaccineCard: () => import('components/VaccineCard.vue'),
    TestChart: () => import('components/TestChart.vue'),
    CovidCard: () => import('components/CovidCard.vue'),
    TotalCasesCard: () => import('components/TotalCasesCard.vue'),
    CountrySearch: () => import('components/CountrySearch.vue')
  },

  computed: {
    ...mapGetters('covidModule', ['getCovidData', 'getCountrySelected']),

    getCategories (): ICategory[] {
      return [
        {
          category: 'test',
          title: this.$t('categories.tests'),
          icon: 'F0668',
          total: this.getCovidData?.tests || 0,
          color: 'amber-8',
          today: 0
        },
        {
          category: 'recovered',
          title: this.$t('categories.recovered'),
          icon: 'F08D0',
          total: this.getCovidData?.recovered || 0,
          color: 'green',
          today: this.getCovidData?.todayRecovered || 0
        },
        {
          category: 'active',
          title: this.$t('categories.actives'),
          icon: 'F0849',
          total: this.getCovidData?.active || 0,
          color: 'blue-7',
          today: 0
        },
        {
          category: 'deaths',
          title: this.$t('categories.deceased'),
          icon: 'F0B7F',
          total: this.getCovidData?.deaths || 0,
          color: 'red',
          today: this.getCovidData?.todayDeaths || 0
        }
      ]
    }
  },

  methods: {}
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
