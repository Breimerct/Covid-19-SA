<template>
  <vue-apex-charts
    type="area"
    :options="chartOptions"
    :series="getChartData"
    height="550"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import Util from 'src/helpers/Util'

export default defineComponent({
  name: 'HistoricalChart',

  props: {
    category: {
      type: String,
      require: true,
      default: ''
    }
  },

  components: {
    VueApexCharts: () => import('vue-apexcharts')
  },

  computed: {
    ...mapGetters('covidModule', ['getHistoricalData']),

    getChartData (): any {
      return this.getHistoricalData[this.category]
    },

    chartOptions (): any {
      return {
        colors: ['#000'],
        chart: {
          defaultLocale: this.$i18n.locale,
          locales: [{
            name: this.$i18n.locale,
            options: this.$t('configChart.locales')
          }],
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 100,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
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
        title: {
          text: this.$t('configChart.statisticsPerDay'),
          align: 'center',
          style: {
            color: '#000',
            fontSize: '20px',
            fontFamily: 'Roboto',
            fontWeight: 'medium'
          }
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy'
          },
          y: {
            title: {
              formatter: (seriesName: string): string => Util.capitalizeFirstLetter(seriesName)
            }
          }
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          labels: {
            show: true,
            style: {
              color: ['#000'],
              fontFamily: 'Roboto',
              fontSize: '12px',
              fontWeight: 400
            },
            formatter: (val: number) => {
              return Util.formatNumber(val)
            }
          }
        }
      }
    }
  }
})
</script>

<style scoped>

</style>
