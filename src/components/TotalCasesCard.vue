<template>
  <q-card
    class="custom-card q-pa-sm non-selectable"
    :class="{
      'bg-cyan-6 text-white': !isDark,
      'bg-grey-10 text-cyan-6': isDark
    }"
    style="--icon: '\F13B6'"
    :style="`--opacity: ${opacity}`"
    v-if="getCovidData"
  >
    <q-card-section class="q-pa-none">
      <q-item>
        <q-item-section avatar>
          <q-avatar size="80px" square>
            <q-img :src="getCountrySelected.flag" alt="country flag" ratio="1" contain />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ capitalizeFirstLetter(t('lastUpdate').toString()) }}
          </q-item-label>
          <q-item-label class="text-white" caption>
            {{ capitalizeFirstLetter(formatDate(getCovidData.update)) }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-my-none flex justify-between">
      <div class="text-h6 text-weight-light text-weight-light">
        {{ capitalizeFirstLetter(t('totalCasesTitle').toString()) }}
      </div>
      <q-btn dense flat icon="mdi-chart-box-outline" v-if="validateVisibleHistoricalButton" @click="showDialogChart" />
    </q-card-section>
    <q-card-section class="q-py-none">
      <div class="row">
        <div class="col-4">
          <q-icon name="mdi-check-bold" color="greenn" size="40px"></q-icon>
        </div>
        <div class="col-8 text-right">
          <div class="text-h4">
            <p class="q-ma-none">
              {{ formatNumber(getCovidData.cases || 0) }}
            </p>
          </div>
          <div class="text-italic">
            {{ `${t('increment')}+` }}
            {{ formatNumber(getCovidData.todayCases) }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { useCovidStore } from 'stores/covid'
import { capitalizeFirstLetter, formatDate, formatNumber } from 'src/helpers/formatters'

export default defineComponent({
  name: 'TotalCasesCard',

  emits: ['showChart'],

  setup(_, { emit }) {
    const { t } = useI18n()
    const $q = useQuasar()
    const covidStore = useCovidStore()

    const validateVisibleHistoricalButton = computed((): boolean => {
      const countrySelected = covidStore.getCountrySelected
      return (
        !countrySelected?.value.includes('south') &&
        !countrySelected?.value.includes('french') &&
        !countrySelected?.value.includes('falkland')
      )
    })

    const isDark = computed((): boolean => {
      return Boolean($q.dark.isActive)
    })

    const opacity = computed((): number => {
      return isDark.value ? 0.04 : 0.2
    })

    function showDialogChart() {
      emit('showChart', {
        show: true,
        title: t('totalCasesTitle'),
        categoryCard: 'cases'
      })
    }

    return {
      t,
      getCountrySelected: covidStore.getCountrySelected,
      getCovidData: covidStore.getCovidData,
      validateVisibleHistoricalButton,
      isDark,
      opacity,
      capitalizeFirstLetter,
      formatDate,
      formatNumber,
      showDialogChart
    }
  }
})
</script>

<style scoped lang="scss"></style>
