<template>
  <q-dialog
    full-width
    v-model="showDialog"
    position="bottom"
  >
    <q-card>
      <q-card-section class="row justify-end">
        <q-btn
          flat
          round
          dense
          v-close-popup
          icon="close"
        />
      </q-card-section>
      <q-card-section>
        <p class="text-h5">{{ title }}</p>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EventBus from 'src/helpers/EventBus'

export default defineComponent({
  name: 'DialogHistoricalChart',

  data: (): {
    showDialog: boolean,
    title: string
  } => ({
    showDialog: false,
    title: ''
  }),

  mounted () {
    EventBus.$on('showDialogHistoricalChart', (data: any): void => {
      this.showDialog = data.show
      this.title = data.title
    })
  }
})
</script>

<style scoped lang="scss">

</style>
