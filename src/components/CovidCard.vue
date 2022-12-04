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
        {{ title | capitalizeFirstLetter }}
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
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'CovidCard',

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
        (this.index !== 0) &&
        (this.index !== 2) &&
        (!this.getCountrySelected?.value.includes('south')) &&
        (!this.getCountrySelected?.value.includes('french')) &&
        (!this.getCountrySelected?.value.includes('falkland'))
      )
    },

    opacity (): string {
      return this.$q.dark.isActive ? '0.04' : '0.2'
    },

    isDark (): boolean | any {
      return this.$q.dark.isActive
    }
  },

  methods: {
    showDialogChart (): void {
      this.$root.$emit('showDialogHistoricalChart', {
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
