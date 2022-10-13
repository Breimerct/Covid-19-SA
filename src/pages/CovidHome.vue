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
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import CovidCard from 'components/CovidCard.vue'
export default {
  name: 'PageIndex',

  components: {
    CovidCard,
    TotalCasesCard: () => import('components/TotalCasesCard.vue'),
    CountrySearch: () => import('components/CountrySearch.vue')
  },

  computed: {
    getCategories: () => ([
      {
        title: 'Fallecidos',
        icon: 'F0B7F',
        total: 0,
        color: 'red',
        today: 0
      },
      {
        title: 'Activos',
        icon: 'F0849',
        total: 0,
        color: 'blue-7',
        today: 0
      },
      {
        title: 'Recuperados',
        icon: 'F08D0',
        total: 0,
        color: 'green',
        today: 0
      },
      {
        title: 'Pruebas',
        icon: 'F0668',
        total: 0,
        color: 'amber-8',
        today: 0
      }
    ])
  }
}
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
