<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  mounted () {
    this.$q.dark.set(JSON.parse(localStorage.getItem('darkMode')))
    this.$i18n.locale = localStorage.getItem('lang')
  }
})
</script>
