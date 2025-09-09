<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useThemeStore } from 'stores/theme'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'App',

  setup() {
    const themeStore = useThemeStore()
    const { locale } = useI18n()

    onMounted(() => {
      themeStore.initTheme()
      const savedLang = localStorage.getItem('lang')
      if (savedLang) {
        locale.value = savedLang
      }
    })

    return {}
  }
})
</script>
