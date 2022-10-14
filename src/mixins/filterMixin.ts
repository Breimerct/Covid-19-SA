import moment from 'moment/moment'

export default {
  filters: {
    formatDate (value: number | string) {
      moment.locale('es-us')
      return moment(value).format('LLLL')
    },

    formatNumber (value: number) {
      try {
        let nums = []
        const simb = '.'
        let valueString = value.toString()
        valueString = valueString.replace(/\D/g, '')
        nums = valueString.split('')
        const long = nums.length - 1
        const patron = 3
        let prox = 2
        let res = ''
        while (long > prox) {
          nums.splice(long - prox, 0, simb)
          prox += patron
        }
        for (let i = 0; i <= nums.length - 1; i++) {
          res += nums[i]
        }
        return res
      } catch (error) {
        return null
      }
    }
  }
}
