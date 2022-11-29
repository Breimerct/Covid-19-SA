<template>
  <q-card
    class="custom-card text-white bg-cyan-6 q-pa-sm non-selectable"
    style="--icon: '\F13B6';"
    v-if="getCovidData"
  >
    <q-card-section class="q-pa-none">
      <q-item>
        <q-item-section avatar>
          <q-avatar size="80px" square>
            <q-img
              :src="getCountrySelected.flag"
              alt="country flag"
              ratio="1"
              contain
            />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ $t('lastUpdate').toString() | capitalizeFirstLetter }}
          </q-item-label>
          <q-item-label class="text-white" caption>
            {{ getCovidData.update | formatDate | capitalizeFirstLetter }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-separator/>
    <q-card-section class="q-my-none flex justify-between">
      <div class="text-h6 text-weight-light text-weight-light">
        {{ $t('totalCasesTitle').toString() | capitalizeFirstLetter }}
      </div>
      <q-btn
        dense
        flat
        icon="mdi-chart-box-outline"
        v-if="validateVisibleHistoricalButton"
        @click="showDialogChart"
      />
    </q-card-section>
    <q-card-section class="q-py-none">
      <div class="row">
        <div class="col-4">
          <q-icon
            name="mdi-check-bold"
            color="greenn"
            size="40px"
          ></q-icon>
        </div>
        <div class="col-8 text-right">
          <div class="text-h4">
            <p class="q-ma-none">
              {{ (getCovidData.cases || 0) | formatNumber }}
            </p>
          </div>
          <div class="text-italic">
            {{ `${$t('increment')}+` }} {{ getCovidData.todayCases | formatNumber }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'TotalCasesCard',

  computed: {
    ...mapGetters('covidModule', ['getCountrySelected', 'getCovidData']),

    validateVisibleHistoricalButton (): boolean {
      return (
        (!this.getCountrySelected?.value.includes('south')) &&
        (!this.getCountrySelected?.value.includes('french')) &&
        (!this.getCountrySelected?.value.includes('falkland'))
      )
    }
  },

  methods: {
    showDialogChart () {
      this.$root.$emit('showDialogHistoricalChart', {
        show: true,
        title: this.$t('totalCasesTitle'),
        categoryCard: 'cases'
      })
    }
  }
})
</script>

<style scoped lang="scss">
</style>
