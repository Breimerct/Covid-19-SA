<template>
  <q-card
    v-if="getTestChartData"
    :class="{
      'bg-grey-4': !$q.dark.isActive,
      'bg-grey-10': $q.dark.isActive
    }"
  >
    <q-card-section>
      <vue-apex-charts
        type="bar"
        height="350"
        width="100%"
        :options="getChartOptions"
        :series="getTestChartData"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import util from 'src/helpers/Util'
import { ICountriesOptions } from 'src/models/models'

export default defineComponent({
  name: 'TestChart',

  components: {
    VueApexCharts: () => import('vue-apexcharts')
  },

  computed: {
    ...mapGetters('covidModule', ['getTestChartData']),

    getChartOptions (): any {
      const countries = Object.values<ICountriesOptions>(util.getCountryItems())
        .filter(country => country.value !== 'south america')
        .map(country => ((country.shortName || '').toUpperCase()))

      return {
        colors: ['#ffa000'],
        chart: {
          toolbar: {
            show: false
          }
        },
        tooltip: {
          enabled: true,
          theme: this.$q.dark.isActive ? 'dark' : 'light',
          y: {
            title: {
              formatter: (seriesName: string): string => util.capitalizeFirstLetter(seriesName)
            }
          }
        },
        title: {
          text: this.$t('configChart.testsPerformed'),
          align: 'center',
          style: {
            color: this.$q.dark.isActive ? '#fff' : '#000',
            fontSize: '20px',
            fontFamily: 'Roboto',
            fontWeight: 'medium'
          }
        },
        grid: {
          borderColor: this.$q.dark.isActive ? '#fff' : '#000',
          strokeDashArray: 0,
          xaxis: {
            lines: {
              show: true
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: countries,
          labels: {
            show: true,
            style: {
              colors: this.$q.dark.isActive ? '#fff' : '#000',
              fontSize: '13px',
              fontFamily: 'Roboto',
              fontWeight: 300
            }
          }
        },
        yaxis: {
          labels: {
            show: !this.$q.platform.is.mobile,
            style: {
              colors: this.$q.dark.isActive ? '#fff' : '#000',
              fontFamily: 'Roboto',
              fontSize: '12px',
              fontWeight: 400
            },
            formatter: (val: number) => {
              return util.formatNumber(val)
            }
          }
        }
      }
    }
  },

  methods: {
    ...mapActions('covidModule', ['fetchTestChartData'])
  },

  mounted () {
    this.fetchTestChartData()
  }
})
</script>

<style scoped>

</style>
