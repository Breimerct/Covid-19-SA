import { boot } from 'quasar/wrappers'
import VueApexCharts from 'vue-apexcharts'

export default boot(({ app, router, Vue }) => {
  Vue.use(VueApexCharts)
  Vue.component('apexChart', VueApexCharts)
})
