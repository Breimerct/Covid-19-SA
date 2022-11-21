<template>
  <q-dialog
    v-model="showDialog"
    :position="positionDialog"
  >
    <q-card class="q-py-lg">
      <q-card-section class="text-center">
        <div>
          <q-avatar size="100px" class="shadow-10">
            <q-img
              src="../assets/profile.jpg"
              alt="profile-image"
              ratio="1"
            />
          </q-avatar>
        </div>
      </q-card-section>
      <q-card-section class="q-py-none text-center">
        <p class="text-h6 q-ma-none text-grey-8">
          Breimer Correa Torres
        </p>
        <p class="text-caption q-ma-none text-grey-8">
          Web App Desarollador
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
  </q-dialog>
</template>

<script lang="ts">
import { ISocial } from 'src/models/models'

export default {
  name: 'CardInfo',

  data: (): {
    showDialog: boolean
    social: ISocial[]
  } => ({
    showDialog: false,
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
    positionDialog (): string {
      return this.$q.platform.is.mobile ? 'bottom' : 'standard'
    }
  },

  methods: {
    openLink (url): void {
      window.open(url, '_blank')
    }
  },

  mounted () {
    this.$root.$on('showInfoCard', (show: boolean): void => {
      this.showDialog = show
    })
  }
}
</script>

<style scoped>

</style>
