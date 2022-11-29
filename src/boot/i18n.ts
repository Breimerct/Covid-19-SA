import { boot } from 'quasar/wrappers'
import messages from 'src/i18n'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

declare module 'vue/types/vue' {
  interface Vue {
    i18n: VueI18n;
  }
}

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'es-es',
  fallbackLocale: 'es-es',
  messages
})

export default boot(({ app }) => {
  app.i18n = i18n
})
