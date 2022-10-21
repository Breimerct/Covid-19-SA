<template>
  <q-card
    class="category-card bg-indigo-6 text-white non-selectable"
    style="--icon: '\F0391';"
  >
    <q-card-section class="flex justify-between">
      <p class="q-ma-none text-h6 text-weight-medium">
        Vacunados
      </p>
      <q-btn
        round
        dense
        icon="mdi-chart-box-outline"
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

export default {
  name: 'VaccineCard',

  mixins: [mixinFilters],

  computed: {
    ...mapGetters('covidModule', ['getCovidData'])
  }
}
</script>

<style scoped>

</style>
