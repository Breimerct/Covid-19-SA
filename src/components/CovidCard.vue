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
          <div class="col-12 ">
            <p class="q-ma-none text-h5 text-right text-weight-light">
              {{ '1.000.000' }}
            </p>
            <p class="q-ma-none text-italic text-right">
              {{ `+ ${420}` }}
            </p>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
export default {
  name: 'CovidCard',

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
    }
  }
}
</script>

<style scoped>

</style>
