import { ICategories } from 'src/store/CovidModule/moduleInterfaces'
import { i18n } from 'boot/i18n'
import { ICountriesOptions } from 'src/models/models'
import southAmerica from 'assets/flags/south_america.png'
import colombia from 'assets/flags/colombia.png'
import brazil from 'assets/flags/brazil.png'
import argentina from 'assets/flags/argentina.png'
import chile from 'assets/flags/chile.png'
import venezuela from 'assets/flags/venezuela.png'
import peru from 'assets/flags/peru.png'
import ecuador from 'assets/flags/ecuador.png'
import bolivia from 'assets/flags/bolivia.png'
import paraguay from 'assets/flags/paraguay.png'
import uruguay from 'assets/flags/uruguay.png'
import suriname from 'assets/flags/suriname.png'
import guyana from 'assets/flags/guyana.png'
import falklandIslandsMalvinas from 'assets/flags/falkland_islands_malvinas.png'
import frenchGuiana from 'assets/flags/french_guiana.png'

const util = {
  getCountryItems (): ICountriesOptions[] {
    return [
      {
        label: i18n.t('countries.southAmerica').toString(),
        value: 'south america',
        flag: southAmerica
      },
      {
        label: i18n.t('countries.colombia').toString(),
        shortName: 'col',
        value: 'colombia',
        flag: colombia
      },
      {
        label: i18n.t('countries.brazil').toString(),
        shortName: 'bra',
        value: 'brazil',
        flag: brazil
      },
      {
        label: i18n.t('countries.argentina').toString(),
        shortName: 'arg',
        value: 'argentina',
        flag: argentina
      },
      {
        label: i18n.t('countries.chile').toString(),
        shortName: 'chl',
        value: 'chile',
        flag: chile
      },
      {
        label: i18n.t('countries.venezuela').toString(),
        shortName: 'ven',
        value: 'venezuela',
        flag: venezuela
      },
      {
        label: i18n.t('countries.peru').toString(),
        shortName: 'per',
        value: 'peru',
        flag: peru
      },
      {
        label: i18n.t('countries.ecuador').toString(),
        shortName: 'ecu',
        value: 'ecuador',
        flag: ecuador
      },
      {
        label: i18n.t('countries.bolivia').toString(),
        shortName: 'bol',
        value: 'bolivia',
        flag: bolivia
      },
      {
        label: i18n.t('countries.paraguay').toString(),
        shortName: 'pry',
        value: 'paraguay',
        flag: paraguay
      },
      {
        label: i18n.t('countries.uruguay').toString(),
        shortName: 'ury',
        value: 'uruguay',
        flag: uruguay
      },
      {
        label: i18n.t('countries.suriname').toString(),
        shortName: 'sur',
        value: 'suriname',
        flag: suriname
      },
      {
        label: i18n.t('countries.guyana').toString(),
        shortName: 'guy',
        value: 'guyana',
        flag: guyana
      },
      {
        label: i18n.t('countries.falklandIslands').toString(),
        shortName: 'flk',
        value: 'falkland islands (malvinas)',
        flag: falklandIslandsMalvinas
      },
      {
        label: i18n.t('countries.frenchGuiana').toString(),
        shortName: 'guf',
        value: 'french guiana',
        flag: frenchGuiana
      }
    ]
  },

  getSouthAmerica (): ICountriesOptions {
    return util.getCountryItems().filter(country => country.value === 'south america')[0]
  },

  getOneCountry (_country):ICountriesOptions {
    return util.getCountryItems().find(country => country.value === _country)
  },

  formatNumber (value: number): string {
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
  },

  getFormatChartData (object: any, property: string): ICategories[] {
    const keysObject = Object.keys(object[property])
    const historicalData: any[] = []
    const category = util.getColorAndNameCategory(property)
    keysObject.forEach(key => {
      historicalData.push([new Date(key).getTime(), object[property][key]])
    })
    return [{
      name: category.name,
      data: historicalData,
      color: category.color
    }]
  },

  getColorAndNameCategory (category: string): { name: string; color: string } {
    switch (category) {
      case 'cases': {
        return {
          name: i18n.t('categories.confirmed').toString(),
          color: '#00bcd4'
        }
      }
      case 'deaths': {
        return {
          name: i18n.t('categories.deceased').toString(),
          color: '#f44336'
        }
      }
      case 'recovered': {
        return {
          name: i18n.t('categories.recovered').toString(),
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
  },

  capitalizeFirstLetter (text: string): string {
    if (!text) return ''
    text = text.toLowerCase()
    return `${text[0].toUpperCase()}${text.slice(1)}`
  }
}

export default util
