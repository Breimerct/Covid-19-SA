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
                    rounded
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
                  <q-btn
                    outline
                    rounded
                    color="primary"
                    :label="$t('changeTheme')"
                    @click="themeToggle"
                  >
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
import { mapActions } from 'vuex'

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
    ...mapActions(['themeToggle']),

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
