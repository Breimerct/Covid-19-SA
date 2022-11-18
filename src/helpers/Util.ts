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
import { ICategories } from 'src/store/CovidModule/moduleInterfaces'

export default class Util {
  static countriesItems: ICountriesOptions[] = [
    {
      label: 'Sur América',
      value: 'south america',
      flag: southAmerica
    },
    {
      label: 'Colombia',
      value: 'colombia',
      flag: colombia
    },
    {
      label: 'Brazil',
      value: 'brazil',
      flag: brazil
    },
    {
      label: 'Argentina',
      value: 'argentina',
      flag: argentina
    },
    {
      label: 'Chile',
      value: 'chile',
      flag: chile
    },
    {
      label: 'Venezuela',
      value: 'venezuela',
      flag: venezuela
    },
    {
      label: 'Perú',
      value: 'peru',
      flag: peru
    },
    {
      label: 'Ecuador',
      value: 'ecuador',
      flag: ecuador
    },
    {
      label: 'Bolivia',
      value: 'bolivia',
      flag: bolivia
    },
    {
      label: 'Paraguay',
      value: 'paraguay',
      flag: paraguay
    },
    {
      label: 'Uruguay',
      value: 'uruguay',
      flag: uruguay
    },
    {
      label: 'Surinam',
      value: 'suriname',
      flag: suriname
    },
    {
      label: 'Guyana',
      value: 'guyana',
      flag: guyana
    },
    {
      label: 'Islas Malvinas',
      value: 'falkland islands (malvinas)',
      flag: falklandIslandsMalvinas
    },
    {
      label: 'Guyana Francesa',
      value: 'french guiana',
      flag: frenchGuiana
    }
  ]

  static formatNumber = (value: number): string => {
    try {
      const dot = '.'
      let valueString = value.toString()
      valueString = valueString.replace(/\D/g, '')
      const nums = valueString.split('')
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

  static getFormatChartData (object: any, property: string): ICategories[] {
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

  static getColorAndNameCategory (category: string): { name: string; color: string } {
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
