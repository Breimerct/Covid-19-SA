<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar
        :class="{
          'bg-grey-3 text-black': !$q.dark.isActive,
          'bg-dark text-white': $q.dark.isActive
        }"
      >
        <q-toolbar-title class="flex content-center">
          <q-icon size="md" class="q-mr-sm">
            <q-img src="../assets/covid-icon.svg" alt="Covid-19 SA Logo" />
          </q-icon>
          {{ $t('nameApp') }}
        </q-toolbar-title>

        <q-btn flat dense round icon="mdi-information">
          <q-menu fit transition-show="jump-down" transition-hide="jump-up">
            <q-list separator style="min-width: 300px">
              <q-item>
                <q-item-section>
                  <q-btn rounded outline color="primary" :label="$t('changeLang')" @click="changeLang">
                    <q-icon class="q-ml-md">
                      <q-img :src="getLanguageFlag" />
                    </q-icon>
                  </q-btn>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-btn outline rounded color="primary" :label="$t('changeTheme')" @click="themeToggle">
                    <q-icon
                      class="q-ml-md"
                      size="sm"
                      :name="$q.dark.isActive ? 'eva-sun-outline' : 'eva-moon-outline'"
                    />
                  </q-btn>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <card-info />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from 'stores/theme'
import CardInfo from 'components/CardInfo.vue'

// Import images
import colombiaFlag from '../assets/flags/colombia.png'
import usFlag from '../assets/flags/united_states.png'

export default defineComponent({
  name: 'MainLayout',

  components: {
    CardInfo
  },

  setup() {
    const { locale } = useI18n()
    const themeStore = useThemeStore()

    const getLanguageFlag = computed(() => {
      return locale.value === 'en-us' ? colombiaFlag : usFlag
    })

    function changeLang() {
      if (locale.value === 'es-es') {
        locale.value = 'en-us'
      } else {
        locale.value = 'es-es'
      }
      localStorage.setItem('lang', locale.value)
    }

    return {
      getLanguageFlag,
      changeLang,
      themeToggle: themeStore.themeToggle
    }
  }
})
</script>
