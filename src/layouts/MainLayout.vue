<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-grey-3 text-black">
        <q-toolbar-title class="flex content-center">
          <q-icon size="md" class="q-mr-sm">
            <q-img src="../assets/covid-icon.svg" alt="Covid-19 SA Logo"/>
          </q-icon>
          Covid-19 Sur América
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="mdi-information"
          @click="showCardInfo"
        >
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <card-info />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    CardInfo: () => import('components/CardInfo.vue')
  },

  methods: {
    showCardInfo () {
      this.$root.$emit('showInfoCard', true)
    }
  }

})

</script>
