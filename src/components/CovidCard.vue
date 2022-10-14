<template>
  <q-card
    class="category-card text-white non-selectable"
    :class="[`bg-${color}`]"
    :style="`--icon: '\\${icon}'`"
  >
    <q-card-section>
      <p class="q-ma-none text-h6 text-weight-medium">
        {{ title }}
      </p>
    </q-card-section>

    <q-card-section>
      <div class="column">
        <div class="row">
          <div class="col-12" style="height: 60px">
            <p class="q-ma-none text-h5 text-right text-weight-light">
              {{ total | formatNumber }}
            </p>
            <p
              class="q-ma-none text-italic text-right"
              v-if="index !== 1 && index !== 3"
            >
              + {{ todayTotal | formatNumber }}
            </p>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import mixinFilters from 'src/mixins/filterMixin'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CovidCard',

  mixins: [mixinFilters],

  props: {
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
    todayTotal: {
      type: Number,
      require: true
    },
    index: {
      type: Number,
      require: true
    }
  }
})
</script>

<style scoped>

</style>
