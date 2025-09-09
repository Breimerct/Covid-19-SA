<template>
  <q-card
    class="category-card non-selectable q-px-sm flex column justify-between"
    :class="{
      [`bg-grey-10 text-${color}`]: isDark,
      [`bg-${color} text-white`]: !isDark
    }"
    :style="`--icon: '\\${icon}'; --opacity: ${opacity}`"
  >
    <q-card-section class="flex justify-between flex-center q-pt-sm q-px-none">
      <p class="q-ma-none text-h6 text-weight-medium">
        {{ capitalizeFirstLetter(title) }}
      </p>
      <q-btn flat dense icon="mdi-chart-box-outline" v-if="validateVisibleHistoricalButton" @click="showDialogChart" />
    </q-card-section>

    <q-card-section>
      <div class="row">
        <div class="col-12">
          <p class="q-ma-none text-h5 text-right text-weight-light">
            {{ formatNumber(total) }}
          </p>
          <p class="q-ma-none text-italic text-right">+ {{ formatNumber(today || 0) }}</p>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useCovidStore } from 'stores/covid'
import { capitalizeFirstLetter, formatNumber } from 'src/helpers/formatters'

export default defineComponent({
  name: 'CovidCard',

  props: {
    category: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    today: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },

  emits: ['showChart'],

  setup(props, { emit }) {
    const $q = useQuasar()
    const covidStore = useCovidStore()

    const validateVisibleHistoricalButton = computed((): boolean => {
      const countrySelected = covidStore.getCountrySelected
      return (
        props.index !== 0 &&
        props.index !== 2 &&
        !countrySelected?.value.includes('south') &&
        !countrySelected?.value.includes('french') &&
        !countrySelected?.value.includes('falkland')
      )
    })

    const opacity = computed((): string => {
      return $q.dark.isActive ? '0.04' : '0.2'
    })

    const isDark = computed((): boolean => {
      return Boolean($q.dark.isActive)
    })

    function showDialogChart(): void {
      emit('showChart', {
        show: true,
        title: props.title,
        categoryCard: props.category
      })
    }

    return {
      getCountrySelected: covidStore.getCountrySelected,
      getHistoricalData: covidStore.getHistoricalData,
      validateVisibleHistoricalButton,
      opacity,
      isDark,
      capitalizeFirstLetter,
      formatNumber,
      showDialogChart
    }
  }
})
</script>

<style scoped></style>
