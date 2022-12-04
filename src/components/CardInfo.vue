<template>
  <q-card class="q-pb-lg shadow-0">
    <q-card-section class="text-center">
      <div>
        <q-avatar size="100px" class="shadow-10">
          <q-img
            src="../assets/profile.jpg"
            alt="profile-image"
            ratio="1"
            transition="slide-up"
          />
        </q-avatar>
      </div>
    </q-card-section>
    <q-card-section
      class="q-py-none text-center"
      :class="{
        'text-grey-8': !isDark,
        'text-white': isDark
      }"
    >
      <p class="text-h6 q-ma-none">
        Breimer Correa Torres
      </p>
      <p class="text-caption q-ma-none text-capitalize">
        {{ $t('profession') }}
      </p>
    </q-card-section>
    <q-card-actions align="center" class="q-pb-sm">
      <q-btn
        flat
        round
        v-close-popup
        v-for="(item, index) in social"
        :key="index"
        :icon="'mdi-'+item.icon"
        class="text-white"
        :class="'bg-'+item.color"
        @click="openLink(item.url)"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { ISocial } from 'src/models/models'

export default {
  name: 'CardInfo',

  data: (): {
    social: ISocial[]
  } => ({
    social: [
      {
        url: 'https://web.facebook.com/Breimerct',
        color: 'indigo-7',
        icon: 'facebook'
      },
      {
        url: 'https://github.com/Breimerct',
        color: 'black',
        icon: 'github'
      },
      {
        url: 'https://twitter.com/here_is_bre',
        color: 'light-blue-5',
        icon: 'twitter'
      }
    ]
  }),

  computed: {
    isDark (): boolean | any {
      return this.$q.dark.isActive
    }
  },

  methods: {
    openLink (url): void {
      window.open(url, '_blank')
    }
  }
}
</script>

<style scoped>

</style>
