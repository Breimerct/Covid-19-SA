<template>
  <q-dialog
    v-model="showDialog"
    position="bottom"
    :full-width="isMobile"
  >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section class="row justify-between">
        <p class="q-ma-none text-h5">
          {{ title | capitalizeFirstLetter }}
        </p>
        <q-btn
          flat
          round
          dense
          v-close-popup
          icon="close"
        />
      </q-card-section>
      <q-card-section>
        <historical-chart :category="categoryCard"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DialogHistoricalChart',
  components: {
    HistoricalChart: () => import('components/HistoricalChart.vue')
  },

  data: (): {
    showDialog: boolean
    title: string
    categoryCard: string
  } => ({
    showDialog: false,
    title: '',
    categoryCard: ''
  }),

  computed: {
    isMobile (): boolean | any {
      return this.$q.platform.is.mobile
    }
  },

  mounted () {
    this.$root.$on('showDialogHistoricalChart', (data: any): void => {
      this.showDialog = data.show
      this.title = data.title
      this.categoryCard = data.categoryCard
    })
  }
})
</script>

<style scoped lang="scss">

</style>
