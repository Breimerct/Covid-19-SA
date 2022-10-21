<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-grey-3 text-black">
        <q-toolbar-title>
          Covid-19 SA
        </q-toolbar-title>

        <q-btn
          flat
          dense
          icon="mdi-info"
        >
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

export default {
  name: 'MainLayout'
}

</script>
