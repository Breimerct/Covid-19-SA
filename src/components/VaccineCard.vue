<template>
  <q-card
    class="category-card non-selectable column justify-between"
    :class="{
      'bg-indigo-6 text-white': !isDark,
      'bg-grey-10 text-indigo-6': isDark
    }"
    style="--icon: '\F0391'"
    :style="`--opacity: ${opacity}`"
  >
    <q-card-section class="flex justify-between">
      <p class="q-ma-none text-h6 text-weight-medium">
        {{ capitalizeFirstLetter(t('categories.vaccinated').toString()) }}
      </p>
      <q-skeleton size="35px" v-if="!vaccineData" />
      <q-btn v-else flat dense icon="mdi-chart-box-outline" @click="showDialogChart" />
    </q-card-section>

    <q-card-section class="q-py-none">
      <div class="row">
        <div class="col-12 text-right" style="min-height: 50px">
          <q-skeleton class="text-h5 text-weight-light" v-if="!vaccineData" />
          <p class="text-h5 text-right text-weight-light" v-else>
            {{ formatNumber(vaccineData) }}
          </p>
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
import { capitalizeFirstLetter, formatNumber } from 'src/helpers/formatters'

export default defineComponent({
  name: 'VaccineCard',

  emits: ['showChart'],

  setup(_, { emit }) {
    const { t } = useI18n()
    const $q = useQuasar()
    const covidStore = useCovidStore()

    const vaccineData = computed((): number => {
      const vaccine = covidStore.getCovidData?.vaccine
      return parseInt(String(vaccine || 0)) || 0
    })

    const isDark = computed((): boolean => {
      return Boolean($q.dark.isActive)
    })

    const opacity = computed((): string => {
      return isDark.value ? '0.04' : '0.2'
    })

    function showDialogChart(): void {
      emit('showChart', {
        show: true,
        title: t('categories.vaccinated'),
        categoryCard: 'vaccines'
      })
    }

    return {
      t,
      getCovidData: covidStore.getCovidData,
      getCountrySelected: covidStore.getCountrySelected,
      vaccineData,
      isDark,
      opacity,
      capitalizeFirstLetter,
      formatNumber,
      showDialogChart
    }
  }
})
</script>

<style scoped></style>
