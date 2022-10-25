<template>
  <q-card
    class="category-card text-white non-selectable q-px-sm flex column justify-between"
    :class="[`bg-${color}`]"
    :style="`--icon: '\\${icon}'`"
  >
    <q-card-section class="flex justify-between flex-center q-pt-sm q-px-none">
      <p class="q-ma-none text-h6 text-weight-medium">
        {{ title }}
      </p>
      <q-btn
        flat
        dense
        icon="mdi-chart-box-outline"
        v-if="validateVisibleHistoricalButton"
        @click="showDialogChart"
      />
    </q-card-section>

    <q-card-section>
      <div class="row">
        <div class="col-12">
          <p class="q-ma-none text-h5 text-right text-weight-light">
            {{ total | formatNumber }}
          </p>
          <p class="q-ma-none text-italic text-right">
            + {{ today || 0 | formatNumber }}
          </p>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import mixinFilters from 'src/mixins/filterMixin'
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import EventBus from 'src/helpers/EventBus'

export default defineComponent({
  name: 'CovidCard',

  mixins: [mixinFilters],

  props: {
    category: {
      type: String,
      require: true
    },
    title: {
      type: String,
      require: true
    },
    color: {
      type: String,
      require: true
    },
    icon: {
      type: String,
      require: true
    },
    total: {
      type: Number,
      require: true
    },
    today: {
      type: Number,
      require: true
    },
    index: {
      type: Number,
      require: true
    }
  },

  computed: {
    ...mapGetters('covidModule', ['getCountrySelected', 'getHistoricalData']),

    validateVisibleHistoricalButton (): boolean {
      return (
        (this.index !== 3) &&
        (this.index !== 1) &&
        (!this.getCountrySelected?.value.includes('south')) &&
        (!this.getCountrySelected?.value.includes('french')) &&
        (!this.getCountrySelected?.value.includes('falkland'))
      )
    }
  },

  methods: {
    showDialogChart (): void {
      EventBus.$emit('showDialogHistoricalChart', {
        show: true,
        title: this.title,
        categoryCard: this.category
      })
    }
  }
})
</script>

<style scoped>

</style>
