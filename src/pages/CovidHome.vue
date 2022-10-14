<template>
  <q-page class="flex justify-center q-pa-md">
    <div class="main-column q-mt-sm">
      <div class="row">
        <div class="col-12">
          <country-search/>
        </div>
        <div class="col-12 q-mt-lg">
          <total-cases-card/>
        </div>
      </div>
      <div class="row q-mt-xs q-col-gutter-lg">
        <div
          class="col-6"
          v-for="(category, index) in getCategories"
          :key="index"
        >
          <covid-card
            :title="category.title"
            :icon="category.icon"
            :color="category.color"
            :total="category.total"
            :today-total="category.todayTotal"
            :index="index"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'CovidHome',

  components: {
    CovidCard: () => import('components/CovidCard.vue'),
    TotalCasesCard: () => import('components/TotalCasesCard.vue'),
    CountrySearch: () => import('components/CountrySearch.vue')
  },

  computed: {
    ...mapGetters('covidModule', ['getCovidData']),

    getCategories () {
      return [
        {
          title: 'Fallecidos',
          icon: 'F0B7F',
          total: this.$store.getters['covidModule/getCovidData']?.deaths || 0,
          color: 'red',
          todayTotal: this.$store.getters['covidModule/getCovidData']?.todayDeaths || 0
        },
        {
          title: 'Activos',
          icon: 'F0849',
          total: this.$store.getters['covidModule/getCovidData']?.active || 0,
          color: 'blue-7',
          todayTotal: 0
        },
        {
          title: 'Recuperados',
          icon: 'F08D0',
          total: this.$store.getters['covidModule/getCovidData']?.recovered || 0,
          color: 'green',
          todayTotal: this.$store.getters['covidModule/getCovidData']?.todayRecovered || 0
        },
        {
          title: 'Pruebas',
          icon: 'F0668',
          total: this.$store.getters['covidModule/getCovidData']?.tests || 0,
          color: 'amber-8',
          todayTotal: 0
        }
      ]
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
