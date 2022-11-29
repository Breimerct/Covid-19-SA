<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-grey-3 text-black">
        <q-toolbar-title class="flex content-center">
          <q-icon size="md" class="q-mr-sm">
            <q-img src="../assets/covid-icon.svg" alt="Covid-19 SA Logo"/>
          </q-icon>
          {{ $t('nameApp') }}
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="mdi-information"
        >
          <q-menu
            fit
            transition-show="jump-down"
            transition-hide="jump-up"
          >
            <q-list separator style="min-width: 300px">
              <q-item>
                <q-item-section>
                  <q-btn
                    outline
                    color="primary"
                    :label="$t('changeLang')"
                    @click="changeLang"
                  >
                    <q-icon class="q-ml-md">
                      <q-img :src="getLanguageFlag"/>
                    </q-icon>
                  </q-btn>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <card-info/>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    CardInfo: () => import('components/CardInfo.vue')
  },

  computed: {
    getLanguageFlag (): any {
      return this.$i18n.locale === 'en-us' ? require('../assets/flags/colombia.png') : require('../assets/flags/united_states.png')
    }
  },

  methods: {
    changeLang () {
      if (this.$i18n.locale === 'es-es') {
        this.$i18n.locale = 'en-us'
        this.$i18n.fallbackLocale = 'en-us'
      } else {
        this.$i18n.locale = 'es-es'
        this.$i18n.fallbackLocale = 'es-es'
      }
    }
  }

})

</script>
