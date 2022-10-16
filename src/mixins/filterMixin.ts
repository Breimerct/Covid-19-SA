import moment from 'moment/moment'
import Util from 'src/helpers/Util'

export default {
  filters: {
    formatDate (value: number | string) {
      moment.locale('es-us')
      return moment(value).format('LLLL')
    },

    formatNumber (value: number) {
      return Util.formatNumber(value)
    }
  }
}
