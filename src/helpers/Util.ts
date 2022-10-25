import southAmerica from '../assets/flags/south_america.png'
import colombia from '../assets/flags/colombia.png'
import brazil from '../assets/flags/brazil.png'
import argentina from '../assets/flags/argentina.png'
import paraguay from '../assets/flags/paraguay.png'
import bolivia from '../assets/flags/bolivia.png'
import chile from '../assets/flags/chile.png'
import ecuador from '../assets/flags/ecuador.png'
import peru from '../assets/flags/peru.png'
import uruguay from '../assets/flags/uruguay.png'
import suriname from '../assets/flags/suriname.png'
import falklandIslandsMalvinas from '../assets/flags/falkland_islands_malvinas.png'
import guyana from '../assets/flags/guyana.png'
import frenchGuiana from '../assets/flags/french_guiana.png'
import venezuela from '../assets/flags/venezuela.png'
import { ICountriesOptions } from 'src/models/models'

export default class Util {
  static countriesItems: ICountriesOptions[] = [
    {
      label: 'Sur América',
      value: 'south america',
      img: southAmerica
    },
    {
      label: 'Colombia',
      value: 'colombia',
      img: colombia
    },
    {
      label: 'Brazil',
      value: 'brazil',
      img: brazil
    },
    {
      label: 'Argentina',
      value: 'argentina',
      img: argentina
    },
    {
      label: 'Chile',
      value: 'chile',
      img: chile
    },
    {
      label: 'Venezuela',
      value: 'venezuela',
      img: venezuela
    },
    {
      label: 'Perú',
      value: 'peru',
      img: peru
    },
    {
      label: 'Ecuador',
      value: 'ecuador',
      img: ecuador
    },
    {
      label: 'Bolivia',
      value: 'bolivia',
      img: bolivia
    },
    {
      label: 'Paraguay',
      value: 'paraguay',
      img: paraguay
    },
    {
      label: 'Uruguay',
      value: 'uruguay',
      img: uruguay
    },
    {
      label: 'Surinam',
      value: 'suriname',
      img: suriname
    },
    {
      label: 'Guyana',
      value: 'guyana',
      img: guyana
    },
    {
      label: 'Islas Malvinas',
      value: 'falkland islands (malvinas)',
      img: falklandIslandsMalvinas
    },
    {
      label: 'Guyana Francesa',
      value: 'french guiana',
      img: frenchGuiana
    }
  ]

  static formatNumber = (value: number): string => {
    try {
      let nums: string[]
      const dot = '.'
      let valueString = value.toString()
      valueString = valueString.replace(/\D/g, '')
      nums = valueString.split('')
      const long = nums.length - 1
      const pattern = 3
      let prox = 2
      let res = ''
      while (long > prox) {
        nums.splice(long - prox, 0, dot)
        prox += pattern
      }
      for (let i = 0; i <= nums.length - 1; i++) {
        res += nums[i]
      }
      return res
    } catch (error) {
      return '0'
    }
  }

  static getFormatChartData (object: any, property: string) {
    const keysObject = Object.keys(object[property])
    const historicalData: any[] = []
    const category = this.getColorAndNameCategory(property)
    keysObject.forEach(key => {
      historicalData.push([new Date(key).getTime(), object[property][key]])
    })
    return [{
      name: category.name,
      data: historicalData,
      color: category.color
    }]
  }

  static getColorAndNameCategory (category: string) {
    switch (category) {
      case 'cases': {
        return {
          name: 'Confirmados',
          color: '#00bcd4'
        }
      }
      case 'deaths': {
        return {
          name: 'Fallecidos',
          color: '#f44336'
        }
      }
      case 'recovered': {
        return {
          name: 'Recuperados',
          color: '#4caf50'
        }
      }
      default : {
        return {
          name: '',
          color: ''
        }
      }
    }
  }
}
