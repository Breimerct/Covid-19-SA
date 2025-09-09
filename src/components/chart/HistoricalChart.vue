<template>
  <apexchart type="area" :options="chartOptions" :series="getChartData" height="550" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { useCovidStore } from 'stores/covid'
import Util from 'src/helpers/Util'

export default defineComponent({
  name: 'HistoricalChart',

  props: {
    category: {
      type: String,
      required: true,
      default: ''
    }
  },

  setup(props) {
    const { t, locale } = useI18n()
    const $q = useQuasar()
    const covidStore = useCovidStore()

    const getChartData = computed(() => {
      const historicalData = covidStore.getHistoricalData
      return historicalData ? historicalData[props.category] : null
    })

    const chartOptions = computed(() => {
      return {
        colors: ['#000'],
        chart: {
          defaultLocale: locale.value,
          locales: [
            {
              name: locale.value,
              options: t('configChart.locales')
            }
          ],
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
          borderColor: $q.dark.isActive ? '#fff' : '#000',
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
          text: t('configChart.statisticsPerDay'),
          align: 'center',
          style: {
            color: $q.dark.isActive ? '#fff' : '#000',
            fontSize: '20px',
            fontFamily: 'Roboto',
            fontWeight: 'medium'
          }
        },
        tooltip: {
          theme: $q.dark.isActive ? 'dark' : 'light',
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
          type: 'datetime',
          labels: {
            show: true,
            style: {
              colors: $q.dark.isActive ? '#fff' : '#000',
              fontSize: '13px',
              fontFamily: 'Roboto',
              fontWeight: 300
            }
          }
        },
        yaxis: {
          labels: {
            show: true,
            style: {
              colors: $q.dark.isActive ? '#fff' : '#000',
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
    })

    return {
      getChartData,
      chartOptions
    }
  }
})
</script>

<style scoped></style>
