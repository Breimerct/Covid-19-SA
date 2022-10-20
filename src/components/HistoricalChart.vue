<template>
<q-card>
  <q-card-section>
    <vue-apex-charts
      type="area"
    />
  </q-card-section>
</q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HistoricalChart',

  components: {
    VueApexCharts: () => import('vue-apexcharts')
  }
})
</script>

<style scoped>

</style>
