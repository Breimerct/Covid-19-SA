<template>
  <q-dialog v-model="dialogVisible" position="bottom" :full-width="isMobile">
    <q-card
      style="width: 700px; max-width: 85vw"
      :class="{
        'bg-grey-3': !isDark,
        'bg-grey-10': isDark
      }"
    >
      <q-card-section class="row justify-between">
        <p class="q-ma-none text-h5">
          {{ capitalizeFirstLetter(title) }}
        </p>
        <q-btn flat round dense v-close-popup :color="isDark ? 'white' : 'black'" icon="close" />
      </q-card-section>
      <q-card-section class="section-chart">
        <historical-chart :category="categoryCard" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { capitalizeFirstLetter } from 'src/helpers/formatters'

export default defineComponent({
  name: 'DialogHistoricalChart',
  components: {
    HistoricalChart: () => import('components/chart/HistoricalChart.vue')
  },

  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    categoryCard: {
      type: String,
      default: ''
    }
  },

  emits: ['update:show'],

  setup(props, { emit }) {
    const $q = useQuasar()
    
    const dialogVisible = ref(props.show)

    const isMobile = computed(() => {
      return $q.platform.is.mobile
    })

    const isDark = computed(() => {
      return Boolean($q.dark.isActive)
    })

    watch(() => props.show, (newValue) => {
      dialogVisible.value = newValue
    })

    watch(dialogVisible, (newValue) => {
      emit('update:show', newValue)
    })

    return {
      dialogVisible,
      isMobile,
      isDark,
      capitalizeFirstLetter
    }
  }
})
</script>

<style scoped lang="scss">
.section-chart {
  overflow: hidden;
}
</style>
