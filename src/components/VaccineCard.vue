<template>
  <q-card
    class="category-card bg-indigo-6 text-white non-selectable column justify-between"
    style="--icon: '\F0391';"
  >
    <q-card-section class="flex justify-between">
      <p class="q-ma-none text-h6 text-weight-medium">
        Vacunados
      </p>
      <q-skeleton
        size="35px"
        v-if="!getCovidData.vaccine"
      />
      <q-btn
        v-else
        flat
        dense
        icon="mdi-chart-box-outline"
        @click="showDialogChart"
      />
    </q-card-section>

    <q-card-section class="q-py-none">
      <div class="row">
        <div class="col-12 text-right" style="min-height: 50px">
          <q-skeleton
            class="text-h5 text-weight-light"
            v-if="!getCovidData.vaccine"
          />
          <p class="text-h5 text-right text-weight-light" v-else>
            {{ getCovidData.vaccine | formatNumber }}
          </p>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import mixinFilters from '../mixins/filterMixin'
import { mapGetters } from 'vuex'
import EventBus from '../helpers/EventBus'

export default {
  name: 'VaccineCard',

  mixins: [mixinFilters],

  computed: {
    ...mapGetters('covidModule', ['getCovidData'])
  },

  methods: {
    showDialogChart () {
      EventBus.$emit('showDialogHistoricalChart', {
        show: true,
        title: 'Vacunados',
        categoryCard: 'vaccines'
      })
    }
  }
}
</script>

<style scoped>

</style>
