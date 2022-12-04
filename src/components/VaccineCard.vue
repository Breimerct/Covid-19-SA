<template>
  <q-card
    class="category-card non-selectable column justify-between"
    :class="{
      'bg-indigo-6 text-white': !isDark,
      'bg-grey-10 text-indigo-6': isDark
    }"
    style="--icon: '\F0391';"
    :style="`--opacity: ${opacity}`"
  >
    <q-card-section class="flex justify-between">
      <p class="q-ma-none text-h6 text-weight-medium">
        {{ $t('categories.vaccinated').toString() | capitalizeFirstLetter }}
      </p>
      <q-skeleton
        size="35px"
        v-if="!vaccineData"
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
            v-if="!vaccineData"
          />
          <p class="text-h5 text-right text-weight-light" v-else>
            {{ vaccineData | formatNumber }}
          </p>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'

export default {
  name: 'VaccineCard',

  computed: {
    ...mapGetters('covidModule', ['getCovidData', 'getCountrySelected']),

    vaccineData (): number {
      return parseInt(this.getCovidData.vaccine) || 0
    },

    isDark (): boolean | any {
      return this.$q.dark.isActive
    },

    opacity (): string {
      return this.isDark ? '0.04' : '0.2'
    }
  },

  methods: {
    showDialogChart (): void {
      this.$root.$emit('showDialogHistoricalChart', {
        show: true,
        title: this.$t('categories.vaccinated'),
        categoryCard: 'vaccines'
      })
    }
  }
}
</script>

<style scoped>

</style>
