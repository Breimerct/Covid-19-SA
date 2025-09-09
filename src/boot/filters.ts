import { boot } from 'quasar/wrappers'
import moment from 'moment/moment'
import { i18n } from 'boot/i18n'
import Util from 'src/helpers/Util'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: {
      capitalizeFirstLetter: (value: string) => string
      capitalize: (value: string) => string
      formatDate: (value: number | string) => string
      formatNumber: (value: number) => string
    }
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$filters = {
    capitalizeFirstLetter (value: string): string {
      if (!value) return ''
      value = value.toLowerCase()
      return `${value[0].toUpperCase()}${value.slice(1)}`
    },

    capitalize (value: string): string {
      if (!value) return ''
      value = value.toLowerCase().replace(/(?:^|\s)\S/g, (text: string) => (text || '').toString().toUpperCase())
      return value
    },

    formatDate (value: number | string): string {
      return moment(value)
        .locale(i18n.global.locale as string)
        .format('LLLL')
    },

    formatNumber (value: number): string {
      return Util.formatNumber(value)
    }
  }
})
