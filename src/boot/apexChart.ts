import { boot } from 'quasar/wrappers'
import VueApexCharts from 'vue-apexcharts'

export default boot(({ Vue }) => {
  Vue.use(VueApexCharts)
  Vue.component('apexChart', VueApexCharts)
})
