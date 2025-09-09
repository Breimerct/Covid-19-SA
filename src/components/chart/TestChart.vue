<template>
  <q-card
    v-if="getTestChartData"
    :class="{
      'bg-grey-4': !$q.dark.isActive,
      'bg-grey-10': $q.dark.isActive
    }"
  >
    <q-card-section>
      <apexchart type="bar" height="350" width="100%" :options="getChartOptions" :series="getTestChartData" />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { useCovidStore } from 'stores/covid'
import util from 'src/helpers/Util'
import { ICountriesOptions } from 'src/models/models'

export default defineComponent({
  name: 'TestChart',

  setup() {
    const { t } = useI18n()
    const $q = useQuasar()
    const covidStore = useCovidStore()

    const getChartOptions = computed((): any => {
      const countries = Object.values<ICountriesOptions>(util.getCountryItems())
        .filter(country => country.value !== 'south america')
        .map(country => (country.shortName || '').toUpperCase())

      return {
        colors: ['#ffa000'],
        chart: {
          toolbar: {
            show: false
          }
        },
        tooltip: {
          enabled: true,
          theme: $q.dark.isActive ? 'dark' : 'light',
          y: {
            title: {
              formatter: (seriesName: string): string => util.capitalizeFirstLetter(seriesName)
            }
          }
        },
        title: {
          text: t('configChart.testsPerformed'),
          align: 'center',
          style: {
            color: $q.dark.isActive ? '#fff' : '#000',
            fontSize: '20px',
            fontFamily: 'Roboto',
            fontWeight: 'medium'
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
        xaxis: {
          categories: countries,
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
            show: !$q.platform.is.mobile,
            style: {
              colors: $q.dark.isActive ? '#fff' : '#000',
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
    })

    onMounted(() => {
      covidStore.fetchTestChartData()
    })

    return {
      getTestChartData: covidStore.getTestChartData,
      getChartOptions
    }
  }
})
</script>

<style scoped></style>
