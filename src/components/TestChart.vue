<template>
  <q-card class="bg-grey-4" v-if="getTestChartData">
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
        .map(country => ((country.shortName || '').toUpperCase()))
      countries.shift()

      return {
        colors: ['#ffa000'],
        chart: {
          toolbar: {
            show: false
          }
        },
        tooltip: {
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
            color: '#000',
            fontSize: '20px',
            fontFamily: 'Roboto',
            fontWeight: 'medium'
          }
        },
        grid: {
          borderColor: '#000',
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
              colors: '#000',
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
              color: ['#000'],
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
