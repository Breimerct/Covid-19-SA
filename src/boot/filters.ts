import { boot } from 'quasar/wrappers'
import moment from 'moment/moment'
import { i18n } from 'boot/i18n'
import Util from 'src/helpers/Util'

export default boot(({ Vue }): any => {
  Vue.filter('capitalizeFirstLetter', (value: string): string => {
    if (!value) return ''
    value = value.toLowerCase()
    return `${value[0].toUpperCase()}${value.slice(1)}`
  })

  Vue.filter('capitalize', function (value: string): string {
    if (!value) return ''
    value = value.toLowerCase()
      .replace(
        /(?:^|\s)\S/g,
        (text: string) => (text || '').toString().toUpperCase()
      )
    return value
  })

  Vue.filter('formatDate', (value: number | string): string => {
    return moment(value).locale(i18n.locale).format('LLLL')
  })

  Vue.filter('formatNumber', (value: number): string => {
    return Util.formatNumber(value)
  })
})
