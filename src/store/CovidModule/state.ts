import { ICovidData } from 'src/store/CovidModule/moduleInterfaces'

export interface CovidStateInterface {
  covidData: ICovidData | null
}

const state = (): CovidStateInterface => ({
  covidData: null
})

export default state
